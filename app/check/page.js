'use client'
import React, { useState } from 'react'
import validator from "validator";

const page = () => {
    const [email, setemail] = useState('karthik@gmail.comkgnjnhjfdj')
    const a= validator.isEmail(email)
    console.log(a)

    return (
        <div>

        </div>
    )
}

export default page
