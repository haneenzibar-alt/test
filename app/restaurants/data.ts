export type RestaurantMenuItem = {
  id: string;
  name: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  price: number | null;
};

export type Restaurant = {
  id: string;
  name: string;
  country: string | null;
  cuisine: string | null;
  address: string | null;
  rating: number | null;
  imageUrl: string | null;
  menuItems: RestaurantMenuItem[];
};
