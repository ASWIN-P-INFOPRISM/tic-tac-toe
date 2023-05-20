import './App.css';
import Login from './components/login/Login';
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/signup/SignUp';
import Room from './components/room/Room';
import Authentication from './components/authentication/Authentication';
import { Route, Routes } from 'react-router-dom';
import {StreamChat} from "stream-chat";
import {Chat} from 'stream-chat-react';
import dotenv from "dotenv";
import Cookies from 'universal-cookie';
import Header from './components/header/Header';
dotenv.config();

function App() {

  const api_key = process.env.REACT_APP_API_KEY;
  const client = StreamChat.getInstance(api_key);
  const cookie = new Cookies();
  const userToken = cookie.get("token");
  const [isAuth, setIsAuth] = useState(false);

  if(userToken){
    client.connectUser({
      id : cookie.get("userId"),
      name : cookie.get("username"),
      password : cookie.get("password"),
      email : cookie.get("email")
    }, userToken).then((user)=>{
      setIsAuth(true);
    })
  }

  return (
    <div className="App">
      <Header isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path='/' element={<Authentication  isAuth={isAuth}/>} />
        <Route path='signup' element={<SignUp  setIsAuth={setIsAuth}/>} />
        <Route path='login' element={<Login setIsAuth={setIsAuth}/>} />
        <Route path='room' element={<Chat client={client}><Room /></Chat>} />
      </Routes>
      {/* <SignUp /> */}
    </div>
  );
}

export default App;
