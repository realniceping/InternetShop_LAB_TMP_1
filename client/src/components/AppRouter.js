import {React, useContext} from "react";
import {Routes, Route} from 'react-router-dom'

import { Context } from "../index";
import { authRoutes, publicRoutes, adminRoutes } from "../routes";
import NotFound from "../page/NotFound";

const AppRouter = () => {
    const {user} = useContext(Context);
    const role = localStorage.getItem("user_role");
    console.log(role);
    return(
        <Routes>
            {role == "ADMIN" ? adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact></Route>
            ) : null}

            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact></Route>
            )}

            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact></Route>
            )}

            <Route path='*' element={<NotFound/>}/> 
        </Routes>
    );
};

export default AppRouter;