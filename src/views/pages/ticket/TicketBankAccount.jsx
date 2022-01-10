import React from 'react'
import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'

const TicketBankAccount = () => {
    return (
        <div className="border rounded p-4 my-2">
            <h4>Bank Account</h4>
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
                <Column caption="CustomerID" dataField="customer_id" />
                <Column caption="Customer Name" dataField="name" />
                <Column caption="Channel" dataField="flag_channel" />
            </DataGrid>
        </div>
    )
}

export default TicketBankAccount
