import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const meals = [
    {
      name: "Grilled Chicken Bowl",
      country: "Lebanon",
      mealType: "lunch" as const,
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
      name: "Lebanese Breakfast Plate",
      country: "Lebanon",
      mealType: "breakfast" as const,
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
      name: "Lentil Mujadara Bowl",
      country: "Lebanon",
      mealType: "dinner" as const,
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

  for (const meal of meals) {
    await prisma.meal.create({ data: meal });
  }

  console.log(`Seeded ${meals.length} meals.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
