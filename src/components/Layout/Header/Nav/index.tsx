import { Link } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

function Nav({ isOpen, onClick }: Props) {
  return (
    <nav
      className={`${
        isOpen ? "flex" : "hidden"
      } flex-col gap-4 absolute top-[8rem] text-[2.2rem] left-0 w-full bg-black text-yellow p-6 md:p-0 md:static md:flex md:flex-row md:gap-[2rem] md:w-auto font-bruno`}
    >
      <Link to="/" onClick={onClick} className="transition-colors duration-300 ease-in-out hover:text-blue">
        Garage
      </Link>
      <Link to="/winners" onClick={onClick} className="transition-colors duration-300 ease-in-out hover:text-blue">
        Winners
      </Link>
    </nav>
  );
}

export default Nav;