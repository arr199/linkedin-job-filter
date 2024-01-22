import { useFilterStore } from '@/store/store'
import { Info } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Cross1Icon } from '@radix-ui/react-icons'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

export function RightNavbarDesktop (): React.JSX.Element {
  return (
      <div className='w-[330px] h-full space-y-10 right-0 top-2 fixed border-[2px] shadow-xl rounded-md px-6 border-muted-foreground'>
              <div className='flex items-center gap-2 mt-4'>
                <h1 className='font-bold text-xl'>Exact Match Filters </h1>
                <InfoHoverCard></InfoHoverCard>
              </div>
              <TitleContainer />
              <DescriptionContainer />
              <LocationContainer />
          </div>
  )
}

export default function InfoHoverCard (): JSX.Element {
  return (
        <HoverCard>
            <HoverCardTrigger className='ml-auto'><Info className=' animate-pulse w-8 h-8 hover:cursor-pointer'></Info></HoverCardTrigger>
            <HoverCardContent className='text-sm '>
                This feature allow you to filter by exact keywords , for example:
                <div className='border-t border mt-2  mb-2 '></div>
                Including the keyword &quot;java&quot; in the title ensures that only LinkedIn job listings containing the &quot;java&quot; keyword in their titles will be matched.
            </HoverCardContent>
        </HoverCard>
  )
}

function TitleContainer (): React.JSX.Element {
  const [keyWord, setKeyWord] = useState('')
  const { exactTitle, setExactTitle, removeExactTitle } = useFilterStore()
  return (
        <div className='mt-4 flex flex-col gap-4'>
        <Label>Title</Label>
        <div className=' flex items-center gap-6'>
          <Input value={keyWord} onChange={(e) => { setKeyWord(e.target.value) } }></Input>
          <Button onClick={() => {
            setExactTitle(keyWord)
            setKeyWord('')
          }}>Add</Button>
        </div>

        <div className='h-32 w-full border-dashed border-2 rounded-lg p-2 flex flex-wrap gap-2 '>
         {exactTitle?.map(item => (
          <Button onClick={() => {
            removeExactTitle(item.id)
          }} key={item.id}
            className='flex gap-1'
            variant="outline">
            {item.value}
            <Cross1Icon/>
            </Button>))}
        </div>
      </div>
  )
}

function DescriptionContainer (): React.JSX.Element {
  const { exactDescription, setExactDescription, removeExactDescription } = useFilterStore()
  const [keyWord, setKeyWord] = useState('')
  return (
        <>
            <div className='mt-4 flex flex-col gap-4'>
                <Label>Description</Label>
                <div className=' flex items-center gap-6'>
                    <Input value={keyWord} onChange={(e) => { setKeyWord(e.target.value) } }></Input>
                    <Button onClick={() => { setExactDescription(keyWord) } }>Add</Button>
                </div>
            </div>
            <div className='h-32 w-full border-dashed border-2 rounded-lg p-2 flex flex-wrap gap-2 '>
             { exactDescription.map(item => (
                <Button onClick={() => {
                  removeExactDescription(item.id)
                }} key={item.id}
                    className='flex gap-1'
                    variant="outline">
                    {item.value}
                    <Cross1Icon/>
                    </Button>
             )) }
            </div>
        </>

  )
}

function LocationContainer (): React.JSX.Element {
  const { exactLocation, setExactLocation, removeExactLocation } = useFilterStore()
  const [keyWord, setKeyWord] = useState('')
  return (
          <>
              <div className='mt-4 flex flex-col gap-4'>
                  <Label>Location</Label>
                  <div className=' flex items-center gap-6'>
                      <Input value={keyWord} onChange={(e) => { setKeyWord(e.target.value) } }></Input>
                      <Button onClick={() => { setExactLocation(keyWord) } }>Add</Button>
                  </div>
              </div>
              <div className='h-32 w-full border-dashed border-2 rounded-lg p-2 flex flex-wrap gap-2 '>
               { exactLocation.map(item => (
                  <Button onClick={() => {
                    removeExactLocation(item.id)
                  }} key={item.id}
                      className='flex gap-1'
                      variant="outline">
                      {item.value}
                      <Cross1Icon/>
                      </Button>
               )) }
              </div>
          </>

  )
}
