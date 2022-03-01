import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'
import { apiInteraction } from 'app/services/apiTicket';
import { ButtonRefresh } from 'views/components/button';

const TicketInteraction = ({isInteractionOpen}) => {
    const dispatch = useDispatch();
    const { interaction, ticket } = useSelector(state => state.ticket);

    useEffect(() => {
        if (isInteractionOpen === true) {
            dispatch(apiInteraction({ ticket_number: ticket.ticket_number}))
        }
    }, [dispatch, isInteractionOpen, ticket])

    return (
        <div className="border rounded p-4 my-2">
            <div className="d-flex justify-content-between mb-5">
                <h4>Interaction Ticket </h4>
                <ButtonRefresh onClick={(e) => dispatch(apiInteraction({ ticket_number: ticket.ticket_number}))} />
            </div>
            <DataGrid
                dataSource={interaction}
                keyExpr="user_create"
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
                <Column caption="Status" dataField="status" />
                <Column caption="Channel" dataField="channel" />
                <Column caption="User Create" dataField="user_create" />
                <Column caption="Response Detail" dataField="response_complaint" />
                <Column caption="Datetime" dataField="created_at" />
                <Column caption="Dispatch" dataField="dispatch_ticket" cellRender={(data) => {
                        return <span>{String(data.value)}</span>
                    }} />
                <Column caption="Dispatch to Layer" dataField="dispatch_to_layer" />
                <Column caption="Type" dataField="interaction_type" />
            </DataGrid>
        </div>
    )
}

export default TicketInteraction
