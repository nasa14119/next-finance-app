"use client"
import { AhorroData } from "@context/types";

export function ResumenCol({ data }: { data: AhorroData[] }) {
  return (
    <div className="flex flex-col">
      {data.map((v, i) => (
        <div className="flex justify-between text-xs md:text-sm max-h-full overflow-y-scroll" key={i}>
          <span>{v.descripcion}</span>
          <span>{v.valor}</span>
        </div>
      ))}
    </div>
  );
}
