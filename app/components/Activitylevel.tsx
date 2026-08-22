"use client";

const WORKOUT_DAYS = [0, 1, 2, 3, 4, 5, 6, 7];

export default function Activitylevel({
  workoutDays,
  setWorkoutDays,
}: {
  workoutDays: number;
  setWorkoutDays: (value: number) => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded- bg-orange-500 font-bold text-white">
            3
          </span>
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Activity Level
            </h2>
            <p className="text-sm text-gray-500">
              How many days a week do you work out?
            </p>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Weekly Workout Frequency
          </label>
          <div className="flex gap-2">
            {WORKOUT_DAYS.map((day) => {
              const isSelected = workoutDays === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setWorkoutDays(day)}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border font-semibold transition-colors ${
                    isSelected
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-gray-200 text-gray-400 hover:border-gray-300"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-gray-400">days per week</p>
        </div>
      </div>
    </div>
  );
}