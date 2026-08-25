"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import PillSelect from "@/components/ui/Pillselect";
import OptionCardGroup from "@/components/ui/Optioncard";

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
  // Not tracked in ProfileContext yet — local for now, same as before
  const [mealSource, setMealSource] = useState("mix");

  return (
  
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
          onChange={setMealSource}
        />
      </Card>
    
  );
}
