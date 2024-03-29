import React from 'react'
import { buttonVariants } from './ui/button'
import { ArrowBigRightDash, CircleDollarSign, MapPin, Timer } from 'lucide-react'
import Link from 'next/link'

export default function JobCard ({ data, onClick }: { data: Job, onClick: any }): JSX.Element {
  return (
   <div className="flex flex-col gap-2">
      <div className='flex items-start gap-4'>
        <h1 className='text-2xl font-bold'>{data?.title}</h1>
      </div>
      <div className='flex gap-2 items-center'> <MapPin className='w-5'/> <span className='text-muted-foreground text-sm'>{data?.location}</span></div>
      <p className='flex  gap-2'><Timer className='w-5'></Timer><span>{data?.date}</span> </p>
      <p className=' flex gap-2'><CircleDollarSign className='w-5' />{data?.salary}  </p>
      <Link target='_blank' href={`https://www.linkedin.com/jobs/search/?currentJobId=${data.jobId}`} onClick={onClick} className={buttonVariants({
        variant: 'default',
        className: 'self-start px-10  mt-4 font-bold flex gap-2'
      })}>Apply

      <ArrowBigRightDash></ArrowBigRightDash>
      </Link>
   </div>
  )
}
