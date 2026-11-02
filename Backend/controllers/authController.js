//Authcontroller functionalities like to register an user and login user etc.
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser  = async (req, res) =>{
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "Name, email, and password are required",
            });
        }

        if(password.length < 6 ){
            return res.status(400).json({
                message: "Password length must be atleast 6 characters",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if(existingUser){
            return res.status(409).json({
                message: "Email is already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User registered successfully",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    }catch(error){
        console.error("Registration error: ",error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

export const loginUser = async (req,res) =>{
    try{
        const {email, password} = req.body || {};

        if(!email || !password){
            return res.status(400).json({
                message:"Email and password are required",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail,
        });

        if(!user){
            return res.status(401).json({
                message:"Invalid email or password",
            });
        }

        const passwordMatches = await bcrypt.compare(password,user.password);

        if(!passwordMatches){
            return res.status(401).json({
                message:"Invalid email or password",
            });
        }

        const token = jwt.sign({userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        return res.status(200).json({
            message:"Login successful",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    }catch(error){
        console.error("Login error:",error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};
