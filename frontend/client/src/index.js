import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import DocsPage from './pages/DocsPage';
import ExamplesPage from './pages/ExamplesPage';
import PlaygroundPage from './pages/PlaygroundPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import TitleProvider from './contexts/TitleProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/docs",
    element: <DocsPage/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/examples",
    element: <ExamplesPage/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/playground",
    element: <PlaygroundPage/>,
    errorElement: <ErrorPage />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TitleProvider>
      <RouterProvider router={router} />
    </TitleProvider>
  </React.StrictMode>
);


