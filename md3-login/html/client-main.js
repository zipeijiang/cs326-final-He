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
// let url2 = "https://fierce-chamber-78001.herokuapp.com/";
let url2 = "http://localhost:8080/public";
const postdata_1 = require("./postdata");
// import {User} from "./write_user_info";
let USER_LOGIN;
function userCreate() {
    (() => __awaiter(this, void 0, void 0, function* () {
        // let userName = "John";
        let doc = document;
        let idElement = doc.getElementById("id");
        let userElement = doc.getElementById("username");
        let passElement = doc.getElementById("password");
        let locationElement = doc.getElementById("location");
        let imgElement = doc.getElementById("portrait");
        if (userElement !== null && passElement !== null && locationElement !== null && imgElement !== null && idElement !== null) {
            let id = idElement.value;
            let userName = userElement.value;
            let location = locationElement.value;
            let password = passElement.value;
            let img = imgElement.value;
            const data = { 'id': id, 'username': userName, 'portrait': img, 'location': location, 'password': password }; // -- (1)
            const newURL = url2 + "/signup"; // used to be ?name=" + counterName; -- (2)
            console.log("user: signup " + newURL);
            const resp = yield postdata_1.postData(newURL, data); // used to be fetch -- (3)           
            const j = yield resp.json();
        }
        // NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.
    }))();
}
exports.userCreate = userCreate;
function userLogin() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let doc = document;
        let idElement = doc.getElementById("login_id");
        let passElement = doc.getElementById("login_password");
        if (idElement !== null && passElement !== null) {
            let id = idElement.value;
            let password = passElement.value;
            const data = { 'id': id, 'password': password }; // -- (1)
            console.log(data);
            const newURL = url2 + "/login";
            console.log("userData : fetching " + newURL);
            const resp = yield postdata_1.postData(newURL, data);
            const j = yield resp.json();
            console.log(j);
            let output = document.getElementById("output-login");
            if (j['result'] == 'ok') {
                output.innerHTML = "Welcome: <b>" + id + ", " + j['username'] + "</b>";
                USER_LOGIN = id;
                let a = doc.getElementById("navbarDropdown2");
                let b = doc.getElementById("navbarDropdown3");
                a.remove();
                b.style.visibility = 'visible';
                b.innerHTML = "Hi " + USER_LOGIN;
                // const userinfo = new User(id);
                // userinfo.createFile();
            }
            else if (j['result'] == 'error') {
                output.innerHTML = "Sorry: <b>" + id + "wrong password" + "</b>";
            }
            else {
                output.innerHTML = "Sorry: <b>" + id + "not found" + "</b>";
            }
        }
    }))();
}
exports.userLogin = userLogin;
function userChange() {
    (() => __awaiter(this, void 0, void 0, function* () {
        // let userName = "John";
        let doc = document;
        let userElement = doc.getElementById("username-changed");
        let passElement = doc.getElementById("password-changed");
        let locationElement = doc.getElementById("location-changed");
        let imgElement = doc.getElementById("portrait-changed");
        console.log(imgElement);
        if (userElement !== null && passElement !== null && locationElement !== null && imgElement !== null) {
            console.log('fuck');
            let id = USER_LOGIN;
            let userName = userElement.value;
            let location = locationElement.value;
            let password = passElement.value;
            let img = imgElement.value;
            const data = { 'id': id, 'username': userName, 'portrait': img, 'location': location, 'password': password }; // -- (1)
            const newURL = url2 + "/changeinfo"; // used to be ?name=" + counterName; -- (2)
            console.log("user: changeinfo " + newURL);
            const resp = yield postdata_1.postData(newURL, data); // used to be fetch -- (3)           
            const j = yield resp.json();
            console.log(j);
            let output = document.getElementById("output-changed");
            if (j['result'] == 'changed') {
                output.innerHTML = id + " changed to: <b>" + userName + " in " + location + "</b>";
            }
        }
        // NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.
    }))();
}
exports.userChange = userChange;
function wordLoad() {
    (() => __awaiter(this, void 0, void 0, function* () {
        // let userName = "John";
        const newURL = url2 + "/mainview"; // used to be ?name=" + counterName; -- (2)
        const data = {};
        console.log("user: changeinfo " + newURL);
        const resp = yield postdata_1.postData(newURL, data); // used to be fetch -- (3)           
        const j = yield resp.json();
        console.log(j);
        let output = document.getElementById("card-deck");
        console.log(output);
        let s = "";
        for (var item of j) {
            s += "<div class='card'><img class='card-img-top' src='" + item['img'] + "' alt='Card image cap'>" +
                "<div class='card-body'>" +
                "<h5 class='card-title'>" + item['word'] + "</h5>" +
                "<p class='card-text'>" + item['lang'] + "</p>" +
                "</div>" +
                "<div class='card-footer'>" +
                "<small class='text-muted'>Last updated 3 mins ago</small>" +
                "</div></div>\n";
        }
        output.innerHTML = s;
    })
    // NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.
    )();
}
exports.wordLoad = wordLoad;
window.onload = wordLoad;

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
