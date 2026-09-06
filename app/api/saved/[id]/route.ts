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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) {
      return fail("Missing required param: id", 400);
    }

    const savedMeal = await prisma.savedMeal.findUnique({
      where: { id },
      select: savedMealSelect,
    });

    if (!savedMeal) {
      return fail("Saved meal not found", 404);
    }

    return success(toSavedMeal(savedMeal));
  } catch (error) {
    console.error("Failed to load saved meal:", error);
    return fail("Unable to load saved meal. Please try again.", 500);
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

    const existing = await prisma.savedMeal.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return fail("Saved meal not found", 404);
    }

    const savedMeal = await prisma.savedMeal.delete({
      where: { id },
      select: savedMealSelect,
    });

    return success(toSavedMeal(savedMeal));
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return fail("Saved meal not found", 404);
    }

    console.error("Failed to remove saved meal:", error);
    return fail("Unable to remove saved meal. Please try again.", 500);
  }
}
