"use client";

import { useState } from "react";
import { useProfile } from "@/Context/ProfileContext";
import { MOCK_MEALS } from "@/data/meals";
import { ActivityLevel } from "@/generated/prisma/client";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MEAL_ICONS = { breakfast: "🌅", lunch: "☀️", dinner: "🌙", snack: "🍎" };
const MEAL_LABELS = { breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", snack: "Snack" };

const activityMultiplierMap: Record<ActivityLevel, number> = {
  SEDENTARY: 1.2,
  LIGHTLY_ACTIVE: 1.375,
  MODERATELY_ACTIVE: 1.55,
  VERY_ACTIVE: 1.725,
  EXTRA_ACTIVE: 1.9,
};

export default function Planner() {
  const { country, weight, height, sex, age, goal, activityLevel } = useProfile();
  const [activeDay, setActiveDay] = useState(0);
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
  const [savedMealIds, setSavedMealIds] = useState<string[]>([]);

  // Same BMR/TDEE calculation used in PlanResults, so the target here matches
  const bmr =
    sex === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  const activityMultiplier = activityLevel
    ? activityMultiplierMap[activityLevel]
    : 1.2;
  const tdee = bmr * activityMultiplier;
  const dailyCalories = Math.round(goal === "lose" ? tdee - 500 : goal === "gain" ? tdee + 500 : tdee);

  const meals = MOCK_MEALS; // mock data — would come from an API filtered by country/allergies later
  const totalCals = meals.reduce((sum, m) => sum + m.calories, 0);

  const handleSaveMeal = (mealId: string) => {
    setSavedMealIds((prev) =>
      prev.includes(mealId) ? prev : [...prev, mealId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-4 pb-4 pt-6">
        <div className="mx-auto max-w-lg">
          <h1 className="font-serif text-xl font-semibold text-gray-900">
            Meal Planner
          </h1>
          <p className="mt-0.5 text-xs text-gray-400">
            {country} cuisine · {dailyCalories} kcal/day target
          </p>

          <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1">
            {DAYS.map((day, i) => (
              <button
                key={day}
                type="button"
                onClick={() => setActiveDay(i)}
                className={`flex h-14 w-11 shrink-0 flex-col items-center justify-center rounded-xl text-xs font-medium transition-colors ${
                  activeDay === i
                    ? "bg-emerald-800 text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg space-y-3 px-4 py-5">
        {/* Daily summary */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Day total</p>
              <p className="text-lg font-bold text-gray-900">
                {totalCals} <span className="text-sm font-normal text-gray-400">kcal</span>
              </p>
            </div>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-emerald-800"
              style={{ width: `${Math.min((totalCals / dailyCalories) * 100, 100)}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-gray-400">
            <span>{totalCals} planned</span>
            <span>{Math.max(0, dailyCalories - totalCals)} remaining</span>
          </div>
        </div>

        {/* Empty state — shown if there's genuinely nothing to plan */}
        {meals.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
            <p className="mb-3 text-4xl">🥗</p>
            <p className="text-sm text-gray-500">
              No meals planned. Try updating your profile preferences.
            </p>
          </div>
        ) : (
          meals.map((meal) => {
            const isExpanded = expandedMealId === meal.id;
            const isSaved = savedMealIds.includes(meal.id);

            return (
              <div
                key={meal.id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setExpandedMealId(isExpanded ? null : meal.id)}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-400">
                      {MEAL_ICONS[meal.mealType]} {MEAL_LABELS[meal.mealType]}
                    </p>
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {meal.name}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {meal.calories} kcal · {meal.prepTime} min
                    </p>
                  </div>
                  <span className="text-xs text-gray-300">{isExpanded ? "▲" : "▼"}</span>
                </button>

                {isExpanded && (
                  <div className="space-y-4 border-t border-gray-50 px-4 pb-4 pt-4">
                    <div className="grid grid-cols-4 gap-2">
                      <div className="rounded-lg bg-orange-50 p-2 text-center">
                        <p className="text-sm font-bold text-orange-700">{meal.calories}</p>
                        <p className="text-[10px] text-orange-700/70">Cal</p>
                      </div>
                      <div className="rounded-lg bg-blue-50 p-2 text-center">
                        <p className="text-sm font-bold text-blue-700">{meal.protein}g</p>
                        <p className="text-[10px] text-blue-700/70">Protein</p>
                      </div>
                      <div className="rounded-lg bg-amber-50 p-2 text-center">
                        <p className="text-sm font-bold text-amber-700">{meal.carbs}g</p>
                        <p className="text-[10px] text-amber-700/70">Carbs</p>
                      </div>
                      <div className="rounded-lg bg-purple-50 p-2 text-center">
                        <p className="text-sm font-bold text-purple-700">{meal.fat}g</p>
                        <p className="text-[10px] text-purple-700/70">Fat</p>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-gray-500">
                      {meal.description}
                    </p>

                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Ingredients
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {meal.ingredients.map((ingredient) => (
                          <span
                            key={ingredient}
                            className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    {meal.allergens.length > 0 && (
                      <div>
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-red-400">
                          Contains
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {meal.allergens.map((allergen) => (
                            <span
                              key={allergen}
                              className="rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-600"
                            >
                              ⚠ {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handleSaveMeal(meal.id)}
                      disabled={isSaved}
                      className={`w-full rounded-xl py-2.5 text-xs font-semibold transition-colors ${
                        isSaved
                          ? "cursor-not-allowed bg-emerald-100 text-emerald-700"
                          : "bg-emerald-50 text-emerald-800 hover:bg-emerald-800 hover:text-white"
                      }`}
                    >
                      {isSaved ? "✓ Saved" : "Save Meal"}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
