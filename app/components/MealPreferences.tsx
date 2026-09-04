"use client";

import Card from "@/components/ui/Card";
import PillSelect from "@/components/ui/Pillselect";
import OptionCardGroup from "@/components/ui/Optioncard";
import { useProfile } from "@/Context/ProfileContext";
import { useQuery } from "@tanstack/react-query";
import { axiosGet, ApiError } from "@/lib/axios";

const CURRENT_USER_ID = "123";

const MEALS_PER_DAY = [3, 4, 5];

const MEAL_SOURCES = [
  { id: "cook", title: "Cook at Home", description: "Recipes with full ingredients", icon: "🔍" },
  { id: "delivery", title: "Order Delivery", description: "Restaurant meals delivered", icon: "📦" },
  { id: "outside", title: "Eat Outside", description: "Nearby restaurant picks", icon: "🍽️" },
  { id: "mix", title: "Mix of All", description: "We'll suggest based on your day", icon: "⚡" },
];

export default function MealPreferences({
  mealsPerDay,
  setMealsPerDay,
}: {
  mealsPerDay: number;
  setMealsPerDay: (value: number) => void;
}) {
  const { mealSource, setMealSource } = useProfile();

  const { data: profileData, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        return await axiosGet(`/profile/${CURRENT_USER_ID}`);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          return null; // no profile yet — normal for a new user
        }
        throw err;
      }
    },
  });

  console.log(profileData, isLoading, error);

  return (
    <div className="mx-auto max-w-2xl px-6 py-4">
      <Card
        step={5}
        color="purple"
        title="Meal Preferences"
        description="How you prefer to get your meals each day"
      >
        <PillSelect
          label="Meals Per Day"
          options={MEALS_PER_DAY}
          value={mealsPerDay}
          onChange={setMealsPerDay}
          formatOption={(count) => `${count} meals`}
          color="purple"
          columns={3}
        />

        <OptionCardGroup
          label="Meal Source Preference"
          options={MEAL_SOURCES}
          value={mealSource}
          onChange={(v) => setMealSource(v as "cook" | "delivery" | "outside" | "mix")}
        />
      </Card>
    </div>
  );
}