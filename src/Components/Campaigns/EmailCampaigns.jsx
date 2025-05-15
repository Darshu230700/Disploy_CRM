/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaPlus } from "react-icons/fa6";
import { BsInfoCircle } from "react-icons/bs";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
const EmailCampaigns = ({
  isVisible,
  setIsVisible,
  setSidebarOpen,
  sidebarOpen,
  isDark,
  setIsDark,
}) => {
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
                        <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                          {" "}
                          Email campaigns
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
                          <li className="text-gray-500">Campaigns</li>
                          <li>
                            <span className="text-gray-500 mx-2">/</span>
                          </li>
                          <li className="text-blue-600 hover:text-blue-700">
                            Email campaigns
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
              <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
                <div className="bg-white dark:bg-slate-800 shadow px-4 rounded-md w-full relative">
                  <div className="py-3 dark:text-slate-300/70 flex items-center justify-between">
                    <a
                      href="new-email_campaigns.html"
                      className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 flex items-center"
                    >
                      <FaPlus className="text-2xl mr-2" />
                      Email campaigns
                      <div className="absolute bottom-0 flex-col items-center hidden mb-10 group-hover:flex">
                        <span className="relative rounded-md z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                          Add Email campaigns
                        </span>
                        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                      </div>
                    </a>
                    <select
                      id="Labels"
                      className="border border-gray-300 shadow p-3"
                    >
                      <option>All states</option>
                      <option>Canada</option>
                      <option>France</option>
                      <option>Germany</option>
                    </select>
                  </div>
                  <div className="flex-auto p-4 border border-gray-200">
                    <h3 className="font-medium text-3xl mb-4">
                      Before you start sending campaigns
                    </h3>
                    <p className="mb-4">
                      Let’s get you set up. Follow the steps below to start
                      sending campaigns with ease.
                    </p>
                    <ul>
                      <li className="border-t border-gray-200 py-4 mb-4 flex ">
                        <div className="mr-4">
                          <img
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI4Ljc1IDIzQzI4Ljc1IDIyLjU4NTggMjguNDE0MiAyMi4yNSAyOCAyMi4yNUMyNy41ODU4IDIyLjI1IDI3LjI1IDIyLjU4NTggMjcuMjUgMjNWMjcuMjVIMjNDMjIuNTg1OCAyNy4yNSAyMi4yNSAyNy41ODU4IDIyLjI1IDI4QzIyLjI1IDI4LjQxNDIgMjIuNTg1OCAyOC43NSAyMyAyOC43NUgyNy4yNVYzM0MyNy4yNSAzMy40MTQyIDI3LjU4NTggMzMuNzUgMjggMzMuNzVDMjguNDE0MiAzMy43NSAyOC43NSAzMy40MTQyIDI4Ljc1IDMzVjI4Ljc1SDMzQzMzLjQxNDIgMjguNzUgMzMuNzUgMjguNDE0MiAzMy43NSAyOEMzMy43NSAyNy41ODU4IDMzLjQxNDIgMjcuMjUgMzMgMjcuMjVIMjguNzVWMjNaIiBmaWxsPSIjOTNDMkRFIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAgMkwyMC45NSAyLjUzNTA0QzI1LjE4MTIgNC45MTgwNiAyOS45MzQ1IDYuMjIxMzEgMzQuNzg5NCA2LjMyOTQ2QzM1LjI1NDYgMTAuMDg1OSAzNC45NDg1IDE0LjE2MTYgMzMuODc2NSAxOC4xMTI4QzM3LjI0NCAyMC4xMTg2IDM5LjUgMjMuNzk1OCAzOS41IDI4QzM5LjUgMzQuMzUxMyAzNC4zNTEzIDM5LjUgMjggMzkuNUMyNC42Mjg2IDM5LjUgMjEuNTk2IDM4LjA0OTIgMTkuNDkyNSAzNS43Mzc5QzguNzAxNDkgMzAuMDA0MSAzLjkwMTI5IDE2LjkwMTkgNS4yMTA1OSA2LjMyOTQ2QzEwLjA2NTUgNi4yMjEzMSAxNC44MTg4IDQuOTE4MDUgMTkuMDUgMi41MzUwNEwyMCAyWk0zMS4wOTE4IDE4LjQ4NzFDMzEuOTI1OCAxOC43NTggMzIuNzExNyAxOS4xMzU1IDMzLjQzMzUgMTkuNjAzNkMzNi4xODE4IDIxLjM4NTcgMzggMjQuNDgwNSAzOCAyOEMzOCAzMy41MjI4IDMzLjUyMjggMzggMjggMzhDMjUuMzgxNSAzOCAyMi45OTggMzYuOTkzNSAyMS4yMTUzIDM1LjM0NjRDMjAuMTU0OCAzNC4zNjY1IDE5LjMwNyAzMy4xNTk4IDE4Ljc0ODcgMzEuODAzNEMxOC40NjAxIDMxLjEwMjMgMTguMjQ5IDMwLjM2MTEgMTguMTI1OCAyOS41OTA1QzE4LjA0MyAyOS4wNzI2IDE4IDI4LjU0MTMgMTggMjhDMTggMjIuNDc3MiAyMi40NzcyIDE4IDI4IDE4QzI4LjU1NjggMTggMjkuMTAyOSAxOC4wNDU1IDI5LjYzNDkgMTguMTMzQzMwLjEzMzkgMTguMjE1MSAzMC42MjA1IDE4LjMzNDEgMzEuMDkxOCAxOC40ODcxWk0xNi41MDMxIDI4LjI2NzdDMTYuNTIwMSAyOS4wMTIgMTYuNjA3OCAyOS43Mzg4IDE2Ljc1OTcgMzAuNDQxN0MxMC4xMjkyIDI1LjMxMjkgNy4yNDM2MyAxNi42OCA4LjE2ODQ3IDkuMDQyM0MxMi4wODg4IDguNTMxMjcgMTUuOTA2NiA3LjQxNzUxIDE5LjQ4NjcgNS43NDA0NUwyMCA1LjVMMjAuNTEzMyA1Ljc0MDQ1QzI0LjA5MzQgNy40MTc1MSAyNy45MTEyIDguNTMxMjcgMzEuODMxNSA5LjA0MjNDMzIuMTQ3IDExLjY0NzUgMzIuMDE5MSAxNC4zNjg1IDMxLjQ1MDUgMTcuMDI2NkMzMC45Nzc1IDE2Ljg3ODEgMzAuNDkxNCAxNi43NTkyIDI5Ljk5NDIgMTYuNjcyM0MzMC40MzgyIDE0LjU3OTEgMzAuNTkxNCAxMi40NDEyIDMwLjQ0OTUgMTAuMzU2NkMyNi44Mzc2IDkuNzc0NjkgMjMuMzIxMyA4LjY5ODIxIDIwIDcuMTU2MTZDMTYuNjc4NyA4LjY5ODIxIDEzLjE2MjQgOS43NzQ2OSA5LjU1MDU0IDEwLjM1NjZDOS4xMTM1NiAxNi43NzQ0IDExLjQ3NCAyMy42OTY3IDE2LjUwMzEgMjguMjY3N1oiIGZpbGw9IiM5M0MyREUiLz4KPC9zdmc+Cg=="
                            className="deta-img" alt=""
                          />{" "}
                        </div>
                        <div className="text w-full">
                          <h4 className="font-semibold text-2xl flex items-center justify-between">
                            <b>
                              Enable two-factor authentication (2FA) login{" "}
                              <button
                                type="button"
                                className="tippy-btn inline-block focus:outline-none text-slate-500 hover:bg-slate-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-slate-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-slate-500 font-medium py-1 px-2 rounded-full mb-1"
                                data-tippy-content="What is a lead? A lead is an opportunity you nurture before it becomes a deal"
                                data-tippy-arrow="true"
                                data-tippy-placement="bottom"
                              >
                                {/* <i className="ti ti-info-circle text-2xl"></i> */}
                                <BsInfoCircle className="text-2xl" />
                              </button>
                            </b>
                            <button
                              type="button"
                              className="relative group flex items-center px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                              Enable 2FA
                              <div className="absolute bottom-0 flex-col items-center hidden mb-10 group-hover:flex">
                                <span className="relative rounded-md z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                                Enable 2FA
                                </span>
                                <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                              </div>
                            </button>
                          </h4>
                          <p>
                            2FA makes your account (patelramjilal81@gmail.com)
                            more secure and is <b>required</b> to send marketing
                            campaigns.
                          </p>
                        </div>
                      </li>
                      <li className="border-t border-gray-200 py-4 mb-4 flex ">
                        <div className="mr-4">
                          <img
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIiIGhlaWdodD0iNDIiIHZpZXdCb3g9IjAgMCA0MiA0MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMxLjI1IDI1LjVDMzEuMjUgMjUuMDg1OCAzMC45MTQyIDI0Ljc1IDMwLjUgMjQuNzVDMzAuMDg1OCAyNC43NSAyOS43NSAyNS4wODU4IDI5Ljc1IDI1LjVWMjkuNzVIMjUuNUMyNS4wODU4IDI5Ljc1IDI0Ljc1IDMwLjA4NTggMjQuNzUgMzAuNUMyNC43NSAzMC45MTQyIDI1LjA4NTggMzEuMjUgMjUuNSAzMS4yNUgyOS43NVYzNS41QzI5Ljc1IDM1LjkxNDIgMzAuMDg1OCAzNi4yNSAzMC41IDM2LjI1QzMwLjkxNDIgMzYuMjUgMzEuMjUgMzUuOTE0MiAzMS4yNSAzNS41VjMxLjI1SDM1LjVDMzUuOTE0MiAzMS4yNSAzNi4yNSAzMC45MTQyIDM2LjI1IDMwLjVDMzYuMjUgMzAuMDg1OCAzNS45MTQyIDI5Ljc1IDM1LjUgMjkuNzVIMzEuMjVWMjUuNVoiIGZpbGw9IiM5M0MyREUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDEwLjc1QzUgOS45MjE1NyA1LjY3MTU3IDkuMjUgNi41IDkuMjVIMzMuNUMzNC4zMjg0IDkuMjUgMzUgOS45MjE1NyAzNSAxMC43NVYxOS45MTM4QzM5LjExNDkgMjEuNjY1MiA0MiAyNS43NDU3IDQyIDMwLjVDNDIgMzYuODUxMyAzNi44NTEzIDQyIDMwLjUgNDJDMjQuMjMyMyA0MiAxOS4xMzU3IDM2Ljk4NTggMTkuMDAyNyAzMC43NUg2LjVDNS42NzE1NyAzMC43NSA1IDMwLjA3ODQgNSAyOS4yNVYxMC43NVpNMzAuNSAyMC41QzMyLjExODYgMjAuNSAzMy42NDc0IDIwLjg4NDYgMzUgMjEuNTY3M0MzOC4yNjI2IDIzLjIxNDEgNDAuNSAyNi41OTU4IDQwLjUgMzAuNUM0MC41IDM2LjAyMjggMzYuMDIyOCA0MC41IDMwLjUgNDAuNUMyNS4wNjA3IDQwLjUgMjAuNjM1NyAzNi4xNTczIDIwLjUwMzEgMzAuNzVDMjAuNTAxIDMwLjY2NjkgMjAuNSAzMC41ODM2IDIwLjUgMzAuNUMyMC41IDI0Ljk3NzIgMjQuOTc3MiAyMC41IDMwLjUgMjAuNVpNNy45NjA2NSAxMi4zODZDOC4yOTk3MiAxMS45NTAxIDguOTI3OTkgMTEuODcxNiA5LjM2Mzk0IDEyLjIxMDZMMTguNzcyMSAxOS41MjgxQzE5LjQ5NDMgMjAuMDg5OCAyMC41MDU3IDIwLjA4OTggMjEuMjI3OSAxOS41MjgxTDMwLjYzNjEgMTIuMjEwNkMzMS4wNzIgMTEuODcxNiAzMS43MDAzIDExLjk1MDEgMzIuMDM5NCAxMi4zODZDMzIuMzc4NCAxMi44MjIgMzIuMjk5OSAxMy40NTAzIDMxLjg2MzkgMTMuNzg5M0wyMi40NTU4IDIxLjEwNjhDMjEuMDExMyAyMi4yMzAzIDE4Ljk4ODcgMjIuMjMwMyAxNy41NDQyIDIxLjEwNjhMOC4xMzYwNiAxMy43ODkzQzcuNzAwMTEgMTMuNDUwMyA3LjYyMTU4IDEyLjgyMiA3Ljk2MDY1IDEyLjM4NloiIGZpbGw9IiM5M0MyREUiLz4KPC9zdmc+Cg=="
                            className="deta-img" alt=""
                          />
                        </div>
                        <div className="text w-full">
                          <h4 className="font-semibold text-2xl flex items-center justify-between">
                            <b>
                              Add sender info{" "}
                              <button
                                type="button"
                                className="tippy-btn inline-block focus:outline-none text-slate-500 hover:bg-slate-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-slate-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-slate-500  text-sm font-medium py-1 px-2 rounded mb-1"
                                data-tippy-content="Sender information will be available to all users who are sending marketing campaigns."
                                data-tippy-arrow="true"
                                data-tippy-placement="bottom"
                              >
                                {/* <i className="ti ti-info-circle text-2xl"></i> */}
                                <BsInfoCircle className="text-2xl" />
                              </button>
                            </b>
                            <button
                              type="button"
                              className="relative group flex items-center px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                              Add Sender
                              <div className="absolute bottom-0 flex-col items-center hidden mb-10 group-hover:flex">
                                <span className="relative rounded-md z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                                Add Sender
                                </span>
                                <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                              </div>
                            </button>
                          </h4>
                          <p>
                            You can set up multiple senders for different
                            purposes but at least one is required to start
                            sending campaigns. Sender information will be
                            available to all users who are sending marketing
                            campaigns.{" "}
                          </p>
                          <p>
                            <a href="#" className="text-blue-600 text-xl">
                              Learn more{" "}
                            </a>
                          </p>
                        </div>
                      </li>
                      <li className="border-t border-gray-200 py-4 mb-4 flex">
                        <div className="mr-4">
                          <img
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMS45OTkyIDI4LjhDMzcuMzAyNCAyOC44IDQxLjU5OTIgMjQuNTAxMiA0MS41OTkyIDE5LjJDNDEuNTk5MiAxMy44OTg3IDM3LjMwMjQgOS41OTk5OCAzMS45OTkyIDkuNTk5OThDMjYuNjk4IDkuNTk5OTggMjIuMzk5MiAxMy44OTg3IDIyLjM5OTIgMTkuMkMyMi4zOTkyIDI0LjUwMTIgMjYuNjk4IDI4LjggMzEuOTk5MiAyOC44Wk0zMS45OTkyIDMzLjZDNDMuNDg2NyAzMy42IDUyLjc5OTIgNDIuOTEyNSA1Mi43OTkyIDU0LjRIMTEuMTk5MkMxMS4xOTkyIDQyLjkxMjUgMjAuNTExNyAzMy42IDMxLjk5OTIgMzMuNloiIGZpbGw9IiM3NUIxRDQiLz4KPGNpcmNsZSBjeD0iNTAuMDAwNyIgY3k9IjUwIiByPSIxMS4xNjY3IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjMjc4NUJDIi8+CjxwYXRoIGQ9Ik00OS45OTkzIDU1LjgzMzRWNDQuMTY2N000NC4xNjYgNTBMNTUuODMyNyA1MCIgc3Ryb2tlPSIjMjc4NUJDIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
                            className="deta-img" alt=""
                          />
                        </div>
                        <div className="text w-full">
                          <h4 className="font-semibold text-2xl flex items-center justify-between">
                            <b>Mark your contacts as subscribers</b>
                            <button
                              type="button"
                              className="relative group flex items-center px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                              Go to contacts
                              <div className="absolute bottom-0 flex-col items-center hidden mb-10 group-hover:flex">
                                <span className="relative rounded-md z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                                Go to contacts
                                </span>
                                <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                              </div>
                            </button>
                          </h4>
                          <p>
                            You now have a marketing status field available for
                            contact people. Change it to “Subscribed” for people
                            who have agreed to get marketing emails from you.
                          </p>
                          <p>
                            <a href="#" className="text-blue-600 text-xl">
                              Learn more{" "}
                            </a>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="relative scroll-inner block w-full">
                    <table className="w-full">
                      <tbody>
                        <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                          <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                            <img
                              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYgMzFIMzRDMzQuNTUyMyAzMSAzNSAzMC41NTIzIDM1IDMwVjEwQzM1IDkuNDQ3NzEgMzQuNTUyMyA5IDM0IDlMNiA4Ljk5OTkzQzUuNDQ3NzIgOC45OTk5MiA1IDkuNDQ3NjQgNSA5Ljk5OTkzVjMwQzUgMzAuNTUyMyA1LjQ0NzcyIDMxIDYgMzFaIiBzdHJva2U9IiM3NDc2NzgiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEwIDI1SDE2TTEwIDIxSDIyIiBzdHJva2U9IiM3NDc2NzgiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHJlY3QgeD0iMjYuNSIgeT0iMTIuNSIgd2lkdGg9IjUuNSIgaGVpZ2h0PSI1LjUiIHJ4PSIxIiBmaWxsPSIjQ0JDQ0NEIi8+Cjwvc3ZnPgo="
                              alt=""
                              className="mr-2 h-8 rounded-full inline-block"
                            />
                            Updated on December 30, 2023 12:52 AM by Ramjilal
                          </td>
                          <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            <span className="bg-indigo-600/5 text-indigo-600 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                              Draft
                            </span>
                          </td>
                          <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            <a href="#">
                              {/* <i className="ti ti-dots text-2xl text-gray-500 dark:text-gray-400"></i> */}
                              <PiDotsThreeOutlineFill className="text-2xl text-gray-500 dark:text-gray-400" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default EmailCampaigns;
