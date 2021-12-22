import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { socket } from 'app/config';
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card';
import { Container, MainContent, SubHeader } from 'views/layouts/partials';
import { ShowNotification } from 'views/components/Notification';
import { authUser } from 'app/slice/sliceAuth';
import { getListCustomer } from 'app/services/apiSosmed';
import { setSelectedCustomer } from 'app/slice/sliceSosmed';

function SocketClient() {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const { list_customers, status, selected_customer } = useSelector(state => state.sosialmedia);
    const { username, email_address } = useSelector(authUser);
    const get_list_customers = list_customers.data;

    useEffect(() => {
        socket.on('return-message-customer', (res) => {
            let { message, name } = res;
            ShowNotification(name, message);
            setConversation(
                conversation => [...conversation, res]
            );
        });

        dispatch(getListCustomer())
    }, [dispatch]);

    function sendMessage() {
        let content = {
            chat_id: selected_customer.chat_id,
            customer_id: selected_customer.customer_id,
            message: message,
            name: username,
            email: email_address,
            user_id: socket.id,
            agent_handle: username,
            socket_agentid: socket.id,
            socket_custid: selected_customer.user_id
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
                <div className="row">
                    <div className="col-lg-4 pr-1" style={{ height: '75vh' }}>
                        <Card>
                            <CardHeader>
                                <CardTitle title="Agent Status" subtitle={status.socket_id !== null ? 'Available' : 'Disconnect'} />
                                <CardToolbar>
                                    <span className="text-muted font-weight-bold font-size-sm mr-2">Live</span><br />
                                    <span className="label label-rounded label-primary">10</span>
                                </CardToolbar>
                            </CardHeader>
                            <CardBody className="p-0 scroll-y h-lg-auto">
                                <div className="table-responsive ">
                                    {
                                        get_list_customers?.map((customer, index) => {
                                            return <div className="list list-hover border-bottom" key={index} onClick={(e) => dispatch(setSelectedCustomer(customer))}>
                                                <div className="d-flex align-items-start list-item py-4">
                                                    <div className="symbol symbol-45px symbol-circle mx-2">
                                                        {/* <img alt="Pic" src="/media/avatars/150-2.jpg" /> */}
                                                        <span className="symbol-label font-weight-bolder">C</span>
                                                    </div>
                                                    <div className="flex-grow-1 mt-1 mr-2">
                                                        <div className="mr-2">{customer.name}</div>
                                                        <div className="mt-2">{customer.email}</div>
                                                    </div>
                                                    <div className="d-flex flex-column">
                                                        <div className="text-mute mt-2">8:30 PM</div>
                                                        <span className="label label-light-primary font-weight-bold label-inline mt-2">{customer.customer_id}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-lg-8 pl-1">
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
