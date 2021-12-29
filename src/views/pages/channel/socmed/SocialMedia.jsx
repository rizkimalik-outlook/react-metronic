import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from 'app/config';
import Datetime from 'views/components/Datetime';
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card';
import { Container, MainContent, SubHeader } from 'views/layouts/partials';
import { authUser } from 'app/slice/sliceAuth';
import { getListCustomer } from 'app/services/apiSosmed';
import { setSelectedCustomer } from 'app/slice/sliceSosmed';

const SocialMedia = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const { list_customers, status, selected_customer } = useSelector(state => state.sosialmedia);
    const { username, email_address } = useSelector(authUser);
    const get_list_customers = list_customers.data;

    useEffect(() => {
        socket.on('return-message-customer', (res) => {
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
            socket_custid: selected_customer.user_id,
            datetime: Datetime()
        }
        socket.emit('send-message-agent', content)
        setConversation(
            conversation => [...conversation, content]
        );
        setMessage('');
    }

    return (
        <MainContent>
            <SubHeader active_page="Sosial Media" menu_name="Channels" modul_name="Social Media" />
            <Container>
                <div className="row">
                    <div className="col-lg-4 pr-1" style={{ height: '75vh' }}>
                        <Card>
                            <CardHeader>
                                <CardTitle title="Agent Status" subtitle={status.socket_id !== null ? 'Availlable' : 'Not Ready'} />
                                <CardToolbar>
                                    <span className="text-muted font-weight-bold font-size-sm mr-2">Live</span>
                                    <span className="label label-rounded label-primary">{get_list_customers?.length}</span>
                                </CardToolbar>
                            </CardHeader>
                            <CardBody className="p-0 scroll-y h-lg-auto">
                                {
                                    get_list_customers?.map((customer, index) => {
                                        return (
                                            <div className="list list-hover border-bottom" key={index} onClick={(e) => dispatch(setSelectedCustomer(customer))}>
                                                <div className={`list-item d-flex align-items-center justify-content-between ${customer.chat_id === selected_customer?.chat_id ? 'active' : ''}`}>
                                                    <div className="d-flex align-items-center w-50 py-4 mx-2">
                                                        <div className="symbol symbol-45px symbol-circle">
                                                            {/* <img alt="Pic" src="/media/avatars/150-2.jpg" /> */}
                                                            <span className="symbol-label bg-light-success font-weight-bolder">C</span>
                                                        </div>
                                                        <div className="flex-grow-1 mx-2">
                                                            <div className="mr-2">{customer.name}</div>
                                                            <div className="mt-2">{customer.email}</div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-column align-items-end mx-2">
                                                        <div className="text-mute">8:30 PM</div>
                                                        <span className="label label-light-primary font-weight-bold label-inline mt-2">{customer.customer_id}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-lg-8 pl-1">
                        <Card>
                            <CardHeader className="border-bottom">
                                <CardTitle title={selected_customer?.name} subtitle={selected_customer?.email} />
                            </CardHeader>
                            <CardBody>
                                {
                                    conversation.map((data, index) => {
                                        return (
                                            <div key={index}>
                                                <h5>{data.username}</h5>
                                                <p>{data.datetime} - {data.message}</p>
                                            </div>
                                        )
                                    })
                                }
                            </CardBody>
                            <div className="card-footer p-2">
                                <input
                                    type="text"
                                    name="message"
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    className="form-control"
                                    placeholder="Type a message"
                                />
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-sm btn-icon btn-active-light-primary" type="button" data-bs-toggle="tooltip"
                                            title="Coming soon"><i className="fa fa-link" /></button>
                                        <button className="btn btn-sm btn-icon btn-active-light-primary" type="button" data-bs-toggle="tooltip"
                                            title="Coming soon"><i className="fa fa-camera" /></button>
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

export default SocialMedia