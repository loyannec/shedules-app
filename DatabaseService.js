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

    query(statement, callback) {
        this.#connection.query(statement, function (error, results) {
            if (error) throw error;
            if (typeof callback === 'function') {
                callback(results);
            }
        });
    }

    setUp() {
        const databaseName = DatabaseService.databaseName;
        const tableName = DatabaseService.tableName;
        this.query(`DROP DATABASE if exists ${databaseName}`);

        this.query(`CREATE DATABASE ${databaseName}`);

        this.query(`USE ${databaseName}`);

        this.query(`CREATE TABLE ${tableName} (`+
            "id INT PRIMARY KEY NOT NULL AUTO_INCREMENT," +
            "username VARCHAR (50) UNIQUE NOT NULL," +
            "day_of_the_week INTEGER NOT NULL," +
            "start_time TIME NOT NULL," +
            "end_time TIME NOT NULL" +
        ")");
    }

    insertSchedule(schedule) {
        const databaseName = DatabaseService.databaseName;
        const tableName = DatabaseService.tableName;
        this.query(`INSERT INTO ${databaseName}.${tableName} (username, day_of_the_week, start_time, end_time) VALUES ('${schedule.username}', ${schedule.day_of_the_week}, '${schedule.start_time}', '${schedule.end_time}')`);
    }

    retrieveSchedules(callback) {
        const databaseName = DatabaseService.databaseName;
        const tableName = DatabaseService.tableName;
        this.query(`SELECT * FROM ${databaseName}.${tableName}`, callback);
    }
}
module.exports = DatabaseService;