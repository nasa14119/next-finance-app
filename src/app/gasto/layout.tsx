import "../globals.css"
import "@assets/css/data.css"
import Error from "@components/app/Error";
import { ErrorContextProvider } from "@context/error";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <ErrorContextProvider>
        {children}
      </ErrorContextProvider>
      <Error/>
    </section>
  );
}
