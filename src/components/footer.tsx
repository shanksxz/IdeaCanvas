import { GitBranchPlus, GithubIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";


export default function Footer() {
    return (
        <footer className="py-4">
            <div className="flex justify-between items-center">
                <GithubIcon width={30} height={30} />
                <ModeToggle />
            </div>
        </footer>
    )
}