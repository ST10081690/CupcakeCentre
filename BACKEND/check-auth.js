//Referencing:
//The Independent Institute of Education. 2023. APDS7311 Lab Guide.

require('dotenv').config
const jwt = require('jsonwebtoken');

//verifying token to validate authorization
module.exports=(req, res, next)=>
{
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "2c98b56d97a0360502e05d6e1b58e7cb52788a350c5fa00972992eb6c8852b3852cea1b5f3644efb0bac42e798d535220c0310d0554734f0f96e34016e04be94")
        next();
    }
    catch(error)
    {
        res.status(401).json({
            message:"Invalid Token."
        });
        
    }

}