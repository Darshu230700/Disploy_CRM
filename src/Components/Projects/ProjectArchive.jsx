/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Sidebar from '../Common/Sidebar'
import Navbar from '../Common/Navbar'
import Footer from '../Common/Footer';
import { GoArchive } from 'react-icons/go';
import { BiEdit } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Common/Loading';
import { deleteProject, geProjectByID, getArchiveProject, getProject } from '../../Redux/ProjectSlice';
import { useDispatch } from 'react-redux';
import { formatDate } from '../Common/Common';
import AddProject from './AddProject';
import { MdDeleteForever } from 'react-icons/md';
import sweetAlert from '../Common/sweetAlert';
import moment from 'moment';
import Pagination from '../Common/Pagination';


export default function ProjectArchive({ isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark, }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setloading] = useState(true);
    const [Project, setProject] = useState([]);
    const [showModal, setshowModal] = useState(false);
    const [EditProjectData, setEditProjectData] = useState([]);
    const [loadFrist, setloadFrist] = useState(true);
    const [selectedProjectId, setSelectedProjectId] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedField, setSortedField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [rowsPerPage, setrowsPerPage] = useState(10)

    useEffect(() => {
        if (loadFrist) {
            setloading(true)
            fetchProject();
            setloadFrist(false);
        }
    }, [loadFrist]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const filteredProject = Project.filter((item) => {
        return (item?.title && item?.title.toLowerCase().includes(searchTerm.toLowerCase()));
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
    const currentRows = sortData(filteredProject, sortedField, sortOrder).slice(indexOfFirstRow, indexOfLastRow)
    const totalPages = Math.ceil(filteredProject.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedProjectId(Project && Project.map((id) => id.projectID));
        } else {
            setSelectedProjectId([]);
        }
    };

    const handleCheckboxChange = (productId) => {
        let updatedSelectedProjectIds;

        if (selectedProjectId.includes(productId)) {
            updatedSelectedProjectIds = selectedProjectId.filter((id) => id !== productId);
        } else {
            updatedSelectedProjectIds = [...selectedProjectId, productId];
        }
        setSelectedProjectId(updatedSelectedProjectIds);
        const allRowsSelected =
            updatedSelectedProjectIds.length === Project.length;
        setSelectAll(allRowsSelected);
    };

    const fetchProject = () => {
        dispatch(getProject({ IsArchived: true })).then((res) => {
            if (res?.payload?.status === true) {
                setProject(res?.payload?.data);
                const timer = setTimeout(() => {
                    setloading(false);
                }, 1000);
                return () => clearTimeout(timer);
            }
        });
    };

    const EditProject = async (id) => {
        const result = await dispatch(geProjectByID(id));
        setEditProjectData(result.payload.data);
    };

    const toggleModal = () => {
        setshowModal(!showModal);
        setEditProjectData([]);
    };

    const DeleteProject = async () => {
        try {
            const result = await sweetAlert.confirm("Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                dispatch(deleteProject(selectedProjectId)).then((res) => {
                    if (res.payload.status === true) {
                        setloadFrist(true)
                        setCurrentPage(1) 
                    }
                });
                setSelectedProjectId([]);
                setSelectAll(false);
                sweetAlert.success("Deleted successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    };

    const extractTasks = (data) => {
        const phases = [
            'phaseunassignedMaster',
            'kickoffMaster',
            'planningMaster',
            'implementationMaster',
            'reviewMaster',
            'closingMaster'
        ];
        let tasks = [];
        phases.forEach(phase => {
            if (data[phase]) {
                data[phase].forEach(item => {
                    tasks.push(item);
                });
            }
        });
        return tasks;
    };

    const getLabelColor = (labelName) => {
        switch (labelName) {
            case 'todo':
                return 'bg-blue-500 text-white';
            case 'onHold':
                return 'bg-yellow-500 text-black';
            case 'inProgress':
                return 'bg-green-500 text-white';
            default:
                return '';
        }
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
                                                    Project Archive
                                                </h1>
                                                <ol className="list-reset flex text-sm">
                                                    <li>
                                                        <a href="#" className="text-gray-500">
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
                                                        Archive
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
                            <div className="flex items-center ml-3 justify-between mb-3 ">
                                <h2 className='text-3xl'>Project Archive</h2>
                                <div className="flex items-center">
                                    <div className="pin-filters dropdown relative mr-3">
                                        <input type="text" name="Serching" placeholder="Searching.." className="border border-gray-300 shadow p-3 w-full rounded justify-end"
                                            value={searchTerm}
                                            onChange={(e) => { setSearchTerm(e.target.value) }}
                                        />
                                    </div>
                                    {selectedProjectId && selectedProjectId.length > 0 && (
                                        <div>
                                            <button
                                                data-tip
                                                data-for="Edit"
                                                className="cursor-pointer text-white bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                onClick={() => DeleteProject()}
                                            >
                                                <MdDeleteForever />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {loading && (
                                <div className="h-screen">
                                    <Loading />
                                </div>
                            )}
                            {!loading && (
                                <>
                                    <div className="relative scroll-inner shadow-md sm:rounded-lg">
                                        <table className="w-full border border-slate-200 dark:border-gray-400 rounded-t table">
                                            <thead className="rounded-t text-md font-medium border-b dark:bg-gray-800 dark:border-gray-400 text-gray-700 bg-gray-200 dark:text-gray-400">
                                                <tr className="text-center">
                                                    <th scope="col" className="w-4 p-4">
                                                        <label className="custom-label">
                                                            <div className="bg-white dark:bg-slate-600/40 border border-slate-300 dark:border-slate-600 rounded w-4 h-4  inline-block leading-4 -mb-[3px]">
                                                                <input
                                                                    type="checkbox"
                                                                    className=""
                                                                    checked={selectAll}
                                                                    onChange={() => handleSelectAll()}
                                                                />
                                                            </div>
                                                        </label>
                                                    </th>
                                                    <th scope="col" className="mw-200 p-4">
                                                        <div className="flex justify-center items-center w-full">
                                                            Title
                                                            <svg
                                                                className="w-3 h-3 ms-1.5 cursor-pointer"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                                onClick={() => handleSort("title")}
                                                            >
                                                                <path
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Zm-6.852 0 3.426 5.05-3.426-5.05Z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="mw-200 p-4 ">Labels</th>
                                                    <th scope="col" className="mw-200 p-4 ">Progress</th>
                                                    <th scope="col" className="mw-200 p-4">Board</th>
                                                    <th scope="col" className="mw-200 p-4">Phase</th>
                                                    <th scope="col" className="mw-200 p-4">Start date</th>
                                                    <th scope="col" className="mw-200 p-4">End date</th>
                                                    <th scope="col" className="mw-200 p-4">Contact Person</th>
                                                    <th scope="col" className="mw-200 p-4">Organization</th>
                                                    <th scope="col" className="mw-200 p-4">Template</th>
                                                    <th scope="col" className="mw-200 p-4">Owner</th>
                                                    <th scope="col" className="mw-200 p-4">Archive time</th>
                                                    <th scope="col" className="mw-200 p-4">Deals</th>
                                                    <th scope="col" className="mw-200 p-4">ID</th>
                                                    <th scope="col" className="mw-200 p-4">Desciption</th>
                                                    <th scope="col" className="mw-200 p-4">Project created</th>
                                                    <th scope="col" className="mw-200 p-4">status</th>
                                                    <th scope="col" className="mw-200 p-4">status change time</th>
                                                    <th scope="col" className="mw-200 p-4">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentRows && (
                                                    currentRows?.length > 0 ? (
                                                        currentRows?.map((item, index) => {
                                                            const tasks = extractTasks(item || {});
                                                            const totalTasks = tasks.length;
                                                            const completedTasks = tasks.filter(task => task.markAsDone).length;
                                                            const progress = (completedTasks / totalTasks) * 100;
                                                            return (
                                                                <tr
                                                                    key={index}
                                                                    className="bg-white dark:bg-gray-800 capitalize cursor-pointer text-center"
                                                                >
                                                                    <td className="w-4 px-4 py-2 border border-slate-200">
                                                                        <label className="custom-label">
                                                                            <div className="bg-white dark:bg-slate-600/40 border border-slate-200 dark:border-slate-600 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px]">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={selectedProjectId.includes(item.projectID)}
                                                                                    onChange={() => handleCheckboxChange(item.projectID)}
                                                                                />
                                                                            </div>
                                                                        </label>
                                                                    </td>
                                                                    <td
                                                                        className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through " : "text-gray-500"}`}
                                                                        onClick={() => navigate(`/Projects/${item?.projectID}`)}
                                                                    >
                                                                        {item?.title}
                                                                    </td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}>
                                                                        {item?.labelName.split(',').map((label, index) => (
                                                                            <span key={index} className={`text-sm me-2 px-2.5 py-0.5 rounded ${getLabelColor(label.trim())}`}>
                                                                                {label.trim()}
                                                                            </span>
                                                                        ))}
                                                                    </td>

                                                                    <td className={`mw-200 items-center px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200`}>
                                                                        <div className="flex items-center gap-x-3 whitespace-nowrap px-3 mt-2">
                                                                            <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                                                <div
                                                                                    className="flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition-all duration-500"
                                                                                    style={{
                                                                                        width: `${progress ? progress : 8}%`,
                                                                                        backgroundColor: '#008000'
                                                                                    }}
                                                                                ></div>
                                                                            </div>
                                                                            <div className="w-10 text-end">
                                                                                <span className="text-sm text-gray-800">{`(${completedTasks}/${totalTasks})`}</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}>
                                                                        {item?.boardName}
                                                                    </td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`} >
                                                                        {item?.phase}
                                                                    </td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}>
                                                                        {formatDate(item?.startDateTime)}
                                                                    </td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}>
                                                                        {formatDate(item?.endDateTime)}
                                                                    </td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}
                                                                        onClick={() => navigate(`/detailsPeople/${item?.contactPersonID}`)}
                                                                    >
                                                                        {item?.contactPerson}
                                                                    </td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}
                                                                        onClick={() => navigate(`/detailsOrganization/${item?.organizationID}`)}
                                                                    >
                                                                        {item?.organizationName}
                                                                    </td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}>{item?.projectTemplateName}</td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}>{item?.ownerName}</td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}>{moment(item?.archiveTime).format('LLL')}</td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}>
                                                                        <div className="flex gap-2 justify-center max-w-80  truncate hover:flex-wrap">
                                                                            {item?.deals?.length > 0
                                                                                ? (item?.deals.map((x, index) => (
                                                                                    <div key={index} className="border p-1   ">
                                                                                        <Link to={`/deal/${x?.dealID}`} className="hover:border-b border-black" >{x?.title}</Link>
                                                                                    </div>
                                                                                ))) : ''}
                                                                        </div>
                                                                    </td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}>{item?.projectID}</td>
                                                                    <td className={`max-w-8 truncate  px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}>{item?.description}</td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}>{formatDate(item?.createdDate)}</td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}>{item?.canceled === 1 ? 'completed' : item?.canceled === 0 ? 'canceled' : 'open'}</td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}>{moment(item?.statusChangeTime).format('LLL')}</td>
                                                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 line-through" : "text-gray-500"}`}>
                                                                        <div className="flex gap-4 justify-center">
                                                                            {!(item?.canceled === 0) && (
                                                                                <div
                                                                                    data-tip
                                                                                    data-for="Edit"
                                                                                    className="relative group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                    onClick={() => {
                                                                                        setshowModal(true);
                                                                                        EditProject(item?.projectID);
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
                                                                            )}
                                                                            <div
                                                                                data-tip
                                                                                data-for="Edit"
                                                                                className="relative group cursor-pointer text-white bg-blue hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                onClick={() => {
                                                                                    const payload = {
                                                                                        ProjectID: item.projectID,
                                                                                        IsArchived: false,
                                                                                    };
                                                                                    dispatch(getArchiveProject(payload)).then((res) => {
                                                                                        if (res?.payload?.status === true) {
                                                                                            setloadFrist(true);
                                                                                        }
                                                                                    })
                                                                                }}
                                                                            >
                                                                                <GoArchive />
                                                                                <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                    <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                                                        UnArchive
                                                                                    </span>
                                                                                    <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="8" className="text-center py-4">
                                                                Data not found
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination setCurrentPage={setCurrentPage} name='Projects' handlePageChange={handlePageChange} currentPage={currentPage} sidebarOpen={sidebarOpen} totalPages={totalPages} length={Project?.length} setrowsPerPage={setrowsPerPage} rowsPerPage={rowsPerPage} />


                                </>
                            )}
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
            {showModal && (
                <AddProject
                    toggleModal={toggleModal}
                    setloadFrist={setloadFrist}
                    EditProjectData={EditProjectData}
                />
            )}
        </div>
    )
}
