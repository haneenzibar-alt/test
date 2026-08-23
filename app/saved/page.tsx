"use client";

import { useState } from "react";
import Link from "next/link";
import { initialSavedMeals, type SavedMeal } from "./data";

const mealTypeIcons: Record<SavedMeal["mealType"], string> = {
  breakfast: "🍳",
  lunch: "🥗",
  dinner: "🍽",
  snack: "🍎",
};

export default function SavedPage() {
  const [savedMeals, setSavedMeals] = useState(initialSavedMeals);
  const [message, setMessage] = useState("");

  const savedCount = savedMeals.length;
  const savedLabel =
    savedCount === 1 ? "1 meal saved" : `${savedCount} meals saved`;

  function removeMeal(id: string) {
    setSavedMeals(savedMeals.filter((meal) => meal.id !== id));
    setMessage("");
  }

  return (
    <div className="min-h-full bg-[#fafaf7]">
      <section className="border-b border-gray-200 bg-white px-4 py-8 md:px-6">
        <div className="mx-auto w-full max-w-2xl">
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Saved Meals
          </h1>
          <p className="mt-2 text-sm text-gray-500">{savedLabel}</p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6">
        {message && (
          <p className="mb-4 text-sm font-medium text-[#1a5c38]">{message}</p>
        )}

        {savedMeals.length > 0 ? (
          <div className="space-y-4">
            {savedMeals.map((meal) => {
              const extraIngredients = meal.ingredients.length - 4;

              return (
                <article
                  key={meal.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="relative">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="h-48 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeMeal(meal.id)}
                      className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg text-gray-700 shadow-sm"
                      aria-label={`Remove ${meal.name}`}
                    >
                      ×
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{mealTypeIcons[meal.mealType]}</span>
                      <span className="capitalize">{meal.mealType}</span>
                      <span>·</span>
                      <span>{meal.country}</span>
                    </div>

                    <h2 className="mt-2 font-serif text-xl font-bold text-gray-900">
                      {meal.name}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                      {meal.calories} kcal · P:{meal.protein}g · C:{meal.carbs}g
                      · F:{meal.fat}g
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {meal.ingredients.slice(0, 4).map((ingredient) => (
                        <span
                          key={ingredient}
                          className="rounded-full bg-[#dcf0e5] px-3 py-1 text-xs font-medium text-[#1a5c38]"
                        >
                          {ingredient}
                        </span>
                      ))}
                      {extraIngredients > 0 && (
                        <span className="rounded-full bg-[#dcf0e5] px-3 py-1 text-xs font-medium text-[#1a5c38]">
                          +{extraIngredients}
                        </span>
                      )}
                      {meal.allergens.map((allergen) => (
                        <span
                          key={allergen}
                          className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
                        >
                          ⚠ {allergen}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() =>
                          setMessage(`${meal.name} added to planner.`)
                        }
                        className="rounded-xl bg-[#1a5c38] px-4 py-3 text-sm font-semibold text-white"
                      >
                        Add to Planner
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setMessage(
                            `Ordering for ${meal.name} is not connected yet.`,
                          )
                        }
                        className="rounded-xl bg-orange-100 px-4 py-3 text-sm font-semibold text-orange-800"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <section className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-4xl text-gray-300">♡</p>
            <h2 className="mt-4 font-serif text-2xl font-bold text-gray-900">
              No saved meals yet
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              Tap the heart icon on any meal recommendation to save it here for
              quick access.
            </p>
            <Link
              href="/meals"
              className="mt-6 inline-block rounded-xl bg-[#1a5c38] px-5 py-3 text-sm font-semibold text-white"
            >
              Browse Meals
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
