import { prisma } from "@/lib/prisma";
import { success, fail } from "@/lib/response";

export async function PUT(request: Request) {
  const body = await request.json();
  const { userId, name, ...profileFields } = body;

  if (!userId) {
    return fail("Missing required field: userId", 400);
  }

  try {
    if (name !== undefined) {
      await prisma.user.update({
        where: { id: userId },
        data: { name },
      });
    }

    const profile = await prisma.profile.update({
      where: { userId },
      data: profileFields,
      include: { user: true },
    });

    return success(profile);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return fail("Profile not found", 404);
    }

    console.error(error);
    return fail("Failed to update profile", 500);
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return fail("Missing required query param: userId", 400);
  }

  try {
    const profile = await prisma.profile.delete({
      where: { userId },
    });

    return success(profile);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return fail("Profile not found", 404);
    }

    console.error(error);
    return fail("Failed to delete profile", 500);
  }
}