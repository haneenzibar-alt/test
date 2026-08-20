import Homepage from "./Homepage/page";
import LocationHealthGoal from "./components/LocationHealthGoal";
import Personalinform from "./components/Personalinform";
// import GoalsForm from "./components/GoalsForm"

export default function Home() {
  return (
    <main>
      <Homepage />
      <Personalinform />
      <LocationHealthGoal />
      {/* <GoalsForm /> */}
      {/* rest of your homepage content goes here */}
    </main>
  );
}