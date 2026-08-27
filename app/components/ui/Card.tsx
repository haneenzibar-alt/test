import { ReactNode } from "react";

type CardProps = {
  step?: number | string;
  color?: "emerald" | "blue" | "orange" | "red" | "purple";
  title?: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
};

const BADGE_COLORS: Record<NonNullable<CardProps["color"]>, string> = {
  emerald: "bg-[#1a5c38]",
  blue: "bg-blue-600",
  orange: "bg-orange-500",
  red: "bg-red-500",
  purple: "bg-purple-600",
};

export default function Card({
  step,
  color = "emerald",
  title,
  description,
  footer,
  children,
}: CardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      {(step !== undefined || title || description) && (
        <div className="mb-8 flex items-start gap-4">
          {step !== undefined && (
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white ${BADGE_COLORS[color]}`}
            >
              {step}
            </span>
          )}
          <div>
            {title && (
              <h2 className="font-serif text-2xl font-bold text-gray-900">{title}</h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
          </div>
        </div>
      )}

      <div className="space-y-6">{children}</div>

      {footer && (
        <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">
          {footer}
        </div>
      )}
    </div>
  );
}
