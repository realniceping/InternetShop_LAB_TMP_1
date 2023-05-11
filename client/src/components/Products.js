import React, {useState, useEffect} from "react";
import { fetchDevices , deleteDevice} from "../http/deviceAPI";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { EditDevice } from "./modals/editDevice";

const AdminProductList = () => {

    const [products, setProducts] = useState([]);
    const [typeVisible ,setTypeVisible] = useState(false);
    const [idToEdit, setIdToEdit] = useState(null);

    const initProducts = () => {
        fetchDevices().then(data => {
            console.log(data);
            setProducts(data.rows);
        })
    }

    useEffect( () => {
        initProducts();
    }, [])

    const deleteClickHandler = (id) => {
        console.log(id);
        deleteDevice(id).then(data => {
            console.log(data);
            initProducts();
        })
    }

    const editClickHandler = (id) => {
        setIdToEdit(id);
        setTypeVisible(true);
    }

    return(
        <>
            {idToEdit ? <EditDevice show={typeVisible} onHide={() => {setTypeVisible(false); initProducts()}} id = {idToEdit} setShow = {setTypeVisible}></EditDevice> : null}
            <Table>
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Имя</th>
                        <th>Цена</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item, index) => {
                        return(
                            <tr key = {index}>
                                <th>{item.id}</th>
                                <th>{item.name}</th>
                                <th>{item.price}</th>
                                <th>
                                    <Button variant = "warning" onClick={() => {editClickHandler(item.id)}}>Редактировать</Button>
                                    <Button style = {{marginLeft: "5px"}} variant="danger" onClick={() => {deleteClickHandler(item.id)}}>Удалить</Button>
                                </th>   
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
} 

export {AdminProductList};