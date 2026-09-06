"use client";

import { useQuery } from "@tanstack/react-query";
import RestaurantCard from "../components/RestaurantCard";
import { axiosGet } from "@/lib/axios";
import type { Restaurant } from "./data";

export default function RestaurantsPage() {
  const {
    data: restaurants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => axiosGet<Restaurant[]>("/restaurants"),
  });

  return (
    <div className="min-h-full bg-[#fafaf7]">
      <section className="bg-linear-to-br from-emerald-900 to-emerald-800 px-4 py-10 md:px-6 md:py-12">
        <div className="mx-auto w-full max-w-2xl">
          <h1 className="font-serif text-3xl font-bold text-white md:text-4xl">
            Nearby Restaurants
          </h1>
          <p className="mt-2 text-emerald-100">
            Healthy meals that match your plan
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-base font-semibold text-gray-900">
            🤖 AI-powered restaurant matching
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Restaurant lists and menus are loaded from FitPlate&apos;s restaurant
            catalog. Plan-fit and delivery matching are not available yet because
            those fields are not in the current database.
          </p>
        </section>

        <div className="mt-6 space-y-6">
          {isLoading && (
            <p className="text-center text-sm text-gray-500">
              Loading restaurants...
            </p>
          )}

          {isError && (
            <section className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <p className="text-gray-700">
                Unable to load restaurants. Please try again.
              </p>
            </section>
          )}

          {!isLoading && !isError && restaurants && restaurants.length === 0 && (
            <section className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <p className="text-gray-700">No restaurants are available yet.</p>
            </section>
          )}

          {!isLoading &&
            !isError &&
            restaurants &&
            restaurants.length > 0 &&
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </div>
      </div>
    </div>
  );
}
