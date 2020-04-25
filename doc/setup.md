## set up environment and coding##
Install tools for the envirionment
    %npm init -y
    %npm install -g mongodb
    %npm install -g typescript
    %npm install -g express
    %npm install --save-dev @types/node
    %npm install browserify
Coding
    create database.ts
    create server.ts
    create main.ts
    create html/index.html
    create html/client.ts
    create html/postdata.ts
## change ts to js ##
Convert ts files to js
    %tsc main.ts
    %tsc server.ts
    %tsc database.ts
    %cd html
    %tsc (convert client.ts and postdata.ts)
    %browserify client.js -o client-main.js --standalone client (create client-main.js from client.js and postdata.js)
## complie locally ##
    %node main.js
## deploy to heroku ##
    add Procfile to root
    %heroku create (create new heroku app)
    deploy the repository to heroku in heroku.com