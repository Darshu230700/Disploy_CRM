/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaPlus } from "react-icons/fa6";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {
  TbBrandGoogleAnalytics,
  TbStairsUp,
  TbTallymark4,
} from "react-icons/tb";
import AddDeals from "./AddDeals";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDeal,
  getDealByID,
  getAllDeals,
  handleAddDeal,
} from "../../Redux/DealSlice";

import { useNavigate } from "react-router-dom";
import Loading from "../Common/Loading";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Month, monthList, pipelineMapping } from "../Common/Common";
import toast from "react-hot-toast";
import sweetAlert from "../Common/sweetAlert";
import moment from "moment";
import DealListView from "./DealListView";



const Deals = ({
  isVisible,
  setIsVisible,
  setSidebarOpen,
  sidebarOpen,
  isDark,
  setIsDark,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state?.root?.Deal);

  const [loadFrist, setloadFrist] = useState(true);
  const [EditDeal, setEditDeal] = useState([]);
  const [loading, setloading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("list");//pipeline
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDealIds, setSelectedDealIds] = useState([]);
  const [lists, setLists] = useState({
    characters: [],
    secondCharacters: [],
    thirdCharacters: [],
    fourthCharacters: [],
    fifthCharacters: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(10);

  const [showCalendar, setShowCalendar] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [monthPage, setMonthPage] = useState(1);
  const [months, setMonths] = useState(monthList);
  const [sortedField, setSortedField] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");


  useEffect(() => {
    if (loadFrist) {
      setloading(true)
      dispatch(getAllDeals({})).then((res) => {
        const timer = setTimeout(() => {
          setloading(false)
        }, 1000);
        return () => clearTimeout(timer);

      }).catch((error) => {
        console.log('error :>> ', error);
      })
      setloadFrist(false);
    }
  }, [loadFrist, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDate]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setloadFrist(true);
  };

  const toggleModal = () => { setShowModal(!showModal); setEditDeal([]); };

  const Editdeal = async (id) => {
    const result = await dispatch(getDealByID(id));
    if (result) {
      setEditDeal(result?.payload?.data);
    }
  };

  const filteredDeal = store?.getDeals ? store?.getDeals?.filter((item) => Object.values(item).some((value) => value && value?.toString().toLowerCase().includes(searchTerm?.toLowerCase()))) : []

  const handleDeleteDeal = async () => {
    try {
      const result = await sweetAlert.confirm("Are you sure?", "You won't be able to revert this!");

      if (result?.isConfirmed) {
        await dispatch(deleteDeal(selectedDealIds)).then((res) => {
          if (res.payload.status === true) {
            setloadFrist(true)
            setCurrentPage(1)
          }
        });
        setSelectedDealIds([]);
        setSelectAll(false);
        sweetAlert.success("Deleted successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      sweetAlert.error("An error occurred");
    }
  };

  const handleCheckboxChange = (productId) => {
    let updatedSelectedProductIds;
    if (selectedDealIds.includes(productId)) {
      updatedSelectedProductIds = selectedDealIds.filter((id) => id !== productId);
    } else {
      updatedSelectedProductIds = [...selectedDealIds, productId];
    }
    setSelectedDealIds(updatedSelectedProductIds);
    const allRowsSelected =
      updatedSelectedProductIds.length === filteredDeal.length;
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
  const currentRows = sortData(filteredDeal, sortedField, sortOrder).slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(filteredDeal?.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allDealIds = filteredDeal?.map((item) => item.dealID);
      setSelectedDealIds(allDealIds);
    } else {
      setSelectedDealIds([]);
    }
  };

  const updatePipelineStage = (data, pipelineStage, formattedDate) => {
    setloading(true);
    let Params = {
      ...data,
      pipelineStage: pipelineStage,
      expectedCloseDate: formattedDate && formattedDate ? formattedDate : data?.expectedCloseDate,
    };

    try {
      dispatch(handleAddDeal(Params)).then((res) => {
        toast.remove();
        if (res?.payload?.status === true) {
          setTimeout(() => {
            toast.success('Deal Droped successfully!')
            setloadFrist(true);
          }, 100);
        }
      });
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  // Drag-drop pipline
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

    const sourceList = getList(source?.droppableId);
    const destList = getList(destination?.droppableId);

    if (sourceList && destList) {
      const draggedItemId = parseInt(result.draggableId);
      const draggedItem = filteredDeal.find((item) => {
        return item.dealID === draggedItemId
      });

      const updatedSourceList = sourceList.filter((item) => { return item?.dealID !== draggedItemId });

      const updatedDestList = [
        ...destList.slice(0, destination?.index),
        draggedItem,
        ...destList.slice(destination?.index),
      ];

      setList(source?.droppableId, updatedSourceList);
      setList(destination?.droppableId, updatedDestList);
      const pipelineStage = pipelineMapping[destination?.droppableId];
      updatePipelineStage(draggedItem, pipelineStage, draggedItem?.createdDate);
    }
  };

  // Drag-drop date
  const totalNumberOfPages = Math.ceil(Month?.length - 3);
  const startIndex = monthPage - 1;
  const endIndex = Math?.min(startIndex + 4, Month?.length);
  const currentColumn = Month?.slice(startIndex, endIndex);

  const handleBoxPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalNumberOfPages) {
      setMonthPage(newPage);
    }
  };

  const getDateDeal = (droppableId) => {
    return months[droppableId] || [];
  };

  const setDateDeal = (droppableId, list) => {
    setMonths((prevMonths) => ({
      ...prevMonths,
      [droppableId]: list,
    }));
  };

  const handleOnDragEndDate = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    const sourceList = getDateDeal(source?.droppableId);
    const destList = getDateDeal(destination?.droppableId);

    if (sourceList && destList) {
      const draggedItemId = parseInt(result?.draggableId);
      const draggedItem = filteredDeal?.find((item) => item?.dealID === draggedItemId);
      const updatedSourceList = sourceList?.filter((item) => item?.dealID !== draggedItemId);
      const updatedDestList = [...destList?.slice(0, destination?.index), draggedItem, ...destList?.slice(destination?.index),];

      setDateDeal(source.droppableId, updatedSourceList);
      setDateDeal(destination?.droppableId, updatedDestList);
      const monthId = parseInt(destination?.droppableId);

      const year = moment(draggedItem && draggedItem?.expectedCloseDate).format('L').split('/')[2]
      const monthString = String(monthId).padStart(2, "0");
      const dateString = moment(draggedItem && draggedItem?.expectedCloseDate).format('L').split('/')[1];
      const formattedDate = `${year}-${monthString}-${dateString}`;

      updatePipelineStage(draggedItem, draggedItem?.pipelineStage, formattedDate);
      setShowCalendar(draggedItemId)
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
                        <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">Deals</h1>
                        <ol className="list-reset flex text-sm">
                          <li><a href="/Analytics" className="text-gray-500">Disploy</a></li>
                          <li><span className="text-gray-500 mx-2">/</span></li>
                          <li className="text-gray-500">CRM</li>
                          <li><span className="text-gray-500 mx-2">/</span></li>
                          <li className="text-blue-600 hover:text-blue-700">Deals</li>
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
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                <ul
                  className="flex flex-wrap -mb-px text-sm font-medium text-center"
                  id="myTab"
                  data-tabs-toggle="#myTabContent"
                  role="tablist"
                >
                  <li className="mr-2" role="presentation">
                    <button
                      className={`relative group inline-block p-2 rounded-t-lg border-b-2 ${activeTab === "pipeline"
                        ? "border-blue-400"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        }`}
                      id="pipeline-tab"
                      data-tabs-target="#pipeline"
                      type="button"
                      role="tab"
                      aria-controls="pipeline"
                      aria-selected={activeTab === "pipeline"}
                      onClick={() => handleTabClick("pipeline")}
                    >
                      <TbBrandGoogleAnalytics className="text-slate-500 dark:text-slate-300 group-hover:text-blue-400 mx-auto mb-1 block text-center text-2xl leading-9" />
                      <div className="absolute left-0 right-0 bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                          Pipeline
                        </span>
                        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                      </div>
                    </button>
                  </li>
                  <li className="mr-2" role="presentation">
                    <button
                      className={`relative group inline-block p-2 rounded-t-lg border-b-2 ${activeTab === "list"
                        ? "border-blue-400"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        }`}
                      id="list-tab"
                      data-tabs-target="#list"
                      type="button"
                      role="tab"
                      aria-controls="list"
                      aria-selected={activeTab === "list"}
                      onClick={() => handleTabClick("list")}
                    >
                      <TbTallymark4 className="text-slate-500 dark:text-slate-300 group-hover:text-blue-400 mx-auto mb-1 block text-center text-2xl leading-9" />
                      <div className="absolute left-0 right-0 bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                          list
                        </span>
                        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                      </div>
                    </button>
                  </li>
                  <li className="mr-2" role="presentation">
                    <button
                      className={`relative group inline-block p-2 rounded-t-lg border-b-2 ${activeTab === "forecast"
                        ? "border-blue-400"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        }`}
                      id="forecast-tab"
                      data-tabs-target="#forecast"
                      type="button"
                      role="tab"
                      aria-controls="forecast"
                      aria-selected={activeTab === "forecast"}
                      onClick={() => handleTabClick("forecast")}
                    >
                      <TbStairsUp className="text-slate-500 dark:text-slate-300 group-hover:text-blue-400 mx-auto mb-1 block text-center text-2xl leading-9" />
                      <div className="absolute left-0 right-0 bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                          Forecast
                        </span>
                        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                      </div>
                    </button>
                  </li>
                </ul>
                <div className="flex items-center align-center">
                  <button
                    className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                    onClick={() => { setShowModal(true); }}
                  >
                    <FaPlus className="text-2xl mr-2" />
                    Deals

                  </button>
                </div>
              </div>

              <div id="myTabContent">
                {!loading && activeTab === "pipeline" && (
                  <div
                    className="w-full"
                    id="pipeline"
                    role="tabpanel"
                    aria-labelledby="pipeline-tab"
                  >
                    {!loading && (
                      <DragDropContext onDragEnd={handleOnDragEnd}>
                        <div className="flex -mx-3">
                          {Object.keys(pipelineMapping).map((droppableId) => {
                            const filteredDealsForPhase = filteredDeal.filter((row) => row.pipelineStage === pipelineMapping[droppableId]);
                            const totalValueForPhase = filteredDealsForPhase.reduce((total, deal) => total + deal.value, 0);
                            return (
                              <Droppable
                                key={droppableId}
                                droppableId={droppableId}
                              >
                                {(provided) => (
                                  <div ref={provided.innerRef} className="deals-colums h-full" >
                                    <div className="w-full p-3 bg-blue-100 ">
                                      <h3 className="font-medium text-2xl text-center">{pipelineMapping[droppableId]}</h3>
                                      <p> ₹ {totalValueForPhase.toLocaleString('en-PK')}</p>
                                      {filteredDealsForPhase.map(({ dealID, title, organizationName, currencyCode, personName, contactPerson, value, }, index) => (
                                        <Draggable key={dealID} draggableId={dealID.toString()} index={index} >
                                          {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                              <div
                                                className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative mt-2"
                                                onClick={() => navigate(`/deal/${dealID}`)}
                                              >
                                                <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-2 px-4 dark:text-slate-300/70">
                                                  <h4 className="font-semibold capitalize">
                                                    <h2 className="mb-0">{title}
                                                      {/* {dealID} */}
                                                    </h2>
                                                    <p className="text-gray-900 text-xs mt-1">
                                                      {`${null === organizationName ? "" : organizationName} ${null === personName ? "" : personName}`}
                                                    </p>
                                                    <small>{`${currencyCode !== null ? currencyCode : ''} ${null === value ? "" : value}`}</small>
                                                  </h4>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </Draggable>
                                      )
                                      )}
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
                    )}
                  </div>
                )}

                {loading && (
                  <div className="flex justify-center items-center h-60">
                    <Loading />
                  </div>
                )}

                {!loading && activeTab === "list" && (
                  <DealListView
                    loading={loading}
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    handlePageChange={handlePageChange}
                    handleDeleteDeal={handleDeleteDeal}
                    selectedDealIds={selectedDealIds}
                    selectAll={selectAll}
                    handleSelectAll={handleSelectAll}
                    store={store}
                    totalPages={totalPages}
                    sidebarOpen={sidebarOpen}
                    handleSort={handleSort}
                    currentRows={currentRows}
                    handleCheckboxChange={handleCheckboxChange}
                    setShowModal={setShowModal}
                    Editdeal={Editdeal}
                    currentPage={currentPage}
                    setloadFrist={setloadFrist}
                    setrowsPerPage={setrowsPerPage}
                    rowsPerPage={rowsPerPage}
                    setCurrentPage={setCurrentPage}
                  />
                )}

                {!loading && activeTab === "forecast" && (
                  <div
                    className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
                    id="forecast"
                    role="tabpanel"
                    aria-labelledby="forecast-tab"
                  >
                    <div className="flex lg:flex-row lg:justify-end md:flex-row md:justify-between sm:flex-row sm:justify-end flex-col justify-end p-5 gap-3">
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleBoxPage(monthPage - 1)}
                          className="font-semibold flex cursor-pointer hover:bg-white hover:text-primary items-center justify-center px-3 h-8 me-3 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <svg
                            className="w-3.5 h-3.5  rtl:rotate-180"
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
                          {/* {sidebarOpen ? "Previous" : ""} */}
                        </button>
                        <div className="flex items-center me-3">
                          <span className="text-gray-500">{`Month  ${monthPage} `}</span>
                        </div>
                        <button
                          onClick={() => handleBoxPage(monthPage + 1)}
                          className="font-semibold flex hover:bg-white hover:text-primary cursor-pointer items-center justify-center px-3 h-8 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          {/* {sidebarOpen ? "Next" : ""} */}
                          <svg
                            className="w-3.5 h-3.5 rtl:rotate-180"
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
                    {loading && <Loading />}
                    {!loading && (
                      // <ForcasteDeal filteredDeal={filteredDeal} />
                      <DragDropContext onDragEnd={handleOnDragEndDate}>
                        <div className="flex -mx-3">
                          {currentColumn.map((month) => {
                            const filteredDealsByMonth = filteredDeal.filter((row) => {
                              const date = new Date(row.expectedCloseDate);
                              const rowMonth = date.getMonth() + 1; // January is 0
                              return rowMonth === month.id;
                            });
                            const totalValueForMonth = filteredDealsByMonth.reduce((total, deal) => total + deal.value, 0);
                            return (
                              <Droppable
                                key={month.id}
                                droppableId={`${month.id}`}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    className="deals-colums h-full"
                                  >
                                    <div className="w-full p-3 bg-blue-100">
                                      <h3 className="font-medium text-2xl text-center">
                                        {month.name}
                                      </h3>
                                      <p>₹ {totalValueForMonth.toLocaleString('en-PK')}</p>
                                      {filteredDealsByMonth.map((x, index) => (
                                        <Draggable
                                          key={x?.dealID}
                                          draggableId={x?.dealID.toString()}
                                          index={index}
                                        >
                                          {(provided) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                            >
                                              <div
                                                className={`bg-white dark:bg-slate-800 shadow rounded-md w-full relative mt-2 `} onClick={() => navigate(`/deal/${x?.dealID}`)}
                                              >
                                                <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-1 px-4 dark:text-slate-300/70"  >
                                                  <h4 className="font-semibold capitalize">

                                                    <h2>{x?.title}</h2>
                                                    <div className='flex gap-1  mt-1 '>
                                                      <div className="relative flex items-center group cursor-pointer text-xs">
                                                        {x?.organizationName === null ? '' : x?.organizationName}
                                                        <div className="absolute bottom-6 left-0 right-0 flex-col items-center hidden  group-hover:flex ">
                                                          <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                            Organization
                                                          </span>
                                                          <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                        </div>
                                                      </div>
                                                      <div className="relative flex items-center group cursor-pointer text-xs">
                                                        {x?.personName === null ? '' : `,  ${x?.personName}`}
                                                        <div className="absolute bottom-0 left-0 right-0 flex-col items-center hidden mb-6 group-hover:flex">
                                                          <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                            People
                                                          </span>
                                                          <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    {/* <p className="text-gray-900 text-xs">{`${x?.organizationName === null ? '' : x?.organizationName} ${x?.personName === null ? '' : `, ${x?.personName}`}`}</p> */}
                                                    <small>{`${x?.currencyCode !== null ? x?.currencyCode : ''} ${x?.value}`}</small>
                                                  </h4>
                                                </div>
                                              </div>

                                              {showCalendar === x?.dealID && (
                                                <Calendar
                                                  selected={x?.expectedCloseDate}
                                                  onChange={(date) => {
                                                    setSelectedDate(date);
                                                    const formattedDate = moment(date).format('YYYY-MM-DD');
                                                    updatePipelineStage(x, x?.pipelineStage, formattedDate);
                                                    setShowCalendar(false);
                                                  }}
                                                />
                                              )}
                                            </div>
                                          )}
                                        </Draggable>
                                      )
                                      )}
                                      {provided.placeholder}
                                    </div>
                                  </div>
                                )}
                              </Droppable>
                            )
                          })}
                        </div>
                      </DragDropContext>
                    )}
                  </div>
                )}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
      {showModal && <AddDeals toggleModal={toggleModal} Deal={EditDeal} setloadFrist={setloadFrist} />}
    </>
  );
};

export default Deals;
