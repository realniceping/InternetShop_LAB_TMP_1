import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { fetchOneDevice } from "../../http/deviceAPI";
import { editDevice } from "../../http/deviceAPI";

const EditDevice = (props) => {
    const {id, show, onHide, setShow} = props;
    
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOneDevice(id)
            .then((res) => {
                console.log(res)
                setName(res.name);
                setPrice(res.price);
                setLoading(false);
            })
            .catch(err => console.error(err))
    }, [])

    const editClickHandler = () => {
        editDevice({id: id, name:name, price: price})   
            .then((res) => {console.log(res)})
            .catch(err => console.log(err))
        
        
    }

    if(!loading){
    return(<Modal 
        show={show}
        onHide={onHide}
        size="lg"
        centered
        >
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Назавание</Form.Label>
                    <Form.Control placeholder="" value={name} onChange={e => setName(e.target.value)}/>
                    <Form.Text className="text-muted" >
                    Название продукта
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Стоимость</Form.Label>
                    <Form.Control type="number" placeholder="0" value={price} onChange={e => setPrice(e.target.value)}/>
                </Form.Group>
                <Button variant="success" onClick={editClickHandler}>
                    Сохранить
                </Button>
            </Form>
        </>
    </Modal>)
    }
    return(<></>)
}

export { EditDevice};