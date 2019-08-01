import 'babel-polyfill'
import express from 'express'
import path from 'path'
import GeneratePDF from './generate-pdf'

const app = express()
app.use(express.static(path.join(__dirname, 'static')))

const server = app.listen(3000, async () => {
  const generator = new GeneratePDF()
  await generator.run()
  server.close()
})
