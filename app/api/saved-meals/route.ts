import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";

// GET: list saved meals for current user
export async function GET(req: NextRequest) {
  const userId = getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 401 });
  }

  const saved = await prisma.savedMeal.findMany({
    where: { userId },
    include: { Recipe: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    saved.map((s: any) => ({
      savedMealId: s.id,
      savedAt: s.createdAt,
      recipe: s.Recipe,
    }))
  );
}

// POST: save a meal { recipeId }
export async function POST(req: NextRequest) {
  const userId = getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 401 });
  }

  const body = await req.json();
  const { recipeId } = body;

  if (!recipeId) {
    return NextResponse.json({ error: "recipeId is required" }, { status: 400 });
  }

  try {
    const saved = await prisma.savedMeal.create({
      data: { userId, recipeId },
      include: { Recipe: true },
    });
    return NextResponse.json(saved, { status: 201 });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "Meal already saved" }, { status: 409 });
    }
    if (err.code === "P2003") {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// DELETE: unsave a meal ?recipeId=xxx
export async function DELETE(req: NextRequest) {
  const userId = getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const recipeId = searchParams.get("recipeId");
  if (!recipeId) {
    return NextResponse.json({ error: "recipeId is required" }, { status: 400 });
  }

  await prisma.savedMeal.deleteMany({ where: { userId, recipeId } });
  return NextResponse.json({ success: true });
}