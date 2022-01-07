import React from 'react'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2';
import Icons from 'views/components/Icons';
import { ButtonCreate, ButtonExport } from 'views/components/button';
import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card';
import DataGrid, { Column, FilterRow, HeaderFilter, MasterDetail, Pager, Paging } from 'devextreme-react/data-grid';
import SplashScreen from 'views/components/SplashScreen';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import UserDetail from './UserDetail';
import { useGetUsersQuery, useDeleteUserMutation } from 'app/services/apiUser';

function UserList() {
    const { data, isFetching, refetch } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();

    async function deleteUserHandler(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You wont be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then(async function (res) {
            if (res.value) {
                const res = await deleteUser(id)
                const data = res.data.data;
                refetch();

                Swal.fire(
                    data.message,
                    "Your data has been deleted.",
                    "success"
                )
            }
        });
    }

    function onExportExcel() {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');
        worksheet.columns = [
            { header: 'Username', key: 'username' },
            { header: 'Name', key: 'name' },
            { header: 'Email', key: 'email_address' },
            { header: 'Level', key: 'user_level' },
        ]
        worksheet.addRows(data.data);
        worksheet.autoFilter = 'A1:D1';
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
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExcelUsersGrid.xlsx');
        });
    }

    function componentButtonActions(data) {
        const { id } = data.row.data;
        return (
            <div className="d-flex align-items-end justify-content-center">
                {/* <NavLink to={`user/show/${id}`} className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1" data-toggle="tooltip" title="User Privillage">
                    <Icons iconName="setting" className="svg-icon svg-icon-sm svg-icon-primary" />
                </NavLink> */}
                <NavLink to={`user/${id}/edit`} className="btn btn-icon btn-light-warning btn-hover-warning btn-sm mx-1" data-toggle="tooltip" title="User Edit">
                    <Icons iconName="write" className="svg-icon svg-icon-sm svg-icon-warning" />
                </NavLink>
                <button type="button" onClick={(e) => deleteUserHandler(id)} className="btn btn-icon btn-light-danger btn-hover-danger btn-sm mx-1" data-toggle="tooltip" title="User Delete">
                    <Icons iconName="trash" className="svg-icon svg-icon-sm svg-icon-danger" />
                </button>
            </div>
        )
    }

    return (
        <MainContent>
            <SubHeader active_page="User Privillage" menu_name="Management User" modul_name="User Privillage" />
            <Container>
                <Card>
                    <CardHeader className="border-0">
                        <CardTitle title="User Privillage" subtitle="List account users member login." />
                        <CardToolbar>
                            <ButtonExport onClick={onExportExcel} />
                            <ButtonCreate to="/user/create" />
                        </CardToolbar>
                    </CardHeader>
                    <CardBody>
                        {isFetching && <SplashScreen />}
                        <DataGrid
                            dataSource={data?.data}
                            keyExpr="id"
                            allowColumnReordering={true}
                            allowColumnResizing={true}
                            columnAutoWidth={true}
                            showBorders={true}
                            showColumnLines={true}
                            showRowLines={true}
                        // rowAlternationEnabled={true}
                        >
                            <MasterDetail
                                enabled={true}
                                component={UserDetail}
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
                            <Column caption="Username" dataField="username" />
                            <Column caption="Name" dataField="name" />
                            <Column caption="Email" dataField="email_address" />
                            <Column caption="Level" dataField="user_level" />
                        </DataGrid>
                    </CardBody>
                </Card>
            </Container>
        </MainContent>
    )
}

export default UserList
