import { chromium, devices } from 'playwright'

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
  date_posted_menu_submit_button: '[data-tracking-control-name="public_jobs_f_TPR"]'

}
// TODO
// HANDLE ERROR WHEN DOESNT FIND ANY JOBS
export async function getData ({ location, date, title }: Filter): Promise<Job[]> {
  const jobs = []

  try {
    const linkedin = `https://www.linkedin.com/jobs/search?keywords=${title}&location=${location}&locationId=&f_TPR=${date}&position=1&pageNum=0`

    const browser = await chromium.launch()
    const context = await browser.newContext(devices['Desktop Chrome'])
    const page = await context.newPage()
    await page.goto(linkedin)

    //  BASE SEARCH FILTERS
    for (let i = 0; i < 50; i++) {
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
      await page.waitForTimeout(300)
    }

    const cards = await page.locator('.base-card').all()
    console.log('Cards : ', cards)

    // GET RESULTS

    // EXTRACTING DATA
    for (let i = 0; i < cards.length; i++) {
      const title = (await cards[i].locator(selectors.title).textContent()) ?? ''

      // const linkHref = await cards[i].locator(selectors.link).getAttribute('href') ?? ''
      const location = (await cards[i].locator(selectors.location).textContent())?.trim() ?? ''
      const date = (await cards[i].locator(selectors.date).textContent())?.trim() ?? ''
      const salary = await cards[i].locator(selectors.salary).isVisible()
        ? await cards[i].locator(selectors.salary).textContent()
        : 'No salary provided'

      const job = { title, location, salary, linkHref: '', date }
      jobs.push(job)
    }

    await page.screenshot({ path: './see.png' })
    await browser.close()
  } catch (err) {
    console.log('\n SCRAPING ERROR ->', err, '\n')
    return []
  }
  return jobs
}
