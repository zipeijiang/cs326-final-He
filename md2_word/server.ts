import { workerData } from "worker_threads";

let http = require('http');
let url = require('url');
let express = require('express');

export class Server{
    private dataBase;
    private server = express();
    private port = 8080;
    private router = express.Router();

    constructor(db){
        this.dataBase = db;
        this.router.use((request, response, next) => {
            response.header('Content-Type','application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        
        this.server.use('/', express.static('./html'));
        this.server.use(express.json());

        this.router.post('/new', this.createHandler.bind(this));
        this.router.post('/definition', [this.errorHandler.bind(this),this.defHandler.bind(this)]);
        this.router.post('/delete', [this.errorHandler.bind(this),this.deleteHandler.bind(this)]);
        this.router.post('/view', [this.errorHandler.bind(this),this.viewHandler.bind(this)]);

        this.router.post('*', async (request, response) => {
            response.send(JSON.stringify({ "result" : "command-not-found" }));
        });
        this.server.use('/word', this.router);
    }
    
    private async createHandler(request, response) : Promise<void> {
        console.log("createHandler request "+request.body.word+" "+request.body.img+" "+request.body.languages+" "+request.body.definition);
		await this.create(request.body.word, request.body.img,request.body.languages,request.body.definition,response);
    }

    private async viewHandler(request, response) : Promise<void> {
		await this.view(request.body.word, response);
    }

    private async defHandler(request, response): Promise<void> {
		await this.updateDefinition(request.body.word, request.body.lang, request.body.def, response);
    }

    private async deleteHandler(request, response) : Promise<void> {
        await this.delete(request.body.word, response);
        }



    private async errorHandler(request, response, next) : Promise<void> {
	let value : boolean = await this.dataBase.isFound(request.body.word);
	if (!value) {
	    response.write(JSON.stringify({'result' : 'error'}));
	    response.end();
	} else {
	    next();
	}
    }
    public listen(port) : void  {
        this.server.listen(port);
    }

    public async create(word:string, img:string, languages:string,definition:string,response) : Promise<void> {
        console.log("creating word in create '" + word + "'");
        await this.dataBase.create(word, img,languages,definition);
        response.write(JSON.stringify({'result' : 'created',
                           'word' : word }));
        response.end();
    }
    public async view(workerData:string, response): Promise<void>{
        console.log('checking word: '+workerData);
        let info = await this.dataBase.get(workerData);
        let url = info['img'];
        let languages = info['languages'];
        let def = info['definition'];
        response.write(JSON.stringify({'result' : 'success',
        'word' : workerData, 'img': url, 'lang': languages, 'def': def}))
	    response.end();
    }
    public async updateDefinition(workerData:string, lang:string, def:string, response): Promise<void>{
        console.log("updated word '" + workerData + "' with language '" + lang + "'")
        await this.dataBase.def(workerData, lang, def);
        let info = await this.dataBase.get(workerData);
        let languages = info['languages'];
        let definitions = info['definition'];
        response.write(JSON.stringify({'result' : 'updated description',
                           'word' : workerData, 'lang':languages, 'def':definitions }));
        response.end();
    }

    public async delete(workerData:string, response): Promise<void>{
        await this.dataBase.del(workerData);
	    response.write(JSON.stringify({'result' : 'deleted',
				       'word'  : workerData }));
	    response.end();
    }


}

    