
import Error from "@components/app/Error";
import { Header } from "@components/data/Header";
const getAhorros = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/ingreso`, {
    headers: {
      "Content-Type": "application/json"
    }, 
    method: "GET"
  })
  return await res.json()
}
export default async function Home() {
  const data = await getAhorros()

  return (
    <>
      <main className="grid grid-cols-1 my-5">
        <Header page="Saldo"/>
      </main>
      <Error /> 
    </>
  );
}
