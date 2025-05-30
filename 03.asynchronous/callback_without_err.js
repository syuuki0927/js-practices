import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
  () => {
    const stmt = db.prepare("INSERT INTO books(title) VALUES (?)");
    stmt.run("よくわかるJavaScript", () => {
      db.get("SELECT last_insert_rowid();", (err, row) => {
        console.log(row["last_insert_rowid()"]);
        const stmtWhereId = db.prepare("SELECT * FROM books WHERE id = ?;");
        stmtWhereId.each(row["last_insert_rowid()"], (err, row) => {
          console.log(row);
          db.run("DROP TABLE books;");
        });
      });
    });
  },
);
