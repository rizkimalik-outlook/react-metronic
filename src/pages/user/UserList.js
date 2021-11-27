import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import DataGrid, { Column, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid';
import { AuthUser } from 'store';
import Icons from 'components/Icons';
import SubHeader from 'layouts/partials/SubHeader';
import Swal from 'sweetalert2';
// import CreateUser from './CreateUser';

function UserList() {
    const { token } = useRecoilValue(AuthUser);
    const [users, getUsers] = useState([]);
    const [refresh, setRefresh] = useState(0);


    useEffect(() => {
        async function getDataUser() {
            try {
                const res = await axios.get('/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = res.data;
                // console.log(data);
                getUsers(data);
            }
            catch (error) {
                console.log(error);
            }
        }
        getDataUser();
    }, [token, refresh]);

    function deleteUser(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You wont be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then(async function (result) {
            if (result.value) {
                const res = await axios.delete(`/user/delete/${id}`)
                const data = res.data;

                setRefresh(key => key +1)
                Swal.fire(
                    data.message,
                    "Your data has been deleted.",
                    "success"
                )
            }
        });
    }

    function buttonActions(data) {
        const { id, username } = data.row.data;

        return <>
            <NavLink to={`user/show/${username}`} className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1">
                <Icons iconName="setting" className="svg-icon svg-icon-sm svg-icon-primary" />
            </NavLink>
            <NavLink to={`user/${username}/edit`} className="btn btn-icon btn-light btn-hover-warning btn-sm mx-1">
                <Icons iconName="write" className="svg-icon svg-icon-sm svg-icon-warning" />
            </NavLink>
            <button type="button" onClick={(e) => deleteUser(id)} className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1">
                <Icons iconName="trash" className="svg-icon svg-icon-sm svg-icon-danger" />
            </button>
        </>
    }


    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <SubHeader active_page="User Privillage" menu_name="Management User" modul_name="User Privillage" />

            <div className="d-flex flex-column-fluid">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-custom card-stretch gutter-b card-border">
                                <div className="card-header border-0 pt-5">
                                    <h3 className="card-title align-items-start flex-column">
                                        <span className="card-label font-weight-bolder text-dark">User Privillage</span>
                                        <span className="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new members</span>
                                    </h3>
                                    <div className="card-toolbar">
                                        <NavLink to="/user/create" className="btn btn-primary font-weight-bolder btn-sm m-1">
                                            Create New User
                                        </NavLink>
                                        <NavLink to="/user/export" className="btn btn-light-primary font-weight-bolder btn-sm m-1">
                                            <Icons iconName="pen-and-rules" className="svg-icon svg-icon-sm" />
                                            Export
                                        </NavLink>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <DataGrid
                                        dataSource={users}
                                        keyExpr="id"
                                        allowColumnReordering={true}
                                        allowColumnResizing={true}
                                        columnAutoWidth={true}
                                        showBorders={true}
                                        showColumnLines={true}
                                        showRowLines={true}
                                        rowAlternationEnabled={true}
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

                                        <Column caption="Username" dataField="username" />
                                        <Column caption="Name" dataField="name" />
                                        <Column caption="Email" dataField="email_address" />
                                        <Column caption="Level" dataField="user_level" />
                                        <Column caption="Actions" dataField="id" width={150} cellRender={buttonActions} />
                                    </DataGrid>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* <CreateUser stateChange={setRefresh} /> */}
        </div>
    )
}

export default UserList
