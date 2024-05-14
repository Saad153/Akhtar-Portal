"use client"
import React from 'react';
import { Row, Col } from "react-bootstrap";

const LatestReleases = () => {
  return (
    <>
    <Row>
        <Col md={12}>
            <div className='software-release-row'>
                <a href="https://drive.google.com/drive/folders/1KD-2Kphd7beC-awIygyJVYzhxYuEkmwA?usp=sharing" target="_blank">
                <Row>
                    <Col md={10}>
                    Version 1.0.2
                    </Col>
                    <Col md={2}>
                        <div style={{fontSize:11}}>Date: 23-Sep-2023</div>
                        Click to Download
                    </Col>
                </Row>
                </a>
            </div>
        </Col>
        <Col md={12} className='my-2'>
            <div className='software-release-row'>
                <a href="https://drive.google.com/file/d/1d6uh4AerGrS9Z38cge7sN6YN6y5LI_Ig/view?usp=drive_link" target="_blank">
                <Row>
                    <Col md={10}>
                    Version 1.0.1
                    </Col>
                    <Col md={2}>
                        <div style={{fontSize:11}}>Date: 24-Aug-2023</div>
                        Click to Download
                    </Col>
                </Row>
                </a>
            </div>
        </Col>
    </Row>
    </>
  )
}

export default LatestReleases