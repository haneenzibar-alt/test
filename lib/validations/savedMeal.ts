import { z } from "zod";

// لما المستخدم يعمل Save لوجبة، بس محتاجين الـ mealId
export const saveMealSchema = z.object({
  mealId: z.string().min(1, "mealId is required"),
});

export type SaveMealInput = z.infer<typeof saveMealSchema>;
