"use client";

import { useRef, useState, type FormEvent } from "react";

const profile = {
  name: "Sarah Hassan",
  age: 25,
  weight: 65,
  height: 165,
  country: "Lebanon",
  goal: "Maintain Weight",
  activityLevel: "Moderately Active",
  workoutFrequency: 3,
  mealsPerDay: 3,
  allergies: ["Dairy", "Nuts"],
  medicalConditions: [] as string[],
  dailyCalories: 1847,
  proteinTarget: 120,
  carbsTarget: 210,
  fatTarget: 60,
  bmi: 22.4,
  bmiCategory: "Normal weight",
};

const firstName = profile.name.split(" ")[0];

type ChatMessage = {
  id: number;
  role: "ai" | "user";
  text: string;
};

const initialMessage: ChatMessage = {
  id: 1,
  role: "ai",
  text: `Hello ${firstName}! I'm your FitPlate Nutrition Coach.\n\nI know your health profile and I'm here to give you personalized guidance. Ask me about your ${profile.dailyCalories} kcal daily plan, meal ideas from ${profile.country}, macros, workout nutrition, hydration, or health conditions.`,
};

const quickPrompts = [
  "What's my calorie target?",
  "Suggest a lunch",
  "My protein target",
  "What's my BMI?",
  "Post-workout meal",
  "How much water?",
];

function buildResponse(input: string) {
  const text = input.toLowerCase();

  if (
    /\bhi\b/.test(text) ||
    text.includes("hello") ||
    /\bhey\b/.test(text) ||
    text.includes("marhaba")
  ) {
    return `Hello ${firstName}! I'm your FitPlate Nutrition Coach. How can I help you today?`;
  }

  if (
    text.includes("allergy") ||
    text.includes("allergies") ||
    text.includes("intolerant")
  ) {
    return `Your recorded allergies are ${profile.allergies.join(" and ")}. Meal suggestions should avoid these ingredients.`;
  }

  if (text.includes("water") || text.includes("hydration")) {
    return `Based on your ${profile.weight} kg weight, aim for about 2.1 liters of water per day, plus extra water around workouts.`;
  }

  if (
    text.includes("workout") ||
    text.includes("gym") ||
    text.includes("exercise") ||
    text.includes("training")
  ) {
    return "Before training, choose light carbohydrates. After training, include a protein-rich meal such as grilled chicken, labneh, or lentils.";
  }

  if (
    text.includes("meal") ||
    text.includes("food") ||
    text.includes("breakfast") ||
    text.includes("lunch") ||
    text.includes("dinner") ||
    text.includes("suggest") ||
    text.includes("recommend")
  ) {
    return `Here are simple ${profile.country}-based meal ideas:\n- Grilled Chicken Bowl\n- Lentil Mujadara Bowl\n- Lebanese Breakfast Plate`;
  }

  if (text.includes("macro") || text.includes("carbs") || text.includes("fat")) {
    return `Your daily macros are:\nProtein: ${profile.proteinTarget}g\nCarbs: ${profile.carbsTarget}g\nFat: ${profile.fatTarget}g`;
  }

  if (text.includes("bmi") || text.includes("weight status")) {
    return `Your BMI is ${profile.bmi}, classified as ${profile.bmiCategory}.`;
  }

  if (text.includes("protein")) {
    return `Your daily protein target is ${profile.proteinTarget}g/day, which is about 40g per meal across ${profile.mealsPerDay} meals.`;
  }

  if (
    text.includes("calorie") ||
    text.includes("kcal") ||
    text.includes("energy")
  ) {
    return `Your daily calorie target is ${profile.dailyCalories} kcal/day. This is based on your current profile and ${profile.goal} goal.`;
  }

  return `Based on your profile, your daily target is ${profile.dailyCalories} kcal with ${profile.proteinTarget}g protein. Ask me about calories, macros, meals, workouts, BMI, hydration, or allergies.`;
}

export default function NutritionCoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const nextId = useRef(2);

  function sendMessage(text: string) {
    const trimmed = text.trim();

    if (!trimmed || isTyping) {
      return;
    }

    const userMessage = {
      id: nextId.current,
      role: "user" as const,
      text: trimmed,
    };
    nextId.current += 1;

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      const aiMessage = {
        id: nextId.current,
        role: "ai" as const,
        text: buildResponse(trimmed),
      };
      nextId.current += 1;

      setMessages((current) => [...current, aiMessage]);
      setIsTyping(false);
    }, 650);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    sendMessage(input);
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
            onClick={() => {
              setMessages([initialMessage]);
              setInput("");
              setIsTyping(false);
              nextId.current = 2;
            }}
            className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-medium text-white"
          >
            Clear Chat
          </button>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-4 md:px-6">
        <div className="flex-1 space-y-3">
          {messages.map((message) => (
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
