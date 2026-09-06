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

/**
 * NOTE ON SCHEMA:
 * This seed assumes your Recipe model has a `mealType` field using the
 * same enum values your Planner UI already expects:
 *
 *   enum MealType {
 *     BREAKFAST
 *     LUNCH
 *     DINNER
 *     SNACK
 *   }
 *
 * If `mealType` doesn't exist on Recipe yet, add it to schema.prisma:
 *
 *   model Recipe {
 *     ...
 *     mealType MealType
 *     ...
 *   }
 *
 * then run `npx prisma migrate dev` before running this seed.
 */

const recipes = [
  // =========================================================
  // LOSE WEIGHT — BREAKFAST
  // =========================================================
  {
    id: "lose-breakfast-berry-oats",
    name: "Berry Protein Oatmeal",
    description:
      "A light, slow-release breakfast built for a calorie deficit — steel-cut oats layered with antioxidant-rich berries and Greek yogurt for a clean protein hit.",
    instructions: [
      "Cook the oats with water or low-fat milk over medium heat until creamy.",
      "Fold in a generous spoon of Greek yogurt off the heat.",
      "Top with fresh mixed berries and serve warm.",
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
    mealType: "BREAKFAST" as const,
  },
  {
    id: "lose-breakfast-egg-veg",
    name: "Egg & Vegetable Breakfast",
    description:
      "A protein-forward start to the day, built to keep you satiated well past mid-morning without tipping the calorie scale.",
    instructions: [
      "Beat the eggs and season lightly with salt and pepper.",
      "Cook in a non-stick pan over medium-low heat until just set.",
      "Fold in diced tomato, cucumber, and fresh herbs before serving.",
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
    mealType: "BREAKFAST" as const,
  },
  {
    id: "lose-breakfast-yogurt-bowl",
    name: "Greek Yogurt Fruit Bowl",
    description:
      "An effortless, nutrient-dense bowl — high in protein, naturally sweetened by fruit, with just enough healthy fat to keep it satisfying.",
    instructions: [
      "Spoon Greek yogurt into a bowl.",
      "Top with fresh berries and sliced banana.",
      "Finish with a small handful of nuts for texture.",
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
    mealType: "BREAKFAST" as const,
  },

  // =========================================================
  // LOSE WEIGHT — LUNCH
  // =========================================================
  {
    id: "lose-lunch-chicken-salad",
    name: "Grilled Chicken Salad",
    description:
      "A lean, high-protein midday plate — crisp vegetables and grilled chicken finished with a bright lemon dressing that keeps things light without sacrificing satisfaction.",
    instructions: [
      "Grill the chicken breast until fully cooked, then rest and slice.",
      "Chop lettuce, cucumber, and tomato.",
      "Combine everything in a bowl and dress with fresh lemon juice and olive oil.",
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
    mealType: "LUNCH" as const,
  },
  {
    id: "lose-lunch-lentil-soup",
    name: "Light Lentil Soup",
    description:
      "A warming, fiber-rich soup that delivers steady energy through the afternoon — filling, low in fat, and built around slow-digesting carbohydrates.",
    instructions: [
      "Cook the lentils with diced onion and carrots until tender.",
      "Season with cumin, salt, and a touch of garlic.",
      "Simmer until the lentils break down slightly, then serve warm.",
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
    mealType: "LUNCH" as const,
  },
  {
    id: "lose-lunch-tuna-wrap",
    name: "Lean Tuna Lettuce Wrap",
    description:
      "A refined, low-calorie lunch that leans on lean tuna and crunchy vegetables wrapped in crisp lettuce leaves instead of bread — full flavor, minimal carbs.",
    instructions: [
      "Drain and flake the tuna, mixing with a spoon of light yogurt or olive oil.",
      "Add diced celery, onion, and a squeeze of lemon.",
      "Spoon into large lettuce leaves and wrap to serve.",
    ],
    prepTime: 10,
    cookTime: 0,
    calories: 280,
    protein: 34,
    carbs: 10,
    fat: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "LOSE_WEIGHT" as const,
    mealType: "LUNCH" as const,
  },

  // =========================================================
  // LOSE WEIGHT — DINNER
  // =========================================================
  {
    id: "lose-dinner-fish-veg",
    name: "Grilled Fish & Vegetables",
    description:
      "A clean, restaurant-style dinner plate — flaky white fish finished with lemon and herbs, paired with lightly charred vegetables for a satisfying, low-calorie close to the day.",
    instructions: [
      "Season the fish with lemon, garlic, and fresh herbs.",
      "Grill until just cooked through and lightly charred.",
      "Grill or steam the vegetables alongside and serve together.",
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
    mealType: "DINNER" as const,
  },
  {
    id: "lose-dinner-chicken-veg-stir",
    name: "Chicken & Vegetable Stir-Fry",
    description:
      "A quick, high-protein dinner built around lean chicken and a colorful mix of vegetables, lightly seared to keep the calorie count in check without losing flavor.",
    instructions: [
      "Slice the chicken breast into thin strips.",
      "Sear in a hot pan with a small amount of oil until golden.",
      "Add sliced peppers, broccoli, and onion, stir-frying until just tender.",
    ],
    prepTime: 10,
    cookTime: 15,
    calories: 340,
    protein: 40,
    carbs: 22,
    fat: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "LOSE_WEIGHT" as const,
    mealType: "DINNER" as const,
  },
  {
    id: "lose-dinner-zucchini-boats",
    name: "Stuffed Zucchini Boats",
    description:
      "Lean ground turkey and warm spices baked into hollowed zucchini — a lower-carb take on a classic comfort dish, designed to feel indulgent while staying light.",
    instructions: [
      "Halve the zucchini and hollow out the centers.",
      "Cook lean ground turkey with onion, garlic, and warm spices.",
      "Fill the zucchini boats and bake until tender.",
    ],
    prepTime: 15,
    cookTime: 25,
    calories: 350,
    protein: 32,
    carbs: 18,
    fat: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "LOSE_WEIGHT" as const,
    mealType: "DINNER" as const,
  },

  // =========================================================
  // LOSE WEIGHT — SNACK
  // =========================================================
  {
    id: "lose-snack-cucumber-hummus",
    name: "Cucumber & Hummus Bites",
    description:
      "A crisp, low-calorie snack that satisfies a craving for something savory without derailing the day's targets.",
    instructions: [
      "Slice cucumber into rounds.",
      "Top each round with a small spoon of hummus.",
      "Finish with a sprinkle of paprika.",
    ],
    prepTime: 5,
    cookTime: 0,
    calories: 120,
    protein: 5,
    carbs: 12,
    fat: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "LOSE_WEIGHT" as const,
    mealType: "SNACK" as const,
  },
  {
    id: "lose-snack-apple-almond",
    name: "Apple with Almond Butter",
    description:
      "A balanced, portable snack pairing natural fruit sugars with healthy fats and a touch of protein to curb hunger between meals.",
    instructions: [
      "Slice the apple into wedges.",
      "Serve with a small spoon of almond butter for dipping.",
    ],
    prepTime: 5,
    cookTime: 0,
    calories: 160,
    protein: 4,
    carbs: 20,
    fat: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "LOSE_WEIGHT" as const,
    mealType: "SNACK" as const,
  },
  {
    id: "lose-snack-boiled-egg",
    name: "Seasoned Boiled Egg",
    description:
      "A minimalist, protein-dense snack — simple, portable, and virtually zero prep.",
    instructions: [
      "Boil the egg to your preferred firmness.",
      "Peel and season lightly with salt and pepper.",
    ],
    prepTime: 2,
    cookTime: 10,
    calories: 90,
    protein: 7,
    carbs: 1,
    fat: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "LOSE_WEIGHT" as const,
    mealType: "SNACK" as const,
  },

  // =========================================================
  // MAINTAIN WEIGHT — BREAKFAST
  // =========================================================
  {
    id: "maintain-breakfast-lebanese-plate",
    name: "Lebanese Breakfast Plate",
    description:
      "A well-rounded, traditional spread — labneh, fresh vegetables, olives, and whole grain bread combine for balanced energy that carries through the morning.",
    instructions: [
      "Arrange labneh on a plate.",
      "Add sliced cucumber and tomato.",
      "Serve with olives and warm whole grain bread.",
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
    mealType: "BREAKFAST" as const,
  },
  {
    id: "maintain-breakfast-shakshuka",
    name: "Shakshuka",
    description:
      "Eggs gently poached in a rich, spiced tomato sauce — a hearty, balanced breakfast that delivers steady protein and slow-burning carbohydrates.",
    instructions: [
      "Simmer tomatoes with onion, garlic, and warm spices until thickened.",
      "Crack eggs directly into the sauce.",
      "Cover and cook until the eggs are set to your liking.",
    ],
    prepTime: 10,
    cookTime: 20,
    calories: 400,
    protein: 22,
    carbs: 28,
    fat: 22,
    imageUrl:
      "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "MAINTAIN_WEIGHT" as const,
    mealType: "BREAKFAST" as const,
  },
  {
    id: "maintain-breakfast-manakish",
    name: "Za'atar Manakish",
    description:
      "A classic Levantine flatbread topped with za'atar and olive oil — simple, satisfying, and calorically balanced for a steady-state day.",
    instructions: [
      "Roll out the dough into a flat round.",
      "Spread a mix of za'atar and olive oil evenly over the top.",
      "Bake until the edges are golden and crisp.",
    ],
    prepTime: 10,
    cookTime: 12,
    calories: 440,
    protein: 12,
    carbs: 58,
    fat: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "MAINTAIN_WEIGHT" as const,
    mealType: "BREAKFAST" as const,
  },

  // =========================================================
  // MAINTAIN WEIGHT — LUNCH
  // =========================================================
  {
    id: "maintain-lunch-chicken-bowl",
    name: "Grilled Chicken Bowl",
    description:
      "A dependable, well-balanced bowl — grilled chicken, rice, and fresh vegetables in proportions built to sustain energy without excess.",
    instructions: [
      "Grill the chicken until fully cooked, then slice.",
      "Cook the rice according to package instructions.",
      "Combine chicken, rice, and chopped vegetables in a bowl.",
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
    mealType: "LUNCH" as const,
  },
  {
    id: "maintain-lunch-mujadara",
    name: "Lentil Mujadara Bowl",
    description:
      "A time-honored combination of lentils, rice, and deeply caramelized onions — modest ingredients turned into a genuinely comforting, balanced plate.",
    instructions: [
      "Cook the lentils until tender.",
      "Cook the rice separately.",
      "Caramelize the onions slowly until deep golden brown, then mix everything together.",
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
    mealType: "LUNCH" as const,
  },
  {
    id: "maintain-lunch-falafel-plate",
    name: "Falafel & Salad Plate",
    description:
      "Crisp falafel served over a fresh, herb-forward salad — a satisfying, plant-based lunch built for consistent, steady-state energy.",
    instructions: [
      "Form the falafel mixture into patties and fry until golden and crisp.",
      "Toss a salad of parsley, tomato, and onion with lemon and olive oil.",
      "Serve the falafel over the salad with a side of tahini sauce.",
    ],
    prepTime: 15,
    cookTime: 15,
    calories: 500,
    protein: 18,
    carbs: 58,
    fat: 22,
    imageUrl:
      "https://images.unsplash.com/photo-1593001874117-c99c800e3eb9?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "MAINTAIN_WEIGHT" as const,
    mealType: "LUNCH" as const,
  },

  // =========================================================
  // MAINTAIN WEIGHT — DINNER
  // =========================================================
  {
    id: "maintain-dinner-salmon-rice",
    name: "Salmon Rice Bowl",
    description:
      "Pan-seared salmon over rice with fresh vegetables — a nutrient-dense dinner that closes out the day at a steady, well-calibrated calorie level.",
    instructions: [
      "Season the salmon and sear or bake until cooked through.",
      "Cook the rice.",
      "Serve the salmon over rice with a side of fresh vegetables.",
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
    mealType: "DINNER" as const,
  },
  {
    id: "maintain-dinner-chicken-pasta",
    name: "Chicken Pasta",
    description:
      "Whole wheat pasta tossed with tender chicken and seasonal vegetables — a familiar, satisfying dinner sized for maintenance rather than deficit or surplus.",
    instructions: [
      "Cook the pasta until al dente.",
      "Cook the chicken and slice.",
      "Toss the pasta, chicken, and vegetables together with a light sauce.",
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
    mealType: "DINNER" as const,
  },
  {
    id: "maintain-dinner-kafta",
    name: "Grilled Kafta with Rice",
    description:
      "Spiced grilled kafta served alongside fluffy rice and grilled vegetables — a classic, well-balanced dinner true to its Levantine roots.",
    instructions: [
      "Mix ground meat with onion, parsley, and warm spices.",
      "Shape into skewers and grill until cooked through.",
      "Serve over rice with grilled vegetables on the side.",
    ],
    prepTime: 15,
    cookTime: 20,
    calories: 600,
    protein: 36,
    carbs: 58,
    fat: 24,
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "MAINTAIN_WEIGHT" as const,
    mealType: "DINNER" as const,
  },

  // =========================================================
  // MAINTAIN WEIGHT — SNACK
  // =========================================================
  {
    id: "maintain-snack-mixed-nuts",
    name: "Mixed Nuts & Dried Fruit",
    description:
      "A dense, satisfying snack that bridges the gap between meals with a steady mix of healthy fats and natural sugars.",
    instructions: [
      "Portion a mix of almonds, walnuts, and dried apricots into a small bowl.",
    ],
    prepTime: 2,
    cookTime: 1,
    calories: 220,
    protein: 6,
    carbs: 18,
    fat: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "MAINTAIN_WEIGHT" as const,
    mealType: "SNACK" as const,
  },
  {
    id: "maintain-snack-labneh-toast",
    name: "Labneh & Honey Toast",
    description:
      "A quick, balanced snack pairing tangy labneh with a touch of honey over toasted bread — enough to satisfy without overshooting the day's targets.",
    instructions: [
      "Toast the bread.",
      "Spread a layer of labneh over the top.",
      "Drizzle lightly with honey before serving.",
    ],
    prepTime: 5,
    cookTime: 3,
    calories: 210,
    protein: 8,
    carbs: 24,
    fat: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "MAINTAIN_WEIGHT" as const,
    mealType: "SNACK" as const,
  },
  {
    id: "maintain-snack-fruit-cheese",
    name: "Fruit & Cheese Plate",
    description:
      "A refined, no-cook snack pairing fresh fruit with a modest portion of cheese for a balance of natural sugars, protein, and fat.",
    instructions: [
      "Slice seasonal fruit and arrange on a plate.",
      "Add a small portion of cheese alongside.",
    ],
    prepTime: 5,
    cookTime: 0,
    calories: 200,
    protein: 9,
    carbs: 16,
    fat: 11,
    imageUrl:
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "MAINTAIN_WEIGHT" as const,
    mealType: "SNACK" as const,
  },

  // =========================================================
  // GAIN WEIGHT — BREAKFAST
  // =========================================================
  {
    id: "gain-breakfast-peanut-oats",
    name: "Peanut Butter Protein Oats",
    description:
      "A calorie-dense breakfast built for a surplus — oats loaded with banana, Greek yogurt, and peanut butter for sustained energy from the first meal of the day.",
    instructions: [
      "Cook the oats until creamy.",
      "Stir in Greek yogurt and sliced banana.",
      "Finish with a generous spoon of peanut butter.",
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
    mealType: "BREAKFAST" as const,
  },
  {
    id: "gain-breakfast-avocado-toast",
    name: "Avocado Egg Toast",
    description:
      "Whole grain toast layered with eggs and avocado — a rich, satisfying breakfast delivering healthy fats and protein in a genuine surplus.",
    instructions: [
      "Toast the bread until golden.",
      "Cook the eggs to your preference.",
      "Mash the avocado and layer with the eggs on top of the toast.",
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
    mealType: "BREAKFAST" as const,
  },
  {
    id: "gain-breakfast-cheese-manakish",
    name: "Cheese Manakish",
    description:
      "A rich, cheese-topped flatbread — a calorie-dense morning staple that delivers a substantial surplus without feeling heavy.",
    instructions: [
      "Roll out the dough into a flat round.",
      "Cover generously with a blend of cheeses.",
      "Bake until the cheese is bubbling and the edges are golden.",
    ],
    prepTime: 10,
    cookTime: 12,
    calories: 590,
    protein: 24,
    carbs: 55,
    fat: 28,
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "GAIN_WEIGHT" as const,
    mealType: "BREAKFAST" as const,
  },

  // =========================================================
  // GAIN WEIGHT — LUNCH
  // =========================================================
  {
    id: "gain-lunch-chicken-rice-bowl",
    name: "Chicken Rice Power Bowl",
    description:
      "A substantial, calorie-dense bowl combining grilled chicken, rice, and avocado — built to comfortably support a caloric surplus at midday.",
    instructions: [
      "Grill the chicken until fully cooked, then slice.",
      "Cook the rice.",
      "Combine with sliced avocado in a large bowl.",
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
    mealType: "LUNCH" as const,
  },
  {
    id: "gain-lunch-beef-pasta",
    name: "Beef Pasta Bowl",
    description:
      "A hearty, generously portioned pasta dish — lean beef in a rich tomato sauce, finished with parmesan for real, sustained caloric density.",
    instructions: [
      "Cook the pasta until al dente.",
      "Cook the beef with tomato sauce until rich and thickened.",
      "Combine the pasta and beef, then top generously with parmesan.",
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
    mealType: "LUNCH" as const,
  },
  {
    id: "gain-lunch-kibbeh-plate",
    name: "Kibbeh & Rice Plate",
    description:
      "Crisp, filled kibbeh served over a generous portion of rice — a dense, traditional lunch designed to comfortably support muscle-building goals.",
    instructions: [
      "Shape the kibbeh shells and fill with a spiced meat mixture.",
      "Fry until deeply golden and crisp.",
      "Serve over a generous portion of rice.",
    ],
    prepTime: 20,
    cookTime: 20,
    calories: 700,
    protein: 40,
    carbs: 65,
    fat: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "GAIN_WEIGHT" as const,
    mealType: "LUNCH" as const,
  },

  // =========================================================
  // GAIN WEIGHT — DINNER
  // =========================================================
  {
    id: "gain-dinner-salmon-potatoes",
    name: "Salmon & Potato Plate",
    description:
      "A rich, satisfying dinner — salmon and roasted potatoes deliver a dense combination of protein, healthy fats, and carbohydrates to close a surplus day.",
    instructions: [
      "Season the salmon and set aside.",
      "Roast the potatoes until golden and crisp.",
      "Cook the salmon until just cooked through and serve together with vegetables.",
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
    mealType: "DINNER" as const,
  },
  {
    id: "gain-dinner-beef-kafta-rice",
    name: "Beef Kafta with Rice & Sauce",
    description:
      "Generously portioned grilled kafta served over rice with a rich tomato-based sauce — a dense, satisfying dinner built for consistent muscle-building nutrition.",
    instructions: [
      "Mix ground beef with onion, parsley, and warm spices, then shape into skewers.",
      "Grill until fully cooked.",
      "Serve over rice with a rich tomato sauce spooned over the top.",
    ],
    prepTime: 15,
    cookTime: 20,
    calories: 710,
    protein: 44,
    carbs: 62,
    fat: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "GAIN_WEIGHT" as const,
    mealType: "DINNER" as const,
  },
  {
    id: "gain-dinner-chicken-alfredo",
    name: "Chicken Alfredo Pasta",
    description:
      "A rich, creamy pasta dish loaded with grilled chicken — dense in calories and protein, designed as a satisfying end to a high-energy day.",
    instructions: [
      "Cook the pasta until al dente.",
      "Grill the chicken and slice.",
      "Toss the pasta in a rich cream sauce and top with the chicken.",
    ],
    prepTime: 10,
    cookTime: 20,
    calories: 780,
    protein: 46,
    carbs: 70,
    fat: 34,
    imageUrl:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "GAIN_WEIGHT" as const,
    mealType: "DINNER" as const,
  },

  // =========================================================
  // GAIN WEIGHT — SNACK
  // =========================================================
  {
    id: "gain-snack-banana-yogurt",
    name: "Banana Nut Yogurt Bowl",
    description:
      "A dense, nutrient-rich snack combining Greek yogurt, banana, nuts, and honey — enough caloric weight to meaningfully contribute to a surplus.",
    instructions: [
      "Spoon Greek yogurt into a bowl.",
      "Top with sliced banana, nuts, and a drizzle of honey.",
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
    mealType: "SNACK" as const,
  },
  {
    id: "gain-snack-protein-shake",
    name: "Peanut Butter Protein Shake",
    description:
      "A fast, calorie-dense shake blending milk, banana, protein powder, and peanut butter — a practical way to close a caloric gap without another full meal.",
    instructions: [
      "Add milk, banana, protein powder, and peanut butter to a blender.",
      "Blend until smooth and serve immediately.",
    ],
    prepTime: 5,
    cookTime: 0,
    calories: 450,
    protein: 35,
    carbs: 40,
    fat: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "GAIN_WEIGHT" as const,
    mealType: "SNACK" as const,
  },
  {
    id: "gain-snack-trail-mix",
    name: "Loaded Trail Mix",
    description:
      "A dense, portable mix of nuts, seeds, and dried fruit — an easy way to add meaningful calories between meals without extra prep.",
    instructions: [
      "Combine almonds, walnuts, pumpkin seeds, and dried fruit in a bowl.",
      "Portion into a container for easy snacking throughout the day.",
    ],
    prepTime: 5,
    cookTime: 0,
    calories: 400,
    protein: 14,
    carbs: 32,
    fat: 26,
    imageUrl:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=1200&q=80",
    isAiGenerated: false,
    updatedAt: new Date(),
    country: "Lebanon",
    goal: "GAIN_WEIGHT" as const,
    mealType: "SNACK" as const,
  },
];

async function main() {
  // migrate reset wipes the User table. Profile saves rely on a User row
  // existing for CURRENT_USER_ID ("123"), so recreate it here.
  await prisma.user.upsert({
    where: { id: "123" },
    update: {},
    create: {
      id: "123",
      email: "test@example.com",
      passwordHash: "not-a-real-hash", // placeholder only, no real auth uses this yet
      name: "Test User",
    },
  });

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
