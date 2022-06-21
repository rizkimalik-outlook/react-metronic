import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from 'app/config';
import Datetime from 'views/components/Datetime';
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card';
import { Container, MainContent, SubHeader } from 'views/layouts/partials';
import { authUser } from 'app/slice/sliceAuth';
import { getListCustomer, getLoadConversation, getEndChat } from 'app/services/apiSosmed';
import { setSelectedCustomer } from 'app/slice/sliceSosmed';
import IconSocmed from 'views/components/IconSocmed';

const SocialMedia = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const { username, email_address } = useSelector(authUser);
    const [conversation, setConversation] = useState([]);
    const { list_customers, status, selected_customer, conversations } = useSelector(state => state.sosialmedia);
    const get_list_customers = list_customers.data;

    useEffect(() => {
        socket.on('return-message-customer', (res) => {
            dispatch(getListCustomer())

            //? if customer active, show message to container chat
            if (res.chat_id === selected_customer?.chat_id) {
                setConversation(
                    conversation => [...conversation, res]
                );
            }
        });
        dispatch(getListCustomer())
    }, [dispatch, selected_customer]);

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

    function handlerEndChat(chat_id) {
        dispatch(getEndChat({ chat_id }))
        dispatch(getListCustomer())
        dispatch(setSelectedCustomer({}))
        dispatch(getLoadConversation({ chat_id }))
    }

    return (
        <MainContent>
            <SubHeader active_page="Channels" menu_name="Social Media" modul_name="" />
            <Container>
                <div className="d-flex flex-row">
                    <div className="flex-row-auto offcanvas-mobile w-350px w-xl-400px offcanvas-mobile-on" id="kt_chat_aside">
                        <Card>
                            <CardHeader>
                                <CardTitle title={username} subtitle={status.socket_id !== null ? 'Availlable' : 'Not Ready'} />
                                <CardToolbar>
                                    <span className="text-muted font-weight-bold font-size-sm mr-2">Live</span>
                                    <span className="label label-rounded label-primary">{get_list_customers?.length}</span>
                                </CardToolbar>
                            </CardHeader>
                            <CardBody className="p-0">
                                <div style={{ height: 'calc(75vh - 60px)', overflow: 'auto' }}>
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

                                    <div className="list list-hover border-bottom">
                                        <div className={`list-item d-flex align-items-center justify-content-between`}>
                                            <div className="d-flex align-items-center w-50 py-4 mx-2">
                                                <div className="symbol symbol-45px symbol-circle">
                                                    <div className="symbol-label bg-light-primary fw-bolder">
                                                        <i className="fa fa-id-card text-primary"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 mx-2">
                                                    <div className="mr-2">Brian Wild</div>
                                                    <div className="text-muted mt-2">21234909023940</div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column align-items-end mx-2">
                                                <div className="text-muted">23/04/2022</div>
                                                <div className="d-flex align-items-center justify-content-between mt-2">
                                                    <span className="label label-light-primary font-weight-bold label-inline mx-2">Messenger</span>
                                                    <IconSocmed name="messenger" height={20} width={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list list-hover border-bottom">
                                        <div className={`list-item d-flex align-items-center justify-content-between`}>
                                            <div className="d-flex align-items-center w-50 py-4 mx-2">
                                                <div className="symbol symbol-45px symbol-circle">
                                                    <div className="symbol-label bg-light-primary fw-bolder">
                                                        <i className="fa fa-id-card text-primary"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 mx-2">
                                                    <div className="mr-2">Rizki Malik</div>
                                                    <div className="text-muted mt-2">malik@mail.com</div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column align-items-end mx-2">
                                                <div className="text-muted">20/04/2022</div>
                                                <div className="d-flex align-items-center justify-content-between mt-2">
                                                    <span className="label label-light-primary font-weight-bold label-inline mx-2">Chat</span>
                                                    <IconSocmed name="chat" height={20} width={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list list-hover border-bottom">
                                        <div className={`list-item d-flex align-items-center justify-content-between`}>
                                            <div className="d-flex align-items-center w-50 py-4 mx-2">
                                                <div className="symbol symbol-45px symbol-circle">
                                                    <div className="symbol-label bg-light-primary fw-bolder">
                                                        <i className="fa fa-id-card text-primary"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 mx-2">
                                                    <div className="mr-2">Yudo</div>
                                                    <div className="text-muted mt-2">@yudo_hyd</div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column align-items-end mx-2">
                                                <div className="text-muted">13/04/2022</div>
                                                <div className="d-flex align-items-center justify-content-between mt-2">
                                                    <span className="label label-light-primary font-weight-bold label-inline mx-2">Twitter</span>
                                                    <IconSocmed name="twitter" height={20} width={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list list-hover border-bottom">
                                        <div className={`list-item d-flex align-items-center justify-content-between`}>
                                            <div className="d-flex align-items-center w-50 py-4 mx-2">
                                                <div className="symbol symbol-45px symbol-circle">
                                                    <div className="symbol-label bg-light-primary fw-bolder">
                                                        <i className="fa fa-id-card text-primary"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 mx-2">
                                                    <div className="mr-2">Hamzah</div>
                                                    <div className="text-muted mt-2">hamzah</div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column align-items-end mx-2">
                                                <div className="text-muted">12/04/2022</div>
                                                <div className="d-flex align-items-center justify-content-between mt-2">
                                                    <span className="label label-light-primary font-weight-bold label-inline mx-2">Facebook</span>
                                                    <IconSocmed name="facebook" height={20} width={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list list-hover border-bottom">
                                        <div className={`list-item d-flex align-items-center justify-content-between`}>
                                            <div className="d-flex align-items-center w-50 py-4 mx-2">
                                                <div className="symbol symbol-45px symbol-circle">
                                                    <div className="symbol-label bg-light-primary fw-bolder">
                                                        <i className="fa fa-id-card text-primary"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 mx-2">
                                                    <div className="mr-2">Gerry Max</div>
                                                    <div className="text-muted mt-2">0821832868723</div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column align-items-end mx-2">
                                                <div className="text-muted">10/04/2022</div>
                                                <div className="d-flex align-items-center justify-content-between mt-2">
                                                    <span className="label label-light-primary font-weight-bold label-inline mx-2">Whatsapp</span>
                                                    <IconSocmed name="whatsapp" height={20} width={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="offcanvas-mobile-overlay" />
                    <div className="flex-row-fluid ml-lg-4" id="kt_chat_content">
                        <Card>
                            <CardHeader className="border-bottom">
                                {/* <CardTitle title={selected_customer?.name} subtitle={selected_customer?.email} /> */}
                                <CardTitle title="Brian Wild" subtitle="brian@mail.com" />
                                {
                                    selected_customer?.chat_id &&
                                    <CardToolbar>
                                        <button type="button" className="btn btn-light-primary btn-sm ml-2"
                                            onClick="">Profile</button>
                                        <button type="button" className="btn btn-light-danger btn-sm ml-2"
                                            onClick={(e) => handlerEndChat(selected_customer.chat_id)}>End Chat</button>
                                    </CardToolbar>
                                }

                                <CardToolbar>
                                    <button type="button" className="btn btn-light-info btn-sm ml-2">Journey</button>
                                    <button type="button" className="btn btn-light-primary btn-sm ml-2">Profile</button>
                                    <button type="button" className="btn btn-light-danger btn-sm ml-2">End Chat</button>
                                </CardToolbar>
                            </CardHeader>
                            <CardBody className="p-0">
                                <div data-mobile-height={350} style={{ height: 'calc(75vh - 160px)', overflow: 'auto' }}>
                                    <div className="messages p-4">
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

                                        <div className="d-flex justify-content-start mb-10">
                                            <div className="d-flex flex-column align-items-start">
                                                <div className="d-flex align-items-center mb-2">
                                                    <div className="symbol symbol-35px symbol-circle">
                                                        <div className="symbol-label bg-light-primary fw-bolder">
                                                            <i className="fa fa-id-card text-primary"></i>
                                                        </div>
                                                    </div>
                                                    <div className="ml-3">
                                                        <span className="fs-5 fw-bolder text-gray-900 text-hover-primary">Brian Wild</span>
                                                        <span className="text-muted mb-1 mx-2">09:10</span>
                                                    </div>
                                                </div>
                                                <div className="p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-start" data-kt-element="message-text">How likely are you to recommend our company to your friends and family ?</div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end mb-10">
                                            <div className="d-flex flex-column align-items-end">
                                                <div className="d-flex align-items-center mb-2">
                                                    <div className="mr-3">
                                                        <span className="text-muted mb-1 mx-2">09:12</span>
                                                        <span className="fs-5 fw-bolder text-gray-900 text-hover-primary ms-1">Agent 1</span>
                                                    </div>
                                                    <div className="symbol symbol-35px symbol-circle">
                                                        <div className="symbol-label bg-light-gray fw-bolder">
                                                            <i className="fa fa-user"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-end" data-kt-element="message-text">Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub.</div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex justify-content-start mb-10">
                                            <div className="d-flex flex-column align-items-start">
                                                <div className="d-flex align-items-center mb-2">
                                                    <div className="symbol symbol-35px symbol-circle">
                                                        <div className="symbol-label bg-light-primary fw-bolder">
                                                            <i className="fa fa-id-card text-primary"></i>
                                                        </div>
                                                    </div>
                                                    <div className="ml-3">
                                                        <span className="fs-5 fw-bolder text-gray-900 text-hover-primary">Brian Wild</span>
                                                        <span className="text-muted mb-1 mx-2">09:10</span>
                                                    </div>
                                                </div>
                                                <div className="p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-start" data-kt-element="message-text">Ok, Understood!</div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end mb-10">
                                            <div className="d-flex flex-column align-items-end">
                                                <div className="d-flex align-items-center mb-2">
                                                    <div className="mr-3">
                                                        <span className="text-muted mb-1 mx-2">09:12</span>
                                                        <span className="fs-5 fw-bolder text-gray-900 text-hover-primary ms-1">Agent 1</span>
                                                    </div>
                                                    <div className="symbol symbol-35px symbol-circle">
                                                        <div className="symbol-label bg-light-gray fw-bolder">
                                                            <i className="fa fa-user"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-end" data-kt-element="message-text">You'll receive notifications for all issues, pull requests!</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </CardBody>
                            <div className="card-footer bg-light p-2">
                                <input
                                    type="text"
                                    name="message"
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    className="form-control"
                                    placeholder="Type a message"
                                />
                                <div className="d-flex justify-content-between mt-2">
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-icon btn-sm btn-clean" type="button" data-bs-toggle="tooltip"
                                            title="Coming soon"><i className="fa fa-paperclip" /></button>
                                        <button className="btn btn-icon btn-sm btn-clean" type="button" data-bs-toggle="tooltip"
                                            title="Coming soon"><i className="fa fa-images" /></button>
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