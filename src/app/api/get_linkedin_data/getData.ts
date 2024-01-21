import { chromium, devices } from 'playwright'

// Linkedin Element Selectors
const selectors = {
  card: '.base-card',
  link: '.base-card__full-link',
  location: '.job-search-card__location',
  salary: '.job-search-card__salary-info',
  date: 'time',
  job_search_bar_keywords: '#job-search-bar-keywords',
  job_search_bar_location: '#job-search-bar-location ',
  submit_search_button: '[data-tracking-control-name="public_jobs_jobs-search-bar_base-search-bar-search-submit"]',
  date_posted_menu: '[data-tracking-control-name="public_jobs_f_TPR"]'

}
// TODO
// HANDLE ERROR WHEN DOESNT FIND ANY JOBS
export async function getData ({ location, date, title }: Filter): Promise<Job[]> {
  const jobs = []
  console.log(location, date, title)
  try {
    const linkedin = `https://www.linkedin.com/jobs/search?${date === 'any_time' ? '' : date}&position=1&pageNum=0&trk=public_jobs_jobs-search-bar_search-submit`
    console.log(linkedin)
    const browser = await chromium.launch()
    const context = await browser.newContext(devices['Desktop Chrome'])
    const page = await context.newPage()
    await page.goto(linkedin)

    //  INPUT BASE SEARCH FILTERS
    await page.locator(selectors.job_search_bar_keywords).fill(title)
    await page.locator(selectors.job_search_bar_location).fill(location)
    await page.locator(selectors.date_posted_menu).click()
    await page.locator(selectors.submit_search_button).click()

    await page.screenshot({ path: './pictures/test.png' })
    // GET RESULTS

    const cards = await page.locator('.base-card').all()
    console.log('Cards : ', cards)

    // EXTRACTING DATA
    for (let i = 0; i < cards.length; i++) {
      const title = (await cards[i].locator(selectors.link).textContent())?.trim() ?? ''
      // const linkHref = await cards[i].locator(selectors.link).getAttribute('href') ?? ''
      const location = (await cards[i].locator(selectors.location).textContent())?.trim() ?? ''
      const date = (await cards[i].locator(selectors.date).textContent())?.trim() ?? ''
      await page.screenshot({ path: './pictures/settingSearch.png' })
      const salary = await cards[i].locator(selectors.salary).isVisible()
        ? await cards[i].locator(selectors.salary).textContent()
        : 'No salary'

      const job = { title, location, salary, linkHref: '', date }
      jobs.push(job)
      if (i === cards.length - 1) {
        await page.screenshot({ path: `./page${i}.png` })
      }
    }

    await browser.close()
  } catch (err) {
    console.log('\n SCRAPING ERROR ->', err, '\n')
    return []
  }
  return jobs
}
