import React from 'react'
import { Container, MainContent, SubHeader } from 'views/layouts/partials'
import { Card, CardBody, CardHeader, CardTitle } from 'views/components/card'
import Icons from 'views/components/Icons'
import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'


function TodoList() {
    return (
        <MainContent>
            <SubHeader active_page="Todolist" menu_name="Todolist" modul_name="Task" />
            <Container>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card card-custom bg-success card-stretch gutter-b">
                            <div className="card-body">
                                <Icons iconName="open" className="svg-icon svg-icon-2x svg-icon-white" />
                                <span className="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">0</span>
                                <span className="font-weight-bold text-white font-size-sm">Ticket Open</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card card-custom bg-warning card-stretch gutter-b">
                            <div className="card-body">
                                <Icons iconName="refresh" className="svg-icon svg-icon-2x svg-icon-white" />
                                <span className="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">0</span>
                                <span className="font-weight-bold text-white font-size-sm">Ticket Pending</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card card-custom bg-info card-stretch gutter-b">
                            <div className="card-body">
                                <Icons iconName="equalizer" className="svg-icon svg-icon-2x svg-icon-white" />
                                <span className="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">0</span>
                                <span className="font-weight-bold text-white font-size-sm">Ticket Progress</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card card-custom bg-primary card-stretch gutter-b">
                            <div className="card-body">
                                <Icons iconName="flag" className="svg-icon svg-icon-2x svg-icon-white" />
                                <span className="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 text-hover-primary d-block">0</span>
                                <span className="font-weight-bold text-white font-size-sm">Ticket Closed</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <Card>
                            <CardHeader className="border-0">
                                <CardTitle title="Data To Do List" subtitle="Data Todolist Ticket." />
                            </CardHeader>
                            <CardBody>
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
                                    <Column caption="Ticket Number" dataField="ticket_number" cellRender={(data) => {
                                        return <button type="button" className="btn btn-sm btn-light-primary py-1 px-2" data-toggle="modal" data-target="#modalUpdateTicket">
                                            <Icons iconName="ticket" className="svg-icon svg-icon-sm p-0" />
                                            {data.value}
                                        </button>
                                    }} />
                                    <Column caption="CustomerID" dataField="customer_id" />
                                    <Column caption="Channel" dataField="ticket_source" />
                                    <Column caption="DateCreate" dataField="date_create" />
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
