import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MEAL_TYPES = [
  "BREAKFAST",
  "LUNCH",
  "DINNER",
  "SNACK",
] as const;

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
        days: [],
      });
    }

    /*
     * We don't want the same recipe repeated in one day.
     *
     * We shuffle the recipes so the planner doesn't always
     * show the exact same meals.
     */
    const shuffledRecipes = [...recipes].sort(() => Math.random() - 0.5);

    /*
     * We use one recipe only once per day.
     *
     * Example:
     *
     * Breakfast -> recipe 1
     * Lunch     -> recipe 2
     * Dinner    -> recipe 3
     * Snack     -> recipe 4
     */

    const days = Array.from({ length: 7 }, (_, dayOfWeek) => {
      const meals = MEAL_TYPES.map((mealType, index) => {
        // Rotate through recipes for different days
        const recipeIndex =
          (dayOfWeek * MEAL_TYPES.length + index) %
          shuffledRecipes.length;

        const recipe = shuffledRecipes[recipeIndex];

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
