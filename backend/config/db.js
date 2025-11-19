const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Roxiler_db",   // VERY IMPORTANT
  password: "4124",
  port: 5432
});

module.exports = pool;