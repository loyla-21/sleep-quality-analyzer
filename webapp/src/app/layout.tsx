import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Menu, Moon } from "lucide-react";
import Provider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <Provider
          attribute="class"
          defaultTheme="dark"
        >
          <header className="fixed top-0 w-full dark:bg-gray-900 backdrop-blur-md z-50 border-b border-gray-100">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center space-x-2">
                  <Moon className="h-6 w-6 text-purple-600" />
                  <span className="font-bold text-xl">SleepQuality</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-8">
                  <Link href="/" className="text-gray-600 hover:text-purple-600">Home</Link>
                  <Link href="/dashboard" className="text-gray-600 hover:text-purple-600">Dashboard</Link>
                  <Link href="/features" className="text-gray-600 hover:text-purple-600">Features</Link>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                    Get Started
                  </button>
                </nav>

                <button className="md:hidden">
                  <Menu className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
          </header>
          <section>
            {children}
          </section>
        </Provider>
      </body>
    </html>
  );
}