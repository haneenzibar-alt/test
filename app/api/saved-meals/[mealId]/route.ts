import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateCurrentUser } from "@/lib/getOrCreateUser";

// DELETE 
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ mealId: string }> },
) {
  const user = await getOrCreateCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { mealId } = await params;

  try {
    await prisma.savedMeal.delete({
      where: {
        userId_mealId: { userId: user.id, mealId },
      },
    });
  } catch (err: unknown) {
  
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Saved meal not found" },
        { status: 404 },
      );
    }
    throw err;
  }

  return NextResponse.json({ message: "Meal removed" }, { status: 200 });
}
