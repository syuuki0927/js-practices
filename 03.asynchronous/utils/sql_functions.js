export { run, get };

const run = (db, sql) =>
  new Promise((resolve, reject) => {
    return db.run(sql, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const get = (db, sql) =>
  new Promise((resolve, reject) =>
    db.get(sql, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    }),
  );
