import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from 'react-redux'
import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'

import Icons from 'views/components/Icons'
import { ButtonCreate, ButtonDelete, ButtonEdit, ButtonExport, ButtonRefresh } from 'views/components/button';
import { Card, CardBody, CardHeader, CardToolbar } from 'views/components/card'
import { Container, MainContent, SubHeader } from 'views/layouts/partials'
import CustomerChannel from './CustomerChannel'
import { apiCustomerList, apiCustomerDelete } from 'app/services/apiCustomer'


const CustomerList = () => {
    const dispatch = useDispatch();
    const { customers } = useSelector(state => state.customer);
    const [isChannel, setIsChannel] = useState(false);

    useEffect(() => {
        dispatch(apiCustomerList())
    }, [dispatch]);


    function handlerExportExcel() {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');
        worksheet.columns = [
            { header: 'CustomerID', key: 'customer_id' },
            { header: 'Name', key: 'name' },
            { header: 'Email', key: 'email' },
            { header: 'Phone Number', key: 'telephone' },
            { header: 'NIK', key: 'no_ktp' },
            { header: 'Address', key: 'address' },
            { header: 'Status', key: 'status' },
        ]
        worksheet.addRows(customers);
        worksheet.autoFilter = 'A1:G1';
        worksheet.eachRow(function (row, rowNumber) {
            row.eachCell((cell, colNumber) => {
                if (rowNumber === 1) {
                    // First set the background of header row
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'f5b914' }
                    }
                }
            })
            row.commit();
        });

        workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExcelCustomersGrid.xlsx');
        });
    }

    function handlerCustomerDelete(customer_id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You wont be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then(async function (res) {
            if (res.value) {
                const { payload } = await dispatch(apiCustomerDelete({ customer_id }));
                if (payload.status === 200) {
                    Swal.fire({
                        title: "Success Delete.",
                        text: `${customer_id} deleted from database!`,
                        buttonsStyling: false,
                        icon: "success",
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });
                    dispatch(apiCustomerList())
                }
            }
        });
    }

    function componentButtonActions(data) {
        const { customer_id } = data.row.data;
        return (
            <div className="d-flex align-items-end justify-content-center">
                <ButtonEdit to={`customer/${customer_id}/edit`} />
                <ButtonDelete onClick={(e) => handlerCustomerDelete(customer_id)} />
            </div>
        )
    }

    return (
        <MainContent>
            <SubHeader active_page="Customer" menu_name="Data Customer" modul_name="Customer">
                <ButtonExport onClick={handlerExportExcel} />
                <ButtonCreate to="/customer/create" />
            </SubHeader>
            <Container>
                <Card>
                    <CardHeader className="border-0">
                        <CardToolbar>
                            <ul className="nav nav-light-primary nav-bold nav-pills">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href="#tabDataCustomer" onClick={(e) => setIsChannel(false)}>
                                        <span className="nav-icon">
                                            <Icons iconName="layer" className="svg-icon svg-icon-sm" />
                                        </span>
                                        <span className="nav-text">Data Customer</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#tabDataChannel" onClick={(e) => setIsChannel(true)}>
                                        <span className="nav-icon">
                                            <Icons iconName="layout-4-block" className="svg-icon svg-icon-sm" />
                                        </span>
                                        <span className="nav-text">Data Channel</span>
                                    </a>
                                </li>
                            </ul>
                        </CardToolbar>
                        <CardToolbar>
                            <ButtonRefresh onClick={() => dispatch(apiCustomerList())} />
                        </CardToolbar>
                    </CardHeader>
                    <CardBody>
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="tabDataCustomer" role="tabpanel" aria-labelledby="tabDataCustomer">
                                <DataGrid
                                    dataSource={customers}
                                    // remoteOperations={true}
                                    remoteOperations={{
                                        filtering: true,
                                        sorting: true,
                                        paging: true
                                    }}
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
                                    <Column caption="Actions" dataField="id" width={100} cellRender={componentButtonActions} />
                                    <Column caption="CustomerID" dataField="customer_id" />
                                    <Column caption="Name" dataField="name" />
                                    <Column caption="Email" dataField="email" />
                                    <Column caption="Phone Number" dataField="telephone" />
                                    <Column caption="NIK" dataField="no_ktp" />
                                    <Column caption="Gender" dataField="gender" />
                                    <Column caption="Address" dataField="address" />
                                    <Column caption="Status" dataField="status" cellRender={(data) => {
                                        return <span className={`label label-md label-light-${data.value === 'Registered' ? 'success' : 'warning'} label-inline`}>{data.value}</span>
                                    }} />
                                </DataGrid>
                            </div>
                            <div className="tab-pane fade" id="tabDataChannel" role="tabpanel" aria-labelledby="tabDataChannel">
                                {isChannel && <CustomerChannel />}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </MainContent>
    )
}

export default CustomerList
