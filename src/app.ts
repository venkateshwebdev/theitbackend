import express from "express";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize-typescript";
import routes from "./routes";
import cors from "cors";
import config from "./config";
import { getDialectOptions } from "./utils";

// create an express app.
const app = express();
const PORT = process.env.PORT || 3000;

// use cors, parser
app.use(cors());
app.use(bodyParser.json());

// attatch all routes.
app.use("/api", routes);

// create a sequelize instance that connects to the database url.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: "postgres",
    host: config.host,
    port: config.port,
    ...getDialectOptions(), // set options based on prod/ dev envs.
    models: [__dirname + "/models"], // stitch all models.
  }
);

// after the database loads, initiate the express server.
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
