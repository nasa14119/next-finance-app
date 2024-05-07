type Props = {
  title: string, 
  value:number, 
  dia: number, 
  mes: number, 
  ano: number,
}
export function RowData(info:Props) {
  return (
    <ul className="grid grid-rows-1 [grid-template-columns:25%_30%_1fr] text-xs md:text-base md:[grid-template-columns:1fr_25%_30%]">
      <li>{info.title}</li>
      <li className="text-center md:text-left">${info.value}</li>
      <li className="text-right flex justify-between w-full md:max-w-36 ml-auto">
        <span>fecha:</span>
        <span>{info.dia}/{info.mes}/20{info.ano}</span>
        </li>
    </ul>
  )
}