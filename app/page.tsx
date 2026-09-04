"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfile } from "./Context/ProfileContext";
import {
  ActivityLevel,
  Gender,
  HealthGoal,
  MealSourcePreference,
  Profile,
} from "@/generated/prisma/client";
import { axiosPost, axiosPut } from "@/lib/axios";
import Homepage from "./Homepage/page";
import Personalinform from "./components/Personalinform";
import GoalsForm from "./components/LocationandHealth";
import Activitylevel from "./components/Activitylevel";
import FoodSafety from "./components/FoodSafety";
import MealPreferences from "./components/MealPreferences";
import GenerateButton from "./components/GenerateButton";
import PlanResults from "./components/PlanResult";
import PlanBreakdown from "./components/PlanBreakdown";
import TrustSection from "./components/TrustSection";

// TODO: replace with the real logged-in user's id from Supabase Auth
const CURRENT_USER_ID = "123";

const activityMultiplierMap: Record<ActivityLevel, number> = {
  SEDENTARY: 1.2,
  LIGHTLY_ACTIVE: 1.375,
  MODERATELY_ACTIVE: 1.55,
  VERY_ACTIVE: 1.725,
  EXTRA_ACTIVE: 1.9,
};

const genderMap: Record<"female" | "male", Gender> = {
  female: "FEMALE",
  male: "MALE",
};

const goalMap: Record<"lose" | "maintain" | "gain", HealthGoal> = {
  lose: "LOSE_WEIGHT",
  maintain: "MAINTAIN_WEIGHT",
  gain: "GAIN_WEIGHT",
};

const mealSourceMap: Record<"cook" | "delivery" | "outside" | "mix", MealSourcePreference> = {
  cook: "COOK_AT_HOME",
  delivery: "ORDER_DELIVERY",
  outside: "EAT_OUTSIDE",
  mix: "MIX_OF_ALL",
};

// Turns "Gluten, Peanuts, Shellfish" into ["Gluten", "Peanuts", "Shellfish"].
// Treats "None" (any casing) or an empty string as an empty list.
function parseListField(value: string): string[] {
  if (!value.trim() || value.trim().toLowerCase() === "none") {
    return [];
  }
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

export default function Home() {
  const queryClient = useQueryClient();
  const {
    name,
    setName,
    sex,
    setSex,
    age,
    setAge,
    weight,
    setWeight,
    height,
    setHeight,
    country,
    setCountry,
    goal,
    setGoal,
    activityLevel,
    setActivityLevel,
    allergies,
    medicalConditions,
    dislikedFoods,
    mealsPerDay,
    setMealsPerDay,
    mealSource,
    planGenerated,
    setPlanGenerated,
  } = useProfile();

  const saveProfileMutation = useMutation({
    mutationFn: () => {
      const payload: Record<string, unknown> = {
        name,
        age,
        gender: genderMap[sex],
        height,
        weight,
        country,
        healthGoal: goalMap[goal],
        activityLevel: activityLevel ?? "SEDENTARY",
        allergies: parseListField(allergies),
        medicalConditions: parseListField(medicalConditions),
        dislikedFoods: parseListField(dislikedFoods),
        mealsPerDay,
        mealSourcePreference: mealSourceMap[mealSource],
      };

      // Check the shared ["profile"] cache (populated by Personalinform's
      // GET query) to decide create vs update. If it's already loaded and
      // non-null, a profile exists — go through PUT instead of POST.
      const existingProfile = queryClient.getQueryData(["profile"]);

      if (existingProfile) {
        return axiosPut<Record<string, unknown> & { userId: string }, Profile>(
          "/profile",
          { userId: CURRENT_USER_ID, ...payload }
        );
      }

      return axiosPost<Record<string, unknown>, Profile>(
        `/profile/${CURRENT_USER_ID}`,
        payload
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  // Calculate once, shared across PlanResults + PlanBreakdown
  const bmr =
    sex === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityMultiplier = activityLevel
    ? activityMultiplierMap[activityLevel]
    : 1.2;

  const tdee = bmr * activityMultiplier;

  const calories =
    goal === "lose"
      ? Math.round(tdee - 500)
      : goal === "gain"
      ? Math.round(tdee + 500)
      : Math.round(tdee);

  const protein = Math.round((calories * 0.3) / 4);
  const carbs = Math.round((calories * 0.45) / 4);
  const fat = Math.round((calories * 0.25) / 9);

  const goalLabel =
    goal === "lose"
      ? "Lose Weight"
      : goal === "gain"
      ? "Gain Weight"
      : "Maintain Weight";

  return (
    <main>
      {planGenerated ? (
        <>
          <PlanResults
            name={name}
            sex={sex}
            age={age}
            weight={weight}
            height={height}
            goal={goal}
            mealsPerDay={mealsPerDay}
            country={country}
            activityLevel={activityLevel}
          />
          <PlanBreakdown
            goalLabel={goalLabel}
            country={country}
            calories={calories}
            protein={protein}
            carbs={carbs}
            fat={fat}
            mealsPerDay={mealsPerDay}
          />
          <TrustSection onUpdateProfile={() => setPlanGenerated(false)} />
        </>
      ) : (
        <>
          <Homepage />
          <Personalinform
            name={name}
            setName={setName}
            sex={sex}
            setSex={setSex}
            age={age}
            setAge={setAge}
            weight={weight}
            setWeight={setWeight}
            height={height}
            setHeight={setHeight}
          />
          <GoalsForm
            country={country}
            setCountry={setCountry}
            goal={goal}
            setGoal={setGoal}
          />
          <Activitylevel
            activityLevel={activityLevel}
            setActivityLevel={setActivityLevel}
          />
          <FoodSafety />

          <MealPreferences
            mealsPerDay={mealsPerDay}
            setMealsPerDay={setMealsPerDay}
          />

          {saveProfileMutation.isError && (
            <p className="mx-auto max-w-2xl px-6 text-sm text-red-500">
              Failed to save your profile. Please try again.
            </p>
          )}

          <GenerateButton
            name={name}
            onGenerate={() => {
              saveProfileMutation.mutate(undefined, {
                onSuccess: () => {
                  setPlanGenerated(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                },
              });
            }}
          />
        </>
      )}
    </main>
  );
}