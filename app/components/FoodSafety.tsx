"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { useProfile } from "@/Context/ProfileContext";
import { useQuery } from "@tanstack/react-query";
import { axiosGet, ApiError } from "@/lib/axios";

const CURRENT_USER_ID = "123";

type FieldName = "allergies" | "conditions" | "dislikes";
type FormErrors = Partial<Record<FieldName, string>>;

const FIELD_LABELS: Record<FieldName, string> = {
  allergies: "food allergies or intolerances",
  conditions: "medical conditions",
  dislikes: "disliked foods",
};

function validateField(field: FieldName, value: string): string | undefined {
  if (!value.trim()) {
    return `Please enter your ${FIELD_LABELS[field]}, or write "None" if not applicable`;
  }
  return undefined;
}

export default function FoodSafety() {
  const {
    allergies,
    setAllergies,
    medicalConditions,
    setMedicalConditions,
    dislikedFoods,
    setDislikedFoods,
  } = useProfile();

  const [errors, setErrors] = useState<FormErrors>({});

  const { data: profileData, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        return await axiosGet(`/profile/${CURRENT_USER_ID}`);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          return null; // no profile yet — normal for a new user
        }
        throw err;
      }
    },
  });

  console.log(profileData, isLoading, error);

  const fieldMap: Record<FieldName, { value: string; setValue: (v: string) => void }> = {
    allergies: { value: allergies, setValue: setAllergies },
    conditions: { value: medicalConditions, setValue: setMedicalConditions },
    dislikes: { value: dislikedFoods, setValue: setDislikedFoods },
  };

  function handleChange(field: FieldName, value: string) {
    fieldMap[field].setValue(value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleBlur(field: FieldName) {
    const error = validateField(field, fieldMap[field].value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-4">
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
          value={allergies}
          error={errors.allergies}
          onChange={(e) => handleChange("allergies", e.target.value)}
          onBlur={() => handleBlur("allergies")}
        />
        <Input
          label="Medical Conditions"
          name="conditions"
          placeholder="e.g. Diabetes, Hypertension, or None"
          value={medicalConditions}
          error={errors.conditions}
          onChange={(e) => handleChange("conditions", e.target.value)}
          onBlur={() => handleBlur("conditions")}
        />
        <Input
          label="Foods You Dislike"
          name="dislikes"
          placeholder="e.g. Onions, Cilantro, or None"
          value={dislikedFoods}
          error={errors.dislikes}
          onChange={(e) => handleChange("dislikes", e.target.value)}
          onBlur={() => handleBlur("dislikes")}
        />
      </Card>
    </div>
  );
}