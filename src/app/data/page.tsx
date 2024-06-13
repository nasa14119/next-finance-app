
import Error from "@components/app/Error";
import { Header } from "@components/data/Header";
import { LoadingSkeletonData } from "@components/data/LoadingSkeletonData";
import { DisplaySaldo } from "@components/data/sections/DisplaySaldo";
import { Suspense } from "react";
import { getSaldo } from "src/context/data/enpoints";

export default async function Home() {
  const data = await getSaldo()

  return (
    <>
        <main className="grid grid-cols-1 pt-5 ">
          <Header page="Saldo" />
          <Suspense fallback={<LoadingSkeletonData/>}>
            <DisplaySaldo data={data}/> 
          </Suspense>
        </main>
        <Error />
    </>
  );
}
