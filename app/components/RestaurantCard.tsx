"use client";

import { useState } from "react";
import type { Restaurant } from "../restaurants/data";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative h-56">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        {restaurant.fitPlanTag && (
          <span className="absolute top-3 left-3 rounded-full bg-[#1a5c38] px-3 py-1 text-xs font-semibold text-white">
            ✓ Fits Your Plan
          </span>
        )}

        <span className="absolute top-3 right-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-800">
          ★ {restaurant.rating}
        </span>

        <div className="absolute right-4 bottom-4 left-4 text-white">
          <h2 className="font-serif text-2xl font-bold">{restaurant.name}</h2>
          <p className="mt-1 text-sm text-white/85">{restaurant.cuisine}</p>
          <p className="text-sm text-white/75">{restaurant.location}</p>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm leading-6 text-gray-600">
          {restaurant.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
          {restaurant.delivery && <span>🚴 {restaurant.deliveryTime}</span>}
          {restaurant.pickup && <span>🏃 Pickup available</span>}
          <span>🍽 {restaurant.calories}</span>
          <span>{restaurant.price}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {restaurant.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#dcf0e5] px-3 py-1 text-xs font-medium text-[#1a5c38]"
            >
              {tag}
            </span>
          ))}
        </div>

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
              setOrderMessage(
                `Ordering for ${restaurant.name} is not connected yet.`,
              )
            }
            className="rounded-xl bg-orange-100 px-4 py-3 text-sm font-semibold text-orange-800"
          >
            Order Now
          </button>
        </div>

        {showMenu && (
          <div className="mt-4 rounded-xl border border-gray-100 bg-[#fafaf7] p-4">
            <p className="text-sm font-semibold text-[#1a5c38]">Menu</p>
            <ul className="mt-2 space-y-2">
              {restaurant.menu.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between text-sm text-gray-700"
                >
                  <span>{item.name}</span>
                  <span className="text-gray-500">{item.calories}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {orderMessage && (
          <p className="mt-3 text-sm text-orange-800">{orderMessage}</p>
        )}
      </div>
    </article>
  );
}
