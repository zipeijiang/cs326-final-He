const url="https://frozen-castle-51130.herokuapp.com/public/word";
import {postData} from "./postdata";

function uploadPronun(){
    (async()=> {
        let doc=document;
        let wordElement=doc.getElementById("word") as HTMLInputElement;
        let audioElement=doc.getElementById("audio") as HTMLInputElement;
        let addrElement=doc.getElementById("city") as HTMLInputElement;
        let outputElement=doc.getElementById("output");
        if(wordElement !==null && audioElement !==null && outputElement!=null && addrElement!=null){
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
        }
    })();
}