import { Label } from '@/components/ui/label'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useFilterStore } from '@/store/store'

export default function DatePostedDropDown (): JSX.Element {
  const date = useFilterStore((state) => state.date)
  const setDatePosted = useFilterStore((state) => state.setDatePosted)

  return (
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
  )
}
