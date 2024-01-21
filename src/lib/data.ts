import { type TFormData } from '@/app/api/get_linkedin_data/route'

export async function sendInputsData (formData: TFormData): Promise<any> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GET_LINKEDIN_DATA_ENDPOINT ?? '',
      { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) })
    const data = await res.json()
    return data
  } catch (err) {
    throw new Error('Could not send the data to the server')
  }
}
