import { useEffect, useState } from "react";
import http from '../http-common.js'

export const useGetEmployees = () => {
    const [loading, setLoading] = useState(false)
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        setLoading(true)

        http.get('/employees').then((response) => {
            setEmployees(response.data)
            setLoading(false)
        });

    }, [])

    return {loading, employees}
}

export const useGetCarModels = () => {
    const [loading, setLoading] = useState(false)
    const [carModels, setCarModels] = useState([])

    useEffect(() => {
        setLoading(true)

        http.get('/carmodels').then((response) => {
            setCarModels(response.data)
            setLoading(false)
        });

    }, [])

    return {loading, carModels, setCarModels}
}

export const useGetTotalSales = () => {
    const [loading, setLoading] = useState(false)
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        setLoading(true)

        http.get('/total_sales').then((response) => {
            setEmployees(response.data)
            setLoading(false)
        });

    }, [])

    return {loading, employees}
} 

export const useIsAuthenticated = () => {
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [email, setEmail] = useState()

    useEffect(() => {
        setLoading(true)

        http.get('/user/verify').then((response) => {
            setIsAuthenticated(true)
            setLoading(false)
            setEmail(response.data)
        }).catch((err) => {
            setLoading(false)
            setIsAuthenticated(false)
        })
    }, [])

    return {loading, isAuthenticated, email}
}


export const useIsAdmin = () => {
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const [email, setEmail] = useState()

    useEffect(() => {
        setLoading(true)

        http.get('/user/admin').then((response) => {
            setEmail(response.data)
            setIsAdmin(true)
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            setIsAdmin(false)
        })
    }, [])

    return {loading, isAdmin, email}
}

export const useGetUsers = () => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        setLoading(true)

        http.get('/user/all').then((response) => {
            setUsers(response.data)
            setLoading(false)
        });

    }, [])

    return {loading, users, setUsers}
}

export const useGetProfile = () => {
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState()

    useEffect(() => {
        setLoading(true)

        http.get('/user/profile').then((response) => {
            setProfile(response.data)
            setLoading(false)
        }).catch(() => {
            setProfile(undefined)
            setLoading(false)
        })
    }, [])

    return {loading, profile}
}
