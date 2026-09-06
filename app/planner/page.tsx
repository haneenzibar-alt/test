"use client";

import { useRouter } from "next/navigation";
import Planner from "@/complanner/Planner";

export default function PlannerPage() {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.back()}
        className="px-4 py-2 text-gray-700 font-medium hover:text-emerald-600 transition"
      >
        ← Back
      </button>

      <Planner />
    </>
  );
}