import React, { useEffect } from 'react'
import {io} from 'socket.io-client';

let socket;

export default function Socket() {
    useEffect(() => {
        socketInitialiser();
    }, []);

    const socketInitialiser = async () => {
        await fetch('/api/socket');
        socket = io();

        socket.on('connect', () => {
            console.log('Socket Connected');
        })
    }

  return (
    <div>socket</div>
  )
}
