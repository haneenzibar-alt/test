import Homepage from "./Homepage/page";
import Personalinform from "./components/Personalinform";
// import GoalsForm from "./components/GoalsForm"

export default function Home() {
  return (
    <main>
      <Homepage />
        <Personalinform />
        {/* <GoalsForm /> */}
      {/* rest of your homepage content goes here */}
    </main>
  );
}