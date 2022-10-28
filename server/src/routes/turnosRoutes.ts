import { Router } from 'express';
import TurnosControllers from '../controllers/turnosControllers';

class TurnosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config(): void {
        this.router.get('/', TurnosControllers.listTurns);
        this.router.get('/turnosReservados/:dateSelected', TurnosControllers.listTurnosReserved);
        this.router.get('/:id', TurnosControllers.getOneTurn);
        this.router.post('/', TurnosControllers.createTurn);
        this.router.delete('/:id', TurnosControllers.deleteTurn);
        this.router.put('/:id', TurnosControllers.updateTurn);
    }
    
}

const turnosRoutes = new TurnosRoutes();
export default turnosRoutes.router;