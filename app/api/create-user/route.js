const connectToMongo = require('@/db')
import { NextRequest, NextResponse } from 'next/server'
const User = require('@/models/User')

connectToMongo()


export const POST = async (req, res) => {
    const origin= req.headers.get('origin')

    const data = await req.json()

    console.log('Client sent',data)

    try {

        const user = await new User({
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

        })
        await user.save()
        console.log('User created successfully. New user is:', user)

        return new NextResponse(JSON.stringify({ success: "success" }, { status: 201 }), {
            headers: {
                'Access-Control-Allow-Origin': origin || "*",
                'Content-Type': 'application/json',
            }
        })
        
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }, { status: 404 }), {
            headers: {
                'Access-Control-Allow-Origin': origin || "*",
                'Content-Type': 'application/json',
            }
        })
        
    }

    

   


}