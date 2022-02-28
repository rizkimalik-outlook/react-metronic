import React, { useEffect } from 'react';
import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'
import { useDispatch, useSelector } from 'react-redux';
import { apiEscalation } from 'app/services/apiTicket';
import { ButtonRefresh } from 'views/components/button';

const TicketEscalation = ({ isEscalationOpen }) => {
    const dispatch = useDispatch();
    const { escalations, ticket } = useSelector(state => state.ticket);

    useEffect(() => {
        if (isEscalationOpen === true) {
            dispatch(apiEscalation({ ticket_number: ticket.ticket_number }))
        }
    }, [dispatch, isEscalationOpen, ticket])

    return (
        <div className="border rounded p-4 my-2">
            <div className="d-flex justify-content-between mb-5">
                <h4>Escalation Ticket </h4>
                <ButtonRefresh onClick={(e) => dispatch(apiEscalation({ ticket_number: ticket.ticket_number }))} />
            </div>
            <DataGrid
                dataSource={escalations}
                keyExpr="id"
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                showBorders={true}
                showColumnLines={true}
                showRowLines={true}
            >
                <HeaderFilter visible={true} />
                <FilterRow visible={true} />
                <Paging defaultPageSize={10} />
                <Pager
                    visible={true}
                    displayMode='full'
                    showInfo={true}
                    showNavigationButtons={true} />
                <Column caption="Ticket Number" dataField="ticket_number" />
                <Column caption="Channel" dataField="ticket_source" />
                <Column caption="Status" dataField="status" />
                <Column caption="User Create" dataField="user_create" />
                <Column caption="Datetime" dataField="date_create" />
                <Column caption="Escalation to Layer" dataField="ticket_position" />
                <Column caption="Organization" dataField="organization_name" />
                <Column caption="Department" dataField="department_name" />
            </DataGrid>
        </div>
    )
}

export default TicketEscalation;
