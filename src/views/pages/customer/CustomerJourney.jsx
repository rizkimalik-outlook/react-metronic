import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Icons from 'views/components/Icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'views/components/modal';
import { apiCustomerJourney } from 'app/services/apiCustomer';
import { ButtonRefresh } from 'views/components/button';

const CustomerJourney = ({ customer }) => {
    const dispatch = useDispatch();
    const { journey } = useSelector(state => state.customer);

    useEffect(() => {
        dispatch(apiCustomerJourney({ customer_id: customer.customer_id }))
    }, [dispatch, customer])

    return (
        <Modal id="modalJourneyCustomer">
            <ModalHeader title={`Data Journey Customer #${customer.customer_id}`} />
            <ModalBody className="p-0">
                <div style={{ height: '450px', overflow: 'auto' }}>
                    <div className="timeline timeline-3 px-20 py-5">
                        <div className="timeline-items">
                            {
                                journey.map((item, index) => {
                                    let status = '';
                                    if (item.status === 'Open') {
                                        status = 'label-light-primary';
                                    }
                                    else if (item.status === 'Pending') {
                                        status = 'label-light-warning';
                                    }
                                    else if (item.status === 'Progress') {
                                        status = 'label-light-info';
                                    }
                                    else if (item.status === 'Closed') {
                                        status = 'label-light-success';
                                    }

                                    let icon = '';
                                    if (item.ticket_source === 'Voice') {
                                        icon = 'fa fa-headset text-primary';
                                    }
                                    else if (item.ticket_source === 'Email') {
                                        icon = 'fa fa-mail-bulk text-danger';
                                    }
                                    else if (item.ticket_source === 'Chat') {
                                        icon = 'fa fa-comments text-warning';
                                    }
                                    else if (item.ticket_source === 'Facebook') {
                                        icon = 'fab fa-facebook text-primary';
                                    }
                                    else if (item.ticket_source === 'Twitter') {
                                        icon = 'fab fa-twitter text-primary';
                                    }
                                    else if (item.ticket_source === 'Instagram') {
                                        icon = 'fab fa-instagram text-info';
                                    }
                                    else if (item.ticket_source === 'Whatsapp') {
                                        icon = 'fab fa-whatsapp text-success';
                                    }

                                    return <div className="timeline-item" key={index}>
                                        <div className="timeline-media">
                                            <i className={`${icon}`} />
                                        </div>
                                        <div className="timeline-content bg-white border">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <div className="mr-2">
                                                    <span className="text-hover-primary font-weight-bold">
                                                        <Icons iconName="ticket" className="svg-icon svg-icon-sm" />
                                                        {item.ticket_number}
                                                    </span>
                                                    <span className={`label ${status} font-weight-bolder label-inline ml-2`}>{item.status}</span>
                                                </div>
                                            </div>
                                            <p className="p-0">
                                                {item.time} {item.date}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <ButtonRefresh onClick={() => dispatch(apiCustomerJourney({ customer_id: customer.customer_id}))} />
            </ModalFooter>
        </Modal>
    )
}

export default CustomerJourney