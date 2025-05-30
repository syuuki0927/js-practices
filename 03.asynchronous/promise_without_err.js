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

run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
)
  .then(() => {
    return run('INSERT INTO books(title) VALUES ("よくわかるJavaScript")');
  })
  .then(() => get("SELECT last_insert_rowid();"))
  .then((row) => {
    console.log(row["last_insert_rowid()"]);
    return get(`SELECT * FROM books WHERE id = ${row["last_insert_rowid()"]};`);
  })
  .then((row) => {
    console.log(row);
  })
  .catch((err) => {
    console.log(err);
  });
