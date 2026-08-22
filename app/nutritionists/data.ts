export type Nutritionist = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  verified: boolean;
  image: string;
  bio: string;
  clinic: string;
  availability: string;
  languages: string[];
};

export const nutritionists: Nutritionist[] = [
  {
    id: "diala-al-massri",
    name: "Diala Al Massri",
    specialty: "Weight Management & Sports Nutrition",
    location: "Tripoli, Lebanon",
    rating: 4.9,
    reviews: 128,
    price: "$40/session",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
    bio: "Helps clients build sustainable eating habits for weight goals and athletic performance, with simple weekly check-ins.",
    clinic: "FitPlate Partner Clinic, Azmi Street, Tripoli",
    availability: "Mon–Thu, 10:00 AM – 6:00 PM",
    languages: ["Arabic", "English"],
  },
  {
    id: "asma-chanbour",
    name: "Asma Chanbour",
    specialty: "Nutrition Awareness & Healthy Diet Plans",
    location: "Tripoli, Lebanon",
    rating: 4.8,
    reviews: 95,
    price: "$35/session",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=1200&q=80",
    bio: "Focuses on everyday nutrition education and practical meal plans families can follow without strict restriction.",
    clinic: "Nour Wellness Studio, Boulevard, Tripoli",
    availability: "Tue–Sat, 9:00 AM – 5:00 PM",
    languages: ["Arabic", "English", "French"],
  },
  {
    id: "maryam-fakahani",
    name: "Dr. Maryam Fakahani",
    specialty: "Diet Programs & Meal Planning",
    location: "Abi Samra, Tripoli",
    rating: 4.9,
    reviews: 214,
    price: "$50/session",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80",
    bio: "Creates structured diet programs with grocery-friendly meals and follow-up tracking for long-term results.",
    clinic: "Abi Samra Medical Center, Tripoli",
    availability: "Mon–Fri, 11:00 AM – 7:00 PM",
    languages: ["Arabic", "English"],
  },
  {
    id: "lama-jaouni",
    name: "Lama Jaouni",
    specialty: "Clinical Nutrition & Weight Management",
    location: "Hadath, Beirut",
    rating: 5.0,
    reviews: 302,
    price: "$60/session",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    bio: "Works with clinical cases and weight-management plans, combining medical nutrition therapy with realistic routines.",
    clinic: "Hadath Nutrition Clinic, Beirut",
    availability: "Sun–Thu, 12:00 PM – 8:00 PM",
    languages: ["Arabic", "English", "French"],
  },
  {
    id: "rein-salmon",
    name: "Dr. Rein Salmon",
    specialty: "Diet Follow-up & Metabolism Regulation",
    location: "Beirut, Lebanon",
    rating: 4.8,
    reviews: 176,
    price: "$55/session",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=80",
    bio: "Supports metabolism-focused follow-up plans with regular reviews of energy, sleep, and meal timing.",
    clinic: "Beirut Diet Care, Hamra",
    availability: "Mon–Wed & Fri, 9:30 AM – 4:30 PM",
    languages: ["Arabic", "English"],
  },
];
