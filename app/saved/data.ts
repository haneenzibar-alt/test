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

export const initialSavedMeals: SavedMeal[] = [
  {
    id: "1",
    name: "Grilled Chicken Bowl",
    country: "Lebanon",
    mealType: "lunch",
    calories: 520,
    protein: 42,
    carbs: 55,
    fat: 14,
    ingredients: ["Chicken", "Rice", "Tomato", "Cucumber", "Yogurt"],
    allergens: ["Dairy"],
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    name: "Lebanese Breakfast Plate",
    country: "Lebanon",
    mealType: "breakfast",
    calories: 380,
    protein: 18,
    carbs: 36,
    fat: 17,
    ingredients: ["Labneh", "Cucumber", "Tomato", "Olives"],
    allergens: ["Dairy"],
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    name: "Lentil Mujadara Bowl",
    country: "Lebanon",
    mealType: "dinner",
    calories: 460,
    protein: 19,
    carbs: 72,
    fat: 11,
    ingredients: ["Lentils", "Rice", "Onion", "Parsley"],
    allergens: [],
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
  },
];
