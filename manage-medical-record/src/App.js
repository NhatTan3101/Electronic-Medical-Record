import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>,
      children: [
        {
          path: "home",
          element: <Home />
        },
        {
          path: "about",
          element: <div> about </div>
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
