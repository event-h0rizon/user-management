import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex justify-between px-2 bg-gray-800 text-white h-[40px] items-center'>
      <div><Link href='/'>User Management WebApp</Link><span className='text-sm px-4'>by Karthik</span></div>
      <div className='flex gap-x-3'>
        <Link href='/create'>Create</Link>
        <Link href='/view'>Manage</Link>
      </div>
    </div>
  )
}

export default Navbar
