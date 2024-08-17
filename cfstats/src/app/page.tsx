'use client'

import Link from "next/link";

import { ModeToggle } from "~/_components/modeToggle";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ThemeProvider } from "~/_components/theme-provider";
import { useEffect, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Loading from '../_components/loading/animation';
import NavBar from "~/_components/navbar/navbar";
import { CornerDownRight } from 'lucide-react';
// import { useTheme } from "next-themes";

export default function HomePage() {

  // const { theme, setTheme, systemTheme } = useTheme()
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, [])

  // const getTheme = (): string | StaticImport => {
  //   if (!mounted) {
  //     return '';
  //   }
  //   if (theme == 'light') {
  //     return '/github-mark.svg';
  //   }
  //   return '/github-mark-white.svg'
  // }

  // if (!mounted) {
  //   return <Loading />;
  // }

  return (
    <main className="px-20">
      <NavBar />
      <h1 className="text-5xl w-5/12 pt-32">
        Explore detailed analysis about Codeforces
      </h1>
      <h2 className="text-4xl pt-12">
        Get Started
      </h2>
      <ul className="text-xl pt-8">
        <li className="pb-5 flex flex-row">
          <CornerDownRight
            className="mx-2 my-1"
          />
          <div className="hover:bg-gray-500 transition-all duration-300 ease-out px-2 py-1">
            Trends in submissions
          </div>
        </li>
        <li className="pb-5 flex flex-row items-center">
          <CornerDownRight
            className="mx-2 my-1"
          />
          <div className="hover:bg-gray-500 transition-all duration-300 ease-out px-2 py-1">
            Trends in contests
          </div>
        </li>
        <li className="flex flex-row">
          <CornerDownRight
            className="mx-2 my-1"
          />
          <div className="hover:bg-gray-500 transition-all duration-300 ease-out px-2 py-1">
            Trends in users
          </div>
        </li>
      </ul>
    </main>
  );
}
