import React, { useEffect } from 'react';
import { socket } from 'app/config';
import { useDispatch, useSelector } from 'react-redux';
import { ShowNotification } from 'views/components/Notification';
import { setSocketStatus } from 'app/slice/sliceSosmed';
import { useUserSocketMutation } from 'app/services/apiAuth';
import { authUser } from 'app/slice/sliceAuth';

const SocketIO = () => {
    const dispatch = useDispatch();
    const { username } = useSelector(authUser)
    const [userSocket] = useUserSocketMutation();

    useEffect(() => {
        socket.on('connect', async () => {
            console.log(`connected: ${socket.connected}, id: ${socket.id}`);
            dispatch(setSocketStatus({
                socket_id: socket.id,
                connected: socket.connected
            }))

            //? update socket_id tbl user
            await userSocket({
                username: username,
                socket_id: socket.id
            })
        });

        socket.on('return-message-customer', (res) => {
            let { message, name } = res;
            ShowNotification(name, message);
        });
        socket.on('return-blending-chat', (res) => {
            let { message, name } = res;
            ShowNotification(name, message);
        });
    }, [dispatch,username,userSocket])

    return <></>;
}

export default SocketIO
