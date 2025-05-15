/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaChevronDown, FaRegCalendar, FaRegClock } from 'react-icons/fa6';
import { TbAtom2, TbBrandCodesandbox } from 'react-icons/tb';
import IMG from "../../Images/users/avatar-1.jpg"
const Timeline = ({ isVisible, setIsVisible, setSidebarOpen, sidebarOpen, isDark, setIsDark }) => {
    return (
        <>
            <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
            <Navbar isVisible={isVisible} setIsVisible={setIsVisible} isDark={isDark} setIsDark={setIsDark} />
            <div className="flex flex-1 ">
                <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
                    <div className="xl:w-full">
                        <div className="flex flex-wrap">
                            <div className="flex items-center py-4 w-full">
                                <div className="w-full">
                                    <div className="">
                                        <div className="flex flex-wrap justify-between">
                                            <div className="items-center ">
                                                <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">Timeline</h1>
                                                <ol className="list-reset flex text-sm">
                                                    <li><a href="#" className="text-gray-500">Disploy</a></li>
                                                    <li><span className="text-gray-500 mx-2">/</span></li>
                                                    <li className="text-gray-500">Pages</li>
                                                    <li><span className="text-gray-500 mx-2">/</span></li>
                                                    <li className="text-blue-600 hover:text-blue-700">Timeline</li>
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
                                        <div className="flex-none md:flex">
                                            <h4 className="font-medium flex-1 self-center mb-2 md:mb-0">Horizontal Timeline</h4>
                                            <div className="dropdown inline-block">
                                                <button data-dropdown-toggle="dropdown" className="dropdown-toggle px-3 py-1 text-xs font-medium text-gray-500 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-50 hover:text-slate-800 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                                    This Month
                                                    {/* <i className="fas fa-chevron-down text-xs ml-2"></i> */}
                                                    <FaChevronDown className='text-xs ml-2' />
                                                </button>

                                                <div className="dropdown-menu right-auto md:right-0 hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white">Last Week</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white">Last Month</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white">This Year</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-auto p-4">

                                        <ol className="items-center sm:flex">
                                            <li className="relative mb-6 sm:mb-0">
                                                <div className="flex items-center">
                                                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-primary-100 rounded-full ring-0 ring-white dark:bg-primary-900 sm:ring-8 dark:ring-slate-800 shrink-0">
                                                        {/* <i className="ti ti-brand-codesandbox dark:text-slate-400 text-primary-500"></i> */}
                                                        <TbBrandCodesandbox className='dark:text-slate-400 text-primary-500' />
                                                    </div>
                                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                                </div>
                                                <div className="mt-3 sm:pr-8">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Metrica Bootstrap Admin </h3>
                                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 2, 2021</time>
                                                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
                                                </div>
                                            </li>
                                            <li className="relative mb-6 sm:mb-0">
                                                <div className="flex items-center">
                                                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-primary-100 rounded-full ring-0 ring-white dark:bg-primary-900 sm:ring-8 dark:ring-slate-800 shrink-0">
                                                        {/* <i className="ti ti-clock dark:text-slate-400 text-primary-500"></i> */}
                                                        <FaRegClock className='dark:text-slate-400 text-primary-500' />
                                                    </div>
                                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                                </div>
                                                <div className="mt-3 sm:pr-8">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Disploy Admin Dashboard</h3>
                                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 23, 2021</time>
                                                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
                                                </div>
                                            </li>
                                            <li className="relative mb-6 sm:mb-0">
                                                <div className="flex items-center">
                                                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-primary-100 rounded-full ring-0 ring-white dark:bg-primary-900 sm:ring-8 dark:ring-slate-800 shrink-0">
                                                        {/* <i className="ti ti-calendar dark:text-slate-400 text-primary-500"></i> */}
                                                        <FaRegCalendar className='dark:text-slate-400 text-primary-500' />
                                                    </div>
                                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                                </div>
                                                <div className="mt-3 sm:pr-8">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dastone Admin</h3>
                                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on January 5, 2022</time>
                                                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
                                                </div>
                                            </li>
                                        </ol>

                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                        <h4 className="font-medium">Timeline</h4>
                                    </div>
                                    <div className="flex-auto p-4">
                                        <ol className="relative border-l border-dashed border-gray-200 dark:border-gray-700 ml-3">
                                            <li className="mb-10 ml-8">
                                                <span data-tooltip-target="tooltip-light" data-tooltip-style="light" className="flex absolute -left-4 justify-center items-center w-9 h-9 bg-green-100 rounded-full dark:bg-green-900">
                                                    {/* <i className="ti ti-clock text-green-500"></i> */}
                                                    <FaRegClock className='text-green-500' />
                                                    <span id="tooltip-light" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-[12px] font-medium text-gray-900 bg-white rounded-lg border border-slate-200 shadow-sm opacity-0 tooltip">
                                                        Tooltip content
                                                        <span className="tooltip-arrow" data-popper-arrow></span>
                                                    </span>
                                                </span>
                                                <div className="justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm sm:flex dark:bg-slate-800 dark:border-slate-700">
                                                    <span className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">just now</span>
                                                    <div className="text-sm font-normal text-gray-500 dark:text-gray-300 w-full md:w-[80%]">
                                                        <a href="#" className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">Jack </a>
                                                        updated the status of Refund #1234 to awaiting customer response
                                                        <span className="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">USA Group</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-10 ml-8">
                                                <span className="flex absolute -left-4 justify-center items-center w-9 h-9 bg-pink-100 rounded-full dark:bg-pink-900/50">
                                                    {/* <i className="ti ti-brand-codesandbox text-pink-500"></i> */}
                                                    <TbBrandCodesandbox className='text-pink-500' />
                                                </span>
                                                <div className="justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm sm:flex dark:bg-slate-800 dark:border-slate-700">
                                                    <span className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">just now</span>
                                                    <div className="text-sm font-normal text-gray-500 dark:text-gray-300 w-full md:w-[80%]">
                                                        <a href="#" className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">Donald</a>
                                                        updated the status of Refund #1234 to awaiting customer response
                                                        <span className="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">USA Group</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-10 ml-8">
                                                <span className="flex absolute -left-4 justify-center items-center w-9 h-9 bg-blue-200 rounded-full dark:bg-slate-900">
                                                    <img className="rounded-full shadow-lg" src={IMG} alt="Thomas Lean image"  />
                                                </span>
                                                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                                                    <div className="justify-between items-center mb-3 sm:flex">
                                                        <span className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">2 hours ago</span>
                                                        <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">Aword winner this year <a href="#" className="font-semibold text-gray-900 dark:text-white hover:underline">Bette Elam</a></div>
                                                    </div>
                                                    <div className="p-3 text-xs italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-gray-200 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300">
                                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which.</div>
                                                </div>
                                            </li>
                                            <li className="mb-10 ml-8">
                                                <span className="flex absolute -left-4 justify-center items-center w-9 h-9 bg-purple-100 rounded-full dark:bg-purple-900/50">
                                                    {/* <i className="ti ti-atom-2 text-purple-500"></i> */}
                                                    <TbAtom2 className='text-purple-500' />
                                                </span>
                                                <div className="justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm sm:flex dark:bg-slate-800 dark:border-slate-700">
                                                    <span className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">just now</span>
                                                    <div className="text-sm font-normal text-gray-500 dark:text-gray-300 w-full md:w-[80%]">
                                                        <a href="#" className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">William  </a>
                                                        updated the status of Refund #1234 to awaiting customer response
                                                        <span className="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">USA Group</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Footer />


                    </div>
                </div>
            </div>
        </>
    )
}

export default Timeline