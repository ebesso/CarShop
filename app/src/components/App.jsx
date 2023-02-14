import React from "react";
import { Navigate } from "react-router-dom";

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import EmployeesPage from "../pages/EmployeesPage";
import CarModelsPage from "../pages/CarModelsPage";
import SalesPage from "../pages/SalesPage";
import LoginPage from "../pages/LoginPage";
import WithAuth from './WithAuth'
import WithAdmin from './WithAdmin'
import UsersPage from "../pages/UsersPage";
import ProfilePage from "../pages/ProfilePage";

export default function App (){

    const ProtectedEmployeePage = WithAuth(EmployeesPage)
    const ProtectedCarModelPage = WithAuth(CarModelsPage)
    const ProtectedSalesPage = WithAuth(SalesPage)
    const ProtectedProfilePage = WithAuth(ProfilePage)
    const ProtectedUserPage = WithAdmin(UsersPage)

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Navigate to="/employees" />
        },
        {
            path: '/employees',
            element: <ProtectedEmployeePage />
        },
        {
            path: '/car-models',
            element: <ProtectedCarModelPage />
        },
        {
            path: '/sales',
            element: <ProtectedSalesPage />
        },
        {
            path: '/login',
            element: <LoginPage />
        },
        {
            path: '/users',
            element: <ProtectedUserPage />

        },
        {
            path: '/profile',
            element: <ProtectedProfilePage />

        },
        
    ])
    return (    
        <React.Fragment>
            <RouterProvider router={router} />
        </React.Fragment>
    );
}