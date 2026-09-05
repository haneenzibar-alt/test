import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: { RecipeIngredient: true },
  });

  if (!recipe) {
    return NextResponse.json({ error: "Meal not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: recipe.id,
    name: recipe.name,
    description: recipe.description,
    instructions: recipe.instructions,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    calories: recipe.calories,
    protein: recipe.protein,
    carbs: recipe.carbs,
    fat: recipe.fat,
    imageUrl: recipe.imageUrl,
    allergens: recipe.allergens,
    country: recipe.country,
    ingredients: recipe.RecipeIngredient.map((ing: { name: string; amount: number; unit: string }) => ({
      name: ing.name,
      amount: ing.amount,
      unit: ing.unit,
    })),
  });
}