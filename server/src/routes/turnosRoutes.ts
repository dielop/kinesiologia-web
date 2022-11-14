import { Router } from 'express';
import TurnosControllers from '../controllers/turnosControllers';
import apicache from 'apicache'

let cache = apicache.middleware

class TurnosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config(): void {
        this.router.get('/', cache("2 minutes"), TurnosControllers.listTurns);
        this.router.get('/turnosReservados/:selected/:id', cache("2 minutes"), TurnosControllers.listTurnosReserved);
        this.router.get('/turnosLibres/:selected/:id', cache("2 minutes"), TurnosControllers.getTurnFreeProfesionales);
        this.router.get('/turnosKinesiologos/:selected', cache("2 minutes"), TurnosControllers.listTurnosReservedKinesiologo);
        this.router.get('/:id', cache("2 minutes"), TurnosControllers.getOneTurn);
        this.router.post('/', TurnosControllers.createTurn);
        this.router.delete('/:id', TurnosControllers.deleteTurn);
        this.router.put('/:id', TurnosControllers.updateTurn);
    }
    
}

const turnosRoutes = new TurnosRoutes();
export default turnosRoutes.router;