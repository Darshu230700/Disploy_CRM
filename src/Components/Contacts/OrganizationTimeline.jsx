import React, { useEffect, useState } from 'react';
import Sidebar from '../Common/Sidebar';
import Navbar from '../Common/Navbar';

import { useDispatch, useSelector } from "react-redux";
import AddEditOrganizations from './AddEditOrganizations';
import { FaPlus, } from "react-icons/fa6";
import { fetchApiData } from '../../Redux/organizationSlice';
import { IoCall, IoDocumentText, } from 'react-icons/io5';
import Loading from '../Common/Loading';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { formatDate } from '../Common/Common';

const OrganizationTimeline = ({
    isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark,
}) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state.root.organization);
    const [loadFist, setLoadFist] = useState(true);
    const [loading, setloading] = useState(true);
    const [OrganizationModel, setOrganizationModel] = useState(false);
    const [showDetails, setShowDetails] = useState(null);

    useEffect(() => {
        if (loadFist) {
            dispatch(fetchApiData({}))
                .then(() => {
                    setloading(false);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    setloading(false);
                });
            setLoadFist(false);
        }
    }, [dispatch, loadFist, store]);

    const toggleModel = () => {
        setOrganizationModel(!OrganizationModel);
        setLoadFist(true);
    };

    const openDetails = (index) => { setShowDetails(index === showDetails ? null : index); };
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
                                                    Organization Timeline
                                                </h1>
                                                <ol className="list-reset flex text-sm">
                                                    <li>
                                                        <a href="/Analytics" className="text-gray-500">
                                                            Disploy
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-blue-600 hover:text-blue-700">
                                                        Contacts Timeline
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 mt-10">
                        <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative">
                            <div className="flex-auto pb-4">
                                <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                                    <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                                                    onClick={() => { setOrganizationModel(true); }}
                                                >
                                                    <FaPlus className="text-2xl mr-2" />
                                                    Organization
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {loading && (
                                <div className="flex justify-center items-center h-60">
                                    <Loading />
                                </div>
                            )}
                            {!loading && (
                                <div className="relative scroll-inner shadow-md sm:rounded-lg block w-full">
                                    <table className="w-full border border-slate-200 table">
                                        <thead className="text-left text-md font-medium border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                            <tr className=' text-center'>
                                                <th scope="col" className="mw-200 px-4 py-3"><div className="flex justify-start items-center w-full">Name</div></th>
                                                {Array.from({ length: 12 }).map((_, index) => (
                                                    <th key={index} scope="col" className="mw-200 px-4 py-3">
                                                        <div className="flex flex-col justify-start items-center w-full">
                                                            <div className="flex justify-center items-center w-full">
                                                                {new Date(0, index).toLocaleString("default", { month: "long" })}
                                                            </div>
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {store?.organizationData?.data.length > 0 ? (
                                                store?.organizationData?.data.map((item, index) => (
                                                    <tr key={index} className=" hover:bg-gray-100 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <td className="capitalize w-4 p-3 gap-2 text-sm font-medium whitespace-nowrap dark:text-white cursor-pointer ">
                                                            <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-blue-200 rounded-full dark:bg-blue-300 mr-3 ">
                                                                <span class="font-semibold text-blue-600 dark:text-blue-300">{!!item?.organizationName && item?.organizationName.charAt(0).toUpperCase()}</span>
                                                            </div>
                                                            {item?.organizationName}
                                                        </td>
                                                        {Array.from({ length: 12 }).map((_, monthIndex) => {
                                                            const activitiesForMonth = item.activityMasters.filter(
                                                                (activity) => new Date(activity?.endDate).getMonth() === monthIndex
                                                            );

                                                            const notesForMonth = item?.organizationNoteMasters.filter(
                                                                (note) => new Date(note?.createdDate).getMonth() === monthIndex
                                                            );
                                                            return (
                                                                <td key={monthIndex} className="py-3 text-sm font-medium whitespace-nowrap dark:text-white cursor-pointer border border-slate-200">
                                                                    <div className='flex flex-col justify-between'>
                                                                        {(notesForMonth.length > 0 || activitiesForMonth.length > 0) && (
                                                                            <div className='relative'>
                                                                                <div
                                                                                    data-tip
                                                                                    data-for="Duplicate"
                                                                                    className="relative flex group cursor-pointer text-white bg-neutral-400 hover:bg-neutral-500 focus:outline-none font-medium rounded-full text-lg p-1.5 text-center inline-flex items-center"
                                                                                    onClick={() => openDetails(index)}
                                                                                >
                                                                                    {item?.organizationNoteMasters.length > 0 ? <IoDocumentText /> : <IoCall />}
                                                                                    <div className="absolute left-0 right-0 bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md flex gap-2">
                                                                                            {item?.organizationNoteMasters.length > 0 && (
                                                                                                <><IoDocumentText />{item?.organizationNoteMasters?.length}</>
                                                                                            )}
                                                                                            {item?.activityMasters.length > 0 && (
                                                                                                <><IoCall />{item?.activityMasters?.length}</>
                                                                                            )}
                                                                                        </span>
                                                                                        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                    </div>
                                                                                </div>

                                                                                {showDetails === index && (
                                                                                    <div
                                                                                        id="default-modal"
                                                                                        tabIndex="-1"
                                                                                        aria-hidden="true"
                                                                                        className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
                                                                                    >
                                                                                        <div className="relative p-4 w-full max-w-sm max-h-full  ">
                                                                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                                                                <div className="flex items-end justify-end md:p-2 border-b rounded-t dark:border-gray-600">
                                                                                                    <AiOutlineCloseCircle
                                                                                                        className="text-3xl text-primary cursor-pointer"
                                                                                                        onClick={() => openDetails(false)}
                                                                                                    />
                                                                                                </div>

                                                                                                <div className="p-4 md:p-5 space-y-4 h-56 vertical-scroll-inner">
                                                                                                    {item?.organizationNoteMasters.length > 0 && (
                                                                                                        <>
                                                                                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white bg-slate-200 ps-3">
                                                                                                                Notes
                                                                                                            </h3>
                                                                                                            {item?.organizationNoteMasters.map((itemNot, index) => (
                                                                                                                <div key={index} className="border-b border-slate-200 dark:border-slate-700 px-4 dark:text-slate-300/70">
                                                                                                                    <h4 className="font-semibold capitalize">
                                                                                                                        <div dangerouslySetInnerHTML={{ __html: itemNot?.notes }} />
                                                                                                                        <small>{formatDate(itemNot?.createdDate)}</small>
                                                                                                                    </h4>
                                                                                                                </div>
                                                                                                            ))}
                                                                                                        </>
                                                                                                    )}

                                                                                                    {item?.activityMasters.length > 0 && (
                                                                                                        <>
                                                                                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-0 bg-slate-200 ps-3">
                                                                                                                Activity
                                                                                                            </h3>
                                                                                                            {item?.activityMasters.map((itemActivity, index) => (
                                                                                                                <div key={index} className="border-b border-slate-200 dark:border-slate-700 px-2 dark:text-slate-300/70">
                                                                                                                    <h4 className="font-semibold capitalize" >
                                                                                                                        <h2 className="text-sm mb-0">{itemActivity?.activityName}</h2>
                                                                                                                        <small>{formatDate(itemActivity?.endDate)}</small>
                                                                                                                    </h4>
                                                                                                                </div>
                                                                                                            ))}
                                                                                                        </>
                                                                                                    )}
                                                                                                    {item?.dealMasters.length > 0 && (
                                                                                                        <>
                                                                                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-0 bg-slate-200 ps-3">
                                                                                                                Deals
                                                                                                            </h3>
                                                                                                            {item?.dealMasters.map((itemDeal, index) => (
                                                                                                                <div key={index} className="border-b border-slate-200 dark:border-slate-700 px-2 dark:text-slate-300/70 flex justify-between items-center">
                                                                                                                    <h4 className="font-semibold capitalize">
                                                                                                                        <h2 className="text-sm mb-0">{itemDeal?.title}</h2>
                                                                                                                        <small>{formatDate(itemDeal?.createdDate)}</small>
                                                                                                                    </h4>
                                                                                                                    <div>
                                                                                                                        <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">₹ {itemDeal?.value}</span>
                                                                                                                    </div>

                                                                                                                </div>
                                                                                                            ))}
                                                                                                        </>
                                                                                                    )}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}

                                                                        <div className="flex w-full h-1.5 border overflow-hidden">
                                                                            <div
                                                                                className="flex flex-col justify-center overflow-hidden text-xs text-white text-center whitespace-nowrap transition-all duration-500"
                                                                                style={{
                                                                                    // width: `${10}%`,
                                                                                    backgroundColor: '#d4d4d8',
                                                                                    height: '100%'
                                                                                }}
                                                                            >
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                            );
                                                        })}
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="14" className="text-center py-4">Data not found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {OrganizationModel && (
                <AddEditOrganizations
                    toggleModalOrganization={toggleModel} setLoadFist={setLoadFist}

                />
            )}
        </>
    );
};

export default OrganizationTimeline;
