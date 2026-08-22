// "use client";


// import { useState } from "react";

// const healthGoals = [
//   { id: "lose", label: "Lose Weight" },
//   { id: "maintain", label: "Maintain Weight" },
//   { id: "gain", label: "Gain Weight" },
// ];

// export default function LocationHealthGoal() {
//   const [healthGoal, setHealthGoal] = useState("maintain");

//   return (
//     <div className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6">
//       <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
//         <div className="mb-8 flex items-start gap-4">
//           <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1a5c38] text-sm font-bold text-white">
//             2
//           </span>
//           <div>
//             <h2 className="font-serif text-2xl font-bold text-gray-900">
//               Location & Health Goal
//             </h2>
//             <p className="mt-1 text-sm text-gray-500">
//               Help us personalize your nutrition recommendations
//             </p>
//           </div>
//         </div>

//         <div className="mb-6">
//           <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
//             Country
//           </p>
//         <div>
//   <label className="mb-2 block text-sm font-semibold text-gray-600">
//     COUNTRY
//   </label>

//   <select
//     className="w-full rounded-xl border border-gray-200 px-4 py-4 text-gray-800 outline-none"
//     defaultValue="Lebanon"
//   >
//     <option value="Lebanon">🇱🇧 Lebanon</option>
//     <option value="Jordan">🇯🇴 Jordan</option>
//     <option value="UAE">🇦🇪 UAE</option>
//     <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
//     <option value="Egypt">🇪🇬 Egypt</option>
    

//   </select>
// </div>
//         </div>

//         <div>
//           <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
//             Health Goal
//           </p>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//             {healthGoals.map((goal) => (
//               <button
//                 key={goal.id}
//                 type="button"
//                 onClick={() => setHealthGoal(goal.id)}
//                 className={`rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
//                   healthGoal === goal.id
//                     ? "border-[#1a5c38] bg-[#1a5c38] text-white"
//                     : "border-gray-200 bg-white text-gray-800"
//                 }`}
//               >
//                 {goal.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
