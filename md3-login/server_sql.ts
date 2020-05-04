import { workerData } from "worker_threads";


let http = require('http');
let url = require('url');
let express = require('express');



export class Server{
    private dataBase: any;
    private server = express();
    private port = 8080;
    private router = express.Router();
    //private anotherRouter = express.Router();

    constructor(db){
        this.dataBase = db;
        
        
        this.router.use((request, response, next) => {
            //response.header('Content-Type','application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        
        this.server.use('/', express.static('./html'));
        // this.server.use('/user/:id/word', express.static('./html/private'));
        this.server.use(express.json());
     
        //USER FUNCTION
        this.router.post('/signup', this.createnewUserHandler.bind(this));
        this.router.post('/login', [this.errorUserHandler.bind(this),this.loginHandler.bind(this)]);
        this.router.post('/changeinfo', [this.errorUserHandler.bind(this),this.changeinfoHandler.bind(this)]);

        //WORD FUNCTION
        this.router.post('/word/new', this.createHandler.bind(this));
        this.router.post('/word/definition', [this.errorHandler.bind(this),this.defHandler.bind(this)]);
        this.router.post('/word/delete', [this.errorHandler.bind(this),this.deleteHandler.bind(this)]);
        this.router.post('/word/view', [this.errorHandler.bind(this),this.viewHandler.bind(this)]);
        //|-For main page browse
        this.router.post('/mainview', this.mainpageviewHandler.bind(this)); 
        this.router.post('/getDefinitionByLanguage', [this.errorHandler.bind(this),this.getDefHandler.bind(this)]); //take word and language, return definition in that language

        //PRONUNCIATION FUNCTION
        this.router.post('/word/addpronunciation', this.pronHandler.bind(this)); //get all comments by word, takes word
        this.router.post('/word/getpronunciation', this.getPronunHandler.bind(this)); //get all comments by word, takes word
        this.router.post('/word/addPronunLikes', this.addPronunLikesHandler.bind(this)); //get all comments by word, takes word
        this.router.post('/word/deletePronun', this.delpronHandler.bind(this)); //get all comments by word, takes word


        //COMMENTS FUNCTION
        this.router.post('/word/addcomment', this.addCommentHandler.bind(this)); //add comment, takes pronunID, user, text
        this.router.post('/word/delcomment', this.delCommentHandler.bind(this)); // delete comment by commentID, takes commentID
        this.router.post('/word/getcomment', this.getCommentHandler.bind(this)); // get all comments by pronunID, takes pronunID


        this.router.post('*', async (request, response) => {
            response.send(JSON.stringify({ "result" : "command-not-found" }));
        });
        this.server.use('/word', this.router);
    }
    //Word Handlers
    private async createHandler(request, response) : Promise<void> {
        console.log("createHandler request "+request.body.word+" "+request.body.img+" "+request.body.languages+" "+request.body.definition);
		await this.create(request.body.word, request.body.img,request.body.languages,request.body.definition,response);
    }

    private async viewHandler(request, response) : Promise<void> {
		await this.view(request.body.word, response);
    }
    private async mainpageviewHandler(request, response) : Promise<void> {
        await this.mainpageview(response);
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
    //Pronunciation Handlers
    private async pronHandler(request, response) : Promise<void>{
        await this.addPronun(request.body.word, request.body.pron, request.body.addr, response);
    }

    private async delpronHandler(request, response) : Promise<void>{
        await this.delPronunciation(request.body.ID, response);
    }

    private async getPronunHandler(request, response) : Promise<void>{
        await this.getPronun(request.body.word, response);
    }

    private async addPronunLikesHandler(request, response) : Promise<void>{
        await this.addLikes(request.body.pronunID, response);
    }
    // User Handlers
    private async createnewUserHandler(request, response) : Promise<void> {
        console.log("createUserHandler request "+request.body.username+" "+request.body.password+" "+request.body.portrait+" "+request.body.location);
        await this.createnewUser(request.body.id,request.body.username, request.body.password,request.body.portrait,request.body.location,response);
    }

    private async loginHandler(request, response) : Promise<void> {
        console.log("userlogin request by "+request.body.id + "with password"+request.body.password);
        await this.loginUser(request.body.id,request.body.password,response);
    }
    private async changeinfoHandler(request, response) : Promise<void> {
        console.log("user change info request by "+request.body.id + "with new password"+request.body.password);
        await this.changeinfoUser(request.body.id,request.body.username, request.body.password,request.body.portrait,request.body.location,response);
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
    private async errorUserHandler(request, response, next) : Promise<void> {
        let value : boolean = await this.dataBase.userisFound(request.body.id);
        console.log("error handler on user login")
        if (!value) {
            console.log('error')
            response.write(JSON.stringify({'result' : 'notfound'}));
            response.end();
        } else {
            next();
        }
        }
    // Comments Handlers
    private async addCommentHandler(request, response) : Promise<void> {
        await this.addcomment(request.body.pronunID, request.body.user, request.body.text, response);
        }
    private async delCommentHandler(request, response) : Promise<void> {
        await this.delcomment(request.body.commentID, response);
        }    
    private async getCommentHandler(request, response) : Promise<void> {
        await this.getComment(request.body.pronunID, response);
        }
    //Handlers Ends Here


    //User Functions
    public listen(port) : void  {
        this.server.listen(port);
    }
    public async createnewUser(id:string,username:string, password:string, location:string,portrait:string,response) : Promise<void> { //create the word
        console.log("creating user in create '" + username + "'");
        const registered_at:string = new Date().toLocaleString();
        await this.dataBase.createUser(id,username, password, portrait, registered_at, location);
        response.write(JSON.stringify({'result' : 'created',
                           'id' : id }));
        response.end();
    }
    public async changeinfoUser(id:string,username:string,password:string, location:string,portrait:string,response) : Promise<void> { //create the word
        console.log("change user info '" + username + "'");
        await this.dataBase.updateUser(id,username, password, portrait, location);
        response.write(JSON.stringify({'result' : 'changed',
                           'id' : id }));
        response.end();
    }

    public async loginUser(id:string, password:string, response): Promise<void>{
        
        let info = await this.dataBase.isRightPassword(id, password);
        if(!info){
            // no password missmatch being found.
            response.write(JSON.stringify(
                {'result' : 'error',
                'id' : id
            }));
        } else{
            response.write(JSON.stringify(
                {'result' : 'ok',
            'id' : id,
            'username':info
            }));
        }
        
	    response.end();
    }

    //Word Functions
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
    public async mainpageview(response): Promise<void>{  //view word and image and languages supported for definition
        let info = await this.dataBase.mainview();

        response.write(JSON.stringify(info));
        
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
            'word' : workerData,
            'def' : info['def']
            };
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

    //Comment Functions
    public async addcomment(pronunID:number, user:string, text:string, response): Promise<void>{
        console.log("add comment by user '" + user)
        let info = await this.dataBase.addcomment(pronunID, user, text);
        if (info !== null){
            response.write(JSON.stringify(
                {'result' : 'comment added'
            }));
        } else{
            response.write(JSON.stringify(
                {'result' : 'error'
            }));
        }
        response.end();
    }

    public async delcomment(commentID:number, response): Promise<void>{
        console.log("delete comment ID:" + commentID);
        let info = await this.dataBase.deletecomment(commentID);
        if (info !== null){
            response.write(JSON.stringify(
                {'result' : 'comment deleted',
                'id' : commentID
            }));
        } else{
            response.write(JSON.stringify(
                {'result' : 'error'
            }));
        }
        response.end();
    }

    public async getComment(pronunID:number, response): Promise<void>{
        console.log('get comment of pronun ' + pronunID);
        let info = await this.dataBase.getcomment(pronunID);
        if(info==null){
            // no word with specific word being found.
            response.write(JSON.stringify(
                {'result' : 'error',
                'pronunID' : pronunID
            }));
        } else{
            let result = {'result' : 'success',
            'comments' : info
            };
            response.write(JSON.stringify(result));
            console.log(JSON.stringify(result));
        }
	    response.end();
    }
    //Pronunciation Functions
        public async addPronun(word:string, audio:string, address:string, response): Promise<void>{
            let info = await this.dataBase.addPronun(word, audio, address);
            if(info==null){
                //no word with specific word being found
                response.write(JSON.stringify(
                    {'result' : 'error',
                    'word' : word
                } ));
            } else{
                let result = {'result' : 'success',
                'word' : word
                };
                response.write(JSON.stringify(result));
                console.log(JSON.stringify(result));
            }
            response.end();
        }
        public async getPronun(word:string, response): Promise<void>{
            console.log('get pronun of word ' + word);
            let info = await this.dataBase.getPronun(word);
            if(info==null){
                //no word with specific word being found
                console.log('error get pronun failed');
                response.write(JSON.stringify(
                    {'result' : 'error',
                    'word' : word 
                }));
            } else{
                let result = {'result' : 'success',
                'pronuns' : info
              };
              response.write(JSON.stringify(result));
              console.log(JSON.stringify(result));
            }
            response.end();
        }

        public async addLikes(pronunID : number, response): Promise<void>{
            console.log('get likes of pronun ' + pronunID);
            let info = await this.dataBase.addLikes(pronunID);
            if(info==null){
                //no word with specific word being found
                response.write(JSON.stringify(
                    {'result' : 'error',
                    'likes' : 'error'
                }));
            }else{
                let result = {'result' : 'success',
                'likes' : info['likes']
            };
            response.write(JSON.stringify(result));
            console.log(JSON.stringify(result));
            }
            response.end();
        }

        public async delPronunciation(ID:number, response): Promise<void>{
            let info = await this.dataBase.delPronun(ID);
            if(info==null){
                //no word with specific word being found
                console.log('error get pronun failed');
                response.write(JSON.stringify(
                    {'result' : 'error',
                    'id' : ID
                }));
            } else{
                let result = {'result' : 'success',
                'id' : ID
              };
              console.log('deletion succeeded');
              response.write(JSON.stringify(result));
            }
            response.end();
        }
}

    