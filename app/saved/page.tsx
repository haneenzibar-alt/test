import Link from "next/link";
import { prisma } from "@/lib/prisma";


const CURRENT_USER_ID = "123";

export default async function SavedMealsPage() {
  const savedMeals = await prisma.savedMeal.findMany({
    where: { userId: CURRENT_USER_ID },
    include: { Recipe: true },
orderBy: {
  createdAt: "desc",
}




  });

  if (savedMeals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          No saved meals yet
        </h2>
        <p className="text-gray-500 mb-6 max-w-sm">
          You haven&apos;t saved any meals. Head to the planner to find meals and
          save your favorites.
        </p>
        <Link
          href="/Planner"
          className="px-6 py-3 rounded-full bg-emerald-100 text-emerald-800 font-semibold hover:bg-emerald-200 transition"
        >
          Go to Planner
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Saved Meals</h1>
      {savedMeals.map(({ Recipe: recipe }) => (
        <div
          key={recipe.id}
          className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-center"
        >
          {recipe.imageUrl && (
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
          )}
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">{recipe.name}</h3>
            <p className="text-sm text-gray-500">
              {recipe.calories} kcal · {recipe.prepTime ?? "?"} min
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}