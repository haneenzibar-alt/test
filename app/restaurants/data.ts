export type MenuItem = {
  name: string;
  calories: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  delivery: boolean;
  pickup: boolean;
  deliveryTime: string;
  calories: string;
  price: string;
  fitPlanTag: boolean;
  tags: string[];
  description: string;
  image: string;
  menu: MenuItem[];
};

export const restaurants: Restaurant[] = [
  {
    id: "makan-bowl",
    name: "Makan Bowl",
    cuisine: "Mediterranean Fusion",
    location: "Hamra, Beirut",
    rating: 4.8,
    delivery: true,
    pickup: true,
    deliveryTime: "25–35 min",
    calories: "350–550 kcal",
    price: "$$",
    fitPlanTag: true,
    tags: ["Gluten-Free Options", "High Protein", "Vegan Friendly"],
    description:
      "Fresh grain bowls, grilled proteins, and bright Mediterranean sides matched to your daily macros.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    menu: [
      { name: "Lemon Herb Chicken Bowl", calories: "480 kcal" },
      { name: "Falafel Hummus Plate", calories: "420 kcal" },
      { name: "Salmon Quinoa Bowl", calories: "530 kcal" },
    ],
  },
  {
    id: "nour-kitchen",
    name: "Nour Kitchen",
    cuisine: "Lebanese Healthy",
    location: "Gemmayzeh, Beirut",
    rating: 4.9,
    delivery: true,
    pickup: true,
    deliveryTime: "20–30 min",
    calories: "280–480 kcal",
    price: "$$",
    fitPlanTag: true,
    tags: ["Traditional", "Dairy-Free Options", "Low-Sodium"],
    description:
      "Home-style Lebanese plates made lighter, with grilled meats, herbs, and balanced sides.",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    menu: [
      { name: "Grilled Chicken Tawook", calories: "390 kcal" },
      { name: "Baked Kibbeh Plate", calories: "450 kcal" },
      { name: "Fattoush with Grilled Halloumi", calories: "360 kcal" },
    ],
  },
  {
    id: "protein-lab",
    name: "The Protein Lab",
    cuisine: "Health & Fitness",
    location: "Achrafieh, Beirut",
    rating: 4.7,
    delivery: true,
    pickup: false,
    deliveryTime: "30–45 min",
    calories: "400–600 kcal",
    price: "$$$",
    fitPlanTag: true,
    tags: ["High Protein", "Meal Prep", "Post-Workout"],
    description:
      "High-protein meals built for training days, with clear calorie and macro labels.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
    menu: [
      { name: "Steak Power Plate", calories: "580 kcal" },
      { name: "Turkey Rice Bowl", calories: "510 kcal" },
      { name: "Egg White Omelette Box", calories: "400 kcal" },
    ],
  },
  {
    id: "green-route",
    name: "Green Route Café",
    cuisine: "Vegan & Plant-Based",
    location: "Mar Mikhael, Beirut",
    rating: 4.6,
    delivery: true,
    pickup: true,
    deliveryTime: "20–35 min",
    calories: "180–380 kcal",
    price: "$$",
    fitPlanTag: false,
    tags: ["Vegan", "Organic", "Low Calorie", "Nut-Free"],
    description:
      "Plant-based café plates and juices. Light, colorful, and easy on calories.",
    image:
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1200&q=80",
    menu: [
      { name: "Rainbow Buddha Bowl", calories: "320 kcal" },
      { name: "Avocado Toast Plate", calories: "280 kcal" },
      { name: "Green Detox Soup", calories: "190 kcal" },
    ],
  },
];
