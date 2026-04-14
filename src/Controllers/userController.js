import expressAsyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@desc Register a user
//@route " GET /api/users/register"
//@access public
const registerUser = expressAsyncHandler(async(req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required!");
    }

    const userAvailable = await User.findOne({email});
    
    if(userAvailable) {
        res.status(400)
        throw new Error("User already registered!");
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    });
    
    if(newUser) {
        res.status(201).json({_id: newUser._id, email: newUser.email})
    }
    else {
        res.status(400);
        throw new Error("User data is not valid");
    }

    console.log("New user created successfully: ", newUser);
    res.json({message: "User registered", });
})

//@desc Login a user
//@route " GET /api/users/login"
//@access public
const loginUser = expressAsyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatorry!');
    }

    const user = await User.findOne({ email });

    // compare the user given password and the storeed DB password
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            // payload
            user: {
                user: user.username,
                email: user.email,
                id: user._id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, // Access token secret
        {
          expiresIn: "15m"  // token expiration time
        }
    )
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("email or password is not valid")
    }
})

//@desc Get current user
//@route " GET /api/users/current"
//@access public
const getCurrentUser = expressAsyncHandler(async(req, res) => {
    res.json({result: req.user});
})


export {
    registerUser,
    loginUser,
    getCurrentUser
}