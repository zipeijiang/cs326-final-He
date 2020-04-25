## set up environment ##
    npm init -y
    npm install -g mongodb
    npm install -g typescript
    npm install -g express
    npm install --save-dev @types/node
    npm install browserify
## change ts to js ##
    tsc main.ts
    tsc server.ts
    tsc database.ts
    cd html
    tsc 
    browserify client.js -o client-main.js --standalone client
    cd ..
## complie locally ##
    node main.js
## deploy to heroku ##
    heroku create
    git push heroku master