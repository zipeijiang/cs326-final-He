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
const url = "https://frozen-castle-51130.herokuapp.com/word"; // NOTE NEW URL
const postdata_1 = require("./postdata");
function wordCreate() {
    (() => __awaiter(this, void 0, void 0, function* () {
        // let userName = "John";
        let doc = document;
        let wordELement = doc.getElementById("word");
        let defELement = doc.getElementById("definition");
        let langElement = doc.getElementById("languages");
        let imgElement = doc.getElementById("img");
        let outputElement = doc.getElementById("output");
        let outputImgElement = doc.getElementById("word_img");
        if (wordELement !== null && defELement !== null && langElement !== null && imgElement !== null) {
            let wordName = wordELement.value;
            let definition = defELement.value;
            let languages = langElement.value;
            let img = imgElement.value;
            const data = { 'word': wordName, 'img': img, 'languages': languages, 'definition': definition }; // -- (1)
            const newURL = url + "/new"; // used to be ?name=" + counterName; -- (2)
            console.log("counterCreate: fetching " + newURL);
            const resp = yield postdata_1.postData(newURL, data); // used to be fetch -- (3)
            const j = yield resp.json();
            //console.log(document.getElementById("output"));
            if (j['result'] !== 'error') {
                console.log("ok");
                outputImgElement.innerHTML = "<img src= " + img + ">";
                outputElement.innerHTML = "111: <b>" + wordName + ", " + definition + " in " + languages + " created.</b>";
            }
            else {
                console.log("error");
                outputImgElement.innerHTML = "";
                outputElement.innerHTML = "100: <b>" + wordName + ", " + definition + " in" + languages + " not found.</b>";
            }
        }
        // NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.
        else {
            outputImgElement.innerHTML = "";
            outputElement.innerHTML = "100: <b> input missing.</b>";
        }
    }))();
}
exports.wordCreate = wordCreate;
function wordRead() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let doc = document;
        let wordELement = doc.getElementById("word_read");
        let outputElement = doc.getElementById("output_get");
        let outputImgElement = doc.getElementById("output_get_img");
        if (wordELement !== null && outputElement !== null && outputImgElement !== null) {
            let wordName = wordELement.value;
            const data = { 'word': wordName }; // -- (1)
            const newURL = url + "/view";
            console.log("wordRead : fetching " + newURL);
            const resp = yield postdata_1.postData(newURL, data);
            const j = yield resp.json();
            if (j['result'] !== 'error') {
                var languagelist = j['lang'];
                let langl = "<ul>";
                languagelist.forEach((num1) => {
                    langl += '<li>' + num1 + "</li>";
                });
                langl += "<ul>";
                outputImgElement.innerHTML = "<img id=wordimg src= " + j['img'] + ">";
                outputElement.innerHTML = "typescript 201: <b>" + wordName + ": </b>" + langl;
            }
            else {
                outputElement.innerHTML = "200: " + wordName + " not found.</b>";
                outputImgElement.innerHTML = "";
            }
        }
        else {
            outputElement.innerHTML = "200: input word missing.</b>";
            outputImgElement.innerHTML = "";
        }
    }))();
}
exports.wordRead = wordRead;
function defRead() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let doc = document;
        let wordELement = doc.getElementById("word_getdef");
        let langElement = doc.getElementById("languages_getdef");
        let outputElement = doc.getElementById("output_getdef");
        if (wordELement !== null && langElement !== null && outputElement !== null) {
            let wordName = wordELement.value;
            let lang = langElement.value;
            console.log("defRead " + wordName, lang);
            const data = { 'word': wordName, 'languages': lang }; // -- (1)
            const newURL = url + "/getDefinitionByLanguage";
            console.log("language definition: fetching " + newURL);
            const resp = yield postdata_1.postData(newURL, data);
            const j = yield resp.json();
            console.log(j[lang]);
            if (j['result'] !== 'error') {
                outputElement.innerHTML = "211: <b>" + wordName + ", Definition in " + lang + ": " + j[lang] + ".</b>";
            }
            else {
                outputElement.innerHTML = "210: definition in" + lang + " not found.</b>";
            }
        }
        else {
            outputElement.innerHTML = "210: input missing.</b>";
        }
    }))();
}
exports.defRead = defRead;
function wordUpdate() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let doc = document;
        let wordELement = doc.getElementById("word_update");
        let defElement = doc.getElementById("definition_update");
        let langElement = doc.getElementById("languages_update");
        let outputElement = doc.getElementById("output_update");
        if (wordELement !== null && langElement !== null && defElement !== null && outputElement !== null) {
            let wordName = wordELement.value;
            let definition = defElement.value;
            let languages = langElement.value;
            // NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.
            const data = { 'word': wordName, 'languages': languages, 'definition': definition }; // -- (1)
            const newURL = url + "/definition"; // used to be ?name=" + counterName; -- (2)
            console.log("counterCreate: fetching " + newURL);
            const resp = yield postdata_1.postData(newURL, data); // used to be fetch -- (3)
            const j = yield resp.json();
            if (j['result'] !== 'error') {
                console.log("update!");
                outputElement.innerHTML = "301: <b>" + wordName + ": " + definition + " in " + languages + " updated.</b>";
            }
            else {
                console.log("error");
                outputElement.innerHTML = "300: <b>" + wordName + ", " + definition + " in" + languages + " not found.</b>";
            }
        }
        else {
            outputElement.innerHTML = "300: <b> input missing.</b>";
        }
        // let userName = "John";
    }))();
}
exports.wordUpdate = wordUpdate;
function wordDelete() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let doc = document;
        let wordELement = doc.getElementById("word_delete");
        let outputElement = doc.getElementById("output_delete");
        if (wordELement !== null && outputElement !== null) {
            let wordName = wordELement.value;
            const data = { 'word': wordName }; // -- (1)
            const newURL = url + "/delete"; // used to be ?name=" + counterName; -- (2)
            console.log("counterDelete: fetching " + newURL);
            const resp = yield postdata_1.postData(newURL, data); // used to be fetch -- (3)
            const j = yield resp.json();
            if (j['result'] !== 'error') {
                console.log("deleted!");
                outputElement.innerHTML = "401: <b>" + wordName + " deleted.</b>";
            }
            else {
                console.log("error!");
                outputElement.innerHTML = "400: " + wordName + " not found.</b>";
            }
        }
        else {
            outputElement.innerHTML = "400: input missing.</b>";
        }
    }))();
}
exports.wordDelete = wordDelete;

},{"./postdata":2}],2:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
