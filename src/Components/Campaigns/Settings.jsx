/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaPlus } from "react-icons/fa6";
const Settings = ({
  isVisible,
  setIsVisible,
  setSidebarOpen,
  sidebarOpen,
  isDark,
  setIsDark,
}) => {
  const [activeTab, setActiveTab] = useState("senders");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
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
                        <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                          Settings
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
                            Settings
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
                  <div className="dark:text-slate-300/70 relative">
                    <h4 className="font-medium text-3xl">Campaigns settings</h4>
                  </div>
                  <div className="flex-auto py-4">
                    <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                      <ul
                        className="flex flex-wrap -mb-px"
                        id="myTab"
                        role="tablist"
                      >
                        <li className="mr-2" role="presentation">
                          <button
                            className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-xl font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
                              activeTab === "senders" ? "active" : ""
                            }`}
                            id="senders-tab"
                            onClick={() => handleTabClick("senders")}
                            type="button"
                            role="tab"
                            aria-controls="senders"
                            aria-selected={activeTab === "senders"}
                          >
                            Senders
                          </button>
                        </li>
                        <li className="mr-2" role="presentation">
                          <button
                            className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-xl font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
                              activeTab === "unsubscribe_flow" ? "active" : ""
                            }`}
                            id="unsubscribe_flow-tab"
                            onClick={() => handleTabClick("unsubscribe_flow")}
                            type="button"
                            role="tab"
                            aria-controls="unsubscribe_flow"
                            aria-selected={activeTab === "unsubscribe_flow"}
                          >
                            Unsubscribe flow
                          </button>
                        </li>
                        <li className="mr-2" role="presentation">
                          <button
                            className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-xl font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
                              activeTab === "domain_authentication"
                                ? "active"
                                : ""
                            }`}
                            id="domain_authentication-tab"
                            onClick={() =>
                              handleTabClick("domain_authentication")
                            }
                            type="button"
                            role="tab"
                            aria-controls="domain_authentication"
                            aria-selected={
                              activeTab === "domain_authentication"
                            }
                          >
                            Domain Authentication
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div id="myTabContent">
                      {activeTab === "senders" && (
                        <div
                          className="bg-gray-50 rounded-lg dark:bg-gray-800"
                          id="senders"
                          role="tabpanel"
                          aria-labelledby="senders-tab"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-3xl font-semibold"> Senders</h3>
                            <a
                              href="#add-sender"
                              data-modal-toggle="modal"
                              className="relative group flex items-center focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600"
                            >
                              <FaPlus className="text-2xl mr-2" />
                              Sender
                              <div className="absolute bottom-0 flex-col items-center hidden mb-10 group-hover:flex">
                                <span className="relative rounded-md z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                                Sender
                                </span>
                                <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                              </div>
                            </a>
                          </div>
                          <div className="w-1/2 mx-auto bg-white dark:bg-slate-800 shadow-md  rounded-lg relative p-4 text-center">
                            <img
                              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDI0MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEyMCIgY3k9IjgwIiByPSI2NiIgZmlsbD0iI0VERUVGMCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTc2LjM0MzggMTI5LjVDNzUuNzg3NyAxMjkuMDA5IDc1LjIzOTkgMTI4LjUwOSA3NC43MDA3IDEyOEwxNjUuMjk5IDEyOEMxNjQuNzYgMTI4LjUwOSAxNjQuMjEyIDEyOS4wMDkgMTYzLjY1NiAxMjkuNUw3Ni4zNDM4IDEyOS41WiIgZmlsbD0iIzZENzg4OCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE0NC4zNCAxNDEuMzY3TDEzOC41IDEyOUgxMTcuMDZDMTE2LjU2IDEyOSAxMDkuMzU2IDEyNy42NzcgMTAzLjA2IDEyMkM5My41NTk3IDExMy40MzMgOTEuNjk2NyA5Ny42NjM0IDkzLjc1MjcgOTAuODI0NkwxMDEuMzQyIDY1LjU4MDFDMTAxLjQ2OCA2NS4zNjAyIDEwMS41NzYgNjUuMTI5OSAxMDEuNjY3IDY0Ljg5MDhMMTA0LjUyOSA1Ny4zNTVDMTA1LjQzMSA1NC45Nzc2IDEwNC4xNzIgNTIuMzI2OSAxMDEuNzU5IDUxLjUyNDhDMTAxLjM0NyA1MS4zODc4IDEwMC45MjcgNTEuMzE0IDEwMC41MTEgNTEuMjk4OUM5OS4yNTUxIDUxLjMwMzkgOTcuODY3MSA1MS41NTgzIDk3LjA5OCA1MS43MjNDOTYuNzkzNSA1MS43ODgyIDk2LjUwMTMgNTEuNTU3MiA5Ni41MDEzIDUxLjI0NThDOTcuNTQ1MSA0OS43MzMgOTkuMDczNSA0OC41ODAyIDEwMC44NjIgNDguMDExOEMxMDEuNzcyIDQzLjk2NDcgMTA1LjM4MiA0MSAxMDkuNjM0IDQxQzEwOS43MDggNDEgMTA5Ljc4MSA0MS4wMDA5IDEwOS44NTQgNDEuMDAyNkMxMDkuOTI3IDQxLjAwMDkgMTEwLjAwMSA0MSAxMTAuMDc0IDQxQzExNC43MjkgNDEgMTE4LjYxNSA0NC41NTMzIDExOS4wMyA0OS4xOTAyTDEyMC4yNjggNjMuMDA4OUMxMjAuMzc2IDY0LjIxMTIgMTIwLjU1MyA2NS40IDEyMC43OTYgNjYuNTcwMkMxMjQuMzIgNzUuMjI4OSAxMzYgODggMTM2IDg4TDE0OC41IDEwNUwxNDcgMTI2LjY0NEwxNTQuNTgzIDEzNi4yMjVDMTUxLjM0NCAxMzguMjIxIDE0Ny45MTkgMTM5Ljk0NiAxNDQuMzQgMTQxLjM2N1oiIGZpbGw9IiM2RDc4ODgiLz4KPHBhdGggZD0iTTEzOCA4NkMxMzcuNzM5IDg2LjM0MjQgMTM3LjQ3MiA4Ni42ODA1IDEzNy4yIDg3LjAxNDJDMTI5Ljc0OSA5Ni4xNjY0IDExOC40NzMgMTAyIDEwNS44NTIgMTAyQzEwMC42MSAxMDIgOTUuNjAwMyAxMDAuOTk0IDkxIDk5LjE2MTMiIHN0cm9rZT0iI0VERUVGMCIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KPHBhdGggZD0iTTExNCAxMjhDMTEzLjQ0OCAxMjggMTEzIDEyOC40NDggMTEzIDEyOVYxMzJDMTEzIDEzMi41NTIgMTEzLjQ0OCAxMzMgMTE0IDEzM0MxMTQuNTUyIDEzMyAxMTUgMTMyLjU1MiAxMTUgMTMyVjEyOUMxMTUgMTI4LjQ0OCAxMTQuNTUyIDEyOCAxMTQgMTI4WiIgZmlsbD0iI0I2QkJDMyIvPgo8cGF0aCBkPSJNMTI0IDEyOEMxMjMuNDQ4IDEyOCAxMjMgMTI4LjQ0OCAxMjMgMTI5VjEzMkMxMjMgMTMyLjU1MiAxMjMuNDQ4IDEzMyAxMjQgMTMzQzEyNC41NTIgMTMzIDEyNSAxMzIuNTUyIDEyNSAxMzJWMTI5QzEyNSAxMjguNDQ4IDEyNC41NTIgMTI4IDEyNCAxMjhaIiBmaWxsPSIjQjZCQkMzIi8+CjxwYXRoIGQ9Ik0xMTYgMTI5QzExNiAxMjguNDQ4IDExNi40NDggMTI4IDExNyAxMjhDMTE3LjU1MiAxMjggMTE4IDEyOC40NDggMTE4IDEyOVYxMzJDMTE4IDEzMi41NTIgMTE3LjU1MiAxMzMgMTE3IDEzM0MxMTYuNDQ4IDEzMyAxMTYgMTMyLjU1MiAxMTYgMTMyVjEyOVoiIGZpbGw9IiNCNkJCQzMiLz4KPHBhdGggZD0iTTEyNyAxMjhDMTI2LjQ0OCAxMjggMTI2IDEyOC40NDggMTI2IDEyOVYxMzJDMTI2IDEzMi41NTIgMTI2LjQ0OCAxMzMgMTI3IDEzM0MxMjcuNTUyIDEzMyAxMjggMTMyLjU1MiAxMjggMTMyVjEyOUMxMjggMTI4LjQ0OCAxMjcuNTUyIDEyOCAxMjcgMTI4WiIgZmlsbD0iI0I2QkJDMyIvPgo8cGF0aCBkPSJNMTI0LjI5NCAxMTUuODg1QzEyMC45NTkgMTEwLjIzNyAxMTguMjIxIDEwMy4zNDEgMTE2Ljk5OCA5Ni40MzIzQzExNC4xMTggODAuMTcxIDEzMS40MjEgNzguODcwNCAxNDAuOTMzIDkwLjk1NDhMMTgxLjAzNyAxNDEuOTA0QzE4MS4wMzcgMTQxLjkwNCAxMzIuNTIzIDEyOS44MjIgMTI0LjI5NCAxMTUuODg1WiIgZmlsbD0iI0M4Q0NEMiIvPgo8cGF0aCBkPSJNMTQxLjM2NCA5OC4yOTc0QzE0MS4wOTIgOTcuOTU1MSAxNDAuNTk2IDk3LjkwMDIgMTQwLjI1NyA5OC4xNzQ4QzEzOS45MTggOTguNDQ5MyAxMzkuODYzIDk4Ljk0OTMgMTQwLjEzNiA5OS4yOTE1TDE1MS4yNTQgMTEzLjI3M0MxNTEuNTE5IDExMy42MDYgMTUxLjk5OCAxMTMuNjc2IDE1Mi4zNDIgMTEzLjQyNUMxNTIuNzA3IDExMy4xNTkgMTUyLjc3MiAxMTIuNjQyIDE1Mi40OTEgMTEyLjI4OUwxNDEuMzY0IDk4LjI5NzRaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTU2LjgzMyAxMTcuNzQ5QzE1Ni41NyAxMTcuNDE4IDE1Ni4wOSAxMTcuMzU4IDE1NS43NDkgMTE3LjYxQzE1NS4zOTEgMTE3Ljg3NSAxNTUuMzE5IDExOC4zODQgMTU1LjU5NyAxMTguNzMzTDE1Ni41OTggMTE5Ljk5MUMxNTYuODcgMTIwLjMzNCAxNTcuMzY1IDEyMC4zODkgMTU3LjcwNSAxMjAuMTE0QzE1OC4wNDQgMTE5Ljg0IDE1OC4wOTggMTE5LjM0IDE1Ny44MjYgMTE4Ljk5N0wxNTYuODMzIDExNy43NDlaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTQ5LjQwOSAxMTUuMzk5QzE0OS44MDcgMTE1LjE1MiAxNDkuOSAxMTQuNjE2IDE0OS42MTYgMTE0LjI0M0wxNDAuMzkyIDEwMi4xNjVDMTQwLjEyNyAxMDEuODE4IDEzOS42MzMgMTAxLjc1MyAxMzkuMjg4IDEwMi4wMjFDMTM4Ljk0MyAxMDIuMjg4IDEzOC44NzkgMTAyLjc4NyAxMzkuMTQ1IDEwMy4xMzVMMTQ4LjM2IDExNS4yMDJDMTQ4LjYwOCAxMTUuNTI3IDE0OS4wNjEgMTE1LjYxNSAxNDkuNDA5IDExNS4zOTlaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTUyLjYxIDEyMC43NjdDMTUyLjMzIDEyMC40MDEgMTUyLjQyOCAxMTkuODc0IDE1Mi44MTYgMTE5LjYyNkMxNTMuMTYgMTE5LjQwNiAxNTMuNjE3IDExOS40ODMgMTUzLjg2NiAxMTkuODA4TDE1Ni42OTEgMTIzLjUwOEMxNTYuOTU2IDEyMy44NTUgMTU2Ljg5MiAxMjQuMzU0IDE1Ni41NDggMTI0LjYyMkMxNTYuMjAzIDEyNC44OSAxNTUuNzA4IDEyNC44MjUgMTU1LjQ0MyAxMjQuNDc3TDE1Mi42MSAxMjAuNzY3WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE0Ni44NTUgMTE2Ljg3NUMxNDcuMjkxIDExNi42NDEgMTQ3LjQwMiAxMTYuMDY5IDE0Ny4wOTQgMTE1LjY4MkwxMzkuNDAxIDEwNi4wMDlDMTM5LjEyOSAxMDUuNjY2IDEzOC42MzQgMTA1LjYxMSAxMzguMjk0IDEwNS44ODZDMTM3Ljk1NSAxMDYuMTYgMTM3LjkwMSAxMDYuNjYgMTM4LjE3MyAxMDcuMDAzTDE0NS44NTcgMTE2LjY2NkMxNDYuMDk3IDExNi45NjcgMTQ2LjUxNiAxMTcuMDU3IDE0Ni44NTUgMTE2Ljg3NVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNTAuMjYgMTIyLjIwMkMxNDkuOTYgMTIxLjgyNCAxNTAuMDczIDEyMS4yNjYgMTUwLjQ5MyAxMjEuMDI3QzE1MC44MjkgMTIwLjgzNiAxNTEuMjU2IDEyMC45MTUgMTUxLjQ5NyAxMjEuMjE4TDE1NS44NjMgMTI2LjcwOEMxNTYuMTM2IDEyNy4wNTEgMTU2LjA4MSAxMjcuNTUxIDE1NS43NDIgMTI3LjgyNUMxNTUuNDAzIDEyOC4xIDE1NC45MDcgMTI4LjA0NSAxNTQuNjM1IDEyNy43MDNMMTUwLjI2IDEyMi4yMDJaIiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIHI9IjEuMjUyNjciIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDEwOC45NzQgNDcuMjYzNCkiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNDkuNzUgMzAuODEyNUMxNDkuNzUgMjkuMzYyOCAxNTAuOTI1IDI4LjE4NzUgMTUyLjM3NSAyOC4xODc1SDE5OS42MjVDMjAxLjA3NSAyOC4xODc1IDIwMi4yNSAyOS4zNjI4IDIwMi4yNSAzMC44MTI1VjYzLjE4NzVDMjAyLjI1IDY0LjYzNzIgMjAxLjA3NSA2NS44MTI1IDE5OS42MjUgNjUuODEyNUgxNTIuMzc1QzE1MC45MjUgNjUuODEyNSAxNDkuNzUgNjQuNjM3MiAxNDkuNzUgNjMuMTg3NVYzMC44MTI1WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0iI0VERUVGMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTU2LjMxMiAzNC43NUwxNzIuNzc3IDQ3LjU1NTZDMTc0LjY3MyA0OS4wMzAxIDE3Ny4zMjcgNDkuMDMwMSAxNzkuMjIzIDQ3LjU1NTZMMTk1LjY4OCAzNC43NSIgc3Ryb2tlPSIjQjZCQkMzIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
                              alt="existing-leads"
                              className=" inline-block"
                            />
                            <div className="flex-auto p-4">
                              <h3 className="block mb-4 text-[16px] font-medium tracking-tight text-gray-800 dark:text-white">
                                Add sender information to start sending
                                campaigns
                              </h3>
                              <p className="mb-4">
                                You can set up multiple senders for different
                                purposes. Senders will be available to all users
                                who are sending marketing campaigns.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeTab === "unsubscribe_flow" && (
                        <div
                          className="bg-gray-50 rounded-lg dark:bg-gray-800"
                          id="unsubscribe_flow"
                          role="tabpanel"
                          aria-labelledby="unsubscribe_flow-tab"
                        >
                          <div className="flex items-center justify-between mb-5">
                            <h3 className="text-3xl font-semibold">
                              {" "}
                              Unsubscribe preview
                            </h3>
                            <p>
                              The footer of all your email campaigns contains
                              the unsubscribe link.
                            </p>
                          </div>
                          <div className="w-1/2 mx-auto">
                            <h3 className="text-xl font-semibold">
                              1. Contact clicks on the unsubscribe link{" "}
                            </h3>
                            <div className="bg-white dark:bg-slate-800 border border-gray-200 rounded-lg relative p-5 text-center mb-8">
                              <p className="block mb-4">lal</p>
                              <p className="block mb-4">, , , ,</p>
                              <p className="mb-4">
                                No longer interested in receiving emails?{" "}
                                <a href="#" className="text-blue-600">
                                  Unsubscribe here
                                </a>
                                .
                              </p>
                            </div>
                            <h3 className="text-xl font-semibold">
                              2. The contact confirms they want to unsubscribe{" "}
                            </h3>
                            <div className="bg-white dark:bg-slate-800 border border-gray-200 rounded-lg relative text-center mb-5">
                              <div className="border-b border-gray-200 flex items-center px-4 py-2">
                                <i className="ti ti-dots text-5xl text-gray-200 mr-3 leading-5"></i>
                                <div className="h-4 w-full bg-gray-200 rounded-lg"></div>
                              </div>
                              <div className="flex items-center justify-center mb-8 p-5">
                                <img
                                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA3MiA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiM3QkFBRUQiLz4KPHBhdGggZD0iTTE0LjgxNjkgNTlDMTAuMzIzNyA1Ni4xMzQ1IDYuNTkzNjQgNTIuMTc4MSA0IDQ3LjUwNFYzMS4wNjgyQzQgMjkuOTI2IDQuOTI1OTYgMjkgNi4wNjgxOCAyOUg0MS45MzE4QzQzLjA3NCAyOSA0NCAyOS45MjYgNDQgMzEuMDY4MlY1Ni45MzE4QzQ0IDU4LjA3NCA0My4wNzQgNTkgNDEuOTMxOCA1OUgxNC44MTY5WiIgZmlsbD0iI0JERDRGNSIvPgo8cGF0aCBkPSJNNjEuNjc0IDQ0QzYzLjE3NCA0MC4yOTQzIDY0IDM2LjI0MzcgNjQgMzIuMDAwMUM2NCAyNS43NTM4IDYyLjIxMDMgMTkuOTI1NSA1OS4xMTU4IDE1SDI5QzI3Ljg5NTQgMTUgMjcgMTUuODk1NCAyNyAxN1Y0MkMyNyA0My4xMDQ2IDI3Ljg5NTQgNDQgMjkgNDRINjEuNjc0WiIgZmlsbD0iIzMxN0FFMiIvPgo8cGF0aCBkPSJNNy4zMzMzNyAzMi42NjY3TDIxLjQyNzMgNDQuNTA1NkMyMi45MTQ5IDQ1Ljc1NTIgMjUuMDg1MiA0NS43NTUyIDI2LjU3MjggNDQuNTA1NkwzNy43MzY0IDM1LjEyODJMNDAuNjY2NyAzMi42NjY3IiBzdHJva2U9IiMyNjI5MkMiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAxMS4wNjgyQzMyIDkuOTI1OTYgMzIuOTI2IDkgMzQuMDY4MiA5SDY5LjkzMThDNzEuMDc0IDkgNzIgOS45MjU5NiA3MiAxMS4wNjgyVjM2LjkzMThDNzIgMzguMDc0IDcxLjA3NCAzOSA2OS45MzE4IDM5SDM0LjA2ODJDMzIuOTI2IDM5IDMyIDM4LjA3NCAzMiAzNi45MzE4VjExLjA2ODJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMzUuMzMzNCAxMi4zMzM1TDQ5LjQyNzMgMjQuMTcyNEM1MC45MTQ5IDI1LjQyMTkgNTMuMDg1MiAyNS40MjE5IDU0LjU3MjggMjQuMTcyNEw2NS43MzY0IDE0Ljc5NDlMNjguNjY2NyAxMi4zMzM1IiBzdHJva2U9IiMyNjI5MkMiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTIzIDE2SDExTTIzIDIySDE3IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
                                  alt=""
                                />
                              </div>
                              <h3 className="text-2xl font-bold px-5">
                                Are you sure about unsubscribing?
                              </h3>
                              <p className="mb-4 px-5">
                                If you unsubscribe, you won't receive marketing
                                emails to this email ({" "}
                                <a href="#" className="text-blue-600">
                                  contact@example.com
                                </a>
                                ) from lal in the future.{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeTab === "domain_authentication" && (
                        <div
                          className="bg-gray-50 rounded-lg dark:bg-gray-800"
                          id="domain_authentication"
                          role="tabpanel"
                          aria-labelledby="domain_authentication-tab"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-3xl font-semibold">
                              {" "}
                              Domain authentication
                            </h3>
                            <a
                              href="#add_domain"
                              data-modal-toggle="modal"
                              className="relative group flex items-center focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                            >
                              <FaPlus className="text-3xl mr-2" />
                              Domain
                              <div className="absolute bottom-0 flex-col items-center hidden mb-10 group-hover:flex">
                                <span className="relative rounded-md z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                                  Go to contacts
                                </span>
                                <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                              </div>
                            </a>
                          </div>
                          <div className="w-1/2 mx-auto bg-white dark:bg-slate-800 shadow-md  rounded-lg relative p-4 text-center">
                            <img
                              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDI0MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF82NjBfMTk3MTgpIj4KPHBhdGggZD0iTTU5LjI3MDUgNTMuOTEyMkM1OS4yNzA1IDUyLjYzMTYgNjAuMzA4NiA1MS41ODY3IDYxLjU4OTMgNTEuNTg2N0gxNzguNDNDMTc5LjcxIDUxLjU4NjcgMTgwLjc0OCA1Mi42MjQ4IDE4MC43NDggNTMuOTA1NFYxMzMuNjkySDU5LjI3MDVDNTkuMjcwNSAxMDIuNDEyIDU5LjI3MDUgODQuNTM3OSA1OS4yNzA1IDUzLjkxMjJaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjQ0JFMkVGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xODYuMDY4IDgzLjI0NzRDMTg2LjA2OCA4MC43NzggMTg1LjAzMiA3OC40MjE4IDE4My4yMTMgNzYuNzUyTDE4MC45NSA3NS4wMDAyVjg2Ljc2MjlMMTIwLjI2MyAxMzEuMzczQzExOS4zNTUgMTMyLjA0MSAxMTguMTE1IDEzMi4wMjggMTE3LjIyMSAxMzEuMzQzTDU5LjA1MDIgODYuNzYyOVY3NC43NzJMNTYuNTU5MSA3Ni43NjQ4QzU0LjgwNDkgNzguNDI5NiA1My44MTE1IDgwLjc0MTkgNTMuODExNSA4My4xNjAzVjE1NS4xNkgxODYuMDY4VjgzLjI0NzRaIiBmaWxsPSIjQ0JFMkVGIi8+CjxwYXRoIGQ9Ik04Ny45MjMgNTEuNjc1SDE1MC44MTlMMTI3LjkzMSAzMy45NTc0QzEyMi44MTEgMjkuMjU3IDExNC45MjUgMjkuMzIyNiAxMDkuODg0IDM0LjEwNzVMODcuOTIzIDUxLjY3NVoiIGZpbGw9IiNDQkUyRUYiLz4KPHBhdGggZD0iTTM1LjIgMTU1LjAyNUwyMTUuNCAxNTUuMDI1IiBzdHJva2U9IiNEQURERTEiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTMyLjUgNTguNzVWMzIuMjVNMTkuMjUgNDUuNUw0NS43NSA0NS41IiBzdHJva2U9IiMyNkIyNTkiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xNzMuMzYxIDIyLjE0MTdMMTc4Ljk1OCAxOS41OTc0TDE4MS41MDMgMTRMMTg0LjA0NyAxOS41OTc0TDE4OS42NDQgMjIuMTQxN0wxODQuMDQ3IDI0LjY4NkwxODEuNTAzIDMwLjI4MzRMMTc4Ljk1OCAyNC42ODZMMTczLjM2MSAyMi4xNDE3WiIgZmlsbD0iI0ZGREY1QyIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIxMC45NzUgNjAuOTVMMjA3IDU2Ljk3NDZMMjEwLjk3NSA1M0wyMTQuOTUgNTYuOTc0NkwyMTAuOTc1IDYwLjk1WiIgZmlsbD0iI0ZGREY1QyIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEyMCA2NC4yTDEyMS41MiA2NS4wNTYxQzEyOC4yOSA2OC44Njg5IDEzNS44OTUgNzAuOTU0MSAxNDMuNjYzIDcxLjEyNzFDMTQ1Ljc5IDg4LjMwNiAxMzcuODM3IDEwOS42NTkgMTIwIDExOC42QzEwMi4xNjMgMTA5LjY1OSA5NC4yMDk1IDg4LjMwNiA5Ni4zMzY5IDcxLjEyNzFDMTA0LjEwNSA3MC45NTQxIDExMS43MSA2OC44Njg5IDExOC40OCA2NS4wNTYxTDEyMCA2NC4yWiIgZmlsbD0iIzRBOEFFNiIvPgo8cGF0aCBkPSJNMTEwLjkzIDkxLjkyMzVMMTE2LjkxOCA5Ny44MzIzQzExNi45MTggOTcuODMyMyAxMjUuNzI2IDg3LjE0NzEgMTMyLjk5MSA4Mi4zODM4IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzY2MF8xOTcxOCI+CjxyZWN0IHdpZHRoPSIyMTIiIGhlaWdodD0iMTU5IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg=="
                              alt="existing-leads"
                              className=" inline-block"
                            />
                            <div className="flex-auto p-4">
                              <h3 className="block mb-4 text-[16px] font-medium tracking-tight text-gray-800 dark:text-white">
                                Add sender information to start sending
                                campaigns
                              </h3>
                              <p className="mb-4">
                                You can set up multiple senders for different
                                purposes. Senders will be available to all users
                                who are sending marketing campaigns.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
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

export default Settings;
