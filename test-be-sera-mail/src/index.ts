/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/func-call-spacing */
import 'dotenv/config'
import express, { type Application } from 'express'
import { routes } from './routes'
import bodyParser from 'body-parser'
import cors from 'cors'
import amqplib from 'amqplib';

const app: Application = express()
const port: any = process.env.PORT ?? 3000


// parse body request
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// cors access handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

routes(app)

// Function to connect to RabbitMQ
const connectToRabbitMQ = async () => {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue('myQueue', { durable: true });

        channel.consume('myQueue', (msg: any) => {
            if (msg) {
                console.log('Received:', msg.content.toString());
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
};

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectToRabbitMQ();
});
