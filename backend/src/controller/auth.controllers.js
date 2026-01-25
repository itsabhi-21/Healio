const User = require('../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signup(req,res){
    const {name,email,password}= req.body;
    try{
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser= new User({name,email,password:hashedPassword});
        await newUser.save();
        res.status(201).json({message: 'User created successfully'});
    }catch(error){
        console.log('Error in Signup', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

async function login(req,res){
    const {name,email,paasword} = req.body;
    try{
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({error: 'Invalid credentials'});
        }
        const isValidPassword = await bcrypt.compare(password,user.hashedPassword);
        if(!isValidPassword){
            return res.status(400).json({error: 'Invalid credentials'});    
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
      }});
    }catch(error){
        console.log('Error in Login', error);
        res.status(500).json({error: 'Internal server error'});
}
}

module.exports = {
    signup,
    login
};