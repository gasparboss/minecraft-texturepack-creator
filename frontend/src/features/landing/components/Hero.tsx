import { useEffect, useState } from "react";

export default function Hero() {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    window.document.addEventListener("scroll", () => setIsScrolling(true));
    window.document.addEventListener("scrollend", () => setIsScrolling(false));
  }, []);

  return (
    <div
      className="h-[90vh] w-full bg-amber-100 relative perspective-midrange flex justify-center pb-20"
      id="hero-img"
    >
      <div
        className={`sticky top-5 w-[70%] h-20 rounded-2xl backdrop-blur-xs border-2 border-white shadow-[0_10px_10px_rgba(0,0,0,0.25)] duration-300 ${isScrolling ? "" : "rotate-x-10"}`}
      ></div>
    </div>
  );
}
