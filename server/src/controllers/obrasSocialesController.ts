import { Request, Response } from "express";
import { Mysql } from "../database";

class obrasSocialesController { 

    // Listado de obras sociales ...

    public async list(req: Request, res: Response): Promise<any> {
        try {
            const [obrasocial] = await Mysql.execute('SELECT * FROM obrasocial');
            res.json(obrasocial);
        }catch(error){
            console.log("Error al listar obras sociales: " + error);
        }
    }

    // Obtencion de una obra social ...

    public async getOneObraSocial(req: Request, res: Response): Promise<any>{

        // Recupero los datos la obra social buscada ...
        const { id } = req.params;
        const obrasocial = await Mysql.execute('SELECT * FROM obrasocial WHERE id = ?', [id]);

        // Retornar si hay datos ...
        if(obrasocial.length > 0){
            if(Array.isArray(obrasocial[0])) return res.json(obrasocial[0][0]);
        }
        res.status(404).json({text: 'La obra social no existe'});
    }

    // Insercion de obras sociales ...

    public async create(req: Request, res: Response): Promise<void> {
        // Recupero obra social si existe ...
        const [existeOS] = await Mysql.query('SELECT * FROM obrasocial WHERE nombre = ?', [req.body.nombre]);

        // Validacion e insercion ...
        if (Array.isArray(existeOS) && existeOS.length == 0 ){
            try{
                await Mysql.query('INSERT INTO obrasocial set ?', [req.body]);
                res.json({message: 'Obra social creada'});
            }catch(error){
                console.log("Error al crear obra social: " + error);
            }
        }else{
            res.status(404).json({text: 'Ya existe una obra social con el nombre ingresado'});
        }
    }

    // Modificacion de obras sociales ...

    public async update (req: Request, res: Response) {
        // Recupero obra social si existe ...
        const [existeOS] = await Mysql.query('SELECT * FROM obrasocial WHERE nombre = ?', [req.body.nombre]);
        
        //if(Array.isArray(existeOS) && existeOS.length == 0 ){
            try{
                const { id } = req.params;
                await Mysql.query('UPDATE obrasocial set ? WHERE id = ?', [req.body, id]);
                res.json({mesage: 'Obra social actualizada' });
            }catch(error){
                console.log("Error al actualizar obra social: " + error);
            }
       // }else{
        //    res.status(404).json({text: 'Ya existe una obra social con el nombre ingresado'});
        //}
    }

    // Eliminar obras sociales ...

    public async delete (req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            await Mysql.query('DELETE FROM obrasocial WHERE id = ?', [id]);
            res.json({message:'Obra social eliminada'});
        }catch(error){
            console.log("Error al eliminar obra social: " + error);
        }
    }

}

// Instancio la clase y exporto el objeto
const obrasSociales = new obrasSocialesController();
export default obrasSociales;