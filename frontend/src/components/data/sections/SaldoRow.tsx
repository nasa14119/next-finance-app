import { Data } from "@context/types";
import { useRouter } from "next/navigation";

export function SaldoRow({
  value,
}: {
  value: Data;
}) {
  const { push } = useRouter()
  return (
    <div
     className={`cursor-pointer grid grid-cols-2 md:[grid-template-columns:1fr_5rem_20%] gap-x-3 mx-2 md:ml-4 px-2 py-1 rounded-2xl ${value.type === "ingreso" ? "bg-accent/30":"bg-dager/30"}`}
     onClick={()=> push(`/data/${value.type}s`)}
     >
      <span className="col-span-2 md:col-span-1">{value.descripcion}</span>
      <span>
        {value.dia}/{value.mes}/{value.ano}
      </span>
      <span className="text-right">${value.valor}</span>
    </div>
  );
}

export default SaldoRow