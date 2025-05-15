import React from 'react'
import logo from "../../Images/logos/loder-logo.png"
const Loading = () => {
    return (
        <div className='flex justify-center items-center h-full w-full max-h-full max-w-full'>
            <div className="relative flex justify-center items-center p-5">
                <div className="absolute animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
                <img src={logo} className="" alt='logo'/>
            </div>
        </div>
    )
}

export default Loading
