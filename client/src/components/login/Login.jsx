import React, { useState } from 'react'
import { Row, Container, Col, Form, Button } from 'react-bootstrap'
import './Login.css'
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

function Login({setIsAuth}) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cookie = new Cookies();
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/login", { username, password }).then((res) => {
      if (!res.data.message) {
        const { userToken, userId, email, hashedPassword } = res.data;
        cookie.set("token", userToken);
        cookie.set("userId", userId);
        cookie.set("username", username);
        cookie.set("email", email);
        cookie.set("password", hashedPassword);
        setIsAuth(true);
        navigate('/room');
      }
      else {
        alert(res.data.message);
        window.location.reload();
      }
    })
  }

  return (
    <div className='login'>
      <Container className='login-content text-center'>
        <h1 className='title'>Login</h1>
        <div className="login-form p-4">
          <Row className='mb-3'>
            <Col md={4}></Col>
            <Col xs={12} md={4}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter username" onChange={(event) => { setUsername(event.target.value) }} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} required />
                </Form.Group>

                <Button variant="dark" type="submit" onClick={login}>Login</Button>
              </Form>
            </Col>
            <Col md={4}></Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default Login