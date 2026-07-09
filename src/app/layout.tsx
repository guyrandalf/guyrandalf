import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ExplainModeProvider } from "@/components/explain/explain-mode";
import Container from "@/components/layout/container";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Randalf Ehigiator · AI Engineer (Full-Stack)",
  description:
    "Full-stack AI engineer building production AI systems: tool-calling agents, LLM-integrated products, and on-device AI, shipped with Claude Code.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${bricolage.variable} ${geistMono.variable} font-sans antialiased`}
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
