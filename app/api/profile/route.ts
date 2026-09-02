import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json(
      { success: false, error: "Missing required query param: userId" },
      { status: 400 }
    );
  }

  const profile = await prisma.userProfile.findUnique({
    where: { userId },
    include: { user: true },
  });

  if (!profile) {
    return Response.json(
      { success: false, error: "Profile not found" },
      { status: 404 }
    );
  }

  return Response.json({
    success: true,
    data: profile,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, name, ...profileFields } = body;

  if (!userId) {
    return Response.json(
      { success: false, error: "Missing required field: userId" },
      { status: 400 }
    );
  }

  try {
    await prisma.user.upsert({
      where: { id: userId },
      update: { name },
      create: {
        id: userId,
        name,
        email: `${userId}@placeholder.fitplate.local`,
        passwordHash: "placeholder",
      },
    });

    const profile = await prisma.userProfile.upsert({
      where: { userId },
      update: profileFields,
      create: {
        userId,
        ...profileFields,
      },
    });

    return Response.json(
      { success: true, data: profile },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(error);
    return Response.json(
      { success: false, error: "Failed to save profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { userId, name, ...profileFields } = body;

  if (!userId) {
    return Response.json(
      { success: false, error: "Missing required field: userId" },
      { status: 400 }
    );
  }

  try {
    if (name !== undefined) {
      await prisma.user.update({
        where: { id: userId },
        data: { name },
      });
    }

    const profile = await prisma.userProfile.update({
      where: { userId },
      data: profileFields,
      include: { user: true },
    });

    return Response.json({
      success: true,
      data: profile,
    });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return Response.json(
        { success: false, error: "Profile not found" },
        { status: 404 }
      );
    }

    console.error(error);
    return Response.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json(
      { success: false, error: "Missing required query param: userId" },
      { status: 400 }
    );
  }

  try {
    const profile = await prisma.userProfile.delete({
      where: { userId },
    });

    return Response.json({
      success: true,
      data: profile,
    });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return Response.json(
        { success: false, error: "Profile not found" },
        { status: 404 }
      );
    }

    console.error(error);
    return Response.json(
      { success: false, error: "Failed to delete profile" },
      { status: 500 }
    );
  }
}
