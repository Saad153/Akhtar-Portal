import React, { useEffect, useState } from 'react'
import { Row, Col, Table } from "react-bootstrap"
import moment from 'moment'
import Pagination from '@/Components/Shared/Pagination';

const NexusFailedReports = ({ data }) => {

    const [nexusData,setNexusData] = useState([])
    const [searchData, setSearchData] = useState(data);
    const [query, setQuery] = useState("");
    const keys = ["po_number"];

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(20);
    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentRecords = nexusData ? nexusData.slice(indexOfFirst, indexOfLast) : null;
    const noOfPages = nexusData ? Math.ceil(nexusData.length / recordsPerPage) : null;

    useEffect(() => {
        setNexusData(data)
        setSearchData(data);
    },[]);

    useEffect(() => {
        if(searchData){
            const search = handleSearch(searchData);
            setNexusData(search)
        }
    }, [query, searchData]);

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
            <Row className=''>
                <Col md={8}></Col>
                <Col md={4} className='d-flex justify-content-end px-4'>
                    <input type='text' className='w-100 px-2 py-1 rounded searchInput' placeholder='Enter Po no'
                        onChange={(e) => setQuery(e.target.value)} />
                </Col>
            </Row>
            <div className='mt-3' style={{ maxHeight: "65vh", overflowY: "auto", overflowX: "auto" }}>
                <Table className='tableFixHead'>
                    <thead>
                        <tr>
                            <th>No</th>
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
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.length > 0 ? currentRecords.map((x, index) => {
                            return (
                                <tr key={index} className='tableData'>
                                    <td>{index + 1}</td>
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
                                </tr>
                            )
                        }) 
                        : "No Failed Reports found"
                        }
                    </tbody>
                </Table>
            </div>
            <Row>
                <Col md={4}></Col>
                <Col md={8}>
                    <div className='d-flex justify-content-end mt-5'>
                        {currentRecords.length > 0 && <Pagination noOfPages={noOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default NexusFailedReports