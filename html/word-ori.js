const url = "https://gentle-fortress-42768.herokuapp.com/word";

async function postData(url, data) {
    const resp = await fetch(url,
                             {
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
}

function loadWord() {
    (async () => {
        let word = window.location.search.substring(6);
        let doc = document;
        let outputElement =  doc.getElementById("test");
        let outputImgElement =  doc.getElementById("wordImg");
        let outputLangElement = doc.getElementById("language");
        if(outputElement !== null && outputImgElement !== null){
            const data = { 'word' : word}; // -- (1)
            const newURL = url +"/view";
            console.log("wordRead : fetching " + newURL);
            const resp = await postData(newURL,data)
            const j = await resp.json();
            if (j['result'] !== 'error') {	
                var languagelist = j['lang'];
                let langl = '';
                languagelist.forEach((num1) => {
                    langl += '<option value="' + num1 + '">' + num1 + '</option>';
                });
                outputImgElement.innerHTML =  "<img class='head' id=wordimg src= " + j['img'] +">";
                outputLangElement.innerHTML = langl;
                outputElement.innerHTML = "<b>"  + word + "</b>";
            } else {
                outputElement.innerHTML = "200: " +  word  + " not found.</b>";
                outputImgElement.innerHTML =  "";
            }	    
        } else{
            outputElement.innerHTML = "200: input word missing.</b>";
            outputImgElement.innerHTML =  "";
        }
    })();
}

function search(){
    (async () => {
        let doc = document;
        let wordElement = doc.getElementById("searchBar");
        let word = wordElement.value;
        
        if(word !== ''){
            window.location.href = "wordPage.html?name=" + word;
        } else{
            return 
        }
    })();
}

function defRead(){
	(async () => {
        let doc = document;
        let word = window.location.search.substring(6);
        let langElement = doc.getElementById("language");
        let outputElement =  doc.getElementById("definition");
        if(langElement !== null && outputElement !== null){
            var index= langElement.selectedIndex;
            let lang = langElement.options[index].value;
            console.log("defRead "+word,lang);
            const data = { 'word' : word, 'languages':lang}; // -- (1)
            const newURL = url +"/getDefinitionByLanguage";
            console.log("language definition: fetching " + newURL);
            const resp = await postData(newURL,data);
            const j = await resp.json();
            console.log(j['def']);
            if (j['result'] !== 'error') {	
                outputElement.innerHTML = "<b>"  + j['def']+ "</b>";
                
            } else {
                outputElement.innerHTML = "210: definition in" +  lang  + " not found.</b>";
        
            }	    
        } else{
            outputElement.innerHTML = "210: input missing.</b>";
        }
    })();
}

function showDefBar(){
	(async () => {
        let doc = document;
        let barElement = doc.getElementById("defBar");
        if(barElement !== null){
            if (barElement.style.visibility == "visible"){
                barElement.style.visibility="hidden";
            }
            else{
                barElement.style.visibility="visible";
            }
        } else{
            barElement.innerHTML = "<b> Error.</b>";
        }
    })();
}

function addDef(){
	(async () => {
        let doc = document;
        let word = window.location.search.substring(6);
        let langElement = doc.getElementById("add_lang")
        let defElement =  doc.getElementById("add_def")
        let outputElement = doc.getElementById("updateStatus");
        if(langElement !== null && defElement !== null){
            let lang = langElement.value;
            let def = defElement.value;
            const data = { 'word': word, 'languages': lang, 'definition': def };
            const newURL = url + "/definition"; 
            console.log("language definition: fetching " + newURL);
            const resp = await postData(newURL,data);
            const j = await resp.json();
            console.log(j['def']);
            if (j['result'] !== 'error') {	
                outputElement.innerHTML = "<b> Success! </b>";
                location = location;
            } else {
                outputElement.innerHTML = "210: Error: Updation Failed</b>";
        
            }    
        } else{
            outputElement.innerHTML = "210: input missing.</b>";
        }
    })();
}

window.onload = loadWord;