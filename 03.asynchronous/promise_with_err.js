import sqlite3 from "sqlite3";
import { get, run } from "./utils/sql_functions.js";

const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
)
  .then(() => {
    return run(db, "INSERT INTO books(title) VALUES (null)");
  })
  .then(() => get(db, "SELECT last_insert_rowid();"))
  .catch((e) => {
    if (e.errno === sqlite3.CONSTRAINT) {
      console.error(e);
    }
  })
  .then(() => {
    return run(db, 'INSERT INTO books(title) VALUES ("よくわかるJavascript")');
  })
  .then(() => get(db, "SELECT last_insert_rowid();"))
  .then(() => get(db, "SELECT memo FROM books;"))
  .catch((e) => {
    if (e.errno === sqlite3.ERROR) {
      console.log(e);
    }
  })
  .finally(() => run(db, "DROP TABLE books;"));
