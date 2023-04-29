import {React, useContext} from "react";
import { Context } from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/const";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import '../App.css';
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
      user.setIsUser({})
      user.setIsAuth(false)
    }

    const role = localStorage.getItem("user_role");

    return(
        <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink className="title_underline" to={SHOP_ROUTE}>TMP SHOP</NavLink>
          {user.isAuth ?
            <Nav className="ml-auto" style={{color: 'white'}}>
            {role == "ADMIN" ? <Button variant="outline-light" onClick={() => navigate(ADMIN_ROUTE)}>Панель администратора</Button> : null}
            <Button variant="outline-light" onClick={() => {logOut(); navigate(LOGIN_ROUTE)}}>Выйти</Button>
            </Nav>
            :
            <Nav className="ml-auto" style={{color: 'white'}}>
            <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
            </Nav>
          }  
        </Container>
      </Navbar>
    );
});

export default NavBar;