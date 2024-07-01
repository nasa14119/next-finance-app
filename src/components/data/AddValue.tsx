"use client"

import { useFormNewIngresoPage } from "@components/DataForm/useFormIngreso";
import { useRouter } from "next/navigation";

export function AddValue() {
    const [Form, handleState] = useFormNewIngresoPage()
    const { refresh } = useRouter(); 
    const handleClick = () => {
        handleState(); 
        // refresh(); 
    }
  return (
    <>
        <button onClick={handleClick} className="fixed right-20 bottom-20 rounded-full bg-blend-green p-2"><PlusIcon/></button>
        <Form/>
        {/* <Error/> */}
    </>
  )
}
function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}