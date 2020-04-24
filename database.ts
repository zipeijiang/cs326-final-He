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
    
    public async create(name:string, img:string) : Promise<void>{
        let db = this.client.db(this.dbName);
        let collection = db.collection('wordCollection');
        let doc = {
            'word': name,
            'img': img,
            'languages': [],
            'definition': []
        }
        let result = await collection.insertOne(doc);

        //let result = await collection.updateOne({'word':name},{$set: {'img': img, 'languages':{}, 'definition':null}, },{'upsert' : true});
        console.log("create: word = " + name);
        console.log(result);
    }

    public async def(name:string, lang:string, def:string): Promise<void> {
        let db = this.client.db(this.dbName);
        let collection = db.collection('wordCollection');
        let info = await collection.findOne({'word' : name });
        let curlanguage = info['languages'];
        let curDefinition = info['definition'];
        curlanguage.push(lang);
        curDefinition.push({key:lang, value:def})
        let result = await collection.updateOne({'word':name},{$set:{'languages':curlanguage, 'definition': curDefinition}}, { 'upsert' : true } );
        console.log(result);
    }

    public async get(name:string): Promise<any>{
        let db = this.client.db(this.dbName);
        let collection = db.collection('wordCollection');
        console.log("get: word = " + name);
	    let result = await collection.findOne({'word' : name });
        console.log("get: returned " + JSON.stringify(result));
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    public async del(name:string) : Promise<void> {
    let db = this.client.db(this.dbName);
    let collection = db.collection('wordCollection');
	console.log("delete: word = " + name);
	let result = await collection.deleteMany({'word' : name });
	console.log("result = " + result);
    }
    
    public async isFound(name:string) : Promise<boolean>  {
	console.log("isFound: word = " + name);
	let v = await this.get(name);
	console.log("is found result = " + v);
	if (v === null) {
	    return false;
	} else {
	    return true;
	}
    }
}
