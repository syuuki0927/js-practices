import sqlite3 from "sqlite3";
import { get, run } from "./utils/sql_functions.js";

const db = new sqlite3.Database(":memory:");

const main = async () => {
  try {
    await run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
    );
    await run(db, 'INSERT INTO books(title) VALUES ("よくわかるJavaScript")');
    const id_row = await get(db, "SELECT last_insert_rowid();");
    console.log(id_row["last_insert_rowid()"]);
    const inserted_row = await get(
      db,
      `SELECT * FROM books WHERE id = ${id_row["last_insert_rowid()"]};`,
    );
    console.log(inserted_row);
  } catch (err) {
    console.error(err);
  }
};

main();
