import { GraficoCircular } from "@components/GraficoCircular";
import { AddGastoBtn } from "@components/AgregarGasto";
import { AddIngresoBtn } from "@components/AgregarIngreso";
import { Nav } from "../components/Nav";
import { DisplayPagos } from "./components/DisplayPagos";
import { InformationSection } from "./sections/Information";
import Error from "src/app/components/Error";

export default async function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between md:grid md:grid-cols-2 p-2 md:gap-x-2 ">
        <section className="h-screen w-screen grid [grid-template-rows:15vh_85vh] grid-cols-1 p-5 md:w-full md:h-full">
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
        <section className="h-screen w-screen grid [grid-template-rows:1fr] md:[grid-template-rows:15vh_85vh] p-5 md:w-full md:h-full grid-cols-1">
          <header className="md:grid hidden">
            <Nav />
          </header>
          <InformationSection/> 
        </section>
      </main>
      <Error /> 
    </>
  );
}
