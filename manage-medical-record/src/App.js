import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import About from './pages/about/About';

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <div style={{height:'100%'}}>
        <Navbar />
        <Outlet />
        <Footer />
      </div>,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "about",
          element: <About />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
