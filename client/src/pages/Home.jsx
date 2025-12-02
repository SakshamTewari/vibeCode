import Button from "../components/Button"
import { useState } from "react"



function Home(){

    const [input, setInput] = useState('');
    // const [todos, setTodos] = useState("");

    const handleAddTodo = async () => {
        const res = await fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify({input: input}),
        });
        const data = await res.json();
        console.log(data);
        // setTodos(data);
    }

    return(
        <>
            <input type="text" value={input} onChange={(e)=> setInput(e.target.value)}/>
            <Button style={{ backgroundColor: "gray" }} label={"Add Todo"} onClick={handleAddTodo}></Button>
            
            
        </>
    )
}

export default Home