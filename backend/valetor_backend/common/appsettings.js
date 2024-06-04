const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'ec2-18-118-110-45.us-east-2.compute.amazonaws.com',
  database: 'Valetor',
  password: 'softwarefactory',
  port: 5432
  
  /*user: 'postgres',
  host: 'localhost',
  database: 'SolRedesDev',
  password: '123',
  port: 5432*/
})

module.exports={
    pool
}
