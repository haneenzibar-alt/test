import { fail } from "@/lib/response";

export async function GET() {
  return fail("Appointment booking is not connected yet.", 501);
}
