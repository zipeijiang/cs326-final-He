export class Database {

    private MongoClient = require('mongodb').MongoClient;
    private uri = "mongodb+srv://zipeijiang:He@cs326-he-w6q4i.mongodb.net/test?retryWrites=true&w=majority";
    private client;
    private dbName : string = "dialectDictionary";

    constructor() {
    this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });

	(async () => {
	    await this.client.connect().catch(err => { console.log(err); });
    })();
    }
    
    public async create(word:string, img:string,languages:string,definition:string) : Promise<void>{
        let db = this.client.db(this.dbName);
        let wordCollection = db.collection('wordCollection');
        let defCollection = db.collection('defCollection');
        let lang = [];
        if (languages !== ''){lang.push(languages);}
        let doc = {
            'word': word,
            'img': img,
            'languages': lang,
        }
        await wordCollection.insertOne(doc);
        if (languages !== ''){
            let defdoc = {
                'word': word,
                lang: definition
            }
            await defCollection.insertOne(defdoc);
        }

        console.log("create: word = " + word);
        
    }

    public async def(word:string, lang:string, def:string): Promise<void> {
        let db = this.client.db(this.dbName);
        let wordCollection = db.collection('wordCollection');
        let defCollection = db.collection('defCollection'); 
        let info = await wordCollection.findOne({'word' : word });
        let curlanguage = info['languages'];
        curlanguage.push(lang);
        await wordCollection.updateOne({'word':word},{$set:{'languages':curlanguage}}, { 'upsert' : true } );
        let result = await defCollection.updateOne({'word':word},{$set:{lang:def}}, { 'upsert' : true } );
        console.log(JSON.stringify(result));
    }

    public async get(word:string): Promise<any>{ //get word, img, languages
        let db = this.client.db(this.dbName);        
        let wordCollection = db.collection('wordCollection');
        console.log("get: word = " + word);
        let result = await wordCollection.findOne({'word' : word });
        console.log("get: returned " + JSON.stringify(result));
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    public async getDef(word:string, lang:string): Promise<any>{
        let db = this.client.db(this.dbName);   
        let defCollection = db.collection('defCollection'); 
        console.log("get: word = " + word + " language: " + lang);
        let result = await defCollection.findOne({'word' : word });
        console.log("get: returned " + JSON.stringify(result));
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    public async del(word:string) : Promise<void> { //delete word
            let db = this.client.db(this.dbName);
            let wordCollection = db.collection('wordCollection');
            let defCollection = db.collection('defCollection'); 

            console.log("delete: word = " + word);
            let result = await wordCollection.deleteMany({'word' : word });
            await defCollection.deleteMany({'word' : word });
            console.log("result = " + result);
        }

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
}
