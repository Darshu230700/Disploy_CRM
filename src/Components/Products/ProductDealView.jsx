import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { formatDate, PageNumber } from '../Common/Common';

export default function ProductDealView({ Product }) {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setrowsPerPage] = useState(10);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = Product?.dealList ? Product?.dealList.slice(indexOfFirstRow, indexOfLastRow) : []
    const totalPages = Math.ceil(Product?.dealList.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div>
            <div className="relative scroll-inner shadow-md sm:rounded-lg mt-5 m-4">
                <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 boeder">
                    <thead className="text-md font-medium border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="mw-200 px-6 py-4 text-center">Title</th>
                            <th scope="col" className="mw-200 px-6 py-4 text-center">
                                Value
                            </th>
                            <th scope="col" className="mw-200 px-6 py-4 text-center">
                                Organization
                            </th>
                            <th scope="col" className="mw-200 px-6 py-4 text-center">
                                Contact Person
                            </th>
                            <th scope="col" className="mw-200 px-6 py-4  text-center">
                                Expected Close Date
                            </th>
                            <th scope="col" className="mw-200 px-6 py-4 text-center">Status</th>
                            <th scope="col" className="mw-200 px-6 py-4 text-center">
                                Product quantity
                            </th>
                            <th scope="col" className="mw-200 px-6 py-4 text-center">
                                Product name
                            </th>
                            <th scope="col" className="mw-200 px-6 py-4 text-center">
                                Product amount
                            </th>
                            <th scope="col" className="mw-200 px-6 py-4 text-center">
                                Owner
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows && currentRows?.length > 0 ? (
                            currentRows.map((item, index) => (
                                <tr key={index}>
                                    <td
                                        className={`mw-200  text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600" : item?.isWon === 0 ? "text-red" : "text-gray-500"}`}
                                        onClick={() => navigate(`/deal/${item?.dealID}`)}
                                    >
                                        {item?.title}
                                    </td>
                                    <td className={`mw-200 p-1 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600" : item?.isWon === 0 ? "text-red" : "text-gray-500"}`}>
                                        {item?.value}
                                    </td>
                                    <td
                                        className={`mw-200 p-1 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600" : item?.isWon === 0 ? "text-red" : "text-gray-500"}`}
                                        onClick={() => navigate(`/detailsOrganization/${item?.organizationID}`)}
                                    >
                                        {item?.organizationName}
                                    </td>
                                    <td
                                        className={`mw-200 p-1 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600" : item?.isWon === 0 ? "text-red" : "text-gray-500"}`}
                                        onClick={() => navigate(`/detailsPeople/${item?.peopleID}`)}
                                    >
                                        {item?.personName}
                                    </td>

                                    <td className={`mw-200 p-1 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600" : item?.isWon === 0 ? "text-red" : "text-gray-500"}`}>
                                        {formatDate(item?.expectedCloseDate)}
                                    </td>
                                    <td className={`mw-200 p-1 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600" : item?.isWon === 0 ? "text-red" : "text-gray-500"}`}>
                                        {item?.isWon === 1 ? "Won" : item?.isWon === 0 ? "Lost" : "Open"}
                                    </td>
                                    {
                                        item?.dealAllProductList && item?.dealAllProductList.map((x, index) => (
                                            <React.Fragment key={index}>

                                                <td className={`mw-200 p-1 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600" : item?.isWon === 0 ? "text-red" : "text-gray-500"}`}>
                                                    {x?.totalProducts}
                                                </td>
                                                <td className={`mw-200 p-1 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600" : item?.isWon === 0 ? "text-red" : "text-gray-500"}`}>
                                                    {x?.dealProductAmount.map((x, index) => (<p key={index}>{x?.productName}</p>))}
                                                </td>
                                                <td className={`mw-200 p-1 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600" : item?.isWon === 0 ? "text-red" : "text-gray-500"}`}>
                                                    ₹ {x?.subTotalExcludingTax.toLocaleString('en-PK')}
                                                </td>
                                            </React.Fragment>
                                        ))
                                    }
                                    <td className={`mw-200 p-1 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600" : item?.isWon === 0 ? "text-red" : "text-gray-500"}`}>
                                        {item?.ownerID}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <td colSpan={6}>
                                <p className="text-center p-2">Not Found.</p>
                            </td>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex lg:flex-row lg:justify-between md:flex-row md:justify-between sm:flex-row sm:justify-between flex-col justify-end p-5 gap-3">
                <div className="flex items-center">
                    <span className="text-gray-500 font-semibold">{`Total ${Product?.dealList?.length} Product-Deal `}</span>
                </div>
                <div className="flex justify-end">
                    <select
                        className={`px-1 mr-2 border rounded-lg `}
                        value={rowsPerPage}
                        onChange={(e) => { setrowsPerPage(e.target.value); setCurrentPage(1) }}
                    >
                        {PageNumber?.map((x) => (
                            <option key={x} value={x}>{x}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="font-semibold flex cursor-pointer hover:bg-white hover:text-primary items-center justify-center px-3 h-8 me-3 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                        Previous
                    </button>
                    <div className="flex items-center me-3">
                        <span className="text-gray-500">{`Page ${currentPage} of ${totalPages}`}</span>
                    </div>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="font-semibold flex hover:bg-white hover:text-primary cursor-pointer items-center justify-center px-3 h-8 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        Next
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
