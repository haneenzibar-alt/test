import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { calculateDailyCalories } from "@/lib/calories";

export async function GET(req: NextRequest) {
  const userId = getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 401 });
  }

  const profile = await prisma.profile.findUnique({ where: { userId } });
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // Use stored targets if present, otherwise calculate on the fly
  let dailyTargets;
  if (profile.calorieTarget) {
    dailyTargets = {
      calories: profile.calorieTarget,
      protein: profile.proteinTarget ?? 0,
      carbs: profile.carbTarget ?? 0,
      fat: profile.fatTarget ?? 0,
    };
  } else if (
    profile.weight &&
    profile.height &&
    profile.age &&
    profile.gender
  ) {
    dailyTargets = calculateDailyCalories({
      weight: profile.weight,
      height: profile.height,
      age: profile.age,
      gender: profile.gender,
      activityLevel: profile.activityLevel,
      healthGoal: profile.healthGoal ?? "MAINTAIN_WEIGHT",
    });
  } else {
    return NextResponse.json(
      { error: "Incomplete profile: missing weight/height/age/gender" },
      { status: 400 }
    );
  }

  // Get the latest meal plan for this user
  const mealPlan = await prisma.mealPlan.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      meals: {
        include: { Recipe: true },
        orderBy: [{ dayOfWeek: "asc" }, { mealType: "asc" }],
      },
    },
  });

  if (!mealPlan) {
    return NextResponse.json({
      dailyTargets,
      planGenerated: false,
      days: [],
    });
  }

  // Group meals by day of week
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = dayNames.map((name, index) => ({
    day: name,
    dayOfWeek: index,
   meals: mealPlan.meals
  .filter((m: any) => m.dayOfWeek === index)
  .map((m: any) => ({
        planMealId: m.id,
        mealType: m.mealType,
        recipe: m.Recipe,
      })),
  }));

  return NextResponse.json({
    dailyTargets,
    planGenerated: true,
    mealPlanId: mealPlan.id,
    days,
  });
}
