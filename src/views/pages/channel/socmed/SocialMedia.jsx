import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from 'app/config';
import Datetime from 'views/components/Datetime';
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card';
import { Container, MainContent, SubHeader } from 'views/layouts/partials';
import { authUser } from 'app/slice/sliceAuth';
import { getListCustomer, getLoadConversation } from 'app/services/apiSosmed';
import { setSelectedCustomer } from 'app/slice/sliceSosmed';
import ScrollToBottom from 'react-scroll-to-bottom';

const SocialMedia = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const { username, email_address } = useSelector(authUser);
    const [conversation, setConversation] = useState([]);
    const { list_customers, status, selected_customer, conversations } = useSelector(state => state.sosialmedia);
    const get_list_customers = list_customers.data;

    useEffect(() => {
        socket.on('return-message-customer', (res) => {
            //? if customer active, show message to container chat
            if (res.chat_id === selected_customer?.chat_id) {
                setConversation(
                    conversation => [...conversation, res]
                );
            }
        });
        dispatch(getListCustomer())
    }, [dispatch,selected_customer]);
    
    useEffect(() => {
        setConversation(conversations.data)
    }, [conversations]);


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
            date_create: Datetime()
        }
        socket.emit('send-message-agent', content)
        setConversation(
            conversation => [...conversation, content]
        );
        setMessage('');
    }

    function handlerSelectCustomer(customer) {
        dispatch(setSelectedCustomer(customer))
        dispatch(getLoadConversation({
            chat_id: customer.chat_id
        }))
    }

    return (
        <MainContent>
            <SubHeader active_page="Sosial Media" menu_name="Channels" modul_name="Social Media" />
            <Container>
                <div className="d-flex flex-row">
                    <div className="flex-row-auto offcanvas-mobile w-350px w-xl-400px offcanvas-mobile-on" id="kt_chat_aside">
                        <Card>
                            <CardHeader>
                                <CardTitle title="Agent Status" subtitle={status.socket_id !== null ? 'Availlable' : 'Not Ready'} />
                                <CardToolbar>
                                    <span className="text-muted font-weight-bold font-size-sm mr-2">Live</span>
                                    <span className="label label-rounded label-primary">{get_list_customers?.length}</span>
                                </CardToolbar>
                            </CardHeader>
                            <CardBody className="p-0">
                                <div style={{ height: 'calc(75vh - 160px)', overflow: 'auto' }}>
                                    {
                                        get_list_customers?.map((customer, index) => {
                                            return (
                                                <div className="list list-hover border-bottom" key={index} onClick={(e) => handlerSelectCustomer(customer)}>
                                                    <div className={`list-item d-flex align-items-center justify-content-between ${customer.chat_id === selected_customer?.chat_id ? 'active' : ''}`}>
                                                        <div className="d-flex align-items-center w-50 py-4 mx-2">
                                                            <div className="symbol symbol-45px symbol-circle">
                                                                <span className="symbol-label bg-light-success font-weight-bolder">C</span>
                                                            </div>
                                                            <div className="flex-grow-1 mx-2">
                                                                <div className="mr-2">{customer.name}</div>
                                                                <div className="mt-2">{customer.email}</div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-column align-items-end mx-2">
                                                            <div className="text-mute">{customer.date_create}</div>
                                                            <span className="label label-light-primary font-weight-bold label-inline mt-2">{customer.customer_id}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="offcanvas-mobile-overlay" />
                    <div className="flex-row-fluid ml-lg-8" id="kt_chat_content">
                        <Card>
                            <CardHeader className="border-bottom">
                                <CardTitle title={selected_customer?.name} subtitle={selected_customer?.email} />
                            </CardHeader>
                            <CardBody className="p-0">
                                <div data-mobile-height={350} style={{ height: 'calc(75vh - 160px)', overflow: 'auto' }}>
                                    <ScrollToBottom className="messages p-4">
                                        {
                                            conversation?.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <h5>{item.name}</h5>
                                                        <p>{item.date_create} - {item.message}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </ScrollToBottom>
                                </div>
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