"use client";

import Link from "next/link";

const PLATFORM_LINKS = [
  { label: "Home", href: "/" },
  { label: "Meal Planner", href: "/planner" },
  { label: "Nutrition Coach", href: "/nutrition-coach" },
  { label: "Saved Meals", href: "/saved" },
];

const EXPLORE_LINKS = [
  { label: "Restaurants", href: "/restaurants" },
  { label: "Nutritionists", href: "/nutritionists" },
  { label: "My Profile", href: "/profile" },
];

const WHY_FITPLATE = [
  { value: "44+", label: "Countries Supported" },
  { value: "70+", label: "Authentic Meals" },
  { value: "100%", label: "Allergen-Safe" },
  { value: "Free", label: "Always & Forever" },
];

const FEATURE_BADGES = [
  { icon: "🚀", label: "Harris-Benedict BMR Formula" },
  { icon: "🌍", label: "44+ Global Cuisines" },
  { icon: "⚡", label: "Allergen-Safe Filtering" },
  { icon: "🎙️", label: "Voice Nutrition Coach" },
  { icon: "📊", label: "Personalized Macro Targets" },
  { icon: "🔒", label: "Private — Data Never Shared" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-br from-emerald-950 to-emerald-900 px-6 py-16 text-emerald-50">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="mb-1 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700">
                <span className="text-lg text-white">➤</span>
              </span>
              <span className="text-xl font-bold text-white">FitPlate</span>
              <span className="rounded-md bg-orange-500 px-1.5 py-0.5 text-xs font-bold text-white">
                AI
              </span>
            </Link>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-emerald-300/70">
              Smart Nutrition · Global Meals
            </p>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-emerald-100/70">
              FitPlate AI is a global nutrition platform that calculates your
              personalized calorie targets and recommends authentic meals
              from your country&apos;s cuisine — powered by science, built
              for every body.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {FEATURE_BADGES.map((badge) => (
                <span
                  key={badge.label}
                  className="flex items-center gap-2 rounded-lg bg-emerald-800/40 px-3 py-2 text-xs font-medium text-emerald-100"
                >
                  <span>{badge.icon}</span>
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-emerald-300/70">
              Platform
            </p>
            <ul className="space-y-3">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-emerald-100 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore links */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-emerald-300/70">
              Explore
            </p>
            <ul className="space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-emerald-100 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Why FitPlate stats */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-emerald-300/70">
              Why FitPlate
            </p>
            <div className="space-y-3">
              {WHY_FITPLATE.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-emerald-800/40 px-4 py-3"
                >
                  <span className="mr-2 font-serif text-lg font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm text-emerald-100/80">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-emerald-800/60 pt-6 text-sm text-emerald-200/60 md:flex-row">
          <p>© {year} FitPlate AI · All rights reserved</p>

          <span className="flex items-center gap-2 rounded-full bg-emerald-800/40 px-4 py-2 text-xs font-medium text-emerald-100">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Calculations based on the Harris-Benedict BMR formula
          </span>

          <p className="max-w-xs text-right text-xs text-emerald-200/50">
            Not a substitute for medical advice. Consult a registered
            dietitian for clinical decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
