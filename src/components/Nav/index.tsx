"use client"
import { useState } from "react"
import "./styles.css"
const ROUTES = [
  {
    title: "Home", 
    path:"/"
  },
  {
    title: "Data", 
    path:"/data"
  },
  {
    title: "Metas", 
    path:"/metas"
  },
]
const NavMobile = () =>{
  const [isOpen, switchState] = useState(false); 
  const handleState = () => {
    switchState(prev => !prev)
  }
  return (
    <>
      <button
        type="button"
        id="toggle_nav"
        className="cursor-pointer"
        onClick={handleState}
      >
        <span className="toogle-span" data-state={isOpen}></span>
      </button>
      <ul data-state={isOpen} className="mobile">
        {ROUTES.map(({ path, title }) => (
          <li key={`mobile-nav-${title}`}>
            <a href={path}>{title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
const NavNormal = () =>{
  return (
    <>
      <ul className="flex basis-full justify-end gap-x-2 items-center w-full h-full text-base">
        {ROUTES.map(({ path, title }) => (
          <li key={`nav-${title}`} className="bg-secondary/30 px-5 py-2 rounded-2xl ">
            <a href={path}>{title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
export const Nav = () =>{
  return (<>
    <nav className="md:hidden">
      <NavMobile/>
    </nav>
    <nav className="hidden md:block">
      <NavNormal/>
    </nav>
  </>)
}