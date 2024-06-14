import React from 'react'
import { RowLink } from './RowLink'
import { SideMenuMobile } from './SideMenuMobile'
export const DATA_LINKS = [
  {
    title: "Saldo", 
    url: "/data"
  },
  {
    title: "Ingresos", 
    url: "/data/ingresos"
  },
  {
    title: "Gastos", 
    url: "/data/gastos"
  }
]
export function SideMenu() {
  return (
    <>
      <SideMenuMobile/>
      <section className="m-5 hidden md:flex flex-col">
        <div className='flex flex-col gap-y-2'>
          {
            DATA_LINKS.map(data => <RowLink {...data} key={data.title}/>)
          }
        </div>
      </section>
    </>
  )
}