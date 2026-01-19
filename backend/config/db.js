const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = connectionString
  ? new Pool({ connectionString })
  : new Pool({
      user: process.env.PGUSER || "postgres",
      host: process.env.PGHOST || "localhost",
      database: process.env.PGDATABASE || "Roxiler_db",
      password: process.env.PGPASSWORD || "4124",
      port: Number.parseInt(process.env.PGPORT || "5432", 10),
    });

module.exports = pool;