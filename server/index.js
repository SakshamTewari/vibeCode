const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { verifyToken, generateToken } = require('./jwt');
const redis = require('./config/redis');
require('dotenv').config();


const app = express();
// enable CORS
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;


app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`);
})

app.post('/login', async (req, res)=> {
    
    const {username} = req.body;
    
    // Generate token
    const token = generateToken({username});

    // Store session in redis
    await redis.set(`session:${token}`, JSON.stringify({createdAt: Date.now()}), 'EX', 3600);

    res.json({token});
    
})

// app.post('/signup', (req,res) => {
//     // const {input} = req.body;
//     // let newId = ++count;
//     // todos = [...todos, {newId, input}];
//     // res.json(todos);
// })

