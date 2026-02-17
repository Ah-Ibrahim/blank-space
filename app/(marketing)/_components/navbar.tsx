import Logo from "@/components/ui/logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import NavbarButtons from "./navbar-buttons";

function Navbar() {
  return (
    <header>
      <nav className="px-8 py-4 flex justify-between">
        <div className="flex items-center gap-x-2 ">
          <Logo className="w-8 h-8" />
          BlankSpace
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
