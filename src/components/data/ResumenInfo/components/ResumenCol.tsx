"use client"
import { Data } from "@context/types";

export function ResumenCol({ data }: { data: Data[] }) {
  return (
    <div className="flex flex-col gap-y-2">
      {data.map(v => (
        <div className="flex justify-between text-sm md:text-sm max-h-full overflow-y-scroll font-thin border-b border-white/20" key={v.id}>
          <span>{v.descripcion}</span>
          <span>{v.valor}</span>
        </div>
      ))}
    </div>
  );
}
