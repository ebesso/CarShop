import http from '../http-common.js'

export const postCarModel = (data) => {
    return http.post('/carmodels', data)
}

export const postUser = (data) => {
    return http.post('/user/register', data)
}

export const updateUser = (id, data) => {
    data.employee = data.employee === "" ? undefined : data.employee
    data.password = data.password === "" ? undefined : data.password

    return http.patch('/user/update', {...data, id: id})
}

export const deleteUser = (id) => {
    return http.delete('/user/delete', {data: {id: id}})
}

export const deleteCarModel = (id) => {
    return http.delete('/carmodels', {data: {id: id}})
}

export const login = (email, password) => {
    return http.post('/user/authenticate', {email: email, password: password})
}

export const logout = () => {
    return http.post('/user/logout')
}