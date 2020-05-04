const url = "http://localhost:8080/word/new"; // NOTE NEW URL

function wordCreate() {
    (async () => {
    let wordName = document.getElementById("spelling").value;   
	let counterName = document.getElementById("myfile").value;
	// let userName = document.getElementById("username").value;
	const newURL = url + "/word/new?name=" + counterName;
	console.log("counterCreate: fetching " + newURL);
	const resp = await fetch(newURL);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "101: <b>" + wordName + ", " + counterName + " created.</b>";
	} else {
	    document.getElementById("output").innerHTML = "100: " + wordName + ", " + counterName + " not found.</b>";
	}
    })();
}
