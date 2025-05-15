/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
const Gallery = ({ isVisible, setIsVisible ,setSidebarOpen,sidebarOpen,isDark,setIsDark}) => {
  return (
    <>
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
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
                            Gallery
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
                              Gallery
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
              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 filters-group-wrap">
                  <div className="filters-group mb-3">
                    <p className="filter-label mb-0">Filter</p>
                    <div className="flex-auto filter-options">
                      <button
                        type="button"
                        data-group="fashion"
                        className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:text-white"
                      >
                        Fashion
                      </button>
                      <button
                        type="button"
                        data-group="animal"
                        className="py-2 px-4 -mx-1 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:text-white"
                      >
                        Animal
                      </button>
                      <button
                        type="button"
                        data-group="food"
                        className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:text-white"
                      >
                        Food
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-0"
                id="grid"
              >
                <div
                  className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 picture-item w-full md:w-[50%] lg:w-[25%]"
                  data-groups='["fashion"]'
                >
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto">
                      <a
                        href="../assets/images/widgets/img-1.jpg"
                        className="lightbox"
                      >
                        <img
                          src="../assets/images/widgets/img-1.jpg"
                          alt=""
                          className="h-auto max-w-full"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 picture-item picture-item--overlay w-full md:w-[50%] lg:w-[25%]"
                  data-groups='["food"]'
                >
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto">
                      <a
                        href="../assets/images/widgets/img-2.jpg"
                        className="lightbox"
                      >
                        <img
                          src="../assets/images/widgets/img-2.jpg"
                          alt=""
                          className="h-auto max-w-full"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 picture-item w-full md:w-[50%] lg:w-[25%]"
                  data-groups='["animal"]'
                >
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto">
                      <a
                        href="../assets/images/widgets/img-3.jpg"
                        className="lightbox"
                      >
                        <img
                          src="../assets/images/widgets/img-3.jpg"
                          alt=""
                          className="h-auto max-w-full"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 picture-item picture-item--h2 w-full md:w-[50%] lg:w-[25%]"
                  data-groups='["food"]'
                >
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto">
                      <a
                        href="../assets/images/widgets/img-4.jpg"
                        className="lightbox"
                      >
                        <img
                          src="../assets/images/widgets/img-4.jpg"
                          alt=""
                          className="h-auto max-w-full"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 picture-item w-full md:w-[50%] lg:w-[25%]"
                  data-groups='["food", "animal"]'
                >
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto">
                      <a
                        href="../assets/images/widgets/img-5.jpg"
                        className="lightbox"
                      >
                        <img
                          src="../assets/images/widgets/img-5.jpg"
                          alt=""
                          className="h-auto max-w-full"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 picture-item picture-item--overlay w-full md:w-[50%] lg:w-[25%]"
                  data-groups='["fashion"]'
                >
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto">
                      <a
                        href="../assets/images/widgets/img-6.jpg"
                        className="lightbox"
                      >
                        <img
                          src="../assets/images/widgets/img-6.jpg"
                          alt=""
                          className="h-auto max-w-full"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 picture-item w-full md:w-[50%] lg:w-[25%]"
                  data-groups='["food"]'
                >
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto">
                      <a
                        href="../assets/images/widgets/img-2.jpg"
                        className="lightbox"
                      >
                        <img
                          src="../assets/images/widgets/img-2.jpg"
                          alt=""
                          className="h-auto max-w-full"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 picture-item picture-item--h2 w-full md:w-[50%] lg:w-[25%]"
                  data-groups='["fashion"]'
                >
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto">
                      <a
                        href="../assets/images/widgets/img-4.jpg"
                        className="lightbox"
                      >
                        <img
                          src="../assets/images/widgets/img-4.jpg"
                          alt=""
                          className="h-auto"
                        />
                      </a>
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

export default Gallery;
