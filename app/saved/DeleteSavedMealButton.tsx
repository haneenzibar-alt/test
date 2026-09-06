"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosDelete } from "@/lib/axios";

const CURRENT_USER_ID = "123";

export default function DeleteSavedMealButton({
  savedMealId,
}: {
  savedMealId: string;
}) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => axiosDelete(`/saved/${savedMealId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["saved-meals", CURRENT_USER_ID],
      });
    },
  });

  return (
    <button
      type="button"
      onClick={() => deleteMutation.mutate()}
      disabled={deleteMutation.isPending}
      className="rounded-full bg-red-100 px-4 py-2 font-semibold text-red-700 transition hover:bg-red-200 disabled:opacity-60"
    >
      {deleteMutation.isPending ? "Removing..." : "Remove from Saved"}
    </button>
  );
}
