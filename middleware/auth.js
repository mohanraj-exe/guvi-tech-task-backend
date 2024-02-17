const { VerifyAccessToken } = require("../helper/token.helper");
const User = require("../model/user.model");

const Auth = async (req, res, next) => {

    try{
        const token = req.headers['authorization'];
        // console.log(token);
        
        const verify_token = await VerifyAccessToken(token.split('Bearer')[1]);
        
        // console.log(verify_token);

        const user = await User.findOne({ email: verify_token.id.email }).lean();
    
        // console.log(user);

        req.user_details = user;
    
        return next();
        
    } catch(err){
        return res.status(200).json({ Message: "Not authorized user" })
    }
}

module.exports = { Auth }