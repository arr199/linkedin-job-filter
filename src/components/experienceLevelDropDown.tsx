import { Checkbox } from '@/components/ui/checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import React from 'react'
import { Label } from './ui/label'
import { ChevronDown } from 'lucide-react'
import { useExperienceLevelStore } from '@/store/store'

export default function ExperienceLevelDropDown (): JSX.Element {
  const { experienceLevel, setExperienceLevel } = useExperienceLevelStore()

  return (
      <div className='flex flex-col '>
          <Label className='text-lg font-bold '>Experience Level</Label>
          <Popover>
              <PopoverTrigger className='border-[1px] rounded py-[8px] w-40 mt-2 text-sm flex  items-center justify-between px-3'>
                Experience Level
                <ChevronDown className='w-4 h-4 text-gray-500'></ChevronDown>
              </PopoverTrigger>
              <PopoverContent className='w-[230px]' >
                {
                   experienceLevel.map(({ checked, label, value }, index) => (
                    <Label
                     onKeyDown={(e) => {
                       if (e.key === 'Enter') { console.log('Hello') }
                     } } tabIndex={0} htmlFor={value} key={value}

                    className='py-2 px-4 w-full flex items-center gap-2 hover:bg-slate-100 rounded hover:cursor-pointer'>
                        <Checkbox tabIndex={500} onClick={() => { setExperienceLevel(value) }} checked={checked} id={value}></Checkbox>
                        <span className='text-sm font-normal hover:cursor-pointer ' >{label}</span>
                    </Label>
                   ))
                 }
              </PopoverContent>
          </Popover>
      </div>

  )
}
