interface Job {
  title: string
  location: string
  salary: string | null
  linkHref: string | null
  date: string

}
interface Filter {
  title: string
  location: string
  date: 'any_time' | 'past_month' | 'past_week' | 'past_24_hours'
}
