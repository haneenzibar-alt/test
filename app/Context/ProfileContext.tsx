"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ActivityLevel } from "@/generated/prisma/client";

type ProfileContextType = {
  name: string;
  setName: (v: string) => void;
  sex: "female" | "male";
  setSex: (v: "female" | "male") => void;
  age: number;
  setAge: (v: number) => void;
  weight: number;
  setWeight: (v: number) => void;
  height: number;
  setHeight: (v: number) => void;
  country: string;
  setCountry: (v: string) => void;
  goal: "lose" | "maintain" | "gain";
  setGoal: (v: "lose" | "maintain" | "gain") => void;
  activityLevel: ActivityLevel | null;
  setActivityLevel: (v: ActivityLevel) => void;
  allergies: string;
  setAllergies: (v: string) => void;
  medicalConditions: string;
  setMedicalConditions: (v: string) => void;
  dislikedFoods: string;
  setDislikedFoods: (v: string) => void;
  mealsPerDay: number;
  setMealsPerDay: (v: number) => void;
  mealSource: "cook" | "delivery" | "outside" | "mix";
  setMealSource: (v: "cook" | "delivery" | "outside" | "mix") => void;
  planGenerated: boolean;
  setPlanGenerated: (v: boolean) => void;

  // Used to draw attention back to the Name field when Generate is clicked too early
  nameFieldHighlighted: boolean;
  setNameFieldHighlighted: (v: boolean) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [sex, setSex] = useState<"female" | "male">("female");
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(165);
  const [country, setCountry] = useState("Lebanon");
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("maintain");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | null>(null);
  const [allergies, setAllergies] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [dislikedFoods, setDislikedFoods] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [mealSource, setMealSource] = useState<"cook" | "delivery" | "outside" | "mix">("mix");
  const [planGenerated, setPlanGenerated] = useState(false);
  const [nameFieldHighlighted, setNameFieldHighlighted] = useState(false);

  return (
    <ProfileContext.Provider
      value={{
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
        nameFieldHighlighted,
        setNameFieldHighlighted,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }
  return context;
}
