/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaArrowRightLong, FaCheck } from "react-icons/fa6";
import {
  LiaAtomSolid,
  LiaBarcodeSolid,
  LiaChessKingSolid,
  LiaChessKnightSolid,
} from "react-icons/lia";
const Pricing = ({ isVisible, setIsVisible, setSidebarOpen, sidebarOpen,isDark, setIsDark }) => {
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
                            Pricing
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
                              Pricing
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
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto text-center p-14">
                      <span className="inline-flex bg-primary-500/20 text-primary-500 font-semibold uppercase text-[0.688rem] leading-4 tracking-widest py-1 px-3 rounded-full mb-4">
                        Single
                      </span>
                      <h2 className="font-bold uppercase tracking-wide text-center mb-4 text-gray-800 dark:text-slate-400">
                        Basic Plan
                      </h2>
                      <div className="text-base font-medium mb-10 sm:mb-8 lg:mb-10">
                        <span className="flex items-center justify-center">
                          <ins className="text-5xl tracking-tight text-gray-800 font-extrabold no-underline mx-3 dark:text-slate-200">
                            $199
                          </ins>
                          <span className="text-gray-400">/month</span>
                        </span>
                      </div>
                      <div className="mb-8 sm:mb-0 xl:mb-12 flex flex-col items-center sm:block">
                        <ul
                          role="list"
                          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-1"
                        >
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Disk Space
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30 Email Accounts
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Monthly Bandwidth
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            06 Subdomains
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            10 Domains
                          </li>
                        </ul>
                      </div>
                      <div className="sm:hidden xl:block">
                        <a
                          href=""
                          className="block mx-auto text-center w-60 md:w-64 xl:w-60 bg-primary-500 text-white hover:bg-primary-600 rounded-lg font-semibold p-3 focus:outline-none"
                        >
                          Get this package
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto text-center p-14">
                      <span className="inline-flex bg-pink-500 text-white font-semibold uppercase text-[0.688rem] leading-4 tracking-widest py-1 px-3 rounded-full mb-4">
                        Popular
                      </span>
                      <h2 className="font-bold uppercase tracking-wide text-center mb-4 text-gray-800 dark:text-slate-400">
                        Premium Plan
                      </h2>
                      <div className="text-base font-medium mb-10 sm:mb-8 lg:mb-10">
                        <span className="flex items-center justify-center">
                          <ins className="text-5xl tracking-tight text-gray-800 font-extrabold no-underline mx-3 dark:text-slate-200">
                            $299
                          </ins>
                          <span className="text-gray-400">/month</span>
                        </span>
                      </div>
                      <div className="mb-8 sm:mb-0 xl:mb-12 flex flex-col items-center sm:block">
                        <ul
                          role="list"
                          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-1"
                        >
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Disk Space
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30 Email Accounts
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Monthly Bandwidth
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            06 Subdomains
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            10 Domains
                          </li>
                        </ul>
                      </div>
                      <div className="sm:hidden xl:block">
                        <a
                          href=""
                          className="block mx-auto text-center w-60 md:w-64 xl:w-60 bg-primary-500 text-white hover:bg-primary-600 rounded-lg font-semibold p-3 focus:outline-none"
                        >
                          Get this package
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto text-center p-14">
                      <span className="inline-flex bg-primary-500/20 text-primary-500 font-semibold uppercase text-[0.688rem] leading-4 tracking-widest py-1 px-3 rounded-full mb-4">
                        Bundle
                      </span>
                      <h2 className="font-bold uppercase tracking-wide text-center mb-4 text-gray-800 dark:text-slate-400">
                        Plus Plan
                      </h2>
                      <div className="text-base font-medium mb-10 sm:mb-8 lg:mb-10">
                        <span className="flex items-center justify-center">
                          <ins className="text-5xl tracking-tight text-gray-800 font-extrabold no-underline mx-3 dark:text-slate-200">
                            $499
                          </ins>
                          <span className="text-gray-400">/month</span>
                        </span>
                      </div>
                      <div className="mb-8 sm:mb-0 xl:mb-12 flex flex-col items-center sm:block">
                        <ul
                          role="list"
                          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-1"
                        >
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Disk Space
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30 Email Accounts
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Monthly Bandwidth
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            06 Subdomains
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            10 Domains
                          </li>
                        </ul>
                      </div>
                      <div className="sm:hidden xl:block">
                        <a
                          href=""
                          className="block mx-auto text-center w-60 md:w-64 xl:w-60 bg-primary-500 text-white hover:bg-primary-600 rounded-lg font-semibold p-3 focus:outline-none"
                        >
                          Get this package
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto text-center p-14">
                      <span className="inline-flex bg-primary-500/20 text-primary-500 font-semibold uppercase text-[0.688rem] leading-4 tracking-widest py-1 px-3 rounded-full mb-4">
                        Special
                      </span>
                      <h2 className="font-bold uppercase tracking-wide text-center mb-4 text-gray-800 dark:text-slate-400">
                        Master Plan
                      </h2>
                      <div className="text-base font-medium mb-10 sm:mb-8 lg:mb-10">
                        <span className="flex items-center justify-center">
                          <ins className="text-5xl tracking-tight text-gray-800 font-extrabold no-underline mx-3 dark:text-slate-200">
                            $799
                          </ins>
                          <span className="text-gray-400">/month</span>
                        </span>
                      </div>
                      <div className="mb-8 sm:mb-0 xl:mb-12 flex flex-col items-center sm:block">
                        <ul
                          role="list"
                          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-1"
                        >
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Disk Space
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30 Email Accounts
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Monthly Bandwidth
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            06 Subdomains
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            10 Domains
                          </li>
                        </ul>
                      </div>
                      <div className="sm:hidden xl:block">
                        <a
                          href=""
                          className="block mx-auto text-center w-60 md:w-64 xl:w-60 bg-primary-500 text-white hover:bg-primary-600 rounded-lg font-semibold p-3 focus:outline-none"
                        >
                          Get this package
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto  p-14 relative">
                      {/* <i className="las la-barcode absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400"></i> */}
                      <LiaBarcodeSolid className="absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400" />
                      <span className="bg-slate-600/5 dark:bg-slate-700/50 text-gray-800 dark:text-slate-300 text-[14px] font-normal px-4 py-2 rounded-full h-5">
                        {" "}
                        New Basic Plan
                      </span>
                      <div className="text-base font-medium mb-8 sm:mb-8 lg:mb-10 mt-8">
                        <span className="flex items-center">
                          <ins className="text-[40px] tracking-tight text-gray-800 font-thin no-underline mx-3 dark:text-slate-200">
                            $199
                          </ins>
                          <span className="text-gray-400">/month</span>
                        </span>
                      </div>
                      <p className="mb-5 dark:text-slate-400 font-medium text-base">
                        The consensus mechanism that connects Stacks and
                        Bitcoin.
                      </p>
                      <div className="mb-8 sm:mb-0 xl:mb-12 flex flex-col items-center sm:block">
                        <ul
                          role="list"
                          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-1"
                        >
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Disk Space
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30 Email Accounts
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Monthly Bandwidth
                          </li>
                        </ul>
                      </div>
                      <div className="xl:block">
                        <a
                          href=""
                          className="block text-primary-500  font-semibold  focus:outline-none"
                        >
                          Get this package{" "}
                          {/* <i className="fas fa-arrow-right-long self-center"></i> */}
                          <FaArrowRightLong className="self-center"/>

                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto  p-14 relative">
                      {/* <i className="las la-chess-knight absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400"></i> */}
                      <LiaChessKnightSolid className="absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400" />

                      <span className="bg-slate-600/5 dark:bg-slate-700/50 text-gray-800 dark:text-slate-300 text-[14px] font-normal px-4 py-2 rounded-full h-5">
                        {" "}
                        Best Premium Plan
                      </span>
                      <div className="text-base font-medium mb-8 sm:mb-8 lg:mb-10 mt-8">
                        <span className="flex items-center">
                          <ins className="text-[40px] tracking-tight text-gray-800 font-thin no-underline mx-3 dark:text-slate-200">
                            $299
                          </ins>
                          <span className="text-gray-400">/month</span>
                        </span>
                      </div>
                      <p className="mb-5 dark:text-slate-400 font-medium text-base">
                        The consensus mechanism that connects Stacks and
                        Bitcoin.
                      </p>
                      <div className="mb-8 sm:mb-0 xl:mb-12 flex flex-col items-center sm:block">
                        <ul
                          role="list"
                          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-1"
                        >
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Disk Space
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30 Email Accounts
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Monthly Bandwidth
                          </li>
                        </ul>
                      </div>
                      <div className="xl:block">
                        <a
                          href=""
                          className="block text-primary-500  font-semibold  focus:outline-none"
                        >
                          Get this package{" "}
                          {/* <i className="fas fa-arrow-right-long self-center"></i> */}
                          <FaArrowRightLong className="self-center"/>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto  p-14 relative">
                      {/* <i className="las la-atom absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400"></i> */}
                      <LiaAtomSolid className="absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400" />

                      <span className="bg-slate-600/5 dark:bg-slate-700/50 text-gray-800 dark:text-slate-300 text-[14px] font-normal px-4 py-2 rounded-full h-5">
                        {" "}
                        Latest Plus Plan
                      </span>
                      <div className="text-base font-medium mb-8 sm:mb-8 lg:mb-10 mt-8">
                        <span className="flex items-center">
                          <ins className="text-[40px] tracking-tight text-gray-800 font-thin no-underline mx-3 dark:text-slate-200">
                            $499
                          </ins>
                          <span className="text-gray-400">/month</span>
                        </span>
                      </div>
                      <p className="mb-5 dark:text-slate-400 font-medium text-base">
                        The consensus mechanism that connects Stacks and
                        Bitcoin.
                      </p>
                      <div className="mb-8 sm:mb-0 xl:mb-12 flex flex-col items-center sm:block">
                        <ul
                          role="list"
                          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-1"
                        >
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Disk Space
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30 Email Accounts
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Monthly Bandwidth
                          </li>
                        </ul>
                      </div>
                      <div className="xl:block">
                        <a
                          href=""
                          className="block text-primary-500  font-semibold  focus:outline-none"
                        >
                          Get this package{" "}
                          {/* <i className="fas fa-arrow-right-long self-center"></i> */}
                          <FaArrowRightLong className="self-center"/>

                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto  p-14 relative">
                      {/* <i className="las la-chess-king absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400"></i> */}
                      <LiaChessKingSolid className="absolute right-7 top-7 text-7xl text-slate-700 dark:text-slate-400" />

                      <span className="bg-slate-600/5 dark:bg-slate-700/50 text-gray-800 dark:text-slate-300 text-[14px] font-normal px-4 py-2 rounded-full h-5">
                        Exellent Master Plan
                      </span>
                      <div className="text-base font-medium mb-8 sm:mb-8 lg:mb-10 mt-8">
                        <span className="flex items-center">
                          <ins className="text-[40px] tracking-tight text-gray-800 font-thin no-underline mx-3 dark:text-slate-200">
                            $799
                          </ins>
                          <span className="text-gray-400">/month</span>
                        </span>
                      </div>
                      <p className="mb-5 dark:text-slate-400 font-medium text-base">
                        The consensus mechanism that connects Stacks and
                        Bitcoin.
                      </p>
                      <div className="mb-8 sm:mb-0 xl:mb-12 flex flex-col items-center sm:block">
                        <ul
                          role="list"
                          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-1"
                        >
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Disk Space
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30 Email Accounts
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            30GB Monthly Bandwidth
                          </li>
                          <li className="flex items-center lg:w-64 xl:w-auto text-gray-600 font-semibold  dark:text-slate-500">
                            <FaCheck className="mr-2 text-primary-400 text-xs" />
                            06 Subdomains
                          </li>
                        </ul>
                      </div>
                      <div className="xl:block">
                        <a
                          href=""
                          className="block text-primary-500  font-semibold  focus:outline-none"
                        >
                          Get this package{" "}
                          {/* <i className="fas fa-arrow-right-long self-center"></i> */}
                          <FaArrowRightLong className="self-center"/>
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

export default Pricing;
