"use client";

import { useState } from "react";

export default function Personalinform() {
  const [sex, setSex] = useState("female");

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1a5c38] text-sm font-bold text-white">
            1
          </span>
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Your basic details for accurate BMR calculation
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Full Name
          </label>
          <input
            type="text"
            placeholder="e.g. Sarah Hassan"
            className="w-full rounded-xl border border-gray-200 px-4 py-4 text-gray-800 placeholder-gray-400"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Biological Sex
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setSex("female")}
              className={`rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
                sex === "female"
                  ? "border-[#1a5c38] bg-[#1a5c38] text-white"
                  : "border-gray-200 bg-white text-gray-800"
              }`}
            >
              Female
            </button>
            <button
              type="button"
              onClick={() => setSex("male")}
              className={`rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
                sex === "male"
                  ? "border-[#1a5c38] bg-[#1a5c38] text-white"
                  : "border-gray-200 bg-white text-gray-800"
              }`}
            >
              Male
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Age
            </p>
            <div className="rounded-xl border border-gray-200 px-4 py-4 text-center">
              <input
                type="number"
                defaultValue={25}
                className="w-full bg-transparent text-center text-lg font-bold text-gray-900 outline-none"
              />
              <p className="text-xs text-gray-400">years</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Weight
            </p>
            <div className="rounded-xl border border-gray-200 px-4 py-4 text-center">
              <input
                type="number"
                defaultValue={65}
                className="w-full bg-transparent text-center text-lg font-bold text-gray-900 outline-none"
              />
              <p className="text-xs text-gray-400">kg</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Height
            </p>
            <div className="rounded-xl border border-gray-200 px-4 py-4 text-center">
              <input
                type="number"
                defaultValue={165}
                className="w-full bg-transparent text-center text-lg font-bold text-gray-900 outline-none"
              />
              <p className="text-xs text-gray-400">cm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
