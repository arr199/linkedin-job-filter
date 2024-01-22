import { buttonVariants } from '../ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet'
import React from 'react'

export function RightNavbarMobile (): React.JSX.Element {
  return (
      <div className='hidden'>
      <Sheet>
        <SheetTrigger
        className={buttonVariants({ className: 'p-6 fixed w-32 text-lg h-20 inset-0 my-auto ml-auto mr-5 font-semibold' })}>
          More filters
          </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}
