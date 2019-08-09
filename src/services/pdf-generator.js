import fs from 'fs'
import puppeteer from 'puppeteer'
import handlebars from 'handlebars'

// https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/docs/api.md#pagepdfoptions
const DEFAULT_OPTIONS = {
  format: 'A4',
  displayHeaderFooter: false,
  margin: {
    top: '40px',
    right: '40px',
    bottom: '40px',
    left: '40px',
  },
  printBackground: false,
  path: 'output.pdf',
}

export default class GeneratePDF {
  /**
   * Compiles a Handlebars HTML template
   */
  compileHTML(filePath, data) {
    const templateHtml = fs.readFileSync(filePath, 'utf8')
    const template = handlebars.compile(templateHtml)
    return template(data)
  }

  /**
   * Generates a PDF and returns a buffer
   */
  async create({ html, options = DEFAULT_OPTIONS }) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
    })

    const page = await browser.newPage()

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
      waitUntil: 'networkidle2',
    })

    const buffer = await page.pdf(options)
    await browser.close()
    return buffer
  }
}
