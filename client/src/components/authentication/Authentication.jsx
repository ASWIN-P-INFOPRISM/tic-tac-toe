import React from 'react'
import './Authentication.css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Authentication({ isAuth }) {
  const navigate = useNavigate()

  return (
    <div className="authentication">
      <Container className='text-center p-4'>
        {
          !isAuth ?
          <div className="content">
          <Row><Col className='mb-3'><Button className='authentication-button' variant="outline-dark" size='lg' onClick={() => navigate('/signup')}>Signup</Button></Col></Row>
          <Row><Col className='mt-3'><Button className='authentication-button' variant="outline-dark" size='lg' onClick={() => navigate('/login')}>Login</Button></Col></Row>
        </div> : navigate('/room')}
      </Container>
    </div>
  )
}

export default Authentication