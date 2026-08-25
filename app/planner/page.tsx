"use client";

import { useProfile } from "../Context/ProfileContext";
import PlannerLocked from "../complanner/PlannerLocked";
import PlannerHeader from "../complanner/PlannerHeader";

export default function PlannerPage() {
  const { planGenerated } = useProfile();

  if (!planGenerated) {
    return <PlannerLocked />;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-serif text-3xl font-bold text-gray-900">
       
      </h1>
      <PlannerHeader />
    </div>
  );
}