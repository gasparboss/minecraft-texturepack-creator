import { useMediaQuery } from "react-responsive";
import RowGroup from "../../../components/RowGroup";
import NavbarItem from "./NavbarItem";
import {
  IconBrush,
  IconFolders,
  IconLogin2,
  IconPalette,
} from "@tabler/icons-react";

export default function Navbar() {
  const breakpoint = useMediaQuery({ maxWidth: 1279 });

  return (
    <nav
      className={`bg-black/10 ${breakpoint ? "static h-fit" : "absolute h-20"} z-20 bottom-25 w-[70%] rounded-2xl backdrop-blur-xs border-2 border-white shadow-(--primary-shadow) duration-300 rotate-x-10`}
    >
      <RowGroup variant="even" className="w-full h-full items-center flex-wrap">
        <NavbarItem
          to="/app"
          icon={<IconPalette stroke={2} />}
          text="New Project"
        />
        <NavbarItem
          to="/app"
          icon={<IconFolders stroke={2} />}
          text="Projects"
        />
        <NavbarItem to="/app" icon={<IconBrush stroke={2} />} text="Valami" />
        <NavbarItem
          to="/auth/sign-in"
          icon={<IconLogin2 stroke={2} />}
          text="Sign in"
        />
      </RowGroup>
    </nav>
  );
}
