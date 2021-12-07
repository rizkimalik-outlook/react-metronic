import React, { useState, useEffect } from 'react'
import { socket, AuthUser } from 'store';
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'components/card';
import { Container, MainContent, SubHeader } from 'layouts/partials';
import { useRecoilValue } from 'recoil';
import { AskPermission, ShowNotification } from 'components/Notification';

function SocketClient() {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const { username } = useRecoilValue(AuthUser);
    const [room, setRoom] = useState('');
    const [status, setStatus] = useState('');
    const [clientid, setClientid] = useState('');

    useEffect(() => {
        socket.auth = { username };
        socket.connect();
        AskPermission();

        console.log(`${socket.auth.username} - connected : ${socket.id}`);
        let getstatus = socket.id !== '' ? 'Available' : 'Disconnect';
        setStatus(getstatus);

        socket.on('return-message-client', (res) => {
            let { message, username } = res;
            ShowNotification(username,message);
            setConversation(
                conversation => [...conversation, res]
            );
        });
    }, [username]);

    function joinRoom(room_id) {
        setRoom(room_id);
        socket.emit('join-room', ({ username, room_id }))
    }

    function sendMessage() {
        let content = {
            room: room,
            message: message,
            socket_id: socket.id,
            username: username,
            agent_id: socket.id,
            client_id: clientid
        }
        socket.emit('send-message-agent', content)
        setConversation(
            conversation => [...conversation, content]
        );
        setMessage('');
    }


    return (
        <MainContent>
            <SubHeader active_page="Socket Master" menu_name="Socket" modul_name="Socket Client" />

            <Container>
                <div className="row d-lg-flex">
                    <div className="col-lg-3 vh-100 pr-1">
                        <Card>
                            <CardHeader>
                                <CardTitle title="Agent Status" subtitle={status} />
                                <CardToolbar>
                                    <span className="text-muted font-weight-bold font-size-sm mr-2">Live</span><br />
                                    <span className="label label-rounded label-primary">10</span>
                                </CardToolbar>
                            </CardHeader>
                            <CardBody className="p-0 scroll-y h-100 h-lg-auto">
                                <div className="table-responsive ">
                                    <div className="list list-hover border-bottom" onClick={(e) => joinRoom('200210022')}>
                                        <div className="d-flex align-items-start list-item card-spacer-x py-4">
                                            <div className="symbol symbol-45px symbol-circle mr-2">
                                                {/* <img alt="Pic" src="/metronic8/react/demo1/media/avatars/150-2.jpg" /> */}
                                                <span className="symbol-label font-weight-bolder">OJ</span>
                                            </div>
                                            <div className="flex-grow-1 mt-1 mr-2">
                                                <div className="mr-2">Digital</div>
                                                <div className="mt-2">
                                                    <span className="label label-light-primary font-weight-bold label-inline">inbox</span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-mute">8:30 PM</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-lg-9 pl-1">
                        <Card>
                            <CardHeader className="border-bottom">
                                <CardTitle title="Socket Client" subtitle={socket.id} />
                            </CardHeader>
                            <CardBody>
                                {
                                    conversation.map((data, index) => {
                                        return (
                                            <div key={index}>
                                                <h5>{data.username}</h5>
                                                <p>{data.room} - {data.message}</p>
                                            </div>
                                        )
                                    })
                                }
                            </CardBody>
                            {/* <CardFooter>
                                <input type="text" name="message" onChange={(e) => setMessage(e.target.value)} value={message} className="form-control" placeholder="Msg" />
                                <button onClick={sendMessage} className="btn btn-primary mx-2 btn-sm">send</button>
                            </CardFooter> */}
                            <div className="card-footer p-2">
                            <input type="text" name="clientid" onChange={(e) => setClientid(e.target.value)} value={clientid} className="form-control" placeholder="to" />

                                <textarea
                                    className="form-control form-control-flush mb-3"
                                    rows={1}
                                    data-kt-element="input"
                                    placeholder="Type a message"
                                    name="message"
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                />
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-sm btn-icon btn-active-light-primary" type="button" data-bs-toggle="tooltip"
                                            title="Coming soon"><i className="fa fa-home" /></button>
                                        <button className="btn btn-sm btn-icon btn-active-light-primary" type="button" data-bs-toggle="tooltip"
                                            title="Coming soon"><i className="fa fa-home" /></button>
                                    </div>
                                    <button onClick={sendMessage} className="btn btn-primary" type="button" data-kt-element="send">Send</button>
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </Container>
        </MainContent>
    )
}

export default SocketClient
