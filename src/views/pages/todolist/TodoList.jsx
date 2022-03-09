import React, { useEffect } from 'react'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'
import { useDispatch, useSelector } from 'react-redux'

import Icons from 'views/components/Icons'
import { ButtonRefresh } from 'views/components/button'
import { Container, MainContent, SubHeader } from 'views/layouts/partials'
import { Card, CardBody, CardHeader, CardTitle } from 'views/components/card'
import { authUser } from 'app/slice/sliceAuth'
import { apiTodolistDataTicket, apiTodolistTotalTicket } from 'app/services/apiTodolist'


function TodoList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { total_ticket, data_ticket } = useSelector(state => state.todolist);
    const { status } = useParams();
    const user = useSelector(authUser);

    useEffect(() => {
        if (status === undefined || status === '') {
            history.push('/todolist/Open')
        }

        const data = {
            user_create: user.username,
            department_id: user.department,
            organization_id: user.organization,
            user_level: user.user_level,
            status: status
        }
        dispatch(apiTodolistTotalTicket(data));
        dispatch(apiTodolistDataTicket(data));
    }, [dispatch, status, history, user]);

    const onDispatchTodolist = () => {
        const data = {
            user_create: user.username,
            department_id: user.department,
            organization_id: user.organization,
            user_level: user.user_level,
            status: status
        }
        dispatch(apiTodolistTotalTicket(data));
        dispatch(apiTodolistDataTicket(data));
    }

    return (
        <MainContent>
            <SubHeader active_page="Todolist" menu_name="Todolist" modul_name="Task">
                <ButtonRefresh onClick={() => onDispatchTodolist()} />
            </SubHeader>
            <Container>
                <div className="row">
                    {
                        total_ticket.map((item, index) => {
                            let background;
                            if (item.total === 0) {
                                background = 'bg-warning'
                            } else {
                                background = 'bg-primary'
                            }

                            return (
                                <div className="col-md-3" key={index}>
                                    <NavLink to={`/todolist/${item.status}`} className={`card card-custom ${background} card-stretch gutter-b`}>
                                        <div className="card-body">
                                            <Icons iconName="ticket" className="svg-icon svg-icon-3x svg-icon-white" />
                                            <span className="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">{item.total}</span>
                                            <span className="font-weight-bold text-white font-size-sm">Ticket {item.status}</span>
                                        </div>
                                    </NavLink>
                                </div>
                            )
                        })
                    }

                    {/* <div className="col-md-3">
                        <NavLink to="" className="card card-custom bg-success card-stretch gutter-b">
                            <div className="card-body">
                                <Icons iconName="open" className="svg-icon svg-icon-2x svg-icon-white" />
                                <span className="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">0</span>
                                <span className="font-weight-bold text-white font-size-sm">Ticket Open</span>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-md-3">
                        <NavLink to="" className="card card-custom bg-warning card-stretch gutter-b">
                            <div className="card-body">
                                <Icons iconName="refresh" className="svg-icon svg-icon-2x svg-icon-white" />
                                <span className="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">0</span>
                                <span className="font-weight-bold text-white font-size-sm">Ticket Pending</span>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-md-3">
                        <NavLink to="" className="card card-custom bg-info card-stretch gutter-b">
                            <div className="card-body">
                                <Icons iconName="equalizer" className="svg-icon svg-icon-2x svg-icon-white" />
                                <span className="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">0</span>
                                <span className="font-weight-bold text-white font-size-sm">Ticket Progress</span>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-md-3">
                        <NavLink to="" className="card card-custom bg-primary card-stretch gutter-b">
                            <div className="card-body">
                                <Icons iconName="flag" className="svg-icon svg-icon-2x svg-icon-white" />
                                <span className="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 text-hover-primary d-block">0</span>
                                <span className="font-weight-bold text-white font-size-sm">Ticket Closed</span>
                            </div>
                        </NavLink>
                    </div> */}
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <Card>
                            <CardHeader className="border-0">
                                <CardTitle title={`Data Ticket ${status}`} subtitle="Data Todolist Ticket." />
                            </CardHeader>
                            <CardBody>
                                <DataGrid
                                    dataSource={data_ticket}
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
                                    <Column caption="Ticket Number" dataField="ticket_number" cellRender={(data) => {
                                        return <button type="button" className="btn btn-sm btn-light-primary py-1 px-2" data-toggle="modal" data-target="#modalUpdateTicket">
                                            <Icons iconName="ticket" className="svg-icon svg-icon-sm p-0" />
                                            {data.value}
                                        </button>
                                    }} />
                                    <Column caption="Ticket on Layer" dataField="ticket_position" />
                                    <Column caption="Group Ticket" dataField="group_ticket_number" />
                                    <Column caption="CustomerID" dataField="customer_id" />
                                    <Column caption="Channel" dataField="ticket_source" />
                                    <Column caption="Date Create" dataField="date_create" />
                                    <Column caption="Status" dataField="status" />
                                    <Column caption="Category" dataField="category_name" />
                                    <Column caption="Category Product" dataField="category_sublv1_name" />
                                    <Column caption="Category Case" dataField="category_sublv2_name" />
                                    <Column caption="Category Detail" dataField="category_sublv3_name" />
                                    <Column caption="SLA (Days)" dataField="sla" />
                                    <Column caption="Department" dataField="organization_name" />
                                    <Column caption="Complaint Detail" dataField="complaint_detail" />
                                    <Column caption="Response Detail" dataField="response_detail" />
                                </DataGrid>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Container>
        </MainContent>
    )
}

export default TodoList
