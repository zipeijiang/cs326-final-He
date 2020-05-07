import { eventNames } from "cluster";

export class Database {
    private pgp = require('pg-promise')();
    // private uri = "postgres://ilixcuof:jQzvSECVMmriwhIGpD8DNrgTli8pUYzU@drona.db.elephantsql.com:5432/ilixcuof";
    private uri = "	postgres://ojpwxumh:9CuukrU1JM6Hm4UMFdc1wActdKccHkU-@drona.db.elephantsql.com:5432/ojpwxumh";
    private db: any;
    private dbName : string;
    constructor(dbName : string) {
        // this.dbName = dbName;
        this.dbName = 'ojpwxumh';
        this.db = this.pgp(this.uri);
        (async () => {
            try {
            //word table
                let str1;
                if (process.env.creteWordTable){
                    str1 = process.env.creteWordTable;
                } else{
                    str1 = this.getSecret('createWordTable');
                }   
                await this.db.none(str1);
                 } catch (e) {
                    console.log('wordTable Already created.');
                }
             try {
            // userinfo table
                let str2;
                if (process.env.createUserInfo){
                    str2 = process.env.createUserInfo;
                } else{
                    str2 = this.getSecret('createUserInfo');
                }   
                await this.db.none(str2);

                } catch (e) {
                 console.log('Already created userinfo table.');
                }
            try {
                let str3;
                // userword tablelet str2;
                if (process.env.createUserWord){
                    str3 = process.env.createUserWord;
                } else{
                    str3 = this.getSecret('createUserWord');
                } 
                await this.db.none(str3);    

            } catch (e) {
            console.log('Already created userword table.');
            }
            try{
                let str4;
                // userword tablelet str2;
                if (process.env.createPronTable){
                    str4 = process.env.createPronTable;
                } else{
                    str4 = this.getSecret('createPronTable');
                }
                await this.db.none(str4);
            } catch (e){
                console.log('Already created pronTable.');
            }
            try {
                let str5;
                // userword tablelet str2;
                if (process.env.createComment){
                    str5 = process.env.createComment;
                } else{
                    str5 = this.getSecret('createComment');
                }
                await this.db.none(str5);
                 
                } catch (e) {

                console.log('comment Already created.');      
            }
            //pronunTable
          


        })();
    }
    //create a new word or update img of an existing word (doesn't update definition!)

    public getSecret(key:string): string{
        let secrets = require('./secrets.json');
        let password = secrets[key];
        return password;
    }

    public async create(word:string, img:string,lang:string,definition:string) : Promise<void>{
        console.log("put: word = " + word + ", img = " + img);
        try {
            let str1;
            if (process.env.create1){
                str1 = process.env.create1;
            } else{
                str1 = this.getSecret('create1');
            }
            await this.db.none(str1, [word, img, lang]);
            console.log('added word successfully')
        } catch (err) {
            try {
            let str2;
            if (process.env.create2){
                str2 = process.env.create2;
            } else{
                str2 = this.getSecret('create2');
            }
            await this.db.none(str2, [word, img]);
            } catch (err) {
            console.log(err);
            }
        }
        // if (lang !== ''){
        //     try {
        //         await this.db.none('CREATE TABLE '+ lang +'Table (word VARCHAR(50) REFERENCES wordTable(word) ON DELETE CASCADE, def VARCHAR(400), PRIMARY KEY (word))');
        //         } catch (e) {
        //         console.log('Already created.');
        //         }
        //     try{
        //         await this.db.none('INSERT INTO '+ lang +'Table(word, def) values ($1, $2)', [word, definition]);
        //     } catch (e){
        //         await this.db.none('UPDATE '+ lang +'Table SET def = $2 WHERE word = $1', [word, definition]);
        //     }
        // } 
    }

    //only work on update session
    // assume word exists
    public async def(word:string, lang:string, def:string): Promise<void> {
        console.log("put: def in" + lang + " for " + word);
        let str1;
            if (process.env.def1){
                str1 = process.env.def1;
            } else{
                str1 = this.getSecret('def1');
            }
        let info = await this.db.one(str1, [word]);
        let list = info.languages.split(' ');
        if (!list.includes(lang)){
            let str2;
            if (process.env.def2){
                str2 = process.env.def2;
            } else{
                str2 = this.getSecret('def2');
            }
            let languages = info.languages + ' ' + lang;
            await this.db.none(str2, [word, languages]);
        }
        try {
            let str3;
            if (process.env.def3){
                str3 = process.env.def3;
            } else{
                str3 = this.getSecret('def3');
            }
            let str4;
            if (process.env.def4){
                str4 = process.env.def4;
            } else{
                str4 = this.getSecret('def4');
            }
            await this.db.none(str3+ lang +str4);
            } catch (e) {
            console.log('Already created.');
            }
        try{
            let str5;
            if (process.env.def5){
                str5 = process.env.def5;
            } else{
                str5 = this.getSecret('def5');
            }
            let str6;
            if (process.env.def6){
                str6 = process.env.def6;
            } else{
                str6 = this.getSecret('def6');
            }
            await this.db.none(str5+ lang +str6, [word, def]);
        } catch (e){
            let str7;
            if (process.env.def7){
                str7 = process.env.def7;
            } else{
                str7 = this.getSecret('def7');
            }
            let str8;
            if (process.env.def4){
                str8 = process.env.def8;
            } else{
                str8 = this.getSecret('def8');
            }
            console.log('word already has definition in this language.');
    		await this.db.none(str7+ lang +str8, [word, def]);
        }
    }

    public async get(word:string): Promise<any>{ //get word, img, languages
        console.log("get: word = " + word);
        try{
            let str1;
            if (process.env.get1){
                str1 = process.env.get1;
            } else{
                str1 = this.getSecret('get1');
            }
            await this.db.none(str1,[word]);
        } catch(err){
            console.log(err);
        }
        try {
            let str2;
            if (process.env.get2){
                str2 = process.env.get2;
            } else{
                str2 = this.getSecret('get2');
            }
            let result = await this.db.one(str2, [word]);
            console.log("get: returned " + JSON.stringify(result));
            if (result) {
            return result;
            } else {
            return null;
            }
        } catch (err) {
            // Failed search.
            return null;
        }
    }
    public async getuserword(id:string): Promise<any>{ //get word, img, languages
        console.log("getuserword: id = " + id);
        try {
            let str1;
            if (process.env.getuserword){
                str1 = process.env.getuserword;
            } else{
                str1 = this.getSecret('getuserword');
            }
            let result = await this.db.any(str1, [id]);
            console.log("get: returned " + JSON.stringify(result));
            if (result) {
            return result;
            } else {
            return null;
            }
        } catch (err) {
            // Failed search.
            return null;
        }
    }

    public async mainview(word:string): Promise<any>{ //get word, img, languages
        console.log("get: all word = " + word);
	try {
        let str1;
            if (process.env.mainview){
                str1 = process.env.mainview;
            } else{
                str1 = this.getSecret('mainview');
            }
        console.log(str1)
		let result = await this.db.any(str1);
	    console.log("get: returned " + JSON.stringify(result));
	    if (result) {
		return result;
	    } else {
		return null;
	    }
	} catch (err) {
        console.log(err);
	    // Failed search.
	    return null;
	}
    }

    public async getDef(word:string, lang:string): Promise<any>{
        console.log("get: word = " + word + "in language " + lang);
        try {
            let str1;
            if (process.env.getDef1){
                str1 = process.env.getDef1;
            } else{
                str1 = this.getSecret('getDef1');
            }
            let str2;
            if (process.env.getDef2){
                str2 = process.env.getDef2;
            } else{
                str2 = this.getSecret('getDef2');
            }
            let result = await this.db.one(str1+ lang+str2, [word]);
            console.log("get: returned " + JSON.stringify(result));
            if (result) {
            return result;
            } else {
            return null;
            }
        } catch (err) {
            // Failed search.
            return null;
        }
    }

    public async del(word:string) : Promise<void> { //delete word
        try {
            let str1;
            if (process.env.del){
                str1 = process.env.del;
            } else{
                str1 = this.getSecret('del');
            }
            await this.db.none(str1, [word]);
        } catch (err) {
            // Not found.
            console.log('error word not found')
        }
        }

    public async isFound(word:string) : Promise<boolean>  {
	console.log("isFound: word = " + word);
	let v = await this.get(word);
	console.log("is found result = " + v);
	if (v === null) {
	    return false;
	} else {
	    return true;
	}
    }

    // USER
    public async createUser(id:string, username:string,password:string,portrait:string='./a.png',registered_at:string,location:string) : Promise<void>{
        console.log("put: user id = " + id + ", password = " + password+", portrait"+ portrait);
        try {
            let str1;
            if (process.env.createUser){
                str1 = process.env.createUser;
            } else{
                str1 = this.getSecret('createUser');
            }
            await this.db.none(str1, [id,username, password, portrait, registered_at, location]);
            console.log('added user successfully')
        } catch (err) {
            console.log("username existsed!")
        }
    }

    public async updateUser(id:string, username:string,password:string,portrait:string='./a.png',location:string) : Promise<void>{
        console.log("put: user id = " + id + ", password = " + password+", portrait"+ portrait);

        try {
            let str1;
            if (process.env.updateUser){
                str1 = process.env.updateUser;
            } else{
                str1 = this.getSecret('updateUser');
            }
            await this.db.none(str1, [id, password,username,portrait,location]);
                } catch (err) {
                console.log(err);
                }
        
    }

    public async getUser(id:string) : Promise<string | null> {
        console.log("get: id = " + id);
        try {
            let str1;
            if (process.env.getUser){
                str1 = process.env.getUser;
            } else{
                str1 = this.getSecret('getUser');
            }
            let result = await this.db.one(str1, id);
            console.log("get: returned " + JSON.stringify(result));
            console.log("get: value "+result.value);
            if (result) {
            return result;
            } else {
            return null;
            }
        } catch (err) {
            // Failed search.
            return null;
        }
        }

        
    public async delUser(id: string) : Promise<void> {
        console.log("DELETE");
        try {
            // DELETE
            // YOUR CODE GOES HERE
            // let result = await this.db...;
            let str1;
            if (process.env.delUser){
                str1 = process.env.delUser;
            } else{
                str1 = this.getSecret('delUser');
            }
            let result = await this.db.one(str1, id);
            console.log("result = " + result);
        } catch (err) {
            // Not found.
        }
        }

    public async isRightPassword(id: string,password:string) : Promise<any>  {
        console.log("password: key = " + id, password);
        let str1;
            if (process.env.isRightPassword){
                str1 = process.env.isRightPassword;
            } else{
                str1 = this.getSecret('isRightPassword');
            }
        let result = await this.db.one(str1, id);
        console.log(JSON.stringify(result));

        if (result.password === password) {
            console.log("right password!");
            return result.username;
        } else {
            return null;
        }
        }
    public async userisFound(id: string) : Promise<boolean>  {
        console.log("Found user" + id);
        try{
            let str1;
            if (process.env.userisFound){
                str1 = process.env.userisFound;
            } else{
                str1 = this.getSecret('userisFound');
            }
            let result = await this.db.one(str1, id);
            return true;
        }catch(e){
            console.log("no such user");
            return false;
        }

        }
    public async worduserinfo(id:string, word:string) : Promise<void>{
        console.log("put: user id = " + id + ", word id = " + word);
        try {
            let str1;
            if (process.env.worduserinfo){
                str1 = process.env.worduserinfo;
            } else{
                str1 = this.getSecret('worduserinfo');
            }
            await this.db.none(str1, [id,word]);
            console.log('added user-word relation successfully');
        } catch (err) {
            console.log(err);
            console.log("not exist such word/user!")
        }
    }
    

    // comment
    public async addcomment(pronunID:number, user:string, text:string): Promise<any>{
        try{
            let str1;
            if (process.env.addcomment){
                str1 = process.env.addcomment;
            } else{
                str1 = this.getSecret('addcomment');
            }
            await this.db.none(str1, [pronunID, user, text]);
            let result = {'result':'success'};
            return result;
        }catch (err) {
            // Not found.
            console.log(err);
            console.log('error comment insertion failed');
            return null;
        }
    }

    public async deletecomment(id: number): Promise<any>{
        try{
            let str1;
            if (process.env.deletecomment){
                str1 = process.env.deletecomment;
            } else{
                str1 = this.getSecret('deletecomment');
            }
            await this.db.none(str1, [id]);
            let result = {'result':'success'};
            return result;
        }catch (err) {
            // Not found.
            console.log('error comment deletion failed');
            return null;
        }
    }

    public async getcomment(id: number): Promise<any>{
        try{
            let str1;
            if (process.env.getcomment){
                str1 = process.env.getcomment;
            } else{
                str1 = this.getSecret('getcomment');
            }
            let result = await this.db.any(str1, [id]);
            return result;
        }catch (err) {
            // Not found.
            console.log('error comment retrival failed');
            return null;
        }
    }


//Pronunciation
public async addPronun(word: string, audio:string, address:string): Promise<any>{
    try{
        let str1;
        if (process.env.addPronun){
            str1 = process.env.addPronun;
        } else{
            str1 = this.getSecret('addPronun');
        }
            await this.db.any(str1, [word, 'John', audio, address, 0]);
        let result = {'result' : 'success'};
        return result;
    } catch(err){
        console.log('error pronunciation cannot be added');
        return null;
    }
}

public async getPronun(word: string): Promise<any>{
    try{
        let str1;
        if (process.env.getPronun){
            str1 = process.env.getPronun;
        } else{
            str1 = this.getSecret('getPronun');
        }
        let result = await this.db.any(str1, [word]);
        console.log('get pronunciation for word: ' +word + ' success');
        return result;
    }catch (err){ //not found
        console.log('error comment deletion failed');   
        return null;
    }
}

public async addLikes(pronunID: number): Promise<any>{
    try{
        let str1;
        if (process.env.addLikes1){
            str1 = process.env.addLikes1;
        } else{
            str1 = this.getSecret('addLikes1');
        }
        await this.db.none(str1, [pronunID]);
        let str2;
        if (process.env.addLikes2){
            str2 = process.env.addLikes2;
        } else{
            str2 = this.getSecret('addLikes2');
        }
        let result = await this.db.one(str2, [pronunID]);
        return result;
    }catch(err){ //not found
        console.log('error add likes failed');
        return null;
    }
}
public async delPronun(id : number) : Promise<any>{
    try{
        let str1;
        if (process.env.delPronun){
            str1 = process.env.delPronun;
        } else{
            str1 = this.getSecret('delPronun');
        }
        await this.db.any(str1, [id]);
        let result = {'result' : 'success'};
        return result;
    } catch(err){
        console.log(err);
        console.log('error pronunciation cannot be deleted');
        return null;
    }
}

}

