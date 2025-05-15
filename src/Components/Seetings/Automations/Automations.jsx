/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import Sidebar from '../../Common/Sidebar'
import Navbar from '../../Common/Navbar'
import { FaPlus } from 'react-icons/fa6'
import { IoMenuOutline } from 'react-icons/io5';

export default function Automations({
    isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark, }) {
    const [Tab, setTab] = useState("Templates");
    const handleTab = (tabName) => { setTab(tabName); };

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
                                                    Automations
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
                                                    <li className="text-gray-500">CRM</li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-gray-500">Tools and apps</li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-blue-600 hover:text-blue-700">
                                                        Automations
                                                    </li>
                                                </ol>
                                            </div>
                                            {/* <div className="flex items-center">
                                                <button className="px-3 py-2 lg:px-4 bg-blue-500 collapse:bg-green-100 text-white text-sm font-semibold rounded hover:bg-blue-600">
                                                    Create New
                                                </button>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*end container*/}
                    <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 dark:text-slate-100">
                        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                            <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
                                <div className="w-full relative">
                                    <div className="w-full relative overflow-hidden">
                                        <div className="mb-4 border-b border-dashed border-gray-200 dark:border-gray-700 flex flex-wrap justify-start lg:justify-between">
                                            <ul
                                                className="flex flex-wrap mb-5 lg:-mb-px"
                                                id="myTab"
                                                data-tabs-toggle="#myTabContent"
                                            >
                                                <li className="mr-2" role="presentation">
                                                    <button
                                                        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${Tab === "Templates"
                                                            ? "border-gray-300"
                                                            : ""
                                                            }`}
                                                        id="Posts-tab"
                                                        onClick={() => handleTab("Templates")}
                                                        data-tabs-target="#Templates-Posts"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="Templates-Posts"
                                                        aria-selected={Tab === "Templates"}
                                                    >
                                                        Templates
                                                    </button>
                                                </li>
                                                <li className="mr-2" role="presentation">
                                                    <button
                                                        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${Tab === "Automations"
                                                            ? "border-gray-300"
                                                            : ""
                                                            }`}
                                                        onClick={() => handleTab("Automations")}
                                                        id="Automations-tab"
                                                        data-tabs-target="#Automations"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="Automations"
                                                        aria-selected={Tab === "Automations"}
                                                    >
                                                        Automations
                                                    </button>
                                                </li>
                                                <li role="presentation">
                                                    <button
                                                        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${Tab === "History"
                                                            ? "border-gray-300"
                                                            : ""
                                                            }`}
                                                        onClick={() => handleTab("History")}
                                                        id="History-tab"
                                                        data-tabs-target="#History"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="History"
                                                        aria-selected={Tab === "History"}

                                                    >
                                                        History
                                                    </button>
                                                </li>
                                            </ul>
                                            <button
                                                data-modal-toggle="modal"
                                                className=" group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1  mb-3 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                                            // onClick={() => setOpenRuleModal(true)}
                                            >
                                                <FaPlus className="mr-2 font-extrabold" size={15} />
                                                Automations
                                            </button>
                                        </div>

                                        {
                                            Tab === "Templates" && (
                                                <div id="myTabContent">
                                                    <div
                                                        className=""
                                                        id="Templates-Posts"
                                                        role="tabpanel"
                                                        aria-labelledby="Templates-Posts-tab"
                                                    >
                                                        <div className="flex items-center justify-start mb-4">
                                                            <span className="text-sm font-semibold me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                                                <i className="ti ti-star mr-2" /> Home
                                                            </span>
                                                            <span className="text-sm font-semibold me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                                                <i className="ti ti-mail mr-2" /> Emails
                                                            </span>
                                                            <span className="text-sm font-semibold me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                                                <i className="ti ti-speakerphone mr-2" /> Campaigns
                                                            </span>
                                                            <span className="text-sm font-semibold me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                                                <i className="ti ti-calendar-event mr-2" /> Activity
                                                            </span>
                                                            <span className="text-sm font-semibold me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                                                <i className="ti ti-coin mr-2" /> Deal
                                                            </span>
                                                            <span className="text-sm font-semibold me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                                                <i className="ti ti-current-location mr-2" /> Lead
                                                            </span>
                                                            <span className="text-sm font-semibold me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                                                <i className="ti ti-brand-slack mr-2" /> Slack
                                                            </span>
                                                            <span className="text-sm font-semibold me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                                                <i className="ti ti-brand-teams mr-2" /> Teams
                                                            </span>
                                                            <span className="text-sm font-semibold me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                                                <i className="ti ti-brand-asana mr-2" /> Asana
                                                            </span>
                                                            <span className="text-sm font-semibold me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                                                <i className="ti ti-brand-trello mr-2" /> Trello
                                                            </span>
                                                            <span className="text-sm font-semibold me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                                                <IoMenuOutline className="fas fa-list mr-2" /> All
                                                            </span>
                                                        </div>
                                                        <h3 className="text-xl font-medium mb-4 ">
                                                            FEATURED TEMPLATES
                                                        </h3>
                                                        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                                                            <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                                                <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative">
                                                                    <div className="flex-auto p-4">
                                                                        <div className="flex items-center mb-4">
                                                                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                                                                Activity follow-up
                                                                            </h5>
                                                                        </div>
                                                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5 line-clamp-2">
                                                                            Lorem Ipsum is simply dummy text of the printing and
                                                                            typesetting industry Lorem Ipsum is simply dummy
                                                                            text of the printing and typesetting industry.
                                                                        </p>
                                                                        <div className="flex items-center w-full mt-4">
                                                                            <i className="text-3xl text-blue-500 ti ti-coin mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-blue-500 ti ti-clock-2 mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                        </div>
                                                                    </div>
                                                                    {/*end card-body*/}
                                                                </div>{" "}
                                                                {/*end card*/}
                                                            </div>
                                                            {/*end col*/}
                                                            <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                                                    <div className="flex-auto p-4">
                                                                        <div className="flex items-center mb-4">
                                                                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                                                                Activity follow-up
                                                                            </h5>
                                                                        </div>
                                                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5 line-clamp-2">
                                                                            Lorem Ipsum is simply dummy text of the printing and
                                                                            typesetting industry Lorem Ipsum is simply dummy
                                                                            text of the printing and typesetting industry.
                                                                        </p>
                                                                        <div className="flex items-center w-full mt-4">
                                                                            <i className="text-3xl text-blue-500 ti ti-coin mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-blue-500 ti ti-clock-2 mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                        </div>
                                                                    </div>
                                                                    {/*end card-body*/}
                                                                </div>{" "}
                                                                {/*end card*/}
                                                            </div>
                                                            {/*end col*/}
                                                            <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                                                    <div className="flex-auto p-4">
                                                                        <div className="flex items-center mb-4">
                                                                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                                                                Activity follow-up
                                                                            </h5>
                                                                        </div>
                                                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5 line-clamp-2">
                                                                            Lorem Ipsum is simply dummy text of the printing and
                                                                            typesetting industry Lorem Ipsum is simply dummy
                                                                            text of the printing and typesetting industry.
                                                                        </p>
                                                                        <div className="flex flex-wrap content-between mt-4">
                                                                            <div className="flex items-center w-full">
                                                                                <i className="text-3xl text-blue-500 ti ti-coin mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-blue-500 ti ti-clock-2 mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/*end card-body*/}
                                                                </div>{" "}
                                                                {/*end card*/}
                                                            </div>
                                                            {/*end col*/}
                                                            <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                                                    <div className="flex-auto p-4">
                                                                        <div className="flex items-center mb-4">
                                                                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                                                                Activity follow-up
                                                                            </h5>
                                                                        </div>
                                                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5 line-clamp-2">
                                                                            Lorem Ipsum is simply dummy text of the printing and
                                                                            typesetting industry Lorem Ipsum is simply dummy
                                                                            text of the printing and typesetting industry.
                                                                        </p>
                                                                        <div className="flex items-center w-full mt-4">
                                                                            <i className="text-3xl text-blue-500 ti ti-coin mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-blue-500 ti ti-clock-2 mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                        </div>
                                                                    </div>
                                                                    {/*end card-body*/}
                                                                </div>{" "}
                                                                {/*end card*/}
                                                            </div>
                                                            {/*end col*/}
                                                            <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                                                    <div className="flex-auto p-4">
                                                                        <div className="flex items-center mb-4">
                                                                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                                                                Activity follow-up
                                                                            </h5>
                                                                        </div>
                                                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5 line-clamp-2">
                                                                            Lorem Ipsum is simply dummy text of the printing and
                                                                            typesetting industry Lorem Ipsum is simply dummy
                                                                            text of the printing and typesetting industry.
                                                                        </p>
                                                                        <div className="flex items-center w-full mt-4">
                                                                            <i className="text-3xl text-blue-500 ti ti-coin mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-blue-500 ti ti-clock-2 mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                        </div>
                                                                    </div>
                                                                    {/*end card-body*/}
                                                                </div>{" "}
                                                                {/*end card*/}
                                                            </div>
                                                            {/*end col*/}
                                                            <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                                                    <div className="flex-auto p-4">
                                                                        <div className="flex items-center mb-4">
                                                                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                                                                Activity follow-up
                                                                            </h5>
                                                                        </div>
                                                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5 line-clamp-2">
                                                                            Lorem Ipsum is simply dummy text of the printing and
                                                                            typesetting industry Lorem Ipsum is simply dummy
                                                                            text of the printing and typesetting industry.
                                                                        </p>
                                                                        <div className="flex items-center w-full mt-4">
                                                                            <i className="text-3xl text-blue-500 ti ti-coin mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-blue-500 ti ti-clock-2 mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                        </div>
                                                                    </div>
                                                                    {/*end card-body*/}
                                                                </div>{" "}
                                                                {/*end card*/}
                                                            </div>
                                                            {/*end col*/}
                                                            <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                                                    <div className="flex-auto p-4">
                                                                        <div className="flex items-center mb-4">
                                                                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                                                                Activity follow-up
                                                                            </h5>
                                                                        </div>
                                                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5 line-clamp-2">
                                                                            Lorem Ipsum is simply dummy text of the printing and
                                                                            typesetting industry Lorem Ipsum is simply dummy
                                                                            text of the printing and typesetting industry.
                                                                        </p>
                                                                        <div className="flex items-center w-full mt-4">
                                                                            <i className="text-3xl text-blue-500 ti ti-coin mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-blue-500 ti ti-clock-2 mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                        </div>
                                                                    </div>
                                                                    {/*end card-body*/}
                                                                </div>{" "}
                                                                {/*end card*/}
                                                            </div>
                                                            {/*end col*/}
                                                            <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                                                    <div className="flex-auto p-4">
                                                                        <div className="flex items-center mb-4">
                                                                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                                                                Activity follow-up
                                                                            </h5>
                                                                        </div>
                                                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5 line-clamp-2">
                                                                            Lorem Ipsum is simply dummy text of the printing and
                                                                            typesetting industry Lorem Ipsum is simply dummy
                                                                            text of the printing and typesetting industry.
                                                                        </p>
                                                                        <div className="flex items-center w-full mt-4">
                                                                            <i className="text-3xl text-blue-500 ti ti-coin mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-blue-500 ti ti-clock-2 mr-1" />
                                                                            <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                            <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                        </div>
                                                                    </div>
                                                                    {/*end card-body*/}
                                                                </div>{" "}
                                                                {/*end card*/}
                                                            </div>
                                                            {/*end col*/}
                                                        </div>
                                                        <h3 className="text-xl font-medium mb-4">
                                                            TEMPLATE COLLECTIONS
                                                        </h3>
                                                        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                                                            <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                                                <div className="bg-white dark:bg-slate-800 border rounded-md w-full relative hover:shadow-md">
                                                                    <div className="flex-auto p-4">
                                                                        <div className="flex items-center mb-4">
                                                                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                                                                Activity follow-up
                                                                            </h5>
                                                                        </div>
                                                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5 line-clamp-2">
                                                                            Lorem Ipsum is simply dummy text of the printing and
                                                                            typesetting industry Lorem Ipsum is simply dummy
                                                                            text of the printing and typesetting industry.
                                                                        </p>
                                                                        <div className="flex flex-wrap content-between mt-4">
                                                                            <div className="flex items-center justify-between w-full">
                                                                                <i className="text-3xl text-blue-500 ti ti-coin mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-blue-500 ti ti-clock-2 mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/*end card-body*/}
                                                                </div>{" "}
                                                                {/*end card*/}
                                                            </div>
                                                            {/*end col*/}
                                                            <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                                                    <div className="flex-auto p-4">
                                                                        <div className="flex items-center mb-4">
                                                                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                                                                Activity follow-up
                                                                            </h5>
                                                                        </div>
                                                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5 line-clamp-2">
                                                                            Lorem Ipsum is simply dummy text of the printing and
                                                                            typesetting industry Lorem Ipsum is simply dummy
                                                                            text of the printing and typesetting industry.
                                                                        </p>
                                                                        <div className="flex flex-wrap content-between mt-4">
                                                                            <div className="flex items-center justify-between w-full">
                                                                                <i className="text-3xl text-blue-500 ti ti-coin mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-blue-500 ti ti-clock-2 mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/*end card-body*/}
                                                                </div>{" "}
                                                                {/*end card*/}
                                                            </div>
                                                            {/*end col*/}
                                                            <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                                                    <div className="flex-auto p-4">
                                                                        <div className="flex items-center mb-4">
                                                                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                                                                Activity follow-up
                                                                            </h5>
                                                                        </div>
                                                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5 line-clamp-2">
                                                                            Lorem Ipsum is simply dummy text of the printing and
                                                                            typesetting industry Lorem Ipsum is simply dummy
                                                                            text of the printing and typesetting industry.
                                                                        </p>
                                                                        <div className="flex flex-wrap content-between mt-4">
                                                                            <div className="flex items-center justify-between w-full">
                                                                                <i className="text-3xl text-blue-500 ti ti-coin mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-blue-500 ti ti-clock-2 mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/*end card-body*/}
                                                                </div>{" "}
                                                                {/*end card*/}
                                                            </div>
                                                            {/*end col*/}
                                                            <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                                                    <div className="flex-auto p-4">
                                                                        <div className="flex items-center mb-4">
                                                                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                                                                Activity follow-up
                                                                            </h5>
                                                                        </div>
                                                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5 line-clamp-2">
                                                                            Lorem Ipsum is simply dummy text of the printing and
                                                                            typesetting industry Lorem Ipsum is simply dummy
                                                                            text of the printing and typesetting industry.
                                                                        </p>
                                                                        <div className="flex flex-wrap content-between mt-4">
                                                                            <div className="flex items-center justify-between w-full">
                                                                                <i className="text-3xl text-blue-500 ti ti-coin mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-blue-500 ti ti-clock-2 mr-1" />
                                                                                <i className="text-3xl text-gray-500 ti ti-chevron-right mr-1" />
                                                                                <i className="text-3xl text-green-700 ti ti-calendar-event mr-1" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/*end card-body*/}
                                                                </div>{" "}
                                                                {/*end card*/}
                                                            </div>
                                                            {/*end col*/}
                                                        </div>
                                                    </div>


                                                </div>
                                            )
                                        }
                                        {
                                            Tab === 'Automations' && (
                                                <>
                                                    <div
                                                        className=""
                                                        id=""
                                                        role="tabpanel"

                                                    >
                                                        Automations
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            Tab === 'History' && (
                                                <>
                                                    <div
                                                        className=""
                                                        id="History"
                                                        role="tabpanel"
                                                        aria-labelledby="Automations-tab"
                                                    >
                                                        History
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>{" "}
                                    {/*end inner-grid*/}
                                </div>
                                {/*end col*/}
                            </div>
                        </div>
                        {/*end grid*/}
                        {/* footer */}
                        <div className="absolute bottom-0 left-0 right-0 block print:hidden">
                            <div className="">
                                {/* Footer Start */}
                                <footer className="footer mt-4 rounded-tr-md rounded-tl-md bg-transparent py-4 text-center font-medium text-slate-600 dark:text-slate-400 md:text-left">
                                    © Disploy
                                    <span className="float-right hidden text-slate-600 dark:text-slate-400 md:inline-block">
                                        Crafted with <i className="ti ti-heart text-red-500" /> by
                                        Mannatthemes
                                    </span>
                                </footer>
                                {/* end Footer */}
                            </div>
                        </div>
                    </div>
                    {/*end container*/}
                </div>
            </div>

        </div>
    )
}
