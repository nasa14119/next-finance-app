"use client"
import { Nav } from "@components/Nav";
import { Data } from "@context/types";
import { EditForm } from "./sections/EditForm";

export function Details({data}:{data:Data}) {
  return (
    <>
      <header className="absolute md:m-5">
        <Nav />
      </header>
      <main className="h-screen w-screen overflow-hidden grid [grid-template-rows:10%_1fr] md:grid-rows-1">
        <h1 className="text-2xl capitalize flex items-center px-5 my-4 h-10 md:absolute md:right-0 md:top-1">
          <span className={`${data.type === "ingreso"? "bg-secondary/40":"bg-dager/40" } py-1 px-2 rounded-3xl`}>{data.type}</span>
        </h1>
        <div className="p-5 h-full w-full">
          <EditForm data={data}/>
        </div>
      </main>
    </>
  );
}
