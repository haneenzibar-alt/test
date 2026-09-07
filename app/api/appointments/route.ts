import { prisma } from "@/lib/prisma";
import { success, fail } from "@/lib/response";
import type { AppointmentStatus } from "@/generated/prisma/client";

const appointmentSelect = {
  id: true,
  clientId: true,
  nutritionistId: true,
  scheduledAt: true,
  duration: true,
  status: true,
  notes: true,
  client: {
    select: { id: true, name: true },
  },
  nutritionist: {
    select: { id: true, name: true },
  },
} as const;

const allowedStatuses = new Set<AppointmentStatus>([
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
]);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId")?.trim() || undefined;
    const nutritionistId = searchParams.get("nutritionistId")?.trim() || undefined;
    const status = searchParams.get("status")?.trim() || undefined;

    if (status && !allowedStatuses.has(status as AppointmentStatus)) {
      return fail("Invalid status filter", 400);
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        ...(clientId ? { clientId } : {}),
        ...(nutritionistId ? { nutritionistId } : {}),
        ...(status ? { status: status as AppointmentStatus } : {}),
      },
      select: appointmentSelect,
      orderBy: { scheduledAt: "asc" },
    });

    return success(appointments);
  } catch (error) {
    console.error("Failed to load appointments:", error);
    return fail("Unable to load appointments. Please try again.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const clientId = typeof body.clientId === "string" ? body.clientId.trim() : "";
    const nutritionistId =
      typeof body.nutritionistId === "string" ? body.nutritionistId.trim() : "";
    const scheduledAtRaw =
      typeof body.scheduledAt === "string" ? body.scheduledAt.trim() : "";

    if (!clientId) {
      return fail("Missing required field: clientId", 400);
    }
    if (!nutritionistId) {
      return fail("Missing required field: nutritionistId", 400);
    }
    if (!scheduledAtRaw) {
      return fail("Missing required field: scheduledAt", 400);
    }

    const scheduledAt = new Date(scheduledAtRaw);
    if (Number.isNaN(scheduledAt.getTime())) {
      return fail("scheduledAt must be a valid date", 400);
    }

    let duration: number | undefined;
    if (body.duration !== undefined) {
      duration = Number(body.duration);
      if (!Number.isInteger(duration) || duration <= 0) {
        return fail("duration must be a positive integer", 400);
      }
    }

    const client = await prisma.user.findUnique({
      where: { id: clientId },
      select: { id: true },
    });
    if (!client) {
      return fail("Client user not found", 404);
    }

    const nutritionist = await prisma.user.findUnique({
      where: { id: nutritionistId },
      select: {
        id: true,
        nutritionistProfile: { select: { id: true } },
      },
    });
    if (!nutritionist) {
      return fail("Nutritionist user not found", 404);
    }
    if (!nutritionist.nutritionistProfile) {
      return fail("This user does not have a nutritionist profile", 400);
    }

    const appointment = await prisma.appointment.create({
      data: {
        clientId,
        nutritionistId,
        scheduledAt,
        ...(duration !== undefined ? { duration } : {}),
        notes: typeof body.notes === "string" ? body.notes.trim() : undefined,
      },
      select: appointmentSelect,
    });

    return success(appointment, 201);
  } catch (error) {
    console.error("Failed to create appointment:", error);
    return fail("Unable to create appointment. Please try again.", 500);
  }
}
