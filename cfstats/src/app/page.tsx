import Link from "next/link";

import { ModeToggle } from "~/components/modeToggle";

export default function HomePage() {
  return (
   <main className="w-84 bg-black border-2 border-white">
     <ModeToggle/>
   </main>
  );
}
