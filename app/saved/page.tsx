"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { axiosGet } from "@/lib/axios";
import DeleteSavedMealButton from "./DeleteSavedMealButton";

const CURRENT_USER_ID = "123";

type SavedRecipe = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl: string | null;
  prepTime: number | null;
};

type SavedMealRow = {
  id: string;
  recipeId: string;
  recipe: SavedRecipe;
};

export default function SavedMealsPage() {
  const {
    data: savedMeals,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["saved-meals", CURRENT_USER_ID],
    queryFn: () =>
      axiosGet<SavedMealRow[]>(`/saved?userId=${CURRENT_USER_ID}`),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <p className="text-sm text-gray-500">Loading saved meals...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <p className="text-gray-700">Unable to load saved meals. Please try again.</p>
      </div>
    );
  }

  if (!savedMeals || savedMeals.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">
          No saved meals yet.
        </h2>
        <p className="mb-6 max-w-sm text-gray-500">
          You haven&apos;t saved any meals. Head to the planner to find meals and
          save your favorites.
        </p>
        <Link
          href="/planner"
          className="rounded-full bg-emerald-100 px-6 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-200"
        >
          Go to Planner
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-6">
      <h1 className="mb-4 text-xl font-bold text-gray-900">Saved Meals</h1>
      {savedMeals.map((savedMeal) => {
        const recipe = savedMeal.recipe;

        return (
          <div
            key={savedMeal.id}
            className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
          >
            {recipe.imageUrl && (
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
            )}
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{recipe.name}</h3>
              <p className="text-sm text-gray-500">
                {recipe.calories} kcal · {recipe.prepTime ?? "?"} min
              </p>
            </div>
            <DeleteSavedMealButton savedMealId={savedMeal.id} />
          </div>
        );
      })}
    </div>
  );
}
