/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Sidebar from '../Common/Sidebar'
import Navbar from '../Common/Navbar'
import Footer from '../Common/Footer'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useNavigate, useParams } from "react-router-dom";
import { getByIdApiActivity } from '../../Redux/CommonSlice'
import { useDispatch } from "react-redux";
import Activity from '../Common/activity'

export default function ActivityDetails({ isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark, }) {

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [editActivityData, setEditActivityData] = useState([]);

    useEffect(() => {
        EditActivity(id)
    }, [id]);

    const EditActivity = async (id) => {
        const result = await dispatch(getByIdApiActivity(id))
        setEditActivityData(result.payload.data)
    }
    const handleCancel = () => {
        setEditActivityData([])
    }
    return (
        <>
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

            <div className="flex flex-1 ">
                <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
                    <div className="xl:w-full">
                        <div className="flex flex-wrap">
                            <div className="flex items-center py-4 w-full">
                                <div className="w-full">
                                    <div className="">
                                        <div className="flex flex-wrap justify-between">
                                            <div className="items-center ">
                                                <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                                                    Activity
                                                </h1>
                                                <ol className="list-reset flex text-sm">
                                                    <li>
                                                        <a href="#" className="text-gray-500">
                                                            Activity
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-blue-600 hover:text-blue-700">
                                                        ActivityDetails
                                                    </li>
                                                </ol>
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
                                    <div className="flex gap-5 border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                        <button
                                            type="submit"
                                            className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200  dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                            onClick={() => navigate('/activity')}
                                        >
                                            <MdOutlineKeyboardBackspace size={20} />
                                        </button>

                                    </div>

                                    <div className='p-5'>
                                        <Activity editActivityData={editActivityData} identityID={id} identityName="Activity" handleCancel={handleCancel} />
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
