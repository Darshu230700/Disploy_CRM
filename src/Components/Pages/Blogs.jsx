/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaArrowRightLong } from "react-icons/fa6";
import IMG from "../../Images/widgets/img-4.jpg"
const Blogs = ({ isVisible, setIsVisible, setSidebarOpen, sidebarOpen ,isDark, setIsDark}) => {
  return (
    <>
        <Sidebar
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
        <Navbar isVisible={isVisible} setIsVisible={setIsVisible} isDark={isDark} setIsDark={setIsDark}/>
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
                            Blogs
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
                            <li className="text-gray-500">Pages</li>
                            <li>
                              <span className="text-gray-500 mx-2">/</span>
                            </li>
                            <li className="text-blue-600 hover:text-blue-700">
                              Blogs
                            </li>
                          </ol>
                        </div>
                        <div className="flex items-center">
                          <button className="px-3 py-2 lg:px-4 bg-blue-500 collapse:bg-green-100 text-white text-sm font-semibold rounded hover:bg-blue-600">
                            Create New
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <a href="#">
                      <img
                        className="rounded-t-lg"
                        src={IMG}
                        alt=""
                      />
                    </a>
                    <div className="flex-auto p-4">
                      <span className="focus:outline-none text-[12px] bg-green-500/10 text-green-500 dark:text-green-600 rounded font-medium py-1 px-2">
                        Fashion
                      </span>
                      <a
                        href="#"
                        className="my-3 block text-[20px] font-medium tracking-tight text-gray-800 dark:text-white"
                      >
                        Popular admin template you can use for your business.
                      </a>
                      <p className="font-normal text-gray-500 text-sm dark:text-gray-400">
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                      <div className="border-[0.5px] border-dashed border-slate-300 my-4 dark:border-slate-700"></div>
                      <div className="flex flex-wrap justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded">
                            <img
                              className="w-full h-full overflow-hidden object-cover rounded object-center"
                              src={IMG}
                              alt="logo"
                            />
                          </div>
                          <div className="ml-2">
                            <a
                              tabindex="0"
                              className="cursor-pointer hover:text-gray-500 focus:text-gray-500 text-gray-800 dark:text-gray-100 focus:outline-none focus:underline"
                            >
                              <h5 className=" font-medium text-sm">
                                Fitbit Incorporation
                              </h5>
                            </a>
                            <p
                              tabindex="0"
                              className="focus:outline-none text-gray-500 dark:text-gray-400 text-xs font-medium"
                            >
                              San Diego, California
                            </p>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="text-primary-500 font-semibold text-sm self-center"
                        >
                          Read More <FaArrowRightLong />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <a href="#">
                      <img
                        className="rounded-t-lg"
                        src={IMG}
                        alt=""
                      />
                    </a>
                    <div className="flex-auto p-4">
                      <span className="focus:outline-none text-[12px] bg-green-500/10 text-green-500 dark:text-green-600 rounded font-medium py-1 px-2">
                        Fruits
                      </span>
                      <a
                        href="#"
                        className="my-3 block text-[20px] font-medium tracking-tight text-gray-800 dark:text-white"
                      >
                        Popular admin template you can use for your business.
                      </a>
                      <p className="font-normal text-gray-500 text-sm dark:text-gray-400">
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                      <div className="border-[0.5px] border-dashed border-slate-300 my-4 dark:border-slate-700"></div>
                      <div className="flex flex-wrap justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded">
                            <img
                              className="w-full h-full overflow-hidden object-cover rounded object-center"
                              src={IMG}
                              alt="logo"
                            />
                          </div>
                          <div className="ml-2">
                            <a
                              tabindex="0"
                              className="cursor-pointer hover:text-gray-500 focus:text-gray-500 text-gray-800 dark:text-gray-100 focus:outline-none focus:underline"
                            >
                              <h5 className=" font-medium text-sm">
                                Fitbit Incorporation
                              </h5>
                            </a>
                            <p
                              tabindex="0"
                              className="focus:outline-none text-gray-500 dark:text-gray-400 text-xs font-medium"
                            >
                              San Diego, California
                            </p>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="text-primary-500 font-semibold text-sm self-center"
                        >
                          Read More <FaArrowRightLong />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <a href="#">
                      <img
                        className="rounded-t-lg"
                        src={IMG}
                        alt=""
                      />
                    </a>
                    <div className="flex-auto p-4">
                      <span className="focus:outline-none text-[12px] bg-green-500/10 text-green-500 dark:text-green-600 rounded font-medium py-1 px-2">
                        Birds
                      </span>
                      <a
                        href="#"
                        className="my-3 block text-[20px] font-medium tracking-tight text-gray-800 dark:text-white"
                      >
                        Popular admin template you can use for your business.
                      </a>
                      <p className="font-normal text-gray-500 text-sm dark:text-gray-400">
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                      <div className="border-[0.5px] border-dashed border-slate-300 my-4 dark:border-slate-700"></div>
                      <div className="flex flex-wrap justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded">
                            <img
                              className="w-full h-full overflow-hidden object-cover rounded object-center"
                              src={IMG}
                              alt="logo"
                            />
                          </div>
                          <div className="ml-2">
                            <a
                              tabindex="0"
                              className="cursor-pointer hover:text-gray-500 focus:text-gray-500 text-gray-800 dark:text-gray-100 focus:outline-none focus:underline"
                            >
                              <h5 className=" font-medium text-sm">
                                Fitbit Incorporation
                              </h5>
                            </a>
                            <p
                              tabindex="0"
                              className="focus:outline-none text-gray-500 dark:text-gray-400 text-xs font-medium"
                            >
                              San Diego, California
                            </p>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="text-primary-500 font-semibold text-sm self-center"
                        >
                          Read More <FaArrowRightLong />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <a href="#">
                      <img
                        className="rounded-t-lg"
                        src={IMG}
                        alt=""
                      />
                    </a>
                    <div className="flex-auto p-4">
                      <span className="focus:outline-none text-[12px] bg-green-500/10 text-green-500 dark:text-green-600 rounded font-medium py-1 px-2">
                        Helth
                      </span>
                      <a
                        href="#"
                        className="my-3 block text-[20px] font-medium tracking-tight text-gray-800 dark:text-white"
                      >
                        Popular admin template you can use for your business.
                      </a>
                      <p className="font-normal text-gray-500 text-sm dark:text-gray-400">
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                      <div className="border-[0.5px] border-dashed border-slate-300 my-4 dark:border-slate-700"></div>
                      <div className="flex flex-wrap justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded">
                            <img
                              className="w-full h-full overflow-hidden object-cover rounded object-center"
                              src={IMG}
                              alt="logo"
                            />
                          </div>
                          <div className="ml-2">
                            <a
                              tabindex="0"
                              className="cursor-pointer hover:text-gray-500 focus:text-gray-500 text-gray-800 dark:text-gray-100 focus:outline-none focus:underline"
                            >
                              <h5 className=" font-medium text-sm">
                                Fitbit Incorporation
                              </h5>
                            </a>
                            <p
                              tabindex="0"
                              className="focus:outline-none text-gray-500 dark:text-gray-400 text-xs font-medium"
                            >
                              San Diego, California
                            </p>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="text-primary-500 font-semibold text-sm self-center"
                        >
                          Read More <FaArrowRightLong />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <a href="#">
                      <img
                        className="rounded-t-lg"
                        src={IMG}
                        alt=""
                      />
                    </a>
                    <div className="flex-auto p-4">
                      <span className="focus:outline-none text-[12px] bg-green-500/10 text-green-500 dark:text-green-600 rounded font-medium py-1 px-2">
                        Fashion
                      </span>
                      <a
                        href="#"
                        className="my-3 block text-[20px] font-medium tracking-tight text-gray-800 dark:text-white"
                      >
                        Popular admin template you can use for your business.
                      </a>
                      <p className="font-normal text-gray-500 text-sm dark:text-gray-400">
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                      <div className="border-[0.5px] border-dashed border-slate-300 my-4 dark:border-slate-700"></div>
                      <div className="flex flex-wrap justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded">
                            <img
                              className="w-full h-full overflow-hidden object-cover rounded object-center"
                              src={IMG}
                              alt="logo"
                            />
                          </div>
                          <div className="ml-2">
                            <a
                              tabindex="0"
                              className="cursor-pointer hover:text-gray-500 focus:text-gray-500 text-gray-800 dark:text-gray-100 focus:outline-none focus:underline"
                            >
                              <h5 className=" font-medium text-sm">
                                Fitbit Incorporation
                              </h5>
                            </a>
                            <p
                              tabindex="0"
                              className="focus:outline-none text-gray-500 dark:text-gray-400 text-xs font-medium"
                            >
                              San Diego, California
                            </p>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="text-primary-500 font-semibold text-sm self-center"
                        >
                          Read More <FaArrowRightLong />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <a href="#">
                      <img
                        className="rounded-t-lg"
                        src={IMG}
                        alt=""
                      />
                    </a>
                    <div className="flex-auto p-4">
                      <span className="focus:outline-none text-[12px] bg-green-500/10 text-green-500 dark:text-green-600 rounded font-medium py-1 px-2">
                        Fruits
                      </span>
                      <a
                        href="#"
                        className="my-3 block text-[20px] font-medium tracking-tight text-gray-800 dark:text-white"
                      >
                        Popular admin template you can use for your business.
                      </a>
                      <p className="font-normal text-gray-500 text-sm dark:text-gray-400">
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                      <div className="border-[0.5px] border-dashed border-slate-300 my-4 dark:border-slate-700"></div>
                      <div className="flex flex-wrap justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded">
                            <img
                              className="w-full h-full overflow-hidden object-cover rounded object-center"
                              src={IMG}
                              alt="logo"
                            />
                          </div>
                          <div className="ml-2">
                            <a
                              tabindex="0"
                              className="cursor-pointer hover:text-gray-500 focus:text-gray-500 text-gray-800 dark:text-gray-100 focus:outline-none focus:underline"
                            >
                              <h5 className=" font-medium text-sm">
                                Fitbit Incorporation
                              </h5>
                            </a>
                            <p
                              tabindex="0"
                              className="focus:outline-none text-gray-500 dark:text-gray-400 text-xs font-medium"
                            >
                              San Diego, California
                            </p>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="text-primary-500 font-semibold text-sm self-center"
                        >
                          Read More <FaArrowRightLong />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <a href="#">
                      <img
                        className="rounded-t-lg"
                        src={IMG}
                        alt=""
                      />
                    </a>
                    <div className="flex-auto p-4">
                      <span className="focus:outline-none text-[12px] bg-green-500/10 text-green-500 dark:text-green-600 rounded font-medium py-1 px-2">
                        Birds
                      </span>
                      <a
                        href="#"
                        className="my-3 block text-[20px] font-medium tracking-tight text-gray-800 dark:text-white"
                      >
                        Popular admin template you can use for your business.
                      </a>
                      <p className="font-normal text-gray-500 text-sm dark:text-gray-400">
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                      <div className="border-[0.5px] border-dashed border-slate-300 my-4 dark:border-slate-700"></div>
                      <div className="flex flex-wrap justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded">
                            <img
                              className="w-full h-full overflow-hidden object-cover rounded object-center"
                              src={IMG}
                              alt="logo"
                            />
                          </div>
                          <div className="ml-2">
                            <a
                              tabindex="0"
                              className="cursor-pointer hover:text-gray-500 focus:text-gray-500 text-gray-800 dark:text-gray-100 focus:outline-none focus:underline"
                            >
                              <h5 className=" font-medium text-sm">
                                Fitbit Incorporation
                              </h5>
                            </a>
                            <p
                              tabindex="0"
                              className="focus:outline-none text-gray-500 dark:text-gray-400 text-xs font-medium"
                            >
                              San Diego, California
                            </p>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="text-primary-500 font-semibold text-sm self-center"
                        >
                          Read More <FaArrowRightLong />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <a href="#">
                      <img
                        className="rounded-t-lg"
                        src={IMG}
                        alt=""
                      />
                    </a>
                    <div className="flex-auto p-4">
                      <span className="focus:outline-none text-[12px] bg-green-500/10 text-green-500 dark:text-green-600 rounded font-medium py-1 px-2">
                        Helth
                      </span>
                      <a
                        href="#"
                        className="my-3 block text-[20px] font-medium tracking-tight text-gray-800 dark:text-white"
                      >
                        Popular admin template you can use for your business.
                      </a>
                      <p className="font-normal text-gray-500 text-sm dark:text-gray-400">
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                      <div className="border-[0.5px] border-dashed border-slate-300 my-4 dark:border-slate-700"></div>
                      <div className="flex flex-wrap justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded">
                            <img
                              className="w-full h-full overflow-hidden object-cover rounded object-center"
                              src={IMG}
                              alt="logo"
                            />
                          </div>
                          <div className="ml-2">
                            <a
                              tabindex="0"
                              className="cursor-pointer hover:text-gray-500 focus:text-gray-500 text-gray-800 dark:text-gray-100 focus:outline-none focus:underline"
                            >
                              <h5 className=" font-medium text-sm">
                                Fitbit Incorporation
                              </h5>
                            </a>
                            <p
                              tabindex="0"
                              className="focus:outline-none text-gray-500 dark:text-gray-400 text-xs font-medium"
                            >
                              San Diego, California
                            </p>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="text-primary-500 font-semibold text-sm self-center"
                        >
                          Read More <FaArrowRightLong />
                        </a>
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

export default Blogs;
