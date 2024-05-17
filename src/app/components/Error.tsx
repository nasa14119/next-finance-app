"use client"

import { useErrorComponent } from "src/context/error"

export function Error (){
  const Component = useErrorComponent()
  return <Component />
}
export default Error; 