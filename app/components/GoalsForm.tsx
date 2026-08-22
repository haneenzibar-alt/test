"use client";

import { useState } from "react";

const COUNTRIES = [
  { code: "LB", name: "Lebanon" },
  { code: "EG", name: "Egypt" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "JO", name: "Jordan" },
  { code: "SY", name: "Syria" },
  { code: "IQ", name: "Iraq" },
  { code: "KW", name: "Kuwait" },
  { code: "QA", name: "Qatar" },
  { code: "MA", name: "Morocco" },
  { code: "TN", name: "Tunisia" },
  { code: "US", name: "United States" },
  { code: "FR", name: "France" },
  { code: "GB", name: "United Kingdom" },
];

const GOALS = [
  { id: "lose", title: "Lose Weight", description: "Calorie deficit — sustainable fat loss", icon: "↓", iconBg: "bg-red-50", iconColor: "text-red-500" },
  { id: "maintain", title: "Maintain Weight", description: "Balanced intake — sustain current weight", icon: "⇄", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { id: "gain", title: "Gain Weight", description: "Calorie surplus — build healthy mass", icon: "↑", iconBg: "bg-green-50", iconColor: "text-green-600" },
] as const;

export default function GoalsForm({
  country,
  setCountry,
  goal,
  setGoal,
}: {
  country: string;
  setCountry: (value: string) => void;
  goal: "lose" | "maintain" | "gain";
  setGoal: (value: "lose" | "maintain" | "gain") => void;
}) {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const currentCountry = COUNTRIES.find((c) => c.name === country) ?? COUNTRIES[0];

  return (
    <div className="mx-auto max-w-2xl px-6 py-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
            2
          </span>
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Location &amp; Health Goal
            </h2>
            <p className="text-sm text-gray-500">
              We&apos;ll recommend meals from your country&apos;s cuisine
            </p>
          </div>
        </div>

        {/* Country selector */}
        <div className="relative mb-6">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Your Country
          </label>

          <button
            type="button"
            onClick={() => setIsCountryOpen(!isCountryOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left"
          >
            <span className="flex items-center gap-3">
              <span className="font-bold text-gray-700">{currentCountry.code}</span>
              <span className="text-gray-800">{currentCountry.name}</span>
            </span>
            <span className={`text-gray-400 transition-transform ${isCountryOpen ? "rotate-180" : ""}`}>
              ⌄
            </span>
          </button>

          {isCountryOpen && (
            <div className="absolute z-10 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setCountry(c.name);
                    setIsCountryOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 ${
                    c.name === country ? "bg-blue-50" : ""
                  }`}
                >
                  <span className="font-bold text-gray-700">{c.code}</span>
                  <span className="text-gray-800">{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Health Goal */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Health Goal
          </label>
          <div className="flex flex-col gap-4">
            {GOALS.map((g) => {
              const isSelected = goal === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-4 text-left transition-colors ${
                    isSelected ? "border-blue-600 bg-blue-600" : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-lg ${
                        isSelected ? "bg-blue-500/50 text-white" : `${g.iconBg} ${g.iconColor}`
                      }`}
                    >
                      {g.icon}
                    </span>
                    <span>
                      <span className={`block font-semibold ${isSelected ? "text-white" : "text-gray-900"}`}>
                        {g.title}
                      </span>
                      <span className={`block text-sm ${isSelected ? "text-blue-100" : "text-gray-500"}`}>
                        {g.description}
                      </span>
                    </span>
                  </span>
                  {isSelected && <span className="text-white">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}