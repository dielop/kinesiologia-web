import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res:Response, next:NextFunction) => {
    const headerToken = req.headers['authorization'];

    if(headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Si existe token lo corto luego del bearer y verifico si es valido
        const bearerToken = headerToken.slice(7);
        try {
            const tokenValido = jwt.verify(bearerToken, process.env.SECRET_KEY || '123456');
            next();
        }catch(error){
            //Retorno error si expiro o no es valido
            res.status(400).json({
                error:'Token no valido'
            })
        }    
    }else{
        //Retorno si no es valido o no tiene acceso
        res.status(400).json({
            error:'Acceso denegado'
        })
    }
}

export default validateToken;