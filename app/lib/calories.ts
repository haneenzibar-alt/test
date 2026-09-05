import { ActivityLevel, Gender, HealthGoal } from "../../generated/prisma/client";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  SEDENTARY: 1.2,
  LIGHTLY_ACTIVE: 1.375,
  MODERATELY_ACTIVE: 1.55,
  VERY_ACTIVE: 1.725,
  EXTRA_ACTIVE: 1.9,
};

const GOAL_ADJUSTMENT: Record<HealthGoal, number> = {
  LOSE_WEIGHT: -500,
  MAINTAIN_WEIGHT: 0,
  GAIN_WEIGHT: 500,
};

interface CalorieInput {
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  healthGoal: HealthGoal;
}

export function calculateDailyCalories(input: CalorieInput) {
  const { weight, height, age, gender, activityLevel, healthGoal } = input;

  let bmr = 10 * weight + 6.25 * height - 5 * age;
  bmr += gender === "MALE" ? 5 : -161;

  const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel];
  const target = Math.round(tdee + GOAL_ADJUSTMENT[healthGoal]);

  return {
    calories: target,
    protein: Math.round((target * 0.3) / 4),
    carbs: Math.round((target * 0.4) / 4),
    fat: Math.round((target * 0.3) / 9),
  };
}