/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import Sidebar from '../../Common/Sidebar'
import Navbar from '../../Common/Navbar'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import { IoBusinessSharp } from 'react-icons/io5'
import { CiUser } from "react-icons/ci";
import { BsCalendar2Event } from 'react-icons/bs'
import { PiLinkSimpleBold, PiNoteBold } from 'react-icons/pi'

export default function ExportFile({
    isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark, }) {
    const [Type, setType] = useState("Leads");
    const [fileType, setfileType] = useState('Excel');

    const handleIconClick = (placeholder) => { setType(placeholder); };
    const handleFileType = (name) => { setfileType(name) }


    return (
        <div>
            <Sidebar
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                setSidebarOpen={setSidebarOpen}
                sidebarOpen={sidebarOpen}
            />
            <Navbar
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                isDark={isDark}
                setIsDark={setIsDark}
            />

            <div className="flex flex-1">
                <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
                    <div className="xl:w-full">
                        <div className="flex flex-wrap">
                            <div className="flex items-center py-4 w-full">
                                <div className="w-full">
                                    <div className="">
                                        <div className="flex flex-wrap justify-between">
                                            <div className="items-center ">
                                                <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                                                    Export data
                                                </h1>
                                                <ol className="list-reset flex text-sm">
                                                    <li>
                                                        <a href="#" className="text-gray-500">Disploy</a>
                                                    </li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-gray-500">CRM</li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-gray-500">Tools and apps</li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-blue-600 hover:text-blue-700">
                                                        Export data
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*end container*/}
                    <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 dark:text-slate-100">
                        <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full p-4 relative dark:text-gray-400 dark:border-gray-600">
                            <h2 className="font-semibold text-xl block mb-3">
                                Select export data type
                            </h2>
                            <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4 border-b border-gray-200 p-5 dark:text-gray-400 dark:border-gray-600">
                                <div
                                    className="inline-flex rounded-md shadow-sm mt-2"
                                    role="group"
                                >
                                    <button
                                        type="button"
                                        className={`px-2 flex gap-2 items-center py-2 text-sm font-semibold text-gray-900 border border-gray-200 rounded-s-lg ${Type === "Leads"
                                            ? "bg-blue-100 text-blue-700"
                                            : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                            }`}
                                        onClick={() => handleIconClick("Leads")}
                                    >
                                        <FaLocationCrosshairs size={16} /> Leadss
                                    </button>
                                    <button
                                        type="button"
                                        className={`px-2 flex gap-2 items-center py-2 text-sm font-semibold text-gray-900 border border-gray-200 rounded-s-lg ${Type === "Deals"
                                            ? "bg-blue-100 text-blue-700"
                                            : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                            }`}
                                        onClick={() => handleIconClick("Deals")}
                                    >
                                        {/*<TbCoin size={17} />*/}
                                        Deals
                                    </button>
                                    <button
                                        type="button"
                                        className={`px-2 flex gap-2 items-center py-2 text-sm font-semibold text-gray-900 border border-gray-200 rounded-s-lg ${Type === "Organization"
                                            ? "bg-blue-100 text-blue-700"
                                            : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                            }`}
                                        onClick={() => handleIconClick("Organization")}
                                    >
                                        <IoBusinessSharp size={16} />Organizations

                                    </button>
                                    <button
                                        type="button"
                                        className={`px-2 flex gap-2 items-center py-2 text-sm font-semibold text-gray-900 border border-gray-200 rounded-s-lg ${Type === "People"
                                            ? "bg-blue-100 text-blue-700"
                                            : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                            }`}
                                        onClick={() => handleIconClick("People")}
                                    >
                                        <CiUser size={17} className='font-semibold' />People

                                    </button>
                                    <button
                                        type="button"
                                        className={`px-2 flex gap-2 items-center py-2 text-sm font-semibold text-gray-900 border border-gray-200 rounded-s-lg ${Type === "Products"
                                            ? "bg-blue-100 text-blue-700"
                                            : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                            }`}
                                        onClick={() => handleIconClick("Products")}
                                    >
                                        {/*<TbBoxSeam size={17} />*/}
                                        Products
                                    </button>
                                    <button
                                        type="button"
                                        className={`px-2 flex gap-2 items-center py-2 text-sm font-semibold text-gray-900 border border-gray-200 rounded-s-lg ${Type === "Activity"
                                            ? "bg-blue-100 text-blue-700"
                                            : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                            }`}
                                        onClick={() => handleIconClick("Activity")}
                                    >
                                        <BsCalendar2Event size={15} />Activity

                                    </button>
                                    <button
                                        type="button"
                                        className={`px-2 flex gap-2 items-center py-2 text-sm font-semibold text-gray-900 border border-gray-200 rounded-s-lg ${Type === "Notes"
                                            ? "bg-blue-100 text-blue-700"
                                            : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                            }`}
                                        onClick={() => handleIconClick("Notes")}
                                    >
                                        <PiNoteBold size={16} />Notes
                                    </button>
                                    <button
                                        type="button"
                                        className={`px-2 flex gap-2 items-center py-2 text-sm font-semibold text-gray-900 border border-gray-200 rounded-s-lg ${Type === "Files"
                                            ? "bg-blue-100 text-blue-700"
                                            : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                            }`}
                                        onClick={() => handleIconClick("Files")}
                                    >
                                        <PiLinkSimpleBold size={16} />Files
                                    </button>
                                </div>
                            </div>
                            <div className="w-full relative mb-4 border-b border-gray-200 flex items-start dark:text-gray-400 dark:border-gray-600">
                                <div className="w-full flex gap-3 mb-4 items-center">
                                    <h2 className="medium text-sm ">Export format</h2>
                                    <div className='flex gap-2 mx-4'>
                                        <button
                                            type="button"
                                            className={`px-3 items-center py-1 text-xs  font-semibold  border border-gray-200 rounded ${fileType === 'Excel' ? 'bg-blue-100 text-blue-700' : 'text-gray-900'} `}
                                            onClick={() => handleFileType("Excel")}
                                        >
                                            Excel
                                        </button>
                                        <button
                                            type="button"
                                            className={`px-3 items-center text-xs font-semibold  border border-gray-200 rounded ${fileType === 'CSV' ? 'bg-blue-100 text-blue-700' : 'text-gray-900'}`}
                                            onClick={() => handleFileType("CSV")}
                                        >
                                            CSV
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        className={`bg-green-600 text-white flex items-center rounded-md px-5 p-2 font-semibold }`}
                                    // onClick={() => handleIconClick("Files")}
                                    >
                                        Export
                                    </button>
                                </div>

                            </div>

                            <div className="w-full relative mb-4 border-b border-gray-200 flex items-start dark:text-gray-400 dark:border-gray-600">
                                <div className="w-full relative">
                                    <h2 className="font-semibold text-xl block mb-3">Generated exports</h2>
                                    <p className="text-base block mb-3">
                                        Exported files are available to download for 28 days. Only 100 of the most recent files are shown.
                                    </p>
                                    <div className="relative overflow-x-auto block w-full">
                                        <div className=" ">
                                            <table className="w-full border border-slate-200 table dark:text-gray-400 dark:border-gray-600">
                                                <thead className="bg-gray-50 dark:bg-gray-600/20">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 border-2 border-slate-300 dark:text-gray-400 dark:border-gray-600"
                                                        >
                                                            Date and time
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 border-2 border-slate-300 dark:text-gray-400 dark:border-gray-600"
                                                        >
                                                            File name
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 border-2 border-slate-300 dark:text-gray-400 dark:border-gray-600"
                                                        >
                                                            User
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 border-2 border-slate-300 dark:text-gray-400 dark:border-gray-600"
                                                        >
                                                            Type
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 border-2 border-slate-300 dark:text-gray-400 dark:border-gray-600"
                                                        >
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* 1 */}
                                                    <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            10:12AM, 20/03/2022
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            File name
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            User Name
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            png
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            Status
                                                        </td>
                                                    </tr>
                                                    {/* 2 */}
                                                    <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            10:12AM, 20/03/2022
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            File name
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            User Name
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            png
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            Status
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* footer */}
                        <div className="absolute bottom-0 left-0 right-0 block print:hidden">
                            <div className="">
                                {/* Footer Start */}
                                <footer className="footer mt-4 rounded-tr-md rounded-tl-md bg-transparent py-4 text-center font-medium text-slate-600 dark:text-slate-400 md:text-left">
                                    © Disploy
                                    <span className="float-right hidden text-slate-600 dark:text-slate-400 md:inline-block">
                                        Crafted with <i className="ti ti-heart text-red-500" /> by
                                        Mannatthemes
                                    </span>
                                </footer>
                                {/* end Footer */}
                            </div>
                        </div>
                    </div>
                    {/*end container*/}
                </div>
            </div>
        </div>
    )
}
