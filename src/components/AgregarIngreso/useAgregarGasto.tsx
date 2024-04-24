import { useAhorroMethods } from "src/context/app"

export const useAgregarGasto = (): ()=> void => {
  const methods = useAhorroMethods(); 
  return () => undefined
}