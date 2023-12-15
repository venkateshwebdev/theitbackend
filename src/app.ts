import express from "express";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize-typescript";
import routes from "./routes";
import cors from "cors";
import config from "./config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: "postgres",
    host: config.host,
    port: config.port,
    models: [__dirname + "/models"],
  }
);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
