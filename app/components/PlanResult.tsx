"use client";

export default function PlanResults({
  name,
  sex,
  age,
  weight,
  height,
  goal,
  workoutDays,
  mealsPerDay,
  country,
}: {
  name: string;
  sex: "female" | "male";
  age: number;
  weight: number;
  height: number;
  goal: "lose" | "maintain" | "gain";
  workoutDays: number;
  mealsPerDay: number;
  country: string;
}) {
  // Mifflin-St Jeor BMR formula
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

  const heightM = height / 100;
  const bmi = Number((weight / (heightM * heightM)).toFixed(1));
  const bmiLabel =
    bmi < 18.5
      ? "Underweight"
      : bmi < 25
      ? "Normal weight"
      : bmi < 30
      ? "Overweight"
      : "Obese";

  const goalLabel =
    goal === "lose"
      ? "Lose Weight"
      : goal === "gain"
      ? "Gain Weight"
      : "Maintain Weight";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 to-emerald-800 px-6 py-16">
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-emerald-700/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -top-10 h-72 w-72 rounded-full bg-emerald-700/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* Left side */}
        <div>
          <span className="mb-4 inline-block rounded-full bg-emerald-700/50 px-4 py-1.5 text-sm font-medium text-emerald-50">
            {country} cuisine
          </span>

          <p className="mb-2 text-emerald-100/80">Plan ready for {name}</p>

          <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
            Your Personalized
            <br />
            Nutrition Plan
          </h1>

          <p className="mb-8 text-emerald-100/90">
            Goal: <span className="font-semibold text-white">{goalLabel}</span> ·{" "}
            {mealsPerDay} meals/day · {workoutDays} workouts/week
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-emerald-800/50 p-4">
              <p className="text-xs uppercase tracking-wide text-emerald-200/70">
                Daily Calories
              </p>
              <p className="mt-1 text-2xl font-bold text-white">{calories}</p>
              <p className="text-xs text-emerald-200/70">kcal</p>
            </div>
            <div className="rounded-xl bg-emerald-800/50 p-4">
              <p className="text-xs uppercase tracking-wide text-emerald-200/70">
                BMI
              </p>
              <p className="mt-1 text-2xl font-bold text-white">{bmi}</p>
              <p className="text-xs text-emerald-200/70">{bmiLabel}</p>
            </div>
            <div className="rounded-xl bg-emerald-800/50 p-4">
              <p className="text-xs uppercase tracking-wide text-emerald-200/70">
                Protein
              </p>
              <p className="mt-1 text-2xl font-bold text-white">{protein}g</p>
              <p className="text-xs text-emerald-200/70">per day</p>
            </div>
            <div className="rounded-xl bg-emerald-800/50 p-4">
              <p className="text-xs uppercase tracking-wide text-emerald-200/70">
                Meals/Day
              </p>
              <p className="mt-1 text-2xl font-bold text-white">{mealsPerDay}</p>
              <p className="text-xs text-emerald-200/70">planned</p>
            </div>
          </div>
        </div>

        {/* Right side card */}
        <div className="rounded-2xl bg-emerald-800/40 p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200/70">
              Daily Calorie Target
            </p>
            <p className="mt-1 text-4xl font-bold text-white">{calories}</p>
            <p className="text-xs text-emerald-200/70">kcal / day</p>
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-emerald-200/70">
            Macro Targets
          </p>

          <div className="space-y-5">
            <div>
              <div className="mb-1.5 flex justify-between text-sm text-emerald-50">
                <span>Protein</span>
                <span className="font-semibold">{protein}g</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-blue-400" style={{ width: "65%" }} />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex justify-between text-sm text-emerald-50">
                <span>Carbs</span>
                <span className="font-semibold">{carbs}g</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-amber-400" style={{ width: "80%" }} />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex justify-between text-sm text-emerald-50">
                <span>Fat</span>
                <span className="font-semibold">{fat}g</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-purple-400" style={{ width: "45%" }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
