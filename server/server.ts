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
		await this.create(request.body.name, request.body.img, response);
    }

    private async viewHandler(request, response) : Promise<void> {
		await this.view(request.body.name, response);
    }

    private async defHandler(request, response): Promise<void> {
		await this.updateDefinition(request.body.name, request.body.lang, request.body.def, response);
    }

    private async deleteHandler(request, response) : Promise<void> {
        await this.delete(request.body.name, response);
        }



    private async errorHandler(request, response, next) : Promise<void> {
	let value : boolean = await this.dataBase.isFound(request.body.name);
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

    public async create(name:string, img:string, response) : Promise<void> {
        console.log("creating word '" + name + "'");
        await this.dataBase.create(name, img);
        response.write(JSON.stringify({'result' : 'created',
                           'word' : name }));
        response.end();
    }
    public async view(name:string, response): Promise<void>{
        console.log('checking word: '+name);
        let info = await this.dataBase.get(name);
        let url = info['img'];
        let languages = info['languages'];
        let def = info['definition'];
        response.write(JSON.stringify({'result' : 'success',
        'word' : name, 'img': url, 'lang': languages, 'def': def}))
	    response.end();
    }
    public async updateDefinition(name:string, lang:string, def:string, response): Promise<void>{
        console.log("updated word '" + name + "' with language '" + lang + "'")
        await this.dataBase.def(name, lang, def);
        let info = await this.dataBase.get(name);
        let languages = info['languages'];
        let definitions = info['definition'];
        response.write(JSON.stringify({'result' : 'updated description',
                           'word' : name, 'lang':languages, 'def':definitions }));
        response.end();
    }

    public async delete(name:string, response): Promise<void>{
        await this.dataBase.del(name);
	    response.write(JSON.stringify({'result' : 'deleted',
				       'word'  : name }));
	    response.end();
    }


}

    