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

  // Generate the PDF as buffer
  const buffer = await generator.create({
    html,
  })

  // Get a Base64 encoded string from the buffer for email attachment
  const base64 = buffer.toString('base64')

  console.log(base64)
})()
