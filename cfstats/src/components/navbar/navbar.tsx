'use client'

import Link from "next/link";

import { ModeToggle } from "~/components/modeToggle";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function NavBar(props: { page: string }) {

  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  const getTheme = (): string | StaticImport => {
    if (!mounted) {
      return '';
    }
    if (theme == 'light') {
      return '/github-mark.svg';
    }
    return '/github-mark-white.svg'
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="px-20 w-full h-16 flex items-center justify-between">
      <div>
        <div className="font-semibold text-2xl">
          <Link href='/'>
            CFStats
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-between w-1/3">
        <div className="relative group">
          <Link href="/submissions">
            Submissions
          </Link>
          {props.page == "submissions"
            ? <span className="absolute left-[5%] bottom-0 w-[90%] h-[2px] bg-white"></span>
            : <span className="absolute left-[5%] bottom-0 w-[90%] h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          }

        </div>
        <div className="relative group">
          <Link href="/contests">
            Contests
          </Link>
          {props.page == "contests"
            ? <span className="absolute left-[5%] bottom-0 w-[90%] h-[2px] bg-white"></span>
            : <span className="absolute left-[5%] bottom-0 w-[90%] h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          }
        </div>
        <div className="relative group">
          <Link href="/users">
            Users
          </Link>
          {props.page == "users"
            ? <span className="absolute left-[5%] bottom-0 w-[90%] h-[2px] bg-white"></span>
            : <span className="absolute left-[5%] bottom-0 w-[90%] h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          }
        </div>
      </div>
      <div className="flex flex-row justify-between w-24">
        <Link
          href="https://github.com/SeaUrc/cfTracker"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={getTheme()}
            alt="Github logo"
            width={30}
            height={30}
            className="w-10 h-10 p-1 hover:opacity-70 transition-all duration-300 ease-out"
          />
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
}
