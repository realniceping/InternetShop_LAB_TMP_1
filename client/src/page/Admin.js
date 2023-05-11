import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import { AdminProductList } from "../components/Products";

const Admin = () => {
    const [brandVisible ,setBrandVisible] = useState(false)
    const [typeVisible ,setTypeVisible] = useState(false)
    const [deviceVisible ,setDeviceVisible] = useState(false)

    return(
    <div>
        <Container className="d-flex flex-column">
            <Button 
                variant="outline-dark" 
                className="mt-3 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button 
                variant="outline-dark" 
                className="mt-3 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button 
                variant="outline-dark" 
                className="mt-3 p-2"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
        </Container>
        <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}></CreateType>
        <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}></CreateBrand>
        <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}></CreateDevice>
        <AdminProductList/>
    </div>
    );
};

export default Admin;