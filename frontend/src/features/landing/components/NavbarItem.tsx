import { Link } from "react-router";

interface Props {
  to: string;
  icon: React.ReactNode;
  text: string;
}

export default function NavbarItem({ to, icon, text }: Props) {
  return (
    <Link to={to} className="relative">
      <div className="w-10 h-10 p-2 rounded-xl relative duration-100 hover:scale-110">
        <div className="w-full h-full p-2 rounded-xl absolute top-0 left-0 z-20 upper text-white">
          {icon}
        </div>

        <div className="w-full h-full p-2 rounded-xl absolute top-1.25 left-0 z-10 lower" />
      </div>

      <div className="absolute top-15 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-lg whitespace-nowrap">
        <h1>{text}</h1>
      </div>
    </Link>
  );
}
