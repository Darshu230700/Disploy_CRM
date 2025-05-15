/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import AddActivity from "./AddActivity";
import Footer from "../Common/Footer";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteActivity, GetActivity, getMarkAsActivity } from "./ActivitySlice";
import { getByIdApiActivity } from "../../Redux/CommonSlice";
import sweetAlert from "../Common/sweetAlert";
import Loading from "../Common/Loading";
import { FaPlus } from "react-icons/fa6";
import { formatDate, getActivityIcon, PageNumber } from "../Common/Common";
import { RxDotsHorizontal } from "react-icons/rx";
import * as XLSX from 'xlsx';
import axios from "axios";
import { IMPORT_ACTIVITY } from "../Common/API";
import toast from "react-hot-toast";
import FullCalender from "./FullCalender";
import moment from "moment";
import debounce from 'lodash/debounce';

export default function Activity({
  isVisible,
  setIsVisible,
  setSidebarOpen,
  sidebarOpen,
  isDark,
  setIsDark,
}) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.root.Activity);
  const { token } = useSelector((state) => state.root.auth);
  const authToken = `Bearer ${token}`;

  const [loadFrist, setloadFrist] = useState(true);
  const [loading, setloading] = useState(true);
  const [openModel, setOpenModel] = useState(false);
  const [ActivityData, setActivityData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedActivitysIds, setSelectedActivitysIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedField, setSortedField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [AciteOption, setAciteOption] = useState(false);
  const [activeButton, setActiveButton] = useState(1);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(10)
  const totalPages = Math.ceil(store.getAllActivity?.totalRows / rowsPerPage) - 1;
  const isDarkTheme = store.getAllActivity?.totalRows > 10;

  const fetchActivities = useCallback(
    debounce(async (search) => {
      setloading(true);
      const query = { search, limit: rowsPerPage, pageNumber: currentPage, objSearch: {} };

      await dispatch(GetActivity(query))
      setloading(false);
    }, 300), // Adjust debounce delay as needed
    [dispatch, currentPage, rowsPerPage]
  );

  useEffect(() => {
    if (loadFrist) {
      fetchActivities(searchTerm);
      setloadFrist(false);
    }
  }, [fetchActivities, loadFrist, searchTerm, currentPage, rowsPerPage]);

  useEffect(() => {
    fetchActivities(searchTerm);
  }, [searchTerm, fetchActivities,]);

  const togglemodel = () => {
    setOpenModel(!openModel);
    setActivityData([]);
  };

  const handleButtonClick = (buttonIndex) => {
    setSearchTerm('')
    setActiveButton(buttonIndex);
    // setloadFrist(true)
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allDealIds = store?.getAllActivity?.data.map(
        (activity) => activity.activityID
      );
      setSelectedActivitysIds(allDealIds);
    } else {
      setSelectedActivitysIds([]);
    }
  };

  const handleCheckboxChange = (productId) => {
    let updatedSelectedActivitytIds;

    if (selectedActivitysIds.includes(productId)) {
      updatedSelectedActivitytIds = selectedActivitysIds.filter(
        (id) => id !== productId
      );
    } else {
      updatedSelectedActivitytIds = [...selectedActivitysIds, productId];
    }

    setSelectedActivitysIds(updatedSelectedActivitytIds);
    const allRowsSelected =
      updatedSelectedActivitytIds.length === store.getAllActivity?.data.length;
    setSelectAll(allRowsSelected);
  };


  const handleSort = (field) => {
    if (sortedField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOrder("asc");
      setSortedField(field);
    }
  };

  const sortData = (data, sortedField, sortOrder) => {
    const sortedData = data ? [...data] : [];
    sortedData.sort((a, b) => {
      const aTrimmed = a[sortedField]?.trim() || '';
      const bTrimmed = b[sortedField]?.trim() || '';
      if (sortOrder === "asc") {
        return aTrimmed?.localeCompare(bTrimmed);
      }
    });
    return sortedData;
  };
  const sortedActivities = sortData(store?.getAllActivity?.data, sortedField, sortOrder);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const EditActivity = async (id) => {
    const result = await dispatch(getByIdApiActivity(id));
    if (result) {
      setActivityData(result.payload.data);
    }
  };

  const DeleteActivitys = async () => {
    try {
      const result = await sweetAlert.confirm("Are you sure?", "Are you sure you want to delete this!");
      if (result.isConfirmed) {
        dispatch(deleteActivity(selectedActivitysIds)).then((res) => {
          if (res.payload.status === true) {
            setCurrentPage(0)
            setloadFrist(true);
          }
        });
        sweetAlert.success("Deleted successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      sweetAlert.error("An error occurred");
    }
    setSelectedActivitysIds([]);
    setSelectAll(false);
  };

  const handleExport = () => {
    const data = store?.getAllActivity?.map(item => ({
      ActivityName: item.activityName,
      ActivityType: item.activityType,
      AvailableType: item.availableType,
      Notes: item.notes,
      PeopleName: item.peopleName,
      OrganizationName: item.organizationName,
      Guests: item?.guests,
      Locations: item.locations,
      MeetingType: item.meetingType,
      Description: item.description,
      MarkAsDone: item.markAsDone,
      IdentityName: item.identityName,
      DealTitle: item.dealName,
      Day: item.day,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, "activity_data.xlsx");
    setAciteOption(!AciteOption)
  };

  const uploadExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('ExcelFilePath', file);

    try {
      const response = await axios.post(IMPORT_ACTIVITY, formData, {
        headers: { Authorization: authToken, 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status === true) {
        setAciteOption(!AciteOption)
        toast.success(response?.data?.message)
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const getRowColorClass = (endDate) => {
    const now = moment();
    const date = moment(endDate);
    if (date.isBefore(now, 'day')) {
      return 'text-red-600 font-bold'; // Yesterday and previous dates
    } else if (date.isSame(now, 'day')) {
      return 'text-green-600'; // Today
    } else {
      return 'text-gray-500';
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
                          Activities
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
                            Activities
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
                    <div className="flex items-center gap-3">
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
                          List
                        </button>
                        <button
                          type="button"
                          className={`px-4 py-2 text-sm font-semibold ${activeButton === 2
                            ? "bg-blue-700 text-white "
                            : "bg-black text-gray-900"
                            } border border-l-0 rounded-r-lg  focus:z-10 focus:ring-2 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
                          onClick={() => handleButtonClick(2)}
                        >
                          Calendar
                        </button>
                      </div>
                      <button
                        className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 flex items-center"
                        onClick={() => { setOpenModel(true); }}
                      >
                        <FaPlus className="text-2xl mr-2" />
                        Activity
                      </button>
                    </div>
                  </div>
                  {activeButton === 1 && (
                    <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                      <div className="bg-white dark:bg-slate-800 rounded-md w-full relative flex items-center justify-end">
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                          <div class="relative mr-4">
                            <div class="absolute inset-y-0 start-2 flex items-center pointer-events-none">
                              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                              </svg>
                            </div>
                            <input
                              type="text"
                              name="Serching"
                              placeholder="Search .."
                              className="border border-gray-300 shadow px-8 py-3 w-full rounded outline-none"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>

                        </div>

                        {selectedActivitysIds &&
                          selectedActivitysIds.length > 0 && (
                            <button
                              data-tip
                              data-for="Edit"
                              className="me-4 cursor-pointer text-white bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={() => DeleteActivitys()}
                            >
                              <MdDeleteForever />
                            </button>
                          )}
                        <button type="button" className="font-semibold focus:outline-none  border border-gray-200  py-1.5 px-3 rounded relative"
                          onClick={() => setAciteOption(!AciteOption)}
                        >
                          <RxDotsHorizontal size={20} />
                        </button>
                        <div
                          className={`dropdown-menu p-2 top-10 right-0 z-50 absolute list-nonedivide-y divide-gray-100 rounded border-slate-700 md:border-whitetext-base drop-shadow-md dark:divide-gray-600 bg-white dark:bg-slate-800  ${AciteOption === true ? "block" : "hidden"}`}
                          id="navUserdata"
                        >
                          <ul className=" cursor-pointer  " aria-labelledby="navUserdata">
                            {store?.getAllActivity?.totalRows > 0 && (
                              <li className="block p-1 text-sm text-gray-700 hover:bg-blue dark:text-gray-200 dark:hover:bg-blue-900 hover:text-white dark:hover:text-white"
                                onClick={handleExport}
                              >
                                Export file results
                              </li>
                            )}
                            <li className="block p-1 text-sm text-gray-700 hover:bg-blue dark:text-gray-200 dark:hover:bg-blue-900 hover:text-white dark:hover:text-white">
                              <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center justify-center">
                                <input
                                  type="file"
                                  id="fileInput"
                                  className="hidden"
                                  onChange={uploadExcel}
                                  accept=".xls,.xlsx"
                                />
                                Import Data
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {loading && (<div className='h-screen'><Loading /></div>)}
              {!loading && activeButton === 1 && (
                <>
                  <div className="relative scroll-inner shadow-md sm:rounded-lg">
                    <table className="w-full border border-slate-200 table text-center">
                      <thead className="text-center text-md font-medium border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-center">
                          <th scope="col" className="w-4 p-4">
                            <label className="custom-label">
                              <div className="bg-white dark:bg-slate-600/40 border border-slate-300 dark:border-slate-600 rounded w-4 h-4  inline-block leading-4 -mb-[3px]">
                                <input
                                  type="checkbox"
                                  checked={selectAll}
                                  onChange={() => handleSelectAll()}
                                />
                              </div>
                            </label>
                          </th>
                          <th scope="col" className="mw-200 p-4">Done</th>
                          <th scope="col" className="mw-200 px-6 py-4">
                            <div className="flex justify-center items-center w-full">
                              Activity Name
                              <svg
                                className="w-3 h-3 ms-1.5 cursor-pointer"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                onClick={() => handleSort("activityName")}
                              >
                                <path
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Zm-6.852 0 3.426 5.05-3.426-5.05Z"
                                />
                              </svg>
                            </div>
                          </th>
                          <th scope="col" className="mw-200 p-4">MeetingType</th>
                          <th scope="col" className="mw-200 p-4">Contact Person</th>
                          <th scope="col" className="mw-200 p-4">Organization</th>
                          <th scope="col" className="mw-200 p-4">Deal</th>
                          <th scope="col" className="mw-200 p-4">Lead</th>
                          <th scope="col" className="mw-200 p-4">Project</th>
                          <th scope="col" className="mw-200 p-4">Type</th>
                          <th scope="col" className="mw-200 p-4">Free/busy</th>
                          <th scope="col" className="mw-200 p-4">Priority</th>
                          <th scope="col" className="mw-200 p-4">Note</th>
                          <th scope="col" className="mw-200 p-4">Public Description</th>
                          <th scope="col" className="mw-200 p-4">Location</th>
                          <th scope="col" className="mw-200 p-4">Due Date</th>
                          <th scope="col" className="mw-200 p-4">Add time</th>
                          <th scope="col" className="mw-200 p-4">Update time</th>
                          <th scope="col" className="mw-200 p-4">Mark as done time</th>
                          <th scope="col" className="mw-200 p-4">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {sortedActivities && sortedActivities.length > 0 ? (
                          sortedActivities.map((item, index) => (
                            <tr
                              className={`bg-white dark:bg-gray-800 ${getRowColorClass(item?.endDate)}`}
                              key={index}
                            >
                              <td className="w-4 px-4 py-2 border border-slate-200">
                                <label className="custom-label">
                                  <div className="bg-white dark:bg-slate-600/40 border border-slate-200 dark:border-slate-600 rounded w-4 h-4 inline-block leading-4 text-center -mb-[3px]">

                                    <input
                                      type="checkbox"
                                      checked={selectedActivitysIds.includes(item.activityID)}
                                      onChange={() => handleCheckboxChange(item.activityID)}
                                    />
                                  </div>
                                </label>
                              </td>
                              <td
                                className="mw-200 px-4 py-2 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 capitalize cursor-pointer"
                              >
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
                                        ActivityID: item.activityID,
                                        MarkAsDone: item?.markAsDone ? false : true,
                                      };
                                      dispatch(getMarkAsActivity(payload)).then((res) => {
                                        if (res.payload.status === true) {
                                          setloadFrist(true);
                                        }
                                      });
                                    }}
                                  />
                                  <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                    <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">{item?.markAsDone ? "To-Do" : "Done"}</span>
                                    <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                  </div>
                                </div>

                              </td>
                              <td
                                className="max-w-60 truncate py-5 text-sm dark:text-gray-400 border border-slate-200 capitalize cursor-pointer table-cell text-center"
                                style={{ display: 'ruby-text', gap: '13px' }}
                                onClick={() => {
                                  setOpenModel(true);
                                  EditActivity(item?.activityID);
                                }}
                              >
                                <span className="mr-3">{getActivityIcon(item?.activityType)}</span>
                                <span>{item?.activityName}</span>
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 capitalize">
                                {item?.meetingType}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 capitalize">
                                {item?.peopleName}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 capitalize">
                                {item?.organizationName}
                              </td>
                              <td className="max-w-8 truncate px-4 py-2 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 capitalize">
                                {item?.dealName}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 capitalize">
                                {item?.leadName}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 capitalize">
                                {item?.projectName}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 capitalize text-center">
                                {item?.activityType}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 capitalize text-center">
                                {item?.availableType}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 capitalize text-center">
                                {item?.priority}
                              </td>
                              <td className="px-4 py-2 text-sm dark:text-gray-400 border border-slate-200 capitalize text-center">
                                <p className="max-w-60  truncate-multi-line ..." dangerouslySetInnerHTML={{ __html: item?.notes }}></p>
                              </td>
                              <td className="max-w-60 truncate px-4 py-2 text-sm dark:text-gray-400 border border-slate-200 capitalize text-center">
                                {item?.description}
                              </td>
                              <td className="max-w-60 truncate px-4 py-2 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 capitalize">
                                {item?.locations}
                              </td>
                              <td className="mw-200 p-3 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 text-center">
                                {formatDate(item?.endDate)}
                              </td>
                              <td className="mw-200 p-3 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 text-center">
                                {item?.createdDate ? moment(item?.createdDate).format('LLL') : ''}
                              </td>
                              <td className="mw-200 p-3 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 text-center">
                                {item?.updatedDate ? moment(item?.updatedDate).format('LLL') : ''}
                              </td>
                              <td className="mw-200 p-3 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200 text-center">
                                {item?.markAsDone && item?.markAsDoneTime ? moment(item?.markAsDoneTime).format('LLL') : ''}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                <div className="flex justify-center">
                                  <div
                                    data-tip
                                    data-for="Edit"
                                    className="relative group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => {
                                      setOpenModel(true);
                                      EditActivity(item?.activityID);
                                    }}
                                  >
                                    <BiEdit />
                                    <div className="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                      <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                        Edit
                                      </span>
                                      <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={6}>
                            <p className="text-center px-4 py-2">Data Not Found.</p>
                          </td>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <div className="flex lg:flex-row lg:justify-between md:flex-row md:justify-between sm:flex-row sm:justify-between flex-col justify-end p-5 gap-3">
                      <div className="flex items-center">
                        <span className="text-gray-500 font-semibold">{`Total ${store.getAllActivity?.totalRows} ${'Activities'}`}</span>
                      </div>
                      <div className="flex justify-end">
                        {store.getAllActivity?.totalRows > 10 && (
                          <select
                            className={`px-1 mr-2 border rounded-lg `}
                            value={rowsPerPage}
                            onChange={(e) => { setrowsPerPage(e.target.value); setCurrentPage(0) }}
                          >
                            {PageNumber.map((x) => (
                              <option key={x} value={x}>{x}</option>
                            ))}
                          </select>
                        )}
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 0}
                          className={`font-semibold flex cursor-pointer items-center justify-center px-3 h-8 me-3 text-sm rounded-lg border ${isDarkTheme ? 'bg-sky-500 text-white border-gray-700' : 'border-gray-700 text-gray-500 border-gray-300'} ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <svg
                            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 5H1m0 0 4 4M1 5l4-4"
                            />
                          </svg>
                          {sidebarOpen ? "Previous" : ""}
                        </button>
                        <div className="flex items-center me-3">
                          <span className="text-gray-500">{`Page ${currentPage + 1} of ${totalPages + 1}`}</span>
                        </div>
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`font-semibold flex cursor-pointer items-center justify-center px-3 h-8 text-sm rounded-lg border ${isDarkTheme ? 'bg-sky-500 text-white border-gray-700' : 'bg-white text-gray-500 border-gray-300'} ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {sidebarOpen ? "Next" : ""}
                          <svg
                            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeButton === 2 && (<FullCalender setOpenModel={setOpenModel} />)}
            </div>
            <Footer />
          </div>
        </div>
      </div>

      {openModel && (
        <AddActivity
          togglemodel={togglemodel}
          setloadFrist={setloadFrist}
          editActivityData={ActivityData}
        />
      )}
    </div>
  );
}
