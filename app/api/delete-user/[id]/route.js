const mongoose = require('mongoose')
import User from '@/models/User'
const connectToMongo = require('@/db')
import { NextRequest, NextResponse } from 'next/server'

connectToMongo()

export const DELETE = async (req, { params }) => {
    const origin= req.headers.get('origin')
    console.log('PARAMS',params)

    console.log('PARAMS ID',params.id)

    const deleteUser= await User.findByIdAndDelete(params.id)
    

    return new NextResponse(JSON.stringify({myRes:'ok'},{ status: 202 }), {
        headers: {
            'Access-Control-Allow-Origin': origin || "*",
            'Content-Type': 'application/json',
        }
    })
}
