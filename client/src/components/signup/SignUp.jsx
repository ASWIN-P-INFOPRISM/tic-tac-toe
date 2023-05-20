import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Axios from "axios"
import Cookies from "universal-cookie";
import './SignUp.css'
import { useNavigate } from 'react-router-dom';

function SignUp({setIsAuth}) {

  const [user, setUser] = useState(null)
  const cookie = new Cookies();
  const navigate = useNavigate();

  const signUp = (event)=>{
  
    Axios.post("http://localhost:3001/signup",user).then((res)=>{
      const {userId, userToken, username, email, hashedPassword} = res.data;
      cookie.set("token",userToken);
      cookie.set("userId",userId);
      cookie.set("username",username);
      cookie.set("email",email);
      cookie.set("password",hashedPassword);
      setIsAuth(true);
      navigate('/room');
    })
  }

  return (
    <div className='signup'>
      <Container className='signup-content text-center'>
        <h1 className='title'>Sign Up</h1>
        <div className="signup-form p-4">
          <Row className='mb-3'>
            <Col md={4}></Col>
            <Col xs={12} md={4}>
              <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter username" onChange={(event)=>{setUser({...user, username : event.target.value})}} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter email" onChange={(event)=>{setUser({...user, email : event.target.value})}} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" onChange={(event)=>{setUser({...user, password : event.target.value})}} required/>
                </Form.Group>

                <Button variant="dark" type="submit" onClick={signUp}>Sign Up</Button>
              </Form>
            </Col>
            <Col md={4}></Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default SignUp