/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Sidebar from '../Common/Sidebar';
import Navbar from '../Common/Navbar';
import AddEditPerson from './AddEditPerson';
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaUserGroup } from "react-icons/fa6";
import { IoCall, IoDocumentText, IoMail, IoRestaurant } from 'react-icons/io5';
import Loading from '../Common/Loading';
import { getAllPerson } from '../../Redux/PersonSlice';

const PeopleTimeline = ({
    isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark,
}) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state.root.Person);
    const [loadFist, setLoadFist] = useState(true);
    const [loading, setloading] = useState(true);
    const [PeopleModal, setPeopleModal] = useState(false);

    useEffect(() => {
        if (loadFist) {
            dispatch(getAllPerson({}))
                .then(() => {
                    setloading(false);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    setloading(false);
                });
            setLoadFist(false);
        }
    }, [loadFist, store]);


    const toggleModel = () => {
        setPeopleModal(!PeopleModal);
        setLoadFist(true);
    };

    const getActivityIcon = (activityType) => {
        switch (activityType) {
            case "Call":
                return <IoCall />;
            case "Meeting":
                return <FaUserGroup />;
            case "Email":
                return <IoMail />;
            case "Lunch":
                return <IoRestaurant />;
            default:
                return null;
        }
    };

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
                                                    People Timeline
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
                                                        People Timeline
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
                                                    onClick={() => { setPeopleModal(true); }}
                                                >
                                                    <FaPlus className="text-2xl mr-2" />
                                                    People
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {loading && (
                                <div className="flex justify-center items-center h-screen">
                                    <Loading />
                                </div>
                            )}
                            {
                                !loading && (
                                    <div className="relative scroll-inner shadow-md sm:rounded-lg block w-full">
                                        <table className="w-full border border-slate-200 table">
                                            <thead className="text-left text-md font-medium border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="w-4 px-4 py-3">
                                                        {/* <label className="custom-label">
                                                            <div className="bg-white dark:bg-slate-600/40 border border-slate-300 dark:border-slate-600 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px]">
                                                                <input
                                                                    type="checkbox"
                                                                    className=""
                                                                // onChange={() => handleSelectAll()}
                                                                />
                                                            </div>
                                                        </label> */}
                                                    </th>
                                                    <th scope="col" className="mw-200 px-4 py-3">
                                                        <div className="flex justify-start items-center w-full">Name</div>
                                                    </th>
                                                    {Array.from({ length: 12 }).map((_, index) => (
                                                        <th key={index} scope="col" className="mw-200 px-4 py-3">
                                                            <div className="flex flex-col justify-start items-center w-full text-center">
                                                                <div className="flex justify-center items-center w-full">
                                                                    {new Date(0, index).toLocaleString("default", { month: "long" })}
                                                                </div>
                                                            </div>
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {store?.getAllPerson.length > 0 ? (
                                                    store?.getAllPerson.map((item, index) => (
                                                        <tr key={index} className="hover:bg-gray-100 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td className="w-4 px-4 py-2 border border-slate-200">
                                                                <label className="custom-label">
                                                                    <div className="bg-white dark:bg-slate-600/40 border border-slate-200 dark:border-slate-600 rounded w-4 h-4  inline-block leading-4 text-center">
                                                                        <input type="checkbox" />
                                                                    </div>
                                                                </label>
                                                            </td>
                                                            {/* {item.personMasterID} */}
                                                            <td className="w-4 p-3 text-sm font-medium whitespace-nowrap dark:text-white cursor-pointer">
                                                                <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-blue-200 rounded-full dark:bg-blue-300 mr-3 ">
                                                                    <span class="font-semibold text-blue-600 dark:text-blue-300">{!!item?.name && item?.name.charAt(0).toUpperCase()}</span>
                                                                </div>
                                                                {item.name}
                                                            </td>
                                                            {Array.from({ length: 12 }).map((_, monthIndex) => {
                                                                const activitiesForMonth = item.activityMasters.filter(
                                                                    (activity) => new Date(activity.endDate).getMonth() === monthIndex
                                                                );
                                                                const notesForMonth = item.peopleNoteMasters.filter(
                                                                    (note) => new Date(note.createdDate).getMonth() === monthIndex
                                                                );
                                                                const dealsForMonth = item.dealMasters.filter(
                                                                    (deal) => new Date(deal.expectedCloseDate).getMonth() === monthIndex
                                                                );
                                                                const daysInMonth = new Date(new Date().getFullYear(), monthIndex + 1, 0).getDate();
                                                                const activitiesByDay = Array.from({ length: daysInMonth }, (_, dayIndex) =>
                                                                    activitiesForMonth.filter(activity => new Date(activity.endDate).getDate() === dayIndex + 1)
                                                                );
                                                                return (
                                                                    <td key={monthIndex} className="py-2 text-sm font-medium whitespace-nowrap dark:text-white cursor-pointer border border-slate-200">
                                                                        <div className='flex flex-row justify-center items-center'>
                                                                            {activitiesByDay.map((activitiesOnDay, dayIndex) => (
                                                                                <div key={dayIndex} className="flex flex-row justify-center items-center w-full mb-1">
                                                                                    {activitiesOnDay.map((activity, idx) => (
                                                                                        <div key={idx} className="p-1.5 border rounded-full mx-0.5 flex flex-row items-center">
                                                                                            {getActivityIcon(activity.activityType)}
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            ))}
                                                                            {item?.peopleNoteMasters.length > 0 && notesForMonth.length > 0 && (
                                                                                <div className="relative flex-col group cursor-pointer text-white bg-neutral-400 hover:bg-neutral-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                                    <IoDocumentText />
                                                                                    <div className="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">{item?.peopleNoteMasters?.length}</span>
                                                                                        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className="flex w-full h-1.5 border overflow-hidden">
                                                                            {dealsForMonth.length > 0 && (
                                                                                <div className="flex flex-col justify-center overflow-hidden text-xs text-white text-center whitespace-nowrap transition-all duration-500"
                                                                                    style={{
                                                                                        width: `${dealsForMonth.length * 10}%`,
                                                                                        backgroundColor: '#008000',
                                                                                        height: '100%'
                                                                                    }}
                                                                                ></div>
                                                                            )}
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
            {PeopleModal && (
                <AddEditPerson
                    togglemodel={toggleModel}

                    setLoadFirst={setLoadFist}
                />
            )}
        </>
    );
};

export default PeopleTimeline;

