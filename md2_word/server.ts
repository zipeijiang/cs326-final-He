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
        this.router.post('/getDefinitionByLanguage', [this.errorHandler.bind(this),this.getDefHandler.bind(this)]); //take word and language, return definition in that language
        this.router.post('/pronunciation', [this.errorHandler.bind(this),this.pronHandler.bind(this)]); //take word, pronunciation, user address
        this.router.post('/delpronunciation', [this.delpronHandler.bind(this)]); // delete pronunciation according to ID



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
		await this.updateDefinition(request.body.word, request.body.languages, request.body.definition, response);
    }

    private async deleteHandler(request, response) : Promise<void> {
        await this.delete(request.body.word, response);
        }
    
    private async getDefHandler(request, response) : Promise<void> {
        await this.getDefinition(request.body.word, request.body.languages, response);
        }
    
    private async pronHandler(request, response) : Promise<void> {
        await this.addPronunciation(request.body.word, request.body.pron, request.body.addr, request.body.language, request.body.spelling, response);
        }
    
    private async delpronHandler(request, response) : Promise<void> {
        await this.delPronunciation(request.body.ID, response);
        }

    private async errorHandler(request, response, next) : Promise<void> {
	let value : boolean = await this.dataBase.isFound(request.body.word);
	if (!value) {
        console.log('error')
	    response.write(JSON.stringify({'result' : 'error'}));
	    response.end();
	} else {
	    next();
	}
    }
    public listen(port) : void  {
        this.server.listen(port);
    }

    public async create(word:string, img:string, languages:string,definition:string,response) : Promise<void> { //create the word
        console.log("creating word in create '" + word + "'");
        await this.dataBase.create(word, img,languages,definition);
        response.write(JSON.stringify({'result' : 'created',
                           'word' : word }));
        response.end();
    }
    public async view(workerData:string, response): Promise<void>{  //view word and image and languages supported for definition
        console.log('checking word: '+workerData);
        let info = await this.dataBase.get(workerData);
        response.write(JSON.stringify(
            {'result' : 'created',
            'word' : workerData,
            'img' : info['img'],
            'lang': info['languages'].split(' ')
        }
        ));
        
	    response.end();
    }

    public async getDefinition(workerData:string, language:string, response): Promise<void>{
        console.log('get word: '+workerData + "', language: "+language);
        let info = await this.dataBase.getDef(workerData, language);
        if(info==null){
            // no word with specific word being found.
            response.write(JSON.stringify(
                {'result' : 'error',
                'word' : workerData
            }));
        } else{
            let result = {'result' : 'created',
            'word' : workerData
            };
            result[language] = info['def'];
            response.write(JSON.stringify(result));
            console.log("definition sent successfully");
        }
        
	    response.end();
    }

    public async updateDefinition(workerData:string, lang:string, def:string, response): Promise<void>{
        console.log("updated word '" + workerData + "' with language '" + lang + "'")
        await this.dataBase.def(workerData, lang, def);
        let info = await this.dataBase.get(workerData);
        response.write(JSON.stringify({'result' : 'updated description',
            'word' : workerData,
            'lang' : info['languages']
        }));
        response.end();
    }

    public async delete(workerData:string, response): Promise<void>{    //delete the word
        await this.dataBase.del(workerData);
	    response.write(JSON.stringify({'result' : 'deleted',
				       'word'  : workerData }));
	    response.end();
    }

    public async addPronunciation(word:string, pron:string, addr:string, language:string, spelling:string, response): Promise<void>{
        console.log("add pronunciation to word '" + word)
        let id = this.dataBase.getNewPronID();
        await this.dataBase.addPron(id, word, pron, addr, language, spelling);
        response.write(JSON.stringify(
            {'result' : 'pronunciation added',
            'word' : word,
            'id' : id
        }
        ));
        response.end();
    }

    public async delPronunciation(ID:number, response): Promise<void>{
        console.log("delete pronunciation from word '" + workerData)
        await this.dataBase.delPron(ID);
        let info = await this.dataBase.get(workerData);
        response.write(JSON.stringify(
            {'result' : 'pronunciation deleted',
            'word' : workerData,
            'id' : info['id']
        }
        ));
        response.end();
    }
}

    