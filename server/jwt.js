const json = require('jsonwebtoken');
require('dotenv').config();


function generateToken(payload){
    const {username} = payload
    const token = json.sign({username}, process.env.JSON_SECRET, {expiresIn: 60} );
    return token;
}

function verifyToken(token){
    const decoded = json.verify(token, process.env.JSON_SECRET);
    return decoded;
}

// console.log(generateToken({username:"saksham"}))
// console.log(verifyToken("eJghbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNha3NoYW0iLCJpYXQiOjE3NjQ5NDY5MDR9.5XTKB0F8GhhE7D4loWsBBIrkirUhQwZzjmvL9NrUjfs"));

module.exports = {generateToken, verifyToken};