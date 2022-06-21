import React, { useEffect, useRef } from 'react';
// import { NavLink } from 'react-router-dom';
import * as echarts from 'echarts';

import { ButtonRefresh } from 'views/components/button';
// import Icons from 'views/components/Icons';
import { Container, MainContent, SubHeader } from 'views/layouts/partials';
import IconSocmed from 'views/components/IconSocmed';

const total_socmed = [
    { channel: "chat", background: "bg-warning" },
    { channel: "messenger", background: "bg-info" },
    { channel: "facebook", background: "bg-primary" },
    { channel: "whatsapp", background: "bg-success" },
    { channel: "twitter", background: "bg-primary" },
    { channel: "instagram", background: "bg-danger" },
];

function DashboardSocmed() {
    const chartDom = useRef();

    useEffect(() => {
        function LoadChart() {
            const myChart = echarts.init(chartDom.current);
            const option = {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Whatsapp', 'Chat', 'Facebook', 'Messenger', 'Twitter', 'Instagram']
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'Whatsapp',
                        type: 'line',
                        smooth: true,
                        data: [12, 13, 10, 14, 15, 23, 21]
                    },
                    {
                        name: 'Chat',
                        type: 'line',
                        smooth: true,
                        data: [20, 18, 19, 24, 20, 21, 10]
                    },
                    {
                        name: 'Facebook',
                        type: 'line',
                        smooth: true,
                        data: [10, 22, 20, 14, 10, 30, 10]
                    },
                    {
                        name: 'Messenger',
                        type: 'line',
                        smooth: true,
                        data: [20, 7, 30, 15, 5, 21, 20]
                    },
                    {
                        name: 'Instagram',
                        type: 'line',
                        smooth: true,
                        data: [10, 6, 12, 8, 32, 13, 10]
                    }, {
                        name: 'Twitter',
                        type: 'line',
                        smooth: true,
                        data: [12, 22, 6, 21, 9, 13, 12]
                    }
                ]
            }
            option && myChart.setOption(option);
        }
        LoadChart()

    })

    return (
        <MainContent>
            <SubHeader active_page="Dashboard" menu_name="Dashboard" modul_name="Ticket">
                <ul className="nav nav-pills nav-pills-sm nav-dark-75 mx-5">
                    <li className="nav-item">
                        <a className="nav-link py-2 px-4" data-toggle="tab" href="#kt_tab_pane_11_1">Month</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link py-2 px-4" data-toggle="tab" href="#kt_tab_pane_11_2">Week</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link py-2 px-4 active" data-toggle="tab" href="#kt_tab_pane_11_3">Day</a>
                    </li>
                </ul>
                <ButtonRefresh onClick={() => alert('asd')} />
            </SubHeader>
            <Container>
                <div className="row">
                    {
                        total_socmed.map((item, index) => {
                            return (
                                <div className="col-md-2" key={index}>
                                    <div className={`card card-custom ${item.background} card-stretch gutter-b`}>
                                        <div className="card-body">
                                            {/* <IconSocmed name={item.channel} height={40} width={40} /> */}
                                            <div className="symbol symbol-45 symbol-circle border">
                                                <div className="symbol-label">
                                                    <IconSocmed name={item.channel} height={45} width={45} />
                                                </div>
                                            </div>
                                            <span className="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">{Math.floor(Math.random() * 50)}</span>
                                            <span className="font-weight-bold text-white font-size-sm">{item.channel}</span>
                                        </div>
                                    </div>
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

                <div className="row mb-10">
                    <div className="col-lg-8">
                        <div className="card p-0">
                            <div className="card-header">
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div>Activity Detail</div>
                                    <span className="label label-light-primary label-inline mx-2">156</span>
                                </div>
                            </div>
                            <div className="card-body bg-white" style={{ height: '350px', width: '100%' }} ref={chartDom} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header">
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div>Agent Online</div>
                                    <span className="label label-light-primary label-inline mx-2">3</span>
                                </div>
                            </div>
                            <div className="card-body bg-white" style={{ height: '350px', width: '100%' }}>

                                <div className="list list-hover mb-4">
                                    <div className='list-item d-flex align-items-center justify-content-between'>
                                        <div className="d-flex align-items-center py-2 mx-2">
                                            <div className="symbol symbol-40px">
                                                <div className="symbol-label bg-light-success">
                                                    <i className="fa fa-user text-success"></i>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 mx-2">
                                                <div className="mr-2">Agent 1</div>
                                                <div className="text-muted mt-2">max concurent(10)</div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column align-items-end mx-2">
                                            <div className="text-muted">Handle</div>
                                            <div className="d-flex align-items-center justify-content-between mt-2">
                                                <span className="label label-light-primary font-weight-bold label-inline mx-2">98</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list list-hover mb-4">
                                    <div className='list-item d-flex align-items-center justify-content-between'>
                                        <div className="d-flex align-items-center py-2 mx-2">
                                            <div className="symbol symbol-40px">
                                                <div className="symbol-label bg-light-success">
                                                    <i className="fa fa-user text-success"></i>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 mx-2">
                                                <div className="mr-2">Agent 2</div>
                                                <div className="text-muted mt-2">max concurent(5)</div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column align-items-end mx-2">
                                            <div className="text-muted">Handle</div>
                                            <div className="d-flex align-items-center justify-content-between mt-2">
                                                <span className="label label-light-primary font-weight-bold label-inline mx-2">47</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list list-hover mb-4">
                                    <div className='list-item d-flex align-items-center justify-content-between'>
                                        <div className="d-flex align-items-center py-2 mx-2">
                                            <div className="symbol symbol-40px">
                                                <div className="symbol-label bg-light-success">
                                                    <i className="fa fa-user text-success"></i>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 mx-2">
                                                <div className="mr-2">Agent 3</div>
                                                <div className="text-muted mt-2">max concurent(5)</div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column align-items-end mx-2">
                                            <div className="text-muted">Handle</div>
                                            <div className="d-flex align-items-center justify-content-between mt-2">
                                                <span className="label label-light-primary font-weight-bold label-inline mx-2">25</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card p-0">
                            <div className="card-header">
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div>Top 10 Last Chat.</div>
                                    {/* <span className="label label-light-primary label-inline mx-2">156</span> */}
                                </div>
                            </div>
                            <div className="card-body bg-white" style={{ height: '300px', width: '100%', overflow: 'auto' }}>
                                <table className="table">
                                    <thead className="datatable-head">
                                        <tr className="datatable-row" style={{ left: 0 }}>
                                            <th data-field="Order ID" className="datatable-cell datatable-cell-sort"><span style={{ width: 132 }}>
                                                ID</span></th>
                                            <th data-field="Car Make" className="datatable-cell datatable-cell-sort"><span style={{ width: 132 }}>Channel</span></th>
                                            <th data-field="Car Model" className="datatable-cell datatable-cell-sort"><span style={{ width: 132 }}>Customer Name</span></th>
                                            <th data-field="Color" className="datatable-cell datatable-cell-sort"><span style={{ width: 132 }}>Message</span></th>
                                            <th data-field="Order Date" className="datatable-cell datatable-cell-sort"><span style={{ width: 132 }}> Datetime</span></th>
                                            <th data-field="Status" data-autohide-disabled="false" className="datatable-cell datatable-cell-sort"><span style={{ width: 132 }}>Status</span></th>
                                            <th data-field="Type" data-autohide-disabled="false" className="datatable-cell datatable-cell-sort"><span style={{ width: 132 }}>Type</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="datatable-body">
                                        <tr data-row={0} className="datatable-row" style={{ left: 0 }}>
                                            <td data-field="Order ID" aria="34460-6006" className="datatable-cell"><span style={{ width: 132 }}>34460-6006</span></td>
                                            <td data-field="Car Make" aria="Audi" className="datatable-cell"><span style={{ width: 132 }}>Audi</span></td>
                                            <td data-field="Car Model" aria="Allroad" className="datatable-cell"><span style={{ width: 132 }}>Allroad</span></td>
                                            <td data-field="Color" aria="Mauv" className="datatable-cell"><span style={{ width: 132 }}>Mauv</span>
                                            </td>
                                            <td data-field="Deposit Paid" aria="47394.02" className="datatable-cell"><span style={{ width: 132 }}>47394.02</span></td>
                                            <td data-field="Status" data-autohide-disabled="false" aria={3} className="datatable-cell"><span style={{ width: 132 }}><span className="label font-weight-bold label-lg label-light-primary label-inline">Canceled</span></span>
                                            </td>
                                            <td data-field="Type" data-autohide-disabled="false" aria={3} className="datatable-cell"><span style={{ width: 132 }}><span className="label label-success label-dot mr-2" /><span className="font-weight-bold text-success">Direct</span></span></td>
                                        </tr>
                                        <tr data-row={1} className="datatable-row datatable-row-even" style={{ left: 0 }}>
                                            <td data-field="Order ID" aria="62802-106" className="datatable-cell"><span style={{ width: 132 }}>62802-106</span></td>
                                            <td data-field="Car Make" aria="GMC" className="datatable-cell"><span style={{ width: 132 }}>GMC</span>
                                            </td>
                                            <td data-field="Car Model" aria="Sierra 1500" className="datatable-cell"><span style={{ width: 132 }}>Sierra 1500</span></td>
                                            <td data-field="Color" aria="Teal" className="datatable-cell"><span style={{ width: 132 }}>Teal</span>
                                            </td>
                                            <td data-field="Order Date" aria="2016-05-06" className="datatable-cell"><span style={{ width: 132 }}>2016-05-06</span></td>
                                            <td data-field="Status" data-autohide-disabled="false" aria={3} className="datatable-cell"><span style={{ width: 132 }}><span className="label font-weight-bold label-lg label-light-primary label-inline">Canceled</span></span>
                                            </td>
                                            <td data-field="Type" data-autohide-disabled="false" aria={1} className="datatable-cell"><span style={{ width: 132 }}><span className="label label-danger label-dot mr-2" /><span className="font-weight-bold text-danger">Online</span></span></td>
                                        </tr>
                                        <tr data-row={2} className="datatable-row" style={{ left: 0 }}>
                                            <td data-field="Order ID" aria="43269-664" className="datatable-cell"><span style={{ width: 132 }}>43269-664</span></td>
                                            <td data-field="Car Make" aria="Buick" className="datatable-cell"><span style={{ width: 132 }}>Buick</span></td>
                                            <td data-field="Car Model" aria="Terraza" className="datatable-cell"><span style={{ width: 132 }}>Terraza</span></td>
                                            <td data-field="Color" aria="Orange" className="datatable-cell"><span style={{ width: 132 }}>Orange</span></td>
                                            <td data-field="Order Date" aria="2017-08-17" className="datatable-cell"><span style={{ width: 132 }}>2017-08-17</span></td>
                                            <td data-field="Status" data-autohide-disabled="false" aria={3} className="datatable-cell"><span style={{ width: 132 }}><span className="label font-weight-bold label-lg label-light-primary label-inline">Canceled</span></span>
                                            </td>
                                            <td data-field="Type" data-autohide-disabled="false" aria={1} className="datatable-cell"><span style={{ width: 132 }}><span className="label label-danger label-dot mr-2" /><span className="font-weight-bold text-danger">Online</span></span></td>
                                        </tr>
                                        <tr data-row={3} className="datatable-row datatable-row-even" style={{ left: 0 }}>
                                            <td data-field="Order ID" aria="65862-602" className="datatable-cell"><span style={{ width: 132 }}>65862-602</span></td>
                                            <td data-field="Car Make" aria="Ford" className="datatable-cell"><span style={{ width: 132 }}>Ford</span></td>
                                            <td data-field="Car Model" aria="Crown Victoria" className="datatable-cell"><span style={{ width: 132 }}>Crown Victoria</span></td>
                                            <td data-field="Color" aria="Green" className="datatable-cell"><span style={{ width: 132 }}>Green</span></td>
                                            <td data-field="Order Date" aria="2016-09-01" className="datatable-cell"><span style={{ width: 132 }}>2016-09-01</span></td>
                                            <td data-field="Status" data-autohide-disabled="false" aria={6} className="datatable-cell"><span style={{ width: 132 }}><span className="label font-weight-bold label-lg label-light-danger label-inline">Danger</span></span>
                                            </td>
                                            <td data-field="Type" data-autohide-disabled="false" aria={3} className="datatable-cell"><span style={{ width: 132 }}><span className="label label-success label-dot mr-2" /><span className="font-weight-bold text-success">Direct</span></span></td>
                                        </tr>
                                        <tr data-row={4} className="datatable-row" style={{ left: 0 }}>
                                            <td data-field="Order ID" aria="18527-119" className="datatable-cell"><span style={{ width: 132 }}>18527-119</span></td>
                                            <td data-field="Car Make" aria="Toyota" className="datatable-cell"><span style={{ width: 132 }}>Toyota</span></td>
                                            <td data-field="Car Model" aria="Sequoia" className="datatable-cell"><span style={{ width: 132 }}>Sequoia</span></td>
                                            <td data-field="Color" aria="Mauv" className="datatable-cell"><span style={{ width: 132 }}>Mauv</span>
                                            </td>
                                            <td data-field="Order Date" aria="2016-05-17" className="datatable-cell"><span style={{ width: 132 }}>2016-05-17</span></td>
                                            <td data-field="Status" data-autohide-disabled="false" aria={6} className="datatable-cell"><span style={{ width: 132 }}><span className="label font-weight-bold label-lg label-light-danger label-inline">Danger</span></span>
                                            </td>
                                            <td data-field="Type" data-autohide-disabled="false" aria={2} className="datatable-cell"><span style={{ width: 132 }}><span className="label label-primary label-dot mr-2" /><span className="font-weight-bold text-primary">Retail</span></span></td>
                                        </tr>
                                        <tr data-row={5} className="datatable-row datatable-row-even" style={{ left: 0 }}>
                                            <td data-field="Order ID" aria="55910-994" className="datatable-cell"><span style={{ width: 132 }}>55910-994</span></td>
                                            <td data-field="Car Make" aria="Mercedes-Benz" className="datatable-cell"><span style={{ width: 132 }}>Mercedes-Benz</span></td>
                                            <td data-field="Car Model" aria="C-Class" className="datatable-cell"><span style={{ width: 132 }}>C-Class</span></td>
                                            <td data-field="Color" aria="Turquoise" className="datatable-cell"><span style={{ width: 132 }}>Turquoise</span></td>
                                            <td data-field="Order Date" aria="2016-01-10" className="datatable-cell"><span style={{ width: 132 }}>2016-01-10</span></td>
                                            <td data-field="Status" data-autohide-disabled="false" aria={6} className="datatable-cell"><span style={{ width: 132 }}><span className="label font-weight-bold label-lg label-light-danger label-inline">Danger</span></span>
                                            </td>
                                            <td data-field="Type" data-autohide-disabled="false" aria={3} className="datatable-cell"><span style={{ width: 132 }}><span className="label label-success label-dot mr-2" /><span className="font-weight-bold text-success">Direct</span></span></td>
                                        </tr>
                                        <tr data-row={6} className="datatable-row" style={{ left: 0 }}>
                                            <td data-field="Order ID" aria="49349-441" className="datatable-cell"><span style={{ width: 132 }}>49349-441</span></td>
                                            <td data-field="Car Make" aria="Audi" className="datatable-cell"><span style={{ width: 132 }}>Audi</span></td>
                                            <td data-field="Car Model" aria="Cabriolet" className="datatable-cell"><span style={{ width: 132 }}>Cabriolet</span></td>
                                            <td data-field="Color" aria="Red" className="datatable-cell"><span style={{ width: 132 }}>Red</span>
                                            </td>
                                            <td data-field="Order Date" aria="2017-07-31" className="datatable-cell"><span style={{ width: 132 }}>2017-07-31</span></td>
                                            <td data-field="Status" data-autohide-disabled="false" aria={2} className="datatable-cell"><span style={{ width: 132 }}><span className="label font-weight-bold label-lg label-light-danger label-inline">Delivered</span></span>
                                            </td>
                                            <td data-field="Type" data-autohide-disabled="false" aria={2} className="datatable-cell"><span style={{ width: 132 }}><span className="label label-primary label-dot mr-2" /><span className="font-weight-bold text-primary">Retail</span></span></td>
                                        </tr>
                                        <tr data-row={7} className="datatable-row datatable-row-even datatable-row-hover" style={{ left: 0 }}>
                                            <td data-field="Order ID" aria="0573-0232" className="datatable-cell"><span style={{ width: 132 }}>0573-0232</span></td>
                                            <td data-field="Car Make" aria="Hyundai" className="datatable-cell"><span style={{ width: 132 }}>Hyundai</span></td>
                                            <td data-field="Car Model" aria="Tucson" className="datatable-cell"><span style={{ width: 132 }}>Tucson</span></td>
                                            <td data-field="Color" aria="Puce" className="datatable-cell"><span style={{ width: 132 }}>Puce</span>
                                            </td>
                                            <td data-field="Order Date" aria="2017-02-10" className="datatable-cell"><span style={{ width: 132 }}>2017-02-10</span></td>
                                            <td data-field="Status" data-autohide-disabled="false" aria={2} className="datatable-cell"><span style={{ width: 132 }}><span className="label font-weight-bold label-lg label-light-danger label-inline">Delivered</span></span>
                                            </td>
                                            <td data-field="Type" data-autohide-disabled="false" aria={1} className="datatable-cell"><span style={{ width: 132 }}><span className="label label-danger label-dot mr-2" /><span className="font-weight-bold text-danger">Online</span></span></td>
                                        </tr>
                                        <tr data-row={8} className="datatable-row" style={{ left: 0 }}>
                                            <td data-field="Order ID" aria="49643-326" className="datatable-cell"><span style={{ width: 132 }}>49643-326</span></td>
                                            <td data-field="Car Make" aria="Lexus" className="datatable-cell"><span style={{ width: 132 }}>Lexus</span></td>
                                            <td data-field="Car Model" aria="IS" className="datatable-cell"><span style={{ width: 132 }}>IS</span>
                                            </td>
                                            <td data-field="Color" aria="Pink" className="datatable-cell"><span style={{ width: 132 }}>Pink</span>
                                            </td>
                                            <td data-field="Order Date" aria="2016-06-01" className="datatable-cell"><span style={{ width: 132 }}>2016-06-01</span></td>
                                            <td data-field="Status" data-autohide-disabled="false" aria={5} className="datatable-cell"><span style={{ width: 132 }}><span className="label font-weight-bold label-lg label-light-info label-inline">Info</span></span>
                                            </td>
                                            <td data-field="Type" data-autohide-disabled="false" aria={3} className="datatable-cell"><span style={{ width: 132 }}><span className="label label-success label-dot mr-2" /><span className="font-weight-bold text-success">Direct</span></span></td>
                                        </tr>
                                        <tr data-row={9} className="datatable-row datatable-row-even" style={{ left: 0 }}>
                                            <td data-field="Order ID" aria="0944-2627" className="datatable-cell"><span style={{ width: 132 }}>0944-2627</span></td>
                                            <td data-field="Car Make" aria="Audi" className="datatable-cell"><span style={{ width: 132 }}>Audi</span></td>
                                            <td data-field="Car Model" aria="S4" className="datatable-cell"><span style={{ width: 132 }}>S4</span>
                                            </td>
                                            <td data-field="Color" aria="Maroon" className="datatable-cell"><span style={{ width: 132 }}>Maroon</span></td>
                                            <td data-field="Order Date" aria="2016-12-16" className="datatable-cell"><span style={{ width: 132 }}>2016-12-16</span></td>
                                            <td data-field="Status" data-autohide-disabled="false" aria={4} className="datatable-cell"><span style={{ width: 132 }}><span className="label font-weight-bold label-lg label-light-success label-inline">Success</span></span>
                                            </td>
                                            <td data-field="Type" data-autohide-disabled="false" aria={2} className="datatable-cell"><span style={{ width: 132 }}><span className="label label-primary label-dot mr-2" /><span className="font-weight-bold text-primary">Retail</span></span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Container >
        </MainContent >
    )
}

export default DashboardSocmed
