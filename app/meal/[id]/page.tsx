import { prisma } from "@/lib/prisma";

interface MealPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MealPage({ params }: MealPageProps) {
  const { id } = await params;

  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
  });

  if (!recipe) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Recipe not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="mx-auto max-w-lg">
        {recipe.imageUrl && (
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="h-64 w-full object-cover"
          />
        )}

        <div className="space-y-5 px-4 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {recipe.name}
            </h1>

            {recipe.description && (
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {recipe.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="rounded-xl bg-orange-50 p-3 text-center">
              <p className="font-bold text-orange-700">
                {recipe.calories}
              </p>
              <p className="text-xs text-orange-700/70">Calories</p>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-center">
              <p className="font-bold text-blue-700">
                {recipe.protein}g
              </p>
              <p className="text-xs text-blue-700/70">Protein</p>
            </div>

            <div className="rounded-xl bg-amber-50 p-3 text-center">
              <p className="font-bold text-amber-700">
                {recipe.carbs}g
              </p>
              <p className="text-xs text-amber-700/70">Carbs</p>
            </div>

            <div className="rounded-xl bg-purple-50 p-3 text-center">
              <p className="font-bold text-purple-700">
                {recipe.fat}g
              </p>
              <p className="text-xs text-purple-700/70">Fat</p>
            </div>
          </div>

          {(recipe.prepTime || recipe.cookTime) && (
            <div className="rounded-2xl bg-white p-4">
              <h2 className="font-semibold text-gray-900">
                Preparation
              </h2>

              <div className="mt-3 flex gap-6 text-sm text-gray-500">
                {recipe.prepTime && (
                  <span>Prep: {recipe.prepTime} min</span>
                )}

                {recipe.cookTime && (
                  <span>Cook: {recipe.cookTime} min</span>
                )}
              </div>
            </div>
          )}

          <div className="rounded-2xl bg-white p-4">
            <h2 className="font-semibold text-gray-900">
              Instructions
            </h2>

            <div className="mt-3 space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-relaxed text-gray-600">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
