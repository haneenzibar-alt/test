type Option = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type OptionCardGroupProps = {
  label: string;
  options: Option[];
  value: string;
  onChange: (id: string) => void;
  columns?: 1 | 2;
};

export default function OptionCardGroup({
  label,
  options,
  value,
  onChange,
  columns = 2,
}: OptionCardGroupProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </label>
      <div className={`grid gap-4 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
        {options.map((option) => {
          const isSelected = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`flex items-start gap-3 rounded-xl border px-4 py-4 text-left transition-colors ${
                isSelected
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-xl">{option.icon}</span>
              <span>
                <span
                  className={`block font-semibold ${
                    isSelected ? "text-purple-700" : "text-gray-900"
                  }`}
                >
                  {option.title}
                </span>
                <span className="block text-sm text-gray-500">
                  {option.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
