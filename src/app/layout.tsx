import type { Metadata } from "next";
import "./globals.css";
import { Providers } from '@/lib/providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export const metadata: Metadata = {
  title: "Modern News Portal",
  description: "Stay updated with the latest news from around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        <Providers>
          <ErrorBoundary>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
