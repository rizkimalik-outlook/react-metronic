import React, { useState, useEffect } from 'react'
import { socket, AuthUser } from 'store';
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'components/card';
import { Container, MainContent, SubHeader } from 'layouts/partials';
import { useRecoilValue } from 'recoil';

function SocketClient() {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const { username } = useRecoilValue(AuthUser);
    const [room, setRoom] = useState('');
    // const [socketid, setSocketid] = useState('');
    const [status, setStatus] = useState('');
    const [to, setTo] = useState('');

    useEffect(() => {
        socket.auth = { username };
        socket.connect();

        console.log(`${socket.auth.username} - connected : ${socket.id}`);
        let getstatus = socket.id !== '' ? 'Available' : 'Disconnect';
        setStatus(getstatus);
        // setSocketid(socket.id);

        socket.on('return-message', (res) => {
            // let { room, message, socket_id, username, to } = res;
            console.log(res);
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
            to: to,
            from: socket.id
        }
        socket.emit('send-message', content)
        setConversation(
            conversation => [...conversation, content]
        );
        setMessage('');
    }


    return (
        <MainContent>
            <SubHeader active_page="Socket Master" menu_name="Socket" modul_name="Socket Client" />

            <Container>
                <div className="row">
                    <div className="col-lg-3 p-0">
                        <Card>
                            <CardHeader>
                                <CardTitle title="Agent Status" subtitle={status} />
                                <CardToolbar>
                                    <span className="text-muted font-weight-bold font-size-sm mr-2">Live</span><br />
                                    <span className="label label-rounded label-primary">10</span>
                                </CardToolbar>
                            </CardHeader>
                            <CardBody className="p-0 scroll-y h-600 h-lg-auto">
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
                    <div className="col-lg-9 p-0">
                        <Card>
                            <CardHeader>
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
                            <input type="text" name="to" onChange={(e) => setTo(e.target.value)} value={to} className="form-control" placeholder="to" />

                                <textarea
                                    className="form-control form-control-flush mb-3"
                                    rows={1}
                                    data-kt-element="input"
                                    placeholder="Type a message"
                                    name="message"
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                />
                                <div className="d-flex flex-stack">
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
