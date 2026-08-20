export type Meal = {
  id: string;
  name: string;
  country: string;
  calories: number;
  protein: number;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
};

export const meals: Meal[] = [
  {
    id: "1",
    name: "Lebanese Chicken Bowl",
    country: "Lebanon",
    calories: 520,
    protein: 38,
    mealType: "lunch",
  },
  {
    id: "2",
    name: "Grilled Salmon Plate",
    country: "Norway",
    calories: 610,
    protein: 42,
    mealType: "dinner",
  },
  {
    id: "3",
    name: "Lentil Mujadara Bowl",
    country: "Lebanon",
    calories: 480,
    protein: 22,
    mealType: "lunch",
  },
  {
    id: "4",
    name: "Greek Yogurt Breakfast",
    country: "Greece",
    calories: 320,
    protein: 24,
    mealType: "breakfast",
  },
];
