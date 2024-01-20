/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextResponse } from 'next/server'
import { getData } from './getData'

export async function GET (req: Request): Promise<any> {
  console.log(req.body)

  const data = await getData()
  return NextResponse.json(data)
}

export function POST (req: Request): any {
  console.log(req.body)
}
