import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'
import handlebars from 'handlebars'
import express from 'express'

const DEFAULT_OPTIONS = {
  format: 'A4',
  headerTemplate: '<p></p>',
  footerTemplate: '<p></p>',
  displayHeaderFooter: false,
  margin: {
    top: '40px',
    bottom: '100px',
  },
  printBackground: true,
}

const DEFAULT_STATIC_PATH = path.join(__dirname, '../static')

export default class GeneratePDF {
  /**
   * Serves up static assets for the PDF. Puppeteer does not support local file paths.
   */
  async startServer(staticPath) {
    return new Promise(resolve => {
      const app = express()
      app.use(express.static(staticPath))
      const server = app.listen(3000, async () => resolve(server))
    })
  }

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
  async create({
    html,
    options = DEFAULT_OPTIONS,
    staticPath = DEFAULT_STATIC_PATH,
  }) {
    const server = await this.startServer(staticPath)

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
    server.close()

    return buffer
  }
}
