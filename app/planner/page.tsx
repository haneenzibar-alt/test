"use client";

import { useProfile } from "@/Context/ProfileContext";
import Planner from "@/complanner/Planner";
import PlannerLocked from "@/complanner/PlannerLocked";

export default function PlannerPage() {
  const { planGenerated } = useProfile();

  if (!planGenerated) {
    return <PlannerLocked />;
  }

  return <Planner />;
}
