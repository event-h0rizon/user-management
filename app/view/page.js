'use client'
import React, { useState, useEffect } from 'react'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const View = () => {
    const [users, setUsers] = useState([])
    const [deleteTrigger, setDeleteTrigger] = useState(false)
    const router = useRouter()


    const handleDelete = async (id) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DELETE_USER}/${id}`, { method: 'DELETE', headers: { "Content-Type": "application/json" } })
        setDeleteTrigger(value => !value)

    }
    const handleEdit = async (id) => {
        router.push(`/edit-user/${id}`)

    }


    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_VIEW_USERS, { method: 'POST', headers: { "Content-Type": "application/json" } })
            const data = await response.json()
            setUsers(data.users)
        }
        fetchUsers()
    }, [deleteTrigger])


    return (
        <>
            <div className='px-4 py-2'>
                <h1 className='text-3xl pb-6'>All users from the remote database.</h1>
                <div>

                    {users.length === 0 && <div className='text-4xl  text-center py-8'>No Users</div>}
                    {users.map((user, index) => {
                        return (
                            <div key={index} className='flex gap-20 items-center px-4 py-4'>
                                <div>
                                    <div>S.No: {index + 1}</div>
                                </div>
                                <button onClick={() => { handleEdit(user._id) }} className='rounded-md border-black border-2 bg-blue-500 text-white px-2 py-1'>Edit

                                </button>
                                <button onClick={() => { handleDelete(user._id) }} className='rounded-md border-black border-2 bg-red-500 text-white px-2 py-1'>Delete

                                </button>
                                <div className=''>
                                    <div className='flex gap-4 flex-wrap'>
                                        <div>First Name: <span className='font-semibold'>{user.firstName}</span></div>
                                        <div>Last Name: <span className='font-semibold'>{user.lastName}</span></div>
                                        <div>Email: <span className='font-semibold'>{user.email}</span></div>
                                        <div>ISD Code: <span className='font-semibold'>{user.country_isd}</span></div>
                                        <div>Mobile: <span className='font-semibold'>{user.mobile}</span></div>
                                        <div>Zip: <span className='font-semibold'>{user.zip}</span></div>
                                    </div>
                                    <div>Address 1: <span className='font-semibold'>{user.address1}</span></div>
                                    <div>Address 2: <span className='font-semibold'>{user.address2}</span></div>
                                    <div className='flex gap-3'>Country:
                                        <div className='flex gap-2 flex-wrap font-semibold'>
                                            {user.countries.map((item, i) => {
                                                return (
                                                    <div key={index}>({i + 1}) {item}

                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className='flex gap-3'>State:
                                        <div className='flex gap-2 flex-wrap font-semibold'>
                                            {user.states.map((item, i) => {
                                                return (
                                                    <div key={index}>({i + 1}) {item}

                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                            </div>

                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default View
