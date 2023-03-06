import React, { useEffect } from 'react'
import {io} from 'socket.io-client';

// const socket = io.connect("/api/socket");
let socket;

export default function Socket() {

    useEffect(() => {
        socketInitialiser();
    }, [])

    const socketInitialiser = async () => {
        await fetch('/api/socket');
        socket = io();
        socket.on('connect', () => {
            console.log('Socket connected');
        })
        
        socket.on('resp-click', (msg) => {
            console.log('received', msg);
        })
    }

    const clickHandler = () => {
        socket.emit('button-click', {message: 'Hi'});
    }

  return (
    <div>
        socket
    <button onClick={clickHandler}>Click</button>    
    </div>
  )
}
