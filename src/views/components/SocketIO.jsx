import React, { useEffect } from 'react';
import { socket } from 'app/config';
import { useDispatch } from 'react-redux';
import { ShowNotification } from 'views/components/Notification';
import {setSocketStatus} from 'app/slice/sosmedSlice';

const SocketIO = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('connect',() => {
            console.log(`connected: ${socket.connected}, id: ${socket.id}`);
            dispatch(setSocketStatus({
                socket_id: socket.id,
                connected: socket.connected
            }))
            
        });
    
        socket.on('return-message-customer', (res) => {
            let { message, name } = res;
            ShowNotification(name, message);
        });
    }, [dispatch])
    
    return <></>;
}

export default SocketIO
