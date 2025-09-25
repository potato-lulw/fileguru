import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-3xl font-bold text-destructive'>
            ERROR 404!
        </h1>
        <p className='text-lg font-semibold'>
            Page Not Found
        </p>
        
    </div>
  )
}

export default NotFound