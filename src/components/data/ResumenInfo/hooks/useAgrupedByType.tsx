import { useDataDB } from "@context/data"
import { AhorroData } from "@context/types";
import moment from "moment";
import { groupBy } from "src/utils";
const month = moment().get("M") + 1
type ReturnedObejct = {
  ingresos: AhorroData[], 
  gastos: AhorroData[]
} 
export const useAgrupedByType = () : ReturnedObejct=> {
  const data = useDataDB()
  const filterThisMonth = data.filter(v => v.mes === month)
  const agrupedData = groupBy(filterThisMonth, (value:any) => value.ingreso ? "ingresos" : "gastos")
  return agrupedData
}

