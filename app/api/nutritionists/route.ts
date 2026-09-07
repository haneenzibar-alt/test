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

export async function GET() {
  try {
    const nutritionists = await prisma.nutritionistProfile.findMany({
      select: nutritionistSelect,
      orderBy: {
        user: {
          name: "asc",
        },
      },
    });

    return success(nutritionists);
  } catch (error) {
    console.error("Failed to load nutritionists:", error);
    return fail("Unable to load nutritionists. Please try again.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = typeof body.userId === "string" ? body.userId.trim() : "";
    const specialty =
      typeof body.specialty === "string" ? body.specialty.trim() : "";

    if (!userId) {
      return fail("Missing required field: userId", 400);
    }
    if (!specialty) {
      return fail("Missing required field: specialty", 400);
    }

    let credentials: string[] | undefined;
    let hourlyRate: number | null | undefined;
    try {
      credentials = parseCredentials(body.credentials);
      hourlyRate = parseHourlyRate(body.hourlyRate);
    } catch (error) {
      return fail(error instanceof Error ? error.message : "Invalid input", 400);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!user) {
      return fail("User not found", 404);
    }

    const existing = await prisma.nutritionistProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (existing) {
      return fail("A nutritionist profile already exists for this user", 409);
    }

    const nutritionist = await prisma.nutritionistProfile.create({
      data: {
        userId,
        specialty,
        bio: typeof body.bio === "string" ? body.bio.trim() : undefined,
        credentials: credentials ?? [],
        hourlyRate,
        availability:
          typeof body.availability === "string"
            ? body.availability.trim()
            : undefined,
      },
      select: nutritionistSelect,
    });

    return success(nutritionist, 201);
  } catch (error) {
    console.error("Failed to create nutritionist:", error);
    return fail("Unable to create nutritionist. Please try again.", 500);
  }
}
