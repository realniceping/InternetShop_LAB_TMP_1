import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row, Form, Card, Button } from "react-bootstrap";
import star_2 from '../assets/star_2.png'
import '../App.css';
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()


    useEffect( () => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    return(
        <Container className="mt-3">
            <Row>
            <Col md={4}>
                <Image width={250} height={300} src={process.env.REACT_APP_API_URL + device.img} />
            </Col>
            <Col md={4}>
                <Form className="d-flex flex-column align-items-center">
                    <h2>{device.name}</h2>
                    <div
                        className="d-flex flex-column align-items-center justify-content-center"
                    >  
                        <Image width={200} height={200} src={star_2}/>
                        <h2>{device.rating}</h2>
                    </div>
                </Form>
            </Col>
            <Col md={4}>
                <Card className="d-flex flex-column align-items-center justify-content-around"
                      style={{width:385, height:300, fontSize:32, border: '5px solid black'}}
                >
                    <h3>{device.price} ед.</h3>
                    <Button variant="outline-dark">Добавить в корзину</Button>
                </Card>
            </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h3 className="mt-5">Характеристики</h3>
                {device.info.map((info, index) => 
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgrey' : 'transparent', padding: 10}}>
                        {info.title} : {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;