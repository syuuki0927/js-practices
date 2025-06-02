import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const run = (sql) =>
  new Promise((resolve, reject) => {
    return db.run(sql, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const get = (sql) =>
  new Promise((resolve, reject) =>
    db.get(sql, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    }),
  );

const main = async () => {
  try {
    await run(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
    );
    try {
      await run("INSERT INTO books(title) VALUES (null)");
      const id_row = await get("SELECT last_insert_rowid();");
      console.log(id_row["last_insert_rowid()"]);
    } catch (err) {
      console.error(err);
    }
    try {
      const inserted_row = await get("SELECT memo FROM books;");
      console.log(inserted_row);
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await run("DROP TABLE books");
  }
};

main();
