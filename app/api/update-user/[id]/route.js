const mongoose = require('mongoose')
import User from '@/models/User'
const connectToMongo = require('@/db')
import { NextRequest, NextResponse } from 'next/server'

connectToMongo()

export const POST = async (req, { params }) => {
    const origin = req.headers.get('origin')
    const data = await req.json()

    try {
        const tobeUpdatedUser = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            country_isd: data.country_isd,
            mobile: data.mobile,
            address1: data.address1,
            address2: data.address2,
            countries: data.countries,
            states: data.states,
            zip: data.zip
        }
        const updatedUser = await User.findByIdAndUpdate(params.id, { $set: tobeUpdatedUser }, { new: true })
        return new NextResponse(JSON.stringify({ success: updatedUser }, { status: 202 }), {
            headers: {
                'Access-Control-Allow-Origin': origin || "*",
                'Content-Type': 'application/json',
            }
        })

    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ error }, { status: 401 }), {
            headers: {
                'Access-Control-Allow-Origin': origin || "*",
                'Content-Type': 'application/json',
            }
        })

    }



}



