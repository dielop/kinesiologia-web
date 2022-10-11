import { Router } from 'express';
import rolesControllers from '../controllers/rolesController';

class RolesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config(): void {
        this.router.post('/', rolesControllers.addRole);
        this.router.get('/', rolesControllers.listRole);
        this.router.get('/:id', rolesControllers.getOneRol);
        this.router.delete('/:id', rolesControllers.deleteRole);
        this.router.put('/:id', rolesControllers.updateRole);
    }
    
}

const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;