const url="http://localhost:8080/word";
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

function uploadPronun(){
    (async()=> {
        let doc=document;
        let wordElement=doc.getElementById("word");
        let audioElement=doc.getElementById("audio");
        let addrElement=doc.getElementById("city");
        let outputElement=doc.getElementById("output");
        if(wordElement !==null && aduioElement !==null && outputElement!=null && addrElement!=null){
            let word = wordElement.value;
            let audio = audioElement.value;
            let addr = addrElement.value;
            const data={'word' : word, 'pron' : audio, 'addr': addr};
            const newURL= url + "/addpronunciation";
            console.log("language definition: fetching" + newURL);
            const resp= await postData(newURL, data);
            const j = await resp.json();
            if(j['result'] !== 'error'){
                outputElement.innerHTML = "<b> Success! </b>";
            }
            else{
                outputElement.innerHTML = "210: Error: Pronunciation Updation Failed</br>";
            }
        } else{
            outputElement.innerHTML = "210: input missing.</br>";
        }
    })();
}