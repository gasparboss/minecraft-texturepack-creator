import { useEffect, useState } from "react";
import RowGroup from "../../../components/RowGroup";
import Navbar from "./Navbar";

export default function Hero() {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    window.document.addEventListener("scroll", () => setIsScrolling(true));
    window.document.addEventListener("scrollend", () => setIsScrolling(false));
  }, []);

  return (
    <RowGroup
      variant="center"
      className="h-[93vh] w-full bg-amber-100 relative perspective-midrange pb-20"
      id="hero-img"
    >
      <Navbar isScrolling={isScrolling} />
    </RowGroup>
  );
}
