
import Error from "@components/app/Error";
import { Header } from "@components/data/Header";
import { LoadingSkeletonData } from "@components/data/LoadingSkeletonData";
import { ResumenInfo } from "@components/data/ResumenInfo";
import { DisplaySaldo } from "@components/data/sections/DisplaySaldo";
import { Data } from "@context/types";
import { Suspense } from "react";
import { DataContext } from "src/context/data";
import { getSaldo } from "src/context/data/enpoints";

export default async function Home() {
  const data = await getSaldo() as unknown as Data[]

  return (
    <>
        <main className="grid grid-cols-1 pt-5 ">
          <Header page="Saldo" />
          <section className="px-4">
            <Suspense fallback={<LoadingSkeletonData/>}>
              <DataContext data={data}>
                <ResumenInfo />
                <DisplaySaldo/> 
              </DataContext>
            </Suspense>
          </section>
        </main>
        {/* <Error /> */}
    </>
  );
}
