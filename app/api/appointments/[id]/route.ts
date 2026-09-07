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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) {
      return fail("Missing required param: id", 400);
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      select: appointmentSelect,
    });

    if (!appointment) {
      return fail("Appointment not found", 404);
    }

    return success(appointment);
  } catch (error) {
    console.error("Failed to load appointment:", error);
    return fail("Unable to load appointment. Please try again.", 500);
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

    const existing = await prisma.appointment.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return fail("Appointment not found", 404);
    }

    const body = await request.json();
    const data: {
      scheduledAt?: Date;
      duration?: number;
      notes?: string | null;
      status?: AppointmentStatus;
    } = {};

    if (body.scheduledAt !== undefined) {
      const scheduledAt = new Date(body.scheduledAt);
      if (Number.isNaN(scheduledAt.getTime())) {
        return fail("scheduledAt must be a valid date", 400);
      }
      data.scheduledAt = scheduledAt;
    }

    if (body.duration !== undefined) {
      const duration = Number(body.duration);
      if (!Number.isInteger(duration) || duration <= 0) {
        return fail("duration must be a positive integer", 400);
      }
      data.duration = duration;
    }

    if (body.notes !== undefined) {
      data.notes = typeof body.notes === "string" ? body.notes.trim() : null;
    }

    if (body.status !== undefined) {
      if (
        typeof body.status !== "string" ||
        !allowedStatuses.has(body.status as AppointmentStatus)
      ) {
        return fail(
          "status must be PENDING, CONFIRMED, CANCELLED, or COMPLETED",
          400,
        );
      }
      data.status = body.status as AppointmentStatus;
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data,
      select: appointmentSelect,
    });

    return success(appointment);
  } catch (error) {
    console.error("Failed to update appointment:", error);
    return fail("Unable to update appointment. Please try again.", 500);
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

    const existing = await prisma.appointment.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return fail("Appointment not found", 404);
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status: "CANCELLED" },
      select: appointmentSelect,
    });

    return success(appointment);
  } catch (error) {
    console.error("Failed to cancel appointment:", error);
    return fail("Unable to cancel appointment. Please try again.", 500);
  }
}
