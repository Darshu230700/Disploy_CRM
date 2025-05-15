/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

import { useState } from "react";
import { useDispatch,  } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import Loading from "../../Common/Loading";
import Sidebar from "../../Common/Sidebar";
import Navbar from "../../Common/Navbar";
import Footer from "../../Common/Footer";
import { handleUserRole } from "../../../Redux/UserSlice";
import toast from "react-hot-toast";
import AddEditUserRole from "./AddEditUserRole";

const UserRole = ({
    isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark,
}) => {
    const dispatch = useDispatch();

    const [loadFirst, setloadFirst] = useState(true);
    const [loading, setloading] = useState(false);
    const [UserData, setUsersetData] = useState({
        AllUserRole: [],
        EditUserRole: null
    });
    const [UserModal, setUserModal] = useState(false);


    const fetchUserData = async () => {
        setloading(true)
        const payload = { mode: "SelectList" }
        dispatch(handleUserRole(payload)).then((res) => {
            if (res) {
                toast.remove()
                setUsersetData({ ...UserData, AllUserRole: res?.payload?.data })
                const timer = setTimeout(() => {
                    setloading(false)
                }, 1000);
                return () => clearTimeout(timer);
            }
        })
    }

    useEffect(() => {
        if (loadFirst) {
            fetchUserData()
            setloadFirst(false)
        }
    }, [loadFirst]);

    const toggleModal = () => {
        setUserModal(!UserModal)
        setUsersetData({ ...UserData, EditUserRole: [] })
    }

    const handleEditUser = async (id) => {
        const payload = { mode: "SelectListByID", UsersRoleID: id }
        dispatch(handleUserRole(payload)).then((res) => {
            toast.remove()
            setUsersetData({ ...UserData, EditUserRole: res?.payload?.data })
        })
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
                                                    Customer
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
                                                    <li className="text-gray-500">CRM</li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-blue-600 hover:text-blue-700">
                                                        User Role
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
                        <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative">
                            <div className="flex-auto pb-4">
                                <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                                    <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                        <div className="flex items-center">
                                            <button
                                                className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 flex items-center"
                                                onClick={() => { toggleModal() }}
                                            >
                                                <FaPlus className="text-2xl mr-2" />
                                                User Role
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                        <div className="bg-white dark:bg-slate-800 rounded-md w-full relative flex items-center justify-end">
                                            <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                                <div className="bg-white dark:bg-slate-800 rounded-md w-full relative flex items-center justify-end">
                                                    <div className="flex items-center ml-3">
                                                        <div className="pin-filters dropdown relative mr-3">
                                                            <input
                                                                type="text"
                                                                name="Serching"
                                                                placeholder="Searching.."
                                                                className="border border-gray-300 shadow p-3 w-full rounded"
                                                            // value={searchTerm}
                                                            // onChange={(e) => setSearchTerm(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {loading && (<div className="h-screen"><Loading /></div>)}
                            {!loading && (
                                <>
                                    <div className="relative scroll-inner shadow-md sm:rounded-lg">
                                        <table className="w-full border border-slate-200 dark:border-gray-400 rounded-t table">
                                            <thead className="rounded-t text-md font-medium border-b dark:bg-gray-800 dark:border-gray-400 text-gray-700 bg-gray-200 dark:text-gray-400">
                                                <tr className="text-center">
                                                    <th scope="col" className="mw-200 p-4 border-1 border-slate-300">User Role Name</th>
                                                    <th scope="col" className="mw-200 p-4 border-1 border-slate-300">User Count</th>
                                                    <th scope="col" className="mw-200 p-4 border-1 border-slate-300">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-center">
                                                {UserData?.AllUserRole && UserData?.AllUserRole.length > 0 ? (
                                                    UserData?.AllUserRole.map((item, index) => (
                                                        <tr className="bg-white dark:bg-gray-800 text-center" key={index}>

                                                            <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                                                {item?.userRole}
                                                                {/* {item?.usersRoleID} */}

                                                            </td>
                                                            <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                                                {item?.userCount}
                                                            </td>
                                                            <td className="mw-200 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                                                <div className="flex gap-4 justify-center">
                                                                    <div
                                                                        data-tip
                                                                        data-for="Edit"
                                                                        className="relative group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                        onClick={() => {
                                                                            setUserModal(true);
                                                                            handleEditUser(item?.usersRoleID);
                                                                        }}
                                                                    >
                                                                        <BiEdit />

                                                                        <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                            <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                                                Edit
                                                                            </span>
                                                                            <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <td colSpan={6}>
                                                        <p className="text-center p-2">Not Found.</p>
                                                    </td>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <Pagination setCurrentPage={setCurrentPage} handlePageChange={handlePageChange} currentPage={currentPage} sidebarOpen={sidebarOpen} totalPages={totalPages} length={filteredProducts?.length} setrowsPerPage={setrowsPerPage} rowsPerPage={rowsPerPage} name='Product' /> */}
                                </>
                            )}

                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
            {UserModal && <AddEditUserRole setUserModal={setUserModal} fetchUserData={fetchUserData} userRoleData={UserData?.EditUserRole} toggleModal={toggleModal} />}
        </>
    );
};

export default UserRole;

