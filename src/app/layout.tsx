import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const popins = Poppins({
  weight: "400", 
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Finanzas App",
  description: "Generated by create next app",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icons/icon-light.svg',
        href: '/icons/icon-light.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/icons/icon-dark.svg',
        href: '/icons/icon-dark.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={popins.className}>{children}</body>
    </html>
  );
}
