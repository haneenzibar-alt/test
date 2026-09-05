import { prisma } from "@/lib/prisma";
import { success, fail } from "@/lib/response";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return fail("Missing required param: id", 400);
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: id },
    include: { user: true },
  });

  if (!profile) {
    return fail("Profile not found", 404);
  }

  return success(profile);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { name, ...profileFields } = body;

  if (!id) {
    return fail("Missing required param: id", 400);
  }

  try {
    
    if (name !== undefined) {
      await prisma.user.update({
        where: { id },
        data: { name },
      });
    }

    const profile = await prisma.profile.create({
      data: {
        userId: id,
        ...profileFields,
      },
    });

    return success(profile, 201);
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "P2025") {
        return fail("User not found", 404);
      }
      if (error.code === "P2002") {
        return fail("Profile already exists for this user", 409);
      }
    }

    console.error(error);
    return fail("Failed to create profile", 500);
  }
}
