"use client";

import { useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { restaurants } from "./data";

export default function RestaurantsPage() {
  const [planFilter, setPlanFilter] = useState<"all" | "fits">("all");
  const [deliveryOnly, setDeliveryOnly] = useState(false);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesPlan =
      planFilter === "all" ? true : restaurant.fitPlanTag === true;
    const matchesDelivery = deliveryOnly ? restaurant.delivery === true : true;

    return matchesPlan && matchesDelivery;
  });

  function clearFilters() {
    setPlanFilter("all");
    setDeliveryOnly(false);
  }

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

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setPlanFilter("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                planFilter === "all"
                  ? "bg-white text-[#1a5c38]"
                  : "border border-white/30 bg-white/10 text-white"
              }`}
            >
              All Restaurants
            </button>
            <button
              type="button"
              onClick={() => setPlanFilter("fits")}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                planFilter === "fits"
                  ? "bg-white text-[#1a5c38]"
                  : "border border-white/30 bg-white/10 text-white"
              }`}
            >
              ✓ Fits My Plan
            </button>
            <button
              type="button"
              onClick={() => setDeliveryOnly(!deliveryOnly)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                deliveryOnly
                  ? "bg-white text-[#1a5c38]"
                  : "border border-white/30 bg-white/10 text-white"
              }`}
            >
              🚴 Delivery Only
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-base font-semibold text-gray-900">
            🤖 AI-powered restaurant matching
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Restaurants marked ✓ Fits Your Plan have been matched against your
            current calorie budget (1,847 kcal remaining) and dietary
            restrictions.
          </p>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Meals from these restaurants auto-update your daily progress.
          </p>
        </section>

        <div className="mt-6 space-y-6">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <section className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <p className="text-gray-700">
                No restaurants match your current filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-xl bg-[#1a5c38] px-4 py-2 text-sm font-semibold text-white"
              >
                Clear filters
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
