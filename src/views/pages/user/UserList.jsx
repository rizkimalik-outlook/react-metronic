import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import Icons from 'views/components/Icons';
import { useGetUsersQuery } from 'app/services/user';
import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card';
import DataGrid, { Column, FilterRow, HeaderFilter, MasterDetail, Pager, Paging } from 'devextreme-react/data-grid';
import UserDetail from './UserDetail';

function UserList() {
    const { data, error, isLoading } = useGetUsersQuery();
    // const dispatch = useDispatch();
    if (error) return 'error..';
    if (isLoading) return 'Loading..';

    function deleteUser(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You wont be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        })
        .then(async function (result) {
            if (result.value) {
                const res = await axios.delete(`/user/delete/${id}`)
                const data = res.data.data;

                // setDataUsers(key => key + 1);
                Swal.fire(
                    data.message,
                    "Your data has been deleted.",
                    "success"
                )
            }
        });
    }

    function buttonActions(data) {
        const { id } = data.row.data;

        return <div className="d-flex align-items-end justify-content-center">
            <NavLink to={`user/${id}/edit`} className="btn btn-icon btn-light btn-hover-warning btn-sm mx-1">
                <Icons iconName="write" className="svg-icon svg-icon-sm svg-icon-warning" />
            </NavLink>
            <button type="button" onClick={(e) => deleteUser(id)} className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1">
                <Icons iconName="trash" className="svg-icon svg-icon-sm svg-icon-danger" />
            </button>
            {/* <NavLink to={`user/show/${username}`} className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1">
                <Icons iconName="setting" className="svg-icon svg-icon-sm svg-icon-primary" />
            </NavLink> */}
        </div>
    }


    return (
        <MainContent>
            <SubHeader active_page="User Privillage" menu_name="Management User" modul_name="User Privillage" />

            <Container>
                <Card>
                    <CardHeader className="border-0">
                        <CardTitle title="User Privillage" subtitle="List account users member login." />
                        <CardToolbar>
                            <NavLink to="/user/create" className="btn btn-primary font-weight-bolder btn-sm m-1">
                                Create New User
                            </NavLink>
                            <NavLink to="/user/export" className="btn btn-light-primary font-weight-bolder btn-sm m-1">
                                <Icons iconName="pen-and-rules" className="svg-icon svg-icon-sm" />
                                Export
                            </NavLink>
                        </CardToolbar>
                    </CardHeader>
                    <CardBody>
                        <DataGrid
                            dataSource={data.data}
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

                            <Column caption="Username" dataField="username" />
                            <Column caption="Name" dataField="name" />
                            <Column caption="Email" dataField="email_address" />
                            <Column caption="Level" dataField="user_level" />
                            <Column caption="Actions" dataField="id" width={150} cellRender={buttonActions} />
                        </DataGrid>
                    </CardBody>
                </Card>
            </Container>

            {/* <CreateUser stateChange={setRefresh} /> */}
        </MainContent>

    )
}

export default UserList
