import pg from "pg";
import "./setup.js";
console.log(process.env.DATABASE_URL)

const { Pool } = pg;

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default connection;
