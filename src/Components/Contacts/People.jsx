/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import AddEditPerson from "./AddEditPerson";
import { getAllPerson, getPersonByID, handlePersonDelete } from "../../Redux/PersonSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router";
import Loading from "../Common/Loading";
import Footer from "../Common/Footer";
import sweetAlert from "../Common/sweetAlert";
import { FaPlus } from "react-icons/fa6";
import { RxDotsHorizontal } from "react-icons/rx";
import * as XLSX from 'xlsx';
import axios from "axios";
import { IMPORT_PERSON } from "../Common/API";
import toast from "react-hot-toast";
import moment from "moment";
import { FormatDateMoment } from "../Common/defaultValue";
import Pagination from "../Common/Pagination";

import { getMenuAll, getMenuPermission } from "../../Redux/SideBarSlice";

const People = ({
  isVisible,
  setIsVisible,
  setSidebarOpen,
  sidebarOpen,
  isDark,
  setIsDark,
}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.root.auth);
  const authToken = `Bearer ${token}`;
  const store = useSelector((state) => state?.root?.Person);
  const [openModel, setOpenModel] = useState(false);
  const [Person, setPerson] = useState([]);
  const [loading, setloading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedPepoleIds, setSelectedPepoleIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedField, setSortedField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loadFirst, setloadFirst] = useState(true);
  const [AciteOption, setAciteOption] = useState(false);
  const [permissions, setPermissions] = useState({
    isDelete: false,
    isSave: false,
    isView: false,
  });

  useEffect(() => {
    dispatch(getMenuAll()).then((item) => {

      const findData = item.payload?.data?.menu.reduce((result, menuItem) => {
        if (menuItem.submenu && Array.isArray(menuItem.submenu)) {
          const submenuItem = menuItem.submenu.find((submenuItem) => submenuItem.pageName === "People");
          if (submenuItem) { result = submenuItem; }
        }
        return result;
      }, null);

      if (findData) {
        const ItemID = findData.moduleID;
        const payload = { UserRoleID: user.userRoleID, ModuleID: ItemID };
        dispatch(getMenuPermission(payload)).then((permissionItem) => {
          // console.log('permissionItem :>> ', permissionItem);
          if (Array.isArray(permissionItem?.payload?.data) && permissionItem?.payload?.data?.length > 0) {
            setPermissions(permissionItem?.payload?.data[0]);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (loadFirst) {
      setloading(true)
      dispatch(getAllPerson({})).then((res) => {
        const timer = setTimeout(() => {
          setloading(false)
        }, 1000);

        return () => clearTimeout(timer);
      }).catch((error) => {
        console.log('error :>> ', error);
      })
      setloadFirst(false)
    }
  }, [loadFirst, dispatch])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm]);

  const togglemodel = () => {
    setOpenModel(!openModel);
    setPerson([]);
  };

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

  const filteredPeople = store?.getAllPerson && store?.getAllPerson.filter((item) =>
    item?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [rowsPerPage, setrowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortData(filteredPeople, sortedField, sortOrder).slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(filteredPeople.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const result = await sweetAlert.confirm("Are you sure?", "You won't be able to revert this!");
      if (result.isConfirmed) {
        await dispatch(handlePersonDelete(selectedPepoleIds)).then((res) => {
          if (res.payload.status === true) {
            setloadFirst(true)
            setSelectedPepoleIds([])
            setCurrentPage(1)
            setCurrentPage(1)
          }
          setSelectAll(false);
          sweetAlert.success("Deleted successfully");
        });
      }

    } catch (error) {
      console.error("Error:", error);
      sweetAlert.error("An error occurred");
    }
  };

  // selected row 
  const handleCheckboxChange = (productId) => {
    let updatedSelectedProductIds;

    if (selectedPepoleIds.includes(productId)) {
      updatedSelectedProductIds = selectedPepoleIds.filter((id) => id !== productId);
    } else {
      updatedSelectedProductIds = [...selectedPepoleIds, productId];
    }
    setSelectedPepoleIds(updatedSelectedProductIds);
    const allRowsSelected = updatedSelectedProductIds.length === filteredPeople.length;
    setSelectAll(allRowsSelected);
  };


  const handleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      const allProductIds = filteredPeople.map((item) => item.personMasterID);
      setSelectedPepoleIds(allProductIds);
    } else {
      setSelectedPepoleIds([]);
    }
  };
  const EditPerson = async (id) => {
    const result = await dispatch(getPersonByID(id));
    if (result) {
      setPerson(result?.payload?.data);
    }
  };

  const handleExport = () => {
    const data = store?.getAllPerson?.map(item => ({
      Name: item.name,
      LabelName: item.labelName,
      VisibleToName: item.visibleName,
      OrganizationName: item.organizationName,
      LeadTitle: item.peopleName,
      DealTitle: item.deal,
      ProjectName: '',
      ProductName: '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, "people_data.xlsx");
    setAciteOption(!AciteOption)
  };

  const uploadExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('ExcelFilePath', file);

    try {
      const response = await axios.post(IMPORT_PERSON, formData, {
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
      <div className="flex flex-1 ">
        <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
          <div className="xl:w-full">
            <div className="flex flex-wrap">
              <div className="flex items-center py-4 w-full">
                <div className="w-full">
                  <div className="">
                    <div className="flex flex-wrap justify-between">
                      <div className="items-center ">
                        <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">People</h1>
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
                            People
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

              {loading && (
                <div className="h-screen">
                  <Loading />
                </div>
              )}
              {!loading && (
                <>
                  <div className="grid gap-4 mb-3 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1 justify-end">
                      {permissions?.isSave && (
                        <button
                          className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                          onClick={() => { setOpenModel(true); }}
                        >
                          <FaPlus className="text-2xl mr-2" />Person
                        </button>
                      )}
                    </div>

                    <div className="col-span-2 sm:col-span-1 flex items-center gap-3 justify-end">
                      <input type="text" name="Serching" placeholder="Searching.." className="border border-gray-300 shadow p-3 w-72 rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {permissions?.isDelete && (
                        selectedPepoleIds && selectedPepoleIds.length > 0 && (
                          <button
                            data-tip
                            data-for="Edit"
                            className="cursor-pointer text-white bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => handleDeleteUser()}
                          >
                            <MdDeleteForever />
                          </button>
                        )
                      )}

                      <div>
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
                            {currentRows.length > 0 && (
                              <li className="block p-1 text-sm text-gray-700 hover:bg-blue dark:text-gray-200 dark:hover:bg-blue-900 hover:text-white dark:hover:text-white" onClick={handleExport}>
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
                  <div className="relative scroll-inner shadow-md sm:rounded-lg block w-full mt-5">
                    <table className="w-full border border-slate-200 table ">
                      <thead className="text-left text-md font-medium border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-center">
                          {permissions?.isDelete &&
                            <th scope="col" className="w-4 p-4">
                              <label className="custom-label">
                                <div className="bg-white dark:bg-slate-600/40 border border-slate-300 dark:border-slate-600 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px]">
                                  <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={() => handleSelectAll()}
                                  />
                                </div>
                              </label>
                            </th>
                          }
                          <th scope="col" className="mw-200 p-4">
                            <div className="flex justify-center items-center w-full">
                              Name
                              <svg
                                className="w-3 h-3 ms-1.5 cursor-pointer"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                onClick={() => handleSort("name")}
                              >
                                <path
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Zm-6.852 0 3.426 5.05-3.426-5.05Z"
                                />
                              </svg>
                            </div>
                          </th>
                          <th scope="col" className="mw-200 p-4">Label</th>
                          <th scope="col" className="mw-200 p-4">Organization</th>
                          <th scope="col" className="mw-200 p-4">Email</th>
                          <th scope="col" className="mw-200 p-4">Phone</th>
                          <th scope="col" className="mw-200 p-4">Won deals</th>
                          <th scope="col" className="mw-200 p-4">Lost deals</th>
                          <th scope="col" className="mw-200 p-4">Closed deals</th>
                          <th scope="col" className="mw-200 p-4">Open deals</th>
                          <th scope="col" className="mw-200 p-4">Done activities</th>
                          <th scope="col" className="mw-200 p-4">Activities to do</th>
                          <th scope="col" className="mw-200 p-4">Total activities</th>
                          <th scope="col" className="mw-200 p-4">Next activity date</th>
                          <th scope="col" className="mw-200 p-4">Person Created</th>
                          <th scope="col" className="mw-200 p-4">Update time</th>
                          <th scope="col" className="mw-200 p-4">Owner</th>
                          {permissions?.isSave && (<th scope="col" className="mw-200 p-4">Action</th>)}
                        </tr>
                      </thead>

                      <tbody>
                        {currentRows.length > 0 ? (
                          currentRows.map((item, index) => (
                            <tr className="bg-white dark:bg-gray-800 text-center " key={index}>
                              {permissions?.isDelete && (
                                <td className="w-4 px-4 py-2 border border-slate-200 cursor-pointer">
                                  <label className="custom-label">
                                    <div className="bg-white dark:bg-slate-600/40 border border-slate-200 dark:border-slate-600 rounded w-4 h-4  inline-block leading-4 -mb-[3px]">
                                      <input
                                        type="checkbox"
                                        checked={selectedPepoleIds?.includes(item?.personMasterID)}
                                        onChange={() => handleCheckboxChange(item?.personMasterID)}
                                      />
                                    </div>
                                  </label>
                                </td>
                              )}
                              <td className="mw-200 capitalize px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer " onClick={() => navigate(`/detailsPeople/${item.personMasterID}`)}>
                                {item.name}
                              </td>

                              <td className="mw-200 capitalize px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 "  >
                                <span className="text-sm  me-2 px-2.5 py-0.5  rounded dark:bg-yellow-900 dark:text-yellow-300 text-white uppercase" style={{ backgroundColor: item.color }}> {item.labelName}</span>
                              </td>
                              <td className="mw-200 capitalize px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer" onClick={() => navigate(`/detailsOrganization/${item.organizationID}`)}>
                                {item.organizationName}
                              </td>
                              <td className="mw-200  px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer ">
                                {item.personEmailDetails.map((x, index) => (
                                  <div key={index}>
                                    <p>{x.email}</p>
                                  </div>
                                ))}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer ">
                                {item.personPhoneDetails.map((x, index) => (
                                  <div key={index}>
                                    <p> {x.phoneNumber ? x.phoneNumber : ''}</p>
                                    {/* <p> {x.phoneNumber ? ` ${formatPhoneNumber(x.phoneNumber)}` : ''}</p> */}
                                  </div>
                                ))}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer ">{item?.wonDeal}</td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer ">{item?.lostDeal}</td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer ">{item?.closedDeal}</td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer ">{item?.openDeal}</td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer ">{item?.doneActivity}</td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer ">{item?.activitiesToDo}</td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer ">{item?.totalActivities}</td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">{item?.nextActivityDate ? FormatDateMoment(item?.nextActivityDate) : ''}</td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">{FormatDateMoment(item?.createdDate)}</td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                {item?.updatedDate ? moment(item?.updatedDate).format('LLL') : ''}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer ">
                                {/* {item.ownerID} */} Dhruv
                              </td>
                              {permissions?.isSave && (
                                <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                  <div className="flex justify-center">
                                    <div
                                      data-tip
                                      data-for="Edit"
                                      className="relative flex flex-col group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                      onClick={() => {
                                        setOpenModel(true)
                                        EditPerson(item.personMasterID)
                                      }}
                                    >
                                      <BiEdit />
                                      <div className="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Edit</span>
                                        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              )}
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
                  <Pagination setCurrentPage={setCurrentPage} handlePageChange={handlePageChange} currentPage={currentPage} sidebarOpen={sidebarOpen} totalPages={totalPages} length={store.getAllPerson.length} setrowsPerPage={setrowsPerPage} rowsPerPage={rowsPerPage} name='Person' />
                </>

              )}
            </div>
            <Footer />
          </div>
        </div>
      </div>
      {openModel && (
        <AddEditPerson
          togglemodel={togglemodel}
          Person={Person}
          setLoadFirst={setloadFirst}
        />
      )}
    </>
  );
};

export default People;
