import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { recipeId } = body;

    if (!recipeId) {
      return NextResponse.json(
        { error: "Missing recipeId" },
        { status: 400 }
      );
    }

    const savedMeal = await prisma.savedMeal.upsert({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
      update: {},
      create: {
        userId,
        recipeId,
      },
      include: {
        Recipe: true,
      },
    });

    return NextResponse.json(savedMeal);
  } catch (error) {
    console.error("Error saving meal:", error);

    return NextResponse.json(
      { error: "Failed to save meal" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    const savedMeals = await prisma.savedMeal.findMany({
      where: {
        userId,
      },
      include: {
        Recipe: true,
      },
      orderBy: {
        createdAt: "desc",
      },
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
