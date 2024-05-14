import React, { useEffect, useState, useReducer } from 'react'
import { Row, Col, Table } from "react-bootstrap"
import moment from 'moment'
import {Input,Space } from 'antd';
import Pagination from '@/Components/Shared/Pagination';
import { CSVLink } from "react-csv"
import { initialState, recordsReducer,nexusDataFormatter } from './state';

const NexusInfor = ({ data }) => {

    const [nexusData,setNexusData] = useState([])
    const set = (obj) => dispatch({ type: 'set', payload: obj });
    const [state,dispatch] = useReducer(recordsReducer,initialState);
    //filter states
    const [filterData,setFilterData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    //search states
    const [searchData, setSearchData] = useState(data);
    const [query, setQuery] = useState("");
    const keys = ["po_number"];
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(50);
    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentRecords = nexusData ? nexusData.slice(indexOfFirst, indexOfLast) : null;
    const noOfPages = nexusData ? Math.ceil(nexusData.length / recordsPerPage) : null;

    useEffect(() => {
        setNexusData(data);
        setSearchData(data);
        setFilterData(data);
        nexusDataFormatter(data,set)
    },[]);

    useEffect(() => {
        if(searchData){
            const search = handleSearch(searchData);
            setNexusData(search)
        }
    }, [query, searchData]);

    useEffect(() => {
        const filtered = filterDataByDateRange(filterData, startDate, endDate);
        setNexusData(filtered);
    }, [filterData, startDate, endDate]);

    const filterDataByDateRange = (data, startDate, endDate) => {
        if (!startDate || !endDate) {
            return data;
        }
        return data.filter((item) => {
            const timestamp = moment(item.timestamp);
            return timestamp.isBetween(startDate, endDate, null, "[]");
        });
    };

    const handleSearch = (data) => {
        return data.filter((item) => {
            return keys.some(key => {
                const value = item[key];
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(query.toLowerCase());
                } else if (typeof value === 'number' && !isNaN(value)) {
                    return value.toString().includes(query);
                }
                return false;
            });
        });
    };

    return (
        <div>
             <Row className='my-2'>
                <Col md={1}></Col>
                <Col md={3} className='d-flex justify-content-end'>
                    <Space>
                        <label>From</label>
                        <Input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder='Select Start date' />
                    </Space>
                </Col>
                <Col md={3} className='d-flex justify-content-end'>
                    <Space>
                        <label>To</label>
                        <Input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder='Select End date' />
                    </Space>
                </Col>
                <Col md={3} className='d-flex justify-content-end'>
                    <Input type='text' placeholder='Enter Po no' onChange={(e) => setQuery(e.target.value)}/>
                </Col>
                <Col md={2} className='d-flex justify-content-start'>
                    {state.nexusData.length > 0 && <CSVLink data={state.nexusData} className='px-4 py-1 border-none text-center btn-custom'>Download</CSVLink>}
                </Col>
            </Row>
            <div className='mt-3' style={{ maxHeight: "65vh", overflowY: "auto", overflowX: "auto" }}>
                <Table className='tableFixHead'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Po number</th>
                            <th>Assign Equipment id</th>
                            <th>Booking no</th>
                            <th>Shipment Load type</th>
                            <th>Invoice no</th>
                            <th>Billway bill</th>
                            <th>Carrier</th>
                            <th>Transload location</th>
                            <th>Estd. Departure date</th>
                            <th>Equipment no type</th>
                            <th>Route no</th>
                            <th>Seal no</th>
                            <th>Ctn qty</th>
                            <th>Units</th>
                            <th>Created at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((x, index) => {
                            return (
                                <tr key={index} className='tableData'>
                                    <td>{x.id}</td>
                                    <td>{x.po_number}</td>
                                    <td>{x.assign_equipment_id}</td>
                                    <td>{x.booking_number}</td>
                                    <td>{x.shipment_load_tpye}</td>
                                    <td>{x.invoive_number}</td>
                                    <td>{x.bill_waybill}</td>
                                    <td>{x.carrier}</td>
                                    <td>{x.updated_transload_location_us_only}</td>
                                    <td>{moment(x.estimated_departure_date).format("DD-MM-YYYY")}</td>
                                    <td>{x.equipment_number_type}</td>
                                    <td>{x.route_number}</td>
                                    <td>{x.seal_number}</td>
                                    <td>{x.ctn_qty}</td>
                                    <td>{x.units}</td>
                                    <td>{x.timestamp}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
            <Row>
                <Col md={4}></Col>
                <Col md={8}>
                    <div className='d-flex justify-content-end mt-4'>
                        <Pagination noOfPages={noOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default NexusInfor