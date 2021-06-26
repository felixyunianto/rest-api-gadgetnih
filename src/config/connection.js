const connection = require("mysql");

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const db = connection.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

db.connect((error) => {
  if (error) throw error;
  console.log("Koneksi database sukses");
});

module.exports = db;
