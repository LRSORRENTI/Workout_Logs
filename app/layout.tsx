import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "../components/theme-providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Workout Logs',
  description: 'Track your daily workouts and exercises',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Link to favicon.ico in the public folder */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster /> {/* Include the Toaster component here */}
        </ThemeProvider>
      </body>
    </html>
  );
}
