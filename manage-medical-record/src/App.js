import { RouterProvider } from 'react-router-dom';
import React from 'react';
import Router from './router/Router';

function App() {
  return (
    <RouterProvider router={Router} />
  );
}

export default App;
