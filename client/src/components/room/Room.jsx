import React, { useState } from 'react'
import './Room.css';
import { Channel, useChatContext } from 'stream-chat-react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import NewGame from '../newGame/NewGame';

function Room() {
    const [code, setCode] = useState("");
    const [channel, setChannel] = useState(null);
    const { client } = useChatContext();

    const createChannel = async (event) => {
        event.preventDefault();
        const response = await client.queryUsers({ name: code });

        if (response.users.length === 0) {
            alert("User not found")
        }
        else {
            const newChannel = await client.channel("messaging", {
                members: [client.userID, response.users[0].id]
            });

            await newChannel.watch();
            setChannel(newChannel);
        }
    }
    return (
        <div className='room'>
            {
                channel ?

                    <Channel channel={channel}><NewGame channel={channel}/></Channel> :

                    <Container className='text-center'>
                    <h1 className='title'>Create or Join Game</h1>
                    <div className="room-form p-4">
                        <Row className='mb-3'>
                            <Col md={4}></Col>
                            <Col xs={12} md={4}>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Enter rival's username" onChange={(event)=>{setCode(event.target.value)}} required/>
                                    </Form.Group>
    
                                    <Button variant="dark" type="submit" onClick={createChannel}>Create/Join</Button>
                                </Form>
                            </Col>
                            <Col md={4}></Col>
                        </Row>
                    </div>
                </Container>
            }
        </div>
    )
}

export default Room