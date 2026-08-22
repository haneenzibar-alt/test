"use client";

import Link from "next/link";

export default function PlannerLocked() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center">
      <span className="mb-6 text-5xl">🥗</span>
      <h1 className="mb-3 font-serif text-2xl font-bold text-gray-900">
        Set up your profile first
      </h1>
      <p className="mb-8 text-gray-400">
        Fill in your health profile on the Home page to unlock your
        personalized plan.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-emerald-800 px-6 py-3 font-semibold text-white hover:bg-emerald-900"
      >
        Go to Home →
      </Link>
    </div>
  );
}