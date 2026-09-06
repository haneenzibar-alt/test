import { prisma } from "@/lib/prisma";
import { success, fail } from "@/lib/response";

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        country: true,
        cuisine: true,
        address: true,
        rating: true,
        imageUrl: true,
        menuItems: {
          select: {
            id: true,
            name: true,
            calories: true,
            protein: true,
            carbs: true,
            fat: true,
            price: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return success(restaurants);
  } catch (error) {
    console.error("Failed to load restaurants:", error);
    return fail("Unable to load restaurants. Please try again.", 500);
  }
}
