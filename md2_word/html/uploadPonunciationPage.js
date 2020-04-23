const url = "http://localhost:8080/word"; // NOTE NEW URL

function pronCreate() {
    (async () => {
	let word = document.getElementById("word").value;   
    let pron = document.getElementById("pron").value;   
    let lang = document.getElementById("lang").value;   	
	let spelling = document.getElementById("spelling").value;   
    let addr = document.getElementById("city").value;   
	
	const data = { 'word' : word, 'pron':pron, 'addr':addr, 'language':lang, 'spelling':spelling}; // -- (1)
	
	const newURL = url + "/pronunciation";
	console.log("counterCreate: fetching " + newURL);
	const resp = await postData(newURL, data);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "501: <b> pronunciation added to '" + word +"'.</b>";
	} else {
	    document.getElementById("output").innerHTML = "500: " + word + " not found.</b>";
	}
    })();
}
