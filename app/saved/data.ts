export type SavedMeal = {
  id: string;
  name: string;
  country: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  allergens: string[];
  image: string;
};

// ملاحظة: initialSavedMeals انشالت من هون — البيانات هلق جايّة من
// /api/saved-meals (شوف app/api/saved-meals/route.ts) مباشرة من الـ Database.
// إذا محتاج بيانات تجريبية لتعبئة الـ Database، شوف prisma/seed.ts
