import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'
import { Container, MainContent, SubHeader } from 'views/layouts/partials'
import Icons from 'views/components/Icons'
import FormGroup from 'views/components/FormGroup'
import { apiHistoryTicket } from 'app/services/apiTicket'
import { ButtonExport } from 'views/components/button'

const TicketHistory = () => {
    const dispatch = useDispatch();
    const { history_ticket } = useSelector(state => state.ticket);
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();

    useEffect(() => {
        let now = new Date();
        const datetime = now.toISOString().slice(0, 10);
        setValue('date_from', datetime)
        setValue('date_to', datetime)
    }, [setValue]);

    const onSubmitHistoryTicket = async (data) => {
        try {
            const { payload } = await dispatch(apiHistoryTicket(data));
            if (payload.status !== 200) {
                Swal.fire({
                    title: "Invalid Data.",
                    text: "Ticket History data is invalid.",
                    buttonsStyling: false,
                    icon: "warning",
                    confirmButtonText: "Ok",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    },
                })
            }
        } catch (error) {
            Swal.fire({
                title: "Invalid Data.",
                text: error,
                buttonsStyling: false,
                icon: "error",
                confirmButtonText: "Ok",
                customClass: {
                    confirmButton: "btn btn-primary"
                },
            })
        }
    }

    const handlerExportExcel = async () => {
        if (history_ticket.length > 0) {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet('Main sheet');
            worksheet.columns = [
                { header: 'Ticket Number', key: 'ticket_number' },
                { header: 'Group Ticket', key: 'group_ticket_number' },
                { header: 'CustomerID', key: 'customer_id' },
                { header: 'Channel', key: 'ticket_source' },
                { header: 'Date Create', key: 'date_create' },
                { header: 'Status', key: 'status' },
                { header: 'Category', key: 'category_name' },
                { header: 'Category Product', key: 'category_sublv1_name' },
                { header: 'Category Case', key: 'category_sublv2_name' },
                { header: 'Category Detail', key: 'category_sublv3_name' },
                { header: 'SLA (Days)', key: 'sla' },
                { header: 'Department', key: 'organization_name' },
                { header: 'Complaint Detail', key: 'complaint_detail' },
                { header: 'Response Detail', key: 'response_detail' },
            ]
            worksheet.addRows(history_ticket);
            worksheet.autoFilter = 'A1:N1';
            worksheet.eachRow(function (row, rowNumber) {
                row.eachCell((cell, colNumber) => {
                    if (rowNumber === 1) {
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
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExcelHistoryTicketGrid.xlsx');
            });
        }
        else {
            Swal.fire({
                title: "Export Failed.",
                text: "Please submit view data ticket history first.",
                buttonsStyling: false,
                icon: "warning",
                confirmButtonText: "Ok",
                customClass: {
                    confirmButton: "btn btn-primary"
                },
            })
        }
    }

    return (
        <MainContent>
            <SubHeader active_page="Ticket History" menu_name="Ticket" modul_name="Ticket History" />
            <Container>
                <div className="border rounded p-4 my-4">
                    <div className="d-flex align-items-center justify-content-between">
                        <h4>Ticket History</h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmitHistoryTicket)} id="formHistoryTicket">
                        <div className="row">
                            <div className="col-lg-3 m-0">
                                <FormGroup label="Date From">
                                    <input type="date" {...register("date_from", { required: true })} className="form-control form-control-sm" />
                                    {errors.date_from && <span className="form-text text-danger">Please select date</span>}
                                </FormGroup>
                            </div>
                            <div className="col-lg-3">
                                <FormGroup label="Date To">
                                    <input type="date" {...register("date_to", { required: true })} className="form-control form-control-sm" />
                                    {errors.date_to && <span className="form-text text-danger">Please select date</span>}
                                </FormGroup>
                            </div>
                            <div className="col-lg-6 mt-6">
                                <button className="btn btn-sm btn-primary font-weight-bolder mr-4">Submit</button>
                                <ButtonExport onClick={handlerExportExcel} />
                            </div>
                        </div>
                    </form>
                </div>

                <DataGrid
                    dataSource={history_ticket}
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
                        return <span className="label label-inline label-light-primary py-2 px-2" data-toggle="modal" data-target="#modalUpdateTicket">
                            <Icons iconName="ticket" className="svg-icon svg-icon-sm p-0" />
                            {data.value}
                        </span>
                    }} />
                    <Column caption="Group Ticket" dataField="group_ticket_number" />
                    <Column caption="CustomerID" dataField="customer_id" />
                    <Column caption="Channel" dataField="ticket_source" />
                    <Column caption="Date Create" dataField="date_create" />
                    <Column caption="Status" dataField="status" />
                    <Column caption="Category" dataField="category_name" />
                    <Column caption="Category Product" dataField="category_sublv1_name" />
                    <Column caption="Category Case" dataField="category_sublv2_name" />
                    <Column caption="Category Detail" dataField="category_sublv3_name" />
                    <Column caption="User Create" dataField="user_create" />
                    <Column caption="SLA (Days)" dataField="sla" />
                    <Column caption="Organization" dataField="organization_name" />
                    <Column caption="Department" dataField="department_name" />
                    <Column caption="Complaint Detail" dataField="complaint_detail" />
                    <Column caption="Response Detail" dataField="response_detail" />
                </DataGrid>
            </Container>
        </MainContent>
    )
}

export default TicketHistory
