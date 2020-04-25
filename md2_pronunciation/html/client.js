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
        let doc = document;
        let pronunElement = doc.getElementById("pronunciation");
        let outputElement = doc.getElementById("output");
        if (pronunElement !== null) {
            let pronunciation = pronunElement.value;
            const data = { 'pronunciation': pronunciation}; // -- (1)
            const newURL = url + "/new"; // used to be ?name=" + counterName; -- (2)
            console.log("counterCreate: fetching " + newURL);
            const resp = yield postdata_1.postData(newURL, data); // used to be fetch -- (3)
            const j = yield resp.json();
            if (j['result'] !== 'error') {
                console.log("ok");
                outputElement.innerHTML = "101: <b>" + pronunciation + " created.</b>";
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
        if (pronunELement !== null && outputElement !== null) {
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
