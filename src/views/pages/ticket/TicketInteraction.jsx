import React from 'react'
import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'

const TicketInteraction = () => {
    return (
        <div className="border rounded p-4 my-2">
            <DataGrid
                dataSource=""
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
                <Column caption="Channel" dataField="channel" />
                <Column caption="Status" dataField="status" />
                <Column caption="User Create" dataField="user_create" />
                <Column caption="Datetime" dataField="created_at" />
            </DataGrid>
        </div>
    )
}

export default TicketInteraction
