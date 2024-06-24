"use client"
import { Nav } from "@components/Nav";
import { Data } from "@context/types";
import { EditForm } from "./sections/EditForm";
import { useRouter } from "next/navigation";

export function Details({data}:{data:Data}) {
  const { push } = useRouter()
  return (
    <>
      <header className="absolute md:m-5">
        <Nav />
      </header>
      <main className="h-screen w-screen overflow-hidden grid [grid-template-rows:10%_1fr] md:grid-rows-1">
        <h1 className="text-2xl capitalize flex items-center px-5 my-4 h-10 md:absolute md:right-0 md:top-1 cursor-pointer">
          <span className={`${data.type === "ingreso"? "bg-secondary/40":"bg-dager/40" } py-1 px-2 rounded-3xl`} onClick={() => push(`/data/${data.type}s`)}>{data.type}</span>
        </h1>
        <div className="p-5 h-full w-full">
          <EditForm data={data}/>
        </div>
      </main>
    </>
  );
}
