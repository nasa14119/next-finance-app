import { Data } from "@context/types";

export function NetoRow({
  value,
}: {
  value: Data;
}) {
  return (
    <a href={`/${value.type}?id=${value.id}`} className={`hover:bg-white/30 grid grid-cols-2 md:[grid-template-columns:1fr_5rem_20%] gap-x-3 mx-2 md:ml-4 px-2 py-1 rounded-md cursor-pointer`}>
      <span className="col-span-2 md:col-span-1">{value.descripcion}</span>
      <span>
        {value.dia}/{value.mes}/{value.ano}
      </span>
      <span className="text-right">${value.valor}</span>
    </a>
  );
}
