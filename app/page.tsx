"use client";

import { useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useProfile } from "./Context/ProfileContext";
import {
  ActivityLevel,
  Gender,
  HealthGoal,
  MealSourcePreference,
  Profile,
} from "@/generated/prisma/client";
import { ApiError, axiosGet, axiosPatch, axiosPost } from "@/lib/axios";
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
    setAllergies,
    medicalConditions,
    setMedicalConditions,
    dislikedFoods,
    setDislikedFoods,
    mealsPerDay,
    setMealsPerDay,
    mealSource,
    setMealSource,
    planGenerated,
    setPlanGenerated,
  } = useProfile();

  const hasHydratedForm = useRef(false);

  const { data: existingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        return await axiosGet<Profile>(`/profile/${CURRENT_USER_ID}`);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          return null;
        }
        throw err;
      }
    },
  });

  useEffect(() => {
    if (hasHydratedForm.current || existingProfile === undefined) {
      return;
    }

    hasHydratedForm.current = true;
    if (!existingProfile) {
      return;
    }

    if (existingProfile.name) {
      setName(existingProfile.name);
    }
    if (existingProfile.gender === "MALE") {
      setSex("male");
    } else if (existingProfile.gender === "FEMALE") {
      setSex("female");
    }
    if (existingProfile.age) {
      setAge(existingProfile.age);
    }
    if (existingProfile.weight) {
      setWeight(existingProfile.weight);
    }
    if (existingProfile.height) {
      setHeight(existingProfile.height);
    }
    if (existingProfile.country) {
      setCountry(existingProfile.country);
    }
    if (existingProfile.healthGoal === "LOSE_WEIGHT") {
      setGoal("lose");
    } else if (existingProfile.healthGoal === "GAIN_WEIGHT") {
      setGoal("gain");
    } else if (existingProfile.healthGoal === "MAINTAIN_WEIGHT") {
      setGoal("maintain");
    }
    if (existingProfile.activityLevel) {
      setActivityLevel(existingProfile.activityLevel);
    }
    setAllergies(
      existingProfile.allergies.length > 0
        ? existingProfile.allergies.join(", ")
        : "",
    );
    setMedicalConditions(
      existingProfile.medicalConditions.length > 0
        ? existingProfile.medicalConditions.join(", ")
        : "",
    );
    setDislikedFoods(
      existingProfile.dislikedFoods.length > 0
        ? existingProfile.dislikedFoods.join(", ")
        : "",
    );
    if (existingProfile.mealsPerDay) {
      setMealsPerDay(existingProfile.mealsPerDay);
    }
    if (existingProfile.mealSourcePreference === "COOK_AT_HOME") {
      setMealSource("cook");
    } else if (existingProfile.mealSourcePreference === "ORDER_DELIVERY") {
      setMealSource("delivery");
    } else if (existingProfile.mealSourcePreference === "EAT_OUTSIDE") {
      setMealSource("outside");
    } else if (existingProfile.mealSourcePreference === "MIX_OF_ALL") {
      setMealSource("mix");
    }
  }, [
    existingProfile,
    setName,
    setSex,
    setAge,
    setWeight,
    setHeight,
    setCountry,
    setGoal,
    setActivityLevel,
    setAllergies,
    setMedicalConditions,
    setDislikedFoods,
    setMealsPerDay,
    setMealSource,
  ]);

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

      if (existingProfile) {
        return axiosPatch<Record<string, unknown>, Profile>(
          `/profile/${CURRENT_USER_ID}`,
          payload,
        );
      }

      return axiosPost<Record<string, unknown>, Profile>(
        `/profile/${CURRENT_USER_ID}`,
        payload,
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