'use client'

import NavBar from "~/components/navbar/navbar";
import { CornerDownRight } from 'lucide-react';
import '../components/loading/animation.css';
import Link from "next/link";

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
    <main className="">
      <NavBar page="home" />
      <div className="flex flex-row px-20">
        <div>
          <h1 className="text-5xl w-7/12 pt-32 font-medium">
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
              <Link href="/submissions">
                <div className="hover:bg-gray-500 transition-all duration-300 ease-out px-2 py-1 rounded-md">
                  Trends in submissions
                </div>
              </Link>
            </li>
            <li className="pb-5 flex flex-row items-center">
              <CornerDownRight
                className="mx-2 my-1"
              />
              <Link href="/contests">
                <div className="hover:bg-gray-500 transition-all duration-300 ease-out px-2 py-1 rounded-md">
                  Trends in contests
                </div>
              </Link>
            </li>
            <li className="flex flex-row">
              <CornerDownRight
                className="mx-2 my-1"
              />
              <Link href="/users">
                <div className="hover:bg-gray-500 transition-all duration-300 ease-out px-2 py-1 rounded-md">
                  Trends in users
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="loader mt-80">

          </div>
        </div>
      </div>
    </main>
  );
}
