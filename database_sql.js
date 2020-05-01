"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Database = /** @class */ (function () {
    function Database(dbName) {
        var _this = this;
        this.pgp = require('pg-promise')();
        this.uri = "postgres://hogarpcktasrfu:a57eabff42db64de71ddb6e94c97fe6661013b2d40f234466c597ee41c67cd90@ec2-54-86-170-8.compute-1.amazonaws.com:5432/demok7kkasc06o";
        this.dbName = "demok7kkasc06o";
        this.dbName = dbName;
        this.db = this.pgp(this.uri);
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.none('CREATE TABLE wordTable (word VARCHAR(50) PRIMARY KEY, img VARCHAR(200), languages VARCHAR(200))')];
                    case 1:
                        result = _a.sent();
                        console.log(JSON.stringify(result));
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log('Already created.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    }
    //create a new word or update img of an existing word (doesn't update definition!)
    Database.prototype.create = function (word, img, lang, definition) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1, err_2, e_2, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("put: word = " + word + ", img = " + img);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 8]);
                        return [4 /*yield*/, this.db.none('INSERT INTO wordTable(word, img, languages) values ($1, $2, $3)', [word, img, lang])];
                    case 2:
                        _a.sent();
                        console.log('added word successfully');
                        return [3 /*break*/, 8];
                    case 3:
                        err_1 = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.db.none('UPDATE wordTable SET img = $2 WHERE word = $1', [word, img])];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 8];
                    case 8:
                        if (!(lang !== '')) return [3 /*break*/, 16];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.db.none('CREATE TABLE ' + lang + 'Table (word VARCHAR(50) REFERENCES wordTable(word) ON DELETE CASCADE, def VARCHAR(400), PRIMARY KEY (word))')];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_2 = _a.sent();
                        console.log('Already created.');
                        return [3 /*break*/, 12];
                    case 12:
                        _a.trys.push([12, 14, , 16]);
                        return [4 /*yield*/, this.db.none('INSERT INTO ' + lang + 'Table(word, def) values ($1, $2)', [word, definition])];
                    case 13:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 14:
                        e_3 = _a.sent();
                        return [4 /*yield*/, this.db.none('UPDATE ' + lang + 'Table SET def = $2 WHERE word = $1', [word, definition])];
                    case 15:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    //only work on update session
    // assume word exists
    Database.prototype.def = function (word, lang, def) {
        return __awaiter(this, void 0, void 0, function () {
            var info, languages, e_4, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("put: def in" + lang + " for " + word);
                        return [4 /*yield*/, this.db.one('SELECT * FROM wordTable WHERE word = $1', [word])];
                    case 1:
                        info = _a.sent();
                        languages = info.languages + ' ' + lang;
                        return [4 /*yield*/, this.db.none('UPDATE wordTable SET languages = $2 WHERE word = $1', [word, languages])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.db.none('CREATE TABLE ' + lang + 'Table (word VARCHAR(50) REFERENCES wordTable(word) ON DELETE CASCADE, def VARCHAR(400), PRIMARY KEY (word))')];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_4 = _a.sent();
                        console.log('Already created.');
                        return [3 /*break*/, 6];
                    case 6:
                        _a.trys.push([6, 8, , 10]);
                        return [4 /*yield*/, this.db.none('INSERT INTO ' + lang + 'Table(word, def) values ($1, $2)', [word, def])];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        e_5 = _a.sent();
                        console.log('word already has definition in this language.');
                        return [4 /*yield*/, this.db.none('UPDATE ' + lang + 'Table SET def = $2 WHERE word = $1', [word, def])];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.get = function (word) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("get: word = " + word);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.one('SELECT * FROM wordTable WHERE word = $1', [word])];
                    case 2:
                        result = _a.sent();
                        console.log("get: returned " + JSON.stringify(result));
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        // Failed search.
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getDef = function (word, lang) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("get: word = " + word + "in language " + lang);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.one('SELECT * FROM ' + lang + 'Table WHERE word = $1', [word])];
                    case 2:
                        result = _a.sent();
                        console.log("get: returned " + JSON.stringify(result));
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        // Failed search.
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.del = function (word) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.none('DELETE FROM wordTable WHERE word = $1', [word])];
                    case 1:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        // Not found.
                        console.log('error word not found');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /*
        public async addPron(ID:number, word:string, pronunciation: string, addr:string, lang:string, spelling:string): Promise<void>{ //add pronunciaiton to db, take ID, word spelling, pronunciation, addr
            let db = this.client.db(this.dbName);
            let pronCollection = db.collection('pronCollection');
            console.log("add pronunciation in "+addr+" to word "+word);
            let result = await pronCollection.updateOne({'id':ID},{$set:{'word':word, 'pronunciation':pronunciation, 'address':addr, 'language':lang, 'spelling':spelling}}, { 'upsert' : true } );
            console.log(JSON.stringify(result));
        }
    
        public async delPron(ID:number): Promise<void>{ //add pronunciaiton to db, take ID, word spelling, pronunciation, addr
            let db = this.client.db(this.dbName);
            let pronCollection = db.collection('pronCollection');
            console.log("delete pronunciation with ID "+ID);
            let result = await pronCollection.deleteMany({'id':ID});
            console.log("result = " +JSON.stringify(result));
        }
    
        public async initializeID(): Promise<void>{
            let db = this.client.db(this.dbName);
            let IDCollection = db.collection('IDCollection');
            IDCollection.updateOne({'type': 'user'},{$set:{'id': 0}}, { 'upsert' : true } );
            IDCollection.updateOne({'type': 'pronunciatIon'},{$set:{'id': 0}}, { 'upsert' : true } );
        }
        public async getNewPronID(): Promise<number>{
            let db = this.client.db(this.dbName);
            let IDCollection = db.collection('IDCollection');
            let result = await IDCollection.findOne({'type': 'pronunciatIon'});
            let newID = result['id'];
            await IDCollection.updateOne({'type': 'pronunciatIon'},{$set:{'id': newID+1}}, { 'upsert' : true } );
            return newID
        }
    
        public async getNewUserID(): Promise<number>{
            let db = this.client.db(this.dbName);
            let IDCollection = db.collection('IDCollection');
            let result = await IDCollection.findOne({'type': 'pronunciatIon'});
            let newID = result['id'];
            await IDCollection.updateOne({'type': 'user'},{$set:{'id': newID+1}}, { 'upsert' : true } );
            return newID
        }
    */
    Database.prototype.isFound = function (word) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("isFound: word = " + word);
                        return [4 /*yield*/, this.get(word)];
                    case 1:
                        v = _a.sent();
                        console.log("is found result = " + v);
                        if (v === null) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Database;
}());
exports.Database = Database;
