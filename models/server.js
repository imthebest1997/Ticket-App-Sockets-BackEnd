// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');
const Sockets  = require('./sockets');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );
        
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );

        //Inicializar sockets
        this.sockets = new Sockets( this.io );

    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        //Get de los ultimos tickets
        this.app.get("/ultimos-tickets", (req, res) => {
            res.json({
                ok: true,
                ultimos: this.sockets.ticketList.ultimos13
            })
        })

    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;