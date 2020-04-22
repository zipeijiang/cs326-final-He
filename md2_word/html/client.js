const url = "http://0.0.0.0:8080/word"; // NOTE NEW URL

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

function wordCreate() {
    (async () => {
		
		// let userName = "John";
		let wordName = document.getElementById("word").value;
		let definition = document.getElementById("definition").value;
		let languages = document.getElementById("languages").value;
		// NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.
		const data = { 'word' : wordName, 'img':'./haha.png','languages':languages, 'definition':definition}; // -- (1)
		const newURL = url + "/new"; // used to be ?name=" + counterName; -- (2)
		console.log("counterCreate: fetching " + newURL);
		const resp = await postData(newURL, data); // used to be fetch -- (3)
		const j = await resp.json();
		console.log(document.getElementById("output"));
		if (j['result'] !== 'error') {
			console.log("ok")
			document.getElementById("output").innerHTML = "101: <b>" + wordName + ", " + definition +" in "+languages+" created.</b>";
		} else {
			console.log("errpr")
			document.getElementById("output").innerHTML = "100: <b>" + wordName + ", " + definition +" in"+languages+" not found.</b>";
		}
		})();
}

function wordRead() {
    (async () => {
	let wordName = document.getElementById("word_read").value;
	// let userName = "John";
	const data = { 'word' : wordName}; // -- (1)
	const newURL = url +"/view";
	console.log("counterRead: fetching " + newURL);
	const resp = await postData(newURL,data)
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "201: <b>"  + j[img] + "," + wordName + ", " + j[definition] +" in "+j[languages]+ "</b>";
	} else {
	    document.getElementById("output").innerHTML = "200: " +  wordName  + " not found.</b>";
	}	    
    })();
}

function wordUpdate() {
	(async () => {
		
		// let userName = "John";
		let wordName = document.getElementById("word_update").value;
		let definition = document.getElementById("definition_update").value;
		let languages = document.getElementById("languages_update").value;
		// NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.
		const data = { 'word' : wordName, 'img':'./haha.png','languages':languages, 'definition':definition}; // -- (1)
		const newURL = url + "/definition"; // used to be ?name=" + counterName; -- (2)
		console.log("counterCreate: fetching " + newURL);
		const resp = await postData(newURL, data); // used to be fetch -- (3)
		const j = await resp.json();
		if (j['result'] !== 'error') {
			console.log("update!")
			document.getElementById("output").innerHTML = "301: <b>" + wordName + ": " + definition +" in "+languages+" updated.</b>";
		} else {
			console.log("error")
			document.getElementById("output").innerHTML = "300: <b>" + wordName + ", " + definition +" in"+languages+" not found.</b>";
		}
		})();
}

function wordDelete() {
    (async () => {
	let wordName = document.getElementById("word_delete").value;
	const data = { 'word' : wordName }; // -- (1)
	const newURL = url + "/delete"; // used to be ?name=" + counterName; -- (2)
	console.log("counterDelete: fetching " + newURL);
	const resp = await postData(newURL, data); // used to be fetch -- (3)
	const j = await resp.json();
	if (j['result'] !== 'error') {
		console.log("deleted!")
	    document.getElementById("output").innerHTML = "401: <b>" + wordName + " deleted.</b>";
	} else {
		console.log("error!")
	    document.getElementById("output").innerHTML = "400: " + wordName + " not found.</b>";
	}	    
    })();
}
