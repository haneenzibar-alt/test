"use client";

export default function PlanBreakdown({
  goalLabel,
  country,
  calories,
  protein,
  carbs,
  fat,
  mealsPerDay,
}: {
  goalLabel: string;
  country: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealsPerDay: number;
}) {
  const proteinKcal = protein * 4;
  const carbsKcal = carbs * 4;
  const fatKcal = fat * 9;

  const proteinPct = (proteinKcal / calories) * 100;
  const carbsPct = (carbsKcal / calories) * 100;
  const fatPct = (fatKcal / calories) * 100;

  const proteinPerMeal = Math.round(protein / mealsPerDay);
  const caloriesPerMeal = Math.round(calories / mealsPerDay);

  return (
    <section className="bg-emerald-50/30 px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* How your plan was calculated */}
        <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl">
            🧬
          </span>
          <div>
            <h3 className="font-semibold text-gray-900">
              How your plan was calculated
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Harris-Benedict BMR formula · moderate activity level · TDEE{" "}
              {goalLabel.toLowerCase()} · {country} cuisine meals
            </p>
          </div>
        </div>

        {/* Daily Macro Breakdown */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Daily Macro Breakdown
          </h2>
          <p className="mb-8 mt-1 text-sm text-gray-500">
            Optimized ratio for: {goalLabel}
          </p>

          {/* Protein */}
          <div className="mb-6">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="font-medium text-gray-700">Protein</span>
              <span className="text-gray-900">
                <span className="font-bold">{protein}g</span>{" "}
                <span className="text-sm text-gray-400">
                  ({Math.round(proteinKcal)} kcal)
                </span>
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${proteinPct}%` }}
              />
            </div>
          </div>

          {/* Carbohydrates */}
          <div className="mb-6">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="font-medium text-gray-700">Carbohydrates</span>
              <span className="text-gray-900">
                <span className="font-bold">{carbs}g</span>{" "}
                <span className="text-sm text-gray-400">
                  ({Math.round(carbsKcal)} kcal)
                </span>
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-orange-500"
                style={{ width: `${carbsPct}%` }}
              />
            </div>
          </div>

          {/* Healthy Fats */}
          <div className="mb-8">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="font-medium text-gray-700">Healthy Fats</span>
              <span className="text-gray-900">
                <span className="font-bold">{fat}g</span>{" "}
                <span className="text-sm text-gray-400">
                  ({Math.round(fatKcal)} kcal)
                </span>
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-purple-600"
                style={{ width: `${fatPct}%` }}
              />
            </div>
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 pt-6 text-center">
            <div>
              <p className="text-sm text-gray-400">Protein / meal</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                ~{proteinPerMeal}g
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Calories / meal</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                ~{caloriesPerMeal} kcal
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Meals / day</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {mealsPerDay}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
