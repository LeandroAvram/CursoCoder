const optionsDatabaseMariaDb = {
    client: 'mysql',
    connection: {
      host : process.env.BDHOST,
      port : process.env.BDPUERTO,
      user : process.env.BDUSER,
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