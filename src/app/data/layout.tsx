import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ErrorContextProvider } from "src/context/error";
import { SideMenu } from "../../components/data/SideMenu";
import "../globals.css"
import "@assets/css/data.css"
import Error from "@components/app/Error";

const popins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finanzas App",
  description: "Generated by create next app",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icons/icon-light.svg",
        href: "/icons/icon-light.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icons/icon-dark.svg",
        href: "/icons/icon-dark.svg",
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
    <html lang="es">
      <body className={popins.className}>
        <div className="data-layout">
          <SideMenu />
          <div>
            <ErrorContextProvider>
              {children}
            </ErrorContextProvider>
          </div>
          <Error />
        </div>
      </body>
    </html>
  );
}
