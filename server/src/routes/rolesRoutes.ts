import { Router } from 'express';
import RolesControllers from '../controllers/rolesController';

class RolesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config(): void {
        this.router.post('/', RolesControllers.addRole);
        this.router.get('/', RolesControllers.listRole);
        this.router.delete('/:id', RolesControllers.deleteRole);
        this.router.put('/:id', RolesControllers.updateRole);
    }
    
}

const rolesRoutes = new RolesRoutes();
export default RolesRoutes;