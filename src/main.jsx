import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './pages/Login/Login.jsx'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home/Home.jsx'
import AdminLayout from './layouts/AdminLayout/AdminLayout.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AdminProducts } from './components/admin-products/AdminProducts.jsx'
import { AdminCategories } from './components/admin-categories/admin-categories.jsx'
import { AdminSpoilers } from './components/admin-spoilers/admin-spoilers.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home />
    ),
  },
  {
    path: "/login",
    element: (
      <Login />
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminLayout />
    ),
    children: [
      {
        path: "/admin/",
        element: <AdminProducts />,
      },
      {
        path: "/admin/categories",
        element: <AdminCategories />,
      },
      {
        path: "/admin/spoilers",
        element: <AdminSpoilers />,
      },
    ]
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
