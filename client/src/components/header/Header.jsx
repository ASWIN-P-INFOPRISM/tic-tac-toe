import React from 'react'
import './Header.css'
import { Button } from 'react-bootstrap'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';

function Header({isAuth, setIsAuth}) {
  const cookie = new Cookies();
  const navigate = useNavigate();
  
  const logout = ()=>{
    cookie.remove("token");
    cookie.remove("userId");
    cookie.remove("username");
    cookie.remove("email");
    cookie.remove("password");
    setIsAuth(false);
    navigate('/');
  }
  return (
    <div>
        <header className='header'>
            <div className='header-menu'>
                <h2>TIC TAC TOE</h2>
                <Button variant="outline-light" className='logout-btn' style={{display : !isAuth ? 'none' : 'flex'}} onClick={logout}>Logout</Button>
            </div>
        </header>
    </div>
  )
}

export default Header