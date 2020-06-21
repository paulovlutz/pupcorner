module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "rootroot",
      database: process.env.DEV_DB_PASSWORD,
      charset: "utf8"
    }
  },
  production: {
    client: "mysql",
    connection: process.env.JAWSDB_URL
  }
};