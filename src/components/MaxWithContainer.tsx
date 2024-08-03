import React from 'react'

export default function MaxWithContainer({children, className}:{children:React.ReactNode, className?:string}) {
  return <div className={`mx-auto max-w-screen-xl h-full ${className}`}>{children}</div>;
}
