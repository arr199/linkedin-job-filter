import { NextResponse } from 'next/server'

export function GET (req: Request): any {
  console.log(req.body)
  return NextResponse.json({ text: '23' })
}

export function POST (req: Request): any {
  console.log(req.body)
}
