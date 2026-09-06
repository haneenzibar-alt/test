import { prisma } from "@/lib/prisma";
import { success, fail } from "@/lib/response";

const nutritionistSelect = {
  id: true,
  specialty: true,
  bio: true,
  credentials: true,
  hourlyRate: true,
  availability: true,
  user: {
    select: {
      id: true,
      name: true,
      role: true,
    },
  },
} as const;

function parseCredentials(value: unknown): string[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error("credentials must be an array of strings");
  }
  return value.map((item) => item.trim()).filter((item) => item.length > 0);
}

function parseHourlyRate(value: unknown): number | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  const rate = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(rate) || rate < 0) {
    throw new Error("hourlyRate must be a number that is 0 or greater");
  }
  return rate;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) {
      return fail("Missing required param: id", 400);
    }

    const nutritionist = await prisma.nutritionistProfile.findUnique({
      where: { id },
      select: nutritionistSelect,
    });

    if (!nutritionist) {
      return fail("Nutritionist not found", 404);
    }

    return success(nutritionist);
  } catch (error) {
    console.error("Failed to load nutritionist:", error);
    return fail("Unable to load nutritionist. Please try again.", 500);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) {
      return fail("Missing required param: id", 400);
    }

    const existing = await prisma.nutritionistProfile.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return fail("Nutritionist not found", 404);
    }

    const body = await request.json();
    const data: {
      specialty?: string;
      bio?: string | null;
      credentials?: string[];
      hourlyRate?: number | null;
      availability?: string | null;
    } = {};

    if (body.specialty !== undefined) {
      if (typeof body.specialty !== "string" || !body.specialty.trim()) {
        return fail("specialty must be a non-empty string", 400);
      }
      data.specialty = body.specialty.trim();
    }

    if (body.bio !== undefined) {
      data.bio = typeof body.bio === "string" ? body.bio.trim() : null;
    }

    if (body.availability !== undefined) {
      data.availability =
        typeof body.availability === "string" ? body.availability.trim() : null;
    }

    try {
      const credentials = parseCredentials(body.credentials);
      const hourlyRate = parseHourlyRate(body.hourlyRate);
      if (credentials !== undefined) data.credentials = credentials;
      if (hourlyRate !== undefined) data.hourlyRate = hourlyRate;
    } catch (error) {
      return fail(error instanceof Error ? error.message : "Invalid input", 400);
    }

    const nutritionist = await prisma.nutritionistProfile.update({
      where: { id },
      data,
      select: nutritionistSelect,
    });

    return success(nutritionist);
  } catch (error) {
    console.error("Failed to update nutritionist:", error);
    return fail("Unable to update nutritionist. Please try again.", 500);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) {
      return fail("Missing required param: id", 400);
    }

    const existing = await prisma.nutritionistProfile.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });
    if (!existing) {
      return fail("Nutritionist not found", 404);
    }

    const linkedAppointments = await prisma.appointment.count({
      where: { nutritionistId: existing.userId },
    });
    if (linkedAppointments > 0) {
      return fail(
        "This nutritionist has linked appointments and cannot be deleted.",
        409,
      );
    }

    await prisma.nutritionistProfile.delete({
      where: { id },
    });

    return success({ id });
  } catch (error) {
    console.error("Failed to delete nutritionist:", error);
    return fail("Unable to delete nutritionist. Please try again.", 500);
  }
}
