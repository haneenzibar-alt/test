import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MEAL_TYPES = [
  "BREAKFAST",
  "LUNCH",
  "DINNER",
  "SNACK",
] as const;

type RecipeRow = Awaited<ReturnType<typeof prisma.recipe.findMany>>[number];

/**
 * Returns recipes that fit a given meal slot (e.g. BREAKFAST).
 * Prefers recipes explicitly tagged with that mealType. If none exist,
 * falls back to recipes with no mealType set (untagged, usable anywhere).
 * As a last resort (bad data / empty catalog for that slot), falls back
 * to the full recipe list so a day is never left with a missing meal.
 */
function getPoolForMealType(
  allRecipes: RecipeRow[],
  mealType: (typeof MEAL_TYPES)[number]
): RecipeRow[] {
  const tagged = allRecipes.filter((r) => r.mealType === mealType);
  if (tagged.length > 0) return tagged;

  const untagged = allRecipes.filter((r) => r.mealType === null);
  if (untagged.length > 0) return untagged;

  return allRecipes;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    // Get user's profile
    const profile = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      return NextResponse.json({
        dailyTargets: {
          calories: 2000,
          protein: 150,
          carbs: 200,
          fat: 65,
        },
        planGenerated: false,
        hasProfile: false,
        days: [],
      });
    }

    const dailyTargets = {
      calories: profile.calorieTarget ?? 2000,
      protein: profile.proteinTarget ?? 150,
      carbs: profile.carbTarget ?? 200,
      fat: profile.fatTarget ?? 65,
    };

    /*
     * Get recipes according to user's goal and diet.
     *
     * We allow recipes with:
     * - matching goal
     * - no specific goal
     *
     * Same for dietType.
     */

    const recipes = await prisma.recipe.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                goal: profile.healthGoal,
              },
              {
                goal: null,
              },
            ],
          },
          {
            OR: [
              {
                dietType: profile.dietType,
              },
              {
                dietType: null,
              },
            ],
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (recipes.length === 0) {
      return NextResponse.json({
        dailyTargets,
        planGenerated: false,
        hasProfile: true,
        days: [],
      });
    }

    /*
     * Shuffle once so the planner doesn't always show the exact same
     * meals in the exact same order.
     */
    const shuffledRecipes = [...recipes].sort(() => Math.random() - 0.5);

    /*
     * Build a separate pool per meal slot (BREAKFAST/LUNCH/DINNER/SNACK)
     * so a dinner-style dish like Kafta never lands in the Breakfast slot.
     */
    const poolByMealType = Object.fromEntries(
      MEAL_TYPES.map((mt) => [mt, getPoolForMealType(shuffledRecipes, mt)])
    ) as Record<(typeof MEAL_TYPES)[number], RecipeRow[]>;

    const days = Array.from({ length: 7 }, (_, dayOfWeek) => {
      const meals = MEAL_TYPES.map((mealType) => {
        const pool = poolByMealType[mealType];
        // Rotate through this slot's own pool across days
        const recipeIndex = dayOfWeek % pool.length;
        const recipe = pool[recipeIndex];

        return {
          planMealId: `${dayOfWeek}-${mealType}-${recipe.id}`,
          mealType,
          recipe,
        };
      });

      return {
        day: DAY_NAMES[dayOfWeek],
        dayOfWeek,
        meals,
      };
    });

    return NextResponse.json({
      dailyTargets,
      planGenerated: true,
      hasProfile: true,
      days,
    });
  } catch (error) {
    console.error("Error fetching planner:", error);

    return NextResponse.json(
      { error: "Failed to load planner" },
      { status: 500 }
    );
  }
}
