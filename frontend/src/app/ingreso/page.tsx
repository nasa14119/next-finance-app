import { Details } from '@components/Details'
import { getDataFromServer } from '@components/Details/enpoints'
import { Data } from '@context/types'
import { redirect } from 'next/navigation'
import React from 'react'

async function page({searchParams: { id } } : {searchParams : {id:string}}) {
  if(!id) return redirect("/data/ingresos")
  const data:Data = await getDataFromServer(`ingresos/${id}`).catch(()=> redirect("/data/ingresos"))
  return (
    <Details data={data}/>
  )
}

export default page