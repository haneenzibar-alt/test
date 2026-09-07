export type NutritionistUser = {
  id: string;
  name: string | null;
  role: string;
};

export type Nutritionist = {
  id: string;
  specialty: string;
  bio: string | null;
  credentials: string[];
  hourlyRate: number | null;
  availability: string | null;
  user: NutritionistUser;
};

export type Appointment = {
  id: string;
  clientId: string;
  nutritionistId: string;
  scheduledAt: string;
  duration: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  notes: string | null;
  client: { id: string; name: string | null };
  nutritionist: { id: string; name: string | null };
};
