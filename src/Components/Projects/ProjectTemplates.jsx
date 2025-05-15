/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Sidebar from '../Common/Sidebar'
import Navbar from '../Common/Navbar'
import Footer from '../Common/Footer'
import Loading from '../Common/Loading';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteTemplate, duplicateTemplate, getAlltemplates } from '../../Redux/TemplateSlice';
import { BiEdit } from 'react-icons/bi';
import { MdContentCopy, MdDeleteForever } from 'react-icons/md';
import sweetAlert from '../Common/sweetAlert';
import { TbCaretUpDownFilled } from 'react-icons/tb';
import Pagination from '../Common/Pagination';

export default function ProjectTemplates({
    isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark,
}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const TemplateStore = useSelector((store) => store.root.Templates)

    const [loading, setloading] = useState(true);
    const [loadFrist, setloadFrist] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedField, setSortedField] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setrowsPerPage] = useState(10)

    useEffect(() => {
        if (loadFrist) {
            setloading(true)
            dispatch(getAlltemplates({}))
                .then((res) => {
                    const timer = setTimeout(() => {
                        setloading(false)
                    }, 500);
                    return () => clearTimeout(timer);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    setloading(false);
                });
            setloadFrist(false);
        }
    }, [loadFrist]);

    const handleSort = (field) => {
        if (sortedField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortOrder("asc");
            setSortedField(field);
        }
    };

    const sortData = (data, field, order) => {
        const sortedData = [...data];
        sortedData.sort((a, b) => {
            const aTrimmed = a[field]?.trim();
            const bTrimmed = b[field]?.trim();

            if (order === "asc") {
                return aTrimmed?.localeCompare(bTrimmed);
            }

        });
        return sortedData;
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortData(TemplateStore.getAllTemplates, sortedField, sortOrder).slice(indexOfFirstRow, indexOfLastRow)
    const totalPages = Math.ceil(TemplateStore.getAllTemplates.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const DeleteTemplate = async (id) => {
        try {
            const result = await sweetAlert.confirm("Are you sure?", "You won't be able to revert this!");
            if (result?.isConfirmed) {
                await dispatch(deleteTemplate(id)).then((res) => {
                    if (res.payload.status === true) {
                        setloadFrist(true)
                        setCurrentPage(1) 
                    }
                });
                sweetAlert.success("Deleted successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    }

    const DuplicateTemplates = async (id) => {
        await dispatch(duplicateTemplate(id)).then((res) => {
            if (res.payload.status === true) {
                setloadFrist(true)
            }
        });
    }

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
                                                    Project Templates
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
                                                    <li className="text-gray-500">Projects</li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-blue-600 hover:text-blue-700">
                                                        Templates
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
                            <div className="flex items-center ml-3 justify-between mb-3">
                                <h2 className='text-3xl'>Templates</h2>
                                <button
                                    data-modal-toggle="modal"
                                    className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                                    onClick={() => navigate("/Projects/Templates/:id")}
                                >
                                    <FaPlus className="mr-2 font-extrabold" size={15} />
                                    Template
                                </button>
                            </div>
                            {loading && (
                                <div className="flex justify-center items-center min-h-screen overscroll-auto ">
                                    <Loading />
                                </div>
                            )}
                            {!loading && (
                                <>
                                    <div className="relative scroll-inner shadow-md sm:rounded-lg">
                                        <table className="w-full border border-slate-200 dark:border-gray-400 rounded-t table">
                                            <thead className="rounded-t text-md font-medium border-b dark:bg-gray-800 dark:border-gray-400 text-gray-700 bg-gray-200 dark:text-gray-400">
                                                <tr className="text-left">
                                                    <th scope="col" className="mw-200 p-4 text-center flex items-center gap-2  justify-center">
                                                        DELIVERY <TbCaretUpDownFilled onClick={() => handleSort('name')} />
                                                    </th>
                                                    <th scope="col" className="mw-200 p-4 text-center ">
                                                        Tasks
                                                    </th>
                                                    <th scope="col" className="mw-200 p-4 text-center">
                                                        Activities
                                                    </th>

                                                    <th scope="col" className="mw-200 p-4 text-center">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentRows?.length > 0 ? (
                                                    currentRows.map((item, index) => (
                                                        <tr key={index}>
                                                            <td
                                                                className="max-w-10 truncate p-3 text-sm text-center text-gray-500 dark:text-gray-400 border-b border-slate-200 cursor-pointer capitalize"
                                                                onClick={() => navigate(`/Projects/Templates/${item?.projectTemplateID}`)}
                                                            >
                                                                <span className='truncate w-4'>{item?.name}</span>
                                                            </td>
                                                            <td className="mw-200 p-3 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-400 border-b border-slate-200">
                                                                {item?.totalTasks}
                                                            </td>
                                                            <td className="mw-200 p-3 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-400 border-b border-slate-200">
                                                                {item?.totalActivities}
                                                            </td>
                                                            <td className="mw-200 p-3 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-400 border-b border-slate-200">
                                                                <div className="flex justify-center gap-4">
                                                                    <div data-tip data-for="Edit" className="relative flex flex-col items-center group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                        onClick={() => navigate(`/Projects/Templates/${item?.projectTemplateID}`)}
                                                                    >
                                                                        <BiEdit />
                                                                        <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                            <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Edit</span>
                                                                            <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        data-tip
                                                                        data-for="Delete"
                                                                        className="relative flex-col group cursor-pointer text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                        onClick={() => DeleteTemplate(item?.projectTemplateID)}
                                                                    >
                                                                        <MdDeleteForever />
                                                                        <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                            <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Delete</span>
                                                                            <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        data-tip
                                                                        data-for="Duplicate"
                                                                        className="relative flex-col group cursor-pointer text-white bg-neutral-400 hover:bg-neutral-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                        onClick={() => DuplicateTemplates(item?.projectTemplateID)}
                                                                    >
                                                                        <MdContentCopy />
                                                                        <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                            <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Copy</span>
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
                                    <Pagination setCurrentPage={setCurrentPage} handlePageChange={handlePageChange} currentPage={currentPage} sidebarOpen={sidebarOpen} totalPages={totalPages} length={TemplateStore.getAllTemplates?.length} setrowsPerPage={setrowsPerPage} rowsPerPage={rowsPerPage} name='Tasks' />

                                </>
                            )}
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div >
    )
}
