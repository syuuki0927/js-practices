import sqlite3 from "sqlite3";
import timers from "timers/promises";

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
    return run("INSERT INTO books(title) VALUES (null)");
  })
  .then(() => get("SELECT last_insert_rowid();"))
  .catch((err) => {
    console.log(err);
    return run("DROP TABLE books");
  });

await timers.setTimeout(100);
run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
)
  .then(() => {
    return run('INSERT INTO books(title) VALUES ("よくわかるJavascript")');
  })
  .then(() => get("SELECT last_insert_rowid();"))
  .then(() => get("SELECT memo FROM books;"))
  .catch((err) => {
    console.log(err);
    return run("DROP TABLE books");
  });
