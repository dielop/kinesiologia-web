import { Router } from 'express';
import obrasSocialesController from '../controllers/obrasSocialesController'

class ObrasSocialesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config(): void {
        this.router.get('/', obrasSocialesController.list);
        this.router.get('/:id', obrasSocialesController.getOneObraSocial);
        this.router.post('/', obrasSocialesController.create);
        this.router.delete('/:id', obrasSocialesController.delete);
        this.router.put('/:id', obrasSocialesController.update);
    }
    
}

const obrasSocialesRoutes = new ObrasSocialesRoutes();
export default obrasSocialesRoutes.router;