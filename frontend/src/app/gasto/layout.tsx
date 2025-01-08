import "../globals.css"
import "@assets/css/data.css"
import { ErrorContextProvider } from "@context/error";
import { revalidatePath } from "next/cache";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  revalidatePath("/", "layout")
  return (
    <section>
      <ErrorContextProvider>
        {children}
      </ErrorContextProvider>
    </section>
  );
}
