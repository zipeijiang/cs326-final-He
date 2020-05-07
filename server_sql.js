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
Object.defineProperty(exports, "__esModule", { value: true });
let http = require('http');
let url = require('url');
let express = require('express');
class Server {
    //private anotherRouter = express.Router();
    constructor(db) {
        this.server = express();
        this.port = 8080;
        this.router = express.Router();
        this.dataBase = db;
        this.router.use((request, response, next) => {
            //response.header('Content-Type','application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.server.use('/', express.static('./html'));
        // this.server.use('/word/:userId', express.static('./html/word.html'));
        this.server.use(express.json());
        //USER FUNCTION
        this.router.post('/signup', this.createnewUserHandler.bind(this));
        this.router.post('/login', [this.errorUserHandler.bind(this), this.loginHandler.bind(this)]);
        this.router.post('/changeinfo', [this.errorUserHandler.bind(this), this.changeinfoHandler.bind(this)]);
        this.router.post('/getuserinfo', [this.errorUserHandler.bind(this), this.getUserHandler.bind(this)]);
        //WORD FUNCTION
        this.router.post('/word/new', this.createHandler.bind(this));
        this.router.post('/word/definition', [this.errorHandler.bind(this), this.defHandler.bind(this)]);
        this.router.post('/word/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
        this.router.post('/word/view', [this.errorHandler.bind(this), this.viewHandler.bind(this)]);
        this.router.post('/word/viewuser', [this.errorUserHandler.bind(this), this.uviewHandler.bind(this)]);
        //|-For main page browse
        this.router.post('/mainview', this.mainpageviewHandler.bind(this));
        this.router.post('/getDefinitionByLanguage', [this.errorHandler.bind(this), this.getDefHandler.bind(this)]); //take word and language, return definition in that language
        this.router.post('/word/getDefinitionByLanguage', [this.errorHandler.bind(this), this.getDefHandler.bind(this)]); //take word and language, return definition in that language
        //PRONUNCIATION FUNCTION
        this.router.post('/word/addpronunciation', this.pronHandler.bind(this)); //get all comments by word, takes word
        this.router.post('/word/getpronunciation', this.getPronunHandler.bind(this)); //get all comments by word, takes word
        this.router.post('/word/addPronunLikes', this.addPronunLikesHandler.bind(this)); //get all comments by word, takes word
        this.router.post('/word/deletePronun', this.delpronHandler.bind(this)); //get all comments by word, takes word
        //COMMENTS FUNCTION
        this.router.post('/word/addcomment', this.addCommentHandler.bind(this)); //add comment, takes pronunID, user, text
        this.router.post('/word/delcomment', this.delCommentHandler.bind(this)); // delete comment by commentID, takes commentID
        this.router.post('/word/getcomment', this.getCommentHandler.bind(this)); // get all comments by pronunID, takes pronunID
        this.router.post('*', (request, response) => __awaiter(this, void 0, void 0, function* () {
            response.send(JSON.stringify({ "result": "command-not-found" }));
        }));
        this.server.use('/public', this.router);
    }
    //Word Handlers
    createHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("createHandler request " + request.body.word + " " + request.body.img + " " + request.body.languages + " " + request.body.definition);
            yield this.create(request.body.id, request.body.word, request.body.img, request.body.languages, request.body.definition, response);
        });
    }
    viewHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.view(request.body.word, response);
        });
    }
    uviewHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.viewuser(request.body.id, response);
        });
    }
    mainpageviewHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mainpageview(response);
        });
    }
    defHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateDefinition(request.body.word, request.body.languages, request.body.definition, response);
        });
    }
    deleteHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.delete(request.body.word, response);
        });
    }
    getDefHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getDefinition(request.body.word, request.body.languages, response);
        });
    }
    //Pronunciation Handlers
    pronHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addPronun(request.body.word, request.body.pron, request.body.addr, response);
        });
    }
    delpronHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.delPronunciation(request.body.ID, response);
        });
    }
    getPronunHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getPronun(request.body.word, response);
        });
    }
    getUserHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getUserInfo(request.body.id, response);
        });
    }
    addPronunLikesHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addLikes(request.body.pronunID, response);
        });
    }
    // User Handlers
    createnewUserHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("createUserHandler request " + request.body.username + " " + request.body.password + " " + request.body.portrait + " " + request.body.location);
            yield this.createnewUser(request.body.id, request.body.username, request.body.password, request.body.portrait, request.body.location, response);
        });
    }
    loginHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("userlogin request by " + request.body.id + "with password" + request.body.password);
            yield this.loginUser(request.body.id, request.body.password, response);
        });
    }
    changeinfoHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("user change info request by " + request.body.id + "with new password" + request.body.password);
            yield this.changeinfoUser(request.body.id, request.body.username, request.body.password, request.body.portrait, request.body.location, response);
        });
    }
    errorHandler(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield this.dataBase.isFound(request.body.word);
            if (!value) {
                console.log('error');
                response.write(JSON.stringify({ 'result': 'error' }));
                response.end();
            }
            else {
                next();
            }
        });
    }
    errorUserHandler(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield this.dataBase.userisFound(request.body.id);
            console.log("error handler on user login");
            if (!value) {
                console.log('error');
                response.write(JSON.stringify({ 'result': 'notfound' }));
                response.end();
            }
            else {
                next();
            }
        });
    }
    // Comments Handlers
    addCommentHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addcomment(request.body.pronunID, request.body.user, request.body.text, response);
        });
    }
    delCommentHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.delcomment(request.body.commentID, response);
        });
    }
    getCommentHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getComment(request.body.pronunID, response);
        });
    }
    //Handlers Ends Here
    //User Functions
    listen(port) {
        this.server.listen(port);
    }
    createnewUser(id, username, password, location, portrait, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("creating user in create '" + username + "'");
            const registered_at = new Date().toLocaleString();
            yield this.dataBase.createUser(id, username, password, portrait, registered_at, location);
            response.write(JSON.stringify({ 'result': 'created',
                'id': id }));
            response.end();
        });
    }
    changeinfoUser(id, username, password, location, portrait, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("change user info '" + username + "'");
            yield this.dataBase.updateUser(id, username, password, portrait, location);
            response.write(JSON.stringify({ 'result': 'changed',
                'id': id }));
            response.end();
        });
    }
    loginUser(id, password, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = yield this.dataBase.isRightPassword(id, password);
            if (!info) {
                // no password missmatch being found.
                response.write(JSON.stringify({ 'result': 'error',
                    'id': id
                }));
            }
            else {
                response.write(JSON.stringify({ 'result': 'ok',
                    'id': id,
                    'username': info
                }));
            }
            response.end();
        });
    }
    //Word Functions
    create(id, word, img, languages, definition, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("creating word in create '" + word + "'");
            yield this.dataBase.create(word, img, languages, definition);
            yield this.dataBase.worduserinfo(id, word);
            response.write(JSON.stringify({ 'result': 'created',
                'word': word }));
            response.end();
        });
    }
    view(workerData, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('checking word: ' + workerData);
            let info = yield this.dataBase.get(workerData);
            response.write(JSON.stringify({ 'result': 'created',
                'word': workerData,
                'img': info['img'],
                'lang': info['languages'].split(' ')
            }));
            response.end();
        });
    }
    viewuser(id, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('view user word : ' + id);
            let info = yield this.dataBase.getuserword(id);
            response.write(JSON.stringify(info));
            response.end();
        });
    }
    getUserInfo(id, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('view user word for : ' + id);
            let info = yield this.dataBase.getUser(id);
            // response.write(JSON.stringify(
            //     {'result' : 'created',
            //     'username' : 'haha',
            //     'portrait' : '1',
            //     'location': 'sx'
            // }
            // ));
            response.write(JSON.stringify(info));
            response.end();
            response.end();
        });
    }
    mainpageview(response) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = yield this.dataBase.mainview();
            response.write(JSON.stringify(info));
            response.end();
        });
    }
    getDefinition(workerData, language, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('get word: ' + workerData + "', language: " + language);
            let info = yield this.dataBase.getDef(workerData, language);
            if (info == null) {
                // no word with specific word being found.
                response.write(JSON.stringify({ 'result': 'error',
                    'word': workerData
                }));
            }
            else {
                let result = { 'result': 'created',
                    'word': workerData,
                    'def': info['def']
                };
                response.write(JSON.stringify(result));
                console.log("definition sent successfully");
            }
            response.end();
        });
    }
    updateDefinition(workerData, lang, def, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("updated word '" + workerData + "' with language '" + lang + "'");
            yield this.dataBase.def(workerData, lang, def);
            let info = yield this.dataBase.get(workerData);
            response.write(JSON.stringify({ 'result': 'updated description',
                'word': workerData,
                'lang': info['languages']
            }));
            response.end();
        });
    }
    delete(workerData, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dataBase.del(workerData);
            response.write(JSON.stringify({ 'result': 'deleted',
                'word': workerData }));
            response.end();
        });
    }
    //Comment Functions
    addcomment(pronunID, user, text, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("add comment by user '" + user);
            let info = yield this.dataBase.addcomment(pronunID, user, text);
            if (info !== null) {
                response.write(JSON.stringify({ 'result': 'comment added'
                }));
            }
            else {
                response.write(JSON.stringify({ 'result': 'error'
                }));
            }
            response.end();
        });
    }
    delcomment(commentID, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("delete comment ID:" + commentID);
            let info = yield this.dataBase.deletecomment(commentID);
            if (info !== null) {
                response.write(JSON.stringify({ 'result': 'comment deleted',
                    'id': commentID
                }));
            }
            else {
                response.write(JSON.stringify({ 'result': 'error'
                }));
            }
            response.end();
        });
    }
    getComment(pronunID, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('get comment of pronun ' + pronunID);
            let info = yield this.dataBase.getcomment(pronunID);
            if (info == null) {
                // no word with specific word being found.
                response.write(JSON.stringify({ 'result': 'error',
                    'pronunID': pronunID
                }));
            }
            else {
                let result = { 'result': 'success',
                    'comments': info
                };
                response.write(JSON.stringify(result));
                console.log(JSON.stringify(result));
            }
            response.end();
        });
    }
    //Pronunciation Functions
    addPronun(word, audio, address, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = yield this.dataBase.addPronun(word, audio, address);
            if (info == null) {
                //no word with specific word being found
                response.write(JSON.stringify({ 'result': 'error',
                    'word': word
                }));
            }
            else {
                let result = { 'result': 'success',
                    'word': word
                };
                response.write(JSON.stringify(result));
                console.log(JSON.stringify(result));
            }
            response.end();
        });
    }
    getPronun(word, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('get pronun of word ' + word);
            let info = yield this.dataBase.getPronun(word);
            if (info == null) {
                //no word with specific word being found
                console.log('error get pronun failed');
                response.write(JSON.stringify({ 'result': 'error',
                    'word': word
                }));
            }
            else {
                let result = { 'result': 'success',
                    'pronuns': info
                };
                response.write(JSON.stringify(result));
                console.log(JSON.stringify(result));
            }
            response.end();
        });
    }
    addLikes(pronunID, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('get likes of pronun ' + pronunID);
            let info = yield this.dataBase.addLikes(pronunID);
            if (info == null) {
                //no word with specific word being found
                response.write(JSON.stringify({ 'result': 'error',
                    'likes': 'error'
                }));
            }
            else {
                let result = { 'result': 'success',
                    'likes': info['likes']
                };
                response.write(JSON.stringify(result));
                console.log(JSON.stringify(result));
            }
            response.end();
        });
    }
    delPronunciation(ID, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = yield this.dataBase.delPronun(ID);
            if (info == null) {
                //no word with specific word being found
                console.log('error get pronun failed');
                response.write(JSON.stringify({ 'result': 'error',
                    'id': ID
                }));
            }
            else {
                let result = { 'result': 'success',
                    'id': ID
                };
                console.log('deletion succeeded');
                response.write(JSON.stringify(result));
            }
            response.end();
        });
    }
}
exports.Server = Server;
