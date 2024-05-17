import { GraficoCircular } from "@components/GraficoCircular";
import { AddGastoBtn } from "@components/AgregarGasto";
import { AddIngresoBtn } from "@components/AgregarIngreso";
import { Nav } from "../components/Nav";
import { DiasFaltantes, ProximoPago, UltimoPago } from "./components/DisplayPagos";
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
            <header className="absolute top-2 right-4 left-4 grid grid-cols-2 text-[12px] lg:text-sm text-center gap-y-2 2xl:w-3/5 2xl:left-auto">
              <UltimoPago/>
              <ProximoPago/>
              <div className="grid place-content-center">Dias Faltantes</div>
              <DiasFaltantes/>
            </header>
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
