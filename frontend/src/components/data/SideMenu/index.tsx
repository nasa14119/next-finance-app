"use client"

import React from 'react'
import { RowLink } from './RowLink'
import { SideMenuMobile } from './SideMenuMobile'
import { ToggleAllMonths } from '@components/Toogle'
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
      <section className="m-5 hidden md:flex flex-col relative">
        <div className='flex flex-col gap-y-2'>
          {
            DATA_LINKS.map(data => <RowLink {...data} key={data.title}/>)
          }
        </div>
        <div className='absolute bottom-5 group flex justify-center items-center gap-x-2'>
          <ToggleAllMonths/>
          <span className='hidden group-hover:block text-xs w-fit text-[#c3c3c3]'>Show All Months</span>
        </div>
      </section>
    </>
  )
}