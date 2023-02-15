import http from '../http-common.js'

export const postCarModel = (data) => {
    return http.post('/carmodels', data)
}

export const postUser = (data) => {
    return http.post('/users', data)
}

export const updateUser = (id, data) => {
    data.employee = data.employee === "" ? undefined : data.employee
    data.password = data.password === "" ? undefined : data.password

    return http.patch('/users', {...data, id: id})
}

export const deleteUser = (id) => {
    return http.delete('/users', {data: {id: id}})
}

export const deleteCarModel = (id) => {
    return http.delete('/carmodels', {data: {id: id}})
}

export const login = (email, password) => {
    return http.post('/users/authenticate', {email: email, password: password})
}

export const logout = () => {
    return http.post('/users/logout')
}

export const resetPassword = (data) => {
    return http.post('/users/reset', data)
}