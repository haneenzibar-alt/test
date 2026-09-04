"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosGet, axiosPut, axiosDelete, ApiError } from "@/lib/axios";
import {Profile, User } from "@/generated/prisma/client";
import ProfileFormModal, { ProfileFormValues } from "@/profile/ProfileFormModal";

const CURRENT_USER_ID = "123";

type ProfileWithUser = Profile & { user: User };

// Same lookup used on the Home page and PlanResults, kept in sync
const activityMultiplierMap: Record<string, number> = {
  SEDENTARY: 1.2,
  LIGHTLY_ACTIVE: 1.375,
  MODERATELY_ACTIVE: 1.55,
  VERY_ACTIVE: 1.725,
  EXTRA_ACTIVE: 1.9,
};

const activityLabelMap: Record<string, string> = {
  SEDENTARY: "Sedentary",
  LIGHTLY_ACTIVE: "Lightly Active",
  MODERATELY_ACTIVE: "Moderately Active",
  VERY_ACTIVE: "Very Active",
  EXTRA_ACTIVE: "Extra Active",
};

const goalLabelMap: Record<string, string> = {
  LOSE_WEIGHT: "Lose Weight",
  MAINTAIN_WEIGHT: "Maintain Weight",
  GAIN_WEIGHT: "Gain Weight",
};

const genderLabelMap: Record<string, string> = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
  PREFER_NOT_TO_SAY: "Prefer not to say",
};

const mealSourceLabelMap: Record<string, string> = {
  COOK_AT_HOME: "Cook at Home",
  ORDER_DELIVERY: "Order Delivery",
  EAT_OUTSIDE: "Eat Outside",
  MIX_OF_ALL: "Mix of All",
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
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<ProfileWithUser | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        // Now hits the [id] route instead of the query-param based one
        return await axiosGet<ProfileWithUser>(`/profile/${CURRENT_USER_ID}`);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          return null;
        }
        throw err;
      }
    },
  });

  const invalidateProfile = () =>
    queryClient.invalidateQueries({ queryKey: ["profile"] });

  // PUT still lives on the base /profile route, so this is unchanged
  const updateMutation = useMutation({
    mutationFn: (values: ProfileFormValues) =>
      axiosPut<ProfileFormValues & { userId: string }, ProfileWithUser>("/profile", {
        userId: CURRENT_USER_ID,
        ...values,
      }),
    onSuccess: () => {
      invalidateProfile();
      setModalOpen(false);
    },
  });

  // DELETE still lives on the base /profile route, so this is unchanged
  const deleteMutation = useMutation({
    mutationFn: () => axiosDelete<Profile>(`/profile?userId=${CURRENT_USER_ID}`),
    onSuccess: () => invalidateProfile(),
  });

  const handleReset = () => {
    if (window.confirm("Reset your profile? This cannot be undone.")) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-red-500">
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-4xl">👤</p>
        <p className="text-sm text-gray-500">
          No profile yet. Complete the questionnaire on the Home page to get started.
        </p>
      </div>
    );
  }

  // Derived values (BMI, calories, macros) — same formulas used on the Home page
  const heightM = profile.height ? profile.height / 100 : 0;
  const bmi =
    profile.weight && heightM
      ? Number((profile.weight / (heightM * heightM)).toFixed(1))
      : null;
  const bmiCategory =
    bmi === null
      ? "—"
      : bmi < 18.5
      ? "Underweight"
      : bmi < 25
      ? "Normal weight"
      : bmi < 30
      ? "Overweight"
      : "Obese";

  const bmr =
    profile.weight && profile.height
      ? profile.gender === "MALE"
        ? 10 * profile.weight + 6.25 * profile.height - 5 * (profile.age ?? 0) + 5
        : 10 * profile.weight + 6.25 * profile.height - 5 * (profile.age ?? 0) - 161
      : 0;

  const activityMultiplier = profile.activityLevel
    ? activityMultiplierMap[profile.activityLevel]
    : 1.2;

  const tdee = bmr * activityMultiplier;

  const dailyCalories =
    profile.calorieTarget ??
    Math.round(
      profile.healthGoal === "LOSE_WEIGHT"
        ? tdee - 500
        : profile.healthGoal === "GAIN_WEIGHT"
        ? tdee + 500
        : tdee
    );

  const proteinTarget = profile.proteinTarget ?? Math.round((dailyCalories * 0.3) / 4);
  const carbsTarget = profile.carbTarget ?? Math.round((dailyCalories * 0.45) / 4);
  const fatTarget = profile.fatTarget ?? Math.round((dailyCalories * 0.25) / 9);

  return (
    <div className="min-h-full bg-[#fafaf7]">
      <section className="bg-linear-to-br from-emerald-900 to-emerald-800 px-4 py-10 md:px-6 md:py-12">
        <div className="mx-auto w-full max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-[#1a5c38]">
            {profile.user?.name ? profile.user.name.charAt(0) : "?"}
          </div>
          <h1 className="mt-4 font-serif text-3xl font-bold text-white">
            {profile.user?.name ?? "My Profile"}
          </h1>
          <p className="mt-2 text-sm text-emerald-100">
            {profile.country ?? "Country not set"}
          </p>
          <p className="mt-1 text-sm text-emerald-100">
            Goal: {profile.healthGoal ? goalLabelMap[profile.healthGoal] : "—"}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-emerald-200">Cal Target</p>
              <p className="mt-1 text-xl font-bold text-white">{dailyCalories}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-200">BMI</p>
              <p className="mt-1 text-xl font-bold text-white">{bmi ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-200">Meals/Day</p>
              <p className="mt-1 text-xl font-bold text-white">{profile.mealsPerDay}</p>
            </div>
          </div>

          {/* New: Edit button, added on top of the existing design */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-6 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#1a5c38] transition-colors hover:bg-emerald-50"
          >
            Edit Profile
          </button>
        </div>
      </section>

      <div className="mx-auto w-full max-w-2xl space-y-4 px-4 py-6 md:px-6">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-gray-900">
            Your Goal Progress
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-emerald-50 p-4 text-center">
              <p className="text-lg font-bold text-[#1a5c38]">{dailyCalories}</p>
              <p className="mt-1 text-xs text-gray-500">kcal/day target</p>
            </div>
            <div className="rounded-xl bg-sky-50 p-4 text-center">
              <p className="text-lg font-bold text-sky-800">{proteinTarget}g</p>
              <p className="mt-1 text-xs text-gray-500">protein/day</p>
            </div>
            <div className="rounded-xl bg-purple-50 p-4 text-center">
              <p className="text-lg font-bold text-purple-800">{bmi ?? "—"}</p>
              <p className="mt-1 text-xs text-gray-500">BMI</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-gray-900">
            👤 Personal Info
          </h2>
          <div className="mt-2">
            <InfoRow label="Name" value={profile.user?.name ?? "—"} />
            <InfoRow label="Age" value={profile.age ? `${profile.age} years` : "—"} />
            <InfoRow
              label="Gender"
              value={profile.gender ? genderLabelMap[profile.gender] : "—"}
            />
            <InfoRow label="Country" value={profile.country ?? "—"} />
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-gray-900">
            ⚖ Body Metrics
          </h2>
          <div className="mt-2">
            <InfoRow label="Weight" value={profile.weight ? `${profile.weight} kg` : "—"} />
            <InfoRow label="Height" value={profile.height ? `${profile.height} cm` : "—"} />
            <InfoRow label="BMI" value={bmi ? `${bmi} — ${bmiCategory}` : "—"} />
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-gray-900">
            🎯 Nutrition Targets
          </h2>
          <div className="mt-2">
            <InfoRow label="Daily Calories" value={`${dailyCalories} kcal`} />
            <InfoRow label="Protein" value={`${proteinTarget}g/day`} />
            <InfoRow label="Carbohydrates" value={`${carbsTarget}g/day`} />
            <InfoRow label="Fat" value={`${fatTarget}g/day`} />
            <InfoRow
              label="Goal"
              value={profile.healthGoal ? goalLabelMap[profile.healthGoal] : "—"}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-gray-900">
            🏃 Activity & Lifestyle
          </h2>
          <div className="mt-2">
            <InfoRow
              label="Activity Level"
              value={profile.activityLevel ? activityLabelMap[profile.activityLevel] : "—"}
            />
          
            <InfoRow label="Meals per day" value={`${profile.mealsPerDay} meals`} />
            <InfoRow
              label="Meal preference"
              value={
                profile.mealSourcePreference
                  ? mealSourceLabelMap[profile.mealSourcePreference]
                  : "—"
              }
            />
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-gray-900">
            ⚠ Food Allergies
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.allergies.length === 0 && (
              <span className="text-sm text-gray-400">None reported</span>
            )}
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
            {profile.medicalConditions.length === 0 && (
              <span className="text-sm text-gray-400">None reported</span>
            )}
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
            {profile.dislikedFoods.length === 0 && (
              <span className="text-sm text-gray-400">None reported</span>
            )}
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
            <span className="font-semibold text-[#1a5c38]">Medical disclaimer:</span>{" "}
            FitPlate AI provides general nutritional guidance and is not a substitute
            for professional medical advice. Please consult a registered dietitian or
            physician before making significant dietary changes, especially if you
            have medical conditions.
          </p>
        </section>

        {/* New: Reset button, added on top of the existing design */}
        <button
          type="button"
          onClick={handleReset}
          disabled={deleteMutation.isPending}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
        >
          {deleteMutation.isPending ? "Resetting..." : "Reset Profile & Start Over"}
        </button>
      </div>

      {isModalOpen && (
        <ProfileFormModal
          initialValues={{
            age: profile.age ?? undefined,
            gender: profile.gender ?? undefined,
            height: profile.height ?? undefined,
            weight: profile.weight ?? undefined,
            targetWeight: profile.targetWeight ?? undefined,
            activityLevel: profile.activityLevel ?? undefined,
            dietType: profile.dietType ?? undefined,
            country: profile.country ?? undefined,
            healthGoal: profile.healthGoal ?? undefined,
            mealsPerDay: profile.mealsPerDay ?? undefined,
          }}
          onClose={() => setModalOpen(false)}
          onSubmit={(values) => updateMutation.mutate(values)}
          isSubmitting={updateMutation.isPending}
        />
      )}
    </div>
  );
}
