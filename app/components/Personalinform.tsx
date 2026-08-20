"use client";

import { useState } from "react";

export default function Personalinform() {
  const [sex, setSex] = useState<"female" | "male">("female");

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="mb-8 flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-800 font-bold text-white">
            1
          </span>
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Personal Information
            </h2>
            <p className="text-sm text-gray-500">
              Your basic details for accurate BMR calculation
            </p>
          </div>
        </div>

        {/* Full Name */}
        <div className="mb-6">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Full Name
          </label>
          <input
            type="text"
            placeholder="e.g. Sarah Hassan"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 placeholder-gray-400 outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
          />
        </div>

        {/* Biological Sex */}
        <div className="mb-6">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Biological Sex
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setSex("female")}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                sex === "female"
                  ? "bg-emerald-800 text-white"
                  : "border border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              ♀ Female
            </button>
            <button
              type="button"
              onClick={() => setSex("male")}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                sex === "male"
                  ? "bg-emerald-800 text-white"
                  : "border border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              ♂ Male
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Used for accurate BMR calculation only
          </p>
        </div>

        {/* Age / Weight / Height */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Age
            </label>
            <div className="rounded-xl border border-gray-200 px-4 py-3 text-center">
              <div className="text-lg font-bold text-gray-900">25</div>
              <div className="text-xs text-gray-400">years</div>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Weight
            </label>
            <div className="rounded-xl border border-gray-200 px-4 py-3 text-center">
              <div className="text-lg font-bold text-gray-900">65</div>
              <div className="text-xs text-gray-400">kg</div>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Height
            </label>
            <div className="rounded-xl border border-gray-200 px-4 py-3 text-center">
              <div className="text-lg font-bold text-gray-900">165</div>
              <div className="text-xs text-gray-400">cm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}