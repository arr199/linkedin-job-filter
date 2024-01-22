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
  date: 'any_time' | 'r86400' | 'r604800' | 'r2592000'
}
