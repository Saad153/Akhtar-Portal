import React, { useState, useEffect, useReducer } from 'react';
import { Row, Col, Table } from "react-bootstrap";
import moment from 'moment';
import {Space, Input } from 'antd';
import Pagination from '@/Components/Shared/Pagination';
import { CSVLink } from "react-csv"
import { damcoDataFormatter, initialState, recordsReducer } from './state';

const Damco = ({ data }) => {
    const [damcoData, setDamcoData] = useState([]);
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
    const currentRecords = damcoData ? damcoData.slice(indexOfFirst, indexOfLast) : null;
    const noOfPages = damcoData ? Math.ceil(damcoData.length / recordsPerPage) : null;

    useEffect(() => {
        setDamcoData(data)
        setSearchData(data);
        setFilterData(data)
        damcoDataFormatter(data,set)
    }, []);

    useEffect(() => {
        if (searchData) {
            const search = handleSearch(searchData);
            setDamcoData(search);
        }
    }, [query, searchData]);

    useEffect(() => {
        const filtered = filterDataByDateRange(filterData, startDate, endDate);
        setDamcoData(filtered);
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
                   {state.damcoData.length > 0 && <CSVLink data={state.damcoData} className='px-4 py-1 border-none text-center btn-custom'>Download</CSVLink>}
                </Col>
            </Row>
            <div className='mt-3' style={{ maxHeight: "65vh", overflowY: "auto", overflowX: "scroll" }}>
                <Table className='tableFixHead'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Po number</th>
                            <th>Plan hod</th>
                            <th>Country</th>
                            <th>Order qty</th>
                            <th>Carton qty</th>
                            <th>Carton type</th>
                            <th>Carton cbm</th>
                            <th>Gross wieg.</th>
                            <th>Booking id</th>
                            <th>Status</th>
                            <th>Created at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((x, index) => {
                            return (
                                <tr key={index} className='tableData'>
                                    <td>{x.id}</td>
                                    <td>{x.po_number}</td>
                                    <td>{moment(x.plan_hod).format("DD-MM-YYYY")}</td>
                                    <td>{x.country}</td>
                                    <td>{x.order_qty}</td>
                                    <td>{x.carton_qty}</td>
                                    <td>{x.ctn_type}</td>
                                    <td>{x.carton_cbm}</td>
                                    <td>{x.gross_weight}</td>
                                    <td>{x.booking_id}</td>
                                    <td className='text-success fw-bold'>{x.booking_status}</td>
                                    <td>{moment(x.timestamp).format("DD-MM-YYYY")}</td>
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
                        <Pagination noOfPages={noOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Damco