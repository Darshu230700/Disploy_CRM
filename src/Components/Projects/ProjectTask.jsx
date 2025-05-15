/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import Sidebar from '../Common/Sidebar'
import Navbar from '../Common/Navbar'
import Footer from '../Common/Footer';
import { BiEdit } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa6';
import Loading from '../Common/Loading';
import { useDispatch } from 'react-redux';
import { deleteTasks, getAllTasks, getMarkAsTasks, getTaskByID } from '../../Redux/TaskSlice';
import { formatDate } from '../Common/Common';
import AddTasks from './AddTasks';
import { MdDeleteForever } from 'react-icons/md';
import sweetAlert from '../Common/sweetAlert';
import Pagination from '../Common/Pagination';

export default function ProjectTask({ isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark, }) {
    const dispatch = useDispatch()
    const [loading, setloading] = useState(true);
    const [OpenModel, setOpenModel] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [Task, setTask] = useState([]);
    const [loadFrist, setloadFrist] = useState(true);
    const [EditTask, setEditTask] = useState([]);
    const [activeButton, setActiveButton] = useState(1);
    const [Type, setType] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedField, setSortedField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [rowsPerPage, setrowsPerPage] = useState(10)

    useEffect(() => {
        if (loadFrist) {
            fetchData();
            const timer = setTimeout(() => {
                setloading(false)
                setloadFrist(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [loadFrist]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const toggle = () => {
        setOpenModel(!OpenModel)
        setEditTask([])
    }

    const fetchData = async () => {
        try {
            setloading(true)
            const response = await dispatch(getAllTasks({ MarkAsDone: Type }))
            if (response?.payload?.status === true) {

                setTask(response?.payload?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleButtonClick = (buttonIndex) => {
        if (buttonIndex === 1) {
            setType(false)
        } else {
            setType(true)
        }
        setSearchTerm('')
        setActiveButton(buttonIndex);
        setloadFrist(true);
    };

    const filtereTask = Task.filter((item) => {
        return item?.projectName && item?.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    });

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
            const aTrimmed = a[field]?.trim() || '';
            const bTrimmed = b[field]?.trim() || '';

            if (order === "asc") {
                return aTrimmed?.localeCompare(bTrimmed);
            }
        });
        return sortedData;
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortData(filtereTask, sortedField, sortOrder).slice(indexOfFirstRow, indexOfLastRow)
    const totalPages = Math.ceil(filtereTask.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const TaskEdit = (id) => {
        try {
            dispatch(getTaskByID(id)).then((res) => {
                if (res.payload.status === true) {
                    setEditTask(res.payload.data);
                }
            })
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    const handleDeleteProjectTask = async (id) => {
        try {
            const result = await sweetAlert.confirm(
                "Are you sure?",
                "You won't be able to revert this!"
            );

            if (result.isConfirmed) {
                await dispatch(deleteTasks(id)).then((res) => {
                    if (res.payload.status === true) {
                        setloadFrist(true);
                        setCurrentPage(1)
                    }
                });
                sweetAlert.success("Deleted successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    };

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
                                                    Project
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
                                                    <li className="text-gray-500">Project</li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-blue-600 hover:text-blue-700">
                                                        Tasks
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
                            <div class="flex-auto">
                                <div class="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                                    <div class="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                        <div class="flex items-center">
                                            <div
                                                className="inline-flex rounded-md shadow-sm"
                                                role="group"
                                            >
                                                <button
                                                    type="button"
                                                    className={`px-4 py-2 text-sm font-semibold  ${activeButton === 1
                                                        ? "bg-blue-700 text-white "
                                                        : "bg-black text-gray-900"
                                                        } border border-r-0 rounded-l-lg focus:z-10 focus:ring-2 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
                                                    onClick={() => handleButtonClick(1)}
                                                >
                                                    To-Do
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`px-4 py-2 text-sm font-semibold ${activeButton === 2
                                                        ? "bg-blue-700 text-white "
                                                        : "bg-black text-gray-900"
                                                        } border border-l-0 rounded-r-lg  focus:z-10 focus:ring-2 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
                                                    onClick={() => handleButtonClick(2)}
                                                >
                                                    Done
                                                </button>
                                            </div>
                                            <button
                                                class="ms-5 relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                                                onClick={() => {
                                                    setOpenModel(true);
                                                }}
                                            >
                                                <FaPlus className="text-2xl mr-2" />
                                                Task

                                            </button>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                        <div class="bg-white dark:bg-slate-800 rounded-md w-full relative flex items-center justify-end">
                                            <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                                <div className="bg-white dark:bg-slate-800 rounded-md w-full relative flex items-center justify-end">
                                                    <div className="flex items-center ml-3">
                                                        <div className="pin-filters dropdown relative mr-3">
                                                            <input type="text" name="Serching" placeholder="Searching.." className="border border-gray-300 shadow p-3 w-full rounded"
                                                                value={searchTerm}
                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="pin-filters dropdown relative mr-3">

                                                        </div>
                                                    </div>
                                                </div>
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
                                <>
                                    <div class="relative scroll-inner shadow-md sm:rounded-lg block w-full mt-5">
                                        <table class="w-full border border-slate-200 table ">
                                            <thead class="text-left text-md font-medium border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" class="mw-64 p-4" >Done</th>
                                                    <th scope="col" class="w-4 p-4 text-center" >
                                                        <div className="flex justify-center items-center w-full">
                                                            Subject
                                                            <svg
                                                                className="w-3 h-3 ms-1.5 cursor-pointer"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                                onClick={() => handleSort("projectName")}
                                                            >
                                                                <path
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Zm-6.852 0 3.426 5.05-3.426-5.05Z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </th>
                                                    <th scope="col" class="mw-200 p-4 text-center" >Project</th>
                                                    <th scope="col" class="mw-200 p-4 text-center" >Phase</th>
                                                    <th scope="col" class="mw-200 p-4 text-center" >Group</th>
                                                    <th scope="col" class="mw-200 p-4 text-center" >Due date</th>
                                                    <th scope="col" class="mw-200 p-4 text-center" >Assignee</th>
                                                    <th scope="col" class="mw-200 p-4 text-center" >Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentRows && currentRows?.length > 0 ? (
                                                    currentRows?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="w-4 p-4 border border-slate-200">
                                                                <label className="custom-label">
                                                                    <div
                                                                        data-tip
                                                                        data-for="Delete"
                                                                        className="relative flex-col group cursor-pointer text-white  text-lg p-2.5 text-center inline-flex items-center "
                                                                    >
                                                                        <input
                                                                            checked={item?.markAsDone}
                                                                            type="radio"
                                                                            onClick={() => {
                                                                                const payload = {
                                                                                    TaskID: item.taskID,
                                                                                    MarkAsDone: item?.markAsDone === true ? false : true,
                                                                                };
                                                                                dispatch(getMarkAsTasks(payload)).then((res) => {
                                                                                    if (res.payload.status === true) {
                                                                                        setloadFrist(true);
                                                                                    }
                                                                                })
                                                                            }}
                                                                        />
                                                                        <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                            <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">{item?.markAsDone ? "To-Do" : "Done"}</span>
                                                                            <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                        </div>
                                                                    </div>
                                                                </label>
                                                            </td>
                                                            <td
                                                                onClick={() => { setOpenModel(true); TaskEdit(item.taskID); }}
                                                                className={`mw-200 p-3 text-sm cursor-pointer text-center text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item.markAsDone ? 'line-through' : ""} `}>
                                                                {item?.taskName}
                                                            </td>

                                                            <td className={`mw-200 p-3 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item.markAsDone ? 'line-through' : ""} `}>
                                                                {item?.projectName}
                                                            </td>
                                                            <td className={`mw-200 p-3 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item.markAsDone ? 'line-through' : ""} `}>
                                                                {item?.phase}
                                                            </td>
                                                            <td className={`mw-200 p-3 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item.markAsDone ? 'line-through' : ""} `}>
                                                                Ungrouped
                                                            </td>
                                                            <td className={`mw-200 p-3 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item.markAsDone ? 'line-through' : ""} `}>
                                                                {formatDate(item?.dueDate)}
                                                            </td>
                                                            <td className={`mw-200 p-3 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item.markAsDone ? 'line-through' : ""} `}>
                                                                {item?.assigneeName}
                                                            </td>
                                                            <td className="mw-200 p-3 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ">
                                                                <div
                                                                    data-tip
                                                                    data-for="Edit"
                                                                    className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                    onClick={() => { setOpenModel(true); TaskEdit(item?.taskID); }}
                                                                >
                                                                    <BiEdit />
                                                                </div>
                                                                <button
                                                                    data-tip
                                                                    data-for="Delet"
                                                                    className="cursor-pointer text-white bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ms-3"
                                                                    onClick={() => handleDeleteProjectTask(item?.taskID)}
                                                                >
                                                                    <MdDeleteForever />
                                                                </button>
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
                                    <Pagination setCurrentPage={setCurrentPage} name='Tasks' handlePageChange={handlePageChange} currentPage={currentPage} sidebarOpen={sidebarOpen} totalPages={totalPages} length={currentRows?.length} setrowsPerPage={setrowsPerPage} rowsPerPage={rowsPerPage} />
                                </>
                            )}
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
            {OpenModel && (
                <AddTasks
                    toggle={toggle}
                    setloadFrist={setloadFrist}
                    EditTask={EditTask}
                    identityName='Project'
                />
            )}
        </div>
    )
}
