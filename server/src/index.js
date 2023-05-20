import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { StreamChat } from "stream-chat";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const userToken = serverClient.createToken(userId);
       res.json({userId, userToken, username, email, hashedPassword})
        
    }
    catch(error){
        res.json(error);
    }
    
})

app.post('/login',async (req, res)=>{
    const {username, password} = req.body;
    const {users} = await serverClient.queryUsers({name : username});
    if(users.length === 0){ 
        res.json({message : "User not found"});
    }
    else{
        const passwordMatch = await bcrypt.compare(password, users[0].password);
        if(passwordMatch){
            const userToken = serverClient.createToken(users[0].id);
            res.json({userToken, userId : users[0].id, email : users[0].email, hashedPassword : users[0].password})
        }
        else{
            res.json({message : "Incorrect password"});
        }
    }
})

app.listen(3001, () => {
    console.log("server connected to port no 3001!");
});