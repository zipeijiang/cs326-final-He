// let url2 = "https://fierce-chamber-78001.herokuapp.com/";
let url2 = "https://frozen-castle-51130.herokuapp.com/public";
let url = "https://frozen-castle-51130.herokuapp.com/public/word";
import {postData} from "./postdata";
// import {User} from "./write_user_info";
let USER_LOGIN :string;
let temp:any;
export function userCreate() {

    (async () => {
        // let userName = "John";
        let doc = document;
        let idElement = doc.getElementById("id") as HTMLInputElement;
        let userElement = doc.getElementById("username") as HTMLInputElement;
        let passElement = doc.getElementById("password") as HTMLInputElement;
        let locationElement = doc.getElementById("location") as HTMLInputElement;
        let imgElement = doc.getElementById("portrait") as HTMLInputElement;
        if (userElement !== null && passElement !== null && locationElement !== null &&imgElement !== null && idElement!==null)  {
            let id = idElement.value;
            let userName = userElement.value;
            let location = locationElement.value;
            let password = passElement.value;
            let img = imgElement.value;
            const data = { 'id':id,'username' : userName, 'portrait':img ,'location':location, 'password':password}; // -- (1)
            const newURL = url2 + "/signup"; // used to be ?name=" + counterName; -- (2)
            console.log("user: signup " + newURL);
            const resp = await postData(newURL, data); // used to be fetch -- (3)           
            const j = await resp.json();
  
        }
		// NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.

		})();
}

export function userLogin() {
    
    (async () => {
        let doc = document;
        let idElement = doc.getElementById("login_id") as HTMLInputElement;
        let passElement =  doc.getElementById("login_password") as HTMLOutputElement;
        
        if(idElement !== null && passElement !== null){
            
            let id = idElement.value;
            let password = passElement.value;
            const data = { 'id' : id,'password':password}; // -- (1)
            console.log(data);
            const newURL = url2 +"/login";
            console.log("userData : fetching " + newURL);
            const resp = await postData(newURL,data)
            const j = await resp.json();
            console.log(j);
            let output = document!.getElementById("output-login") as HTMLOutputElement;
            if (j['result'] == 'ok') {	
                output!.innerHTML = "Welcome: <b>"  + id + ", " + j['username']  + "</b>";
                USER_LOGIN = id;
                let a = doc.getElementById("navbarDropdown2") as HTMLOutputElement;
                temp = a;
                let b = doc.getElementById("navbarDropdown3") as HTMLOutputElement;
                a.remove();
                b.style.visibility = 'visible';
                b!.innerHTML="Hi "+USER_LOGIN;
                // const userinfo = new User(id);
                // userinfo.createFile();
            } else if (j['result'] == 'error'){
                output!.innerHTML = "Sorry: <b>"  + id + "wrong password"  + "</b>";
            }else{
                output!.innerHTML = "Sorry: <b>"  + id + "not found"  + "</b>";
               

            }   
        }
    })();    
    
}
            
export function userChange() {

    (async () => {
        // let userName = "John";
        
        let doc = document;
        let userElement = doc.getElementById("username-changed") as HTMLInputElement;
        let passElement = doc.getElementById("password-changed") as HTMLInputElement;
        let locationElement = doc.getElementById("location-changed") as HTMLInputElement;
        let imgElement = doc.getElementById("portrait-changed") as HTMLInputElement;
        console.log(imgElement);
        if (userElement !== null && passElement !== null && locationElement !== null &&imgElement !== null  )  {
            console.log('fuck');
            let id = USER_LOGIN;
            let userName = userElement.value;
            let location = locationElement.value;
            let password = passElement.value;
            let img = imgElement.value;
            const data = { 'id':id,'username' : userName, 'portrait':img ,'location':location, 'password':password}; // -- (1)
            
            const newURL = url2 + "/changeinfo"; // used to be ?name=" + counterName; -- (2)
            console.log("user: changeinfo " + newURL);
            const resp = await postData(newURL, data); // used to be fetch -- (3)           
            const j = await resp.json();
            console.log(j);
            let output = document!.getElementById("output-changed") as HTMLOutputElement;
            if (j['result'] == 'changed') {	
                output!.innerHTML = id+" changed to: <b>"+userName+" in "+location+ "</b>";
        }
    }
		// NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.

        })();
        
        
}
export function userSignout() {

    (async () => {
        location.reload();
        // let userName = "John";
        // let doc = document;
        // let b = doc.getElementById("navbarDropdown3") as HTMLOutputElement;
        // b = temp;
        // b.style.visibility = 'invisible';
        // b!.innerHTML="Hi "+USER_LOGIN;
		// NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.
        })();
        
        
}

            
export function wordLoad() {

    (async () => {
        // let userName = "John";
        
            const newURL = url2 + "/mainview"; // used to be ?name=" + counterName; -- (2)
            const data = {};
            console.log("user: changeinfo " + newURL);
            const resp = await postData(newURL,data); // used to be fetch -- (3)           
            const j = await resp.json();
            console.log(j);
            let output = document!.getElementById("card-deck") as HTMLOutputElement;
            console.log(output);
            let name:string = "";
            
            let s:string = "";
            for (var item of j) {
                
                name = `onclick = "javascript: window.location.href='wordPage.html?name=${item['word']}'"`;
                s += "<div class='card'><img class='card-img-top' src='"+item['img']+"' alt='Card image cap'"+name+">"+
                    "<div class='card-body'>"+
                    "<h5 class='card-title'>"+item['word']+"</h5>"+
                    "<p class='card-text'>"+item['lang']+"</p>"+
                    "</div>"+
                    "<div class='card-footer'>"+
                    "<small class='text-muted'>Last updated 3 mins ago</small>"+
                    "</div></div>\n";
                }
            output!.innerHTML = s;
    }
		// NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.

        )();
        
        
}


window.onload = wordLoad;

// WORD LIST
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


