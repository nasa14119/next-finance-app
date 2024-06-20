"use client"
import { DisplayDatos } from "@components/DisplayDatos";
import { DataDisplay } from "@components/DisplayDatos/types";
import { useAhorroData, useGastosData } from "src/context/app";
import { LoadingSkeletonData } from "../LoadingSkeletonData";

export const InformationSection = () => {
  const ingresos = useAhorroData() as DataDisplay[] | null
  const gastos = useGastosData() as DataDisplay[] | null
  if(ingresos === null || gastos === null) return <LoadingSkeletonData /> 
  return (
    <main className="*:rounded-[0.5rem] *:p-2 size-full grid grid-rows-2 gap-y-2">
      <DisplayDatos type="ingresos" data={ingresos}/> 
      <DisplayDatos type="gasto" data={gastos}/> 
    </main>
  );
};
