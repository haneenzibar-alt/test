"use client";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { useProfile } from "@/Context/ProfileContext";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "@/generated/prisma/client";
import axios from "axios";


export default function Personalinform({
  name,
  setName,
  sex,
  setSex,
  age,
  setAge,
  weight,
  setWeight,
  height,
  setHeight,
}: {
  name: string;
  setName: (value: string) => void;
  sex: "female" | "male";
  setSex: (value: "female" | "male") => void;
  age: number;
  setAge: (value: number) => void;
  weight: number;
  setWeight: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
}) {
  const { nameFieldHighlighted, setNameFieldHighlighted } = useProfile();

const { data: profileData, isLoading, error } = useQuery<UserProfile>({
  queryKey: ["profile"],
  queryFn: async () => {
    const response = await axios.get("/api/profile?userId=123");

    if (!response.data.success) {
      throw new Error(response.data.error ?? "Failed to fetch profile data");
    }

    return response.data.data;
  },
});
console.log(profileData, isLoading, error);
  return (
    <div className="mx-auto max-w-2xl px-6 py-4">
      <Card
        step={1}
        color="emerald"
        title="Personal Information"
        description="Your basic details for accurate BMR calculation"
      >
        <Input
          label="Full Name"
          name="fullName"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.trim() !== "") {
              setNameFieldHighlighted(false);
            }
          }}
          placeholder="e.g. Sarah Hassan"
          highlight={nameFieldHighlighted}
        />
            {isLoading && <p className="text-sm text-gray-500">Loading profile data...</p>}
            {error && <p className="text-sm text-red-500">Error loading profile data: {error.message}</p>}
            {profileData && (
              <p className="text-sm text-gray-500">
                Profile data loaded: , {profileData.gender} , {profileData.age} years old, {profileData.weight} kg, {profileData.height} cm
              </p>
            )}
          
        <div className="mt-4" />
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Biological Sex
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setSex("female")}
              className={`rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
                sex === "female"
                  ? "border-[#1a5c38] bg-[#1a5c38] text-white"
                  : "border-gray-200 bg-white text-gray-800"
              }`}
            >
              Female
            </button>
            <button
              type="button"
              onClick={() => setSex("male")}
              className={`rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
                sex === "male"
                  ? "border-[#1a5c38] bg-[#1a5c38] text-white"
                  : "border-gray-200 bg-white text-gray-800"
              }`}
            >
              Male
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Age
            </p>
            <div className="rounded-xl border border-gray-200 px-4 py-4 text-center">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-transparent text-center text-lg font-bold text-gray-900 outline-none"
              />
              <p className="text-xs text-gray-400">years</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Weight
            </p>
            <div className="rounded-xl border border-gray-200 px-4 py-4 text-center">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-transparent text-center text-lg font-bold text-gray-900 outline-none"
              />
              <p className="text-xs text-gray-400">kg</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Height
            </p>
            <div className="rounded-xl border border-gray-200 px-4 py-4 text-center">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full bg-transparent text-center text-lg font-bold text-gray-900 outline-none"
              />
              <p className="text-xs text-gray-400">cm</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
);
}
