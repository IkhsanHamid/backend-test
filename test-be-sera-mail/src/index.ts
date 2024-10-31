/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/func-call-spacing */
import "dotenv/config";
import express, { type Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import amqplib from "amqplib";

const app: Application = express();
const port: any = process.env.PORT ?? 3000;

// parse body request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors access handler
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
