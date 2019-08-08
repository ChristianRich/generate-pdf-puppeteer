import 'babel-polyfill'
import PDFGenerator from './services/pdf-generator'
import path from 'path'
;(async () => {
  const generator = new PDFGenerator()

  // Compile a Handlebars HTML template
  const html = generator.compileHTML(
    path.join(process.cwd(), 'static/invoice.html'),
    {
      name: 'Rodolfo Luis Marcos',
    }
  )

  // Generate a PDF as buffer using the HTML template
  const buffer = await generator.create({
    html,
  })

  // Convert the buffer the base64 for email attachment
  const base64 = buffer.toString('base64')

  console.log(base64)
})()
