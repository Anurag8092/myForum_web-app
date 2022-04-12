const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = "HellothisisAnurag";



const fetchuser =  async (req, res, next) => {

    try{
        const token = req.header("auth-token");
        
        const data = jwt.verify(token, JWT_SECRET)
        
        const adminUser = await User.findOne({_id: data.user.id});
        if(!adminUser){
            throw new Error("User not found")
        }
        // console.log(adminUser.id);
        // req.token = token;
        req.user = adminUser;
        next();
    }catch(err){
        res.status(401).send("Unauthorized")
        console.log(err);
    }
}


module.exports = fetchuser;