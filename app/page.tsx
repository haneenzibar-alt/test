"use client";

import { useProfile } from "./Context/ProfileContext";
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


// inside your planner page's JSX, after PlannerHeader:


export default function Home() {
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
    workoutDays,
    setWorkoutDays,
    mealsPerDay,
    setMealsPerDay,
    planGenerated,
    setPlanGenerated,
  } = useProfile();

  // Calculate once, shared across PlanResults + PlanBreakdown
  const bmr =
    sex === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityMultiplier =
    workoutDays === 0
      ? 1.2
      : workoutDays <= 2
      ? 1.375
      : workoutDays <= 4
      ? 1.55
      : workoutDays <= 6
      ? 1.725
      : 1.9;

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
            workoutDays={workoutDays}
            mealsPerDay={mealsPerDay}
            country={country}
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
            workoutDays={workoutDays}
            setWorkoutDays={setWorkoutDays}
          />
          <FoodSafety />
          
          <MealPreferences
            mealsPerDay={mealsPerDay}
            setMealsPerDay={setMealsPerDay}
          />
         <GenerateButton
          name={name}
          onGenerate={() => {
          setPlanGenerated(true);
           window.scrollTo({ top: 0, behavior: "smooth" });
  }}
/>
         
        </>
        
      )}
    </main>
  );
}
