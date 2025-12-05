import Button from "../components/Button"
import { useState } from "react"



function Home(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [token, setToken] = useState('');
    // const [todos, setTodos] = useState("");

    const handleAddTodo = async () => {
       
           const data = await handleLogin();
            const newToken = data.token;
            localStorage.setItem('token', newToken);
            setToken(newToken);
            await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers:{'Content-type': 'application/json',  Authorization: `Bearer ${newToken}`},
            body: JSON.stringify({title, description, isCompleted }),
        });
       
       
    }

    const handleLogin = async () => {
        try{
        console.log("handleLogin called");
        const res = await fetch('http://localhost:3000/login');
        const data = await res.json();
        console.log("data:",data);
        return data;
        }
        catch(err) {
            console.log(err);
        }
    }

    return(
        <>  
            <div style={{padding:'2px 2px', margin:'10px'}}>
                    <h1>TODO</h1>
                <div>
                    <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='Enter title..'/>
                </div>
                <div style={{marginTop:'10px'}}>
                    <textarea name="description" id="description" placeholder="Enter description.." onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
            </div>
            <div style={{margin:'9px 9px'}}>
                <label htmlFor="completed">Is Completed?</label>
                <input type="checkbox" name="completed" id="completed" onChange={() => setIsCompleted(!isCompleted)}/>
            </div>
            <Button style={{ backgroundColor: "gray" }} label={"Add Todo"} onClick={handleAddTodo}></Button>
            <Button style={{ backgroundColor: "white", text:'black', border:'1px solid black' }} label={"Login"} onClick={handleLogin}/>
            
        </>
    )
}

export default Home