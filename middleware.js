import { NextRequest, NextResponse } from "next/server";

const allowedOrigins= process.env.NODE_ENV === 'production' ? ['https://www.user-management-eosin.vercel.app','https://user-management-eosin.vercel.app','http://localhost:3000'] : ['http://localhost:3000']

export const middleware= (req)=>{
   
    const origin= req.headers.get('origin')

    if (origin && !allowedOrigins.includes(origin)) {
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }
    return NextResponse.next()
}

export const config= {
    matcher: '/api/:path*'
}
