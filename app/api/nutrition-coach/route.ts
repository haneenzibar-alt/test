import { APIError } from "openai";
import { prisma } from "@/lib/prisma";
import { success, fail } from "@/lib/response";
import {
  COACH_SYSTEM_PROMPT,
  OPENROUTER_MODEL,
  getOpenRouter,
  getOpenRouterApiKey,
} from "@/lib/openrouter";
import type { MealType } from "@/generated/prisma/client";

const MAX_MESSAGE_LENGTH = 2000;
const HISTORY_LIMIT = 10;

const mealTypeFromMessage: Array<{ match: RegExp; mealType: MealType }> = [
  { match: /breakfast/i, mealType: "BREAKFAST" },
  { match: /lunch/i, mealType: "LUNCH" },
  { match: /dinner/i, mealType: "DINNER" },
  { match: /snack/i, mealType: "SNACK" },
];

function present(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}

function formatProfileContext(profile: {
  name: string | null;
  age: number | null;
  gender: string | null;
  height: number | null;
  weight: number | null;
  targetWeight: number | null;
  country: string | null;
  healthGoal: string | null;
  activityLevel: string | null;
  dietType: string | null;
  allergies: string[];
  medicalConditions: string[];
  dislikedFoods: string[];
  mealsPerDay: number;
  weeklyWorkoutFrequency: number;
  mealSourcePreference: string | null;
  calorieTarget: number | null;
  proteinTarget: number | null;
  carbTarget: number | null;
  fatTarget: number | null;
  userName: string | null;
}): string {
  const lines: string[] = [];
  const displayName = profile.name ?? profile.userName;
  if (present(displayName)) lines.push(`name: ${displayName}`);
  if (present(profile.age)) lines.push(`age: ${profile.age}`);
  if (present(profile.gender)) lines.push(`gender: ${profile.gender}`);
  if (present(profile.height)) lines.push(`height: ${profile.height} cm`);
  if (present(profile.weight)) lines.push(`weight: ${profile.weight} kg`);
  if (present(profile.targetWeight)) {
    lines.push(`targetWeight: ${profile.targetWeight} kg`);
  }
  if (present(profile.country)) lines.push(`country: ${profile.country}`);
  if (present(profile.healthGoal)) lines.push(`healthGoal: ${profile.healthGoal}`);
  if (present(profile.activityLevel)) {
    lines.push(`activityLevel: ${profile.activityLevel}`);
  }
  if (present(profile.dietType)) lines.push(`dietType: ${profile.dietType}`);
  if (present(profile.allergies)) {
    lines.push(`allergies: ${profile.allergies.join(", ")}`);
  }
  if (present(profile.medicalConditions)) {
    lines.push(`medicalConditions: ${profile.medicalConditions.join(", ")}`);
  }
  if (present(profile.dislikedFoods)) {
    lines.push(`dislikedFoods: ${profile.dislikedFoods.join(", ")}`);
  }
  lines.push(`mealsPerDay: ${profile.mealsPerDay}`);
  lines.push(`weeklyWorkoutFrequency: ${profile.weeklyWorkoutFrequency}`);
  if (present(profile.mealSourcePreference)) {
    lines.push(`mealSourcePreference: ${profile.mealSourcePreference}`);
  }
  if (present(profile.calorieTarget)) {
    lines.push(`calorieTarget: ${profile.calorieTarget} kcal`);
  }
  if (present(profile.proteinTarget)) {
    lines.push(`proteinTarget: ${profile.proteinTarget} g`);
  }
  if (present(profile.carbTarget)) {
    lines.push(`carbTarget: ${profile.carbTarget} g`);
  }
  if (present(profile.fatTarget)) {
    lines.push(`fatTarget: ${profile.fatTarget} g`);
  }

  if (present(profile.height) && present(profile.weight) && profile.height && profile.weight) {
    const heightM = profile.height / 100;
    const bmi = Number((profile.weight / (heightM * heightM)).toFixed(1));
    lines.push(`bmiFromHeightWeight: ${bmi}`);
  }

  if (lines.length === 0) {
    return "No FitPlate profile fields are set.";
  }

  return `Known FitPlate profile fields only:\n${lines.join("\n")}`;
}

function requestedMealType(message: string): MealType | undefined {
  return mealTypeFromMessage.find((item) => item.match.test(message))?.mealType;
}

export async function POST(request: Request) {
  try {
    if (!getOpenRouterApiKey()) {
      return fail("Nutrition Coach is not configured.", 503);
    }

    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const userId = typeof body.userId === "string" ? body.userId.trim() : "";

    if (!message) {
      return fail("Missing required field: message", 400);
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return fail("Message is too long", 400);
    }
    if (!userId) {
      return fail("Missing required field: userId", 400);
    }

    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
    });

    if (!profile) {
      return fail("Profile not found", 404);
    }

    const mealType = requestedMealType(message);
    const wantsLebanese = /leban(ese|on)/i.test(message);
    const wantsWorkout = /workout|post-workout|protein|training/i.test(message);

    const recipeFilters = [
      profile.healthGoal ? { goal: profile.healthGoal } : undefined,
      profile.country ? { country: profile.country } : undefined,
      mealType ? { mealType } : undefined,
      wantsLebanese ? { country: "Lebanon" } : undefined,
    ].filter(Boolean) as object[];

    const recipes = await prisma.recipe.findMany({
      where: recipeFilters.length > 0 ? { OR: recipeFilters } : undefined,
      select: {
        id: true,
        name: true,
        calories: true,
        protein: true,
        carbs: true,
        fat: true,
        mealType: true,
        country: true,
        goal: true,
        description: true,
        RecipeIngredient: {
          select: {
            name: true,
            amount: true,
            unit: true,
          },
          take: 6,
        },
      },
      orderBy: wantsWorkout ? { protein: "desc" } : { name: "asc" },
      take: 8,
    });

    const profileContext = formatProfileContext({
      name: profile.name,
      age: profile.age,
      gender: profile.gender,
      height: profile.height,
      weight: profile.weight,
      targetWeight: profile.targetWeight,
      country: profile.country,
      healthGoal: profile.healthGoal,
      activityLevel: profile.activityLevel,
      dietType: profile.dietType,
      allergies: profile.allergies,
      medicalConditions: profile.medicalConditions,
      dislikedFoods: profile.dislikedFoods,
      mealsPerDay: profile.mealsPerDay,
      weeklyWorkoutFrequency: profile.weeklyWorkoutFrequency,
      mealSourcePreference: profile.mealSourcePreference,
      calorieTarget: profile.calorieTarget,
      proteinTarget: profile.proteinTarget,
      carbTarget: profile.carbTarget,
      fatTarget: profile.fatTarget,
      userName: profile.user.name,
    });

    const recipeContext =
      recipes.length === 0
        ? "No matching FitPlate recipes were selected for this question."
        : `Relevant FitPlate recipes (suggest only from this list):\n${recipes
            .map((recipe) => {
              const ingredients = recipe.RecipeIngredient.map(
                (item) => `${item.name} ${item.amount}${item.unit}`,
              ).join(", ");
              return `- ${recipe.name} (${recipe.mealType ?? "meal"}, ${recipe.calories} kcal, P ${recipe.protein}g / C ${recipe.carbs}g / F ${recipe.fat}g${recipe.country ? `, ${recipe.country}` : ""}${ingredients ? `; ingredients: ${ingredients}` : ""})`;
            })
            .join("\n")}`;

    let session = await prisma.coachSession.findFirst({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: HISTORY_LIMIT,
        },
      },
    });

    if (!session) {
      session = await prisma.coachSession.create({
        data: {
          userId,
          title: "Nutrition Coach",
        },
        include: {
          messages: true,
        },
      });
    }

    await prisma.coachMessage.create({
      data: {
        sessionId: session.id,
        role: "user",
        content: message,
      },
    });

    const history: Array<{ role: "user" | "assistant"; content: string }> =
      session.messages.map((item) => ({
        role: item.role === "assistant" ? "assistant" : "user",
        content: item.content,
      }));

    const completion = await getOpenRouter().chat.completions.create({
      model: OPENROUTER_MODEL,
      messages: [
        { role: "system", content: COACH_SYSTEM_PROMPT },
        {
          role: "system",
          content: `${profileContext}\n\n${recipeContext}`,
        },
        ...history,
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      console.error("Nutrition Coach request failed", {
        provider: "openrouter",
        reason: "empty_response",
        model: OPENROUTER_MODEL,
      });
      return fail("Unable to reach the Nutrition Coach right now. Please try again.", 502);
    }

    await prisma.coachMessage.create({
      data: {
        sessionId: session.id,
        role: "assistant",
        content: reply,
      },
    });

    return success({
      reply,
      model: completion.model ?? OPENROUTER_MODEL,
    });
  } catch (error) {
    const status = error instanceof APIError ? error.status : undefined;
    console.error("Nutrition Coach request failed", {
      provider: "openrouter",
      reason: error instanceof APIError ? (error.type ?? "api_error") : "network_or_unknown",
      status,
    });
    return fail("Unable to reach the Nutrition Coach right now. Please try again.", 502);
  }
}