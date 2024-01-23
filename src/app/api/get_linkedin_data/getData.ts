/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { chromium, devices } from 'playwright'
import { type TFormData } from './route'

// Linkedin Element Selectors
const selectors = {
  card: '.base-card',
  link: '.base-card__full-link',
  title: '.base-search-card__title',
  location: '.job-search-card__location',
  salary: '.job-search-card__salary-info',
  date: 'time',
  job_search_bar_keywords: '#job-search-bar-keywords',
  job_search_bar_location: '#job-search-bar-location ',
  submit_search_button: '[data-tracking-control-name="public_jobs_jobs-search-bar_base-search-bar-search-submit"]',
  date_posted_menu: '[data-tracking-control-name="public_jobs_f_TPR"]',
  date_posted_menu_submit_button: '[data-tracking-control-name="public_jobs_f_TPR"]',
  show_more_button: '.show-more-less-html__button',
  description: '.decorated-job-posting__details'

}
// TODO
// HANDLE ERROR WHEN DOESNT FIND ANY JOBS
export async function getData ({ location, date, title, exactDescription, exactLocation, exactTitle }: TFormData): Promise<Job[]> {
  const jobs = []

  try {
    const linkedin = `https://www.linkedin.com/jobs/search?keywords=${title}&location=${location}&locationId=&f_TPR=${date}&position=1&pageNum=0`

    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext(devices['Desktop Chrome'])
    const page = await context.newPage()
    await page.goto(linkedin)

    //  BASE SEARCH FILTERS
    const seeMoreJobs = page.locator('button', { hasText: 'See more jobs' })
    const endNotification = page.locator('p', { hasText: "You've viewed all jobs for this search" })

    while (true) {
      if (await endNotification.isVisible()) break
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
      await page.waitForTimeout(100)

      if (await endNotification.isHidden() && await seeMoreJobs.isVisible()) {
        try {
          await seeMoreJobs.click()
        } catch (err) {
          console.log(err)
          break
        }
      }
    }

    const cards = await page.locator('.base-card').all()
    console.log('Cards : ', cards)

    // GET RESULTS

    // EXTRACTING DATA
    for (let i = 0; i < cards.length; i++) {
      const title = (await cards[i].locator(selectors.title).textContent()) ?? ''
      await cards[i].click()
      const jobId = page.url().split('currentJobId=')[1].split('&')[0]
      // await page.locator('button', { hasText: 'Show more' }).click()

      // const linkHref = await cards[i].locator(selectors.link).getAttribute('href') ?? ''
      const location = (await cards[i].locator(selectors.location).textContent())?.trim() ?? ''
      const date = (await cards[i].locator(selectors.date).textContent())?.trim() ?? ''
      const salary = await cards[i].locator(selectors.salary).isVisible()
        ? await cards[i].locator(selectors.salary).textContent()
        : 'No salary provided'

      const job = { title, location, salary, linkHref: '', date, jobId }
      // EXACT FILTERS

      if (exactTitle.length > 0 && !exactTitle.some(({ value }) => title.toLowerCase().includes((value).toLowerCase()))) {
        continue
      }

      jobs.push(job)
    }

    // await browser.close()
  } catch (err) {
    console.log('\n SCRAPING ERROR ->', err, '\n')
    return []
  }
  return jobs
}
