type MealPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MealPage({ params }: MealPageProps) {
  const { id } = await params;

  return <main>Meal {id}</main>;
}
