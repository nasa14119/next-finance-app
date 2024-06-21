import { Details } from '@components/Details'
import { getDataFromServer } from '@components/Details/enpoints'
import { Data } from '@context/types'
import { redirect } from 'next/navigation'
import React from 'react'

async function page({searchParams: { id } } : {searchParams : {id:string}}) {
  if(!id) return redirect("/data/gastos")
  const data:Data = await getDataFromServer(`gastos/${id}`).catch(()=> redirect("/data/gastos"))
  return (
    <Details data={data}/>
  )
}

export default page