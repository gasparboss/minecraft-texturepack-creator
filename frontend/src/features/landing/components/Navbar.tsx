import RowGroup from "../../../components/RowGroup";
import NavbarItem from "./NavbarItem";
import { IconBrush, IconFolders, IconLogin2 } from "@tabler/icons-react";

interface Props {
  isScrolling: boolean;
}

export default function Navbar({ isScrolling }: Props) {
  return (
    <nav
      className={`sticky top-5 w-[70%] h-20 rounded-2xl backdrop-blur-xs border-2 border-white shadow-[0_10px_10px_rgba(0,0,0,0.25)] duration-300 ${!isScrolling ? "rotate-x-10" : ""}`}
    >
      <RowGroup variant="even" className="w-full h-full items-center">
        <NavbarItem
          to="/app"
          icon={<IconBrush stroke={2} />}
          text="New Project"
        />
        <NavbarItem
          to="/app"
          icon={<IconFolders stroke={2} />}
          text="Projects"
        />
        <NavbarItem
          to="/app"
          icon={<IconBrush stroke={2} />}
          text=""
        />
        <NavbarItem
          to="/auth/sign-in"
          icon={<IconLogin2 stroke={2} />}
          text="Sign in"
        />
      </RowGroup>
    </nav>
  );
}
