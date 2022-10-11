import { Request, Response } from "express";
import { Mysql } from "../database";

class localidadesController { 

    // Listado de localidades ...

    public async listLocalidades(req: Request, res: Response): Promise<any> {
        try {
            const [obrasocial] = await Mysql.execute('SELECT * FROM localidades');
            res.json(obrasocial);
        }catch(error){
            console.log("Error al listar localidades: " + error);
        }
    }

    // Obtencion de una localidad ...

    public async getOneLocalidad(req: Request, res: Response): Promise<any>{

        // Recupero los datos la obra social buscada ...
        const { id } = req.params;
        const localidad = await Mysql.execute('SELECT * FROM localidades WHERE idLocalidades = ?', [id]);

        // Retornar si hay datos ...
        if(localidad.length > 0){
            if(Array.isArray(localidad[0])) return res.json(localidad[0][0]);
        }
        res.status(404).json({text: 'La obra social no existe'});
    }

    // Alta de localidad ...

    public async createLocalidad(req: Request, res: Response): Promise<void> {
        // Recupero localidad si existe ...
        const [existeLocalidad] = await Mysql.query('SELECT * FROM localidades WHERE nombreLocalidades = ?', [req.body.nombreLocalidades]);

        // Validacion e insercion ...
       if (Array.isArray(existeLocalidad) && existeLocalidad.length == 0 ){
            try{
                await Mysql.query('INSERT INTO localidades set ?', [req.body]);
                res.json({message: 'Localidad creada'});
            }catch(error){
                console.log("Error al crear localidad: " + error);
            }
        }else{
            res.status(404).json({text: 'Ya existe una localidad con el nombre ingresado'});
        }
    }

    // Modificacion de localidad ...

    public async updateLocalidad (req: Request, res: Response) {
        // Recupero obra social si existe ...
        const [existeLocalidad] = await Mysql.query('SELECT * FROM localidades WHERE nombreLocalidades = ?', [req.body.nombreLocalidades]);
        
        //if(Array.isArray(existeOS) && existeOS.length == 0 ){
            try{
                const { id } = req.params;
                await Mysql.query('UPDATE localidades set ? WHERE idLocalidades = ?', [req.body, id]);
                res.json({mesage: 'Localidad actualizada' });
            }catch(error){
                console.log("Error al actualizar localidad: " + error);
            }
       // }else{
        //    res.status(404).json({text: 'Ya existe una obra social con el nombre ingresado'});
        //}
    }

    // Eliminar localidades ...

    public async deleteLocalidades (req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            await Mysql.query('DELETE FROM localidades WHERE idLocalidades = ?', [id]);
            res.json({message:'Localidad eliminada'});
        }catch(error){
            console.log("Error al eliminar localidad: " + error);
        }
    }

}

// Instancio la clase y exporto el objeto
const localidad = new localidadesController();
export default localidad;