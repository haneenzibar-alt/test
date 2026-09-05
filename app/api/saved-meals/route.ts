import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateCurrentUser } from "@/lib/getOrCreateUser";
import { saveMealSchema } from "@/lib/validations/savedMeal";

// GET /

export async function GET() {
  const user = await getOrCreateCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const savedMeals = await prisma.savedMeal.findMany({
    where: { userId: user.id },
    include: { meal: true },
    orderBy: { createdAt: "desc" },
  });

  const meals = savedMeals.map((sm) => ({
    id: sm.meal.id,
    name: sm.meal.name,
    country: sm.meal.country,
    mealType: sm.meal.mealType,
    calories: sm.meal.calories,
    protein: sm.meal.protein,
    carbs: sm.meal.carbs,
    fat: sm.meal.fat,
    ingredients: sm.meal.ingredients,
    allergens: sm.meal.allergens,
    image: sm.meal.image,
  }));

  return NextResponse.json({ meals });
}

// POST 
export async function POST(req: NextRequest) {
  const user = await getOrCreateCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = saveMealSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { mealId } = parsed.data;

  
  const meal = await prisma.meal.findUnique({ where: { id: mealId } });
  if (!meal) {
    return NextResponse.json({ error: "Meal not found" }, { status: 404 });
  }

  try {
    await prisma.savedMeal.create({
      data: { userId: user.id, mealId },
    });
  } catch (err: unknown) {
    
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Meal already saved" },
        { status: 409 },
      );
    }
    throw err;
  }

  return NextResponse.json({ message: "Meal saved" }, { status: 201 });
}
