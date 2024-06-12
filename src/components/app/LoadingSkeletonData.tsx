import React from 'react'

export function LoadingSkeletonData() {
  return (
    <div className="w-full h-full bg-text/10 p-5 rounded-[0.5rem] grid gap-y-5 grid-rows-2 grid-cols-1 place-content-center">
      <div className="bg-text/20 h-full w-full rounded-[0.5rem] animation-loading"></div>
      <div className="bg-text/20 h-full w-full rounded-[0.5rem] animation-loading"></div>
    </div>
  );
}
