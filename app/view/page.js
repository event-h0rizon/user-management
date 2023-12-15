'use client'
import React, { useState, useEffect } from 'react'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const View = () => {
    const [users, setUsers] = useState([])
    const [deleteTrigger, setDeleteTrigger] = useState(false)
    const router= useRouter()


    const handleDelete= async(id)=>{
        const response = await fetch(`${process.env.NEXT_PUBLIC_DELETE_USER}/${id}`, { method: 'DELETE', headers: { "Content-Type": "application/json" } })
        setDeleteTrigger(value=>!value)
        
    }
    const handleEdit= async(id)=>{
       router.push(`/edit-user/${id}`)
        
    }


    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_VIEW_USERS, { method: 'POST', headers: { "Content-Type": "application/json" } })
            const data = await response.json()
            // const users = data.users
            setUsers(data.users)
            console.log('ww', users)
            console.log(typeof (users))
        }
        fetchUsers()
    }, [deleteTrigger])


    return (
        <>
            <div className='px-4 py-2'>
                <h1 className='text-3xl pb-6'>All users</h1>
                <div>
                    {users.map((user, index) => {
                        return (
                            <div className='flex gap-20 items-center px-4 py-4'>
                                <div>
                                    <div>S.No: {index + 1}</div>
                                </div>
                                <button onClick={()=>{handleEdit(user._id)}} className='rounded-md border-black border-2 bg-blue-500 text-white px-2 py-1'>Edit

                                </button>
                                <button onClick={()=>{handleDelete(user._id)}} className='rounded-md border-black border-2 bg-red-500 text-white px-2 py-1'>Delete

                                </button>
                                <div className=''>
                                    <div className='flex gap-4 flex-wrap'>
                                        <div>First Name: {user.firstName}</div>
                                        <div>Last Name: {user.lastName}</div>
                                        <div>Email: {user.email}</div>
                                        <div>ISD Code: {user.country_isd}</div>
                                        <div>Mobile: {user.mobile}</div>
                                        <div>Zip: {user.zip}</div>
                                    </div>
                                    <div>Address 1: {user.address1}</div>
                                    <div>Address 2: {user.address2}</div>
                                    <div className='flex gap-3'>Country:
                                        <div className='flex gap-2 flex-wrap'>
                                            {user.countries.map((item, i) => {
                                                return (
                                                    <div>({i + 1}) {item}

                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className='flex gap-3'>State:
                                        <div className='flex gap-2 flex-wrap'>
                                            {user.states.map((item, i) => {
                                                return (
                                                    <div>({i + 1}) {item}

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
