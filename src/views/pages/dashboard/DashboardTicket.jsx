import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import * as echarts from 'echarts';

import { ButtonRefresh } from 'views/components/button';
import Icons from 'views/components/Icons';
import { Container, MainContent, SubHeader } from 'views/layouts/partials';

function DashboardTicket() {
    const chartDom = useRef();

    useEffect(() => {
        function LoadChart() {
            const myChart = echarts.init(chartDom.current);
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['Evaporation', 'Precipitation', 'Temperature']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Precipitation',
                        min: 0,
                        max: 250,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value} ml'
                        }
                    },
                    {
                        type: 'value',
                        name: 'Temperature',
                        min: 0,
                        max: 25,
                        interval: 5,
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    }
                ],
                series: [
                    {
                        name: 'Evaporation',
                        type: 'bar',
                        data: [
                            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                        ]
                    },
                    {
                        name: 'Precipitation',
                        type: 'bar',
                        data: [
                            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                        ]
                    },
                    {
                        name: 'Temperature',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    }
                ]
            };
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
                    <div className="col-md-3">
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
                    </div>
                </div>

                <div className="row mb-10">
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body bg-white" style={{ height: '400px', width: '100%' }} ref={chartDom} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body bg-white" style={{ height: '400px', width: '100%' }} />
                        </div>
                    </div>
                </div>
            </Container>
        </MainContent>
    )
}

export default DashboardTicket
