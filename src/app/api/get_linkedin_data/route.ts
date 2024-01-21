/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextResponse } from 'next/server'
import { getData } from './getData'
import { z } from 'zod'

export async function POST (req: Request): Promise<NextResponse> {
  const data = await req.json() as XMLHttpRequestBodyInit
  const validData = dataSchema.safeParse(data)
  if (validData.success) {
    const jobs = await getData(validData.data)
    return NextResponse.json(jobs)
  } else {
    return NextResponse.json(validData.error.flatten())
  }
}

const dataSchema = z.object({
  title: z.string().transform(e => e.replace(/\s+/g, '')).pipe(z.string().min(1, { message: 'Can not be empty' })
    .regex(/[a-zA-Z]/, { message: 'Only letters and numbers' })),
  location: z.string().transform(e => e.replace(/\s+/g, '')).pipe(z.string().min(1, { message: 'Can not be empty' })
    .regex(/[a-zA-Z]/, { message: 'Only letters and numbers' })),
  date: z.enum(['any_time', 'f_TPR=r86400', 'f_TPR=r604800', 'f_TPR=r2592000'])

})

export type TFormData = z.infer<typeof dataSchema>
