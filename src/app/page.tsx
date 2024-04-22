import { GraficoCircular } from "@components/GraficoCircular"
import { AddGastoBtn } from "@components/AgregarGasto"
import { AddIngresoBtn } from "@components/AgregarIngreso"
import { Nav } from "../components/Nav"
import { AppContext } from "src/context/app"

export default async function Home() {
  return (
    <>
      <AppContext>
        <main className="flex min-h-screen flex-col items-center justify-between md:grid md:grid-cols-2 p-2 md:gap-x-2 ">
          <section className="h-screen w-screen grid [grid-template-rows:15%_1fr] grid-cols-1 p-5 md:w-full md:h-full">
            <header className="flex flex-col items-center justify-center">
              <h1 className="text-xl text-center">Resumen</h1>
            </header>
            <main className=" bg-primary/20 p-2 rounded-[0.5rem] relative flex flex-col justify-end md:flex-row md:items-end md:justify-between">
              <header className="absolute top-2 right-4 left-4 grid grid-cols-2 text-[12px] lg:text-sm text-center gap-y-2 xl:w-3/5 xl:left-auto">
                <div>Ultimo Pago 00/00/0000</div>
                <div>Siguiente Pago 00/00/0000</div>
                <div>Dias Faltantes</div>
                <div>00</div>
              </header>
              <GraficoCircular />
              <AddIngresoBtn />
              <AddGastoBtn />
            </main>
          </section>
          <section className="h-screen w-screen grid [grid-template-rows:1fr] md:[grid-template-rows:15%_1fr] p-5 md:w-full md:h-full grid-cols-1">
            <header className="md:grid hidden">
              <Nav />
            </header>
            <main className="grid grid-rows-2 grid-cols-1 *:rounded-[0.5rem] *:p-5 gap-y-2">
              <section className="bg-gradient-to-br from-accent/30 to-secondary/30">
                <h2>Ingresos</h2>
              </section>
              <section className="bg-gradient-to-r from-rose/30 to-pink/30 ">
                <h2>Gastos</h2>
              </section>
            </main>
          </section>
        </main>
      </AppContext>
    </>
  );
}
