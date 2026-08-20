import Link from "next/link";

const features = [
  {
    title: "Personalized Calories",
    description:
      "Get a daily calorie target that matches your goals and lifestyle.",
  },
  {
    title: "Meal Recommendations",
    description:
      "See meal ideas chosen from global cuisines you actually enjoy.",
  },
  {
    title: "Nutrition Guidance",
    description:
      "Understand your macros with simple, clear nutrition breakdowns.",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-[#1a5c38] px-6 py-16 text-center md:px-10 md:py-20">
        <p className="inline-block rounded-full bg-[#dcf0e5] px-4 py-2 text-sm text-[#0f3d25]">
          AI-powered · Science-backed · 44 global cuisines
        </p>
        <h1 className="mt-6 font-serif text-3xl font-semibold text-white md:text-5xl">
          Build Your Personal Nutrition Plan
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[#dcf0e5]">
          Answer a few questions and we&apos;ll calculate your calorie target,
          macro breakdown, and recommend meals based on your preferences.
        </p>
        <Link
          href="/planner"
          className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-medium text-[#1a5c38]"
        >
          Start Planning
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-[#dcf0e5] bg-white p-6"
          >
            <h2 className="text-lg font-semibold text-[#1a5c38]">
              {feature.title}
            </h2>
            <p className="mt-3 text-stone-600">{feature.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
