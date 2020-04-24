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
    function Database() {
        var _this = this;
        this.MongoClient = require('mongodb').MongoClient;
        this.uri = "mongodb+srv://guest:guest@cluster0-y0tyl.mongodb.net/test?retryWrites=true&w=majority";
        this.dbName = "dialectDictionary";
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    Database.prototype.create = function (word, img, languages, definition) {
        return __awaiter(this, void 0, void 0, function () {
            var db, wordCollection, defCollection, lang, doc, defdoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        wordCollection = db.collection('wordCollection');
                        defCollection = db.collection('defCollection');
                        lang = [];
                        if (languages !== '') {
                            lang.push(languages);
                        }
                        doc = {
                            'word': word,
                            'img': img,
                            'languages': lang
                        };
                        return [4 /*yield*/, wordCollection.insertOne(doc)];
                    case 1:
                        _a.sent();
                        if (!(languages !== '')) return [3 /*break*/, 3];
                        defdoc = {
                            'word': word
                        };
                        defdoc[languages] = definition;
                        return [4 /*yield*/, defCollection.insertOne(defdoc)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        console.log("create: word = " + word);
                        return [2 /*return*/];
                }
            });
        });
    };
    //only work on update session
    Database.prototype.def = function (word, lang, def) {
        return __awaiter(this, void 0, void 0, function () {
            var db, wordCollection, defCollection, info, curlanguage, pair;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        wordCollection = db.collection('wordCollection');
                        defCollection = db.collection('defCollection');
                        return [4 /*yield*/, wordCollection.findOne({ 'word': word })];
                    case 1:
                        info = _a.sent();
                        curlanguage = info['languages'];
                        if (curlanguage.includes(lang)) {
                            console.log("already exists language!");
                            return [2 /*return*/, null];
                        }
                        curlanguage.push(lang);
                        return [4 /*yield*/, wordCollection.updateOne({ 'word': word }, { $set: { 'languages': curlanguage } }, { 'upsert': true })];
                    case 2:
                        _a.sent();
                        pair = JSON.parse('{' + '"' + lang + '"' + ':' + '"' + def + '"' + '}');
                        console.log('pair:' + JSON.stringify(pair));
                        return [4 /*yield*/, defCollection.updateOne({ 'word': word }, { $set: pair }, { 'upsert': true })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.get = function (word) {
        return __awaiter(this, void 0, void 0, function () {
            var db, wordCollection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        wordCollection = db.collection('wordCollection');
                        console.log("get: word = " + word);
                        return [4 /*yield*/, wordCollection.findOne({ 'word': word })];
                    case 1:
                        result = _a.sent();
                        console.log("get: returned " + JSON.stringify(result));
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getDef = function (word, lang) {
        return __awaiter(this, void 0, void 0, function () {
            var db, defCollection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        defCollection = db.collection('defCollection');
                        console.log("get: word = " + word + " language: " + lang);
                        return [4 /*yield*/, defCollection.findOne({ 'word': word })];
                    case 1:
                        result = _a.sent();
                        console.log("getDef: returned " + JSON.stringify(result));
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.del = function (word) {
        return __awaiter(this, void 0, void 0, function () {
            var db, wordCollection, defCollection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        wordCollection = db.collection('wordCollection');
                        defCollection = db.collection('defCollection');
                        console.log("delete: word = " + word);
                        return [4 /*yield*/, wordCollection.deleteMany({ 'word': word })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, defCollection.deleteMany({ 'word': word })];
                    case 2:
                        _a.sent();
                        console.log("result = " + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.addPron = function (ID, word, pronunciation, addr, lang, spelling) {
        return __awaiter(this, void 0, void 0, function () {
            var db, pronCollection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        pronCollection = db.collection('pronCollection');
                        console.log("add pronunciation in " + addr + " to word " + word);
                        return [4 /*yield*/, pronCollection.updateOne({ 'id': ID }, { $set: { 'word': word, 'pronunciation': pronunciation, 'address': addr, 'language': lang, 'spelling': spelling } }, { 'upsert': true })];
                    case 1:
                        result = _a.sent();
                        console.log(JSON.stringify(result));
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.delPron = function (ID) {
        return __awaiter(this, void 0, void 0, function () {
            var db, pronCollection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        pronCollection = db.collection('pronCollection');
                        console.log("delete pronunciation with ID " + ID);
                        return [4 /*yield*/, pronCollection.deleteMany({ 'id': ID })];
                    case 1:
                        result = _a.sent();
                        console.log("result = " + JSON.stringify(result));
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.initializeID = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, IDCollection;
            return __generator(this, function (_a) {
                db = this.client.db(this.dbName);
                IDCollection = db.collection('IDCollection');
                IDCollection.updateOne({ 'type': 'user' }, { $set: { 'id': 0 } }, { 'upsert': true });
                IDCollection.updateOne({ 'type': 'pronunciatIon' }, { $set: { 'id': 0 } }, { 'upsert': true });
                return [2 /*return*/];
            });
        });
    };
    Database.prototype.getNewPronID = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, IDCollection, result, newID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        IDCollection = db.collection('IDCollection');
                        return [4 /*yield*/, IDCollection.findOne({ 'type': 'pronunciatIon' })];
                    case 1:
                        result = _a.sent();
                        newID = result['id'];
                        return [4 /*yield*/, IDCollection.updateOne({ 'type': 'pronunciatIon' }, { $set: { 'id': newID + 1 } }, { 'upsert': true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, newID];
                }
            });
        });
    };
    Database.prototype.getNewUserID = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, IDCollection, result, newID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        IDCollection = db.collection('IDCollection');
                        return [4 /*yield*/, IDCollection.findOne({ 'type': 'pronunciatIon' })];
                    case 1:
                        result = _a.sent();
                        newID = result['id'];
                        return [4 /*yield*/, IDCollection.updateOne({ 'type': 'user' }, { $set: { 'id': newID + 1 } }, { 'upsert': true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, newID];
                }
            });
        });
    };
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
