//db.js untuk membuat koneksi ke database

import mysql from "mysql";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_manpro",
});
 


export default pool;