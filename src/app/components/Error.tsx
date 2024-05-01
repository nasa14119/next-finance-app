"use client"

import { useErrorComponent } from "src/context/app"

export function Error (){
  const Component= useErrorComponent() as any; 
  return <Component />
}
export default Error; 