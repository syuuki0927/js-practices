import sqlite3 from "sqlite3";
import { get, run } from "./utils/sql_functions.js";

const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
)
  .then(() => {
    return run(db, 'INSERT INTO books(title) VALUES ("よくわかるJavaScript")');
  })
  .then(() => get(db, "SELECT last_insert_rowid();"))
  .then((row) => {
    console.log(row["last_insert_rowid()"]);
    return get(
      db,
      `SELECT * FROM books WHERE id = ${row["last_insert_rowid()"]};`,
    );
  })
  .then((row) => {
    console.log(row);
  })
  .finally(() => {
    run(db, "DROP TABLE books;");
  });
