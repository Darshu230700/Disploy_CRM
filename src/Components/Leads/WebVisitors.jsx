/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaPlus } from "react-icons/fa6";
import IMG from "../../Images/widgets/Web_Visitors1.svg";
import IMG1 from "../../Images/widgets/Web_Visitors2.svg";
import IMG2 from "../../Images/widgets/Web_Visitors3.svg";
import IMG3 from "../../Images/widgets/Web_Visitors4.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
const WebVisitors = ({
  isVisible,
  setIsVisible,
  setSidebarOpen,
  sidebarOpen,
  isDark, setIsDark
}) => {
  return (
    <>
      <Sidebar
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      <Navbar isVisible={isVisible} setIsVisible={setIsVisible} isDark={isDark} setIsDark={setIsDark} />
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
                          Web Visitors
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
                          <li className="text-gray-500">Leads</li>
                          <li>
                            <span className="text-gray-500 mx-2">/</span>
                          </li>
                          <li className="text-blue-600 hover:text-blue-700">
                            Web Visitors
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
            <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
              <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12">
                <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative p-5">
                  <div className="text-center py-3 px-4 dark:text-slate-300/70 relative">
                    <h4 className="font-medium text-3xl">Web Visitors</h4>
                    <p className="mb-4">
                      Uncover hot leads and hidden opportunities amongst
                      companies visiting your site. Contact your leads before
                      competitors are even aware of them.
                    </p>
                    <p className="mb-4">
                      <a
                        href="#New_Web_Form"
                        data-modal-toggle="modal"
                        className="focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                      >                      
                        <FaPlus className="text-3xl mr-2" />
                        Start a free trial
                      </a>
                    </p>
                    <p className="mb-4">
                      14 days for free. Add-on price starts from $49 monthly.{" "}
                      <a href="#" className="text-blue-600 text-xl">
                        {" "}
                        More about pricing{" "}
                      </a>
                    </p>
                    <p className="flex justify-center items-center">
                      <span className="mr-3">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.7733 4.36868C15.3897 3.50142 13.7534 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.3416 20.9293 10.6997 20.7951 10.0815"
                            stroke="#08A742"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            className="svg-check"
                            d="M7.33557 11.582L10.7036 14.9057C10.7036 14.9057 15.6584 8.89522 19.7447 6.21588"
                            stroke="#26292C"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </span>{" "}
                      See the list of organizations who visit your website
                    </p>
                  </div>
                  <div className="flex-auto p-4">
                    <div className="bg-white dark:bg-slate-800 w-full relative p-3 h-full text-center sm:mx-auto lg:max-w-4xl">
                      <Swiper
                        className="effectSwiper"
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={true}
                        modules={[Pagination]}
                      >
                        <SwiperSlide>
                          <div className="flex justify-center">
                            <img src={IMG} alt="" />
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className="flex justify-center">
                            <img src={IMG1} alt="" />
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className="flex justify-center">
                            <img src={IMG2} alt="" />
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className="flex justify-center">
                            <img src={IMG3} alt="" />
                          </div>
                        </SwiperSlide>
                      </Swiper>
                      <div className="flex-auto p-4">
                        <a
                          href="#watch_video_pop"
                          data-modal-toggle="modal"
                          className="px-5 py-3 text-xl font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mb-4"
                        >Watch video (30:50)</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
export default WebVisitors;
