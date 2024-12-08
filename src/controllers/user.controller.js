import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.model.js";

const register = async(req, res)=>{
    try {
        //console.log(req.body);
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                ok: false,
                msg: "Datos incompletos"
            })
        }
        const user = await UserModel.findOneByEmail(email);
        if (user) {
            return res.status(409).json({
                ok: false,
                msg: "Email ya se encuentra registrado"
            })
        }

        //hashear password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UserModel.create({username, email, password: hashedPassword});

        const token = jwt.sign({
            email: newUser.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return res.status(201).json({
            ok: true,
            msg: token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Server Error"
        })
    }
};

const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                ok: false,
                msg: "Email y Password son requiridos"
            })
        }
        const user = await UserModel.findOneByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "Usuario no registrado"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(401).json({ error: "Credenciales inválidas"})
        }

        const token = jwt.sign({
            email: user.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
        return res.status(200).json({
            ok: true,
            msg: token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Server Error"
        })
    }
};

const userProfile = async(req, res)=>{
    try {
        const user = await UserModel.findOneByEmail(req.email);
        return res.json({
            ok: true,
            msg: user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Server Error"
        })
    }
}
export const UserController = {
    register,
    login,
    userProfile
};