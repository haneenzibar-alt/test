"use client";

const TRUST_POINTS = [
  {
    icon: "🔬",
    title: "Science-backed",
    description:
      "Harris-Benedict BMR formula used by registered dietitians worldwide.",
  },
  {
    icon: "🌍",
    title: "Globally aware",
    description:
      "44+ countries with authentic, locally-sourced meal recommendations.",
  },
  {
    icon: "⚕️",
    title: "Medically conscious",
    description:
      "Allergen filtering and medical condition awareness in every suggestion.",
  },
];

export default function TrustSection({
  onUpdateProfile,
}: {
  onUpdateProfile: () => void;
}) {
  return (
    <section className="bg-emerald-50/30 px-6 pb-12">
      <div className="mx-auto max-w-3xl space-y-4">
        {/* Why trust FitPlate AI */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="mb-6 font-serif text-xl font-bold text-gray-900">
            Why trust FitPlate AI?
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {TRUST_POINTS.map((point) => (
              <div key={point.title} className="flex gap-3">
                <span className="text-xl">{point.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

       
        <button
          type="button"
          onClick={onUpdateProfile}
          className="w-full rounded-2xl border border-gray-200 bg-white py-4 text-center font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          ← Update My Profile
        </button>
      </div>
    </section>
  );
}
