import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({ label, error, className, ...rest }: InputProps) {
  return (
    <div>
      <label
        htmlFor={rest.name}
        className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500"
      >
        {label}
      </label>
      <input
        id={rest.name}
        className={`w-full rounded-xl border px-4 py-3 text-gray-800 placeholder-gray-400 outline-none focus:ring-1 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
            : "border-gray-200 focus:border-emerald-700 focus:ring-emerald-700"
        } ${className ?? ""}`}
        {...rest}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
