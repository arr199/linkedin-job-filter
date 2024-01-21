import { chromium, devices } from 'playwright'
// Linkedin Card Schema

const selectors = {
  card: '.base-card',
  link: '.base-card__full-link',
  location: '.job-search-card__location',
  salary: '.job-search-card__salary-info',
  time: 'time'
}
// TODO
// HANDLE ERROR WHEN DOESNT FIND ANY JOBS
export async function getData ({ location, date, title }: Filter): Promise<Job[]> {
  const jobs = []
  try {
    const linkedin = `https://www.linkedin.com/jobs/search?keywords=${title}&location=${location}&trk=public_jobs_jobs-search-bar_search-submit&currentJobId=3798420117&position=1&pageNum=0`
    const browser = await chromium.launch()
    const context = await browser.newContext(devices['Desktop Chrome'])
    const page = await context.newPage()
    await page.goto(linkedin)
    const cards = await page.locator('.base-card').all()

    // Looping through the whole page

    for (let i = 0; i < cards.length; i++) {
      const title = (await cards[i].locator(selectors.link).textContent())?.trim() ?? ''
      const linkHref = await cards[i].locator(selectors.link).getAttribute('href')
      const location = (await cards[i].locator(selectors.location).textContent())?.trim() ?? ''
      const date = (await cards[i].locator(selectors.time).textContent())?.trim() ?? ''

      const salary = await cards[i].locator(selectors.salary).isVisible()
        ? await cards[i].locator(selectors.salary).textContent()
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
  } catch (err) {
    console.log('\n SCRAPING ERROR ->', err, '\n')
    return []
  }
  return jobs
}
