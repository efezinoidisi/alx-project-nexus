import Header from "@/components/layout/header";
import type { Metadata } from "next";
import { Fira_Code, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leads Job Board",
  description: "Find the best Jobs or Employ the best talents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${firaCode.variable} ${montserrat.variable} relative font-montserrat`}
      >
        <Toaster position='bottom-right' duration={5000} />
        <Header />
        {children}
      </body>
    </html>
  );
}
