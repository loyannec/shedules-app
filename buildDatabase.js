/*
This program is used to config the database by the command "npm run build-db"
*/

var DatabaseService = require('./DatabaseService');
var service = new DatabaseService();

service.connect();

service.setUp();

service.disconnect();
