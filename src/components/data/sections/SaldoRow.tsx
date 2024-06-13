type Value = {
  id: string, 
  valor: number, 
  descripcion: string, 
  dia: number, 
  mes: number, 
  ano: number
}
export function SaldoRow({
  value,
  ingreso,
}: {
  value: Value;
  ingreso?: boolean;
}) {
  return (
    <div className={`grid grid-cols-2 md:[grid-template-columns:1fr_5rem_20%] gap-x-3 mx-2 md:ml-4 px-2 py-1 rounded-2xl ${ingreso ? "bg-accent/30":"bg-dager/30"}`}>
      <span className="col-span-2 md:col-span-1">{value.descripcion}</span>
      <span>
        {value.dia}/{value.mes}/{value.ano}
      </span>
      <span className="text-right">${value.valor}</span>
    </div>
  );
}

export default SaldoRow