"use client";

import { useState } from "react";

const profile = {
  name: "Sarah Hassan",
  age: 25,
  gender: "Female",
  country: "Lebanon",
  countryFlag: "🇱🇧",
  weight: 65,
  height: 165,
  bmi: 22.4,
  bmiCategory: "Normal weight",
  healthGoal: "Maintain Weight",
  activityLevel: "Moderately Active",
  workoutFrequency: "3 days",
  mealsPerDay: "3 meals",
  mealPreference: "Mix of All",
  dailyCalories: 1847,
  proteinTarget: 120,
  carbsTarget: 210,
  fatTarget: 60,
  savedMeals: 3,
  allergies: ["Dairy", "Nuts"],
  medicalConditions: ["None"],
  dislikedFoods: ["Mushrooms", "Olives"],
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-gray-100 py-3 last:border-b-0">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-right text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}

export default function ProfilePage() {
  const [resetMessage, setResetMessage] = useState("");
  const firstLetter = profile.name.charAt(0);

  return (
    <div className="min-h-full bg-[#fafaf7]">
      <section className="bg-linear-to-br from-emerald-900 to-emerald-800 px-4 py-10 md:px-6 md:py-12">
        <div className="mx-auto w-full max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-[#1a5c38]">
            {firstLetter}
          </div>
          <h1 className="mt-4 font-serif text-3xl font-bold text-white">
            {profile.name}
          </h1>
          <p className="mt-2 text-sm text-emerald-100">
            {profile.countryFlag} {profile.country}
          </p>
          <p className="mt-1 text-sm text-emerald-100">
            Goal: {profile.healthGoal}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-emerald-200">Cal Target</p>
              <p className="mt-1 text-xl font-bold text-white">
                {profile.dailyCalories}
              </p>
            </div>
            <div>
              <p className="text-xs text-emerald-200">BMI</p>
              <p className="mt-1 text-xl font-bold text-white">{profile.bmi}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-200">Saved Meals</p>
              <p className="mt-1 text-xl font-bold text-white">
                {profile.savedMeals}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-2xl space-y-4 px-4 py-6 md:px-6">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-gray-900">
            Your Goal Progress
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-emerald-50 p-4 text-center">
              <p className="text-lg font-bold text-[#1a5c38]">
                {profile.dailyCalories}
              </p>
              <p className="mt-1 text-xs text-gray-500">kcal/day target</p>
            </div>
            <div className="rounded-xl bg-sky-50 p-4 text-center">
              <p className="text-lg font-bold text-sky-800">
                {profile.proteinTarget}g
              </p>
              <p className="mt-1 text-xs text-gray-500">protein/day</p>
            </div>
            <div className="rounded-xl bg-purple-50 p-4 text-center">
              <p className="text-lg font-bold text-purple-800">{profile.bmi}</p>
              <p className="mt-1 text-xs text-gray-500">BMI</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-gray-900">
            👤 Personal Info
          </h2>
          <div className="mt-2">
            <InfoRow label="Name" value={profile.name} />
            <InfoRow label="Age" value={`${profile.age} years`} />
            <InfoRow label="Gender" value={profile.gender} />
            <InfoRow
              label="Country"
              value={`${profile.countryFlag} ${profile.country}`}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-gray-900">
            ⚖ Body Metrics
          </h2>
          <div className="mt-2">
            <InfoRow label="Weight" value={`${profile.weight} kg`} />
            <InfoRow label="Height" value={`${profile.height} cm`} />
            <InfoRow
              label="BMI"
              value={`${profile.bmi} — ${profile.bmiCategory}`}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-gray-900">
            🎯 Nutrition Targets
          </h2>
          <div className="mt-2">
            <InfoRow
              label="Daily Calories"
              value={`${profile.dailyCalories} kcal`}
            />
            <InfoRow label="Protein" value={`${profile.proteinTarget}g/day`} />
            <InfoRow
              label="Carbohydrates"
              value={`${profile.carbsTarget}g/day`}
            />
            <InfoRow label="Fat" value={`${profile.fatTarget}g/day`} />
            <InfoRow label="Goal" value={profile.healthGoal} />
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-gray-900">
            🏃 Activity & Lifestyle
          </h2>
          <div className="mt-2">
            <InfoRow label="Activity Level" value={profile.activityLevel} />
            <InfoRow label="Workouts/week" value={profile.workoutFrequency} />
            <InfoRow label="Meals per day" value={profile.mealsPerDay} />
            <InfoRow label="Meal preference" value={profile.mealPreference} />
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-gray-900">
            ⚠ Food Allergies
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.allergies.map((item) => (
              <span
                key={item}
                className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-gray-900">
            ⚕ Medical Conditions
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.medicalConditions.map((item) => (
              <span
                key={item}
                className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-gray-900">
            🚫 Foods I Dislike
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.dislikedFoods.map((item) => (
              <span
                key={item}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#dcf0e5] bg-[#f3faf6] p-5">
          <p className="text-sm leading-6 text-gray-600">
            <span className="font-semibold text-[#1a5c38]">
              Medical disclaimer:
            </span>{" "}
            FitPlate AI provides general nutritional guidance and is not a
            substitute for professional medical advice. Please consult a
            registered dietitian or physician before making significant dietary
            changes, especially if you have medical conditions.
          </p>
        </section>

        <button
          type="button"
          onClick={() => setResetMessage("Profile reset is not connected yet.")}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700"
        >
          Reset Profile & Start Over
        </button>

        {resetMessage && (
          <p className="text-center text-sm text-[#1a5c38]">{resetMessage}</p>
        )}
      </div>
    </div>
  );
}
