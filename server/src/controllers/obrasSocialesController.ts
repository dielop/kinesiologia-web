import { Request, Response } from "express";
import { Mysql } from "../database";

class obrasSocialesController { 

    public async list(req: Request, res: Response): Promise<any> {
        try {
            const [obrasocial] = await Mysql.execute('SELECT * FROM obrasocial');
            res.json(obrasocial);
        }catch(error){
            console.log("Error al listar obras sociales: " + error);
        }
    }

    public async getOneObraSocial(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const obrasocial = await Mysql.execute('SELECT * FROM obrasocial WHERE id = ?', [id]);
        if(obrasocial.length > 0){
            if(Array.isArray(obrasocial[0])) return res.json(obrasocial[0][0]);
        }
        res.status(404).json({text: 'La obra social no existe'});
    }

    public async create(req: Request, res: Response): Promise<void> {
        try{
            await Mysql.query('INSERT INTO obrasocial set ?', [req.body]);
            res.json({message: 'Obra social creada'});
        }catch(error){
            console.log("Error al crear obra social: " + error);
        }
    }

    public async update (req: Request, res: Response) {
        try{
            const { id } = req.params;
            await Mysql.query('UPDATE obrasocial set ? WHERE id = ?', [req.body, id]);
            res.json({mesage: 'Obra social actualizada' });
        }catch(error){
            console.log("Error al actualizar obra social: " + error);
        }
    }

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