import React from 'react'
import { PageNumber } from './Common'

export default function Pagination({ handlePageChange,setCurrentPage, currentPage, sidebarOpen, totalPages, length, setrowsPerPage, rowsPerPage, name }) {
    const isDarkTheme = length > 10;

    return (
        <div>
            <div className="flex lg:flex-row lg:justify-between md:flex-row md:justify-between sm:flex-row sm:justify-between flex-col justify-end p-5 gap-3">
                <div className="flex items-center">
                    <span className="text-gray-500 font-semibold">{`Total ${length} ${name}`}</span>
                </div>
                <div className="flex justify-end">
                    {length > 10 && (
                        <select
                            className={`px-1 mr-2 border rounded-lg `}
                            value={rowsPerPage}
                            onChange={(e) => { setrowsPerPage(e.target.value); setCurrentPage(1) }}
                        >
                            {PageNumber.map((x) => (
                                <option key={x} value={x}>{x}</option>
                            ))}
                        </select>
                    )}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`font-semibold flex cursor-pointer items-center justify-center px-3 h-8 me-3 text-sm rounded-lg border ${isDarkTheme ? 'bg-sky-500 text-white border-gray-700' : 'border-gray-700 text-gray-500 border-gray-300'} ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <svg
                            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 5H1m0 0 4 4M1 5l4-4"
                            />
                        </svg>
                        {sidebarOpen ? "Previous" : ""}
                    </button>
                    <div className="flex items-center me-3">
                        <span className="text-gray-500">{`Page ${currentPage} of ${totalPages}`}</span>
                    </div>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`font-semibold flex cursor-pointer items-center justify-center px-3 h-8 text-sm rounded-lg border ${isDarkTheme ? 'bg-sky-500 text-white border-gray-700' : 'bg-white text-gray-500 border-gray-300'} ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {sidebarOpen ? "Next" : ""}
                        <svg
                            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
