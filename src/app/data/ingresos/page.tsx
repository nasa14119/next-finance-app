import { Header } from "@components/data/Header";
import { LoadingSkeletonData } from "@components/data/LoadingSkeletonData";
import { DisplayNetoInfo } from "@components/data/sections/DisplayNetoInfo";
import { DataConfig } from "@context/data";
import { Suspense } from "react";
import { getAhorros } from "src/context/data/enpoints";

export default async function Home() {
  const data = await getAhorros(); 
  return (
    <>
      <main className="grid grid-cols-1 my-5">
        <Header page="Ingresos"/>
        <DataConfig>
          <Suspense fallback={<LoadingSkeletonData/>}>
            <DisplayNetoInfo data={data}/>
          </Suspense>
        </DataConfig>
      </main>
    </>
  );
}