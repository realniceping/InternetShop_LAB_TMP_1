import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "../index";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import TypeBar from "../components/TypeBar";
import { fetchTypes, fetchBrands, fetchDevices } from "../http/deviceAPI";

const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect( () => {
        fetchTypes().then(data => device.setIsTypes(data))
        fetchBrands().then(data => device.setIsBrands(data))
        fetchDevices().then(data => device.setIsDevices(data.rows))
    }, [])

    return(
    <div>
        <Container>
        <Row className="mt-3">
            <Col md={3}>
                <TypeBar />
            </Col>
            <Col md={9}>
                <BrandBar />
                <DeviceList />
            </Col>
        </Row>
            
        </Container>
    </div>
    );
});

export default Shop;