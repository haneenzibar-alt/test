"use client";

import { useProfile } from "@/Context/ProfileContext";
import Planner from "@/complanner/planner";
import PlannerLocked from "@/complanner/plannerLocked";

export default function PlannerPage() {
  const { planGenerated } = useProfile();

  if (!planGenerated) {
    return <PlannerLocked />;
  }

  return <Planner />;
}
