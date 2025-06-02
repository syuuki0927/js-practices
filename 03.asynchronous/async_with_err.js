import sqlite3 from "sqlite3";
import { get, run } from "./utils/sql_functions.js";
const db = new sqlite3.Database(":memory:");

const main = async () => {
  try {
    await run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
    );
    try {
      await run(db, "INSERT INTO books(title) VALUES (null)");
      const id_row = await get(db, "SELECT last_insert_rowid();");
      console.log(id_row["last_insert_rowid()"]);
    } catch (err) {
      console.error(err);
    }
    try {
      const inserted_row = await get(db, "SELECT memo FROM books;");
      console.log(inserted_row);
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await run(db, "DROP TABLE books");
  }
};

main();
