import RowGroup from "../../../components/RowGroup";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <RowGroup
      variant="center"
      className="h-[93vh] w-full bg-amber-100 relative perspective-midrange pb-20 items-center"
      id="hero-img"
    >
      <div>
        <h1 className="font-bold text-white text-shadow-sm text-shadow-black">
          <span className="text-6xl ">Stop thinking,</span> <br /> <span className="text-8xl">start creating.</span>
        </h1>
      </div>

      <Navbar />
    </RowGroup>
  );
}
