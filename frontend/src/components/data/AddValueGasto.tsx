"use client"
import { useFormNewGastoPage } from "@components/DataForm/useFormGasto";

export function AddValueGasto() {
    const [Form, handleState] = useFormNewGastoPage(); 
    const handleClick = () => {
      handleState();
    };
  return (
    <>
        <button onClick={handleClick} className="fixed right-10 bottom-7 rounded-full bg-dager/30 p-2"><PlusIcon/></button>
        <Form/>
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