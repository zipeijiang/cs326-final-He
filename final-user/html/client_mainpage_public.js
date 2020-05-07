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
let url = "http://localhost:8080/public/word";
const postdata_1 = require("./postdata");
// import {User} from "./write_user_info";
let USER_LOGIN = "";
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
                funckyhide(id);
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
function funckyhide(id) {
    let doc = document;
    USER_LOGIN = id;
    let a = doc.getElementById("navbarDropdown2");
    let b = doc.getElementById("navbarDropdown3");
    let c = doc.getElementById("dlyword");
    let d = doc.getElementById("brmyword");
    a.remove();
    b.style.visibility = 'visible';
    b.innerHTML = "Hi " + USER_LOGIN;
    if (c || d) {
        console.log("dect word");
        c.style.visibility = 'visible';
        d.style.visibility = 'visible';
    }
}
exports.funckyhide = funckyhide;
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
function autoFill() {
    (() => __awaiter(this, void 0, void 0, function* () {
        console.log("autofill");
        let doc = document;
        let userElement = doc.getElementById("username-changed");
        let passElement = doc.getElementById("password-changed");
        let locationElement = doc.getElementById("location-changed");
        let imgElement = doc.getElementById("portrait-changed");
        let id = USER_LOGIN;
        console.log(USER_LOGIN);
        const data = { 'id': id };
        const newURL = url2 + '/getuserinfo';
        const resp = yield postdata_1.postData(newURL, data); // used to be fetch -- (3)   
        const j = yield resp.json();
        console.log(j);
        userElement.value = (j['username']);
        imgElement.value = (j['portrait']);
        locationElement.value = (j['location']);
    }))();
}
exports.autoFill = autoFill;
function userSignout() {
    (() => __awaiter(this, void 0, void 0, function* () {
        location.reload();
        // let userName = "John";
        // let doc = document;
        // let b = doc.getElementById("navbarDropdown3") as HTMLOutputElement;
        // b = temp;
        // b.style.visibility = 'invisible';
        // b!.innerHTML="Hi "+USER_LOGIN;
        // NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.
    }))();
}
exports.userSignout = userSignout;
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
            let name = `onclick = "javascript: window.location.href='wordPage.html?name=${item['word']}'"`;
            s += "<div class='card'><img class='card-img-top' src='" + item['img'] + "' alt='Card image cap'" + name + ">" +
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
function jumpToWord() {
    window.location.href = "word.html?" + USER_LOGIN;
    // window.location.href ='word.html'
}
exports.jumpToWord = jumpToWord;
function checklogin() {
    console.log("check whether logging in");
    if (window.location.search.substring(1).length > 0) {
        funckyhide(window.location.search.substring(1));
    }
}
exports.checklogin = checklogin;
window.onload = wordLoad;
// WORD LIST
function wordCreate() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let id = window.location.search.substring(1);
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
            const data = { 'word': wordName, 'img': img, 'languages': languages, 'definition': definition, 'id': id }; // -- (1)
            const newURL = url + "/new";
            console.log("world Create: fetching " + newURL + data);
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
        let id = window.location.search.substring(1);
        // let wordELement = doc.getElementById("word_read") as HTMLInputElement;
        let outputElement = doc.getElementById("output_get");
        // let outputImgElement =  doc.getElementById("output_get_img") as HTMLOutputElement;
        if (id.length > 0) {
            const data = { 'id': id }; // -- (1)
            const newURL = url + "/viewuser";
            console.log("Read : fetching " + newURL + id);
            const resp = yield postdata_1.postData(newURL, data);
            const jj = yield resp.json();
            console.log(jj);
            if (jj) {
                let langl = "<ul>";
                jj.forEach((num1) => {
                    langl += "<ul><a href='http://localhost:8080/wordPage.html?name=" + num1['word'] + "'>" + num1['word'] + "</a>" + "</ul>";
                });
                langl += "<ul>";
                // outputImgElement.innerHTML =  "<img id=wordimg src= " + j['img'] +">";
                outputElement.innerHTML = "Here is the word " + id + " create:" + langl;
            }
            else {
                outputElement.innerHTML = "200: " + id + " not found.</b>";
                // outputImgElement.innerHTML =  "";
            }
        }
        //     if(wordELement !== null && outputElement !== null && outputImgElement !== null){
        //         let wordName = wordELement.value;
        //         const data = { 'word' : wordName}; // -- (1)
        //         const newURL = url +"/view";
        //         console.log("wordRead : fetching " + newURL);
        //         const resp = await postData(newURL,data)
        //         const j = await resp.json();
        //         if (j['result'] !== 'error') {	
        //             var languagelist = j['lang']
        //             let langl = "<ul>";
        //             languagelist.forEach((num1:string)=>{
        //                 langl+= '<li>'+ num1 + "</li>";
        //             });
        //             langl +="<ul>";
        //             outputImgElement.innerHTML =  "<img id=wordimg src= " + j['img'] +">";
        //             outputElement.innerHTML = "typescript 201: <b>"  + wordName + ": </b>"+langl;
        //         } else {
        //             outputElement.innerHTML = "200: " +  wordName  + " not found.</b>";
        //             outputImgElement.innerHTML =  "";
        //         }	    
        //     } else{
        //         outputElement.innerHTML = "200: input word missing.</b>";
        //         outputImgElement.innerHTML =  "";
        //     }
        // }
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
