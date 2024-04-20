"use client"
import { GraficoCircular } from "@components/GraficoCircular"
import { AddGastoBtn } from "@components/AgregarGasto"
import { AddIngresoBtn } from "@components/AgregarIngreso"
export default function Home() {
  return <>
    <main className="flex min-h-screen flex-col items-center justify-between md:grid md:grid-cols-2">
      <section className="h-screen w-screen grid [grid-template-rows:15%_1fr] p-5 md:w-full md:h-full">
        <header className="flex flex-col items-center justify-center">
          <h1 className="text-xl text-center">Finanzas App</h1>
        </header>
        <main className=" bg-primary/20 p-2 rounded-[0.5rem] relative flex flex-col justify-end md:flex-row md:items-end md:justify-between">
          <GraficoCircular total={1800} value={1300}/> 
          <AddIngresoBtn/>
          <AddGastoBtn /> 
        </main>
      </section>
    </main>
  </>
}
