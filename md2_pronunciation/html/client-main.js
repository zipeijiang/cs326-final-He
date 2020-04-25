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
const url = "http://localhost:8080/word"; // NOTE NEW URL
const postdata_1 = require("./postdata");
function pronuCreate() {
    (() => __awaiter(this, void 0, void 0, function* () {
        // let userName = "John";
        let doc = document;
        let pronunELement = doc.getElementById("pronunciation");
        let outputElement = doc.getElementById("output");
        if (pronunELement !== null) {
            let pronunciation = pronunELement.value;
            const data = { 'pronunciation': pronunciation}; // -- (1)
            const newURL = url + "/new"; // used to be ?name=" + counterName; -- (2)
            console.log("counterCreate: fetching " + newURL);
            const resp = yield postdata_1.postData(newURL, data); // used to be fetch -- (3)
            const j = yield resp.json();
            //console.log(document.getElementById("output"));
            if (j['result'] !== 'error') {
                console.log("ok");
                outputElement.innerHTML = "111: <b>" + pronunciation + " created.</b>";
            }
            else {
                console.log("error");
                outputElement.innerHTML = "100: <b>" + pronunciation + " not found.</b>";
            }
        }
        // NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.
        else {
            outputElement.innerHTML = "100: <b> input missing.</b>";
        }
    }))();
}
exports.pronuCreate = pronuCreate;

function pronuDelete() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let doc = document;
        let pronunELement = doc.getElementById("pronun_delete");
        let outputElement = doc.getElementById("output_delete");
        if (pronunELement !== null) {
            let pronunciation = pronunELement.value;
            const data = { 'pronunciation': pronunciation }; // -- (1)
            const newURL = url + "/delete"; // used to be ?name=" + counterName; -- (2)
            console.log("counterDelete: fetching " + newURL);
            const resp = yield postdata_1.postData(newURL, data); // used to be fetch -- (3)
            const j = yield resp.json();
            if (j['result'] !== 'error') {
                console.log("deleted!");
                outputElement.innerHTML = "401: <b>" + pronunciation + " deleted.</b>";
            }
            else {
                console.log("error!");
                outputElement.innerHTML = "400: " + pronunciation + " not found.</b>";
            }
        }
        else {
            outputElement.innerHTML = "400: input missing.</b>";
        }
    }))();
}
exports.pronuDelete = pronuDelete;

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
