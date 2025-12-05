const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { verifyToken, generateToken } = require('./jwt');
require('dotenv').config();


const app = express();
// enable CORS
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;
let count = 1;
let todos = [{
    id: count,
    name: 'First Todo', 
}];




app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`);
})

app.get('/login', (req, res)=> {
    
    const username = req.params.username;
    const token = generateToken({username});

    res.json({token});
    
})

// app.post('/signup', (req,res) => {
//     // const {input} = req.body;
//     // let newId = ++count;
//     // todos = [...todos, {newId, input}];
//     // res.json(todos);
// })

