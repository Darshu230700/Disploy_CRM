/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaArrowRightLong, FaCheck } from 'react-icons/fa6';
import { LiaBarcodeSolid } from "react-icons/lia";
import { LiaChessKnightSolid } from "react-icons/lia";
import { LiaAtomSolid } from "react-icons/lia";
import { LiaChessKingSolid } from "react-icons/lia";
const Tour = ({ isVisible, setIsVisible ,setSidebarOpen,sidebarOpen,isDark,setIsDark }) => {
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
                                            <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">Tour</h1>
                                            <ol className="list-reset flex text-sm">
                                                <li><a href="#" className="text-gray-500">Disploy</a></li>
                                                <li><span className="text-gray-500 mx-2">/</span></li>
                                                <li className="text-gray-500">Pages</li>
                                                <li><span className="text-gray-500 mx-2">/</span></li>
                                                <li className="text-blue-600 hover:text-blue-700">Tour</li>
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
                            <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative" id="tourFaq">
                                <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                    <h4 className="font-medium">Most Commonly Asked Questions</h4>
                                </div>
                                <div className="flex-auto p-4">
                                    <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                            <ul className="list-unstyled">
                                                <li className="mb-8">
                                                    <h6 className="font-medium text-base dark:text-slate-300">1. What is Disploy?</h6>
                                                    <p className="text-sm text-slate-400 ml-3">Anim pariatur cliche reprehenderit, 
                                                        enim eiusmod high life accusamus terry richardson ad squid.
                                                    </p>
                                                </li>
                                                <li className="mb-8">
                                                    <h6 className="font-medium text-base dark:text-slate-300">2. What cryptocurrency can i use to buy Disploy?</h6>
                                                    <p className="text-sm text-slate-400 ml-3">Anim pariatur cliche reprehenderit, 
                                                        enim eiusmod high life accusamus terry richardson ad squid.
                                                    </p>
                                                </li>
                                                <li className="mb-8">
                                                    <h6 className="font-medium text-base dark:text-slate-300">3. Can i trade Disploy?</h6>
                                                    <p className="text-sm text-slate-400 ml-3">Anim pariatur cliche reprehenderit, 
                                                        enim eiusmod high life accusamus terry richardson ad squid.
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                            <ul className="list-unstyled">
                                                <li className="mb-8">
                                                    <h6 className="font-medium text-base dark:text-slate-300">4. What is Disploy?</h6>
                                                    <p className="text-sm text-slate-400 ml-3">Anim pariatur cliche reprehenderit, 
                                                        enim eiusmod high life accusamus terry richardson ad squid.
                                                    </p>
                                                </li>
                                                <li className="mb-8">
                                                    <h6 className="font-medium text-base dark:text-slate-300">5. What cryptocurrency can i use to buy Disploy?</h6>
                                                    <p className="text-sm text-slate-400 ml-3">Anim pariatur cliche reprehenderit, 
                                                        enim eiusmod high life accusamus terry richardson ad squid.
                                                    </p>
                                                </li>
                                                <li className="mb-8">
                                                    <h6 className="font-medium text-base dark:text-slate-300">6. Can i trade Disploy?</h6>
                                                    <p className="text-sm text-slate-400 ml-3">Anim pariatur cliche reprehenderit, 
                                                        enim eiusmod high life accusamus terry richardson ad squid.
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>            
                    </div> 

                     <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 ">
                            <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                <div className="flex-auto  p-14 relative">
                                    {/* <i className="las la-barcode absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400"></i> */}
                                    <LiaBarcodeSolid className="absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400"/>
                                    <span className="bg-slate-600/5 dark:bg-slate-700/50 text-gray-800 dark:text-slate-300 text-[14px] font-normal px-4 py-2 rounded-full h-5"> New  Basic Plan</span>
                                    <div className="text-base font-medium mb-8 sm:mb-8 lg:mb-10 mt-8">
                                        <span className="flex items-center">
                                            <ins className="text-[40px] tracking-tight text-gray-800 font-thin no-underline mx-3 dark:text-slate-200">$199</ins>
                                            <span className="text-gray-400">/month</span>
                                        </span>
                                    </div>
                                    <p className="mb-5 dark:text-slate-400 font-medium text-base">The consensus mechanism that connects Stacks and Bitcoin.</p>
                                    <div className="mb-8 sm:mb-0 xl:mb-12 flex flex-col items-center sm:block">
                                        <ul role="list" className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-1">
                                            <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold dark:text-slate-500">
                                                <FaCheck className="mr-2 text-primary-400 text-xs"/>
                                                30GB Disk Space
                                            </li>
                                            <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                                                 <FaCheck className="mr-2 text-primary-400 text-xs"/>
                                                30 Email Accounts
                                            </li>
                                            <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                                                 <FaCheck className="mr-2 text-primary-400 text-xs"/>
                                                30GB Monthly Bandwidth
                                            </li>
                                        </ul>
                                    </div>        
                                    <div className="xl:block">
                                        <a href="" className="block text-primary-500  font-semibold  focus:outline-none">Get this package <FaArrowRightLong className='self-center' /></a>                            
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 ">
                            <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                <div className="flex-auto  p-14 relative">
                                    {/* <i className="las la-chess-knight absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400"></i> */}
                                    <LiaChessKnightSolid className="absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400"/>
                                    <span className="bg-slate-600/5 dark:bg-slate-700/50 text-gray-800 dark:text-slate-300 text-[14px] font-normal px-4 py-2 rounded-full h-5"> Best Premium Plan</span>
                                    <div className="text-base font-medium mb-8 sm:mb-8 lg:mb-10 mt-8">
                                        <span className="flex items-center">
                                            <ins className="text-[40px] tracking-tight text-gray-800 font-thin no-underline mx-3 dark:text-slate-200">$299</ins>
                                            <span className="text-gray-400">/month</span>
                                        </span>
                                    </div>
                                    <p className="mb-5 dark:text-slate-400 font-medium text-base">The consensus mechanism that connects Stacks and Bitcoin.</p>
                                    <div className="mb-8 sm:mb-0 xl:mb-12 flex flex-col items-center sm:block">
                                        <ul role="list" className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-1">
                                            <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold dark:text-slate-500">
                                                 <FaCheck className="mr-2 text-primary-400 text-xs"/>
                                                30GB Disk Space
                                            </li>
                                            <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                                                 <FaCheck className="mr-2 text-primary-400 text-xs"/>
                                                30 Email Accounts
                                            </li>
                                            <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                                                 <FaCheck className="mr-2 text-primary-400 text-xs"/>
                                                30GB Monthly Bandwidth
                                            </li>
                                        </ul>
                                    </div>        
                                    <div className="xl:block">
                                        <a href="" className="block text-primary-500  font-semibold  focus:outline-none">Get this package <FaArrowRightLong className='self-center' /></a>                            
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 ">
                            <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative" id="Pricing_Card">
                                <div className="flex-auto  p-14 relative">
                                    {/* <i className="las la-atom absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400"></i> */}
                                    <LiaAtomSolid className="absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400"/>
                                    <span className="bg-slate-600/5 dark:bg-slate-700/50 text-gray-800 dark:text-slate-300 text-[14px] font-normal px-4 py-2 rounded-full h-5"> Latest Plus Plan</span>
                                    <div className="text-base font-medium mb-8 sm:mb-8 lg:mb-10 mt-8">
                                        <span className="flex items-center">
                                            <ins className="text-[40px] tracking-tight text-gray-800 font-thin no-underline mx-3 dark:text-slate-200">$499</ins>
                                            <span className="text-gray-400">/month</span>
                                        </span>
                                    </div>
                                    <p className="mb-5 dark:text-slate-400 font-medium text-base">The consensus mechanism that connects Stacks and Bitcoin.</p>
                                    <div className="mb-8 sm:mb-0 xl:mb-12 flex flex-col items-center sm:block">
                                        <ul role="list" className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-1">
                                            <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold dark:text-slate-500">
                                                 <FaCheck className="mr-2 text-primary-400 text-xs"/>
                                                30GB Disk Space
                                            </li>
                                            <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                                                 <FaCheck className="mr-2 text-primary-400 text-xs"/>
                                                30 Email Accounts
                                            </li>
                                            <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                                                 <FaCheck className="mr-2 text-primary-400 text-xs"/>
                                                30GB Monthly Bandwidth
                                            </li>
                                        </ul>
                                    </div>        
                                    <div className="xl:block">
                                        <a href="" className="block text-primary-500  font-semibold  focus:outline-none">Get this package <FaArrowRightLong className='self-center' /></a>                            
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 ">
                            <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                <div className="flex-auto  p-14 relative">
                                    {/* <i className="las la-chess-king absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400"></i> */}
                                    <LiaChessKingSolid className="absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400"/>
                                    <span className="bg-slate-600/5 dark:bg-slate-700/50 text-gray-800 dark:text-slate-300 text-[14px] font-normal px-4 py-2 rounded-full h-5">Exellent Master Plan</span>
                                    <div className="text-base font-medium mb-8 sm:mb-8 lg:mb-10 mt-8">
                                        <span className="flex items-center">
                                            <ins className="text-[40px] tracking-tight text-gray-800 font-thin no-underline mx-3 dark:text-slate-200">$799</ins>
                                            <span className="text-gray-400">/month</span>
                                        </span>
                                    </div>
                                    <p className="mb-5 dark:text-slate-400 font-medium text-base">The consensus mechanism that connects Stacks and Bitcoin.</p>
                                    <div className="mb-8 sm:mb-0 xl:mb-12 flex flex-col items-center sm:block">
                                        <ul role="list" className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-1">
                                            <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold dark:text-slate-500">
                                                 <FaCheck className="mr-2 text-primary-400 text-xs"/>
                                                30GB Disk Space
                                            </li>
                                            <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                                                 <FaCheck className="mr-2 text-primary-400 text-xs"/>
                                                30 Email Accounts
                                            </li>
                                            <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                                                 <FaCheck className="mr-2 text-primary-400 text-xs"/>
                                                30GB Monthly Bandwidth
                                            </li>
                                            <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                                                 <FaCheck className="mr-2 text-primary-400 text-xs"/>
                                                06 Subdomains
                                            </li>
                                        </ul>
                                    </div>        
                                    <div className="xl:block">
                                        <a href="" className="block text-primary-500  font-semibold  focus:outline-none">Get this package <FaArrowRightLong className='self-center' /></a>                            
                                    </div>
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

export default Tour