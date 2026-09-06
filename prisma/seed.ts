import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL or DIRECT_URL is not set");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const recipes = [
  // =========================
  // LOSE WEIGHT
  // =========================

  {
    id: "lose-weight-oatmeal",
    name: "Berry Protein Oatmeal",
    description: "Light oatmeal with berries and Greek yogurt.",
    instructions: [
      "Cook the oats with water or low-fat milk.",
      "Add berries and Greek yogurt.",
      "Serve warm.",
    ],
    prepTime: 5,
    cookTime: 8,
    calories: 320,
    protein: 22,
    carbs: 42,
    fat: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "LOSE_WEIGHT" as const,
  },

  {
    id: "lose-weight-eggs",
    name: "Egg & Vegetable Breakfast",
    description: "Eggs with fresh vegetables for a protein-rich breakfast.",
    instructions: [
      "Beat the eggs.",
      "Cook the eggs in a non-stick pan.",
      "Add tomato, cucumber and herbs.",
      "Serve fresh.",
    ],
    prepTime: 5,
    cookTime: 8,
    calories: 290,
    protein: 23,
    carbs: 12,
    fat: 16,
    imageUrl:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "LOSE_WEIGHT" as const,
  },

  {
    id: "lose-weight-chicken-salad",
    name: "Grilled Chicken Salad",
    description: "Fresh vegetables with grilled chicken and lemon dressing.",
    instructions: [
      "Grill the chicken.",
      "Chop lettuce, cucumber and tomato.",
      "Slice the chicken.",
      "Combine everything and add lemon dressing.",
    ],
    prepTime: 10,
    cookTime: 15,
    calories: 360,
    protein: 42,
    carbs: 18,
    fat: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "LOSE_WEIGHT" as const,
  },

  {
    id: "lose-weight-lentil-soup",
    name: "Light Lentil Soup",
    description: "Warm lentil soup with vegetables and herbs.",
    instructions: [
      "Cook the lentils with onion and carrots.",
      "Add spices and water.",
      "Simmer until soft.",
      "Serve warm.",
    ],
    prepTime: 10,
    cookTime: 30,
    calories: 310,
    protein: 18,
    carbs: 48,
    fat: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "LOSE_WEIGHT" as const,
  },

  {
    id: "lose-weight-fish",
    name: "Grilled Fish & Vegetables",
    description: "Grilled white fish served with fresh vegetables.",
    instructions: [
      "Season the fish with lemon and herbs.",
      "Grill until fully cooked.",
      "Steam or grill the vegetables.",
      "Serve together.",
    ],
    prepTime: 10,
    cookTime: 15,
    calories: 390,
    protein: 38,
    carbs: 20,
    fat: 14,
    imageUrl:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "LOSE_WEIGHT" as const,
  },

  {
    id: "lose-weight-yogurt",
    name: "Greek Yogurt Fruit Bowl",
    description: "Greek yogurt with fresh fruit and a small amount of nuts.",
    instructions: [
      "Add Greek yogurt to a bowl.",
      "Top with fresh berries and banana.",
      "Add a small amount of nuts.",
    ],
    prepTime: 5,
    cookTime: 0,
    calories: 250,
    protein: 20,
    carbs: 30,
    fat: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "LOSE_WEIGHT" as const,
  },

  // =========================
  // MAINTAIN WEIGHT
  // =========================

  {
    id: "maintain-lebanese-breakfast",
    name: "Lebanese Breakfast Plate",
    description: "A balanced Lebanese breakfast with labneh, vegetables and olives.",
    instructions: [
      "Place labneh on a plate.",
      "Add cucumber and tomato.",
      "Add olives and whole grain bread.",
      "Serve fresh.",
    ],
    prepTime: 5,
    cookTime: 0,
    calories: 420,
    protein: 20,
    carbs: 42,
    fat: 19,
    imageUrl:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "MAINTAIN_WEIGHT" as const,
  },

{
    id: "maintain-chicken-bowl",
    name: "Grilled Chicken Bowl",
    description: "Grilled chicken with rice and fresh vegetables.",
    instructions: [
      "Grill the chicken until fully cooked.",
      "Cook the rice.",
      "Chop the vegetables.",
      "Combine everything in a bowl.",
    ],
    prepTime: 10,
    cookTime: 20,
    calories: 520,
    protein: 42,
    carbs: 55,
    fat: 14,
    imageUrl:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "MAINTAIN_WEIGHT" as const,
  },
  {
    id: "maintain-mujadara",
    name: "Lentil Mujadara Bowl",
    description: "Lentils and rice with caramelized onions.",
    instructions: [
      "Cook the lentils.",
      "Cook the rice.",
      "Cook the onions until golden.",
      "Mix and serve.",
    ],
    prepTime: 10,
    cookTime: 30,
    calories: 460,
    protein: 19,
    carbs: 72,
    fat: 11,
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "MAINTAIN_WEIGHT" as const,
  },

  {
    id: "maintain-salmon-rice",
    name: "Salmon Rice Bowl",
    description: "Salmon with rice and fresh vegetables.",
    instructions: [
      "Season the salmon.",
      "Bake or grill until cooked.",
      "Cook the rice.",
      "Serve with vegetables.",
    ],
    prepTime: 10,
    cookTime: 20,
    calories: 580,
    protein: 38,
    carbs: 55,
    fat: 22,
    imageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "MAINTAIN_WEIGHT" as const,
  },

  {
    id: "maintain-chicken-pasta",
    name: "Chicken Pasta",
    description: "Whole wheat pasta with chicken and vegetables.",
    instructions: [
      "Cook the pasta.",
      "Cook the chicken.",
      "Add vegetables.",
      "Mix everything together and serve.",
    ],
    prepTime: 10,
    cookTime: 20,
    calories: 560,
    protein: 40,
    carbs: 65,
    fat: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "MAINTAIN_WEIGHT" as const,
  },

  // =========================
  // GAIN WEIGHT
  // =========================

  {
    id: "gain-weight-peanut-oats",
    name: "Peanut Butter Protein Oats",
    description: "High-calorie oats with banana, peanut butter and yogurt.",
    instructions: [
      "Cook the oats.",
      "Add banana and Greek yogurt.",
      "Mix in peanut butter.",
      "Serve warm.",
    ],
    prepTime: 5,
    cookTime: 8,
    calories: 620,
    protein: 28,
    carbs: 70,
    fat: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "GAIN_WEIGHT" as const,
  },

  {
    id: "gain-weight-avocado-eggs",
    name: "Avocado Egg Toast",
    description: "Whole grain toast with eggs and avocado.",
    instructions: [
      "Toast the bread.",
      "Cook the eggs.",
      "Mash the avocado.",
      "Place avocado and eggs on the toast.",
    ],
    prepTime: 5,
    cookTime: 10,
    calories: 560,
    protein: 25,
    carbs: 45,
    fat: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "GAIN_WEIGHT" as const,
  },

  {
    id: "gain-weight-chicken-rice",
    name: "Chicken Rice Power Bowl",
    description: "A calorie-dense bowl with chicken, rice and avocado.",
    instructions: [
      "Grill the chicken.",
      "Cook the rice.",
      "Slice the avocado.",
      "Combine everything in a large bowl.",
    ],
    prepTime: 10,
    cookTime: 20,
    calories: 720,
    protein: 48,
    carbs: 78,
    fat: 24,
    imageUrl:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "GAIN_WEIGHT" as const,
  },

  {
    id: "gain-weight-beef-pasta",
    name: "Beef Pasta Bowl",
    description: "Pasta with lean beef, tomato sauce and parmesan.",
    instructions: [
      "Cook the pasta.",
      "Cook the beef with tomato sauce.",
      "Combine pasta and beef.",
      "Top with parmesan.",
    ],
    prepTime: 10,
    cookTime: 25,
    calories: 760,
    protein: 45,
    carbs: 80,
    fat: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "GAIN_WEIGHT" as const,
  },

  {
    id: "gain-weight-salmon-potatoes",
    name: "Salmon & Potato Plate",
    description: "Salmon with roasted potatoes and vegetables.",
    instructions: [
      "Season the salmon.",
      "Roast the potatoes.",
      "Cook the salmon.",
      "Serve with vegetables.",
    ],
    prepTime: 10,
    cookTime: 30,
    calories: 680,
    protein: 42,
    carbs: 60,
    fat: 27,
    imageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "GAIN_WEIGHT" as const,
  },

  {
    id: "gain-weight-yogurt-banana",
    name: "Banana Nut Yogurt Bowl",
    description: "Greek yogurt with banana, nuts and honey.",
    instructions: [
      "Add Greek yogurt to a bowl.",
      "Slice the banana.",
      "Add nuts and honey.",
      "Serve immediately.",
    ],
    prepTime: 5,
    cookTime: 0,
    calories: 480,
    protein: 22,
    carbs: 55,
    fat: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "GAIN_WEIGHT" as const,
  },
];

async function main() {
  for (const recipe of recipes) {
    await prisma.recipe.upsert({
      where: {
        id: recipe.id,
      },
      update: recipe,
      create: recipe,
    });
  }

  console.log(`Seeded ${recipes.length} recipes.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });