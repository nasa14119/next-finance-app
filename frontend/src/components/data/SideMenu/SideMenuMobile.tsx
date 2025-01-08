"use client"
import { useRef, useState } from "react"
import { DATA_LINKS } from "."
import { RowLink } from "./RowLink"
import { ToggleAllMonths } from "@components/Toogle"
const NavLinks = [
  {
    title: "Home", 
    url: "/"
  }, 
  {
    title: "Metas", 
    url: "/metas"
  }, 
]
export function SideMenuMobile() {
  const container = useRef<HTMLDivElement | null>(null); 
  const [isOpen, setState] = useState(false);
  const handleClick = () => {
    setState(prev => {
      const newState = !prev; 
      if(newState){
        container.current && (container.current.style.transform = "translateX(0)")
      }else{
        container.current && (container.current.style.transform = "translateX(100%)")
      }
      return newState
    })
  }
  return (
    <>
      {!isOpen && (
        <button
          className="*:pointer-events-none md:hidden fixed top-5 right-2 p-2 h-10 w-10 rounded-full bg-blend-green"
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      )}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={handleClick}></div>
      )}
      <section
        className="bg-black p-5 gap-y-4 z-50 flex flex-col md:hidden fixed inset-y-0 right-0 w-3/4  rounded-l-2xl translate-x-full transition-transform duration-[400ms] ease-out"
        ref={container}
      > 
        {NavLinks.map((data) => (
          <RowLink {...data} key={data.title} bg="bg-yellow/40"/>
        ))}
        {DATA_LINKS.map((data) => (
          <RowLink {...data} key={data.title} bg="bg-[#599fa9]/40"/>
        ))}
        <ToggleAllMonths className="absolute bottom-5 right-2"/>
      </section>
    </>
  );
}
