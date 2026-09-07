import { prisma } from "@/lib/prisma";
import { success, fail } from "@/lib/response";
import type {
  ActivityLevel,
  DietType,
  Gender,
  HealthGoal,
  MealSourcePreference,
} from "@/generated/prisma/client";

const profileSelect = {
  id: true,
  userId: true,
  name: true,
  age: true,
  gender: true,
  height: true,
  weight: true,
  targetWeight: true,
  activityLevel: true,
  dietType: true,
  allergies: true,
  country: true,
  healthGoal: true,
  medicalConditions: true,
  dislikedFoods: true,
  mealsPerDay: true,
  weeklyWorkoutFrequency: true,
  mealSourcePreference: true,
  calorieTarget: true,
  proteinTarget: true,
  carbTarget: true,
  fatTarget: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },
} as const;

const genders = new Set<Gender>([
  "MALE",
  "FEMALE",
  "OTHER",
  "PREFER_NOT_TO_SAY",
]);
const activityLevels = new Set<ActivityLevel>([
  "SEDENTARY",
  "LIGHTLY_ACTIVE",
  "MODERATELY_ACTIVE",
  "VERY_ACTIVE",
  "EXTRA_ACTIVE",
]);
const dietTypes = new Set<DietType>([
  "STANDARD",
  "VEGETARIAN",
  "VEGAN",
  "KETO",
  "PALEO",
  "MEDITERRANEAN",
  "PESCATARIAN",
  "GLUTEN_FREE",
]);
const healthGoals = new Set<HealthGoal>([
  "LOSE_WEIGHT",
  "MAINTAIN_WEIGHT",
  "GAIN_WEIGHT",
]);
const mealSources = new Set<MealSourcePreference>([
  "COOK_AT_HOME",
  "ORDER_DELIVERY",
  "EAT_OUTSIDE",
  "MIX_OF_ALL",
]);

type ProfileData = {
  name?: string | null;
  age?: number | null;
  gender?: Gender | null;
  height?: number | null;
  weight?: number | null;
  targetWeight?: number | null;
  activityLevel?: ActivityLevel;
  dietType?: DietType;
  allergies?: string[];
  country?: string | null;
  healthGoal?: HealthGoal | null;
  medicalConditions?: string[];
  dislikedFoods?: string[];
  mealsPerDay?: number;
  weeklyWorkoutFrequency?: number;
  mealSourcePreference?: MealSourcePreference | null;
  calorieTarget?: number | null;
  proteinTarget?: number | null;
  carbTarget?: number | null;
  fatTarget?: number | null;
};

function parseOptionalText(
  value: unknown,
  field: string,
): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== "string") {
    throw new Error(`${field} must be a string`);
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function parseOptionalInt(
  value: unknown,
  field: string,
  min: number,
): number | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(parsed) || parsed < min) {
    throw new Error(`${field} must be a whole number of ${min} or greater`);
  }
  return parsed;
}

function parseOptionalNumber(
  value: unknown,
  field: string,
  min: number,
): number | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed) || parsed < min) {
    throw new Error(`${field} must be a number of ${min} or greater`);
  }
  return parsed;
}

function parseStringList(value: unknown, field: string): string[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${field} must be an array of strings`);
  }
  return value.map((item) => item.trim()).filter((item) => item.length > 0);
}

function parseEnum<T extends string>(
  value: unknown,
  field: string,
  allowed: Set<T>,
): T | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== "string" || !allowed.has(value as T)) {
    throw new Error(`${field} is not a valid value`);
  }
  return value as T;
}

function parseProfileFields(body: Record<string, unknown>): ProfileData {
  const data: ProfileData = {};

  const name = parseOptionalText(body.name, "name");
  if (name !== undefined) data.name = name;

  const age = parseOptionalInt(body.age, "age", 1);
  if (age !== undefined) data.age = age;

  const gender = parseEnum(body.gender, "gender", genders);
  if (gender !== undefined) data.gender = gender;

  const height = parseOptionalNumber(body.height, "height", 1);
  if (height !== undefined) data.height = height;

  const weight = parseOptionalNumber(body.weight, "weight", 1);
  if (weight !== undefined) data.weight = weight;

  const targetWeight = parseOptionalNumber(body.targetWeight, "targetWeight", 1);
  if (targetWeight !== undefined) data.targetWeight = targetWeight;

  const activityLevel = parseEnum(
    body.activityLevel,
    "activityLevel",
    activityLevels,
  );
  if (activityLevel) data.activityLevel = activityLevel;

  const dietType = parseEnum(body.dietType, "dietType", dietTypes);
  if (dietType) data.dietType = dietType;

  const allergies = parseStringList(body.allergies, "allergies");
  if (allergies !== undefined) data.allergies = allergies;

  const country = parseOptionalText(body.country, "country");
  if (country !== undefined) data.country = country;

  const healthGoal = parseEnum(body.healthGoal, "healthGoal", healthGoals);
  if (healthGoal !== undefined) data.healthGoal = healthGoal;

  const medicalConditions = parseStringList(
    body.medicalConditions,
    "medicalConditions",
  );
  if (medicalConditions !== undefined) data.medicalConditions = medicalConditions;

  const dislikedFoods = parseStringList(body.dislikedFoods, "dislikedFoods");
  if (dislikedFoods !== undefined) data.dislikedFoods = dislikedFoods;

  const mealsPerDay = parseOptionalInt(body.mealsPerDay, "mealsPerDay", 1);
  if (mealsPerDay !== undefined && mealsPerDay !== null) {
    data.mealsPerDay = mealsPerDay;
  }

  const weeklyWorkoutFrequency = parseOptionalInt(
    body.weeklyWorkoutFrequency,
    "weeklyWorkoutFrequency",
    0,
  );
  if (weeklyWorkoutFrequency !== undefined && weeklyWorkoutFrequency !== null) {
    data.weeklyWorkoutFrequency = weeklyWorkoutFrequency;
  }

  const mealSourcePreference = parseEnum(
    body.mealSourcePreference,
    "mealSourcePreference",
    mealSources,
  );
  if (mealSourcePreference !== undefined) {
    data.mealSourcePreference = mealSourcePreference;
  }

  const calorieTarget = parseOptionalInt(body.calorieTarget, "calorieTarget", 0);
  if (calorieTarget !== undefined) data.calorieTarget = calorieTarget;

  const proteinTarget = parseOptionalNumber(
    body.proteinTarget,
    "proteinTarget",
    0,
  );
  if (proteinTarget !== undefined) data.proteinTarget = proteinTarget;

  const carbTarget = parseOptionalNumber(body.carbTarget, "carbTarget", 0);
  if (carbTarget !== undefined) data.carbTarget = carbTarget;

  const fatTarget = parseOptionalNumber(body.fatTarget, "fatTarget", 0);
  if (fatTarget !== undefined) data.fatTarget = fatTarget;

  return data;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) {
      return fail("Missing required param: id", 400);
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: id },
      select: profileSelect,
    });

    if (!profile) {
      return fail("Profile not found", 404);
    }

    return success(profile);
  } catch (error) {
    console.error("Failed to load profile:", error);
    return fail("Unable to load profile. Please try again.", 500);
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) {
      return fail("Missing required param: id", 400);
    }

    const body = (await request.json()) as Record<string, unknown>;

    let data: ProfileData;
    try {
      data = parseProfileFields(body);
    } catch (error) {
      return fail(error instanceof Error ? error.message : "Invalid input", 400);
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!user) {
      return fail("User not found", 404);
    }

    const existing = await prisma.profile.findUnique({
      where: { userId: id },
      select: { id: true },
    });
    if (existing) {
      return fail("A profile already exists for this user", 409);
    }

    const profile = await prisma.profile.create({
      data: {
        userId: id,
        ...data,
      },
      select: profileSelect,
    });

    return success(profile, 201);
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "P2025") {
        return fail("User not found", 404);
      }
      if (error.code === "P2002") {
        return fail("A profile already exists for this user", 409);
      }
    }

    console.error("Failed to create profile:", error);
    return fail("Unable to create profile. Please try again.", 500);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) {
      return fail("Missing required param: id", 400);
    }

    const body = (await request.json()) as Record<string, unknown>;

    let data: ProfileData;
    try {
      data = parseProfileFields(body);
    } catch (error) {
      return fail(error instanceof Error ? error.message : "Invalid input", 400);
    }

    const existing = await prisma.profile.findUnique({
      where: { userId: id },
      select: { id: true },
    });
    if (!existing) {
      return fail("Profile not found", 404);
    }

    const profile = await prisma.profile.update({
      where: { userId: id },
      data,
      select: profileSelect,
    });

    return success(profile);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return fail("Profile not found", 404);
    }

    console.error("Failed to update profile:", error);
    return fail("Unable to update profile. Please try again.", 500);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) {
      return fail("Missing required param: id", 400);
    }

    const existing = await prisma.profile.findUnique({
      where: { userId: id },
      select: { id: true },
    });
    if (!existing) {
      return fail("Profile not found", 404);
    }

    const profile = await prisma.profile.delete({
      where: { userId: id },
      select: profileSelect,
    });

    return success(profile);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return fail("Profile not found", 404);
    }

    console.error("Failed to delete profile:", error);
    return fail("Unable to delete profile. Please try again.", 500);
  }
}
