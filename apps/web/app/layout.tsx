import type { Metadata } from "next";
import "./globals.css";
import { fonts } from "@/fonts";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { EventCategoryProvider } from "@/contexts/event-category-context";
import Header from "../components/marginals/navbar";
import Footer from "../components/marginals/footer";
import HOC from "@/components/hoc";
import { AudioProvider } from "@/contexts/audio-context";
import { generateDefaultMetadata } from "@/config/seo";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = generateDefaultMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#1A0D51" />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      <body className={`${fonts}`}>
        <AuthProvider>
          <EventCategoryProvider>
            <AudioProvider>
              <HOC>
                <Header />
                {children}
                <Footer />
              </HOC>
            </AudioProvider>

            <Toaster
              position="top-right"
              richColors
              toastOptions={{
                style: {
                  background: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(9.25px)",
                  border: "2px solid rgba(255, 255, 255, 0.4)",
                  borderRadius: "13px",
                  color: "#fff",
                  fontFamily: "var(--font-inria)",
                  fontWeight: "500",
                },
                className: "font-inria",
              }}
            />
          </EventCategoryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
