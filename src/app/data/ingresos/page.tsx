import { Header } from "@components/data/Header";

export default async function Home() {
  return (
    <>
      <main className="grid grid-cols-1 my-5">
        <Header page="Ingresos"/>
      </main>
    </>
  );
}