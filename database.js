const { createPool } = require("mariadb");

/* Conexion a MySQL */
const pool = createPool({
  host: "localhost",
  port: 3306,
  user: "tegplanet",
  password: "tegplanet",
  database: "avatar_five",
  connectTimeout: 1000 * 60 * 5 /* 5 minuto */,
  acquireTimeout: 1000 * 60 * 5 /* 5 minuto */,
});

pool
  .query("SELECT 1")
  .then(() => console.log("MySQL connected successfully"))
  .catch((ex) => {
    console.log(ex);
    console.error("Database connexion error");
    process.exit(1);
  });

module.exports = pool;
