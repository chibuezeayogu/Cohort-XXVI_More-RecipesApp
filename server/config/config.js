console.log(process.env.NODE_ENV);

module.exports = {
  development: {
    username: "Chibueze",
    password: "Computer12.",
    database: "more-recipe",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: "Computer12.",
    database: "mytest",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },
  production: {
    username: "Chibueze",
    password: "Computer12.",
    database: "more-recipe",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  }
}
