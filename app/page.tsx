import Homepage from "./Homepage/page";
import Personalinform from "./components/Personalinform";

export default function Home() {
  return (
    <main>
      <Homepage />
        <Personalinform />
      {/* rest of your homepage content goes here */}
    </main>
  );
}