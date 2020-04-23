export class Database {

    private MongoClient = require('mongodb').MongoClient;
    private uri = "mongodb+srv://guest:guest@cluster0-y0tyl.mongodb.net/test?retryWrites=true&w=majority";
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
        let collection = db.collection('wordCollection');
        let lang = [];
        let def = [];
        lang.push(languages);
        def.push({languages:definition});
        let doc = {
            'word': word,
            'img': img,
            'languages': lang,
            'definition': def
        }
        await collection.insertOne(doc);

        console.log("create: word = " + word);
        
    }
   

    public async def(word:string, lang:string, def:string): Promise<void> {
        let db = this.client.db(this.dbName);
        let collection = db.collection('wordCollection');
        let info = await collection.findOne({'word' : word });
        let curlanguage = info['languages'];
        let curDefinition = info['definition'];
        curlanguage.push(lang);
        curDefinition.push({key:lang, value:def})
        let result = await collection.updateOne({'word':word},{$set:{'languages':curlanguage, 'definition': curDefinition}}, { 'upsert' : true } );
        console.log(result);
    }

    public async get(word:string): Promise<any>{
        let db = this.client.db(this.dbName);
        let collection = db.collection('wordCollection');
        console.log("get: word = " + word);
	    let result = await collection.findOne({'word' : word });
        console.log("get: returned " + JSON.stringify(result));
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    public async del(word:string) : Promise<void> {
    let db = this.client.db(this.dbName);
    let collection = db.collection('wordCollection');
	console.log("delete: word = " + word);
	let result = await collection.deleteMany({'word' : word });
	console.log("result = " + result);
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
