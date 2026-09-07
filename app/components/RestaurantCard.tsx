"use client";

import { useState } from "react";
import type { Restaurant, RestaurantMenuItem } from "../restaurants/data";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

function formatCalories(calories: number | null): string | null {
  if (calories === null) return null;
  return `${calories} kcal`;
}

function formatPrice(price: number | null): string | null {
  if (price === null) return null;
  return `$${price.toFixed(2)}`;
}

function formatMacros(item: RestaurantMenuItem): string | null {
  const parts: string[] = [];
  if (item.protein !== null) parts.push(`P ${item.protein}g`);
  if (item.carbs !== null) parts.push(`C ${item.carbs}g`);
  if (item.fat !== null) parts.push(`F ${item.fat}g`);
  return parts.length > 0 ? parts.join(" · ") : null;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");

  const location = [restaurant.address, restaurant.country]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative h-56 bg-emerald-900">
        {restaurant.imageUrl && (
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        {restaurant.rating !== null && (
          <span className="absolute top-3 right-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-800">
            ★ {restaurant.rating}
          </span>
        )}

        <div className="absolute right-4 bottom-4 left-4 text-white">
          <h2 className="font-serif text-2xl font-bold">{restaurant.name}</h2>
          {restaurant.cuisine && (
            <p className="mt-1 text-sm text-white/85">{restaurant.cuisine}</p>
          )}
          {location && <p className="text-sm text-white/75">{location}</p>}
        </div>
      </div>

      <div className="p-5">
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-xl bg-[#1a5c38] px-4 py-3 text-sm font-semibold text-white"
          >
            View Menu
          </button>
          <button
            type="button"
            onClick={() =>
              setOrderMessage("Online ordering is not connected yet.")
            }
            className="rounded-xl bg-orange-100 px-4 py-3 text-sm font-semibold text-orange-800"
          >
            Order Now
          </button>
        </div>

        {showMenu && (
          <div className="mt-4 rounded-xl border border-gray-100 bg-[#fafaf7] p-4">
            <p className="text-sm font-semibold text-[#1a5c38]">Menu</p>
            {restaurant.menuItems.length === 0 ? (
              <p className="mt-2 text-sm text-gray-500">
                No menu items are available for this restaurant yet.
              </p>
            ) : (
              <ul className="mt-2 space-y-3">
                {restaurant.menuItems.map((item) => {
                  const calories = formatCalories(item.calories);
                  const price = formatPrice(item.price);
                  const macros = formatMacros(item);

                  return (
                    <li key={item.id} className="text-sm text-gray-700">
                      <div className="flex items-center justify-between gap-3">
                        <span>{item.name}</span>
                        <span className="shrink-0 text-gray-500">
                          {[calories, price].filter(Boolean).join(" · ")}
                        </span>
                      </div>
                      {macros && (
                        <p className="mt-1 text-xs text-gray-500">{macros}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {orderMessage && (
          <p className="mt-3 text-sm text-orange-800">{orderMessage}</p>
        )}
      </div>
    </article>
  );
}
