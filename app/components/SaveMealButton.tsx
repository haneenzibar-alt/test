"use client";

import { useState } from "react";

export function SaveMealButton({ recipeId }: { recipeId: string }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId }),
      });
      if (!res.ok) throw new Error("Failed to save meal");
      setSaved(true);
    } catch (err) {
      setError("Couldn't save meal. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleSave}
        disabled={saving || saved}
        className="w-full py-3 rounded-full bg-emerald-100 text-emerald-800 font-semibold hover:bg-emerald-200 transition disabled:opacity-60"
      >
        {saved ? "Saved ✓" : saving ? "Saving..." : "Save Meal"}
      </button>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
