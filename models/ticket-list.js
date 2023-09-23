const Ticket = require("./ticket");

class TicketList{
    constructor(){
        this.ultimoNumero = 0;
        this.pendientes   = [];
        this.asignados    = [];        
    }

    get siguienteNumero(){
        this.ultimoNumero++;
        return this.ultimoNumero;
    }

    // 3 que se veran en las tarjetas y 10 en el historial
    get ultimos13(){
        return this.asignados.slice(0, 13);
    }
 
    crearTicket(){
        const nuevoTicket = new Ticket(this.siguienteNumero);
        this.pendientes.push(nuevoTicket);
        return nuevoTicket;
    }


    asignarTicket(agente, escritorio){
        if(this.pendientes.length === 0) return null;
        
        //Quitar el ticket del listado de pendientes
        const siguienteTicket = this.pendientes.shift();
        
        siguienteTicket.agente = agente;
        siguienteTicket.escritorio = escritorio;

        //Agregar ticket a la lista de asignados
        this.asignados.unshift(siguienteTicket);

        return siguienteTicket;
    }
    
}

module.exports = TicketList;