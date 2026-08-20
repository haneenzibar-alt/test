// import { meals } from "../data";

// type MealPageProps = {
//   params: Promise<{ id: string }>;
// };

// export default async function MealPage({ params }: MealPageProps) {
//   const { id } = await params;
//   const meal = meals.find((item) => item.id === id);

//   if (!meal) {
//     return (
//       <section className="rounded-2xl bg-white p-8 shadow-sm">
//         <h1 className="text-3xl font-semibold text-green-800">Meal not found</h1>
//       </section>
//     );
//   }

//   return (
//     <section className="rounded-2xl bg-white p-8 shadow-sm">
//       <p className="text-sm font-medium text-green-700">{meal.mealType}</p>
//       <h1 className="mt-2 text-3xl font-semibold">{meal.name}</h1>
//       <p className="mt-2 text-stone-500">{meal.country}</p>
//       <p className="mt-6 text-stone-600">{meal.calories} kcal</p>
//       <p className="mt-1 text-stone-600">{meal.protein}g protein</p>
//     </section>
//   );
// }
