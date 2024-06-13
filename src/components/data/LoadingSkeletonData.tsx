import React from 'react'

export function LoadingSkeletonData() {
  return (
    <div className='h-full w-full  flex mt-5 items-center justify-center'>
      <div className="w-4/5 h-fit p-5 bg-text/10 rounded-[0.5rem] grid gap-y-5 grid-cols-1 place-content-center">
        <div className="bg-text/20 h-5 w-full rounded-[0.5rem] animation-loading"></div>
        <div className="bg-text/20 h-5 w-full rounded-[0.5rem] animation-loading"></div>
        <div className="bg-text/20 h-5 w-full rounded-[0.5rem] animation-loading"></div>
        <div className="bg-text/20 h-5 w-full rounded-[0.5rem] animation-loading"></div>
        <div className="bg-text/20 h-5 w-full rounded-[0.5rem] animation-loading"></div>
        <div className="bg-text/20 h-5 w-full rounded-[0.5rem] animation-loading"></div>
        <div className="bg-text/20 h-5 w-full rounded-[0.5rem] animation-loading"></div>
      </div>
    </div>
  );
}
