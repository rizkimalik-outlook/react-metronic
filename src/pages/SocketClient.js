import React, { useState } from 'react'
import { socket } from 'store';

function SocketClient() {
    const [message, setMessage] = useState('');
    const [dataChat, setDataChat] = useState('');
    const [room, setRoom] = useState(''); //chatid

    socket.on('return-message', res => {
        setDataChat(res)
    })

    // const onHandleChange = (event) => {
    //     setMessage(event.target.value);
    // }

    function joinRoom() {
        socket.emit('join-room', room)
    }

    function sendMessage() {
        socket.emit('send-message', message, room)
    }


    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="d-flex flex-column-fluid">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-custom card-stretch gutter-b">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h3 className="card-label">Socket Client</h3>
                                    </div>
                                </div>
                                <div className="card-body">

                                    {dataChat}
                                    {/* <input type="text" name="message" onChange={onHandleChange} value={message} className="form-control" placeholder="Msg" /> */}

                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <input type="text" name="room" onChange={(e) => setRoom(e.target.value)} value={room} className="form-control" placeholder="room" />
                                    <input type="text" name="message" onChange={(e) => setMessage(e.target.value)} value={message} className="form-control" placeholder="Msg" />
                                    <button onClick={sendMessage} className="btn btn-light-primary font-weight-bolder btn-sm">send</button>
                                    <button onClick={joinRoom} className="btn btn-light-primary font-weight-bolder btn-sm">join</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SocketClient
