'use strict';

import { Database } from './database_sql';
import { Server } from './server_sql';

const theDatabase = new Database('wojhwndc'); // CHANGE THIS
const theServer = new Server(theDatabase);

theServer.listen(8080);