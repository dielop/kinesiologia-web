import { Router } from 'express';
import profesionalesController from '../controllers/profesionalesController';

class ProfesionalesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config(): void {
        this.router.get('/', profesionalesController.list);
        this.router.get('/:id', profesionalesController.getOne);
        this.router.post('/', profesionalesController.create);
        this.router.delete('/:id', profesionalesController.delete);
        this.router.put('/:id', profesionalesController.update);
    }
    
}

const profesionalesRoutes = new ProfesionalesRoutes();
export default profesionalesRoutes.router;