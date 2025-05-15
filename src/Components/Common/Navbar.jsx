/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Avatar from "../../Images/users/avatar-2.jpg";
import Avatar1 from "../../Images/users/avatar-3.jpg";
import Avatar2 from "../../Images/users/avatar-9.jpg";
import Avatar3 from "../../Images/users/avatar-6.jpg";
import Avatar4 from "../../Images/users/avatar-1.jpg";
import { FaAnglesLeft, FaAnglesRight, FaRegBell } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { TbApps, TbBulb } from "react-icons/tb";
import { MdHelpOutline } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../Redux/AuthSlice";
import toast from "react-hot-toast";
import { useDispatch, } from "react-redux";
import { useSelector } from "react-redux";
import { ImageUrl } from "./API";



const Navbar = ({ isVisible, setIsVisible, isDark, setIsDark }) => {
  const { user, token, userDetails } = useSelector((state) => state.root.auth);

  const [isDropdownOpenApp, setIsDropdownOpenApp] = useState(false);
  const [isDropdownOpenHelp, setIsDropdownOpenHelp] = useState(false);
  const [isDropdownOpenBulb, setIsDropdownOpenBulb] = useState(false);
  const [isDropdownOpenBell, setIsDropdownOpenBell] = useState(false);
  const [isDropdownOpenUser, setIsDropdownOpenUser] = useState(false);


  const navigate = useNavigate()
  const dispatch = useDispatch();



  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const toggleDropdownApp = () => {
    setIsDropdownOpenApp(!isDropdownOpenApp);
    setIsDropdownOpenHelp(false);
    setIsDropdownOpenBulb(false);
    setIsDropdownOpenBell(false);
    setIsDropdownOpenUser(false);
  };

  const toggleDropdownHelp = () => {
    setIsDropdownOpenHelp(!isDropdownOpenHelp);
    setIsDropdownOpenBell(false);
    setIsDropdownOpenBulb(false);
    setIsDropdownOpenApp(false);
    setIsDropdownOpenUser(false);
  };

  const toggleDropdownBulb = () => {
    setIsDropdownOpenBulb(!isDropdownOpenBulb);
    setIsDropdownOpenHelp(false);
    setIsDropdownOpenBell(false);
    setIsDropdownOpenApp(false);
    setIsDropdownOpenUser(false);
  };

  const toggleDropdownBell = () => {
    setIsDropdownOpenBell(!isDropdownOpenBell);
    setIsDropdownOpenHelp(false);
    setIsDropdownOpenBulb(false);
    setIsDropdownOpenApp(false);
    setIsDropdownOpenUser(false);
  };

  const toggleDropdownUser = () => {
    setIsDropdownOpenUser(!isDropdownOpenUser);
    setIsDropdownOpenBulb(false);
    setIsDropdownOpenHelp(false);
    setIsDropdownOpenBell(false);
    setIsDropdownOpenApp(false);
  };

  return (
    <>
      <div className="fixed right-1 left-1 print:hidden z-[99]">
        <nav
          id="topbar"
          className="topbar border-gray-200 relative lg:mr-0 xl:ml-[calc(260px+32px)] xl:mr-[calc(260px+32px)] duration-300 block nav-sticky"
        >
          <div className="mx-0 flex max-w-full flex-wrap items-center lg:mx-auto">
            <div className="mr-2 lg:mr-4 ml-2 lg:ml-4 xl:ml-0">
              <button
                id="toggle-menu-hide"
                className="button-menu-mobile flex md:mr-0 relative"
                onClick={toggleVisibility}
              >
                {/* <i className="ti ti-chevrons-left text-3xl  top-icon"></i> */}
                {isVisible ? (
                  <FaAnglesLeft className="text-3xl top-icon" />
                ) : (
                  <FaAnglesRight className="text-3xl top-icon" />
                )}
              </button>
            </div>
            <div className="flex items-center md:w-[50%] lg:w-[40%] xl:w-[30%]">
              <div className="relative mr-2 ml-2 hidden lg:mr-4 md:block lg:block w-full">
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 flex items-center
                    pl-3"
                >
                  <IoSearch className="text-gray-400 z-10" />
                </div>
                <input
                  type="text"
                  id="email-adress-icon"
                  className="block w-full rounded-lg border border-slate-200 dark:border-slate-700/60 bg-slate-200/10 p-2
                    pl-10 text-slate-600 dark:text-slate-400 outline-none focus:border-slate-300 focus:ring-slate-300 dark:bg-slate-800/20 sm:text-sm"
                  placeholder="Search Pipedrive..."
                />
              </div>
            </div>
            <button
              type="button"
              className="tippy-btn inline-block focus:outline-none text-slate-500 hover:bg-slate-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-slate-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-slate-500 py-1.5 px-1.5  rounded-full"
              data-tippy-content="Quick Add +"
              data-tippy-arrow="true"
              data-tippy-placement="bottom"
            >
              <FiPlus className="text-3xl" />
            </button>

            <div className="order-1 ml-auto flex items-center md:order-2">
              <div className="mr-2 lg:mr-4 ml-2 lg:ml-4">
                <button
                  onClick={() => setIsDark(!isDark)}
                  id="toggle-theme"
                  className="flex rounded-full md:mr-0 relative"
                >
                  {isDark ? (
                    <LuSun className="text-3xl top-icon" />
                  ) : (
                    <FaRegMoon className="text-3xl top-icon" />
                  )}
                </button>
              </div>

              <div className="mr-2 lg:mr-4 ml-2 lg:ml-4 dropdown relative">
                <button
                  type="button"
                  className="dropdown-toggle flex rounded-full md:mr-0"
                  id="Myapps"
                  aria-expanded={isDropdownOpenApp ? "true" : "false"}
                  data-dropdown-toggle="navMyapps"
                  onClick={toggleDropdownApp}
                >
                  <TbApps className="text-3xl top-icon" />
                </button>

                <div
                  className={`dropdown-menu dropdown-menu-right  right-0 z-50 my-1 ${isDropdownOpenApp ? "block" : "hidden"
                    } w-64 list-none divide-y h-52 divide-gray-100 rounded border-slate-700 md:border-white text-base shadow dark:divide-gray-600 bg-white dark:bg-slate-800`}
                  id="navMyapps"
                  data-simplebar
                >
                  <ul className="py-1" aria-labelledby="navMyapps">
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Karen Robinson ghj
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              Hey ! i'm available here
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar1}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Your order is placed
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              Dummy text of the printing and industry.
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar2}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Robert McCray
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              Good Morning!
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar3}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Meeting with designers
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              It is a long established fact that a reader.
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mr-2 lg:mr-4 ml-2 lg:ml-4 dropdown relative">
                <button
                  type="button"
                  className="dropdown-toggle flex rounded-full md:mr-0"
                  id="Quickhelp"
                  aria-expanded={isDropdownOpenHelp ? "true" : "false"}
                  data-dropdown-toggle="navQuickhelp"
                  onClick={toggleDropdownHelp}
                >
                  <MdHelpOutline className="text-3xl top-icon" />
                </button>

                <div
                  className={`dropdown-menu dropdown-menu-right right-0 z-50 my-1 ${isDropdownOpenHelp ? "block" : "hidden"
                    } w-64 list-none divide-y h-52 divide-gray-100 rounded border-slate-700 md:border-white text-base shadow dark:divide-gray-600 bg-white dark:bg-slate-800`}
                  id="navQuickhelp"
                  data-simplebar
                >
                  <ul className="py-1" aria-labelledby="navQuickhelp">
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Karen Robinson
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              Hey ! i'm available here
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar1}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Your order is placed
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              Dummy text of the printing and industry.
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar2}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Robert McCray
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              Good Morning!
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar3}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Meeting with designers
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              It is a long established fact that a reader.
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mr-2 lg:mr-4 ml-2 lg:ml-4 dropdown relative">
                <button
                  type="button"
                  className="dropdown-toggle flex rounded-full md:mr-0"
                  id="Salesassistant"
                  aria-expanded={isDropdownOpenBulb ? "true" : "false"}
                  data-dropdown-toggle="navSalesassistant"
                  onClick={toggleDropdownBulb}
                >
                  <TbBulb className="text-3xl top-icon" />
                </button>

                <div
                  className={`dropdown-menu dropdown-menu-right right-0 z-50 my-1  ${isDropdownOpenBulb ? "block" : "hidden"
                    } w-64 list-none divide-y h-52 divide-gray-100 rounded border-slate-700 md:border-white text-base shadow dark:divide-gray-600 bg-white dark:bg-slate-800`}
                  id="navSalesassistant"
                  data-simplebar
                >
                  <ul className="py-1" aria-labelledby="navSalesassistant">
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Karen Robinson ghj
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              Hey ! i'm available here
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar1}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Your order is placed
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              Dummy text of the printing and industry.
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar2}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Robert McCray
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              Good Morning!
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar3}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Meeting with designers
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              It is a long established fact that a reader.
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mr-2 lg:mr-4 ml-2 lg:ml-4 dropdown relative">
                <button
                  type="button"
                  className="dropdown-toggle flex rounded-full md:mr-0"
                  id="Notifications"
                  aria-expanded={isDropdownOpenBell ? "true" : "false"}
                  data-dropdown-toggle="navNotifications"
                  onClick={toggleDropdownBell}
                >
                  <FaRegBell className="text-3xl top-icon" />
                </button>

                <div
                  className={`dropdown-menu dropdown-menu-right right-0 z-50 my-1 ${isDropdownOpenBell ? "block" : "hidden"
                    } w-64 list-none divide-y h-52 divide-gray-100 rounded border-slate-700 md:border-white text-base shadow dark:divide-gray-600 bg-white dark:bg-slate-800`}
                  id="navNotifications"
                  data-simplebar
                >
                  <ul className="py-1" aria-labelledby="navNotifications">
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Karen Robinson
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              Hey ! i'm available here
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar1}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Your order is placed
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              Dummy text of the printing and industry.
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar2}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Robert McCray
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              Good Morning!
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="py-2 px-4">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <div className="flex align-items-start">
                          <img
                            className="object-cover rounded-full h-8 w-8 shrink-0 mr-3"
                            src={Avatar3}
                            alt="logo"
                          />
                          <div className="flex-grow ml-0.5 overflow-hidden">
                            <p
                              className="text-sm font-medium text-gray-800 truncate
                                dark:text-gray-300"
                            >
                              Meeting with designers
                            </p>
                            <p
                              className="text-gray-500 mb-0 text-xs truncate
                                dark:text-gray-400"
                            >
                              It is a long established fact that a reader.
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mr-2 lg:mr-0 dropdown relative">
                <button
                  type="button"
                  className="dropdown-toggle flex items-center rounded-full text-sm focus:bg-none focus:ring-0 dark:focus:ring-0 md:mr-0"
                  id="user-profile"
                  aria-expanded={isDropdownOpenUser ? "true" : "false"}
                  data-dropdown-toggle="navUserdata"
                  onClick={toggleDropdownUser}
                >
                  {userDetails?.profilePic ? (
                    <img className=" w-9 h-9  rounded-full mr-3 " src={`${ImageUrl}${userDetails?.profilePic}`} alt="user" />
                  ) : (
                    <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-blue-200 rounded-full dark:bg-blue-300 mr-3 ">
                      <span class="font-semibold font-serif text-2xl text-blue-600 dark:text-blue-300">{!!userDetails?.userName && userDetails?.userName.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <span className="ltr:ml-2 rtl:ml-0 rtl:mr-2 hidden text-left xl:block">
                    <span className="block font-medium text-slate-600 dark:text-gray-400">
                      {userDetails?.userName}
                    </span>
                    <span className="-mt-1 block text-xs text-slate-500 dark:text-gray-500">
                      {userDetails?.userRoleName}
                    </span>
                  </span>
                </button>

                <div
                  className={`dropdown-menu dropdown-menu-right right-0 z-50 my-1 ${isDropdownOpenUser ? "block" : "hidden"
                    } list-none
                    divide-y divide-gray-100 rounded border-slate-700 md:border-white
                    text-base shadow dark:divide-gray-600 bg-white dark:bg-slate-800`}
                  id="navUserdata"
                >
                  {/* <div className="pt-3 px-4">
                    <span
                      className="block truncate text-sm text-gray-700 hover:bg-gray-50
                      dark:text-gray-200 dark:hover:bg-gray-900/20
                      dark:hover:text-white"
                    >
                      {userDetails?.email}
                    </span>
                  </div> */}
                  <ul className="py-1" aria-labelledby="navUserdata">
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-50
                          dark:text-gray-200 dark:hover:bg-gray-900/20
                          dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    {/* <li>
                      <a
                        href="#"
                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-50
                          dark:text-gray-200 dark:hover:bg-gray-900/20
                          dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li> */}
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-50
                          dark:text-gray-200 dark:hover:bg-gray-900/20
                          dark:hover:text-white"
                      >
                        Profile
                      </a>
                    </li>
                    <li className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white cursor-pointer"
                      onClick={() => {
                        toast.loading("Logout...");
                        setTimeout(() => { dispatch(handleLogout()); toast.remove(); navigate("/"); }, 1000)
                      }}
                    >
                      Log Out
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
