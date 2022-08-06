var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'letstravel'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("db Connected!");
});

module.exports.con = con;