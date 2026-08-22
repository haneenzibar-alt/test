"use client";

import { useState } from "react";

export default function FoodSafety() {
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");
  const [dislikes, setDislikes] = useState("");

  const [allergiesError, setAllergiesError] = useState("");
  const [conditionsError, setConditionsError] = useState("");
  const [dislikesError, setDislikesError] = useState("");

  const validateField = (value: string, setError: (msg: string) => void, fieldName: string) => {
    if (value.trim() === "") {
      setError(`Please enter your ${fieldName}, or write "None" if not applicable`);
    } else {
      setError("");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500 font-bold text-white">
            4
          </span>
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Food Safety &amp; Health
            </h2>
            <p className="text-sm text-gray-500">
              We&apos;ll never recommend meals that contain your allergens
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Food Allergies &amp; Intolerances
          </label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            onBlur={() => validateField(allergies, setAllergiesError, "food allergies or intolerances")}
            placeholder="e.g. Gluten, Peanuts, Shellfish"
            className={`w-full rounded-xl border px-4 py-3 text-gray-800 placeholder-gray-400 outline-none focus:ring-1 ${
              allergiesError ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-emerald-700 focus:ring-emerald-700"
            }`}
          />
          {allergiesError && <p className="mt-1.5 text-xs text-red-500">{allergiesError}</p>}
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Medical Conditions
          </label>
          <input
            type="text"
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            onBlur={() => validateField(conditions, setConditionsError, "medical conditions")}
            placeholder="e.g. Diabetes, Hypertension, or None"
            className={`w-full rounded-xl border px-4 py-3 text-gray-800 placeholder-gray-400 outline-none focus:ring-1 ${
              conditionsError ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-emerald-700 focus:ring-emerald-700"
            }`}
          />
          {conditionsError && <p className="mt-1.5 text-xs text-red-500">{conditionsError}</p>}
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Foods You Dislike
          </label>
          <input
            type="text"
            value={dislikes}
            onChange={(e) => setDislikes(e.target.value)}
            onBlur={() => validateField(dislikes, setDislikesError, "disliked foods")}
            placeholder="e.g. Onions, Cilantro, or None"
            className={`w-full rounded-xl border px-4 py-3 text-gray-800 placeholder-gray-400 outline-none focus:ring-1 ${
              dislikesError ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-emerald-700 focus:ring-emerald-700"
            }`}
          />
          {dislikesError && <p className="mt-1.5 text-xs text-red-500">{dislikesError}</p>}
        </div>
      </div>
    </div>
  );
}