import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi';
import { MdContentCopy, MdDeleteForever } from 'react-icons/md';
import { formatDate } from '../Common/Common';
import { RxDotsHorizontal } from "react-icons/rx";
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleDuplicateDeal, ImportDealFile } from '../../Redux/DealSlice';
import moment from 'moment';
import { FormatDateMoment } from '../Common/defaultValue';
import Pagination from '../Common/Pagination';

const DealListView = ({ setCurrentPage, rowsPerPage, setrowsPerPage, loading, setSearchTerm, currentPage, searchTerm, handlePageChange, handleDeleteDeal, selectedDealIds, selectAll, handleSelectAll, store, totalPages, sidebarOpen, handleSort, currentRows, handleCheckboxChange, setShowModal, Editdeal, setloadFrist }) => {
    const dispatch = useDispatch()
    const [AciteOption, setAciteOption] = useState(false);
    const navigate = useNavigate()

    const handleExport = () => {
        const data = store.getDeals.map(deal => ({
            Title: deal.title,
            LabelName: deal.labelName,
            PipelineStage: deal.pipelineStage,
            Value: deal.value,
            OrganizationName: deal.organizationName,
            ContactPerson: deal.personName,
            CurrencyName: deal.currencyName,
            VisibleToName: deal.visibleName,
            SourceChannel: deal.sourceChannel,
            ExpectedClosedDate: deal.expectedCloseDate,
            PeopleName: deal?.personName,
            ProjectName: ''
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Deals");
        XLSX.writeFile(workbook, "dealsdata.xlsx");
        setAciteOption(!AciteOption)
    };

    const DuplicateDeal = async (id) => {
        await dispatch(handleDuplicateDeal(id)).then((res) => {
            setloadFrist(true)
        }).catch((error) => console.log('error >> ', error))
    }

    const uploadExcel = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('ExcelFilePath', file);
        try {
            dispatch(ImportDealFile(formData)).then((res) => {
                setAciteOption(!AciteOption)
            })
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    return (
        <div
            className="bg-gray-50 rounded-lg dark:bg-gray-800"
            id="list"
            role="tabpanel"
            aria-labelledby="list-tab"
        >
            {!loading && (
                <>
                    <div className="pb-4 bg-white dark:bg-slate-800 rounded-md w-full relative flex items-center justify-end">
                        <div className="flex items-center ml-3">
                            <div className="pin-filters dropdown relative mr-3">
                                <input
                                    type="text"
                                    name="Serching"
                                    placeholder="Searching.."
                                    className="border border-gray-300 shadow p-3 w-full rounded"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            {selectedDealIds && selectedDealIds.length > 0 && (
                                <button
                                    data-tip
                                    data-for="Edit"
                                    className="mr-3 cursor-pointer text-white bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => handleDeleteDeal()}
                                >
                                    <MdDeleteForever />
                                </button>
                            )}
                            <button type="button" className="font-semibold focus:outline-none  border border-gray-200  py-1.5 px-3 rounded relative"
                                onClick={() => setAciteOption(!AciteOption)}
                            >
                                <RxDotsHorizontal size={20} />
                            </button>
                            <div
                                className={`dropdown-menu p-2 top-10 right-0 z-50 absolute list-nonedivide-y divide-gray-100 rounded border-slate-700 md:border-whitetext-base drop-shadow-md dark:divide-gray-600 bg-white dark:bg-slate-800  ${AciteOption === true ? "block" : "hidden"}`}
                                id="navUserdata"
                            >
                                <ul className=" cursor-pointer  " aria-labelledby="navUserdata">
                                    {currentRows.length > 0 && (
                                        <li className="block p-1 text-sm text-gray-700 hover:bg-blue dark:text-gray-200 dark:hover:bg-blue-900 hover:text-white dark:hover:text-white"
                                            onClick={handleExport}
                                        >
                                            Export file results
                                        </li>
                                    )}
                                    <li className="block p-1 text-sm text-gray-700 hover:bg-blue dark:text-gray-200 dark:hover:bg-blue-900 hover:text-white dark:hover:text-white">
                                        <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center justify-center">
                                            <input
                                                type="file"
                                                id="fileInput"
                                                className="hidden"
                                                onChange={uploadExcel}
                                                accept=".xls,.xlsx"
                                            />
                                            Import Data
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="relative scroll-inner shadow-md sm:rounded-lg">
                        <table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 boeder">
                            <thead className="text-md font-medium border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-5">
                                        <label className="custom-label">
                                            <div className="bg-white dark:bg-slate-600/40 border border-slate-300 dark:border-slate-600 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px]">
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={() => handleSelectAll()}
                                                />
                                            </div>
                                        </label>
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4">
                                        <div className="flex justify-center items-center w-full">
                                            Title
                                            <svg
                                                className="w-3 h-3 ms-1.5 cursor-pointer"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                onClick={() => handleSort("title")}
                                            >
                                                <path
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Zm-6.852 0 3.426 5.05-3.426-5.05Z"
                                                />
                                            </svg>
                                        </div>
                                    </th>
                                    {/* <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        ID
                                    </th> */}
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Label
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Pipeline Stage
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Value
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Weighted value
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Next activity date
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Organization
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Contact Person
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Currency
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Visible
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4  text-center">
                                        Deal created
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4  text-center">
                                        Update time
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4  text-center">
                                        Expected Close Date
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Status
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Source
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Source Channel ID
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Source Channel
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Lost time
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Lost reason
                                    </th>
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
                                        Product ACV
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Product ARR
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Product MRR
                                    </th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Owner
                                    </th>
                                    <th scope="col" className="mw-200 p-4 text-center">Done activities</th>
                                    <th scope="col" className="mw-200 p-4 text-center">Activities to do</th>
                                    <th scope="col" className="mw-200 p-4 text-center">Total activities</th>
                                    <th scope="col" className="mw-200 px-6 py-4 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows?.length > 0 ? (
                                    currentRows.map((item, index) => (
                                        <tr key={index}>
                                            <td className="w-4 p-4 border border-slate-200">
                                                <label className="custom-label">
                                                    <div className={`bg-white dark:bg-slate-600/40 border border-slate-200 dark:border-slate-600 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px]`}>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedDealIds.includes(
                                                                item?.dealID
                                                            )}
                                                            onChange={() => handleCheckboxChange(item.dealID)}
                                                        />
                                                    </div>
                                                </label>
                                            </td>
                                            <td
                                                className={`max-w-8 truncate p-3 text-sm text-center   dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold " : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}
                                                onClick={() => navigate(`/deal/${item?.dealID}`)}
                                            >
                                                {item?.title}
                                            </td>
                                            {/* <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.dealID}
                                            </td> */}
                                            <td className="mw-200 p-3 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                                <span
                                                    className="text-sm  me-2 px-2.5 py-0.5  rounded dark:bg-yellow-900 dark:text-yellow-300 text-white uppercase"
                                                    style={{ backgroundColor: item?.color }}
                                                >
                                                    {item?.labelName}
                                                </span>
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.pipelineStage}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.currencyCode !== null ? item?.currencyCode : ''} {item?.value?.toLocaleString('en-IN')}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.currencyCode !== null ? item?.currencyCode : ''} {item?.value?.toLocaleString('en-IN')}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.nextActivityDate ? FormatDateMoment(item?.nextActivityDate) : ''}
                                            </td>
                                            <td
                                                className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}
                                                onClick={() => navigate(`/detailsOrganization/${item?.organizationID}`)}
                                            >
                                                {item?.organizationName}
                                            </td>
                                            <td
                                                className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}
                                                onClick={() => navigate(`/detailsPeople/${item?.peopleID}`)}
                                            >
                                                {item?.personName}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.currencyName}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.visibleName}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {formatDate(item?.createdDate)}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.updatedDate ? moment(item?.updatedDate).format('lll') : ''}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {formatDate(item?.expectedCloseDate)}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.isWon === 1 ? "Won" : item?.isWon === 0 ? "Lost" : "Open"}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.sourceType}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.sourceChannelID}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.sourceChannel}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.dealLostDateTime ? moment(item?.dealLostDateTime).format('lll') : ''}
                                            </td>
                                            <td className={`max-w-60 truncate p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.lostReason}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.dealProductList?.totalProducts}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.dealProductList && item?.dealProductList?.dealProductAmount.map((x, index) => (<p key={index}>{x?.productName}</p>))}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                ₹ {item?.dealProductList?.subTotalExcludingTax ? item?.dealProductList?.subTotalExcludingTax.toLocaleString('en-PK') : 0}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.dealProductList?.acv}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.dealProductList?.arr}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.dealProductList?.mrr}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                {item?.ownerID}
                                            </td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>{item?.doneActivity}</td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>{item?.activitiesToDo}</td>
                                            <td className={`mw-200 p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>{item?.totalActivities}</td>

                                            <td className={`mw-200  p-3 text-sm text-center  whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer capitalize  ${item?.isWon === 1 ? "text-green-600 font-bold" : item?.isWon === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                                                <div
                                                    data-tip
                                                    data-for="Edit"
                                                    className="relative flex-col group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    onClick={() => {
                                                        setShowModal(true);
                                                        Editdeal(item?.dealID);
                                                    }}
                                                >
                                                    <BiEdit />
                                                    <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                            Edit
                                                        </span>
                                                        <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                    </div>
                                                </div>
                                                <div
                                                    data-tip
                                                    data-for="Duplicate"
                                                    className="relative ml-2 flex-col group cursor-pointer text-white bg-neutral-400 hover:bg-neutral-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    onClick={() => DuplicateDeal(item?.dealID)}
                                                >
                                                    <MdContentCopy />
                                                    <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Copy</span>
                                                        <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                    </div>
                                                </div>
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
                </>
            )}
            <Pagination name='Deals' handlePageChange={handlePageChange} currentPage={currentPage} sidebarOpen={sidebarOpen} totalPages={totalPages} length={store?.getDeals.length} setrowsPerPage={setrowsPerPage} rowsPerPage={rowsPerPage} setCurrentPage={setCurrentPage} />

        </div >
    )
}

export default DealListView
