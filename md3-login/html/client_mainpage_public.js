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
