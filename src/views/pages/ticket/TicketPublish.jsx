import React from 'react';
import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'

const TicketPublish = () => {
    return (
        <div>
            <h5>Publish Ticket</h5>
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
                <Paging defaultPageSize={5} />
                <Pager
                    visible={true}
                    displayMode='full'
                    showInfo={true}
                    showNavigationButtons={true} />
                <Column caption="CustomerID" dataField="customer_id" />
                <Column caption="Customer Name" dataField="name" />
                <Column caption="Channel" dataField="flag_channel" />
            </DataGrid>
        </div>
    )
};

export default TicketPublish;
