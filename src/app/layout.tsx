import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Reconciliation - Démonstration | Jérôme Albrecht",
  description:
    "Une démonstration interactive du processus de réconciliation de React, créée par Jérôme Albrecht, Développeur Full Stack spécialisé en React, Next.js et TypeScript",
  keywords:
    "React, Virtual DOM, Reconciliation, DOM, JavaScript, Frontend, Demo, Tutorial, Jérôme Albrecht, Full Stack, Next.js, TypeScript, Développeur",
  authors: [
    {
      name: "Jérôme Albrecht",
      url: "https://github.com/jeromealbrecht",
    },
  ],
  creator: "Jérôme Albrecht",
  publisher: "Jérôme Albrecht",
  openGraph: {
    title: "React Reconciliation - Démonstration | Jérôme Albrecht",
    description:
      "Une démonstration interactive du processus de réconciliation de React, créée par Jérôme Albrecht, Développeur Full Stack spécialisé en React, Next.js et TypeScript",
    type: "website",
    locale: "fr_FR",
    siteName: "Portfolio de Jérôme Albrecht - Développeur Full Stack",
  },
  twitter: {
    card: "summary_large_image",
    title: "React Reconciliation - Démonstration | Jérôme Albrecht",
    description:
      "Une démonstration interactive du processus de réconciliation de React, créée par Jérôme Albrecht, Développeur Full Stack spécialisé en React, Next.js et TypeScript",
    creator: "@jeromealbrecht",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
