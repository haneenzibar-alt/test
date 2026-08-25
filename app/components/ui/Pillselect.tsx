type PillSelectProps<T extends string | number> = {
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
  formatOption?: (option: T) => string;
  color?: "emerald" | "purple" | "blue";
  columns?: number;
  hint?: string;
};

const ACTIVE_CLASSES: Record<NonNullable<PillSelectProps<string>["color"]>, string> = {
  emerald: "border-emerald-700 bg-emerald-50 text-emerald-800",
  purple: "border-purple-600 bg-purple-50 text-purple-700",
  blue: "border-blue-600 bg-blue-50 text-blue-700",
};

export default function PillSelect<T extends string | number>({
  label,
  options,
  value,
  onChange,
  formatOption,
  color = "emerald",
  columns,
  hint,
}: PillSelectProps<T>) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </label>
      <div
        className={columns ? "grid gap-3" : "flex flex-wrap gap-2"}
        style={columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined}
      >
        {options.map((option) => {
          const isSelected = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-xl border px-4 py-3 text-center font-semibold transition-colors ${
                isSelected
                  ? ACTIVE_CLASSES[color]
                  : "border-gray-200 text-gray-400 hover:border-gray-300"
              }`}
            >
              {formatOption ? formatOption(option) : option}
            </button>
          );
        })}
      </div>
      {hint && <p className="mt-2 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
