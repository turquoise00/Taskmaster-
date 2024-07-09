
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST || 'localhost',
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASS || '',
      database: process.env.DATABASE || 'work_management',
    },
    migrations: {
      directory: __dirname + '/migrations', 
    },
    seeds: {
      directory: __dirname + '/seeds',  
    },
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST || 'localhost',
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASS || '',
      database: process.env.DATABASE || 'work_management',
    },
    migrations: {
      directory: __dirname + '/migrations',  
    },
    seeds: {
      directory: __dirname + '/seeds',  
    },
  },
};
