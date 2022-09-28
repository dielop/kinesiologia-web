import { Request, Response } from "express";
import { Mysql } from "../database";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

class UsersController{

    // Obtengo los usuarios registrados
    public async getUsers(req: Request, res:Response){
       const [users] = await Mysql.query('SELECT * FROM users');

        if(Array.isArray(users) && users.length > 0 ){
            res.json(users);
        }else{
             //Password incorrecto
             res.status(404).json({text: 'No existe el usuario'});
        }
    }

    // Registro de usuarios
    public async addUser(req: Request, res: Response){
        const { username, password, roleId } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // hasheo el password para encriptar
        
        try{
            Mysql.query('INSERT INTO users set ?', { username: username, password: hashedPassword, roleId: roleId });
            res.json({
                msg:'Usuario creado con exito',
            })
        }catch(error){
            //Password incorrecto
            res.status(404).json({text: 'No se pudo crear el usuario'});
        }
    } 

    // Logueo de usuarios 
    public async login(req: Request, res:Response): Promise<any>{
        // Recupero usuario y contrasenia
        const { username, password } = req.body;
                
        // Verificacion de usuario       
        const [login] = await Mysql.execute('SELECT * FROM users WHERE username=?', [username]);
        const loginResult = JSON.stringify(login);
                
        if(loginResult == '[]'){
            //No existe el usuario en la base de datos
            res.status(404).json({text: 'No existe el usuario en la base de datos'});          
        }else{
            //Existe el usuario en la base de datos entonces lo tengo que parsear para recuperar valor
            const parser = JSON.parse(loginResult);
            const userPassword = parser[0].password;
            //Comparamos password
            bcrypt.compare(password, userPassword).then((result)=>{              
                if(result){
                    //Login exitoso -> generamos el token
                    console.log(username);
                    const role = parser[0].roleId;
                    console.log(role);
                    const token = jwt.sign({
                        username:username,
                        roleId:role
                    }, process.env.SECRET_KEY || '123456' )

                    res.json({
                        token
                    });
                }else{
                    //Password incorrecto
                    res.status(404).json({text: 'Contraseña incorrecta'});
                }
            });            
        }
    }
    

}

// Instancio la clase y exporto el objeto
const usersController = new UsersController();
export default usersController;