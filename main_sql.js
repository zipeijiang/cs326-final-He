'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const database_sql_1 = require("./database_sql");
const server_sql_1 = require("./server_sql");
const theDatabase = new database_sql_1.Database('ilixcuof'); // CHANGE THIS
console.log("database OK");
const theServer = new server_sql_1.Server(theDatabase);
console.log("Server OK");
theServer.listen(process.env.PORT ||8080);
