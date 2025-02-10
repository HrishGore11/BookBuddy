'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LibraryBig } from 'lucide-react';
import ThemeToggler from './themeToggler';

const Header = () => {
  const [header, setHeader] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const scrollYPos = window.addEventListener('scroll', () => {
      window.scrollY > 15 ? setHeader(true) : setHeader(false);
    });

    return () => window.removeEventListener('scroll', scrollYPos as any);
  });

  return (
    <header
      className={`${
        header
          ? 'py-4 bg-inherit shadow-lg dark:bg-accent'
          : 'py-4 dark:bg-transparent'
      } py-4 bg-inherit shadow-lg  sticky top-0 z-30 transition-all ${
        pathName === '/' && 'bg-white'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-3">
            <LibraryBig strokeWidth={'1.5px'} size={35} />
            <p className="text-primary text-2xl font-semibold">BookBuddy</p>
          </div>
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};

export default Header;
