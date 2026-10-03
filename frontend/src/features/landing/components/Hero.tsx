import { Link } from "react-router";
import Navbar from "./Navbar";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useRoutesContext } from "../../../contexts/RoutesContext";
import Wrapper from "../../../components/Wrapper";
import { useState } from "react";
import type {
  Color,
  Face,
  Tile,
} from "../../../types/landing-preview-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import VoxelCube from "./VoxelCube";

const genIronOre = () => {
  return Array.from({ length: 16 * 16 }).map((_, i) => ({
    color: "bg-green-600",
    name: "green",
    index: i,
  }));
};

const FACES: { face: Face; label: string }[] = [
  { face: "front", label: "Front" },
  { face: "back", label: "Back" },
  { face: "left", label: "Left" },
  { face: "right", label: "Right" },
  { face: "top", label: "Top" },
  { face: "bottom", label: "Bot" },
];

const availableColors: Color[] = [
  { name: "red", color: "bg-red-600" },
  { name: "green", color: "bg-green-600" },
  { name: "blue", color: "bg-blue-600" },
  { name: "yellow", color: "bg-yellow-600" },
];

export default function Hero() {
  const [currentColor, setCurrentColor] = useState<Color>(() => ({
    name: "red",
    color: "bg-red-600",
    index: 0,
  }));

  const [tiles, setTiles] = useState<Tile>(() => ({
    front: genIronOre(),
    back: genIronOre(),
    left: genIronOre(),
    right: genIronOre(),
    top: genIronOre(),
    bottom: genIronOre(),
  }));

  // Csak az aktív oldal nevét tároljuk, a csempéket a tiles-ból olvassuk ki,
  // így a két state nem csúszhat el egymástól.
  const [currentFace, setCurrentFace] = useState<Face>("front");

  const routes = useRoutesContext();

  const handleTileColoring = (i: number) => {
    setTiles((prev) => ({
      ...prev,
      [currentFace]: prev[currentFace].map((item, index) =>
        index === i
          ? { color: currentColor.color, name: currentColor.name }
          : item,
      ),
    }));
  };

  return (
    <section
      id="hero-img"
      className="relative w-full min-h-[93vh] overflow-x-hidden bg-amber-100 perspective-midrange flex flex-col xl:flex-row items-center justify-center gap-12 xl:gap-16 px-4 sm:px-6 lg:px-10 pt-28 pb-16 xl:pb-40"
    >
      {/* Szöveg + gombok */}
      <div className="z-20 flex flex-col gap-6 sm:gap-8 w-full max-w-3xl xl:max-w-none xl:flex-1 items-center text-center xl:items-start xl:text-left">
        <h1 className="font-bold tracking-[3px] select-none text-shadow-(--primary-shadow) leading-tight">
          <span className="text-4xl sm:text-5xl lg:text-6xl text-white">
            Stop thinking,
          </span>
          <br />
          <span className="text-6xl sm:text-7xl lg:text-8xl xl:text-7xl 2xl:text-8xl text-amber-300">
            start crafting.
          </span>
        </h1>

        <p className="text-white text-base sm:text-lg max-w-xl text-shadow-sm text-shadow-black">
          Paint every block, item and mob texture pixel by pixel, watch it on a
          live 3D block, then export a ready-to-play resource pack – all in your
          browser.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">
          <Link to={routes.app} className="w-full sm:w-auto">
            <button className="w-full flex items-center justify-center gap-2 text-(--primary-text) font-bold bg-amber-300 border-3 backdrop-blur-xs px-6 sm:px-8 py-3 rounded-md cursor-pointer text-xl sm:text-2xl shadow-(--primary-shadow)">
              <span className="whitespace-nowrap">Get started</span>
              <IconArrowNarrowRight stroke={3} />
            </button>
          </Link>

          <Link to={routes.creatorHub} className="w-full sm:w-auto">
            <button className="w-full text-white font-bold bg-black/10 border-3 backdrop-blur-xs px-6 sm:px-8 py-3 rounded-md cursor-pointer text-xl sm:text-2xl shadow-(--primary-shadow)">
              <span className="whitespace-nowrap">See example packs</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Szerkesztő panel */}
      <div className="z-20 select-none w-full max-w-180 xl:max-w-160 2xl:max-w-180 shrink-0 flex flex-col gap-4 border-(--primary-text) border-5 shadow-(--primary-shadow) rounded-lg p-3 bg-(--primary-text)/50">
        <p className="text-white uppercase font-bold truncate">
          blocks/grass_block.png
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:items-start">
          {/* Oldalválasztó: mobilon vízszintes sáv, md-től függőleges oszlop */}
          <div className="flex md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-visible p-1 shrink-0">
            {FACES.map(({ face, label }) => (
              <button
                key={face}
                onClick={() => setCurrentFace(face)}
                className={`shrink-0 w-12 h-12 md:w-13 md:h-13 text-sm md:text-base flex justify-center items-center bg-black/50 text-white font-bold cursor-pointer rounded-lg outline-2 ${
                  currentFace === face ? "outline-white" : "outline-gray-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 16×16 rács: a cellák a szélességhez igazodnak */}
          <div className="w-full md:flex-1 min-w-0">
            <Wrapper>
              <div
                id="showcase-tiles"
                className="grid grid-cols-16 w-full max-w-96 aspect-square mx-auto"
              >
                {tiles[currentFace].map((item, index) => (
                  <div
                    key={index}
                    className={`w-full aspect-square border ${item.color} cursor-pointer duration-200 select-none`}
                    onClick={() => handleTileColoring(index)}
                  />
                ))}
              </div>
            </Wrapper>
          </div>

          {/* Élő előnézet + színek */}
          <div className="flex flex-col gap-4 w-full md:w-44 lg:w-52 shrink-0">
            <p className="text-white uppercase font-bold">Live preview</p>

            <div className="w-full h-56 md:h-50">
              <Canvas
                camera={{ position: [50, 40, 60], fov: 40 }}
                className="w-full h-full"
              >
                <VoxelCube tiles={tiles} />
                <OrbitControls
                  enableZoom={true}
                  autoRotate={true}
                  minDistance={30}
                  maxDistance={150}
                />
              </Canvas>
            </div>

            <div className="flex flex-col items-center gap-3 md:mt-4">
              <p className="font-bold uppercase whitespace-nowrap text-white">
                Try coloring it!
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {availableColors.map(({ name, color }, i) => (
                  <button
                    key={name}
                    aria-label={name}
                    className={`w-10 h-10 rounded-lg ${color} ${
                      i === currentColor.index
                        ? "outline-2 outline-white outline-offset-3"
                        : ""
                    } cursor-pointer`}
                    onClick={() => setCurrentColor({ name, color, index: i })}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navbar />

      <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
    </section>
  );
}
