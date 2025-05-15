/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import Loading from "../Common/Loading";
import { FaPlus } from "react-icons/fa6";
import AddEditUsers from "./AddEditUsers";
import { deleteUsers, } from "../../Redux/AuthSlice";
import { getUrl, ImageUrl } from "../Common/API";
import sweetAlert from "../Common/sweetAlert";
import { debounce } from "lodash";

const User = ({
    isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark,
}) => {
    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.root.auth);
    const authToken = `Bearer ${token}`;


    const [UserData, setUserData] = useState({
        getAllUser: [],
        EditUser: [], SearchData: []
    });
    const [UserModal, setUserModal] = useState(false);
    const [loading, setloading] = useState(false);
    const [loadFirst, setloadFirst] = useState(true);
    const fetchUserData = async () => {
        setloading(true)
        const response = await getUrl(`UserMaster/GetUsers?UserID=${user?.userID}`, { headers: { Authorization: authToken }, });
        if (response) {
            setUserData({ ...UserData, getAllUser: response?.data?.data, SearchData: response?.data?.data, })
            const timer = setTimeout(() => {
                setloading(false)
            }, 1000);
            return () => clearTimeout(timer);
        }
    }

    useEffect(() => {
        if (loadFirst) {
            fetchUserData()
            setloadFirst(false)
        }
    }, [loadFirst]);

    const toggleModal = () => {
        setUserModal(!UserModal)
        setUserData({ ...UserData, EditUser: [] })
    }

    const handleUserDelete = async (id) => {
        try {
            const result = await sweetAlert.confirm("Are you sure?", "Are you sure you want to delete this!");
            if (result.isConfirmed) {
                dispatch(deleteUsers(id)).then((res) => {
                    if (res.payload.status === true) {
                        fetchUserData()
                        // setCurrentPage(1) 
                    }
                });
                sweetAlert.success("Deleted successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    }

    const handleEditUser = async (id) => {
        const response = await getUrl(`UserMaster/GetLoginUser?UserID=${id}`, { headers: { Authorization: authToken }, });
        setUserData({ ...UserData, EditUser: response?.data?.data })
    }

    const handleChange = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        if (searchQuery === "") {
            setUserData({ ...UserData, SearchData: UserData?.getAllUser })
        } else {
            const filterData = UserData?.getAllUser?.filter((item) => item?.userName?.toLowerCase().includes(searchQuery))
            setUserData({ ...UserData, SearchData: filterData })
            // setCurrentPage(1)
        }
    }
    const debouncedOnChange = debounce(handleChange, 500);

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
                                                        User
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
                                                User
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
                                                                onChange={(e) => debouncedOnChange(e)}
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

                                                    <th
                                                        scope="col"
                                                        className="mw-200 p-4 border-1 border-slate-300"
                                                    >
                                                        User Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="mw-200 p-4 border-1 border-slate-300"
                                                    >
                                                        Roles
                                                    </th>
                                                    <th scope="col" className="mw-200 p-4 border-1 border-slate-300">
                                                        Status
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="mw-200 p-4 border-1 border-slate-300"
                                                    >
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {UserData?.SearchData && UserData?.SearchData.length > 0 ? (
                                                    UserData?.SearchData.map((item, index) => (
                                                        <tr className="bg-white dark:bg-gray-800 text-center" key={index}>

                                                            <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                                                <div className="flex items-center gap-2">
                                                                    {item?.profilePic ? (
                                                                        <img className=" w-10 h-10  rounded-full mr-3 " src={`${ImageUrl}${item?.profilePic}`} alt="" />
                                                                    ) : (
                                                                        <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-blue-200 rounded-full dark:bg-blue-300 mr-3 ">
                                                                            <span class="font-semibold font-serif text-2xl text-blue-600 dark:text-blue-300">{!!item?.userName && item?.userName.charAt(0).toUpperCase()}</span>
                                                                        </div>
                                                                    )}
                                                                    {item?.userName}
                                                                    {/* {item?.userID} */}
                                                                </div>
                                                            </td>
                                                            <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                                                {item?.userRoleName}
                                                            </td>
                                                            <td className={`mw-200 px-4 py-2 text-sm  whitespace-nowrap  border border-slate-200 `}>
                                                                <span class={` text-xs  me-2 px-2.5 py-1.5 rounded  font-bold ${item?.status ? 'bg-green-100 text-green-700' : 'bg-rose-200  text-red-600'}`}>{item?.status ? 'ACTIVE' : 'INACTIVE'}</span>
                                                            </td>
                                                            <td className="mw-200 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                                                <div className="flex gap-4 justify-center">
                                                                    <div
                                                                        data-tip
                                                                        data-for="Edit"
                                                                        className="relative group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                        onClick={() => {
                                                                            setUserModal(true);
                                                                            handleEditUser(item?.userID);
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
                                                                    <div
                                                                        data-tip
                                                                        data-for="Edit"
                                                                        className="relative group  cursor-pointer text-white bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                        onClick={() => { handleUserDelete(item?.userID) }}
                                                                    >
                                                                        <MdDeleteForever />
                                                                        <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex left-0 right-0">
                                                                            <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                                                Delete
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
            {UserModal && <AddEditUsers setUserModal={setUserModal} fetchUserData={fetchUserData} UserData={UserData?.EditUser} toggleModal={toggleModal} />}
        </>
    );
};

export default User;
