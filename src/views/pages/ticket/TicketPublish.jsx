import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'
import { apiDataPublish } from 'app/services/apiTicket';

const TicketPublish = ({ customer }) => {
    const dispatch = useDispatch();
    const { customer_id } = customer;
    const { data_publish } = useSelector(state => state.ticket)

    useEffect(() => {
        dispatch(apiDataPublish({ customer_id }))
    }, [dispatch, customer_id])

    return (
        <div>
            <h5>Publish Ticket</h5>
            <DataGrid
                dataSource={data_publish}
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
                <Column caption="CustomerID" dataField="customer_id" />
                <Column caption="Ticket Number" dataField="ticket_number" />
                <Column caption="Channel" dataField="ticket_source" />
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
};

export default TicketPublish;
