import { Error } from "@components/app/Error";
import { AddValueGasto } from "@components/data/AddValueGasto";
import { Header } from "@components/data/Header";
import { LoadingSkeletonData } from "@components/data/LoadingSkeletonData";
import { DisplayNetoInfo } from "@components/data/sections/DisplayNetoInfo";
import { DataContext } from "@context/data";
import { Data } from "@context/types";
import {  getGastos } from "src/context/data/enpoints";

export default async function Home() {
  const data = await getGastos() as unknown
  return (
    <>
      <main className="grid grid-cols-1 my-5">
        <Header page="Gastos"/>
        <DataContext data={data as Data[]}>
          {typeof window && data !== null? <DisplayNetoInfo /> : <LoadingSkeletonData/> }
          <AddValueGasto/>
        </DataContext>
      </main>
      <Error/>
    </>
  );
}