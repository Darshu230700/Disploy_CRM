/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
const Starter = ({ isVisible, setIsVisible ,setSidebarOpen,sidebarOpen,isDark,setIsDark}) => {
  return (
    <>
    <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <Navbar isVisible={isVisible} setIsVisible={setIsVisible} isDark={isDark} setIsDark={setIsDark}/>
      <div className="flex flex-1 ">
        <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
        <div className="xl:w-full">        
                    <div className="flex flex-wrap">
                        <div className="flex items-center py-4 w-full">
                            <div className="w-full">                    
                                <div className="">
                                    <div className="flex flex-wrap justify-between">
                                        <div className="items-center ">
                                            <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">Starter</h1>
                                            <ol className="list-reset flex text-sm">
                                                <li><a href="#" className="text-gray-500">Disploy</a></li>
                                                <li><span className="text-gray-500 mx-2">/</span></li>
                                                <li className="text-gray-500">Pages</li>
                                                <li><span className="text-gray-500 mx-2">/</span></li>
                                                <li className="text-blue-600 hover:text-blue-700">Starter</li>
                                            </ol>
                                        </div>
                                        <div className="flex items-center">
                                            <button className="px-3 py-2 lg:px-4 bg-blue-500 collapse:bg-green-100 text-white text-sm font-semibold rounded hover:bg-blue-600">Create New</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 "> 
                        
                    <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                        
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
                            <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                    <h4 className="font-medium">Title</h4>
                                </div>
                                <div className="flex-auto p-4">
                                  
                                </div>
                            </div> 
                        </div>           
                    </div>   
                    
                    <Footer/>
  
  
                </div>
        </div>
      </div>
  </>
  )
}

export default Starter