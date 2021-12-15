import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup';
import Product from './pages/Product';
import Cart from './pages/Cart';
import ProductByCategory from './pages/ProductByCategory';

const routes = [
    {path:"/",element:<Home />},
    {path:"/login",element:<Login />},
    {path:"/signup",element:<Signup />},
    {path:"/product/:pid",element:<Product />},
    {path:"/cart",element:<Cart />},
    {path:"/caregory/:cid",element:<ProductByCategory />},
]

export default routes