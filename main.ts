'use strict';

import { Database } from './database';
import { Server } from './server';

const theDatabase = new Database('ilixcuof'); // CHANGE THIS
console.log("database OK");
const theServer = new Server(theDatabase);
console.log("Server OK");
theServer.listen(8080);