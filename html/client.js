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
const url = "https://gentle-bayou-51373.herokuapp.com/word"; // NOTE NEW URL
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
                outputElement.innerHTML = "101: <b>" + wordName + ", " + definition + " in " + languages + " created.</b>";
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
