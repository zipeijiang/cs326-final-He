const url = "http://localhost:8080/word"; // NOTE NEW URL

import { postData } from './postdata';

export function wordCreate() {

    (async () => {
        // let userName = "John";
        let doc = document;
        let wordELement = doc.getElementById("word") as HTMLInputElement;
        let defELement = doc.getElementById("definition") as HTMLInputElement;
        let langElement = doc.getElementById("languages") as HTMLInputElement;
        let imgElement = doc.getElementById("img") as HTMLInputElement;
        let outputElement =  doc.getElementById("output") as HTMLOutputElement;
        let outputImgElement =  doc.getElementById("word_img") as HTMLOutputElement;
        if (wordELement !== null && defELement !== null && langElement !== null &&imgElement !== null)  {
            let wordName = wordELement.value;
            let definition = defELement.value;
            let languages = langElement.value;
            let img = imgElement.value;
            const data = { 'word' : wordName, 'img':img ,'languages':languages, 'definition':definition}; // -- (1)
            const newURL = url + "/new"; // used to be ?name=" + counterName; -- (2)
            console.log("counterCreate: fetching " + newURL);
            const resp = await postData(newURL, data); // used to be fetch -- (3)
            
            const j = await resp.json();
            //console.log(document.getElementById("output"));
            if (j['result'] !== 'error') {
                console.log("ok")
                outputImgElement.innerHTML = "<img src= " + img +">";
                outputElement.innerHTML = "101: <b>" + wordName + ", " + definition +" in "+languages+" created.</b>";
            } else {
                console.log("error")
                outputImgElement.innerHTML = "";
                outputElement.innerHTML = "100: <b>" + wordName + ", " + definition +" in"+languages+" not found.</b>";
            }
        }
		// NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.
		else{
            outputImgElement.innerHTML = "";
            outputElement.innerHTML = "100: <b> input missing.</b>";

        }
		})();
}

export function wordRead() {
    (async () => {
        let doc = document;
        let wordELement = doc.getElementById("word_read") as HTMLInputElement;
        let outputElement =  doc.getElementById("output_get") as HTMLOutputElement;
        let outputImgElement =  doc.getElementById("output_get_img") as HTMLOutputElement;
        if(wordELement !== null && outputElement !== null && outputImgElement !== null){
            let wordName = wordELement.value;
            const data = { 'word' : wordName}; // -- (1)
            const newURL = url +"/view";
            console.log("wordRead : fetching " + newURL);
            const resp = await postData(newURL,data)
            const j = await resp.json();
            if (j['result'] !== 'error') {	
                var languagelist = j['lang']
                let langl = "<ul>";
                languagelist.forEach((num1:string)=>{
                    langl+= '<li>'+ num1 + "</li>";
                });
                langl +="<ul>";
                outputImgElement.innerHTML =  "<img id=wordimg src= " + j['img'] +">";
                outputElement.innerHTML = "typescript 201: <b>"  + wordName + ": </b>"+langl;
            } else {
                outputElement.innerHTML = "200: " +  wordName  + " not found.</b>";
                outputImgElement.innerHTML =  "";
            }	    
        } else{
            outputElement.innerHTML = "200: input word missing.</b>";
            outputImgElement.innerHTML =  "";
        }
    })();
}
export function defRead(){
	(async () => {
        let doc = document;
        let wordELement = doc.getElementById("word_getdef") as HTMLInputElement;
        let langElement = doc.getElementById("languages_getdef") as HTMLInputElement;
        let outputElement =  doc.getElementById("output_getdef") as HTMLOutputElement;
        if(wordELement!== null && langElement !== null && outputElement !== null){
            let wordName = wordELement.value;
            let lang = langElement.value;
            console.log("defRead "+wordName,lang);
            const data = { 'word' : wordName, 'languages':lang}; // -- (1)
            const newURL = url +"/getDefinitionByLanguage";
            console.log("language definition: fetching " + newURL);
            const resp = await postData(newURL,data)
            const j = await resp.json();
            console.log(j[lang]);
            if (j['result'] !== 'error') {	
                outputElement.innerHTML = "211: <b>"  + wordName + ", Definition in "+ lang + ": " +j[lang]+ ".</b>";
                
            } else {
                outputElement.innerHTML = "210: definition in" +  lang  + " not found.</b>";
        
            }	    
        } else{
            outputElement.innerHTML = "210: input missing.</b>";
        }
    })();
}
export function wordUpdate() {
	(async () => {
        let doc = document;
        let wordELement = doc.getElementById("word_update") as HTMLInputElement;
        let defElement = doc.getElementById("definition_update") as HTMLInputElement;
        let langElement = doc.getElementById("languages_update") as HTMLInputElement;
        let outputElement =  doc.getElementById("output_update") as HTMLOutputElement;
        if(wordELement!== null && langElement !== null && defElement !== null && outputElement !== null){
            let wordName = wordELement.value;
            let definition = defElement.value;
            let languages = langElement.value;
            // NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.
            const data = { 'word' : wordName, 'languages':languages, 'definition':definition}; // -- (1)
            const newURL = url + "/definition"; // used to be ?name=" + counterName; -- (2)
            console.log("counterCreate: fetching " + newURL);
            const resp = await postData(newURL, data); // used to be fetch -- (3)
            const j = await resp.json();
            if (j['result'] !== 'error') {
                console.log("update!")
                outputElement.innerHTML = "301: <b>" + wordName + ": " + definition +" in "+languages+" updated.</b>";
            } else {
                console.log("error")
                outputElement.innerHTML = "300: <b>" + wordName + ", " + definition +" in"+languages+" not found.</b>";
            }
        } else{
            outputElement.innerHTML = "300: <b> input missing.</b>";
        }
		// let userName = "John";
		
		})();
}

export function wordDelete() {
    (async () => {
        let doc = document;
        let wordELement = doc.getElementById("word_delete") as HTMLInputElement;
        let outputElement =  doc.getElementById("output_delete") as HTMLOutputElement;
        if(wordELement !== null && outputElement !== null){
            let wordName = wordELement.value;
            const data = { 'word' : wordName }; // -- (1)
            const newURL = url + "/delete"; // used to be ?name=" + counterName; -- (2)
            console.log("counterDelete: fetching " + newURL);
            const resp = await postData(newURL, data); // used to be fetch -- (3)
            const j = await resp.json();
            if (j['result'] !== 'error') {
                console.log("deleted!")
                outputElement.innerHTML = "401: <b>" + wordName + " deleted.</b>";
            } else {
                console.log("error!")
                outputElement.innerHTML = "400: " + wordName + " not found.</b>";
            }	  
        } else{
            outputElement.innerHTML = "400: input missing.</b>";
        }
	  
    })();
}
