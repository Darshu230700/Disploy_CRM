/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import Footer from '../Common/Footer';
import { FiUsers } from "react-icons/fi";
import IMG from "../../Images/abc-deal-project.svg";
import IMG1 from "../../Images/abc-deal-project2.svg";
import IMG2 from "../../Images/fatigue.svg";
import IMG3 from "../../Images/Manage-automate.svg";
import IMG4 from "../../Images/pricing_access.svg";
import IMG5 from "../../Images/case_study.svg";
import { IoRocketOutline } from 'react-icons/io5';
import { FaChevronRight, FaRegClipboard } from 'react-icons/fa6';
import { TbBrandAsana } from 'react-icons/tb';

export default function ProjectHome({ setProjectpage }) {
    const [activeTab, setActiveTab] = useState("fatiguetab");
    const handleTabClick = (event, tabName) => {
        event.preventDefault();
        setActiveTab(tabName);
    };

    return (
        <div>
            <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
                <div className="flex m-4">
                    <div
                        className="relative h-[395px] w-full flex items-center justify-center text-center bg-cover bg-center"
                        //   style="background-image:url(https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80);"
                        style={{
                            backgroundImage:
                                "url(https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80)",
                        }}
                    >
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75"></div>
                        <div className="px-4 sm:px-6 lg:px-8 z-10">
                            <div className="text-center">
                                <h2 className="text-4xl tracking-tight leading-10 font-medium sm:text-5xl text-white sm:leading-none md:text-6xl">
                                    Deliver your next big project. Reach goals{" "}
                                    <span className="text-green-500 font-bold">
                                        {" "}
                                        faster.
                                    </span>
                                </h2>
                                <p className="mt-3 text-white sm:mt-5 text-xl sm:max-w-xl sm:mx-auto md:mt-5">
                                    Projects by Pipedrive helps you plan, track and deliver
                                    all the moving pieces for your next milestone.
                                </p>
                                <div className="mt-5 flex justify-center">
                                    <button
                                        className="px-5 py-2 border border-transparent text-base leading-6 font-regular rounded-md text-white bg-green-400 hover:bg-green-600 focus:outline-none focus:border-green-500 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:px-10 mr-3"
                                        onClick={() => {
                                            setProjectpage(true);
                                        }}
                                    >
                                        Try for free
                                    </button>
                                    <a className="px-5 py-2 text-base leading-6 font-regular text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-green-500 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        Watch video (03:29)
                                    </a>
                                </div>
                                <p className="mt-3 text-white sm:mt-5 text-xl sm:max-w-xl sm:mx-auto md:mt-5">
                                    Free during trial, then $8 per Projects seat/month.{" "}
                                    <a className="text-blue-700">More about pricing</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block flex-wrap my-8">
                    <h3 className="text-4xl text-center">
                        Fewer tools, more deadlines met
                    </h3>
                    <p className="text-lg text-center mb-4">
                        Manage projects and customers in one place, where your team
                        can seamlessly collaborate,
                        <br /> hand off work and deliver on goals.
                    </p>
                </div>
                <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 my-8">
                    <div className="sm:col-span-12  md:col-span-6 lg:col-span-4 xl:col-span-4 tab">
                        <ul className="deadlines-tabs">
                            <li>
                                <a
                                    className={`tablinks py-2 px-3 mb-3 border border-gray-200 flex ${activeTab === "fatiguetab" ? "active" : ""
                                        }`}
                                    onClick={(event) => handleTabClick(event, "fatiguetab")}
                                >
                                    <IoRocketOutline className="mr-2 text-3xl" />
                                    <div className="inline-block">
                                        <b className="flex items-center justify-between text-2xl font-medium">
                                            Say goodbye to tool fatigue{" "}
                                            <FaChevronRight className="text-2xl" />
                                        </b>
                                        <p className="text-lg hidden">
                                            Handle all of your projects efficiently from within
                                            Pipedrive and maximize productivity.
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a
                                    className={`tablinks py-2 px-3 mb-3 border border-gray-200 flex ${activeTab === "deal_data_project_Tab" ? "active" : ""
                                        }`}
                                    onClick={(event) =>
                                        handleTabClick(event, "deal_data_project_Tab")
                                    }
                                >
                                    <FaRegClipboard className="mr-2 text-3xl" />
                                    <div className="inline-block">
                                        <b className="flex items-center justify-between text-2xl font-medium">
                                            Carry over deal data to project{" "}
                                            <FaChevronRight className="text-2xl" />
                                        </b>
                                        <p className="text-lg hidden">
                                            Access all the relevant sales and customer
                                            information directly from your projects and
                                            eliminate data loss.
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a
                                    className={`tablinks py-2 px-3 mb-3 border border-gray-200 flex ${activeTab === "Manage_automate_tab" ? "active" : ""
                                        }`}
                                    onClick={(event) =>
                                        handleTabClick(event, "Manage_automate_tab")
                                    }
                                >
                                    <TbBrandAsana className="mr-2 text-3xl" />
                                    <div className="inline-block">
                                        <b className="flex items-center justify-between text-2xl font-medium">
                                            Manage, automate and track your work{" "}
                                            <FaChevronRight className="text-2xl" />
                                        </b>
                                        <p className="text-lg hidden">
                                            Organize your projects with kanban boards and save
                                            time on manual work with templates and automations.
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a
                                    className={`tablinks py-2 px-3 mb-3 border border-gray-200 flex ${activeTab === "team_sync_tab" ? "active" : ""
                                        }`}
                                    onClick={(event) =>
                                        handleTabClick(event, "team_sync_tab")
                                    }
                                >
                                    <FiUsers className="mr-2 text-3xl" />
                                    <div className="inline-block">
                                        <b className="flex items-center justify-between text-2xl font-medium">
                                            Keep your team in sync{" "}
                                            <FaChevronRight className="text-2xl" />
                                        </b>
                                        <p className="text-lg hidden">
                                            Make team collaboration a breeze with notes, files,
                                            emails and mentions.
                                        </p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:col-span-12  md:col-span-6 lg:col-span-8 xl:col-span-8">
                        {activeTab === "fatiguetab" && (
                            <div id="fatiguetab" className=" tabcontent">
                                <img src={IMG2} />
                            </div>
                        )}
                        {activeTab === "deal_data_project_Tab" && (
                            <div id="deal_data_project_Tab" className="tabcontent">
                                <img src={IMG} />
                            </div>
                        )}
                        {activeTab === "Manage_automate_tab" && (
                            <div id="Manage_automate_tab" className="tabcontent">
                                <img src={IMG3} />
                            </div>
                        )}
                        {activeTab === "team_sync_tab" && (
                            <div id="team_sync_tab" className="tabcontent">
                                <img src={IMG1} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center flex-wrap my-8 bg-gray-200 py-8 px-5">
                    <div className="w-full md:w-1/2 pr-10">
                        <h4 className="text-3xl text-gray-800 font-bold mb-3">
                            About Projects pricing and access
                        </h4>
                        <span className="text-4xl text-green-500">$8</span>
                        <p>
                            <b>Per seat per month (billed monthly)</b>
                        </p>
                        <p>or $6.67 per seat per month, billed annually</p>
                        <p className="text-gray-600 mb-8">
                            You can decide who in your team gets a Projects seat. Users
                            without a seat can view and interact with some Projects data
                            in the Deals app.
                        </p>
                        <a
                            href="#"
                            className="inline-block px-5 py-2 border border-transparent text-base leading-6 font-regular rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:px-10 "
                        >
                            Try for free
                        </a>
                        <p className="mb-4">
                            <a href="#" className="text-blue-500">
                                Learn more about pricing
                            </a>
                        </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <img src={IMG4} />
                    </div>
                </div>

                <div className="flex items-center flex-wrap my-8">
                    <div className="w-full md:w-1/2">
                        <img className="rounded-lg" src={IMG5} alt="use the force" />
                    </div>
                    <div className="w-full md:w-1/2 pl-10">
                        <h4 className="text-3xl text-gray-800 font-bold mb-3">
                            How Blulinc’s project management team has reclaimed 30% of
                            their time
                        </h4>
                        <p className="text-gray-600 mb-8">
                            Mobility service provider (EMSP) and charge point operator
                            (CPO) Blulinc went from losing valuable time switching
                            between apps to delivering solutions well under the industry
                            average using just one tool.
                        </p>
                        <button
                            type="button"
                            className="px-3 py-2 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Find out how
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
