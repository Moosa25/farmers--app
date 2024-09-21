import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootlayOut from './RootlayOut';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Aboutus from './components/aboutus/Aboutus';
import Menu from './components/menu/Menu';
import Addfooditems from './components/addfooditems/Addfooditems';
import Cart from './components/cart/Cart';
import User from './components/users/Users';
import ProtectedRoute from './ProtectedRoute';
import UserLoginStore from './components/context/UserLoginStore';

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <RootlayOut />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/Login',
          element: <Login />
        },
        {
          path: '/Register',
          element: <Register />
        },
        {
          path: "/Aboutus",
          element: <Aboutus />
        },
        {
          path: "/Menu",
          element: <ProtectedRoute element={<Menu />} allowedRoles={['ADMIN', 'USER']} />
        },
        {
          path: "/Addfooditems",
          element: <ProtectedRoute element={<Addfooditems />} allowedRoles={['ADMIN']} />
        },
        {
          path: "/Cart",
          element: <ProtectedRoute element={<Cart />} allowedRoles={['USER']} />
        },
        {
          path: "/users",
          element: <ProtectedRoute element={<User />} allowedRoles={['ADMIN']} />
        }
      ]
    }
  ]);

  return (
    <div className="App">
      <UserLoginStore>
        <RouterProvider router={router} />
      </UserLoginStore>
    </div>
  );
}

export default App;

