import {NavData as Nav} from "@components/Nav"
export function Header({ page } : {page: string}) {
  return (
    <header className="px-2 md:px-0 md:mr-5 flex justify-between items-center font-extrabold">
      <h1 className="text-2xl">{page}</h1>
      <Nav />
    </header>
  );
}
