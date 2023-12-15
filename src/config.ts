import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const db_host = String(process.env.DB_HOST);
export const db_port = Number(process.env.DB_PORT);
export const db_name = String(process.env.DB_NAME);
export const db_user = String(process.env.DB_USER);
export const db_password = String(process.env.DB_PASSWORD);

console.log("db ", db_host, db_port, db_name, db_user);

export default {
  username: db_user,
  password: db_password,
  database: db_name,
  host: db_host,
  dialect: "postgres",
  port: db_port,
};
