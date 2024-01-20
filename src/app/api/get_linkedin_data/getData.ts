import { chromium } from 'playwright'
// Linkedin Card Schema
export interface Job {
  title: string
  location: string
  salary: string | null
  linkHref: string | null
  date: string

}

const cardSchema = {
  card: '.base-card',
  link: '.base-card__full-link',
  location: '.job-search-card__location',
  salary: '.job-search-card__salary-info',
  time: 'time'
}

export async function getData (): Promise<Job[]> {
  const jobs = []
  try {
    const linkedin = 'https://www.linkedin.com/jobs/search?keywords=Front-End%2BDevelopment&location=european%2Bunion&trk=public_jobs_jobs-search-bar_search-submit&currentJobId=3798420117&position=1&pageNum=0'
    const browser = await chromium.launch()
    const context = await browser.newContext({ recordVideo: { dir: './' } })
    const page = await context.newPage()
    await page.goto(linkedin)
    const cards = await page.locator('.base-card').all()

    // Looping through the whole page

    for (let i = 0; i < cards.length; i++) {
      const title = (await cards[i].locator(cardSchema.link).textContent())?.trim() ?? ''
      const linkHref = await cards[i].locator(cardSchema.link).getAttribute('href')
      const location = (await cards[i].locator(cardSchema.location).textContent())?.trim() ?? ''
      const date = (await cards[i].locator(cardSchema.time).textContent())?.trim() ?? ''

      const salary = await cards[i].locator(cardSchema.salary).isVisible()
        ? await cards[i].locator(cardSchema.salary).textContent()
        : 'No salary'

      const job = { title, location, salary, linkHref, date }
      jobs.push(job)
      if (i === cards.length - 1) {
        await page.screenshot({ path: './page.png' })
      }
    }

    await cards[1].click()
    const rightJobTitle = page.locator('.top-card-layout__title')
    await rightJobTitle?.waitFor({ state: 'visible' })
    await page.screenshot({ path: './pictures/linkedin.png' })
    await browser.close()
    await context.close()
  } catch (err) {
    console.log('ERROR :', err)
  }
  return jobs
}
