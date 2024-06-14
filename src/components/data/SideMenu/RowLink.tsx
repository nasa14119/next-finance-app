export function RowLink({title, url, bg = "bg-primary/20"}: {title: string, url:string, bg ?: string }) {
  return (
    <>
      <a className={`cursor-pointer py-2 rounded-2xl ${bg} w-full text-center`} href={url}>{title}</a>
    </>
  )
}