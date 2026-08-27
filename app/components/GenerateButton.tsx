"use client";

export default function GenerateButton({
  name,
  onGenerate,
}: {
  name: string;
  onGenerate: () => void;
}) {
  const isEnabled = name.trim() !== "";

  const handleClick = () => {
    if (!isEnabled) return;
    onGenerate();
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-8 text-center">
      <button
        type="button"
        disabled={!isEnabled}
        onClick={handleClick}
        className={`w-full rounded-xl px-6 py-4 text-lg font-semibold transition-colors ${
          isEnabled
            ? "cursor-pointer bg-gradient-to-r from-emerald-700 to-emerald-800 text-white hover:from-emerald-800 hover:to-emerald-900"
            : "cursor-not-allowed bg-gray-100 text-gray-400"
        }`}
      >
        {isEnabled ? "✨ Generate My Personalized Plan" : "Enter your name to continue"}
      </button>
      <p className="mt-3 text-sm text-gray-400">
        🔒 Your data is private and never shared with third parties
      </p>
    </div>
  );
}