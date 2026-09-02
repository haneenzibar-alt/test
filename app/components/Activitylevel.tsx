"use client";

import Card from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ActivityLevel } from "@/generated/prisma/client";

export default function Activitylevel({
  activityLevel,
  setActivityLevel,
}: {
  activityLevel: ActivityLevel | null;
  setActivityLevel: (value: ActivityLevel) => void;
}) {
  const { data: profileData, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/profile?userId=123");
        return response.data.data;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          return null; // no profile yet — normal for a new user
        }
        throw err;
      }
    },
  });

  console.log(profileData, isLoading, error);

  const options: [ActivityLevel, string, string, string, string][] = [
    ["SEDENTARY", "🪑", "Sedentary", "Desk job, little to no exercise", "×1.2"],
    ["LIGHTLY_ACTIVE", "🚶", "Lightly Active", "Light exercise 1–3 days/week", "×1.375"],
    ["MODERATELY_ACTIVE", "🏃", "Moderately Active", "Moderate exercise 3–5 days/week", "×1.55"],
    ["VERY_ACTIVE", "🏋", "Very Active", "Hard exercise 6–7 days/week", "×1.725"],
    ["EXTRA_ACTIVE", "⚡", "Extra Active", "Physical job or twice-daily training", "×1.9"],
  ];

  return (
    <div className="mx-auto max-w-2xl px-6 py-4">
      <Card
        step={3}
        color="orange"
        title="Activity Level"
        description="Used to calculate your total daily energy expenditure"
      >
        <div className="space-y-2">
          {options.map(([val, icon, label, sub, mult]) => (
            <button
              key={val}
              type="button"
              onClick={() => setActivityLevel(val)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                activityLevel === val
                  ? "border-amber-400 bg-amber-50"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <span className={`text-xl w-8 text-center ${activityLevel === val ? "" : "opacity-60"}`}>
                {icon}
              </span>
              <div className="flex-1">
                <div className={`text-sm font-semibold ${activityLevel === val ? "text-amber-800" : "text-gray-700"}`}>
                  {label}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${activityLevel === val ? "bg-amber-200 text-amber-800" : "bg-gray-100 text-gray-400"}`}>
                {mult}
              </span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
