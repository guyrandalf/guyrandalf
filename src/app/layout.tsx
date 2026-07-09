import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import ThemeProvider from "@/components/theme-provider";
import { ExplainModeProvider } from "@/components/explain/explain-mode";
import Container from "@/components/layout/container";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guy Randalf — AI Engineer (Full-Stack)",
  description:
    "Full-stack AI engineer building production AI systems: RAG, agents, and LLM-integrated products, shipped with Claude Code.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ExplainModeProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                <Container>{children}</Container>
              </main>
              <Footer />
            </div>
            <Toaster />
          </ExplainModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
