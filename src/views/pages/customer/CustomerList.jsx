import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import Icons from 'views/components/Icons'
import { Card, CardBody, CardHeader, CardToolbar } from 'views/components/card'
import { Container, MainContent, SubHeader } from 'views/layouts/partials'
import { Column, DataGrid, FilterRow, HeaderFilter, MasterDetail, Pager, Paging } from 'devextreme-react/data-grid'
import CustomerChannel from './CustomerChannel'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomerList } from 'app/services/apiCustomer'


const CustomerList = () => {
    const dispatch = useDispatch();
    const { customers } = useSelector(state => state.customer);

    useEffect(() => {
        dispatch(getCustomerList())
    }, [dispatch]);

    function onExportExcel() {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');
        worksheet.columns = [
            { header: 'CustomerID', key: 'customer_id' },
            { header: 'Name', key: 'name' },
            { header: 'Email', key: 'email' },
            { header: 'Phone Number', key: 'telephone' },
            { header: 'NIK', key: 'no_ktp' },
            { header: 'Address', key: 'address' },
        ]
        worksheet.addRows(customers);
        worksheet.autoFilter = 'A1:E1';
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
                // Set border of each cell 
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            })
            row.commit();
        });

        workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExcelCustomersGrid.xlsx');
        });
    }

    function componentButtonActions(data) {
        const { id } = data.row.data;
        return (
            <div className="d-flex align-items-end justify-content-center">
                <NavLink to={`customer/${id}/edit`} className="btn btn-icon btn-light-warning btn-hover-warning btn-sm mx-1" data-toggle="tooltip" title="Button Edit">
                    <Icons iconName="write" className="svg-icon svg-icon-sm svg-icon-warning" />
                </NavLink>
                <button type="button" className="btn btn-icon btn-light-danger btn-hover-danger btn-sm mx-1" data-toggle="tooltip" title="Button Delete">
                    <Icons iconName="trash" className="svg-icon svg-icon-sm svg-icon-danger" />
                </button>
            </div>
        )
    }

    return (
        <MainContent>
            <SubHeader active_page="Customer" menu_name="Data Customer" modul_name="Customer" />
            <Container>
                <Card>
                    <CardHeader className="border-0">
                        <CardToolbar>
                            <ul className="nav nav-light-primary nav-bold nav-pills">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href="#tabDataCustomer">
                                        <span className="nav-icon">
                                            <Icons iconName="layer" className="svg-icon svg-icon-sm" />
                                        </span>
                                        <span className="nav-text">Data Customer</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#tabDataChannel">
                                        <span className="nav-icon">
                                            <Icons iconName="layout-4-block" className="svg-icon svg-icon-sm" />
                                        </span>
                                        <span className="nav-text">Data Channel</span>
                                    </a>
                                </li>
                            </ul>
                        </CardToolbar>
                        <CardToolbar>
                            <NavLink to="/customer/create" className="btn btn-primary font-weight-bolder btn-sm m-1">
                                Create New Customer
                            </NavLink>
                            <button type="button" onClick={onExportExcel} className="btn btn-light-primary font-weight-bolder btn-sm m-1">
                                <Icons iconName="pen-and-rules" className="svg-icon svg-icon-sm" />
                                Export
                            </button>
                        </CardToolbar>
                    </CardHeader>
                    <CardBody>
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="tabDataCustomer" role="tabpanel" aria-labelledby="tabDataCustomer">
                                <DataGrid
                                    dataSource={customers}
                                    keyExpr="id"
                                    allowColumnReordering={true}
                                    allowColumnResizing={true}
                                    columnAutoWidth={true}
                                    showBorders={true}
                                    showColumnLines={true}
                                    showRowLines={true}
                                >
                                    <MasterDetail
                                        enabled={true}
                                        component=''
                                    />
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
                                    <Column caption="Actions" dataField="id" width={100} cellRender={componentButtonActions} />
                                    <Column caption="CustomerID" dataField="customer_id" />
                                    <Column caption="Name" dataField="name" />
                                    <Column caption="Email" dataField="email" />
                                    <Column caption="Phone Number" dataField="telephone" />
                                    <Column caption="NIK" dataField="no_ktp" />
                                    <Column caption="Address" dataField="address" />
                                </DataGrid>
                            </div>
                            <div className="tab-pane fade" id="tabDataChannel" role="tabpanel" aria-labelledby="tabDataChannel">
                                <CustomerChannel />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </MainContent>
    )
}

export default CustomerList
