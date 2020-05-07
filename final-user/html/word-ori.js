// const url = "https://frozen-castle-51130.herokuapp.com/word";
const url = "http://localhost:8080/public/word";

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

function loadPronun(){
    (async () => {

        let word = window.location.search.substring(6);
        let doc = document;
        let outputBlock =  doc.getElementById("pronunciationBlocks");
        if(outputBlock !== null){
            const data = { 'word' : word}; // -- (1)
            const newURL = url +"/getpronunciation";
            console.log("wordRead : fetching " + newURL);
            const resp = await postData(newURL,data)
            const j = await resp.json();
            if (j['result'] !== 'error') {	
                /*
                    let user = pronuns[i]['user'];
                    const userdata = {'user':user};
                    const userURL = url + "getUser";
                    const resp = await postData(userURL, userdata) */
                let insert = ''
                let pronuns = j['pronuns'];
                let commentBlock = '';
                for(let i=0; i<pronuns.length; i++){
                    commentBlock = '<div class = "comment" id = "commentblock'+ pronuns[i]['id']+'" style="display: none"> <br/>';
                    let text = '<div class="userData">'+
                    '<img src="https://www.mariowiki.com/images/thumb/2/2b/Isabelle_SSBU.png/1200px-Isabelle_SSBU.png" class="portrait">'+ //TBC
                    '<p class="names">Anonymous</p>'+ //TBC
                    '<input type="image" src="https://pngimage.net/wp-content/uploads/2018/06/speaker-button-png-.png" onclick="runPronun('+ pronuns[i]['id'] +')" class="listen"> Click to get pronunciation</input>'+
                    '<div id = "audio'+ pronuns[i]['id'] +'" style ="display:none" ><video width="320" height="240"><source src="'+ pronuns[i]['pronunciation'] +'" type="video/mp4"></video></div><br/>' +
                    '<a target="_blank" href = https://www.google.com/maps/search/'+ pronuns[i]['address'] +'>'+ pronuns[i]['address'] +'</a><br/><br/>'+
                    '<button type="button" onclick="showComment('+ pronuns[i]['id'] +')" class="btn btn-primary">Comment</button>'+
                    '<button type="button" id="like'+pronuns[i]['id']+'" onclick="likeIt('+ pronuns[i]['id'] +')" class="btn btn-primary">Like it!</button><br/>'+ 
                    '<div class = "comment" id = "commentblock'+ pronuns[i]['id']+'"> <br/></div>'+
                    '<button type="button" onclick="deletPron('+ pronuns[i]['id'] +')" class = "btn btn-danger">Delete</button><br/>'+
                    '<hr></div>' +
                    '<br/>';
                    insert = insert + text;
                }
                outputBlock.innerHTML = insert;
            } else {
                outputBlock.innerHTML = "200: " +  word  + " has no pronunciations.</b>";
            }	    
        } else{
            outputBlock.innerHTML = "200: input word missing.</b>";
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

function goToPronunPage(){
    window.location.href="upload.html";
}

function showComment(pronunID){
    (async () => {
        let doc = document;
        let outputElement = doc.getElementById("commentblock" + pronunID);

        if(outputElement !== null){

            const data = { 'pronunID': pronunID };
            const newURL = url + "/getcomment";
            const resp = await postData(newURL,data);
            const j = await resp.json();
            let insert = '';
            if (j['result'] !== 'error') {	
                let comments = j['comments'];
                for(let k=0;k<comments.length;k++){
                    insert += '<p>' + comments[k]['userid'] + ': ' + comments[k]['text'] + '</p>';
                }
                outputElement.innerHTML = insert;

                insert +='<textarea type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id = add_comment'+ pronunID + 
                '>Add your comment:</textarea><br/>'+
                '<p id = "add_comment_result'+ pronunID+'"></p>'+
                '<button type="button" id="addcomment" onclick="addComment('+pronunID+')" class="btn btn-primary">Add comment</button><br/>';
                outputElement.innerHTML = insert;
            }
            
        } else{
            outputElement.innerHTML = "<b> Error.</b>";
        }
    })();
    
}

function addComment(pronunID){
    (async () => {
        let doc = document;
        let inputElement = doc.getElementById("add_comment"+ pronunID);
        let outputElement = doc.getElementById("add_comment_result"+ pronunID);
        
        if(inputElement !== null && outputElement !== null){
            let text = inputElement.value
            const data = {'pronunID': pronunID, 'user': 'Anonymous', 'text': text }; //user name TBC
            const newURL = url + "/addcomment"; 
            const resp = await postData(newURL,data);
            const j = await resp.json();
            if (j['result'] !== 'error') {	
                outputElement.innerHTML = "<b> Success! </b>";
                location = location;
            } else {
                outputElement.innerHTML = "610: Error: Updation Failed</b>";
        
            } 
        } else{
            outputElement.innerHTML = "210: input missing.</b>";
        }
    })();
}
function runPron(pronunID){ 
    let doc = document;
    let outputElement = doc.getElementById("audio"+pronunID);
    if(outputElement !== null){
        if(outputElement.style.display=="none"){
            outputElement.style.display="";
        }else{
            outputElement.style.display="none";
        }

    }
}

function likeIt(pronunID){ //user likes pronunciation
    (async()=>{
        let doc = document;
        let outputElement = doc.getElementById("like" + pronunID);
        if(outputElement !==null){
            const data = {'pronunID' : pronunID};
            const newURL = url + "/addPronunLikes";

            const resp = await postData(newURL, data);
            const j = await resp.json();
            if(j['result'] !== 'error'){
                outputElement.innerHTML = "Like it! (" + j['likes'] + "likes)";
            }else{
                outputElement.innerHTML = "610: Error: Like Failed<br>";
            }
        }else{
            outputElement.innerHTML = "210: input missing.</br>";
        }
    })();
}

//user deletes pronunication
function deletePronun(pronunID){
    (async() =>{
        const data = {'ID' : pronunID};
        const newURL= url+"/deletePronun";

        const resp = await postData(newURL, data);
        const j = await resp.json();
        if(j['result'] !== 'error'){
            location = location;
        }else{
            outputElement.innerHTML = "710: Deletion Failed</br>";
        }
    })();
}
window.onload = function(){
    loadWord(); 
    loadPronun();}