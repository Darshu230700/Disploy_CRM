/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaPlus, } from "react-icons/fa6";
import {
  TbBrandGoogleAnalytics,
  TbTallymark4,
} from "react-icons/tb";
import { useDispatch } from "react-redux";
import {
  deleteProject,
  geProjectByID,
  getArchiveProject,
  getProject,
  InsertProject,
} from "../../Redux/ProjectSlice";
import { BiEdit, } from "react-icons/bi";
import Loading from "../Common/Loading";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import AddProject from "./AddProject";
import sweetAlert from "../Common/sweetAlert";
import { formatDate, Phase, } from "../Common/Common";
import { GoArchive } from "react-icons/go";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import ProjectHome from "./ProjectHome";
import moment from "moment";
import Pagination from "../Common/Pagination";

// shraddha

const Projects = ({
  isVisible,
  setIsVisible,
  setSidebarOpen,
  sidebarOpen,
  isDark,
  setIsDark,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [Project, setProject] = useState([]);
  const [loading, setloading] = useState(true);
  const [Projectpage, setProjectpage] = useState(false);
  const [Tab, setTab] = useState("list");
  const [showModal, setshowModal] = useState(false);
  const [loadFrist, setloadFrist] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [EditProjectData, setEditProjectData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedField, setSortedField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage, setrowsPerPage] = useState(10)
  const [lists, setLists] = useState({
    Kickoff: [],
    Planning: [],
    Implementation: [],
    Review: [],
    Closing: [],
  })

  useEffect(() => {

    if (loadFrist) {
      fetchProject();
      setloadFrist(false);
    }
  }, [loadFrist, Project]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleTab = (tabId) => { setTab(tabId); setSearchTerm(''); setloadFrist(true); };

  const toggleModal = () => {
    setshowModal(!showModal);
    setEditProjectData([]);
  };

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
      } else if (order === "desc") {
        // return bTrimmed?.localeCompare(aTrimmed);
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
        setProjectpage(false);
        sweetAlert.success("Deleted successfully");
      }
      setSelectedProjectId([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error:", error);
      sweetAlert.error("An error occurred");
    }
  };

  const fetchProject = () => {
    setloading(true);
    dispatch(getProject({ IsArchived: false })).then((res) => {
      if (res?.payload?.status === true) {
        setProject(res.payload.data);
        const timer = setTimeout(() => {
          setloading(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    });
  };

  const EditProject = async (id) => {
    const result = await dispatch(geProjectByID(id));
    setEditProjectData(result.payload.data);
  };

  const updatePhaseStage = async (draggedItem, Phasestage) => {

    setloading(true);
    const Params = {
      ...draggedItem,
      phase: Phasestage.name,
    };

    try {
      const res = await dispatch(InsertProject(Params));
      toast.remove()
      if (res.payload.status === true) {
        setloadFrist(true);
        // toast.success('Project Droped successfully!')
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getList = (droppableId) => {
    return lists[droppableId] || [];
  };

  const setList = (droppableId, list) => {
    setLists((prevLists) => ({
      ...prevLists,
      [droppableId]: list,
    }));
  };

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    const sourceList = getList(source.droppableId);
    const destList = getList(destination.droppableId);

    if (sourceList && destList) {
      const draggedItemId = parseInt(result.draggableId);
      const draggedItem = Project.find((item) => item.projectID === draggedItemId);

      const updatedSourceList = sourceList.filter((item) => item.projectID !== draggedItemId);

      const updatedDestList = [
        ...destList.slice(0, destination.index),
        draggedItem,
        ...destList.slice(destination.index),
      ];

      setList(source.droppableId, updatedSourceList);
      setList(destination.droppableId, updatedDestList);
      const Phasestage = Phase.find(x => x.id === destination.droppableId)

      updatePhaseStage(draggedItem, Phasestage);
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
                  <div className="flex flex-wrap justify-between">
                    <div className="items-center ">
                      <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                        Projects
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
                          Projects
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!loading && Project?.length === 0 && !Projectpage ? (
            <ProjectHome setProjectpage={setProjectpage} />
          ) : (
            <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
              <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative">
                <div className="flex-auto pb-4">
                  <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                    <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex flex-wrap text-sm font-medium text-center"

                          role="group"
                        >
                          <button
                            type="button"

                            className={`relative group flex justify-center items-center p-2 text-sm border-b-2 ${Tab === "phase"
                              ? "border-blue-600"
                              : "border-transparent hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-600"
                              }`}
                            onClick={() => handleTab("phase")}
                          >
                            <TbBrandGoogleAnalytics className="text-slate-500 dark:text-slate-300 group-hover:text-blue-400 mx-auto mb-1 block text-center text-2xl leading-9" />
                            <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                              <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                Analytics
                              </span>
                              <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                            </div>
                          </button>
                          <button
                            type="button"
                            className={`relative group flex justify-center items-center p-2 text-sm border-b-2 ${Tab === "list"
                              ? "border-blue-400"
                              : "border-transparent hover:text-blue-600 hover:border-blue-600 "
                              } `}
                            onClick={() => handleTab("list")}
                          >
                            <TbTallymark4 className="text-slate-500 dark:text-slate-300 group-hover:text-blue-400 mx-auto mb-1 block text-center text-2xl leading-9" />
                            <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                              <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                Tallymark
                              </span>
                              <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                            </div>
                          </button>
                        </div>

                        <button
                          data-modal-toggle="modal"
                          className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                          onClick={() => setshowModal(true)}
                        >
                          <FaPlus className="mr-2 font-extrabold" size={15} /> Project

                        </button>
                      </div>
                    </div>
                    <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                      <div className="bg-white dark:bg-slate-800 rounded-md w-full relative flex items-center justify-end">
                        <div className="flex items-center ml-3">
                          <div className="pin-filters dropdown relative mr-3">
                            <input
                              type="text"
                              name="Serching"
                              placeholder="Searching.."
                              className="border border-gray-300 shadow p-3 w-full rounded bg-transparent"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}

                            />
                          </div>
                          {selectedProjectId &&
                            selectedProjectId.length > 0 && (
                              <div
                                data-tip
                                data-for="delete"
                                className="cursor-pointer text-white"
                              >
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
                          {/* <button type="button" className="font-semibold focus:outline-none  border border-gray-200  py-1.5 px-3 rounded relative ms-2"
                            onClick={() => setAciteOption(!AciteOption)}
                          >
                            <RxDotsHorizontal size={20} />
                          </button>
                          <div
                            className={`dropdown-menu p-2 top-10 right-0 z-50 absolute list-nonedivide-y divide-gray-100 rounded border-slate-700 md:border-whitetext-base drop-shadow-md dark:divide-gray-600 bg-white dark:bg-slate-800  ${AciteOption === true ? "block" : "hidden"}`}
                            id="navUserdata"
                          >
                            <ul className=" cursor-pointer  " aria-labelledby="navUserdata">
                              {Project.length > 0 && (
                                <li className="block p-1 text-sm text-gray-700 hover:bg-blue dark:text-gray-200 dark:hover:bg-blue-900 hover:text-white dark:hover:text-white"
                                  onClick={handleExport}
                                >
                                  Export file results
                                </li>
                              )}
                              <li className="block p-1 text-sm text-gray-700 hover:bg-blue dark:text-gray-200 dark:hover:bg-blue-900 hover:text-white dark:hover:text-white"
                                onClick={() => { navigate('/settings/import-Data') }}
                              >
                                Import Data
                              </li>
                            </ul>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {loading && <div className="h-screen"><Loading /></div>}
                {
                  !loading && Tab === "phase" && (
                    <>
                      <DragDropContext onDragEnd={handleOnDragEnd}>
                        <div className="flex -mx-3">
                          {Phase.map((x) => {
                            const phaseProjects = filteredProject.filter((row) => row.phase === x.name);
                            const projectCount = phaseProjects.length;
                            return (
                              <Droppable key={x.id} droppableId={x.id} >
                                {(provided) => (
                                  <div ref={provided.innerRef} className="deals-colums h-full" >
                                    <div className="w-full p-3 bg-blue-100 ">
                                      <h3 className="font-medium text-2xl ">{x.name}</h3>
                                      <p className="text-base text-gray-600 tracking-wide font-medium-dark"> Projects {projectCount}</p>

                                      {filteredProject && filteredProject
                                        .filter((row) => row.phase === x.name)
                                        .map((x, index) => (
                                          <Draggable key={x.projectID} draggableId={x.projectID.toString()} index={index} >
                                            {(provided) => (
                                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative mt-2" onClick={() => navigate(`/Projects/${x.projectID}`)}>
                                                  <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-2 px-4 dark:text-slate-300/70">
                                                    <div className="font-semibold capitalize">
                                                      <h2 className="text-base mb-1">{x?.title}</h2>
                                                      <p className="text-gray-600 mb-1 text-sm">
                                                        {`${null === x.organizationName ? "" : x.organizationName} `}
                                                      </p>
                                                      {/* <p className="text-gray-600 text-xs mb-1">
                                                        {`${null === x.labelName ? "" : x.labelName} `}
                                                      </p> */}
                                                      <small className="text-gray-600">{`${null === x.endDateTime ? "" : formatDate(x?.endDateTime)}`}</small>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </Draggable>
                                        ))
                                      }
                                      {provided.placeholder}
                                    </div>
                                  </div>
                                )}
                              </Droppable>
                            )
                          }
                          )}
                        </div>
                      </DragDropContext>
                    </>
                  )
                }
                {!loading && Tab === "list" && (
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
                            <th scope="col" className="mw-200 p-4">Deals</th>
                            <th scope="col" className="mw-200 p-4">Template</th>
                            <th scope="col" className="mw-200 p-4">Owner</th>
                            {/* <th scope="col" className="mw-200 p-4">Archive time</th> */}
                            <th scope="col" className="mw-200 p-4">ID</th>
                            <th scope="col" className="mw-200 p-4">Desciption</th>
                            <th scope="col" className="mw-200 p-4">Project created</th>
                            <th scope="col" className="mw-200 p-4">Status</th>
                            <th scope="col" className="mw-200 p-4">Status change time</th>
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
                                      className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through " : "text-gray-500"}`}
                                      onClick={() => navigate(`/Projects/${item?.projectID}`)}
                                    >
                                      {item?.title}
                                    </td>
                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}>
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
                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}>
                                      {item?.boardName}
                                    </td>
                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`} >
                                      {item?.phase}
                                    </td>
                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}>
                                      {formatDate(item?.startDateTime)}
                                    </td>
                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}>
                                      {formatDate(item?.endDateTime)}
                                    </td>
                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}
                                      onClick={() => navigate(`/detailsPeople/${item?.contactPersonID}`)}
                                    >
                                      {item?.contactPerson}
                                    </td>
                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}
                                      onClick={() => navigate(`/detailsOrganization/${item?.organizationID}`)}
                                    >
                                      {item?.organizationName}
                                    </td>
                                    <td className={`mw-200  px-4  py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}>
                                      <div className="flex gap-2 justify-center max-w-80  truncate hover:flex-wrap">
                                        {item?.dealList?.length > 0
                                          ? (item?.dealList.map((x, index) => (
                                            <div key={index} className="border p-1   ">
                                              <Link to={`/deal/${x?.dealID}`} className="hover:border-b border-black" >{x?.title}</Link>
                                            </div>
                                          ))) : ''}
                                      </div>
                                    </td>
                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}>{item?.projectTemplateName}</td>
                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}>{item?.ownerName || 'Dhruv'}</td>
                                    {/* <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}></td> */}
                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}>{item?.projectID}</td>
                                    <td className={`max-w-8 truncate px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}>{item?.description}</td>
                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}>{formatDate(item?.createdDate)}</td>
                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}>{item?.canceled === 1 ? 'completed' : item?.canceled === 0 ? 'canceled' : 'open'}</td>
                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}>{moment(item?.statusChangeTime).format('LLL')}</td>
                                    <td className={`mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 ${item?.canceled === 1 ? "text-green-600" : item?.canceled === 0 ? "text-red-600 font-bold line-through" : "text-gray-500"}`}>
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
                                              IsArchived: true,
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
                                              Archive
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
                    <Pagination setCurrentPage={setCurrentPage} handlePageChange={handlePageChange} currentPage={currentPage} sidebarOpen={sidebarOpen} totalPages={totalPages} length={Project?.length} setrowsPerPage={setrowsPerPage} rowsPerPage={rowsPerPage} name='Projects' />

                  </>
                )}
              </div>
              <Footer />
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <AddProject
          toggleModal={toggleModal}
          setloadFrist={setloadFrist}
          EditProjectData={EditProjectData}
        />
      )}
    </>
  );
};

export default Projects;
