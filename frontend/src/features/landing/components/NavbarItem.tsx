import { Link } from "react-router";
import RowGroup from "../../../components/RowGroup";

interface Props {
  to: string;
  icon: React.ReactNode;
  text: string;
}

export default function NavbarItem({ to, icon, text }: Props) {
  return (
    <Link to={to}>
      <div className="px-2 py-1 rounded-xl duration-200 hover:bg-black/10">
        <RowGroup
          variant="center"
          className="w-full h-full p-2 rounded-xl text-white items-center gap-2"
        >
          <div>{icon}</div>
          <h1 className="whitespace-nowrap font-bold">{text}</h1>
        </RowGroup>
      </div>
    </Link>
  );
}
