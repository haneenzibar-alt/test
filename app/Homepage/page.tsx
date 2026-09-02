export default function Homepage() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-emerald-900 to-emerald-800 px-6 py-22 text-center">
   
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-65 w-65 rounded-full bg-emerald-700/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -top-10 h-65 w-65 rounded-full bg-emerald-700/40 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-600/50 bg-emerald-800/50 px-4 py-2 text-sm font-medium text-emerald-100">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          AI-powered · Science-backed · 44 global cuisines
        </div>

        {/* Heading */}
        <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-white sm:text-6xl">
          Build Your Personal
          <br />
          <span className="text-emerald-200">Nutrition Plan</span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto max-w-xl text-lg text-emerald-100/80">
          Answer a few questions and we&apos;ll calculate your exact calorie
          target, macro breakdown, and recommend real meals from your
          country&apos;s cuisine.
        </p>
      </div>
    </section>
  );
}