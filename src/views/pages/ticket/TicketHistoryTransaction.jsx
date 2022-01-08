import React from 'react'
import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'

const TicketHistoryTransaction = () => {
    return (
        <div className="border rounded p-4 my-2">
            <h4>History Transactions</h4>
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
                    allowedPageSizes={[10, 20, 50, 'all']}
                    displayMode='full'
                    showPageSizeSelector={true}
                    showInfo={true}
                    showNavigationButtons={true} />
                <Column caption="CustomerID" dataField="customer_id" />
                <Column caption="Customer Name" dataField="name" />
                <Column caption="Channel" dataField="flag_channel" />
                <Column caption="Type" dataField="value_channel" />
            </DataGrid>
        </div>
    )
}

export default TicketHistoryTransaction
