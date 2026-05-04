import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from '@/lib/i18n'
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/resume/Header"
// import "@/styles/tailwind.scss";
import "../styles/globals.scss";
import "../styles/font.scss";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js 16 Feature-Based Architecture",
  description: "Production-ready Next.js 16 project with feature-based architecture",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale()
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider >
          <BrowserRouter>
            <StrictMode>
              <Header />
              {children}
            </StrictMode>
          </BrowserRouter>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
