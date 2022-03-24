import React, { useEffect } from 'react'
import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { apiCustomerChannel } from 'app/services/apiCustomer'

const CustomerChannel = () => {
    const dispatch = useDispatch();
    const { channels } = useSelector(state => state.customer);

    useEffect(() => {
        dispatch(apiCustomerChannel())
    }, [dispatch]);

    return (
        <div>
            <DataGrid
                dataSource={channels}
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
                    allowedPageSizes={[10, 20, 50]}
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

export default CustomerChannel
