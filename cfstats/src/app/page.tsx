'use client'

import Link from "next/link";

import { ModeToggle } from "~/components/modeToggle";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ThemeProvider } from "~/components/theme-provider";
import { useEffect, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Loading from '../components/loading/animation';
// import { useTheme } from "next-themes";

export default function HomePage() {

  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  const getTheme = (): string|StaticImport => {
    if (!mounted){
      return '';
    }
    if (theme == 'light'){
      return '/github-mark.svg';
    }
    return '/github-mark-white.svg'
  }

  if (!mounted){
    return <Loading/>;
  }

  return (
    <main className="">
      <div className="w-full h-16 flex items-center justify-between px-5">
        <div>
          <div className="font-semibold text-xl">
            CFStats
          </div>
        </div>
        <div className="flex flex-row justify-between w-1/3">
          <div>
            Submissions
          </div>
          <div>
            Contests
          </div>
          <div>
            Users
          </div>
        </div>
        <div className="flex flex-row justify-between w-24">
          <Image
            src={getTheme()}
            alt="Github logo"
            width={30}
            height={30}
            className="w-10 h-10 p-1"
          />
          <ModeToggle />
        </div>
      </div>
    </main>
  );
}
