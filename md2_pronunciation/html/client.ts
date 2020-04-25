const url = "http://localhost:8080/word"; // NOTE NEW URL

import { postData } from './postdata';

export function pronuCreate() {

    (async () => {
        // let userName = "John";
        let doc = document;
        let pronunElement = doc.getElementById("pronunciation") as HTMLInputElement;
        let outputElement =  doc.getElementById("output") as HTMLOutputElement;
        if (pronunElement !== null)  {
            let pronunciation = pronunElement.value;
            const data = { 'pronunciation' : pronunciation}; // -- (1)
            const newURL = url + "/new"; // used to be ?name=" + counterName; -- (2)
            console.log("counterCreate: fetching " + newURL);
            const resp = await postData(newURL, data); // used to be fetch -- (3)
            
            const j = await resp.json();
            //console.log(document.getElementById("output"));
            if (j['result'] !== 'error') {
                console.log("ok")
                outputElement.innerHTML = "101: <b>" + pronunciation +" created.</b>";
            } else {
                console.log("error")
                outputElement.innerHTML = "100: <b>" + pronunciation +" not found.</b>";
            }
        }
		// NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.
		else{
            outputElement.innerHTML = "100: <b> input missing.</b>";

        }
		})();
}


export function pronuDelete() {
    (async () => {
        let doc = document;
        let pronunELement = doc.getElementById("pronun_delete") as HTMLInputElement;
        let outputElement =  doc.getElementById("output_delete") as HTMLOutputElement;
        if(pronunELement !== null && outputElement !== null){
            let pronunciation = pronunELement.value;
            const data = { 'pronunciation' : pronunciation }; // -- (1)
            const newURL = url + "/delete"; // used to be ?name=" + counterName; -- (2)
            console.log("counterDelete: fetching " + newURL);
            const resp = await postData(newURL, data); // used to be fetch -- (3)
            const j = await resp.json();
            if (j['result'] !== 'error') {
                console.log("deleted!")
                outputElement.innerHTML = "401: <b>" + pronunciation + " deleted.</b>";
            } else {
                console.log("error!")
                outputElement.innerHTML = "400: " + pronunciation + " not found.</b>";
            }	  
        } else{
            outputElement.innerHTML = "400: input missing.</b>";
        }
	  
    })();
}
