import React from 'react'
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";

const AboutPrice = ({ isVisible, setIsVisible ,setSidebarOpen,sidebarOpen,isDark,setIsDark }) => {
  return (
    <>
    
    <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <Navbar isVisible={isVisible} setIsVisible={setIsVisible} isDark={isDark} setIsDark={setIsDark}/>
        <div className="flex flex-1 ">
          <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
    assedfs
          </div>
          </div>
   </>
  )
}

export default AboutPrice