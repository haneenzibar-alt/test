"use client";

import { useState } from "react";

const MEALS_PER_DAY = [3, 4, 5];

const MEAL_SOURCES = [
  { id: "cook", title: "Cook at Home", description: "Recipes with full ingredients", icon: "🔍" },
  { id: "delivery", title: "Order Delivery", description: "Restaurant meals delivered", icon: "📦" },
  { id: "outside", title: "Eat Outside", description: "Nearby restaurant picks", icon: "🍽️" },
  { id: "mix", title: "Mix of All", description: "We'll suggest based on your day", icon: "⚡" },
];

export default function MealPreferences({
  mealsPerDay,
  setMealsPerDay,
}: {
  mealsPerDay: number;
  setMealsPerDay: (value: number) => void;
}) {
  const [mealSource, setMealSource] = useState("mix");

  return (
    <div className="mx-auto max-w-2xl px-6 py-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-600 font-bold text-white">
            5
          </span>
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Meal Preferences
            </h2>
            <p className="text-sm text-gray-500">
              How you prefer to get your meals each day
            </p>
          </div>
        </div>

        <div className="mb-8">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Meals Per Day
          </label>
          <div className="grid grid-cols-3 gap-4">
            {MEALS_PER_DAY.map((count) => {
              const isSelected = mealsPerDay === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => setMealsPerDay(count)}
                  className={`rounded-xl border px-4 py-3 text-center font-semibold transition-colors ${
                    isSelected ? "border-purple-600 bg-purple-50 text-purple-700" : "border-gray-200 text-gray-400 hover:border-gray-300"
                  }`}
                >
                  {count} meals
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Meal Source Preference
          </label>
          <div className="grid grid-cols-2 gap-4">
            {MEAL_SOURCES.map((source) => {
              const isSelected = mealSource === source.id;
              return (
                <button
                  key={source.id}
                  type="button"
                  onClick={() => setMealSource(source.id)}
                  className={`flex items-start gap-3 rounded-xl border px-4 py-4 text-left transition-colors ${
                    isSelected ? "border-purple-600 bg-purple-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-xl">{source.icon}</span>
                  <span>
                    <span className={`block font-semibold ${isSelected ? "text-purple-700" : "text-gray-900"}`}>
                      {source.title}
                    </span>
                    <span className="block text-sm text-gray-500">{source.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}