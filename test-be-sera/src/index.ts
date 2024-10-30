/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/func-call-spacing */
import 'dotenv/config'
import express, { type Application } from 'express'
import { routes } from './routes'
import { logger } from './config/logger'
import bodyParser from 'body-parser'
import cors from 'cors'
import amqplib from 'amqplib'

// swagger
import swaggerUI from 'swagger-ui-express'
import docs from '../apidocs.json'

import deserializedToken from './middleware/deserialirizedToken'
import prisma from './config/prisma'

const app: Application = express()
const port: any = process.env.PORT ?? 3100
const swaggerUICss = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css'

// swagger config
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(docs, {
    customCss:
      '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: swaggerUICss
  })
)

// parse body request
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('./src/uploads'))

// cors access handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

app.use(deserializedToken)

routes(app)

// Function to connect to RabbitMQ
const connectToRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue('myQueue', { durable: true })

    channel.consume('myQueue', (msg: any) => {
      if (msg) {
        console.log('Received:', msg.content.toString())
        channel.ack(msg)
      }
    })
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error)
  }
}

// Connect to Prisma and log the connection status
;(async () => {
  try {
    await prisma.connect()
    logger.info('Connected to the database')
    app.listen(port, () => {
      logger.info(`Server is listening on port ${port}`)
      connectToRabbitMQ()
    })
  } catch (error) {
    console.log(error)
    logger.error('Error connecting to the database: ', error)
    process.exit(1)
  }
})()