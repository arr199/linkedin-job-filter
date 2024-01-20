'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

const URL = 'http://localhost:3000/api/get_linkedin_data'
export default function Home (): React.JSX.Element {
  const [data, setData] = useState<any>(null)

  function handleSubmit (e: React.FormEvent): void {
    e.preventDefault()
    fetch(URL)
      .then(async data => await data.json())
      .then((data) => { setData(data) })
      .catch(err => { console.log(err) })
  }
  return (

    <main className='max-w-4xl mx-auto'>
      <h1 className='mt-10 text-4xl font-bold'>
        Find your next job
      </h1>
      <form onSubmit={handleSubmit} className='mt-12'>
        <div className='flex flex-col gap-2 items-start max-w-sm  border-[2px] shadow-xl rounded-md p-6 border-slate-400'>
          <Label className='font-semibold text-lg' >Data</Label>
          <div className=' flex  items-center gap-4'>
            <Input type='text' placeholder='Type something' ></Input>
            <Button variant={'default'} >Send Data</Button>
          </div>
        </div>
      </form>
      <div className='mt-12'>
       <Label className=' font-semibold text-lg' >Response Data</Label>
       <div className='flex flex-col gap-2 items-start max-w-sm  border-[2px] shadow-xl rounded-md p-6 border-slate-400'>
          {JSON.stringify(data)}
        </div>
      </div>
    </main>
  )
}
