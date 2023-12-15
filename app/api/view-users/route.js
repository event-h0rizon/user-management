const mongoose = require('mongoose')
import User from '@/models/User'
const connectToMongo = require('@/db')
import { NextRequest, NextResponse } from 'next/server'


connectToMongo()
export const POST = async (req, res) => {
    const origin= req.headers.get('origin')

    const users = await User.find()
    return new NextResponse(JSON.stringify({ users }, { status: 202 }), {
        headers: {
            'Access-Control-Allow-Origin': origin || "*",
            'Content-Type': 'application/json',
        }
    })
}