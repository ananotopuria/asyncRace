import { useState } from "react";
import Nav from "./Nav";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => setMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setMenuOpen(false);
  return (
    <header className="bg-black flex justify-between p-[2rem]">
      <h1 className="font-racing text-red text-[2.6rem]">🏁  Async Race</h1>
      <div className="hidden md:flex">
        <Nav isOpen={true} onClick={handleCloseMenu} />
      </div>
      <div className="flex gap-2 md:hidden">
        <button onClick={handleToggleMenu} className="text-[2.6rem] text-yellow transition-colors duration-300 ease-in-out hover:text-blue">
          {menuOpen ? "✖" : "☰"}
        </button>
        <div className="md:hidden">
          <Nav isOpen={menuOpen} onClick={handleCloseMenu} />
        </div>
      </div>
    </header>
  );
}

export default Header;
