import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EmergencySOS from "@/components/EmergencySOS";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mental Support - Professional Counseling Services",
  description: "A safe space for mental health support. Connect with professional counselors for depression, anxiety, and stress management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <Navigation />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
          <EmergencySOS />
        </AuthProvider>
      </body>
    </html>
  );
}
