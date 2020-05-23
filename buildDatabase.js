var DatabaseService = require('./DatabaseService');
var service = new DatabaseService();

service.connect();

service.setUp();

service.disconnect();
