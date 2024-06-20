import { Nav } from "../components/Nav";
import { InformationSection } from "@home/sections/Information";
import Error from "@components/app/Error";
import MainDisplay from "@components/app/sections/MainDisplay";
import LoadingPageSkeleton from "@components/app/LoadingPageSkeleton";
import { AppContext } from "@context/app";

export default async function Home() {
  return (
    <>
      <AppContext>
        <main className="flex md:h-screen flex-col items-center justify-between md:grid md:grid-cols-2 p-2 md:gap-x-2 md:gap-y-0 gap-y-4 md:max-w-[1500px] md:mx-auto">
          <section className="h-screen md:h-full w-full grid [grid-template-rows:10%_1fr] grid-cols-1 p-5 md:w-full">
            <header className="flex flex-col items-center justify-center">
              <h1 className="text-xl text-center">Resumen</h1>
            </header>
            <MainDisplay/>
          </section>
          <section className="h-screen md:h-full w-full grid [grid-template-rows:1fr] md:[grid-template-rows:10%_1fr] p-5 grid-cols-1">
            <header className="absolute md:relative md:grid">
              <Nav />
            </header>
            <InformationSection/>
          </section>
        </main>
      </AppContext>
      <Error /> 
    </>
  );
}
