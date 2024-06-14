import { GraficoCircular } from "@components/GraficoCircular";
import { AddGastoBtn } from "@components/AgregarGasto";
import { AddIngresoBtn } from "@components/AgregarIngreso";
import { Nav } from "../components/Nav";
import { DisplayPagos } from "@home/DisplayPagos";
import { InformationSection } from "@home/sections/Information";
import Error from "@components/app/Error";

export default async function Home() {
  return (
    <>
      <main className="flex md:h-screen flex-col items-center justify-between md:grid md:grid-cols-2 p-2 md:gap-x-2 md:gap-y-0 gap-y-4">
        <section className="h-screen md:h-full w-full grid [grid-template-rows:10%_1fr] grid-cols-1 p-5 md:w-full">
          <header className="flex flex-col items-center justify-center">
            <h1 className="text-xl text-center">Resumen</h1>
          </header>
          <main className=" bg-primary/20 p-2 rounded-[0.5rem] relative flex flex-col justify-end md:flex-row md:items-end md:justify-between">
            <DisplayPagos />
            <GraficoCircular />
            <AddIngresoBtn />
            <AddGastoBtn />
          </main>
        </section>
        <section className="h-screen md:h-full w-full grid [grid-template-rows:1fr] md:[grid-template-rows:10%_1fr] p-5 grid-cols-1">
          <header className="absolute md:relative md:grid">
            <Nav />
          </header>
          <InformationSection/> 
        </section>
      </main>
      <Error /> 
    </>
  );
}
