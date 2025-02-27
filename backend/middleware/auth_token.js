const jwt=require("jsonwebtoken")

const key="QWERTYUIUFDCBNM123456789ihvfghjhvchjkmnbvcdfgh9s8s75rezs"
const generateToken = (data) => {
    return jwt.sign({ data }, key, { expiresIn: '1h' })
};
module.exports={
    generateToken
}