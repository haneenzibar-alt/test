import Homepage from "./Homepage/page";
import LocationHealthGoal from "./components/LocationHealthGoal";
import Personalinform from "./components/Personalinform";

export default function Home() {
  return (
    <main>
      <Homepage />
      <Personalinform />
      <LocationHealthGoal />
      {/* rest of your homepage content goes here */}
    </main>
  );
}