import React, { useEffect, useRef, useState } from 'react'
import Flatpickr from "react-flatpickr"
import * as echarts from 'echarts';




function General() {
    const [startDate, setStartDate] = useState(new Date());
    const chartDom = useRef();

    useEffect(() => {
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

        window.onSelectPicker();
    }, [])

    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
                <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                    <div className="d-flex align-items-center flex-wrap mr-1">
                        <div className="d-flex align-items-baseline flex-wrap mr-5">
                            <h5 className="text-dark font-weight-bold my-1 mr-5">General</h5>
                            <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-sm">
                                <li className="breadcrumb-item text-muted">
                                    <span className="text-muted">Features</span>
                                </li>
                                <li className="breadcrumb-item text-muted">
                                    <span className="text-muted">Cards</span>
                                </li>
                                <li className="breadcrumb-item text-muted">
                                    <span className="text-muted">General Cards</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <button className="btn btn-light-primary font-weight-bolder btn-sm">Actions</button>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column-fluid">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="container bg-white">
                                <h3>selectpicker</h3>
                                <select className="form-control selectpicker" data-size="7" data-live-search="true">
                                    <option data-icon="la la-bullhorn font-size-lg bs-icon" value="AZ">Arizona</option>
                                    <option value="CO">Colorado</option>
                                    <option value="ID">Idaho</option>
                                </select>

                                <input type="datetime-local" className="form-control form-control-sm" />

                                <h3>flatpickr</h3>
                                <Flatpickr
                                    className="form-control form-control-sm"
                                    value={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    options={{
                                        enableTime: true,
                                        dateFormat: "Y-m-d H:i:S",

                                    }}
                                />
                                <div style={{ height: '500px', width: '100%' }} ref={chartDom} />


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default General
