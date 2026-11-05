import type { Metadata } from "next";
import { Manrope, Literata } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
    description: "A little library, shared by everyone.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${fontmanrope.variable} ${fontliterata.variable} h-full antialiased`}
        >
            <body className="flex min-h-full flex-col">
                <ThemeProvider>
                    <Header />
                    <main className="flex-1 pt-20">{children}</main>
                    <Toaster richColors />
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}