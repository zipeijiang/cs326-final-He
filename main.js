'use strict';
exports.__esModule = true;
var database_sql_1 = require("./database");
var server_sql_1 = require("./server");
var theDatabase = new database_sql_1.Database('ilixcuof'); // CHANGE THIS
console.log("Server OK");
var theServer = new server_sql_1.Server(theDatabase);
theServer.listen(process.env.PORT || 8080);
console.log("database OK");