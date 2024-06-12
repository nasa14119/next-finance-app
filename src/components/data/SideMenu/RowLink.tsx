export function RowLink({title, url}: {title: string, url:string}) {
  return (
    <>
      <a className='cursor-pointer py-2 rounded-2xl bg-primary/20 w-full text-center' href={url}>{title}</a>
    </>
  )
}