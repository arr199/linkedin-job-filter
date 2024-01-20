export function GET (req: Request): any {
  console.log(req.body)
  return Response.json({ text: '23' })
}

export function POST (req: Request): any {
  console.log(req.body)
}
