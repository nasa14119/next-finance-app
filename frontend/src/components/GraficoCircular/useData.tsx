import { useIngresosFijosData } from "src/context/app";
export const useData = () => { 
  const serverData = useIngresosFijosData()
  return serverData === null ? {total:0, value: 0} : {total: serverData.valor, value: serverData.estado}
} 