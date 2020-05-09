'use strict';
const jwt = require('jsonwebtoken');

module.exports = {
    tokenValidation: (req, res, next) => {
        const header = req.headers['authorization']
        if (header != undefined) {
            if (header.includes('Bearer') ) {
                const Bearertoken = header.split(' ')
                const token = Bearertoken[1]
                try {
                    const result = jwt.verify(token, process.env.SECRETAPI)
                    //req.tokendata = result //Utilizar esses dados ao inves de passar no body
                    next();
                }
                catch (error) {
                    return res.status(401).json({isValid: false, errorMessage: error.message});
                }
            }
            else {
                let error = { 
                    isValid: false,
                    errorMessage: `Authentication error. Bearer Token required.`,
                };
                return res.status(401).json(error);
            }
        }
        else {
            let error = { 
                isValid: false,
                errorMessage: `Authentication error. Token required.`,
            };
            return res.status(401).json(error);
            
        }},

    tokenGenerate: (user) => {
        const token = jwt.sign({ user }, process.env.SECRETAPI, { expiresIn: "24h" });
        return token
        
    }
}