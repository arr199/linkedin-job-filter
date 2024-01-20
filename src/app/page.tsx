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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

export default function Home (): React.JSX.Element {
  const [selectedJob, setSelectedJob] = useState<number>(0)
  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      return await fetch(process.env.NEXT_PUBLIC_GET_LINKEDIN_DATA_ENDPOINT ?? '')
        .then(async res => await res.json())
        .then(data => data)
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
        <div className='relative flex flex-grow gap-12 border-[2px] shadow-xl rounded-md p-6 border-muted-foreground self-start' >
          <div className='absolute top-4 right-4'>
            <ModeToggle ></ModeToggle>
          </div>
          <div>
            <Label className='font-semibold text-lg' >Title</Label>
            <Input className='mt-2' type='text' placeholder='Software developer..' ></Input>
          </div>
          <div >
            <Label className='font-semibold text-lg' >Location</Label>
            <div className='relative'>
              <Input className='mt-2' type='text' placeholder='European union' ></Input>
              <MapPin className='w-5 absolute right-2 top-2 text-muted-foreground'></MapPin>
            </div>
          </div>
          <div className='flex flex-col'>
            <Label className='font-semibold text-lg' >Date Posted</Label>
            <Select defaultValue={'Any time'}>
                <SelectTrigger className='w-40 mt-2'>
                  <SelectValue placeholder="Date Posted"></SelectValue>
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="Any time">Any time</SelectItem>
                  <SelectItem value="Past month">Past month</SelectItem>
                  <SelectItem value="Past week">Past week</SelectItem>
                  <SelectItem value="Past 24 hours">Past 24 hours</SelectItem>
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

                      )) }
                       <Pagination className='mt-8'>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                    </ScrollArea >
                    {/* DETAIL PAGE */}
                    <ScrollArea className='ml-10 flex  border-muted-foreground border-2 rounded-lg p-4 w-full max-h-[70vh] '>
                        <div className='flex flex-col gap-32'>
                           {data[selectedJob].title}
                        </div>
                    </ScrollArea>
                </div>

                </>
                : <h1>Make your first Search</h1>}

    </main>
  )
}

export function HardFilters (): React.JSX.Element {
  return (
    <div className='flex flex-col w-full gap-2 items-start border-[2px] shadow-xl rounded-md p-6 border-slate-400'>
        <Label className='font-semibold text-lg' >Hard filters </Label>
          <div className='   items-center gap-4'>
            <Label className='font-semibold '>Title </Label>
            <Input type='text' placeholder='software developer..' ></Input>
          </div>
          <div className='   items-center gap-4'>
            <Label className='font-semibold '>Description </Label>
            <Input type='text' placeholder='software developer..' ></Input>
          </div>
          <div className='items-center gap-4'>
            <Label className='font-semibold '>Title </Label>
            <Input type='text' placeholder='software developer..' ></Input>
          </div>
          <div className='  items-center gap-4'>
            <Label className='font-semibold '>Title </Label>
            <Input type='text' placeholder='software developer..' ></Input>
          </div>
        </div>
  )
}
