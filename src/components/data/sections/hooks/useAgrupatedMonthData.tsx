import { useMemo } from "react";
import { AhorroData } from "src/context/types"
import { getStringMonth, groupBy, sortByMonth } from "src/utils";
export interface AgrupedDataValue extends AhorroData{
  ingreso?: boolean, 
}

export const useAgrupatedMonthData = (data:AgrupedDataValue[]):[string, AgrupedDataValue[]][] => {
  return useMemo(
    () => {
      //@ts-ignore
      const grupedByMonth = groupBy(sortByMonth(data), (data) => getStringMonth(data.mes))
      const arrayOfValues = Object.entries(grupedByMonth) 
      return arrayOfValues as [string, AgrupedDataValue[]][]
    },
    [data]
  );
}
