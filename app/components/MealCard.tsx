import Link from "next/link";
import type { Meal } from "../meals/data";

type MealCardProps = {
  meal: Meal;
};

export default function MealCard({ meal }: MealCardProps) {
  return (
    <Link
      href={`/meals/${meal.id}`}
      className="block rounded-2xl bg-white p-6 shadow-sm hover:bg-green-50"
    >
      <p className="text-sm font-medium text-green-700">{meal.mealType}</p>
      <h2 className="mt-2 text-lg font-semibold">{meal.name}</h2>
      <p className="mt-1 text-sm text-stone-500">{meal.country}</p>
      <p className="mt-4 text-sm text-stone-600">
        {meal.calories} kcal · {meal.protein}g protein
      </p>
    </Link>
  );
}
