import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'
import handlebars from 'handlebars'

export default class GeneratePDF {
  async run() {
    const data = {
      name: 'Rodolfo Luis Marcos',
    }

    const templateHtml = fs.readFileSync(
      path.join(process.cwd(), 'src/invoice.html'),
      'utf8'
    )

    const template = handlebars.compile(templateHtml)
    const finalHtml = template(data)

    const options = {
      format: 'A4',
      headerTemplate: '<p></p>',
      footerTemplate: '<p></p>',
      displayHeaderFooter: false,
      margin: {
        top: '40px',
        bottom: '100px',
      },
      printBackground: true,
      path: 'invoice.pdf',
    }

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
    })

    const page = await browser.newPage()

    await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
      waitUntil: 'networkidle2',
    })

    await page.pdf(options)
    await browser.close()
  }
}
