var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    port: 3306
});
var databaseName = "schedules_db";
var tableName = "schedules";

connection.connect();

connection.query(`DROP DATABASE if exists ${databaseName}`, function (error,results,fields) {
    if (error) throw error;
});

connection.query(`CREATE DATABASE ${databaseName}`, function (error,results,fields) {
    if (error) throw error;
});

connection.query(`USE ${databaseName}`, function (error,results,fields) {
    if (error) throw error;
});

connection.query(`CREATE TABLE ${tableName} (`+
                    "id INT PRIMARY KEY NOT NULL AUTO_INCREMENT," +
                    "username VARCHAR (50) UNIQUE NOT NULL," +
                    "day_of_the_week INTEGER NOT NULL," +
                    "start_time TIME NOT NULL," +
                    "end_time TIME NOT NULL" +
                    ")", function (error,results,fields) {
    if (error) throw error;
});

connection.query("SHOW DATABASES", function (error,results,fields) {
    if (error) throw error;
    console.log("The databases are: ", results);
});

connection.end();
