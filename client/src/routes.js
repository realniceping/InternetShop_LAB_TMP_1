import Admin from "./page/Admin"
import Auth from "./page/Auth"
import Basket from "./page/Basket"
import DevicePage from "./page/DevicePage"
import Shop from "./page/Shop"
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/const"

//Рендер в случае если пользователь - админ
export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]

//Рендер в случае если авторизованый пользователь
export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
]

// Рендер во всех случаях даже если пользователь не авторизован
export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
]