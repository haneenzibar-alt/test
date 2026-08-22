"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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
  workoutDays: number;
  setWorkoutDays: (v: number) => void;
  mealsPerDay: number;
  setMealsPerDay: (v: number) => void;
  planGenerated: boolean;
  setPlanGenerated: (v: boolean) => void;
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
  const [workoutDays, setWorkoutDays] = useState(3);
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [planGenerated, setPlanGenerated] = useState(false);

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
        workoutDays,
        setWorkoutDays,
        mealsPerDay,
        setMealsPerDay,
        planGenerated,
        setPlanGenerated,
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
