const express = require('express');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.port = process.env.PORT || 4000;
        this.app  = express();

        //Endpoints
        this.endpoints = {
            users:  '/api/v1/user' 
        }

        // Database connection
        this.connectDB();
        
        //Middlewares
        this.middlewares();
        
        //Routes
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use( express.json() );
    }

    routes(){
        this.app.use(this.endpoints.users, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Running at port ${this.port}`)
        })
    }
}

module.exports = Server;