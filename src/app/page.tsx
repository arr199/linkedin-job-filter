/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import JobCard from '@/components/jobCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ModeToggle } from '@/components/ui/toggle'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Loader2, MapPin } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { sendInputsData } from '@/lib/data'
import { useFilterStore } from '@/store/store'
import { RightNavbarMobile } from '@/components/rightBar/rightNavbarMobile'
import { RightNavbarDesktop } from '@/components/rightBar/rightNavbarDesktop'

export default function Home (): React.JSX.Element {
  const [selectedJob, setSelectedJob] = useState<number>(0)
  const { title, location, date, setTitle, setLocation, setDatePosted } = useFilterStore()

  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const data = { title, location, date }

      return await sendInputsData(data)
    },
    enabled: false

  })

  async function handleSubmit (e: React.FormEvent): Promise<void> {
    e.preventDefault()
    refetch().catch(err => { console.log(err) })
  }

  return (
    <main className='max-w-[1200px] mx-auto max-h-[600px]'>
      {/* SEARCH BAR */}
      <form onSubmit={async (e) => { await handleSubmit(e) }} className='mt-2 flex justify-between gap-4 '>
        {/* SEARCH PANEL */}
        <div className='relative flex flex-grow gap-12 border-[2px] shadow-xl rounded-md p-6 pb-8 border-muted-foreground self-start' >
          <div className='absolute top-4 right-4'>
            <ModeToggle ></ModeToggle>
          </div>
          {/* TITLE  */}
          <div>
            <Label className='font-semibold text-lg' >Title</Label>
            <Input value={title} onChange={(e) => { setTitle(e.target.value) } } className='mt-2' type='text' placeholder='Software developer..' ></Input>
            <p className=' mt-2 text-red-500 text-[12px] absolute'>{data?.fieldErrors?.title ? data.fieldErrors.title[0] : null}</p>
          </div>
          {/* LOCATION */}
          <div >
            <Label className='font-semibold text-lg' >Location</Label>
            <div className='relative'>
              <Input list='location-list' value={location} onChange={(e) => { setLocation(e.target.value) } } className='mt-2' type='text' placeholder='European union' ></Input>
              <MapPin className='w-5 absolute right-2 top-2 text-muted-foreground'></MapPin>
              <p className='  mt-2 text-red-500 text-[12px] absolute'> {data?.fieldErrors?.location ? data.fieldErrors.location[0] : null}</p>
            </div>
          </div>
          <div className='flex flex-col'>
            <Label className='font-semibold text-lg' >Date Posted</Label>
            <Select value={date} onValueChange={(value: 'any_time' | 'r86400' | 'r604800' | 'r2592000') => { setDatePosted(value) }} defaultValue={date} >
              <SelectTrigger className='w-40 mt-2'>
                <SelectValue placeholder="Date Posted"></SelectValue>
              </SelectTrigger>
              <SelectContent >
                <SelectItem value="any_time">Any time</SelectItem>
                <SelectItem value='r2592000'>Past month</SelectItem>
                <SelectItem value='r604800'>Past week</SelectItem>
                <SelectItem value='r86400'>Past 24 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className='mt-auto font-bold' variant={'default'} >Search</Button>
        </div>
      </form>
      {/* SEPARATOR */}
      <div className='my-5 bg-muted-foreground  rounded-lg relative '></div>
      {/* JOBS LISTS */}
      {isLoading || isFetching
        ? <div className='flex flex-col gap-10 items-center justify-center mt-20'>
          <h1 className='   text-center text-3xl '>Searching jobs ...</h1>
          <Loader2 className=' w-40 h-40 animate-spin'></Loader2>
        </div>
        : data?.length > 0
          ? <>
            <div className='flex'>
              {/* JOB LISTING */}
              <ScrollArea className='max-h-[70vh] flex flex-col  items-start max-w-md border-[2px] shadow-xl rounded-md px-6 border-muted-foreground'>
                {data?.map((job: any, index: number) => (
                  <div key={index} className={cn('w-full border-b-muted-foreground border-b pb-6  pt-6',
                    { 'border-none': index === data.length - 1 })}>
                    <JobCard onClick={() => { setSelectedJob(index) }} data={job}></JobCard>
                  </div>

                ))}

              </ScrollArea >
              {/* DETAIL PAGE */}
              <ScrollArea className='ml-10 flex  border-muted-foreground border-2 rounded-lg p-4 w-full max-h-[70vh] '>
                <div className='flex flex-col gap-32'>
                  {data[selectedJob].title}
                </div>
              </ScrollArea>
            </div>
          </>
          : data?.length === 0 ? <h1>No results</h1> : <h1>Make your first search</h1> }
          <RightNavbarMobile/>
          <RightNavbarDesktop />
    </main>
  )
}
