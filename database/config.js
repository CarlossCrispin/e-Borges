/*var pgp = require("pg")
var config = pgp("postgres://emmas:emmas@localhost:3000/tesis");
//var db = pgp("postgres://username:password@host:port/database");

/*var config = {
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'tutorialnodejs'
};*/
/*var config = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'tesis',
    user: 'emmas',
    password: 'emmas'
};*/
const {Pool}= require('pg')

const config = new Pool({
  //user: 'crispin',
  user: 'crispin',
  host: 'localhost',
  database: 'eborgestesis',
  password: 'crispin',
  port: 5432
})

module.exports = config;