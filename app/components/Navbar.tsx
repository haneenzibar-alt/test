"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Planner", href: "/planner" },
  { label: "Nutrition Coach", href: "/nutrition-coach" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Nutritionists", href: "/nutritionists" },
  { label: "Saved", href: "/saved" },
  { label: "Profile", href: "/profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-800">
            <Plus className="h-5 w-5 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-bold text-gray-900">FitPlate</span>
          <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-semibold text-gray-500">
            AI
          </span>
        </Link>

        {/* Nav links */}
        <ul className="flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative pb-5 -mb-5 pt-5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-emerald-800"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-800" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}