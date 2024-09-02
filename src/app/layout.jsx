// src/app/layout.jsx
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "./AppProvider";
import { ThemeToggler } from "@/components/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Door : Book your suite home",
  description: "INDIA's no.1 property rental platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
        <ThemeToggler/>
      </body>
    </html>
  );
}
