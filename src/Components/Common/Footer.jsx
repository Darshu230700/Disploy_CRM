import React from 'react'
import { FaRegHeart } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="absolute bottom-0 left-0 right-0 block print:hidden px-4">      
        {/* Footer Start */}
        <footer className="footer rounded-tr-md rounded-tl-md bg-transparent py-4 text-center font-medium text-slate-600 dark:text-slate-400 md:text-left">
          &copy; {currentYear} Disploy
          <span className="float-right text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <div>
              Crafted with
            </div>
            <FaRegHeart className='text-red-500' />
            <div>
              by Disploy.com
            </div>
          </span>
        </footer>
        {/* end Footer */}     
    </div>
  )
}

export default Footer