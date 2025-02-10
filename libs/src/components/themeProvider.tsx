'use client';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
const ThemeProvider = ({ children, ...props }: any) => {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
};

export default ThemeProvider;
