const optionsDatabaseMariaDb = {
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'coderhouse',
      password : 'coder123',
      database : 'codehouse'
    },
    pool: { min: 0, max: 4 }
  }
  
  const optionsDatabaseSqlite3 = {
    client: 'sqlite3',
    connection: { filename: './mensajes.sqlite' },
    useNullAsDefault: true
  }
  
  module.exports = {
    optionsDatabaseMariaDb,
    optionsDatabaseSqlite3
  }