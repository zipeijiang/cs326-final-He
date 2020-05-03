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
            //word table
            // let result = await this.db.none('CREATE TABLE wordTable (word VARCHAR(50) PRIMARY KEY, img VARCHAR(200), languages VARCHAR(200))');
            // console.log(JSON.stringify(result));
            // userinfo table
            let result2 = await this.db.none('CREATE TABLE userinfo(id varchar(100) PRIMARY KEY,username varchar(100),password varchar(100),portrait varchar(10),registered_at DATE,location varchar(100))');
            console.log(JSON.stringify(result2));

            } catch (e) {
            console.log('Already created.');
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
        if (lang !== ''){
            try {
                await this.db.none('CREATE TABLE '+ lang +'Table (word VARCHAR(50) REFERENCES wordTable(word) ON DELETE CASCADE, def VARCHAR(400), PRIMARY KEY (word))');
                } catch (e) {
                console.log('Already created.');
                }
            try{
                await this.db.none('INSERT INTO '+ lang +'Table(word, def) values ($1, $2)', [word, definition]);
            } catch (e){
                await this.db.none('UPDATE '+ lang +'Table SET def = $2 WHERE word = $1', [word, definition]);
            }
        } 
    }

    //only work on update session
    // assume word exists
    public async def(word:string, lang:string, def:string): Promise<void> {
        console.log("put: def in" + lang + " for " + word);
        let info = await this.db.one('SELECT * FROM wordTable WHERE word = $1', [word]);
        let languages = info.languages + ' ' + lang;
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
            let result = await this.db.none('DELETE FROM wordTable WHERE word = $1', [word]);
            console.log("result = " + result);
        } catch (err) {
            // Not found.
            console.log('error word not found')
        }
        }

/*
    public async addPron(ID:number, word:string, pronunciation: string, addr:string, lang:string, spelling:string): Promise<void>{ //add pronunciaiton to db, take ID, word spelling, pronunciation, addr
        let db = this.client.db(this.dbName);   
        let pronCollection = db.collection('pronCollection');
        console.log("add pronunciation in "+addr+" to word "+word);
        let result = await pronCollection.updateOne({'id':ID},{$set:{'word':word, 'pronunciation':pronunciation, 'address':addr, 'language':lang, 'spelling':spelling}}, { 'upsert' : true } );
        console.log(JSON.stringify(result));
    }

    public async delPron(ID:number): Promise<void>{ //add pronunciaiton to db, take ID, word spelling, pronunciation, addr
        let db = this.client.db(this.dbName);   
        let pronCollection = db.collection('pronCollection');
        console.log("delete pronunciation with ID "+ID);
        let result = await pronCollection.deleteMany({'id':ID});
        console.log("result = " +JSON.stringify(result));
    }

    public async initializeID(): Promise<void>{
        let db = this.client.db(this.dbName);
        let IDCollection = db.collection('IDCollection');
        IDCollection.updateOne({'type': 'user'},{$set:{'id': 0}}, { 'upsert' : true } );
        IDCollection.updateOne({'type': 'pronunciatIon'},{$set:{'id': 0}}, { 'upsert' : true } );
    }
    public async getNewPronID(): Promise<number>{
        let db = this.client.db(this.dbName);   
        let IDCollection = db.collection('IDCollection');
        let result = await IDCollection.findOne({'type': 'pronunciatIon'});
        let newID = result['id'];
        await IDCollection.updateOne({'type': 'pronunciatIon'},{$set:{'id': newID+1}}, { 'upsert' : true } );
        return newID
    }

    public async getNewUserID(): Promise<number>{
        let db = this.client.db(this.dbName);   
        let IDCollection = db.collection('IDCollection');
        let result = await IDCollection.findOne({'type': 'pronunciatIon'});
        let newID = result['id'];
        await IDCollection.updateOne({'type': 'user'},{$set:{'id': newID+1}}, { 'upsert' : true } );
        return newID
    }
*/
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

}




