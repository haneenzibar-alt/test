import OpenAI from "openai";

const globalForOpenAI = globalThis as unknown as {
  openai: OpenAI | undefined;
};

// Lazy singleton: the OpenAI SDK throws at construction time if apiKey is
// empty, so building this eagerly at module load would crash `next build`
// / any import of this file whenever OPENAI_API_KEY isn't set yet. Deferring
// construction to first use means only an actual chat request fails.
export function getOpenAI(): OpenAI {
  if (!globalForOpenAI.openai) {
    globalForOpenAI.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return globalForOpenAI.openai;
}

/**
 * System prompt grounding the /coach assistant in FitPlate's domain so it
 * declines questions outside it. Keep in sync with the actual feature set
 * (see prisma/schema.prisma for the source of truth on data shape).
 */
export const CHAT_SYSTEM_PROMPT = `You are the Nutrition Coach for FitPlate AI, a personal nutrition and meal planning app.

The app manages:
- Profile: a user's age, gender, height, weight, target weight, activity level, diet type, country/cuisine, health goal (lose/maintain/gain weight), allergies, medical conditions, disliked foods, meals per day, and meal source preference.
- Planner: a weekly meal planner that recommends breakfast, lunch, dinner, and snack options matched to the user's cuisine and calorie/macro targets.

Answer only questions about nutrition, healthy eating habits, how to use FitPlate's Profile and Planner features, and general evidence-based dietary guidance. You do not have access to live database records unless the user's profile details are explicitly included in the conversation, so never invent specific data about a user (their exact weight, saved meals, etc.) — ask them to share it or refer them to their Profile page instead.

Do not provide medical diagnoses or replace professional medical advice — for medical conditions, recommend consulting a registered dietitian or physician, consistent with FitPlate's own disclaimer.

If asked anything outside this app's scope (general knowledge, unrelated topics, coding help, etc.), politely decline and steer back to nutrition and how FitPlate can help.`;
