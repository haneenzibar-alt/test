"use client";

import { useEffect, useState } from "react";
import { ApiError, axiosGet, axiosPost } from "@/lib/axios";

const CURRENT_USER_ID = "123";

type SavedMealRow = {
  recipeId: string;
};

export function SaveMealButton({ recipeId }: { recipeId: string }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSavedState() {
      try {
        const savedMeals = await axiosGet<SavedMealRow[]>(
          `/saved?userId=${CURRENT_USER_ID}`,
        );
        if (!cancelled) {
          setSaved(savedMeals.some((meal) => meal.recipeId === recipeId));
        }
      } catch {
        // Keep the default unsaved state if the list cannot be loaded.
      }
    }

    void loadSavedState();
    return () => {
      cancelled = true;
    };
  }, [recipeId]);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await axiosPost<{ userId: string; recipeId: string }, unknown>(
        "/saved",
        { userId: CURRENT_USER_ID, recipeId },
      );
      setSaved(true);
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setSaved(true);
        return;
      }
      setError("Couldn't save meal. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleSave}
        disabled={saving || saved}
        className="w-full rounded-full bg-emerald-100 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-200 disabled:opacity-60"
      >
        {saved ? "Saved ✓" : saving ? "Saving..." : "Save Meal"}
      </button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
