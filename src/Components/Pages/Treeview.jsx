/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
const Treeview = ({ isVisible, setIsVisible ,setSidebarOpen,sidebarOpen,isDark,setIsDark}) => {
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
                                            <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">Treeview</h1>
                                            <ol className="list-reset flex text-sm">
                                                <li><a href="#" className="text-gray-500">Disploy</a></li>
                                                <li><span className="text-gray-500 mx-2">/</span></li>
                                                <li className="text-gray-500">Pages</li>
                                                <li><span className="text-gray-500 mx-2">/</span></li>
                                                <li className="text-blue-600 hover:text-blue-700">Treeview</li>
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
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                            <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                    <h4 className="font-medium">Listree Example</h4>
                                </div>
                                <div className="flex-auto p-4">
                                    <ul className="listree">
                                        <li>
                                            <div className="listree-submenu-heading">Metrics</div>
                                            <ul className="listree-submenu-items">
                                                <li>
                                                    <div className="listree-submenu-heading">Daily Metrics</div>
                                                    <ul className="listree-submenu-items">
                                                    <li>
                                                        <div className="listree-submenu-heading">Daily Order Metrics</div>
                                                        <ul className="listree-submenu-items">
                                                        <li>
                                                            <div className="listree-submenu-heading">Categorywise Daily order metrics</div>
                                                            <ul className="listree-submenu-items">
                                                                <li>
                                                                    <a href="">Categorywise daily order count</a>
                                                                </li>
                                                                <li>
                                                                    <a href="">Categorywise daily bookings</a>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <div className="listree-submenu-heading">Storewise Daily order metrics</div>
                                                            <ul className="listree-submenu-items">
                                                                <li>
                                                                    <a href="">Storewise daily order count</a>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <div className="listree-submenu-heading">Daily Invoice Metrics</div>
                                                        <ul className="listree-submenu-items">
                                                            <li>
                                                                <div className="listree-submenu-heading">Categorywise Daily invoice metrics</div>
                                                                <ul className="listree-submenu-items">
                                                                    <li>
                                                                        <a href="">Categorywise daily invoice count</a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li>
                                                                <div className="listree-submenu-heading">Storewise Daily invoice metrics</div>
                                                                <ul className="listree-submenu-items">
                                                                    <li>
                                                                        <a href="">Storewise daily invoice count</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="">Storewise daily revenue</a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <div className="listree-submenu-heading">Monthly Metrics</div>
                                                    <ul className="listree-submenu-items">
                                                        <li>
                                                            <div className="listree-submenu-heading">Monthly Order Metrics</div>
                                                            <ul className="listree-submenu-items">
                                                                <li>
                                                                    <div className="listree-submenu-heading">Categorywise Monthly order metrics</div>
                                                                    <ul className="listree-submenu-items">
                                                                        <li>
                                                                            <a href="">Categorywise monthly order count</a>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                                <li>
                                                                    <div className="listree-submenu-heading">Storewise Monthly order metrics</div>
                                                                    <ul className="listree-submenu-items">
                                                                        <li>
                                                                            <a href="">Storewise monthly order count</a>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <div className="listree-submenu-heading">Settings</div>
                                            <ul className="listree-submenu-items">
                                                <li>
                                                    <div className="listree-submenu-heading">Personal Settings</div>
                                                    <ul className="listree-submenu-items">
                                                        <li><a href="">Password Settings</a></li>
                                                        <li><a href="">Viewing Preferences</a></li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <div className="listree-submenu-heading">Org Settings</div>
                                                    <ul className="listree-submenu-items">
                                                        <li><a href="">Teams</a></li>
                                                        <li><a href="">Billing</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div> 
                        </div>   
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                            <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                    <h4 className="font-medium">Listree Custom Folder Icon</h4>
                                </div>
                                <div className="flex-auto p-4">
                                    <ul className="listree folder-icon">
                                        <li>
                                            <div className="listree-submenu-heading">Metrics</div>
                                            <ul className="listree-submenu-items">
                                                <li>
                                                    <div className="listree-submenu-heading">Daily Metrics</div>
                                                    <ul className="listree-submenu-items">
                                                        <li>
                                                            <div className="listree-submenu-heading">Daily Order Metrics</div>
                                                            <ul className="listree-submenu-items">
                                                                <li>
                                                                    <div className="listree-submenu-heading">Categorywise Daily order metrics</div>
                                                                    <ul className="listree-submenu-items">
                                                                    <li>
                                                                        <a href="">Categorywise daily order count</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="">Categorywise daily bookings</a>
                                                                    </li>
                                                                    </ul>
                                                                </li>
                                                            <li>
                                                                <div className="listree-submenu-heading">Storewise Daily order metrics</div>
                                                                <ul className="listree-submenu-items">
                                                                <li>
                                                                    <a href="">Storewise daily order count</a>
                                                                </li>
                                                                <li>
                                                                    <a href="">Storewise daily bookings</a>
                                                                </li>
                                                                </ul>
                                                            </li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <div className="listree-submenu-heading">Daily Invoice Metrics</div>
                                                            <ul className="listree-submenu-items">
                                                            <li>
                                                                <div className="listree-submenu-heading">Categorywise Daily invoice metrics</div>
                                                                <ul className="listree-submenu-items">
                                                                <li>
                                                                    <a href="">Categorywise daily invoice count</a>
                                                                </li>
                                                                <li>
                                                                    <a href="">Categorywise daily revenue</a>
                                                                </li>
                                                                </ul>
                                                            </li>
                                                            <li>
                                                                <div className="listree-submenu-heading">Storewise Daily invoice metrics</div>
                                                                <ul className="listree-submenu-items">
                                                                <li>
                                                                    <a href="">Storewise daily invoice count</a>
                                                                </li>
                                                                <li>
                                                                    <a href="">Storewise daily revenue</a>
                                                                </li>
                                                                </ul>
                                                            </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <div className="listree-submenu-heading">Monthly Metrics</div>
                                                    <ul className="listree-submenu-items">
                                                        <li>
                                                            <div className="listree-submenu-heading">Monthly Order Metrics</div>
                                                            <ul className="listree-submenu-items">
                                                            <li>
                                                                <div className="listree-submenu-heading">Categorywise Monthly order metrics</div>
                                                                <ul className="listree-submenu-items">
                                                                <li>
                                                                    <a href="">Categorywise monthly order count</a>
                                                                </li>
                                                                <li>
                                                                    <a href="">Categorywise monthly bookings</a>
                                                                </li>
                                                                </ul>
                                                            </li>
                                                            <li>
                                                                <div className="listree-submenu-heading">Storewise Monthly order metrics</div>
                                                                <ul className="listree-submenu-items">
                                                                <li>
                                                                    <a href="">Storewise monthly order count</a>
                                                                </li>
                                                                <li>
                                                                    <a href="">Storewise monthly bookings</a>
                                                                </li>
                                                                </ul>
                                                            </li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <div className="listree-submenu-heading">Monthly Invoice Metrics</div>
                                                            <ul className="listree-submenu-items">
                                                                <li>
                                                                    <div className="listree-submenu-heading">Categorywise Monthly invoice metrics</div>
                                                                    <ul className="listree-submenu-items">
                                                                    <li>
                                                                        <a href="">Categorywise monthly invoice count</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="">Categorywise monthly revenue</a>
                                                                    </li>
                                                                    </ul>
                                                                </li>
                                                                <li>
                                                                    <div className="listree-submenu-heading">Storewise Monthly invoice metrics</div>
                                                                    <ul className="listree-submenu-items">
                                                                    <li>
                                                                        <a href="">Storewise monthly invoice count</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="">Storewise monthly revenue</a>
                                                                    </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <div className="listree-submenu-heading">Settings</div>
                                            <ul className="listree-submenu-items">
                                                <li>
                                                    <div className="listree-submenu-heading">Personal Settings</div>
                                                    <ul className="listree-submenu-items">
                                                    <li><a href="">Password Settings</a></li>
                                                    <li><a href="">Viewing Preferences</a></li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <div className="listree-submenu-heading">Org Settings</div>
                                                    <ul className="listree-submenu-items">
                                                    <li><a href="">Teams</a></li>
                                                    <li><a href="">Billing</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
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

export default Treeview