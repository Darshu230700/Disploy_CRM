/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/scope */
import React, { useState } from 'react'
import Sidebar from '../../Common/Sidebar'
import Navbar from '../../Common/Navbar'
import Footer from "../../Common/Footer";
import { TbPlayerPlay } from 'react-icons/tb';
import { FaPlus } from 'react-icons/fa6';
import IMG from "../../../Images/widgets/web-form1.svg"
import IMG1 from "../../../Images/widgets/web-form2.svg"
import IMG2 from "../../../Images/widgets/web-form3.svg"
import IMG3 from "../../../Images/widgets/web-form4.svg"
import IMG4 from "../../../Images/widgets/LeadBooster_video.svg"
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Loading from "../../Common/Loading"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { BiEdit } from 'react-icons/bi';
import { MdContentCopy, MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveDeActiveWebForm, getAllGridWebForms, getDeleteWebForm, getDuplicateWebForm, } from '../../../Redux/WebFormSlice';
import { useEffect } from 'react';
import { ACTIVE_DEACTIVE_WEBFORM, DELETE_WEBFORM, DUPLICATE_WEBFORM, GET_ALL_GRID_WEBFORMS, } from '../../Common/API';
import sweetAlert from '../../Common/sweetAlert';
import { formatDate, PageNumber } from '../../Common/Common';


const WebForms = ({ isVisible, setIsVisible, setSidebarOpen, sidebarOpen, isDark, setIsDark }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.root.auth);
  const authToken = `Bearer ${token}`;
  const [allWebForm, setAllWebForm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(10);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = allWebForm?.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math?.ceil(allWebForm?.length / rowsPerPage);


  useEffect(() => {
    fetchWebForm()
  }, [])

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const fetchWebForm = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${GET_ALL_GRID_WEBFORMS}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    };

    dispatch(getAllGridWebForms({ config })).then((res) => {
      setAllWebForm(res?.payload?.data)
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1000);

      return () => clearTimeout(timer);
    }).catch((error) => {
      console.log('error', error)
      setLoading(false)
    })
  }



  const handleEditWebForm = (Item) => {
    navigate(`/WebForms/createForm/${Item?.webFromMasterID}`, {
      state: { selectForm: "", },
    })
  }

  const handleDeleteWebForm = async (Item) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${DELETE_WEBFORM}?WebFromMasterIDs=${Item?.webFromMasterID}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    };
    try {
      const result = await sweetAlert.confirm('Are you sure?', 'Are you sure you want to delete this!');
      if (result.isConfirmed) {
        dispatch(getDeleteWebForm({ config })).then((res) => {
          fetchWebForm()
          sweetAlert.success('Deleted successfully');
        })
      }
    } catch (error) {
      console.error('Error:', error);
      sweetAlert.error('An error occurred');
    }
  }

  const handleDuplicateWebForm = (Item) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${DUPLICATE_WEBFORM}?WebFromMasterID=${Item?.webFromMasterID}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    };

    dispatch(getDuplicateWebForm({ config })).then((res) => {
      fetchWebForm()
    }).catch((error) => {
      console.log('error', error)
    })
  }

  const handleDeactiveWebForm = (Item) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${ACTIVE_DEACTIVE_WEBFORM}?WebFromMasterID=${Item?.webFromMasterID}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    };

    dispatch(getActiveDeActiveWebForm({ config })).then((res) => {
      fetchWebForm()
    }).catch((error) => {
      console.log('error', error)
    })
  }

  return (
    <>
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <Navbar isVisible={isVisible} setIsVisible={setIsVisible} isDark={isDark} setIsDark={setIsDark} />
      <div className="flex flex-1 ">
        <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] h-full px-4 pt-[54px] duration-300">
          <div className='h-full'>
            {loading && (
              <div className='h-screen'><Loading /></div>
            )}
            {!loading && (
              <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
                <div className="xl:w-full">
                  <div className="flex flex-wrap">
                    <div className="flex items-center py-4 w-full">
                      <div className="w-full">
                        <div className="">
                          <div className="flex flex-wrap justify-between">
                            <div className="items-center ">
                              <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">Web Forms</h1>
                              <ol className="list-reset flex text-sm">
                                <li><a href="/Analytics" className="text-gray-500">Disploy</a></li>
                                <li><span className="text-gray-500 mx-2">/</span></li>
                                <li className="text-gray-500">Leads</li>
                                <li><span className="text-gray-500 mx-2">/</span></li>
                                <li className="text-blue-600 hover:text-blue-700">Web Forms</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {!loading && (allWebForm?.length === 0 || allWebForm === null) && (
                  <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
                    <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                      <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12">
                        <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative p-5">
                          <div className="text-center py-3 px-4 dark:text-slate-300/70 relative" >
                            <h4 className="font-medium text-3xl">Web Forms</h4>
                            <p className="mb-4">Ensure your leads’ vital data is captured with intuitive forms that are easy to share.</p>
                            <p>
                              <a
                                onClick={() => navigate("/WebForms/Addwebform")}
                                data-modal-toggle="modal" className="focus:outline-none cursor-pointer text-white bg-green-500 hover:bg-green-600 font-medium rounded-full text-lg px-5 py-2 dark:bg-green-500 dark:hover:bg-green-600 mb-4 inline-flex items-center">
                                <FaPlus className='text-3xl mr-2' />Try Web Forms</a>
                            </p>
                          </div>
                          <div className="flex-auto p-4">
                            <div className="bg-white dark:bg-slate-800 w-full relative p-3 h-full text-center sm:mx-auto lg:max-w-4xl">
                              <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={50}
                                slidesPerView={1}
                                navigation
                              // onSwiper={(swiper) => console.log(swiper)}
                              // onSlideChange={() => console.log('slide change')}
                              >
                                <SwiperSlide>
                                  <div className="swiper-slide flex justify-center">
                                    <img src={IMG} alt="" />
                                  </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <div className="swiper-slide flex justify-center">
                                    <img src={IMG1} alt="" />
                                  </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <div className="swiper-slide flex justify-center">
                                    <img src={IMG2} alt="" />
                                  </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <div className="swiper-slide flex justify-center">
                                    <img src={IMG3} alt="" />
                                  </div>
                                </SwiperSlide>
                              </Swiper>
                              <div className="flex-auto p-4">
                                <a href="#watch_video_pop" data-modal-toggle="modal" className="px-5 py-3 text-xl font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mb-4">Watch video (31:10)</a>
                              </div>

                              <div className="border-b border-solid border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70 mb-5">
                                <div className="flex-auto p-4">
                                  <h3 className="font-medium text-3xl mb-4">Get more leads with LeadBooster</h3>
                                  <a href="#watch_video_pop" data-modal-toggle="modal" className="relative inline-block h-full">
                                    <img src={IMG4} alt="existing-leads" className=" inline-block" />
                                    <span className="absolute w-20 h-20 top-10 top-2/4 left-1/2 rounded-full bg-red-500 flex items-center justify-center -ml-40">
                                      <TbPlayerPlay className="text-white text-4xl" />
                                    </span>
                                    <span className="absolute right-3 bottom-4 p-2 bg-primary-500/10 text-primary-500 text-[11px] font-medium mr-1 px-2.5 py-0.5 rounded bg-white">01:43</span>
                                  </a>
                                  <p className="my-4"><a href="#" className="text-blue-600 text-xl"> Learn More</a></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!loading && allWebForm?.length > 0 && (
                  <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-10 ">
                    <div className="flex-auto pb-4">
                      <div className="w-full">
                        <div className="flex flex-row justify-end items-center px-3">
                          <div className="flex items-center">
                            <button
                              data-modal-toggle="modal"
                              className="relative group items-center gap-3 focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                              onClick={() => navigate("/WebForms/Addwebform")}
                            >
                              <FaPlus className=" font-extrabold" size={15} />
                              Web Form
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <>
                      <div className="relative scroll-inner shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-md font-medium border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="p-4 border border-slate-200 text-left">
                                WEB FORMS
                              </th>
                              <th scope="col" className="p-4 border border-slate-200">
                                VIEWED
                              </th>
                              <th scope="col" className="p-4 border border-slate-200">
                                INTERACTED
                              </th>
                              <th scope="col" className="p-4 border border-slate-200">
                                SUBMITTED
                              </th>
                              <th scope="col" className="p-4 border border-slate-200">
                                CONVERSION
                              </th>
                              <th scope="col" className="p-4 border border-slate-200">
                                STATUS
                              </th>
                              <th scope="col" className="p-4 border border-slate-200">
                                ACTION
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentRows?.length > 0 ?
                              currentRows?.map((item, index) => {
                                return (
                                  <tr key={index} className="bg-white cursor-pointer border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td scope="row" className="p-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left" onClick={() => handleEditWebForm(item)}>
                                      <div>
                                        <div className='mb-1 text-xl font-semibold'>
                                          {item?.name}
                                        </div>
                                        <div className='flex flex-row gap-2 items-center'>
                                          <span>{item?.userName}</span>
                                          <span>Created on {formatDate(item?.createdDate)}</span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 capitalize border border-slate-200" onClick={() => handleEditWebForm(item)}>
                                      {item?.viewed}
                                    </td>
                                    <td className="p-4 capitalize border border-slate-200" onClick={() => handleEditWebForm(item)}>
                                      {item?.interacted}
                                    </td>
                                    <td className="p-4 capitalize border border-slate-200" onClick={() => handleEditWebForm(item)}>
                                      0
                                    </td>
                                    <td className="px-6 py-4 capitalize border border-slate-200" onClick={() => handleEditWebForm(item)}>
                                      {item?.conversion}%
                                    </td>
                                    <td className={`px-6 py-4  capitalize border border-slate-200`} onClick={() => handleEditWebForm(item)}>
                                      <span class={` text-sm  me-2 px-2.5 py-1.5 rounded  font-bold ${item?.isActive ? 'bg-green-100 text-green-700' : 'bg-rose-200  text-red-600'}`}>{item?.isActive ? 'ACTIVE' : 'INACTIVE'}</span>
                                    </td>
                                    <td className="p-4 border border-slate-200">
                                      <div className="flex justify-center gap-4">
                                        <div data-tip data-for="Edit" className="relative flex flex-col items-center group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                          onClick={() => handleEditWebForm(item)}
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
                                          onClick={() => handleDeleteWebForm(item)}
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
                                          onClick={() => handleDuplicateWebForm(item)}
                                        >
                                          <MdContentCopy />
                                          <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                            <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Copy</span>
                                            <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                          </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                          <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={item?.isActive}
                                            id={`Active_${item?.webFromMasterID}`}
                                            onClick={() => handleDeactiveWebForm(item)}
                                          />
                                          <label
                                            htmlFor={`Active_${item?.webFromMasterID}`}
                                            className={`w-10 h-5  rounded-full flex items-center p-1 cursor-pointer peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-green-500 transition-colors duration-300 ease-in-out ${item?.isActive === true ? ' bg-green-500' : 'bg-red-500'}`}
                                          >
                                            <span className={`w-4 h-4  rounded-full shadow-md transform transition-transform duration-300 ease-in-out bg-white ${item?.isActive === true ? 'translate-x-5  ' : 'bg-white'}`}></span>
                                          </label>
                                        </label>

                                      </div>
                                    </td>
                                  </tr>
                                )
                              }) : (
                                <td colSpan={6}>
                                  <p className="text-center p-2">Not Found.</p>
                                </td>
                              )}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex lg:flex-row lg:justify-between md:flex-row md:justify-between sm:flex-row sm:justify-between flex-col justify-end p-5 gap-3">
                        <div className="flex items-center">
                          <span className="text-gray-500 font-semibold">{`Total ${allWebForm?.length} ${'WebForms'}`}</span>
                        </div>
                        <div className="flex justify-end">
                          {allWebForm?.length > 10 && (
                            <select
                              className={`px-1 mr-2 border rounded-lg `}
                              value={rowsPerPage}
                              onChange={(e) => { setrowsPerPage(e.target.value); setCurrentPage(1) }}
                            >
                              {PageNumber.map((x) => (
                                <option key={x} value={x}>{x}</option>
                              ))}
                            </select>
                          )}
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`font-semibold flex cursor-pointer items-center justify-center px-3 h-8 me-3 text-sm rounded-lg border ${allWebForm?.length > 10 ? 'bg-sky-500 text-white border-gray-700' : 'border-gray-700 text-gray-500 border-gray-300'} ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                            <span className="text-gray-500">{`Page ${currentPage} of ${totalPages}`}</span>
                          </div>
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`font-semibold flex cursor-pointer items-center justify-center px-3 h-8 text-sm rounded-lg border ${allWebForm?.length > 10 ? 'bg-sky-500 text-white border-gray-700' : 'bg-white text-gray-500 border-gray-300'} ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    </>
                  </div>
                )}
                <Footer />
              </div>
            )}
          </div>


        </div>
      </div>
    </>
  )
}

export default WebForms