// let url2 = "https://fierce-chamber-78001.herokuapp.com/";
let url2 = "http://localhost:8080/public";
import {postData} from "./postdata";
// import {User} from "./write_user_info";
let USER_LOGIN :string;
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
            
            let s:string = "";
            for (var item of j) {
                s += "<div class='card'><img class='card-img-top' src='"+item['img']+"' alt='Card image cap'>"+
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

