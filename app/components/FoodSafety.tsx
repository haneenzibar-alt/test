"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

type FormValues = {
  allergies: string;
  conditions: string;
  dislikes: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const emptyValues: FormValues = {
  allergies: "",
  conditions: "",
  dislikes: "",
};

const FIELD_LABELS: Record<keyof FormValues, string> = {
  allergies: "food allergies or intolerances",
  conditions: "medical conditions",
  dislikes: "disliked foods",
};

function validateField(field: keyof FormValues, value: string): string | undefined {
  if (!value.trim()) {
    return `Please enter your ${FIELD_LABELS[field]}, or write "None" if not applicable`;
  }
  return undefined;
}

export default function FoodSafety() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleBlur(field: keyof FormValues) {
    const error = validateField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  return (
    <Card
      step={4}
      color="red"
      title="Food Safety & Health"
      description="We'll never recommend meals that contain your allergens"
    >
      <Input
        label="Food Allergies & Intolerances"
        name="allergies"
        placeholder="e.g. Gluten, Peanuts, Shellfish"
        value={values.allergies}
        error={errors.allergies}
        onChange={(e) => handleChange("allergies", e.target.value)}
        onBlur={() => handleBlur("allergies")}
      />
      <Input
        label="Medical Conditions"
        name="conditions"
        placeholder="e.g. Diabetes, Hypertension, or None"
        value={values.conditions}
        error={errors.conditions}
        onChange={(e) => handleChange("conditions", e.target.value)}
        onBlur={() => handleBlur("conditions")}
      />
      <Input
        label="Foods You Dislike"
        name="dislikes"
        placeholder="e.g. Onions, Cilantro, or None"
        value={values.dislikes}
        error={errors.dislikes}
        onChange={(e) => handleChange("dislikes", e.target.value)}
        onBlur={() => handleBlur("dislikes")}
      />
    </Card>
  );
}
