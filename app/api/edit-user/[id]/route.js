const mongoose = require('mongoose')
import User from '@/models/User'
const connectToMongo = require('@/db')
import { NextRequest, NextResponse } from 'next/server'

connectToMongo()

export const GET = async (req, { params }) => {
    const origin= req.headers.get('origin')
    console.log('PARAMS',params)

    console.log('PARAMS ID',params.id)

    const fetchedUser= await User.findById(params.id)
    console.log('Fetched User', fetchedUser)

    

    return new NextResponse(JSON.stringify({fetchedUser},{ status: 202 }), {
        headers: {
            'Access-Control-Allow-Origin': origin || "*",
            'Content-Type': 'application/json',
        }
    })
}
