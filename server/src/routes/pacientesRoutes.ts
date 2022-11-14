import { Router } from 'express';
import pacientesController from '../controllers/pacientesController';

class PacientesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config(): void {
        this.router.get('/', pacientesController.list);
        this.router.get('/:dni', pacientesController.getOne);
        this.router.post('/', pacientesController.create);
        this.router.delete('/:id', pacientesController.delete);
        this.router.put('/:id', pacientesController.update);
    }
    
}

const pacientesRoutes = new PacientesRoutes();
export default pacientesRoutes.router;