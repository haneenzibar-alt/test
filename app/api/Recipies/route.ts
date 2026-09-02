import { prisma } from "@/lib/prisma";


export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: { ingredients: true },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({
      success: true,
      data: recipes,
    });
  } catch (error: unknown) {
    console.error(error);
    return Response.json(
      { success: false, error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    description,
    instructions,
    prepTime,
    cookTime,
    calories,
    protein,
    carbs,
    fat,
    imageUrl,
    country,
    isAiGenerated,
    createdById,
    ingredients,
  } = body;

  if (!name || calories === undefined || protein === undefined || carbs === undefined || fat === undefined) {
    return Response.json(
      { success: false, error: "Missing required fields: name, calories, protein, carbs, fat" },
      { status: 400 }
    );
  }

  try {
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        instructions: instructions ?? [],
        prepTime,
        cookTime,
        calories,
        protein,
        carbs,
        fat,
        imageUrl,
        country,
        isAiGenerated: isAiGenerated ?? false,
        createdById,
        ingredients: ingredients
          ? {
              create: ingredients.map((i: { name: string; amount: number; unit: string }) => ({
                name: i.name,
                amount: i.amount,
                unit: i.unit,
              })),
            }
          : undefined,
      },
      include: { ingredients: true },
    });

    return Response.json(
      { success: true, data: recipe },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error(error);
    return Response.json(
      { success: false, error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}
