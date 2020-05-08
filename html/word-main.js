(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.client = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
function postData(url, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        });
        return resp;
    });
}
exports.postData = postData;

},{}],2:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
const url = "https://frozen-castle-51130.herokuapp.com/public/word";
const postdata_1 = require("./postdata");
function loadWord() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let word = window.location.search.substring(6);
        let doc = document;
        let outputElement = doc.getElementById("test");
        let outputImgElement = doc.getElementById("wordImg");
        let outputLangElement = doc.getElementById("language");
        if (outputElement !== null && outputImgElement !== null) {
            const data = { 'word': word }; // -- (1)
            const newURL = url + "/view";
            console.log("wordRead : fetching " + newURL);
            const resp = yield postdata_1.postData(newURL, data);
            const j = yield resp.json();
            if (j['result'] !== 'error') {
                var languagelist = j['lang'];
                let langl = '';
                languagelist.forEach((num1) => {
                    langl += '<option value="' + num1 + '">' + num1 + '</option>';
                });
                outputImgElement.innerHTML = "<img class='head' id=wordimg src= " + j['img'] + ">";
                outputLangElement.innerHTML = langl;
                outputElement.innerHTML = "<b>" + word + "</b>";
            }
            else {
                outputElement.innerHTML = "200: " + word + " not found.</b>";
                outputImgElement.innerHTML = "";
            }
        }
    }))();
}
exports.loadWord = loadWord;
function loadPronun() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let word = window.location.search.substring(6);
        let doc = document;
        let outputBlock = doc.getElementById("pronunciationBlocks");
        if (outputBlock !== null) {
            const data = { 'word': word }; // -- (1)
            const newURL = url + "/getpronunciation";
            console.log("wordRead : fetching " + newURL);
            const resp = yield postdata_1.postData(newURL, data);
            const j = yield resp.json();
            if (j['result'] !== 'error') {
                /*
                    let user = pronuns[i]['user'];
                    const userdata = {'user':user};
                    const userURL = url + "getUser";
                    const resp = await postData(userURL, userdata) */
                let insert = '';
                let pronuns = j['pronuns'];
                let commentBlock = '';
                for (let i = 0; i < pronuns.length; i++) {
                    commentBlock = '<div class = "comment" id = "commentblock' + pronuns[i]['id'] + '" style="display: none"> <br/>';
                    let text = '<div class="userData">' +
                        '<img src="https://www.mariowiki.com/images/thumb/2/2b/Isabelle_SSBU.png/1200px-Isabelle_SSBU.png" class="portrait">' + //TBC
                        '<p class="names">Anonymous</p>' + //TBC
                        '<input type="image" src="https://pngimage.net/wp-content/uploads/2018/06/speaker-button-png-.png" onclick="client.runPron(' + pronuns[i]['id'] + ')" class="listen"> Click to get pronunciation</input>' +
                        '<div id = "audio' + pronuns[i]['id'] + '" style ="display:none" >' + '<iframe width="560" height="315" src="' + pronuns[i]['pronunciation'] + '" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' + '</div><br/>' +
                        '<a target="_blank" href = https://www.google.com/maps/search/' + pronuns[i]['address'] + '>' + pronuns[i]['address'] + '</a><br/><br/>' +
                        '<button type="button" onclick="client.showComment(' + pronuns[i]['id'] + ')" class="btn btn-primary">Comment</button>' +
                        '<button type="button" id="like' + pronuns[i]['id'] + '" onclick="client.likeIt(' + pronuns[i]['id'] + ')" class="btn btn-primary">Like it!</button><br/>' +
                        '<div class = "comment" id = "commentblock' + pronuns[i]['id'] + '"> <br/></div>' +
                        '<button type="button" onclick="client.deletePronun(' + pronuns[i]['id'] + ')" class = "btn btn-danger">Delete</button><br/>' +
                        '<hr></div>' +
                        '<br/>';
                    insert = insert + text;
                }
                outputBlock.innerHTML = insert;
            }
            else {
                outputBlock.innerHTML = "200: " + word + " has no pronunciations.</b>";
            }
        }
    }))();
}
exports.loadPronun = loadPronun;
function search() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let doc = document;
        let wordElement = doc.getElementById("searchBar");
        let word = wordElement.value;
        if (word !== '') {
            window.location.href = "wordPage.html?name=" + word;
        }
        else {
            return;
        }
    }))();
}
exports.search = search;
function defRead() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let doc = document;
        let word = window.location.search.substring(6);
        let langElement = doc.getElementById("language");
        let outputElement = doc.getElementById("definition");
        if (langElement !== null && outputElement !== null) {
            var index = langElement.selectedIndex;
            let lang = langElement.options[index].value;
            console.log("defRead " + word, lang);
            const data = { 'word': word, 'languages': lang }; // -- (1)
            const newURL = url + "/getDefinitionByLanguage";
            console.log("language definition: fetching " + newURL);
            const resp = yield postdata_1.postData(newURL, data);
            const j = yield resp.json();
            console.log(j['def']);
            if (j['result'] !== 'error') {
                outputElement.innerHTML = "<b>" + j['def'] + "</b>";
            }
            else {
                outputElement.innerHTML = "210: definition in" + lang + " not found.</b>";
            }
        }
    }))();
}
exports.defRead = defRead;
function showDefBar() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let doc = document;
        let barElement = doc.getElementById("defBar");
        if (barElement !== null) {
            if (barElement.style.visibility == "visible") {
                barElement.style.visibility = "hidden";
            }
            else {
                barElement.style.visibility = "visible";
            }
        }
    }))();
}
exports.showDefBar = showDefBar;
function addDef() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let doc = document;
        let word = window.location.search.substring(6);
        let langElement = doc.getElementById("add_lang");
        let defElement = doc.getElementById("add_def");
        let outputElement = doc.getElementById("updateStatus");
        if (langElement !== null && defElement !== null) {
            let lang = langElement.value;
            let def = defElement.value;
            const data = { 'word': word, 'languages': lang, 'definition': def };
            const newURL = url + "/definition";
            console.log("language definition: fetching " + newURL);
            const resp = yield postdata_1.postData(newURL, data);
            const j = yield resp.json();
            console.log(j['def']);
            if (j['result'] !== 'error') {
                outputElement.innerHTML = "<b> Success! </b>";
                location = location;
            }
            else {
                outputElement.innerHTML = "210: Error: Updation Failed</b>";
            }
        }
    }))();
}
exports.addDef = addDef;
function goToPronunPage() {
    window.location.href = "upload.html";
}
exports.goToPronunPage = goToPronunPage;
function showComment(pronunID) {
    (() => __awaiter(this, void 0, void 0, function* () {
        let doc = document;
        let outputElement = doc.getElementById("commentblock" + pronunID);
        if (outputElement !== null) {
            const data = { 'pronunID': pronunID };
            const newURL = url + "/getcomment";
            const resp = yield postdata_1.postData(newURL, data);
            const j = yield resp.json();
            let insert = '';
            if (j['result'] !== 'error') {
                let comments = j['comments'];
                for (let k = 0; k < comments.length; k++) {
                    insert += '<p>' + comments[k]['userid'] + ': ' + comments[k]['text'] + '</p>';
                }
                outputElement.innerHTML = insert;
                insert += '<textarea type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id = add_comment' + pronunID +
                    '>Add your comment:</textarea><br/>' +
                    '<p id = "add_comment_result' + pronunID + '"></p>' +
                    '<button type="button" id="addcomment" onclick="client.addComment(' + pronunID + ')" class="btn btn-primary">Add comment</button><br/>';
                outputElement.innerHTML = insert;
            }
        }
    }))();
}
exports.showComment = showComment;
function addComment(pronunID) {
    (() => __awaiter(this, void 0, void 0, function* () {
        let doc = document;
        let inputElement = doc.getElementById("add_comment" + pronunID);
        let outputElement = doc.getElementById("add_comment_result" + pronunID);
        if (inputElement !== null && outputElement !== null) {
            let text = inputElement.value;
            const data = { 'pronunID': pronunID, 'user': 'Anonymous', 'text': text }; //user name TBC
            const newURL = url + "/addcomment";
            const resp = yield postdata_1.postData(newURL, data);
            const j = yield resp.json();
            if (j['result'] !== 'error') {
                outputElement.innerHTML = "<b> Success! </b>";
                location = location;
            }
            else {
                outputElement.innerHTML = "610: Error: Updation Failed</b>";
            }
        }
    }))();
}
exports.addComment = addComment;
function runPron(pronunID) {
    let doc = document;
    let outputElement = doc.getElementById("audio" + pronunID);
    if (outputElement !== null) {
        if (outputElement.style.display == "none") {
            outputElement.style.display = "";
        }
        else {
            outputElement.style.display = "none";
        }
    }
}
exports.runPron = runPron;
function likeIt(pronunID) {
    (() => __awaiter(this, void 0, void 0, function* () {
        let doc = document;
        let outputElement = doc.getElementById("like" + pronunID);
        if (outputElement !== null) {
            const data = { 'pronunID': pronunID };
            const newURL = url + "/addPronunLikes";
            const resp = yield postdata_1.postData(newURL, data);
            const j = yield resp.json();
            if (j['result'] !== 'error') {
                outputElement.innerHTML = "Like it! (" + j['likes'] + "likes)";
            }
            else {
                outputElement.innerHTML = "610: Error: Like Failed<br>";
            }
        }
    }))();
}
exports.likeIt = likeIt;
//user deletes pronunication
function deletePronun(pronunID) {
    (() => __awaiter(this, void 0, void 0, function* () {
        const data = { 'pronunID': pronunID };
        const newURL = url + "/deletePronun";
        const resp = yield postdata_1.postData(newURL, data);
        const j = yield resp.json();
        if (j['result'] !== 'error') {
            location = location;
        }
    }))();
}
exports.deletePronun = deletePronun;
window.onload = function () {
    loadWord();
    loadPronun();
};

},{"./postdata":1}]},{},[2])(2)
});
