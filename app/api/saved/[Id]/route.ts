import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

// DELETE /api/saved/:id -> id here is the recipeId; unsaves it for the current user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.savedMeal.delete({
      where: { userId_recipeId: { userId, recipeId: params.id } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error unsaving meal:", error);
    return NextResponse.json(
      { error: "Failed to unsave meal" },
      { status: 500 }
    );
  }
}
