const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


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

app.get('/', (req, res)=> {
    res.json('Welcome to Vibe Code')
})

app.post('/todos', (req,res) => {
    const {title} = req.body;
    let newId = ++count;
    todos = [...todos, {newId, input}];
    res.json(todos);
})

