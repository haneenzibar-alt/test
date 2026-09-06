"use client";

import { useRef, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosGet, axiosPost, ApiError } from "@/lib/axios";
import { Profile, User } from "@/generated/prisma/client";

const CURRENT_USER_ID = "123";

type ProfileWithUser = Profile & { user: User };

const goalLabelMap: Record<string, string> = {
  LOSE_WEIGHT: "Lose Weight",
  MAINTAIN_WEIGHT: "Maintain Weight",
  GAIN_WEIGHT: "Gain Weight",
};

const activityMultiplierMap: Record<string, number> = {
  SEDENTARY: 1.2,
  LIGHTLY_ACTIVE: 1.375,
  MODERATELY_ACTIVE: 1.55,
  VERY_ACTIVE: 1.725,
  EXTRA_ACTIVE: 1.9,
};

type ChatMessage = {
  id: number;
  role: "ai" | "user";
  text: string;
};

const quickPrompts = [
  "What's my calorie target?",
  "Suggest a lunch",
  "My protein target",
  "What's my BMI?",
  "Post-workout meal",
  "How much water?",
];

// All the numbers the coach talks about, derived from the real profile —
// same formulas used on the Profile page, so the two stay in sync.
function deriveCoachProfile(profile: ProfileWithUser) {
  const firstName = profile.user?.name?.split(" ")[0] ?? "there";

  const heightM = profile.height ? profile.height / 100 : 0;
  const bmi =
    profile.weight && heightM
      ? Number((profile.weight / (heightM * heightM)).toFixed(1))
      : null;
  const bmiCategory =
    bmi === null
      ? "unknown"
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

  return {
    firstName,
    weight: profile.weight ?? 0,
    country: profile.country ?? "your region",
    goal: profile.healthGoal ? goalLabelMap[profile.healthGoal] : "your goal",
    mealsPerDay: profile.mealsPerDay ?? 3,
    allergies: profile.allergies ?? [],
    dailyCalories,
    proteinTarget,
    carbsTarget,
    fatTarget,
    bmi,
    bmiCategory,
  };
}

export default function NutritionCoachPage() {
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery<ProfileWithUser | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        return await axiosGet<ProfileWithUser>(`/profile/${CURRENT_USER_ID}`);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          return null;
        }
        throw err;
      }
    },
  });

  // Only the conversation the user actually builds lives in state — the
  // greeting is derived straight from profileData at render time below, so
  // there's no effect-triggered setState (and no extra render) needed.
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const nextId = useRef(2);

  const greeting: ChatMessage | null = profileData
    ? (() => {
        const derived = deriveCoachProfile(profileData);
        return {
          id: 0,
          role: "ai",
          text: `Hello ${derived.firstName}! I'm your FitPlate Nutrition Coach.\n\nI know your health profile and I'm here to give you personalized guidance. Ask me about your ${derived.dailyCalories} kcal daily plan, meal ideas from ${derived.country}, macros, workout nutrition, hydration, or health conditions.`,
        };
      })()
    : null;

  const displayedMessages = greeting ? [greeting, ...messages] : messages;

  async function sendMessage(text: string) {
    const trimmed = text.trim();

    if (!trimmed || isTyping || !profileData) {
      return;
    }

    const userMessage: ChatMessage = {
      id: nextId.current,
      role: "user",
      text: trimmed,
    };
    nextId.current += 1;

    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput("");
    setIsTyping(true);

    try {
      const { reply } = await axiosPost<
        { message: string; userId: string },
        { reply: string }
      >("/nutrition-coach", {
        message: trimmed,
        userId: CURRENT_USER_ID,
      });

      const aiMessage: ChatMessage = {
        id: nextId.current,
        role: "ai",
        text: reply || "Unable to reach the Nutrition Coach right now. Please try again.",
      };
      nextId.current += 1;
      setMessages((current) => [...current, aiMessage]);
    } catch {
      const aiMessage: ChatMessage = {
        id: nextId.current,
        role: "ai",
        text: "Unable to reach the Nutrition Coach right now. Please try again.",
      };
      nextId.current += 1;
      setMessages((current) => [...current, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    sendMessage(input);
  }

  function handleClearChat() {
    setMessages([]);
    setInput("");
    setIsTyping(false);
    nextId.current = 2;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-gray-500">Loading your profile...</p>
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

  if (!profileData) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-4xl">🥗</p>
        <p className="text-sm text-gray-500">
          Complete your profile on the Home page first so your Nutrition Coach
          can personalize its guidance.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-[#fafaf7]">
      <section className="bg-linear-to-br from-emerald-900 to-emerald-800 px-4 py-6 md:px-6">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl">
              🥗
            </span>
            <div>
              <h1 className="font-serif text-xl font-bold text-white">
                Nutrition Coach
              </h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-emerald-100">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Online · Personalized to your profile
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClearChat}
            className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-medium text-white"
          >
            Clear Chat
          </button>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-4 md:px-6">
        <div className="flex-1 space-y-3">
          {displayedMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <p
                className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "bg-[#1a5c38] text-white"
                    : "border border-gray-200 bg-white text-gray-700"
                }`}
              >
                {message.text}
              </p>
            </div>
          ))}

          {isTyping && (
            <p className="text-sm text-gray-500">Nutrition Coach is typing...</p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              className="rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-[#1a5c38]"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask your nutrition coach..."
            className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none"
          />
          <button
            type="submit"
            className="rounded-xl bg-[#1a5c38] px-4 py-3 text-sm font-semibold text-white"
          >
            Send
          </button>
        </form>

        <p className="mt-3 text-xs leading-5 text-gray-500">
          FitPlate Nutrition Coach provides general nutritional guidance and is
          not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
}
