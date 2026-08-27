export type Meal = {
  id: string;
  name: string;
  country: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  ingredients: string[];
  allergens: string[];
  image: string;
  prepTime: number;
  description: string;
};

// Hardcoded mock data — stands in for a real meals database/API.
export const MOCK_MEALS: Meal[] = [
  {
    id: "m1",
    name: "Labneh & Za'atar Wrap",
    country: "Lebanon",
    calories: 420,
    protein: 22,
    carbs: 38,
    fat: 18,
    mealType: "breakfast",
    ingredients: ["Labneh", "Za'atar", "Flatbread", "Olive oil", "Cucumber"],
    allergens: ["Dairy", "Gluten"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlia4KAGwOMWV-02xg2kTBmE6dx-iVR4PpoeByf6XYOwPzgVcT7fiIPB0&s=10",
    prepTime: 10,
    description: "Creamy strained yogurt with earthy za'atar spice, wrapped in warm flatbread.",
  },
  {
    id: "m2",
    name: "Grilled Chicken & Tabbouleh",
    country: "Lebanon",
    calories: 610,
    protein: 48,
    carbs: 42,
    fat: 22,
    mealType: "lunch",
    ingredients: ["Chicken breast", "Parsley", "Bulgur", "Tomato", "Lemon"],
    allergens: [],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS5xtjNTV6SbBXWI5bnNf1E2-5WAYbNGQwQ4K9G9nI0g&s=10",
    prepTime: 25,
    description: "Lean grilled chicken paired with a bright, herb-heavy tabbouleh salad.",
  },
  {
    id: "m3",
    name: "Lentil Soup & Flatbread",
    country: "Lebanon",
    calories: 540,
    protein: 24,
    carbs: 65,
    fat: 14,
    mealType: "dinner",
    ingredients: ["Red lentils", "Cumin", "Onion", "Flatbread"],
    allergens: ["Gluten"],
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200",
    prepTime: 30,
    description: "A warming, protein-rich lentil soup served with toasted flatbread.",
  },
  {
    id: "m4",
    name: "Mixed Nuts & Fruit",
    country: "Lebanon",
    calories: 220,
    protein: 7,
    carbs: 20,
    fat: 14,
    mealType: "snack",
    ingredients: ["Almonds", "Walnuts", "Dried apricot"],
    allergens: ["Tree nuts"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLXXNdNbZYCJio27TUH4rLiZqgSQFJU53JBa1R0wZBXg&s=10",
    prepTime: 2,
    description: "A quick energy-dense snack of nuts and dried fruit.",
  },
];