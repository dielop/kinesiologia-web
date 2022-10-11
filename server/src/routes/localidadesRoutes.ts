import { Router } from 'express';
import localidadesController from '../controllers/localidadesController'

class LocalidadesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config(): void {
        this.router.get('/', localidadesController.listLocalidades);
        this.router.get('/:id', localidadesController.getOneLocalidad);
        this.router.post('/', localidadesController.createLocalidad);
        this.router.delete('/:id', localidadesController.deleteLocalidades);
        this.router.put('/:id', localidadesController.updateLocalidad);
    }
    
}

const localidadesRoutes = new LocalidadesRoutes();
export default localidadesRoutes.router;