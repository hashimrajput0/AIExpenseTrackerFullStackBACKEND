import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js"
import bcrypt from "bcryptjs";



async function RegisterController(req, res) {
    try {

        const {username, email ,password} =  req.body

        if(!username || !email || !password) {
            return res.status(400).json({
                message : "All Fields are required"
            })
        }

        const userAlreadyExists =  await userModel.findOne({
            $or : [
                {email},{username}
            ]
        })

        if(userAlreadyExists) {
            return res.status(400).json({
                message : "Username or Email Already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password : hashedPassword
        })


        const token = jwt.sign({ id : user._id }, process.env.JWT_SECRET, {expiresIn : "7d"})
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true 
        })

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
        }
        })
  
  

    } catch(err) {
        res.status(500).json({
            message : "Internal Server Error at RegisterAuthController"
        })

        console.log(err);
        

    }
}



async function LoginController(req, res) {
    try {

        const {email, password} = req.body

        const User =  await userModel.findOne({email})
        if(!User) {
            return res.status(400).json({
                message : "User Does not Exist"
            })
        }
         

    const isMatched = await bcrypt.compare(
        password,
        User.password
    );

    if(!isMatched) {
        return res.status(400).json({
            message : "Invalid Password"
        })
    }



        const token = jwt.sign({ id : User._id }, process.env.JWT_SECRET, {expiresIn : "7d"})
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
               sameSite: "none",
            secure: true 
        })

        return res.status(201).json({
            message: "User Logged in successfully",
            user: {
                id: User._id,
                username: User.username,
                email: User.email
        }
        })
        
    } catch(err) {
        console.log("Internal Server Error at LoginController : ", err)
        res.status(500).json({
            message : "Internal Server Error at LoginController"
        })
    }
    
}


async function LogoutController(req, res) {


try {

    res.clearCookie("token", {
        httpOnly: true,
           sameSite: "none",
            secure: true 
});

        res.status(200).json({
            message : "Successfully Logout"
        })

} catch(err) {
    return res.status(500).json({
        message : "Internal Server Error at LogoutController"
    })

}
}


async function meController(req, res) {


try {
    const id =  req.userID
    const User =  await userModel.findOne(
        {
            _id : id
        })
        res.status(200).json({
            id : User._id,
            username : User.username,
            email : User.email
        })

} catch(err) {
    res.status(500).json({
        message : "Unauthorized or Internal Server Error at meController"
    })
}

}


export { RegisterController, LoginController, LogoutController, meController };
