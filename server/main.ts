'use strict';

import { Database } from './database';
import { Server } from './server';

const theDatabase = new Database(); // CHANGE THIS
const theServer = new Server(theDatabase);

theServer.listen(process.env.PORT || 8080);