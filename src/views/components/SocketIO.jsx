import { socket } from 'app/config';
import { ShowNotification } from 'views/components/Notification';

const SocketIO = () => {
    socket.on('connect',() => {
        console.log(`connected: ${socket.connected}, id: ${socket.id}`);
        
    });

    socket.on('return-message-customer', (res) => {
        let { message, name } = res;
        ShowNotification(name, message);
    });

}

export default SocketIO
