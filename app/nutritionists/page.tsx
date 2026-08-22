"use client";

import { useState } from "react";
import { nutritionists, type Nutritionist } from "./data";

const areaFilters = [
  { id: "all", label: "All Areas" },
  { id: "tripoli", label: "Tripoli" },
  { id: "beirut", label: "Beirut" },
];

export default function NutritionistsPage() {
  const [areaFilter, setAreaFilter] = useState("all");
  const [selectedNutritionist, setSelectedNutritionist] =
    useState<Nutritionist | null>(null);
  const [actionMessage, setActionMessage] = useState("");

  const filteredNutritionists = nutritionists.filter((nutritionist) => {
    if (areaFilter === "all") {
      return true;
    }

    return nutritionist.location.includes(
      areaFilter === "tripoli" ? "Tripoli" : "Beirut",
    );
  });

  if (selectedNutritionist) {
    return (
      <div className="min-h-full bg-[#fafaf7]">
        <section className="bg-linear-to-br from-emerald-900 to-emerald-800 px-4 py-10 md:px-6 md:py-12">
          <div className="mx-auto w-full max-w-2xl">
            <button
              type="button"
              onClick={() => {
                setSelectedNutritionist(null);
                setActionMessage("");
              }}
              className="text-sm font-medium text-emerald-100"
            >
              ← Back to Nutritionists
            </button>
            <h1 className="mt-4 font-serif text-3xl font-bold text-white md:text-4xl">
              Verified Nutritionists
            </h1>
          </div>
        </section>

        <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6">
          <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="relative h-64">
              <img
                src={selectedNutritionist.image}
                alt={selectedNutritionist.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              {selectedNutritionist.verified && (
                <span className="absolute top-3 left-3 rounded-full bg-[#1a5c38] px-3 py-1 text-xs font-semibold text-white">
                  ✓ Verified
                </span>
              )}
              <div className="absolute right-4 bottom-4 left-4 text-white">
                <h2 className="font-serif text-2xl font-bold">
                  {selectedNutritionist.name}
                </h2>
                <p className="mt-1 text-sm text-white/85">
                  {selectedNutritionist.specialty}
                </p>
              </div>
            </div>

            <div className="p-5 md:p-6">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-[#fafaf7] p-3 text-center">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Rating
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    ★ {selectedNutritionist.rating}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-[#fafaf7] p-3 text-center">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Reviews
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {selectedNutritionist.reviews}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-[#fafaf7] p-3 text-center">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {selectedNutritionist.location}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-[#fafaf7] p-3 text-center">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Price
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {selectedNutritionist.price}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  About
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {selectedNutritionist.bio}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Clinic
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {selectedNutritionist.clinic}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Availability
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {selectedNutritionist.availability}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Languages
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedNutritionist.languages.map((language) => (
                    <span
                      key={language}
                      className="rounded-full bg-[#dcf0e5] px-3 py-1 text-xs font-medium text-[#1a5c38]"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setActionMessage(
                      `Appointment booking for ${selectedNutritionist.name} is not connected yet.`,
                    )
                  }
                  className="rounded-xl bg-[#1a5c38] px-4 py-3 text-sm font-semibold text-white"
                >
                  Book Appointment
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActionMessage(
                      `Contact for ${selectedNutritionist.name} is not connected yet.`,
                    )
                  }
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800"
                >
                  Contact
                </button>
              </div>

              {actionMessage && (
                <p className="mt-3 text-sm text-[#1a5c38]">{actionMessage}</p>
              )}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#fafaf7]">
      <section className="bg-linear-to-br from-emerald-900 to-emerald-800 px-4 py-10 md:px-6 md:py-12">
        <div className="mx-auto w-full max-w-2xl">
          <h1 className="font-serif text-3xl font-bold text-white md:text-4xl">
            Verified Nutritionists
          </h1>
          <p className="mt-2 text-emerald-100">
            Certified professionals near you
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {areaFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setAreaFilter(filter.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  areaFilter === filter.id
                    ? "bg-white text-[#1a5c38]"
                    : "border border-white/30 bg-white/10 text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6">
        {filteredNutritionists.length > 0 ? (
          <div className="space-y-4">
            {filteredNutritionists.map((nutritionist) => (
              <button
                key={nutritionist.id}
                type="button"
                onClick={() => setSelectedNutritionist(nutritionist)}
                className="w-full rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm"
              >
                <div className="flex gap-4">
                  <img
                    src={nutritionist.image}
                    alt={nutritionist.name}
                    className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-serif text-lg font-bold text-gray-900">
                        {nutritionist.name}
                      </h2>
                      {nutritionist.verified && (
                        <span className="shrink-0 rounded-full bg-[#dcf0e5] px-2 py-1 text-xs font-semibold text-[#1a5c38]">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {nutritionist.specialty}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {nutritionist.location}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                      <span>
                        ★ {nutritionist.rating} ({nutritionist.reviews} reviews)
                      </span>
                      <span>{nutritionist.price}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <section className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <p className="text-gray-700">
              No nutritionists found in this area.
            </p>
            <button
              type="button"
              onClick={() => setAreaFilter("all")}
              className="mt-4 rounded-xl bg-[#1a5c38] px-4 py-2 text-sm font-semibold text-white"
            >
              Show All Areas
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
