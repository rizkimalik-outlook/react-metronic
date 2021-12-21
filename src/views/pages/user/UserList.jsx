import React from 'react'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2';
import Icons from 'views/components/Icons';
import { useGetUsersQuery, useDeleteUserMutation } from 'app/services/apiUser';
import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card';
import DataGrid, { Column, FilterRow, HeaderFilter, MasterDetail, Pager, Paging } from 'devextreme-react/data-grid';
import UserDetail from './UserDetail';
import SplashScreen from 'views/components/SplashScreen';

function UserList() {
    const { data, error, isFetching, refetch } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    if (error) return 'connection error..';
    if (isFetching) return <SplashScreen />;

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

    function componentButtonActions(data) {
        const { id } = data.row.data;

        return <div className="d-flex align-items-end justify-content-center">
            <NavLink to={`user/${id}/edit`} className="btn btn-icon btn-light btn-hover-warning btn-sm mx-1">
                <Icons iconName="write" className="svg-icon svg-icon-sm svg-icon-warning" />
            </NavLink>
            <button type="button" onClick={(e) => deleteUserHandler(id)} className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1">
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
                            <Column caption="Actions" dataField="id" width={150} cellRender={componentButtonActions} />
                        </DataGrid>
                    </CardBody>
                </Card>
            </Container>

            {/* <CreateUser stateChange={setRefresh} /> */}
        </MainContent>

    )
}

export default UserList
