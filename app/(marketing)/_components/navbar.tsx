import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import NavbarButtons from "./navbar-buttons";

function Navbar() {
  return (
    <header>
      <nav className="px-8 py-4 flex justify-between">
        <div className="flex items-center gap-x-2 text-xl">
          <Image
            src="/logo.png"
            alt="logo"
            width={217}
            height={217}
            className="invert w-10 aspect-auto dark:invert-0"
          />
          Blankspace
        </div>
        <div className="flex items-center gap-x-4">
          <NavbarButtons />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
export default Navbar;
