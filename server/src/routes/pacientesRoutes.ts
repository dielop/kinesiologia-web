import { Router } from 'express';
import pacientesController from '../controllers/pacientesController';
import validateToken from './validateToken';

class PacientesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config(): void {
        this.router.get('/', pacientesController.list);
        this.router.get('/:id', pacientesController.getOne);
        this.router.post('/', pacientesController.create);
        this.router.delete('/:id', pacientesController.delete);
        this.router.put('/:id', pacientesController.update);
    }
    
}

const pacientesRoutes = new PacientesRoutes();
export default pacientesRoutes.router;