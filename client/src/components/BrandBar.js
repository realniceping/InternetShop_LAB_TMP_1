import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Card, Form, Row } from 'react-bootstrap';
import { Context } from '../index';

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <Form className="d-flex flex-wrap">
            {device.brands.map(brand =>
                <Card 
                    key={brand.id}
                    className="p-3 m-1 mt-0"
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'primary' : 'light'}
                    style={{cursor: 'pointer'}}
                >
                    {brand.name}
                </Card>
            )}
        </Form>
  )
});
export default BrandBar;