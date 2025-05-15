/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import { FaPlus } from "react-icons/fa6";
import AddEditOrganizations from "./AddEditOrganizations";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData, getByIdApi, removeByIdApi, } from "../../Redux/organizationSlice";
import { BiEdit } from "react-icons/bi";
import sweetAlert from "../Common/sweetAlert";
import { useNavigate } from "react-router-dom";
import Loading from "../Common/Loading";
import { RxDotsHorizontal } from "react-icons/rx";
import * as XLSX from 'xlsx';
import axios from "axios";
import { IMPORT_ORGANIZATION } from "../Common/API";
import toast from "react-hot-toast";
import { formatDate } from "../Common/Common";
import Pagination from "../Common/Pagination";

const Organizations = ({
  isVisible,
  setIsVisible,
  setSidebarOpen,
  sidebarOpen,
  isDark,
  setIsDark,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.root.organization);
  const { token } = useSelector((state) => state.root.auth);
  const authToken = `Bearer ${token}`;

  const [organizationEdit, setOrganizationEdit] = useState([]);
  const [loadFist, setLoadFist] = useState(true);
  const [OrganizationModel, setOrganizationModel] = useState(false);
  const [loading, setloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(10);
  const [sortedField, setSortedField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectcheck, setSelectCheck] = useState(false);
  const [AciteOption, setAciteOption] = useState(false);

  useEffect(() => {
    if (loadFist) {
      setloading(true);
      dispatch(fetchApiData({}))
        .then(() => {
          const timer = setTimeout(() => {
            setloading(false);
          }, 500);
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
    if (selectcheck) {
      if (selectedItems?.length === sortedAndPaginatedData?.length) {
        setSelectAllChecked(true);
      }
    }
  }, [selectcheck, selectedItems]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (field) => {
    if (sortedField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOrder("asc");
      setSortedField(field);
    }
  };

  const filteredData = Array.isArray(store?.organizationData?.data)
    ? store?.organizationData?.data?.filter((item) =>
      Object.values(item).some((value) => value && value.toString().toLowerCase().includes(searchTerm?.toLowerCase()))) : [];

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

  const sortedAndPaginatedData = sortData(filteredData, sortedField, sortOrder).slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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
      const allIds = sortedAndPaginatedData?.map(
        (items) => items?.organizationID
      );
      setSelectedItems(allIds);
    }
  };

  const editData = async (id) => {
    setOrganizationModel(true);
    const res = await dispatch(getByIdApi(id));
    if (res) {
      const data = res.payload.data;
      setOrganizationEdit(data);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await sweetAlert.confirm('Are you sure?', "Are you sure you want to delete this!");

      if (result.isConfirmed) {
        dispatch(removeByIdApi(selectedItems));
        sweetAlert.success("Deleted successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      sweetAlert.error("An error occurred");
    }
    setCurrentPage(1) 
    setLoadFist(true);
    setSelectedItems([]);
    setSelectAllChecked(false);
  };

  const toggleModalOrganization = () => {
    setOrganizationModel(!OrganizationModel);
    setOrganizationEdit([]);
    // setLoadFist(true);
  };

  const handleExport = () => {
    const data = store?.organizationData?.data?.map(item => ({

      LabelName: item.labelName,
      OrganizationName: item.organizationName,
      Address: item.address,
      VisibleToName: item.visibleToName,
      PeopleName: '',
      DealTitle: '',
      ProjectName: '',
      LeadTitle: '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Organization");
    XLSX.writeFile(workbook, "organization.xlsx");
    setAciteOption(!AciteOption)
  };

  const uploadExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('ExcelFilePath', file);

    try {
      const response = await axios.post(IMPORT_ORGANIZATION, formData, {
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
                          Organizations
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
                            Organizations
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14">
            <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative">
              <div className="flex-auto pb-4">
                <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                  <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                    <div className="flex items-center gap-3">
                      <button
                        data-modal-toggle="modal"
                        className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                        onClick={() => toggleModalOrganization()}
                      >
                        <FaPlus className="mr-2 text-2xl" />
                        Organization

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
                            className="border border-gray-300 shadow p-3 w-full rounded"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        {selectedItems && selectedItems.length > 0 && (
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
                        <button type="button" className="font-semibold focus:outline-none  border border-gray-200  py-1.5 px-3 rounded relative ms-3"
                          onClick={() => setAciteOption(!AciteOption)}
                        >
                          <RxDotsHorizontal size={20} />
                        </button>
                        <div
                          className={`dropdown-menu p-2 top-10 right-0 z-50 absolute list-nonedivide-y divide-gray-100 rounded border-slate-700 md:border-whitetext-base drop-shadow-md dark:divide-gray-600 bg-white dark:bg-slate-800  ${AciteOption === true ? "block" : "hidden"}`}
                          id="navUserdata"
                        >
                          <ul className=" cursor-pointer  " aria-labelledby="navUserdata">
                            {store?.organizationData?.data && store?.organizationData?.data.length > 0 && (
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
                  </div>
                </div>
              </div>
              {loading && (
                <div className="h-screen"><Loading /></div>
              )}
              {!loading && (
                <>
                  <div className="relative scroll-inner shadow-md sm:rounded-lg block w-full">
                    <table className="w-full border border-slate-200 table">
                      <thead className="text-center text-md font-medium border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-center">
                          <th scope="col" className="w-4 p-4">
                            <label className="custom-label">
                              <div className="bg-white dark:bg-slate-600/40 border border-slate-300 dark:border-slate-600 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px]">
                                <input
                                  type="checkbox"
                                  className=""
                                  checked={selectAllChecked}
                                  onChange={() => handleSelectAll()}
                                />
                              </div>
                            </label>
                          </th>
                          <th scope="col" className="mw-200 p-4">
                            <div className="flex justify-center items-center w-full">
                              Name
                              <svg
                                className="w-3 h-3 ms-1.5 cursor-pointer"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                onClick={() => handleSort("organizationName")}
                              >
                                <path
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Zm-6.852 0 3.426 5.05-3.426-5.05Z"
                                />
                              </svg>
                            </div>
                          </th>
                          <th scope="col" className="font-semibold mw-200 p-3 text-center text-xs tracking-wider text-gray-700">
                            Label
                          </th>
                          <th scope="col" className="font-semibold mw-200 p-3 text-center text-xs tracking-wider text-gray-700">
                            Address
                          </th>
                          <th
                            scope="col"
                            className="font-semibold mw-200 p-3 text-center text-xs tracking-wider text-gray-700"
                          >
                            People
                          </th>
                          <th
                            scope="col"
                            className="font-semibold mw-200 p-3 text-center text-xs tracking-wider text-gray-700"
                          >
                            Open deals
                          </th>
                          <th scope="col" className="font-semibold mw-200 p-3 text-center text-xs tracking-wider text-gray-700">Closed deals</th>
                          <th scope="col" className="font-semibold mw-200 p-3 text-center text-xs tracking-wider text-gray-700">Lost deals</th>
                          <th scope="col" className="font-semibold mw-200 p-3 text-center text-xs tracking-wider text-gray-700">Won deals</th>
                          <th scope="col" className="font-semibold mw-200 p-3 text-center text-xs tracking-wider text-gray-700">Done  activities</th>
                          <th scope="col" className="font-semibold mw-200 p-3 text-center text-xs tracking-wider text-gray-700">Activities to do</th>
                          <th scope="col" className="font-semibold mw-200 p-3 text-center text-xs tracking-wider text-gray-700">Total  activities</th>
                          <th scope="col" className="font-semibold mw-200 p-3 text-center text-xs tracking-wider text-gray-700">Next activity</th>
                          <th scope="col" className="font-semibold mw-200 p-3 text-center text-xs tracking-wider text-gray-700">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedAndPaginatedData ? (
                          sortedAndPaginatedData?.length > 0 ? (
                            sortedAndPaginatedData?.map((item, index) => (
                              <tr
                                key={index}
                                className="bg-white dark:bg-gray-800 capitalize cursor-pointer text-center"
                              >
                                <td className="w-4 p-4 border border-slate-200">
                                  <label className="custom-label">
                                    <div className="bg-white dark:bg-slate-600/40 border border-slate-200 dark:border-slate-600 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px]">
                                      <input
                                        type="checkbox"
                                        checked={selectedItems.includes(
                                          item.organizationID
                                        )}
                                        onChange={() => handleCheckboxChange(item.organizationID)}
                                      />
                                    </div>
                                  </label>
                                </td>
                                <td
                                  className="mw-200 p-3 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200"
                                  onClick={() => navigate(`/detailsOrganization/${item.organizationID}`)
                                  }
                                >
                                  {item.organizationName}
                                </td>
                                <td className="mw-200 p-3 text-sm text-white text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                  <span
                                    className="text-xs font-semibold px-2 py-1 uppercase rounded"
                                    style={{ backgroundColor: item?.color }}
                                  >
                                    {item?.labelName}
                                  </span>
                                </td>
                                <td className="max-w-52 truncate p-3 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                  {item?.address}
                                </td>
                                <td className="mw-200 p-3 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                  {item?.peopleCount}
                                </td>
                                <td className="mw-200 p-3 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                  {item?.openDeal}
                                </td>
                                <td className="mw-200 p-3 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">{item?.closedDeal}</td>
                                <td className="mw-200 p-3 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">{item?.lostDeal}</td>
                                <td className="mw-200 p-3 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">{item?.wonDeal}</td>
                                <td className="mw-200 p-3 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">{item?.doneActivity}</td>
                                <td className="mw-200 p-3 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">{item?.activitiesToDo}</td>
                                <td className="mw-200 p-3 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">{item?.totalActivities}</td>
                                <td className="mw-200 p-3 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                  {item?.nextActivityDate ? formatDate(item?.nextActivityDate) : ''}
                                </td>
                                <td className="mw-200 p-3 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                  <div className="flex justify-center gap-4">
                                    <div
                                      data-tip
                                      data-for="Edit"
                                      className="relative flex flex-col group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                      onClick={() =>
                                        editData(item.organizationID)
                                      }
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
                            <tr>
                              <td colSpan="8" className="text-center py-4">
                                Data not found
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center py-4">
                              Loading...
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Pagination handlePageChange={handlePageChange} currentPage={currentPage} setCurrentPage={setCurrentPage} sidebarOpen={sidebarOpen} totalPages={totalPages} length={store?.organizationData?.data?.length} setrowsPerPage={setrowsPerPage} rowsPerPage={rowsPerPage} name='Organization' />

                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {OrganizationModel && (
        <AddEditOrganizations
          toggleModalOrganization={toggleModalOrganization}
          organization={organizationEdit} setLoadFist={setLoadFist}
        />
      )}
    </>
  );
};

export default Organizations;
