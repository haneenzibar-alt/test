import type { Metadata } from "next";
import "./globals.css";
import { ProfileProvider } from "./Context/ProfileContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "FitPlate AI",
  description:
    "Build your personal nutrition plan with AI-powered, science-backed meal recommendations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ProfileProvider>
            <Navbar />
            {children}
          </ProfileProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}