import { chromium, devices } from 'playwright'
import test, { expect } from 'playwright/test'

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
  date_posted_menu: '[data-tracking-control-name="public_jobs_f_TPR"]',
  date_posted_menu_submit_button: '[data-tracking-control-name="public_jobs_f_TPR"]'

}
const date = 'any_time'
const title = 'frontend'
const location = 'spain'
// TODO
// HANDLE ERROR WHEN DOESNT FIND ANY JOBS
test('testing linkeding', async () => {
  const jobs = []
  const linkedin = `https://www.linkedin.com/jobs/search?${date === 'any_time' ? '' : date}&position=1&pageNum=0&trk=public_jobs_jobs-search-bar_search-submit`

  const browser = await chromium.launch()
  const context = await browser.newContext(devices['Desktop Edge'])
  const page = await context.newPage()
  test('go to linkedin', async () => {
    await page.goto(linkedin)
  })

  //  BASE SEARCH FILTERS
  await page.locator(selectors.job_search_bar_keywords).fill(title)
  await page.locator(selectors.job_search_bar_location).fill(location)
  await page.locator(selectors.submit_search_button).click()
  await page.screenshot({ path: './pictures/1.png' })

  if (date !== 'any_time') {
    const buttons = await page.locator(selectors.date_posted_menu).all()
    await buttons[0].click()

    await page.locator(`[value="${date}"]`).click()

    const submitDateButton = await page.locator(selectors.date_posted_menu_submit_button).all()
    await submitDateButton[1].click()
  }

  if (page.url().includes('authwall')) {
    await page.goBack({ waitUntil: 'load' })
  }

  // GET RESULTS
  console.log(page.url())

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
      : 'No salary provided'

    const job = { title, location, salary, linkHref: '', date }
    jobs.push(job)
    if (i === cards.length - 1) {
      await page.screenshot({ path: `./page${i}.png` })
    }
  }
  expect(jobs).toHaveLength(25)
  await browser.close()
})
