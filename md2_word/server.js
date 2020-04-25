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
var worker_threads_1 = require("worker_threads");
var http = require('http');
var url = require('url');
var express = require('express');
var Server = /** @class */ (function () {
    function Server(db) {
        var _this = this;
        this.server = express();
        this.port = 8080;
        this.router = express.Router();
        this.dataBase = db;
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.server.use('/', express.static('./html'));
        this.server.use(express.json());
        this.router.post('/new', this.createHandler.bind(this));
        this.router.post('/definition', [this.errorHandler.bind(this), this.defHandler.bind(this)]);
        this.router.post('/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
        this.router.post('/view', [this.errorHandler.bind(this), this.viewHandler.bind(this)]);
        this.router.post('/getDefinitionByLanguage', [this.errorHandler.bind(this), this.getDefHandler.bind(this)]); //take word and language, return definition in that language
        this.router.post('/pronunciation', [this.errorHandler.bind(this), this.pronHandler.bind(this)]); //take word, pronunciation, user address
        this.router.post('/delpronunciation', [this.delpronHandler.bind(this)]); // delete pronunciation according to ID
        this.router.post('*', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.send(JSON.stringify({ "result": "command-not-found" }));
                return [2 /*return*/];
            });
        }); });
        this.server.use('/word', this.router);
    }
    Server.prototype.createHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("createHandler request " + request.body.word + " " + request.body.img + " " + request.body.languages + " " + request.body.definition);
                        return [4 /*yield*/, this.create(request.body.word, request.body.img, request.body.languages, request.body.definition, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.viewHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.view(request.body.word, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.defHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateDefinition(request.body.word, request.body.languages, request.body.definition, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.deleteHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this["delete"](request.body.word, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.getDefHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDefinition(request.body.word, request.body.languages, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.pronHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addPronunciation(request.body.word, request.body.pron, request.body.addr, request.body.language, request.body.spelling, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.delpronHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delPronunciation(request.body.ID, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.errorHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dataBase.isFound(request.body.word)];
                    case 1:
                        value = _a.sent();
                        if (!value) {
                            console.log('error');
                            response.write(JSON.stringify({ 'result': 'error' }));
                            response.end();
                        }
                        else {
                            next();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.listen = function (port) {
        this.server.listen(port);
    };
    Server.prototype.create = function (word, img, languages, definition, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("creating word in create '" + word + "'");
                        return [4 /*yield*/, this.dataBase.create(word, img, languages, definition)];
                    case 1:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'created',
                            'word': word }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.view = function (workerData, response) {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('checking word: ' + workerData);
                        return [4 /*yield*/, this.dataBase.get(workerData)];
                    case 1:
                        info = _a.sent();
                        response.write(JSON.stringify({ 'result': 'created',
                            'word': workerData,
                            'img': info['img'],
                            'lang': info['languages']
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.getDefinition = function (workerData, language, response) {
        return __awaiter(this, void 0, void 0, function () {
            var info, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('get word: ' + workerData + "', language: " + language);
                        return [4 /*yield*/, this.dataBase.getDef(workerData, language)];
                    case 1:
                        info = _a.sent();
                        if (info[language] == null) {
                            // no word with specific word being found.
                            response.write(JSON.stringify({ 'result': 'error',
                                'word': workerData
                            }));
                        }
                        else {
                            result = { 'result': 'created',
                                'word': workerData
                            };
                            result[language] = info[language];
                            response.write(JSON.stringify(result));
                            console.log("definition sent successfully");
                        }
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.updateDefinition = function (workerData, lang, def, response) {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("updated word '" + workerData + "' with language '" + lang + "'");
                        return [4 /*yield*/, this.dataBase.def(workerData, lang, def)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.dataBase.get(workerData)];
                    case 2:
                        info = _a.sent();
                        response.write(JSON.stringify({ 'result': 'updated description',
                            'word': workerData,
                            'lang': info['languages']
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype["delete"] = function (workerData, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: //delete the word
                    return [4 /*yield*/, this.dataBase.del(workerData)];
                    case 1:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'deleted',
                            'word': workerData }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.addPronunciation = function (word, pron, addr, language, spelling, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("add pronunciation to word '" + word);
                        id = this.dataBase.getNewPronID();
                        return [4 /*yield*/, this.dataBase.addPron(id, word, pron, addr, language, spelling)];
                    case 1:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'pronunciation added',
                            'word': word,
                            'id': id
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.delPronunciation = function (ID, response) {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("delete pronunciation from word '" + worker_threads_1.workerData);
                        return [4 /*yield*/, this.dataBase.delPron(ID)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.dataBase.get(worker_threads_1.workerData)];
                    case 2:
                        info = _a.sent();
                        response.write(JSON.stringify({ 'result': 'pronunciation deleted',
                            'word': worker_threads_1.workerData,
                            'id': info['id']
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Server;
}());
exports.Server = Server;
