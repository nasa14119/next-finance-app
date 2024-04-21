import { useEffect, useState } from "react"
import { getData } from "src/app/actions";
export const useData = () => { 
  const [ info , setState] = useState<{total:number, value:number}>({total: 0, value: 0});
  useEffect(() => {
    const data = getData(); 
    data.then((v) => setState(v))
  },[])
  return info
} 