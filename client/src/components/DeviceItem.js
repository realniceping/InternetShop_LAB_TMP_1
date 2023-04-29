import { observer } from 'mobx-react-lite';
import React from 'react'
import { Card, Col, Image } from 'react-bootstrap';
import star from '../assets/star.png'
import photo from '../assets/photo.png'
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/const';

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    return (
    <Col md={3} className={"mt-3"} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
        <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
            <Image width = {150} hight = {150} src={process.env.REACT_APP_API_URL + device.img} />
            <div className="d-flex justify-content-between align-items-center text-black-50">
                <div>Название</div>
                <div className="d-flex align-items-center">
                    <div className="p-1">{device.rating}</div>
                    <Image width = {15} hight = {10} src={star}></Image>
                </div>
            </div>
            <div>{device.name}</div>
        </Card>
    </Col>
  );
};

export default DeviceItem;