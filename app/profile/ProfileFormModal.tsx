"use client";

import { useState } from "react";
import { ActivityLevel, DietType, Gender, HealthGoal } from "@/generated/prisma/client";

export interface ProfileFormValues {
  age?: number;
  gender?: Gender;
  height?: number;
  weight?: number;
  targetWeight?: number;
  activityLevel?: ActivityLevel;
  dietType?: DietType;
  country?: string;
  healthGoal?: HealthGoal;
  mealsPerDay?: number;
  mealpreferences?: string;
  foodAllergies?: string;
  foodDislikes?: string;
  medicalConditions?: string;
}

export default function ProfileFormModal({
  initialValues,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  initialValues: ProfileFormValues | null;
  onClose: () => void;
  onSubmit: (values: ProfileFormValues) => void;
  isSubmitting: boolean;
}) {
  const [values, setValues] = useState<ProfileFormValues>({
    age: initialValues?.age ?? 25,
    gender: initialValues?.gender ?? "PREFER_NOT_TO_SAY",
    height: initialValues?.height ?? 165,
    weight: initialValues?.weight ?? 65,
    targetWeight: initialValues?.targetWeight ?? 65,
    activityLevel: initialValues?.activityLevel ?? "SEDENTARY",
    dietType: initialValues?.dietType ?? "STANDARD",
    country: initialValues?.country ?? "Lebanon",
    healthGoal: initialValues?.healthGoal ?? "MAINTAIN_WEIGHT",
    mealsPerDay: initialValues?.mealsPerDay ?? 3,
    mealpreferences: initialValues?.mealpreferences ?? "Cook at Home",
    foodAllergies: initialValues?.foodAllergies ?? "None",
    foodDislikes: initialValues?.foodDislikes ?? "None",
    medicalConditions: initialValues?.medicalConditions ?? "None",  
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          {initialValues ? "Edit Profile" : "Create Profile"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-500">Age</label>
              <input
                type="number"
                value={values.age}
                onChange={(e) => setValues({ ...values, age: Number(e.target.value) })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-500">Gender</label>
              <select
                value={values.gender}
                onChange={(e) => setValues({ ...values, gender: e.target.value as Gender })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
                <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-500">Height (cm)</label>
              <input
                type="number"
                value={values.height}
                onChange={(e) => setValues({ ...values, height: Number(e.target.value) })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-500">Weight (kg)</label>
              <input
                type="number"
                value={values.weight}
                onChange={(e) => setValues({ ...values, weight: Number(e.target.value) })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500">Target Weight (kg)</label>
            <input
              type="number"
              value={values.targetWeight}
              onChange={(e) => setValues({ ...values, targetWeight: Number(e.target.value) })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500">Country</label>
            <input
              type="text"
              value={values.country}
              onChange={(e) => setValues({ ...values, country: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500">Health Goal</label>
            <select
              value={values.healthGoal}
              onChange={(e) => setValues({ ...values, healthGoal: e.target.value as HealthGoal })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="LOSE_WEIGHT">Lose Weight</option>
              <option value="MAINTAIN_WEIGHT">Maintain Weight</option>
              <option value="GAIN_WEIGHT">Gain Weight</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500">Activity Level</label>
            <select
              value={values.activityLevel}
              onChange={(e) => setValues({ ...values, activityLevel: e.target.value as ActivityLevel })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="SEDENTARY">Sedentary</option>
              <option value="LIGHTLY_ACTIVE">Lightly Active</option>
              <option value="MODERATELY_ACTIVE">Moderately Active</option>
              <option value="VERY_ACTIVE">Very Active</option>
              <option value="EXTRA_ACTIVE">Extra Active</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500">Diet Type</label>
            <select
              value={values.dietType}
              onChange={(e) => setValues({ ...values, dietType: e.target.value as DietType })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="STANDARD">Standard</option>
              <option value="VEGETARIAN">Vegetarian</option>
              <option value="VEGAN">Vegan</option>
              <option value="KETO">Keto</option>
              <option value="PALEO">Paleo</option>
              <option value="MEDITERRANEAN">Mediterranean</option>
              <option value="PESCATARIAN">Pescatarian</option>
              <option value="GLUTEN_FREE">Gluten Free</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500">Meals Per Day</label>
            <input
              type="number"
              min={1}
              max={6}
              value={values.mealsPerDay}
              onChange={(e) => setValues({ ...values, mealsPerDay: Number(e.target.value) })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-xl bg-emerald-800 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
