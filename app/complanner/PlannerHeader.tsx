"use client";

import { useState } from "react";
import { useProfile } from "../Context/ProfileContext";

const DAYS = [1, 2, 3, 4, 5, 6, 7];

export default function PlannerHeader() {
  const { country, sex, age, weight, height, goal, workoutDays } =
    useProfile();
  const [selectedDay, setSelectedDay] = useState(1);

  // Same calculation used on the Home results page, kept in sync
  const bmr =
    sex === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityMultiplier =
    workoutDays === 0
      ? 1.2
      : workoutDays <= 2
      ? 1.375
      : workoutDays <= 4
      ? 1.55
      : workoutDays <= 6
      ? 1.725
      : 1.9;

  const tdee = bmr * activityMultiplier;

  const calories =
    goal === "lose"
      ? Math.round(tdee - 500)
      : goal === "gain"
      ? Math.round(tdee + 500)
      : Math.round(tdee);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-serif text-3xl font-bold text-gray-900">
        Meal Planner
      </h1>
      <p className="mt-1 text-gray-400">
        {country} cuisine · {calories} kcal/day target
      </p>

      <div className="mt-6 flex gap-3">
        {DAYS.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`flex h-16 w-16 flex-col items-center justify-center rounded-xl border font-semibold transition-colors ${
                isSelected
                  ? "border-emerald-800 bg-emerald-800 text-white"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              <span className="text-xs font-medium opacity-80">Day</span>
              <span className="text-lg">{day}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
