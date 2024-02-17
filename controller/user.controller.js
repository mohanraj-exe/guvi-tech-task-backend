const { GenerateToken } = require("../helper/token.helper");
const User = require("../model/user.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const SignUp = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email: email }).lean();

        if(!user){
            const hash_password = await bcrypt.hash(password, saltRounds);
    
            await User.create({
                name: name,
                email: email,
                password: hash_password
            });
    
            return res.status(201).json({ Message: "User signed up successfully" });

        } else{
            return res.status(200).json({ Message: "Email already exists" });
        }
    } catch (err) {
        return res.status(400).json({ data: err })
    }
}

const Login = async (req, res) => {

    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email: email }).lean();
        
        if(!user){
            return res.status(200).json({ Message: "User not found" });
        }

        const password_match = await bcrypt.compare(password, user.password);

        if(!user || !password_match){
            return res.status(200).json({ Message: "User not found" });
        }

        if(user && password_match){
            const token = GenerateToken({ email: user.email });
            return res.status(200).json({ email: user.email, token })
            
        } 

    } catch (err) {
        return res.status(400).json({ data: err })
    }
}

const UserProfile = async (req, res) => {

    try {

        // console.log(req.body);
        
        const { age, gender, dob, mobile } = req.body;

        const profile = await User.findByIdAndUpdate({_id: req.user_details._id }, {
            
            age: age,
            gender: gender,
            dob: dob,
            mobile: mobile

        }, { new: true });

        return res.status(200).json({ Message: "Profile updated successfully", data: profile });

    } catch (err) {
        return res.status(400).json({ data: err });
    }
}

module.exports = { SignUp, Login, UserProfile }