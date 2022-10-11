import { Response, Request } from "express";
import { Mysql } from "../database";

class RolesControllers {

    public async listRole(req: Request, res: Response): Promise<any> {
        try {
            const [roles] = await Mysql.execute('SELECT * FROM roles');
            res.json(roles);
        }catch(error){
            console.log("Error al listar los roles de usuario: " + error);
        }
    }

    // Obtencion de un paciente ... 

    public async getOneRol(req: Request, res: Response): Promise<any>{

        // Recupero los datos del rol buscado ...
        const { id } = req.params;
        const rol = await Mysql.execute('SELECT * FROM roles WHERE idRoles = ?', [id]);

        // Retornar si hay datos ...
        if(rol.length > 0){
            console.log(JSON.stringify(rol));
            if(Array.isArray(rol[0])) return res.json(rol[0][0]);
        }
        res.status(404).json({text: 'El rol no existe'});
    }

    public async addRole(req: Request, res: Response): Promise<void> {
        // Insercion de rol ...
        try{
            await Mysql.query('INSERT INTO roles set ? ', [req.body]);
            res.json({message: 'Nuevo rol creado'});
        }catch(error){
            res.status(404).json({text: 'Error al crear nuevo Rol'});
        }

    }

    public async updateRole(req: Request, res: Response) {
        // Recupero rol si existe ...
        const [existeRol] = await Mysql.query('SELECT * FROM roles WHERE nombreRoles = ?', [req.body.nombreRoles]);
        
        //if(Array.isArray(existeOS) && existeOS.length == 0 ){
            try{
                const { id } = req.params;
                await Mysql.query('UPDATE roles set ? WHERE idRoles = ?', [req.body, id]);
                res.json({message: 'Rol actualizado' });
            }catch(error){
                console.log("Error al actualizar el rol: " + error);
            }
    }

    public async deleteRole(req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            await Mysql.query('DELETE FROM roles WHERE idRoles = ?', [id]);
            res.json({message:'Rol eliminado'});
        }catch(error){
            console.log("Error al eliminar el Rol seleccionado: " + error);
        }
    }

}

// Instancio la clase y exporto el objeto
const rolesControllers = new RolesControllers();
export default rolesControllers;