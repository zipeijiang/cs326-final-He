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
class Database {
    constructor(dbName) {
        this.pgp = require('pg-promise')();
        // private uri = "postgres://ilixcuof:jQzvSECVMmriwhIGpD8DNrgTli8pUYzU@drona.db.elephantsql.com:5432/ilixcuof";
        this.uri = "	postgres://ojpwxumh:9CuukrU1JM6Hm4UMFdc1wActdKccHkU-@drona.db.elephantsql.com:5432/ojpwxumh";
        // this.dbName = dbName;
        this.dbName = 'ojpwxumh';
        this.db = this.pgp(this.uri);
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                //word table
                let str1;
                if (process.env.creteWordTable) {
                    str1 = process.env.creteWordTable;
                }
                else {
                    str1 = this.getSecret('createWordTable');
                }
                yield this.db.none(str1);
            }
            catch (e) {
                console.log('wordTable Already created.');
            }
            try {
                // userinfo table
                let str2;
                if (process.env.createUserInfo) {
                    str2 = process.env.createUserInfo;
                }
                else {
                    str2 = this.getSecret('createUserInfo');
                }
                yield this.db.none(str2);
            }
            catch (e) {
                console.log('Already created userinfo table.');
            }
            try {
                let str3;
                // userword tablelet str2;
                if (process.env.createUserWord) {
                    str3 = process.env.createUserWord;
                }
                else {
                    str3 = this.getSecret('createUserWord');
                }
                yield this.db.none(str3);
            }
            catch (e) {
                console.log('Already created userword table.');
            }
            try {
                let str4;
                // userword tablelet str2;
                if (process.env.createPronTable) {
                    str4 = process.env.createPronTable;
                }
                else {
                    str4 = this.getSecret('createPronTable');
                }
                yield this.db.none(str4);
            }
            catch (e) {
                console.log('Already created pronTable.');
            }
            try {
                let str5;
                // userword tablelet str2;
                if (process.env.createComment) {
                    str5 = process.env.createComment;
                }
                else {
                    str5 = this.getSecret('createComment');
                }
                yield this.db.none(str5);
            }
            catch (e) {
                console.log('comment Already created.');
            }
            //pronunTable
        }))();
    }
    //create a new word or update img of an existing word (doesn't update definition!)
    getSecret(key) {
        let secrets = require('./secrets.json');
        let password = secrets[key];
        return password;
    }
    create(word, img, lang, definition) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("put: word = " + word + ", img = " + img);
            try {
                let str1;
                if (process.env.create1) {
                    str1 = process.env.create1;
                }
                else {
                    str1 = this.getSecret('create1');
                }
                yield this.db.none(str1, [word, img, lang]);
                console.log('added word successfully');
            }
            catch (err) {
                try {
                    let str2;
                    if (process.env.create2) {
                        str2 = process.env.create2;
                    }
                    else {
                        str2 = this.getSecret('create2');
                    }
                    yield this.db.none(str2, [word, img]);
                }
                catch (err) {
                    console.log(err);
                }
            }
            // if (lang !== ''){
            //     try {
            //         await this.db.none('CREATE TABLE '+ lang +'Table (word VARCHAR(50) REFERENCES wordTable(word) ON DELETE CASCADE, def VARCHAR(400), PRIMARY KEY (word))');
            //         } catch (e) {
            //         console.log('Already created.');
            //         }
            //     try{
            //         await this.db.none('INSERT INTO '+ lang +'Table(word, def) values ($1, $2)', [word, definition]);
            //     } catch (e){
            //         await this.db.none('UPDATE '+ lang +'Table SET def = $2 WHERE word = $1', [word, definition]);
            //     }
            // } 
        });
    }
    //only work on update session
    // assume word exists
    def(word, lang, def) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("put: def in" + lang + " for " + word);
            let str1;
            if (process.env.def1) {
                str1 = process.env.def1;
            }
            else {
                str1 = this.getSecret('def1');
            }
            let info = yield this.db.one(str1, [word]);
            let list = info.languages.split(' ');
            if (!list.includes(lang)) {
                let str2;
                if (process.env.def2) {
                    str2 = process.env.def2;
                }
                else {
                    str2 = this.getSecret('def2');
                }
                let languages = info.languages + ' ' + lang;
                yield this.db.none(str2, [word, languages]);
            }
            try {
                let str3;
                if (process.env.def3) {
                    str3 = process.env.def3;
                }
                else {
                    str3 = this.getSecret('def3');
                }
                let str4;
                if (process.env.def4) {
                    str4 = process.env.def4;
                }
                else {
                    str4 = this.getSecret('def4');
                }
                yield this.db.none(str3 + lang + str4);
            }
            catch (e) {
                console.log('Already created.');
            }
            try {
                let str5;
                if (process.env.def5) {
                    str5 = process.env.def5;
                }
                else {
                    str5 = this.getSecret('def5');
                }
                let str6;
                if (process.env.def6) {
                    str6 = process.env.def6;
                }
                else {
                    str6 = this.getSecret('def6');
                }
                yield this.db.none(str5 + lang + str6, [word, def]);
            }
            catch (e) {
                let str7;
                if (process.env.def7) {
                    str7 = process.env.def7;
                }
                else {
                    str7 = this.getSecret('def7');
                }
                let str8;
                if (process.env.def4) {
                    str8 = process.env.def8;
                }
                else {
                    str8 = this.getSecret('def8');
                }
                console.log('word already has definition in this language.');
                yield this.db.none(str7 + lang + str8, [word, def]);
            }
        });
    }
    get(word) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get: word = " + word);
            try {
                let str1;
                if (process.env.get1) {
                    str1 = process.env.get1;
                }
                else {
                    str1 = this.getSecret('get1');
                }
                yield this.db.none(str1, [word]);
            }
            catch (err) {
                console.log(err);
            }
            try {
                let str2;
                if (process.env.get2) {
                    str2 = process.env.get2;
                }
                else {
                    str2 = this.getSecret('get2');
                }
                let result = yield this.db.one(str2, [word]);
                console.log("get: returned " + JSON.stringify(result));
                if (result) {
                    return result;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                // Failed search.
                return null;
            }
        });
    }
    getuserword(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getuserword: id = " + id);
            try {
                let str1;
                if (process.env.getuserword) {
                    str1 = process.env.getuserword;
                }
                else {
                    str1 = this.getSecret('getuserword');
                }
                let result = yield this.db.any(str1, [id]);
                console.log("get: returned " + JSON.stringify(result));
                if (result) {
                    return result;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                // Failed search.
                return null;
            }
        });
    }
    mainview(word) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get: all word = " + word);
            try {
                let str1;
                if (process.env.mainview) {
                    str1 = process.env.mainview;
                }
                else {
                    str1 = this.getSecret('mainview');
                }
                console.log(str1);
                let result = yield this.db.any(str1);
                console.log("get: returned " + JSON.stringify(result));
                if (result) {
                    return result;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                console.log(err);
                // Failed search.
                return null;
            }
        });
    }
    getDef(word, lang) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get: word = " + word + "in language " + lang);
            try {
                let str1;
                if (process.env.getDef1) {
                    str1 = process.env.getDef1;
                }
                else {
                    str1 = this.getSecret('getDef1');
                }
                let str2;
                if (process.env.getDef2) {
                    str2 = process.env.getDef2;
                }
                else {
                    str2 = this.getSecret('getDef2');
                }
                let result = yield this.db.one(str1 + lang + str2, [word]);
                console.log("get: returned " + JSON.stringify(result));
                if (result) {
                    return result;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                // Failed search.
                return null;
            }
        });
    }
    del(word) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let str1;
                if (process.env.del) {
                    str1 = process.env.del;
                }
                else {
                    str1 = this.getSecret('del');
                }
                yield this.db.none(str1, [word]);
            }
            catch (err) {
                // Not found.
                console.log('error word not found');
            }
        });
    }
    isFound(word) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("isFound: word = " + word);
            let v = yield this.get(word);
            console.log("is found result = " + v);
            if (v === null) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    // USER
    createUser(id, username, password, portrait = './a.png', registered_at, location) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("put: user id = " + id + ", password = " + password + ", portrait" + portrait);
            try {
                let str1;
                if (process.env.createUser) {
                    str1 = process.env.createUser;
                }
                else {
                    str1 = this.getSecret('createUser');
                }
                yield this.db.none(str1, [id, username, password, portrait, registered_at, location]);
                console.log('added user successfully');
            }
            catch (err) {
                console.log("username existsed!");
            }
        });
    }
    updateUser(id, username, password, portrait = './a.png', location) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("put: user id = " + id + ", password = " + password + ", portrait" + portrait);
            try {
                let str1;
                if (process.env.updateUser) {
                    str1 = process.env.updateUser;
                }
                else {
                    str1 = this.getSecret('updateUser');
                }
                yield this.db.none(str1, [id, password, username, portrait, location]);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get: id = " + id);
            try {
                let str1;
                if (process.env.getUser) {
                    str1 = process.env.getUser;
                }
                else {
                    str1 = this.getSecret('getUser');
                }
                let result = yield this.db.one(str1, id);
                console.log("get: returned " + JSON.stringify(result));
                console.log("get: value " + result.value);
                if (result) {
                    return result;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                // Failed search.
                return null;
            }
        });
    }
    delUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("DELETE");
            try {
                // DELETE
                // YOUR CODE GOES HERE
                // let result = await this.db...;
                let str1;
                if (process.env.delUser) {
                    str1 = process.env.delUser;
                }
                else {
                    str1 = this.getSecret('delUser');
                }
                let result = yield this.db.one(str1, id);
                console.log("result = " + result);
            }
            catch (err) {
                // Not found.
            }
        });
    }
    isRightPassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("password: key = " + id, password);
            let str1;
            if (process.env.isRightPassword) {
                str1 = process.env.isRightPassword;
            }
            else {
                str1 = this.getSecret('isRightPassword');
            }
            let result = yield this.db.one(str1, id);
            console.log(JSON.stringify(result));
            if (result.password === password) {
                console.log("right password!");
                return result.username;
            }
            else {
                return null;
            }
        });
    }
    userisFound(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Found user" + id);
            try {
                let str1;
                if (process.env.userisFound) {
                    str1 = process.env.userisFound;
                }
                else {
                    str1 = this.getSecret('userisFound');
                }
                let result = yield this.db.one(str1, id);
                return true;
            }
            catch (e) {
                console.log("no such user");
                return false;
            }
        });
    }
    worduserinfo(id, word) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("put: user id = " + id + ", word id = " + word);
            try {
                let str1;
                if (process.env.worduserinfo) {
                    str1 = process.env.worduserinfo;
                }
                else {
                    str1 = this.getSecret('worduserinfo');
                }
                yield this.db.none(str1, [id, word]);
                console.log('added user-word relation successfully');
            }
            catch (err) {
                console.log(err);
                console.log("not exist such word/user!");
            }
        });
    }
    // comment
    addcomment(pronunID, user, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let str1;
                if (process.env.addcomment) {
                    str1 = process.env.addcomment;
                }
                else {
                    str1 = this.getSecret('addcomment');
                }
                yield this.db.none(str1, [pronunID, user, text]);
                let result = { 'result': 'success' };
                return result;
            }
            catch (err) {
                // Not found.
                console.log(err);
                console.log('error comment insertion failed');
                return null;
            }
        });
    }
    deletecomment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let str1;
                if (process.env.deletecomment) {
                    str1 = process.env.deletecomment;
                }
                else {
                    str1 = this.getSecret('deletecomment');
                }
                yield this.db.none(str1, [id]);
                let result = { 'result': 'success' };
                return result;
            }
            catch (err) {
                // Not found.
                console.log('error comment deletion failed');
                return null;
            }
        });
    }
    getcomment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let str1;
                if (process.env.getcomment) {
                    str1 = process.env.getcomment;
                }
                else {
                    str1 = this.getSecret('getcomment');
                }
                let result = yield this.db.any(str1, [id]);
                return result;
            }
            catch (err) {
                // Not found.
                console.log('error comment retrival failed');
                return null;
            }
        });
    }
    //Pronunciation
    addPronun(word, audio, address) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let str1;
                if (process.env.addPronun) {
                    str1 = process.env.addPronun;
                }
                else {
                    str1 = this.getSecret('addPronun');
                }
                yield this.db.any(str1, [word, 'John', audio, address, 0]);
                let result = { 'result': 'success' };
                return result;
            }
            catch (err) {
                console.log('error pronunciation cannot be added');
                return null;
            }
        });
    }
    getPronun(word) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let str1;
                if (process.env.getPronun) {
                    str1 = process.env.getPronun;
                }
                else {
                    str1 = this.getSecret('getPronun');
                }
                let result = yield this.db.any(str1, [word]);
                console.log('get pronunciation for word: ' + word + ' success');
                return result;
            }
            catch (err) { //not found
                console.log('error comment deletion failed');
                return null;
            }
        });
    }
    addLikes(pronunID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let str1;
                if (process.env.addLikes1) {
                    str1 = process.env.addLikes1;
                }
                else {
                    str1 = this.getSecret('addLikes1');
                }
                yield this.db.none(str1, [pronunID]);
                let str2;
                if (process.env.addLikes2) {
                    str2 = process.env.addLikes2;
                }
                else {
                    str2 = this.getSecret('addLikes2');
                }
                let result = yield this.db.one(str2, [pronunID]);
                return result;
            }
            catch (err) { //not found
                console.log('error add likes failed');
                return null;
            }
        });
    }
    delPronun(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let str1;
                if (process.env.delPronun) {
                    str1 = process.env.delPronun;
                }
                else {
                    str1 = this.getSecret('delPronun');
                }
                yield this.db.any(str1, [id]);
                let result = { 'result': 'success' };
                return result;
            }
            catch (err) {
                console.log(err);
                console.log('error pronunciation cannot be deleted');
                return null;
            }
        });
    }
}
exports.Database = Database;
