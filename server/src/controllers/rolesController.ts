import { Response, Request } from "express";
import { Mysql } from "../database";

class rolesControllers {

    public async listRole(req: Request, res: Response): Promise<any> {
        try {
            const [roles] = await Mysql.execute('SELECT * FROM roles');
            res.json(roles);
        }catch(error){
            console.log("Error al listar los roles de usuario: " + error);
        }
    }

    public async addRole(req: Request, res: Response): Promise<void> {
        // Insercion de rol ...
        try{
            await Mysql.query('INSERT INTO roles ? ', [req.body]);
            res.json({message: 'Nuevo rol creado'});
        }catch(error){
            res.status(404).json({text: 'Error al crear nuevo Rol'});
        }

    }

    public async updateRole(req: Request, res: Response) {
        // Recupero obra social si existe ...
        const [existeRol] = await Mysql.query('SELECT * FROM roles WHERE nombre = ?', [req.body.nombre]);
        
        //if(Array.isArray(existeOS) && existeOS.length == 0 ){
            try{
                const { id } = req.params;
                await Mysql.query('UPDATE roles set ? WHERE id = ?', [req.body, id]);
                res.json({mesage: 'Rol actualizado' });
            }catch(error){
                console.log("Error al actualizar el rol: " + error);
            }
    }

    public async deleteRole(req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            await Mysql.query('DELETE FROM roles WHERE id = ?', [id]);
            res.json({message:'Rol eliminado'});
        }catch(error){
            console.log("Error al eliminar el Rol seleccionado: " + error);
        }
    }

}

// Instancio la clase y exporto el objeto
const RolesControllers = new rolesControllers();
export default RolesControllers;