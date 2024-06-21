import { Data } from "@context/types";

export const getDataFromServer = async (url: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/${url}`); 
  if(res.status !== 200) throw null; 
  return await res.json(); 
}

export const sendEditedData = async (url: string, body: Data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/${url}`, {
    body: JSON.stringify(body), 
    method: "PUT", 
  }); 
  if(res.status !== 200) throw null; 
  return await res.json(); 
}