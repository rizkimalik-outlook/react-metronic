import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'
import { apiHistoryTransaction } from 'app/services/apiTicket';
import Icons from 'views/components/Icons';

const TicketTransaction = () => {
    const dispatch = useDispatch();
    const { selected_customer, history_transaction } = useSelector(state => state.ticket);
    const { customer_id } = selected_customer;

    useEffect(() => {
        dispatch(apiHistoryTransaction({ customer_id }))
    }, [dispatch, customer_id])

    return (
        <div className="border rounded p-4 my-2">
            <h4>History Transactions</h4>
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
                    return <button type="button" className="btn btn-sm btn-light-primary py-1 px-2">
                        <Icons iconName="ticket" className="svg-icon svg-icon-sm p-0" />
                        {data.value}
                    </button>
                }} />
                <Column caption="Channel" dataField="ticket_source" />
                <Column caption="Status" dataField="status" />
                <Column caption="DateCreate" dataField="date_create" />
            </DataGrid>
        </div>
    )
}

export default TicketTransaction
