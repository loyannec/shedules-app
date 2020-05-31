/*
This class it is to manage connection with database.
*/
var mysql = require("mysql");                 // Loading the mysql module.

class DatabaseService {
    static databaseName = "schedules_db";
    static tableName = "schedules";
    #connection;                             // Declare private property to use in the future with database in general.

    constructor() {                          // To set connection properties.
      this.#connection = null;
    }

    connect() {
        this.#connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            port: 3306
        });
    }

    disconnect() {
        if (this.#connection) {
            this.#connection.end();
            this.#connection = null;
        }
    }

    setUp() {
        const databaseName = DatabaseService.databaseName;
        const tableName = DatabaseService.tableName;
        this.#connection.query(`DROP DATABASE if exists ${databaseName}`);

        this.#connection.query(`CREATE DATABASE ${databaseName}`);

        this.#connection.query(`USE ${databaseName}`);

        this.#connection.query(`CREATE TABLE ${tableName} (`+
            "id INT PRIMARY KEY NOT NULL AUTO_INCREMENT," +
            "username VARCHAR (50) NOT NULL," +
            "day_of_the_week INTEGER NOT NULL," +
            "start_time TIME NOT NULL," +
            "end_time TIME NOT NULL," +
            "UNIQUE KEY unique_schedule(username, day_of_the_week, start_time, end_time)" +
        ")");
    }

    insertSchedule(schedule, callback) {
        const databaseName = DatabaseService.databaseName;
        const tableName = DatabaseService.tableName;
        // this.#connection.query(`INSERT INTO ${databaseName}.${tableName} SET ?`, schedule, callback);
        this.#connection.query(`INSERT INTO ${databaseName}.${tableName} (username, day_of_the_week, start_time, end_time) VALUES (?, ?, ?, ?)`, [
            schedule.username, schedule.day_of_the_week, schedule.start_time, schedule.end_time
        ], callback);
    }

    retrieveSchedules(callback) {
        const databaseName = DatabaseService.databaseName;
        const tableName = DatabaseService.tableName;
        this.#connection.query(`SELECT * FROM ${databaseName}.${tableName} ORDER BY id`, callback);
    }
}
module.exports = DatabaseService;
