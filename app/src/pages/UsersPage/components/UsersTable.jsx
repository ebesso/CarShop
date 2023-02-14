import React, { useState } from 'react'
import { useGetUsers } from '../../../hooks/useApi'

import { Table, Button } from 'react-bootstrap'

import { TrashFill, Pencil } from 'react-bootstrap-icons'

import UserForm from './UserForm'

import { deleteUser } from '../../../services'

import './userTable.css'

export default function UsersTable(){

    const {loading, users, setUsers} = useGetUsers()
    const [showForm, setShowForm] = useState(false)
    const [editUser, setEditUser] = useState()

    const handleDelete = (id) => {
        deleteUser(id).then(() => {
            const updated = users.filter((user) => user._id !== id)
            setUsers([...updated])
        })
    } 

    const handleUpdatedUser = (user) => {
        let oldUsers = [...users]
        let i = users.findIndex((u) => u._id === user._id)
        oldUsers[i] = user
        setUsers(oldUsers)
        setEditUser('')
    }

    const handleEdit = (id) => {
        setEditUser(id)
    }

    const handleNewUser = (user) => {
        setUsers([...users, user])
        setShowForm(false)
    }

    return (
        <Table hover className="bg-white">
            <thead>
            <tr>
                <th>Email</th>
                <th>Employee</th>
                <th>Is Admin</th>
                <th>Password</th>
                <th>Action</th>
                <th><Button variant="outline-success" size="sm" style={{float: 'right'}} onClick={() => setShowForm(true)}>Add</Button></th>
            </tr>
            </thead>
            <tbody>
                {users.map((user, i) => 
                    user._id === editUser ? (
                        <UserForm onNewUserAdded={handleUpdatedUser} editMode={true} user={user} onSubmit={handleUpdatedUser} key={i}/> 
                    ): 
                    (
                        <tr style={{color: 'grey'}} key={i}>
                            <td>{user.email}</td>
                            <td>{user.employee ? user.employee.name : ''}</td>
                            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                            <td></td>
                            <td >
                                <Pencil className="action-icon" style={{color: 'navy'}} onClick={() => handleEdit(user._id)}/>
                                <TrashFill className="action-icon" onClick={() => handleDelete(user._id)} style={{color: 'red'}}/>
                            </td>
                            <td></td>
                        </tr>  
                    )
 
                )}
                {showForm && 
                    <UserForm onSubmit={handleNewUser} editMode={false} onSubmit={handleNewUser}/>
                }
            </tbody>
        </Table>
    )
}