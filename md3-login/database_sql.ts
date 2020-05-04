export class Database {
    private pgp = require('pg-promise')();
    private uri = "postgres://ilixcuof:jQzvSECVMmriwhIGpD8DNrgTli8pUYzU@drona.db.elephantsql.com:5432/ilixcuof";
    private db: any;
    private dbName : string;

    constructor(dbName : string) {
    	this.dbName = dbName;
        this.db = this.pgp(this.uri);
        (async () => {
            try {
                await this.db.none('CREATE TABLE IF NOT EXISTS wordTable (word VARCHAR(50) PRIMARY KEY, img VARCHAR(200), views INTEGER DEFAULT 0, languages VARCHAR(200))');
                 } catch (e) {
                console.log('wordTable Already created.');
                }
            try {
            // userinfo table
            let result2 = await this.db.none('CREATE TABLE userinfo(id varchar(100) PRIMARY KEY,username varchar(100),password varchar(100),portrait varchar(10),registered_at DATE,location varchar(100))');
            console.log(JSON.stringify(result2));

            } catch (e) {
            console.log('Already created.');
            }
            try {
                await this.db.none('CREATE TABLE IF NOT EXISTS comment (id serial NOT NULL PRIMARY KEY, pronunID INTEGER, userID VARCHAR(50), text VARCHAR(250), date TIMESTAMP)');
                 } catch (e) {
                console.log('comment Already created.');
                }


        })();
    }
    //create a new word or update img of an existing word (doesn't update definition!)
    public async create(word:string, img:string,lang:string,definition:string) : Promise<void>{
        console.log("put: word = " + word + ", img = " + img);

        try {
            await this.db.none('INSERT INTO wordTable(word, img, languages) values ($1, $2, $3)', [word, img, lang]);
            console.log('added word successfully')
        } catch (err) {
            try {
            await this.db.none('UPDATE wordTable SET img = $2 WHERE word = $1', [word, img]);
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
        let info = await this.db.one('SELECT * FROM wordTable WHERE word = $1', [word]);
        let list = info.languages.split(' ');
        if (!list.includes(lang)){
            let languages = info.languages + ' ' + lang;
            await this.db.none('UPDATE wordTable SET languages = $2 WHERE word = $1', [word, languages]);
        }
        await this.db.none('UPDATE wordTable SET languages = $2 WHERE word = $1', [word, languages]);
        try {
            await this.db.none('CREATE TABLE '+ lang +'Table (word VARCHAR(50) REFERENCES wordTable(word) ON DELETE CASCADE, def VARCHAR(400), PRIMARY KEY (word))');
            } catch (e) {
            console.log('Already created.');
            }
        try{
            await this.db.none('INSERT INTO '+ lang +'Table(word, def) values ($1, $2)', [word, def]);
        } catch (e){
            console.log('word already has definition in this language.');
    		await this.db.none('UPDATE '+ lang +'Table SET def = $2 WHERE word = $1', [word, def]);
        }
    }

    public async get(word:string): Promise<any>{ //get word, img, languages
        console.log("get: word = " + word);
        try{
            await this.db.none('UPDATE wordTable SET views = views +1 WHERE word = $1',[word]);
        } catch(err){
            console.log(err);
        }
        try {
            let result = await this.db.one('SELECT * FROM wordTable WHERE word = $1', [word]);
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
		let result = await this.db.any('SELECT * FROM wordTable limit 5;');
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

    public async getDef(word:string, lang:string): Promise<any>{
        console.log("get: word = " + word + "in language " + lang);
        try {
            let result = await this.db.one('SELECT * FROM '+ lang+'Table WHERE word = $1', [word]);
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
            await this.db.none('DELETE FROM wordTable WHERE word = $1', [word]);
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
            await this.db.none('INSERT INTO userinfo(id,username, password, portrait, registered_at, location) values ($1, $2, $3,$4,$5,$6)', [id,username, password, portrait, registered_at, location]);
            console.log('added user successfully')
        } catch (err) {
            console.log("username existsed!")
        }
    }

    public async updateUser(id:string, username:string,password:string,portrait:string='./a.png',location:string) : Promise<void>{
        console.log("put: user id = " + id + ", password = " + password+", portrait"+ portrait);

        try {
                await this.db.none('UPDATE userinfo SET password = $2, username = $3, portrait= $4, location = $5 WHERE id = $1', [id, password,username,portrait,location]);
                } catch (err) {
                console.log(err);
                }
        
    }




    public async getUser(id:string) : Promise<string | null> {
        console.log("get: id = " + id);
        try {
            let result = await this.db.one('SELECT * FROM userinfo WHERE id = $1', id);
            console.log("get: returned " + JSON.stringify(result));
            console.log("get: value "+result.value);
            if (result) {
            return JSON.stringify(result);
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
            let result = await this.db.one('DELETE FROM userinfo WHERE id = $1', id);
            console.log("result = " + result);
        } catch (err) {
            // Not found.
        }
        }

    public async isRightPassword(id: string,password:string) : Promise<any>  {
        console.log("password: key = " + id, password);
        let result = await this.db.one('SELECT password,username FROM userinfo WHERE id = $1', id);
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
            let result = await this.db.one('SELECT username FROM userinfo WHERE id = $1', id);
            return true;
        }catch(e){
            console.log("no such user");
            return false;
        }

        }

    // comment
    public async addcomment(pronunID:number, user:string, text:string): Promise<any>{
        try{
            await this.db.none('INSERT INTO comment(pronunID, userID, text) VALUES ($1, $2, $3)', [pronunID, user, text]);
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
            await this.db.none('DELETE FROM comment WHERE id = $1', [id]);
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
            let result = await this.db.any('SELECT * FROM comment WHERE pronunID = $1', [id]);
            return result;
        }catch (err) {
            // Not found.
            console.log('error comment retrival failed');
            return null;
        }
    }
}





