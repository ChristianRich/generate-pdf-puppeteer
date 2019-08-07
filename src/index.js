import 'babel-polyfill'
import express from 'express'
import path from 'path'
import GeneratePDF from './generate-pdf'

const app = express()
app.use(express.static(path.join(__dirname, 'static')))

const server = app.listen(3000, async () => {
  const generator = new GeneratePDF()
  const base64 = await generator.run()
  console.log(base64) // The base 64 string going into e.g an email attachment
  server.close()
})
