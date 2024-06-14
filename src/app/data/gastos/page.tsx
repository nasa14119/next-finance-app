import { Header } from "@components/data/Header";
import { LoadingSkeletonData } from "@components/data/LoadingSkeletonData";
import { DisplayNetoInfo } from "@components/data/sections/DisplayNetoInfo";
import {  getGastos } from "src/context/data/enpoints";

export default async function Home() {
  const data = await getGastos()
  return (
    <>
      <main className="grid grid-cols-1 my-5">
        <Header page="Gastos"/>
        {data !== null ? <DisplayNetoInfo data={data}/> : <LoadingSkeletonData/> }
      </main>
    </>
  );
}