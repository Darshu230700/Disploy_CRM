/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

export default function History() {
    return (
        <>
            <div
                className=""
                id="History"
                role="tabpanel"
                aria-labelledby="History-tab"
            >
                <div className="flex-auto pb-4">
                    <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                            <div className="flex items-center justify-start">
                                <span className="text-sm font-medium me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                    All
                                </span>
                                <span className="text-sm font-medium me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                    Today
                                </span>
                                <span className="text-sm font-medium me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                    Yesterday
                                </span>
                            </div>
                        </div>
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                            <div className="flex items-center justify-end">
                                <span className="text-sm font-medium me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                    All
                                </span>
                                <span className="text-sm font-medium me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                    Assigned
                                </span>
                                <span className="text-sm font-medium me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none">
                                    Not assigned
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                    <div className="sm:col-span-12 mx-auto">
                        <div className="w-full relative mb-4">
                            <div className="flex-auto p-4">
                                <svg
                                    width={240}
                                    height={120}
                                    viewBox="0 0 240 120"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M161.426 105.925L139.244 83.7426L143.486 79.5L165.668 101.683C166.84 102.854 166.84 104.754 165.668 105.925C164.497 107.097 162.597 107.097 161.426 105.925Z"
                                        fill="#B6BBC3"
                                    />
                                    <circle
                                        cx={114}
                                        cy={54}
                                        r={39}
                                        stroke="#B6BBC3"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M205.425 7.42871L200.97 11.6714M195.03 17.3282L190.575 21.5708M190.575 7.42871L195.03 11.6714M200.97 17.3282L205.425 21.5708"
                                        stroke="#B6BBC3"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M49.4246 94.4287L44.9698 98.6714M39.0302 104.328L34.5754 108.571M34.5754 94.4287L39.0302 98.6714M44.9699 104.328L49.4246 108.571"
                                        stroke="#B6BBC3"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            {/*end card-body*/}
                        </div>{" "}
                        {/*end card*/}
                        <h3 className="text-2xl text-center mb-4">No assignments found</h3>
                        <p className="text-base text-center mb-4">
                            Try{" "}
                            <a href="#" className="text-blue-600">
                                {" "}
                                resetting your filters
                            </a>{" "}
                            or{" "}
                            <a href="#" className="text-blue-600">
                                {" "}
                                refresh the page.{" "}
                            </a>
                        </p>
                    </div>
                    {/*end col*/}
                </div>
            </div>

        </>
    )
}
