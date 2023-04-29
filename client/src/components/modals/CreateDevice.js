import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import Modal from 'react-bootstrap/Modal';
import { fetchBrands, fetchTypes, createDevice } from '../../http/deviceAPI';
import { Context } from "../../index";
import { selectedBrand, selectedType, setSelectedType, setSelectedBrand} from "../../store/deviceStore";



const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState([])

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)

    useEffect( () => {
        fetchTypes().then(data => device.setIsTypes(data))
        fetchBrands().then(data => device.setIsBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

  return (
    <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новое утройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Dropdown className='mt-2 mb-2'>
                <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                <DropdownMenu>
                    {device.types.map(type => 
                    <DropdownItem 
                        onClick={() => device.setSelectedType(type)} 
                        key={type.id}
                    >
                        {type.name}
                    </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
            <Dropdown className='mt-2 mb-2'>
                <Dropdown.Toggle>{device.selectedBrand.name || "Выберите тип"}</Dropdown.Toggle>
                <DropdownMenu>
                    {device.brands.map(brand => 
                    <DropdownItem 
                        onClick={() => device.setSelectedBrand(brand)}
                        key={brand.id}
                    >
                        {brand.name}
                    </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
            <Form>
                <Form.Control 
                    className='mt-3'
                    placeholder='Введите название утройства'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Form.Control 
                    className='mt-3'
                    placeholder='Введите стоимость утройства'
                    type="number"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                />
                <Form.Control 
                    className='mt-3'
                    type="file"
                    onChange={selectFile}
                />
                <hr />
                <Button
                    variant='outline-primary'
                    onClick={addInfo}
                >
                    Добавить новое свойство
                </Button>
                {info.map(i => 
                    <Row className='mt-4 d-flex justify-content-around' key={i.number}>
                        <Col md={4}>
                            <Form.Control
                                placeholder='Название характеристики'
                                value={i.title}
                                onChange={(e) => changeInfo('title', e.target.value, i.number)}

                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                placeholder='Описание характеристики'
                                value={i.description}
                                onChange={(e) => changeInfo('description', e.target.value, i.number)}

                            />
                        </Col>
                        <Col md={4}>
                            <Button 
                                variant={'outline-danger'}
                                onClick={() => removeInfo(i.number)}
                            >
                                Удалить
                            </Button>
                        </Col>
                    </Row>
                )}
            </Form>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice