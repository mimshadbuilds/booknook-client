import type { Metadata } from "next";
import { Manrope, Literata } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const fontmanrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const fontliterata = Literata({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-literata",
});

export const metadata: Metadata = {
  title: "BookNook",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontmanrope.variable} ${fontliterata.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <Header />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
      </body>
    </html>
  );
}
