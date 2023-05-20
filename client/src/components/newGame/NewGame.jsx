import React, { useState } from 'react'
import './NewGame.css'

function NewGame({channel}) {

    const [playersJoined,setPlayersJoined] = useState(channel.state.watcher_count === 2)
    
    channel.on("user.watching.start",(event)=>{
        setPlayersJoined(channel.state.watcher_count === 2)
    })

    if(!playersJoined){
        return (
            <div className='waiting-message'>
                <h4>Waiting for other player to join...</h4>
            </div>
        )
    }
    else{
        return (
            <div>Game begins</div>
        )
    }
}

export default NewGame