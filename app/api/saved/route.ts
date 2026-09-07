import { prisma } from "@/lib/prisma";
import { success, fail } from "@/lib/response";

const recipeSelect = {
  id: true,
  name: true,
  calories: true,
  protein: true,
  carbs: true,
  fat: true,
  imageUrl: true,
  prepTime: true,
  cookTime: true,
  description: true,
} as const;

const savedMealSelect = {
  id: true,
  userId: true,
  recipeId: true,
  createdAt: true,
  Recipe: {
    select: recipeSelect,
  },
} as const;

function toSavedMeal(row: {
  id: string;
  userId: string;
  recipeId: string;
  createdAt: Date;
  Recipe: unknown;
}) {
  return {
    id: row.id,
    userId: row.userId,
    recipeId: row.recipeId,
    createdAt: row.createdAt,
    recipe: row.Recipe,
  };
}

export async function GET(request: Request) {
  try {
    const userId = new URL(request.url).searchParams.get("userId")?.trim();
    if (!userId) {
      return fail("Missing required query param: userId", 400);
    }

    const savedMeals = await prisma.savedMeal.findMany({
      where: { userId },
      select: savedMealSelect,
      orderBy: { createdAt: "desc" },
    });

    return success(savedMeals.map(toSavedMeal));
  } catch (error) {
    console.error("Failed to load saved meals:", error);
    return fail("Unable to load saved meals. Please try again.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = typeof body.userId === "string" ? body.userId.trim() : "";
    const recipeId =
      typeof body.recipeId === "string" ? body.recipeId.trim() : "";

    if (!userId) {
      return fail("Missing required field: userId", 400);
    }
    if (!recipeId) {
      return fail("Missing required field: recipeId", 400);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!user) {
      return fail("User not found", 404);
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { id: true },
    });
    if (!recipe) {
      return fail("Recipe not found", 404);
    }

    const existing = await prisma.savedMeal.findUnique({
      where: { userId_recipeId: { userId, recipeId } },
      select: savedMealSelect,
    });
    if (existing) {
      return fail("This recipe is already saved", 409);
    }

    const savedMeal = await prisma.savedMeal.create({
      data: { userId, recipeId },
      select: savedMealSelect,
    });

    return success(toSavedMeal(savedMeal), 201);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return fail("This recipe is already saved", 409);
    }

    console.error("Failed to save meal:", error);
    return fail("Unable to save meal. Please try again.", 500);
  }
}
