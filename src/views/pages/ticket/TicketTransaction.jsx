import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'
import { apiHistoryTransaction, apiTicketShow } from 'app/services/apiTicket';
import Icons from 'views/components/Icons';
import { ButtonRefresh } from 'views/components/button';
import { TicketUpdate } from './index';

const TicketTransaction = () => {
    const dispatch = useDispatch();
    const { selected_customer, history_transaction } = useSelector(state => state.ticket);
    const { customer_id } = selected_customer;

    useEffect(() => {
        dispatch(apiHistoryTransaction({ customer_id }))
    }, [dispatch, customer_id])

    return (
        <div className="border rounded p-4 my-2">
            <div className="d-flex justify-content-between mb-5">
                <h4>History Transactions</h4>
                <ButtonRefresh onClick={() => dispatch(apiHistoryTransaction({ customer_id }))} />
            </div>
            <TicketUpdate />
            <DataGrid
                dataSource={history_transaction}
                keyExpr="ticket_number"
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                showBorders={true}
                showColumnLines={true}
                showRowLines={true}
            >
                <HeaderFilter visible={true} />
                <FilterRow visible={true} />
                <Paging defaultPageSize={5} />
                <Pager
                    visible={true}
                    displayMode='full'
                    showInfo={true}
                    showNavigationButtons={true} />
                <Column caption="Ticket Number" dataField="ticket_number" cellRender={(data) => {
                    return <button type="button" onClick={(e) => dispatch(apiTicketShow({ ticket_number: data.value }))} className="btn btn-sm btn-light-primary py-1 px-2" data-toggle="modal" data-target="#modalUpdateTicket">
                        <Icons iconName="ticket" className="svg-icon svg-icon-sm p-0" />
                        {data.value}
                    </button>
                }} />
                <Column caption="Group Ticket" dataField="group_ticket_number" />
                <Column caption="Channel" dataField="ticket_source" />
                <Column caption="DateCreate" dataField="date_create" />
                <Column caption="Status" dataField="status" />
                <Column caption="Category" dataField="category_name" />
                <Column caption="Category Product" dataField="category_sublv1_name" />
                <Column caption="Category Case" dataField="category_sublv2_name" />
                <Column caption="Category Detail" dataField="category_sublv3_name" />
                <Column caption="Complaint Detail" dataField="complaint_detail" />
                <Column caption="Response Detail" dataField="response_detail" />
            </DataGrid>
        </div>
    )
}

export default TicketTransaction
