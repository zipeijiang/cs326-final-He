'use strict';

import { Database } from './database_sql';
import { Server } from './server_sql';

const theDatabase = new Database('ilixcuof'); // CHANGE THIS
console.log("database OK");
const theServer = new Server(theDatabase);
console.log("Server OK");
theServer.listen(8080);