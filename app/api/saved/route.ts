import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth"; // TODO: wire up to your real auth

// GET /api/saved -> list all saved recipes for the current user
export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const savedMeals = await prisma.savedMeal.findMany({
      where: { userId },
      include: { Recipe: true },
      orderBy: { savedAt: "desc" },
    });

    return NextResponse.json(savedMeals);
  } catch (error) {
    console.error("Error fetching saved meals:", error);
    return NextResponse.json(
      { error: "Failed to fetch saved meals" },
      { status: 500 }
    );
  }
}

// POST /api/saved  { recipeId } -> save a recipe for the current user
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { recipeId } = await request.json();
    if (!recipeId) {
      return NextResponse.json(
        { error: "recipeId is required" },
        { status: 400 }
      );
    }

    const recipe = await prisma.recipe.findUnique({ where: { id: recipeId } });
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    // upsert so double-tapping "Save Meal" doesn't throw a unique constraint error
    const saved = await prisma.savedMeal.upsert({
      where: { userId_recipeId: { userId, recipeId } },
      update: {},
      create: { userId, recipeId },
      include: { Recipe: true },
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("Error saving meal:", error);
    return NextResponse.json(
      { error: "Failed to save meal" },
      { status: 500 }
    );
  }
}
