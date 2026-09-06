"use client";

import { useRouter } from "next/navigation";

const CURRENT_USER_ID = "123";

export default function DeleteSavedMealButton({
  recipeId,
}: {
  recipeId: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/saved-meals?userId=${CURRENT_USER_ID}&recipeId=${recipeId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete meal");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete meal");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
    >
      Delete
    </button>
  );
}