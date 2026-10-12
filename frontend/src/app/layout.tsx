import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/components/auth/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Bharat Sports Grant | Empowering Indian Athletes Through Merit-Based Scholarships",
  description:
    "National sports scholarship and athlete development platform for India. Equal opportunity, published criteria, multi-sport coverage, and controlled financial allocations.",
  keywords: [
    "Sports scholarship India",
    "Bharat sports grant",
    "Athlete development",
    "Archery scholarship",
    "Shooting scholarship",
    "Athletics funding",
    "Cricket training fund",
    "Indian sports development",
  ],
  authors: [{ name: "Bharat Sports Grant Technical Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 antialiased selection:bg-brand-500 selection:text-white">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
