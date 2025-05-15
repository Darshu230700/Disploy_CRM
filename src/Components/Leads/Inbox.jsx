/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaPlus, } from "react-icons/fa6";
import AddLeads from "./AddLeads";
import { useDispatch, useSelector } from "react-redux";
import {
  archiveLeadData,
  editLeadmaster,
  getLeadmaster,
  handleImportFile,
  removeLeadmaster,
} from "../../Redux/LeadsSlice";
import { MdDeleteForever, } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import sweetAlert from "../Common/sweetAlert";
import { useNavigate } from "react-router-dom";
import Loading from "../Common/Loading";
import { FormatDateMoment } from "../Common/defaultValue"
import { RxDotsHorizontal } from "react-icons/rx";
import * as XLSX from 'xlsx';
import { GoArchive } from "react-icons/go";
import moment from "moment";
import { getActivityIcon } from "../Common/Common";
import { IoIosWarning } from "react-icons/io";
import Pagination from "../Common/Pagination";
import { getMenuAll, getMenuPermission } from "../../Redux/SideBarSlice";


const Inbox = ({
  isVisible,
  setIsVisible,
  setSidebarOpen,
  sidebarOpen,
  isDark,
  setIsDark,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state.root.leads);
  const { user } = useSelector((state) => state.root.auth);

  const [loadFist, setLoadFist] = useState(true);
  const [openModel, setOpenModel] = useState(false);
  const [leadData, setLeadData] = useState([]);
  // InfoDetailsLeads model
  const [loading, setloading] = useState(true);
  const [activeButton, setActiveButton] = useState(1);
  const [type, setType] = useState(false);
  // pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(10);
  const [sortedField, setSortedField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectcheck, setSelectCheck] = useState(false);
  const [AciteOption, setAciteOption] = useState(false);
  const [permissions, setPermissions] = useState({
    isDelete: false,
    isSave: false,
    isView: false,
  });

  useEffect(() => {
    dispatch(getMenuAll()).then((item) => {

      const findData = item?.payload?.data?.menu.reduce((result, menuItem) => {
        if (menuItem?.submenu && Array.isArray(menuItem?.submenu)) {
          const submenuItem = menuItem?.submenu?.find((submenuItem) => submenuItem?.pageName === "Leads Inbox");
          if (submenuItem) { result = submenuItem; }
        }
        return result;
      }, null);

      if (findData) {
        const ItemID = findData?.moduleID;
        const payload = { UserRoleID: user?.userRoleID, ModuleID: ItemID };
        dispatch(getMenuPermission(payload)).then((permissionItem) => {
          if (Array.isArray(permissionItem?.payload?.data) && permissionItem?.payload?.data?.length > 0) {
            setPermissions(permissionItem?.payload?.data[0]);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (loadFist) {
      setloading(true);
      dispatch(getLeadmaster({ search: '', limit: 0, pageNumber: 0, objSearch: { IsArchived: type } }))
        .then(() => {
          const timer = setTimeout(() => {
            setloading(false);
          }, 1000);

          return () => clearTimeout(timer);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setloading(false);
        });
      setLoadFist(false);
    }
  }, [loadFist, store]);

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm]);

  useEffect(() => {
    if (selectcheck) {
      if (selectedItems?.length === sortedAndPaginatedData?.length) {
        setSelectAllChecked(true);
      }
    }
  }, [selectcheck, selectedItems]);

  const handlePageChange = (pageNumber) => { setCurrentPage(pageNumber); };


  const filteredData = store?.leadsData ? store?.leadsData?.filter((item) => Object.values(item).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()))) : []

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

  const handleSort = (field) => {
    if (sortedField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOrder("asc");
      setSortedField(field);
    }
  };

  // Sort and paginate the data
  const sortedAndPaginatedData = sortData(filteredData, sortedField, sortOrder).slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);

  const handleCheckboxChange = (selectID) => {
    setSelectAllChecked(false);
    setSelectCheck(true);
    if (selectedItems?.includes(selectID)) {
      setSelectedItems(selectedItems?.filter((id) => id !== selectID));
    } else {
      setSelectedItems([...selectedItems, selectID]);
    }
  };

  const handleSelectAll = () => {
    setSelectAllChecked(!selectAllChecked);
    if (selectedItems?.length === sortedAndPaginatedData?.length) {
      setSelectedItems([]);
    } else {
      const allIds = sortedAndPaginatedData?.map((items) => items?.leadID);
      setSelectedItems(allIds);
    }
  };

  const handleButtonClick = (buttonIndex) => {
    if (buttonIndex === 1) {
      setType(false);
    } else {
      setType(true);
    }
    setSearchTerm('')
    setActiveButton(buttonIndex);
    setLoadFist(true);
  };

  const editLead = async (id) => {
    try {
      const response = await dispatch(editLeadmaster(id));
      if (response) {
        setOpenModel(true);
        const data = response.payload.data;
        setLeadData(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await sweetAlert.confirm(
        "Are you sure?",
        "Are you sure you want to delete this!"
      );
      if (result.isConfirmed) {
        dispatch(removeLeadmaster(selectedItems)).then((res) => {
          setCurrentPage(1)
          setLoadFist(true);
        })
        sweetAlert.success("Deleted successfully");
      }
      setSelectedItems([]);
      setSelectAllChecked(false);
    } catch (error) {
      console.error("Error:", error);
      sweetAlert.error("An error occurred");
    }
  };

  const togglemodelLead = () => {
    setOpenModel(!openModel);
    setLeadData([]);
  };

  const infoDetailsLeads = async (id) => {
    try {
      const response = await dispatch(editLeadmaster(id));
      if (response) {
        const data = response.payload.data;
        setLeadData(data);
        navigate(`/detailsLead/${id}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleExport = () => {
    const data = store?.leadsData?.map(item => ({
      Title: item.title,
      ContactPerson: item.personName,
      CurrencyName: item.currencyName,
      LabelName: item.labelName,
      ExpectedClosedDate: item.expectedCloseDate,
      VisibleToName: item.visibleName,
      PeopleName: "",
      OrganizationName: item.organizationName,
      Value: item.value,
      SourceChannel: item.sourceChannel,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, "leads_data.xlsx");
    setAciteOption(!AciteOption)
  };

  const uploadExcel = async (e) => {
    // navigate('/settings/import-Data')
    // return
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('ExcelFilePath', file);

    try {
      dispatch(handleImportFile(formData))
      setAciteOption(!AciteOption)

    } catch (error) {
      console.error('Upload error:', error);
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

      <div className="flex flex-1">
        <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
          <div className="xl:w-full">
            <div className="flex flex-wrap">
              <div className="flex items-center py-4 w-full">
                <div className="w-full">
                  <div className="">
                    <div className="flex flex-wrap justify-between">
                      <div className="items-center ">
                        <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                          Leads Inbox
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
                          <li className="text-gray-500">Leads</li>
                          <li>
                            <span className="text-gray-500 mx-2">/</span>
                          </li>
                          <li className="text-blue-600 hover:text-blue-700">
                            Leads Inbox
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
                          Inbox
                        </button>
                        <button
                          type="button"
                          className={`px-4 py-2 text-sm font-semibold ${activeButton === 2
                            ? "bg-blue-700 text-white "
                            : "bg-black text-gray-900"
                            } border border-l-0 rounded-r-lg  focus:z-10 focus:ring-2 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
                          onClick={() => handleButtonClick(2)}
                        >
                          Archive
                        </button>
                      </div>
                      {permissions?.isSave && !type && (
                        <button
                          data-modal-toggle="modal"
                          className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 flex items-center"
                          onClick={() => setOpenModel(true)}
                        >
                          <FaPlus className="text-2xl mr-2" />
                          Lead
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                    <div className="bg-white dark:bg-slate-800 rounded-md w-full relative flex items-center justify-end">
                      <div className="flex items-center ml-3 gap-2 ">
                        <div className="pin-filters dropdown relative mr-3">
                          <input
                            type="text"
                            name="Serching"
                            placeholder="Search ..."
                            className="border border-gray-300 shadow p-3 w-full rounded bg-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        {permissions?.isDelete && selectedItems && selectedItems.length > 0 && (
                          <div
                            data-tip
                            data-for="delete"
                            className="cursor-pointer text-white"
                          >
                            <button
                              data-tip
                              data-for="Edit"
                              className="cursor-pointer text-white bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={() => handleDelete()}
                            >
                              <MdDeleteForever />
                            </button>
                          </div>
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
                            {sortedAndPaginatedData?.length > 0 && (
                              <li className="block p-1 text-sm text-gray-700 hover:bg-blue dark:text-gray-200 dark:hover:bg-blue-900 hover:text-white dark:hover:text-white"
                                onClick={handleExport}
                              >
                                Export file results
                              </li>
                            )}
                            <li className="block p-1 text-sm text-gray-700 hover:bg-blue dark:text-gray-200 dark:hover:bg-blue-900 hover:text-white dark:hover:text-white">
                              <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center justify-center">
                                <input
                                  // type="file"
                                  id="fileInput"
                                  className="hidden"
                                  onClick={uploadExcel}
                                  // onChange={uploadExcel}
                                  accept=".xls,.xlsx"
                                />
                                Import Data
                              </label>
                            </li>
                          </ul>
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
                  <div className="relative scroll-inner shadow-md sm:rounded-lg">
                    <table className="w-full border border-slate-200 dark:border-gray-400 rounded-t table">
                      <thead className="rounded-t text-md font-medium border-b dark:bg-gray-800 dark:border-gray-400 text-gray-700 bg-gray-200 dark:text-gray-400">
                        <tr className="text-center">
                          {permissions?.isDelete &&
                            <th scope="col" className="w-4 p-4">
                              <label className="custom-label">
                                <div className="bg-white dark:bg-slate-600/40 border border-slate-300 dark:border-slate-600 rounded w-4 h-4  inline-block leading-4 -mb-[3px]">
                                  <input
                                    type="checkbox"
                                    className=""
                                    checked={selectAllChecked}
                                    onChange={() => handleSelectAll()}
                                  />
                                </div>
                              </label>
                            </th>
                          }
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
                          <th scope="col" className="mw-200 p-4 ">
                            Next Activity
                          </th>
                          <th scope="col" className="mw-200 p-4">Labels</th>
                          <th scope="col" className="mw-200 p-4">Lead created</th>
                          <th scope="col" className="mw-200 p-4">Update time</th>
                          {/* <th scope="col" className="mw-200 p-4">Address</th> */}
                          <th scope="col" className="mw-200 p-4">Organization</th>
                          <th scope="col" className="mw-200 p-4">Contact person</th>
                          <th scope="col" className="mw-200 p-4">Value</th>
                          <th scope="col" className="mw-200 p-4">Currency</th>
                          <th scope="col" className="mw-200 p-4">visible</th>
                          <th scope="col" className="mw-200 p-4">Source</th>
                          <th scope="col" className="mw-200 p-4">Source Channel ID</th>
                          <th scope="col" className="mw-200 p-4">Source Channel</th>
                          <th scope="col" className="mw-200 p-4">Expected Date</th>
                          <th scope="col" className="mw-200 p-4">Owner</th>
                          <th scope="col" className="mw-200 p-4">Archive time</th>
                          <th scope="col" className="mw-200 p-4">Done activities</th>
                          <th scope="col" className="mw-200 p-4">Activities to do</th>
                          <th scope="col" className="mw-200 p-4">Total activities</th>
                          <th scope="col" className="mw-200 p-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedAndPaginatedData?.length > 0 ? (
                          sortedAndPaginatedData?.map((item, index) => {
                            const getFormattedDate = (date) => {
                              const today = moment()?.startOf('day');
                              const activityDate = moment(date)?.startOf('day');

                              if (activityDate.isSame(today, 'day')) {
                                return { text: 'Today', color: 'text-green-700' };
                              } else if (activityDate?.isSame(today?.subtract(1, 'day'), 'day')) {
                                return { text: 'Yesterday', color: 'text-red-600' };
                              } else if (activityDate.isBefore(today, 'day')) {
                                return { text: moment(date).format('YYYY-MM-DD'), color: 'text-red-600' };
                              } else {
                                return { text: moment(date).format('YYYY-MM-DD'), color: 'text-gray-500' };
                              }
                            };
                            const activityDetails = item?.activityDetails?.[0];
                            const formattedDate = activityDetails ? getFormattedDate(activityDetails?.endDate) : null;
                            return (
                              <tr
                                key={index}
                                className="bg-white dark:bg-gray-800 capitalize cursor-pointer text-center"
                              >
                                {permissions?.isDelete &&
                                  <td className="w-4 px-4 py-2 border border-slate-200">
                                    <label className="custom-label">
                                      <div className="bg-white dark:bg-slate-600/40 border border-slate-200 dark:border-slate-600 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px]">
                                        <input
                                          type="checkbox"
                                          checked={selectedItems.includes(
                                            item.leadID
                                          )}
                                          onChange={() =>
                                            handleCheckboxChange(item?.leadID)
                                          }
                                        />
                                      </div>
                                    </label>
                                  </td>
                                }
                                <td
                                  className="mw-200 px-4 py-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200"
                                  onClick={() => infoDetailsLeads(item?.leadID)}
                                >
                                  {item?.title}
                                </td>
                                <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200" onClick={() => infoDetailsLeads(item?.leadID)}>
                                  {item?.activityDetails?.length > 0 ?
                                    <div className="flex items-center justify-center gap-1">
                                      <p className={formattedDate?.color}>{getActivityIcon(activityDetails?.activityType)}</p>
                                      <p className={formattedDate?.color}>{formattedDate?.text}</p>
                                    </div>
                                    :
                                    <div className="flex items-center justify-center gap-2">
                                      <p className='text-yellow-600'>{<IoIosWarning size={17} />}</p>
                                      <p className='text-yellow-600'>No activity</p>
                                    </div>}
                                </td>
                                <td
                                  className="mw-200 px-4 py-2 text-sm text-white whitespace-nowrap dark:text-gray-400 border border-slate-200"
                                >
                                  <span
                                    className="text-sm me-2 px-2.5 py-0.5  rounded  uppercase"
                                    style={{ backgroundColor: item?.color }}
                                  >
                                    {item?.labelName}
                                  </span>
                                </td>
                                <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                  {FormatDateMoment(item?.createdDate)}
                                </td>
                                <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                  {item?.updatedDate ? moment(item?.updatedDate).format('LLL') : ''}
                                </td>
                                {/* <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                {item?.address}
                              </td> */}
                                <td
                                  className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200"
                                >
                                  {item?.organizationName}
                                </td>
                                <td
                                  className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200"
                                >
                                  {item?.personName}
                                </td>
                                <td
                                  className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200"
                                >
                                  {` ${item?.currencyCode !== null ? item?.currencyCode : ''} ${item?.value?.toLocaleString('en-IN')}`}
                                </td>
                                <td
                                  className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200"
                                >
                                  {item?.currencyName}
                                </td>
                                <td
                                  className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200"
                                >
                                  {item?.visibleName}
                                </td>
                                <td
                                  className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200"
                                >
                                  {item?.sourceType}
                                </td>
                                <td className="mw-200 p-3 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                  {item?.sourceChannelID}
                                </td>
                                <td className="mw-200 p-3 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                  {item?.sourceChannel}
                                </td>
                                <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200" >
                                  {item?.expectedCloseDate ? FormatDateMoment(item?.expectedCloseDate) : ''}
                                </td>
                                <td
                                  className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200"
                                  onClick={() => infoDetailsLeads(item?.leadID)}
                                >
                                  {item?.ownerID}
                                </td>
                                <td
                                  className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200"
                                  onClick={() => infoDetailsLeads(item?.leadID)}
                                >
                                  {item?.isArchived && item?.archiveTime ? moment(item?.archiveTime).format('LLL') : ''}
                                </td>
                                <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer ">{item?.doneActivity}</td>
                                <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer ">{item?.activitiesToDo}</td>
                                <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer ">{item?.totalActivities}</td>

                                <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 flex justify-center ">
                                  <div className="flex gap-3">
                                    {permissions?.isSave && (
                                      <div
                                        data-tip
                                        data-for="Edit"
                                        className="relative group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={() => editLead(item?.leadID)}
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
                                          LeadID: item?.leadID,
                                          IsArchived: item?.isArchived ? false : true,
                                        };
                                        dispatch(archiveLeadData(payload)).then((res)=>{
                                          setLoadFist(true);
                                        })
                                      }}
                                    >
                                      <GoArchive />
                                      <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                          {item?.isArchived ? 'UnArchive' : 'Archive'}
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
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Pagination name='Leads' handlePageChange={handlePageChange} setCurrentPage={setCurrentPage} currentPage={currentPage} sidebarOpen={sidebarOpen} totalPages={totalPages} length={store?.leadsData?.length} setrowsPerPage={setrowsPerPage} rowsPerPage={rowsPerPage} />
                </>
              )}
            </div>

            <Footer />
          </div>
        </div>
      </div>
      {openModel && (
        <AddLeads
          togglemodelLead={togglemodelLead}
          leadData={leadData}
          setLoadFistInbox={setLoadFist}
        />
      )}
    </>
  );
};

export default Inbox;

