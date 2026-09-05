"use client";

import { useEffect, useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MEAL_ICONS: Record<string, string> = {
  BREAKFAST: "🌅",
  LUNCH: "☀️",
  DINNER: "🌙",
  SNACK: "🍎",
};
const MEAL_LABELS: Record<string, string> = {
  BREAKFAST: "Breakfast",
  LUNCH: "Lunch",
  DINNER: "Dinner",
  SNACK: "Snack",
};

// ⚠️ TODO: بدّلها لما يجهز نظام تسجيل الدخول الحقيقي
const CURRENT_USER_ID = "123";

interface Recipe {
  id: string;
  name: string;
  description: string | null;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl: string | null;
  allergens: string[];
  prepTime: number | null;
  cookTime: number | null;
}

interface DayMeal {
  planMealId: string;
  mealType: string;
  recipe: Recipe;
}

interface DayData {
  day: string;
  dayOfWeek: number;
  meals: DayMeal[];
}

interface PlannerResponse {
  dailyTargets: { calories: number; protein: number; carbs: number; fat: number };
  planGenerated: boolean;
  mealPlanId?: string;
  days: DayData[];
}

export default function Planner() {
  const [data, setData] = useState<PlannerResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeDay, setActiveDay] = useState(new Date().getDay()); // 0 = Sun
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
  const [savedMealIds, setSavedMealIds] = useState<string[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlanner() {
      try {
        setLoading(true);
        const res = await fetch(`/api/planner?userId=${CURRENT_USER_ID}`);
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to load planner");
        }
        const json: PlannerResponse = await res.json();
        setData(json);
      } catch (e: any) {
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    loadPlanner();
  }, []);

  async function handleSaveMeal(recipeId: string) {
    setSavingId(recipeId);
    try {
      const res = await fetch(`/api/saved-meals?userId=${CURRENT_USER_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId }),
      });

      if (!res.ok && res.status !== 409) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save meal");
      }

      setSavedMealIds((prev) => (prev.includes(recipeId) ? prev : [...prev, recipeId]));
    } catch (e) {
      console.error(e);
    } finally {
      setSavingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-400">Loading your plan…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gray-50 px-6 text-center">
        <p className="text-4xl">⚠️</p>
        <p className="text-sm text-gray-500">{error || "Could not load your plan"}</p>
      </div>
    );
  }

  const { dailyTargets, days } = data;
  const currentDay = days.find((d) => d.dayOfWeek === activeDay);
  const meals = currentDay?.meals ?? [];
  const totalCals = meals.reduce((sum, m) => sum + m.recipe.calories, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-4 pb-4 pt-6">
        <div className="mx-auto max-w-lg">
          <h1 className="font-serif text-xl font-semibold text-gray-900">
            Meal Planner
          </h1>
          <p className="mt-0.5 text-xs text-gray-400">
            {dailyTargets.calories} kcal/day target
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
              style={{
                width: `${Math.min((totalCals / dailyTargets.calories) * 100, 100)}%`,
              }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-gray-400">
            <span>{totalCals} planned</span>
            <span>{Math.max(0, dailyTargets.calories - totalCals)} remaining</span>
          </div>
        </div>

        {meals.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
            <p className="mb-3 text-4xl">🥗</p>
            <p className="text-sm text-gray-500">
              No meals planned for this day yet.
            </p>
          </div>
        ) : (
          meals.map(({ planMealId, mealType, recipe }) => {
            const isExpanded = expandedMealId === planMealId;
            const isSaved = savedMealIds.includes(recipe.id);
            const isSaving = savingId === recipe.id;

            return (
              <div
                key={planMealId}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setExpandedMealId(isExpanded ? null : planMealId)}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    {recipe.imageUrl && (
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-400">
                      {MEAL_ICONS[mealType]} {MEAL_LABELS[mealType]}
                    </p>
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {recipe.name}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {recipe.calories} kcal
                      {recipe.prepTime ? ` · ${recipe.prepTime} min` : ""}
                    </p>
                  </div>
                  <span className="text-xs text-gray-300">{isExpanded ? "▲" : "▼"}</span>
                </button>

                {isExpanded && (
                  <div className="space-y-4 border-t border-gray-50 px-4 pb-4 pt-4">
                    <div className="grid grid-cols-4 gap-2">
                      <div className="rounded-lg bg-orange-50 p-2 text-center">
                        <p className="text-sm font-bold text-orange-700">{recipe.calories}</p>
                        <p className="text-[10px] text-orange-700/70">Cal</p>
                      </div>
                      <div className="rounded-lg bg-blue-50 p-2 text-center">
                        <p className="text-sm font-bold text-blue-700">{recipe.protein}g</p>
                        <p className="text-[10px] text-blue-700/70">Protein</p>
                      </div>
                      <div className="rounded-lg bg-amber-50 p-2 text-center">
                        <p className="text-sm font-bold text-amber-700">{recipe.carbs}g</p>
                        <p className="text-[10px] text-amber-700/70">Carbs</p>
                      </div>
                      <div className="rounded-lg bg-purple-50 p-2 text-center">
                        <p className="text-sm font-bold text-purple-700">{recipe.fat}g</p>
                        <p className="text-[10px] text-purple-700/70">Fat</p>
                      </div>
                    </div>

                    {recipe.description && (
                      <p className="text-xs leading-relaxed text-gray-500">
                        {recipe.description}
                      </p>
                    )}

                    {recipe.allergens.length > 0 && (
                      <div>
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-red-400">
                          Contains
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {recipe.allergens.map((allergen) => (
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

                    
                    <a>                      
                      href={`/meal/${recipe.id}`}
                      className="block w-full rounded-xl bg-gray-50 py-2.5 text-center text-xs font-semibold text-gray-700 hover:bg-gray-100"
                   
                      View Full Recipe
                    </a>

                    <button
                      type="button"
                      onClick={() => handleSaveMeal(recipe.id)}
                      disabled={isSaved || isSaving}
                      className={`w-full rounded-xl py-2.5 text-xs font-semibold transition-colors ${
                        isSaved
                          ? "cursor-not-allowed bg-emerald-100 text-emerald-700"
                          : "bg-emerald-50 text-emerald-800 hover:bg-emerald-800 hover:text-white"
                      }`}
                    >
                      {isSaved ? "✓ Saved" : isSaving ? "Saving…" : "Save Meal"}
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