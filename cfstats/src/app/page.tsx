'use client'

import NavBar from "~/_components/navbar/navbar";
import { CornerDownRight } from 'lucide-react';
import '../_components/loading/animation.css';

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
      <div className="flex flex-row">
        <div>
          <h1 className="text-5xl w-7/12 pt-32">
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
              <div className="hover:bg-gray-500 transition-all duration-300 ease-out px-2 py-1 rounded-md">
                Trends in submissions
              </div>
            </li>
            <li className="pb-5 flex flex-row items-center">
              <CornerDownRight
                className="mx-2 my-1"
              />
              <div className="hover:bg-gray-500 transition-all duration-300 ease-out px-2 py-1 rounded-md">
                Trends in contests
              </div>
            </li>
            <li className="flex flex-row">
              <CornerDownRight
                className="mx-2 my-1"
              />
              <div className="hover:bg-gray-500 transition-all duration-300 ease-out px-2 py-1 rounded-md">
                Trends in users
              </div>
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
