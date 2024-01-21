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
  date: 'any_time' | 'f_TPR=r86400' | 'f_TPR=r604800' | 'f_TPR=r2592000'
}
