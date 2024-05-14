"use client"
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Aos from 'aos';
import Router from 'next/router';

const Login = () => {

    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("");

    useEffect(() => {
        Aos.init();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(username=="abdullah" && pass=="12345"){
            Router.push("/latestReleases")
        }
    }
    
  return (
    <Container fluid>
        <Row>
            <Col md={7} style={{padding:0, height:'100vh'}} className='bg-grey'>
                <div style={{marginTop:"30%"}}></div>
                <img src='/images/login-bg.png' height={"40%"} style={{marginLeft:20}} data-aos="fade-in" />
                <p className='text-center mt-5'>
                    Software Automation Portal Created By <br/>Hail. Technologies
                </p>
            </Col>
            <Col md={5} className='px-5 shadow-left'>
                <div style={{backgroundColor:'white', position:'absolute', zIndex:10, height:'100vh'}} 
                    data-aos="fade-in"
                >
                <div style={{marginTop:"40%"}}></div>
                    <h1 style={{fontWeight:600, fontSize:55}}>
                        <span className='blue-2'>Welcome To </span><br/>
                        <span className='blue-1'>Hail.Tech Portal</span>
                    </h1>
                    <hr/>
                    <h3 className='mt-4'>Sign In</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="" required value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control placeholder="" type='password' required value={pass} onChange={(e)=>setPass(e.target.value)} />
                        </Form.Group>
                        Forget Password?
                        <hr/>
                        <Button className='px-4' type='submit'> Submit </Button>
                    </Form>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default Login