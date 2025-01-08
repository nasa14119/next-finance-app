import React from 'react'

function LoadingPageSkeleton() {
  return (
    <main className='fixed inset-0 flex justify-center items-center p-5'>
      <div className='animation-loading rounded-3xl bg-text/20 max-w-[500px] max-h-[500px] aspect-[16/9] md:aspect-square size-full'></div>
    </main>
  )
}

export default LoadingPageSkeleton