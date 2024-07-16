import Link from "next/link";
import NavDropDown from "./NavDropdown";
import { ModeToggle } from "./mode-toggle";

export default async function NavBar() {

    return (
        <header>
            <nav className="py-8 flex justify-between items-end">
                <Link
                    href={'/'}
                >
                    <h1 className=' text-[2rem] font-mono font-bold'>IdeaCanvas</h1>
                </Link>
                <div className="flex gap-5 justify-center items-center">
                    <NavDropDown />
                    <ModeToggle />
                </div>
            </nav>
        </header>
    )
}