import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa6';
import { HiMiniChevronUpDown } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import sweetAlert from '../Common/sweetAlert';
import { DeleteVariationsPrice, VariationsDelete } from '../../Redux/ProductSlice';
import { useDispatch } from 'react-redux';
import AddVariations from './AddVariations';
import VariationPrice from './VariationPrice';
import { formatNumber, PageNumber } from '../Common/Common';

export default function VariationsView({ Productstore, sidebarOpen, setLoadFist }) {

    const dispatch = useDispatch()
    const [expandedRows, setExpandedRows] = useState({});
    const [openModel, setOpenModel] = useState(false);
    const [PriceVarModel, setPriceVarModel] = useState(false);
    const [SelectVariationsID, setSelectVariationsID] = useState("");
    const [VariationPriceID, setVariationPriceID] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [rowsPerPage, setrowsPerPage] = useState(10);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentVariations = Productstore.getVariations.slice(indexOfFirstRow, indexOfLastRow);
    const totalVariationsPages = Math.ceil(Productstore.getVariations.length / rowsPerPage);


    const togglemodel = () => { setOpenModel(!openModel); setSelectVariationsID('') };
    const togglePriceVari = () => { setPriceVarModel(!PriceVarModel); setSelectVariationsID(""); setVariationPriceID(""); };

    const toggleNestedTable = (index) => {
        setExpandedRows((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handlePageVariations = (newPage) => {
        if (newPage >= 1 && newPage <= totalVariationsPages) {
            setCurrentPage(newPage);
        }
    };

    const handlerVariationsDelete = async (VariationsId) => {
        try {
            const result = await sweetAlert.confirm("Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                await dispatch(VariationsDelete(VariationsId)).then((res) => {
                    if (res.payload.status === true) {
                        setLoadFist(true)
                        setCurrentPage(1)
                    }
                })
                sweetAlert.success("Deleted successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    };

    const variationPriceDelete = async (VariationsPriceID) => {
        try {
            const result = await sweetAlert.confirm("Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                await dispatch(DeleteVariationsPrice(VariationsPriceID)).then((res) => {
                    if (res.payload.status === true) {
                        setLoadFist(true)
                    }
                })
                sweetAlert.success("Deleted successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    };

    return (
        <div>
            <div className="flex-auto py-4">
                <div className="flex items-center mb-4">
                    <button
                        data-modal-toggle="modal"
                        className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 flex items-center"
                        onClick={() => setOpenModel(true)}
                    >
                        <FaPlus
                            className="mr-2 font-extrabold"
                            size={15}
                        />
                        Variations

                    </button>
                </div>
                {currentVariations && currentVariations?.length > 0 &&
                    <>
                        {currentVariations?.map((item, index) => (
                            <div className='mb-3' key={index}>
                                <h2 id="accordion-collapse-heading-1">
                                    <button
                                        type="button"
                                        className={`bg-slate-100 flex justify-between items-center p-2 px-5 w-full font-medium  border border-gray-200 dark:border-slate-700 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 `}
                                        data-accordion-target={index}
                                    >
                                        <div className='flex items-center gap-3'>
                                            <p className="capitalize max-w-52 truncate ">{item?.name}</p>
                                            {item.addVariationsPrice.length > 0 ? <span class={` text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-gray-600`}>{item.addVariationsPrice.length}  Prices</span> : ''}
                                        </div>
                                        <div className="flex gap-3 align-center">
                                            <div
                                                onClick={() => {
                                                    setPriceVarModel(true);
                                                    setSelectVariationsID(item.productVariationsID);
                                                }}
                                            >
                                                <button
                                                    type="button"
                                                    className="relative group text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                >
                                                    <FaPlus />
                                                    <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex left-0 right-0">
                                                        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                            Add Price
                                                        </span>
                                                        <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                    </div>
                                                </button>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setOpenModel(true);
                                                    setSelectVariationsID(
                                                        item.productVariationsID
                                                    );
                                                }}
                                            >
                                                <button
                                                    type="button"
                                                    className="relative group text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                >
                                                    <BiEdit />
                                                    <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex left-0 right-0">
                                                        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                            Edit
                                                        </span>
                                                        <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                    </div>
                                                </button>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    handlerVariationsDelete(item.productVariationsID);
                                                }}
                                            >
                                                <button
                                                    type="button"
                                                    className="relative group cursor-pointer text-white bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                >
                                                    <MdDeleteForever />
                                                    <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex left-0 right-0">
                                                        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                            Delete
                                                        </span>
                                                        <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                    </div>
                                                </button>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    toggleNestedTable(index);
                                                }}
                                            >
                                                <button
                                                    type="button"
                                                    className="relative group  cursor-pointer text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800"
                                                >
                                                    {expandedRows[index] ? (
                                                        <IoClose />
                                                    ) : (
                                                        <HiMiniChevronUpDown />
                                                    )}
                                                    <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex left-0 right-0">
                                                        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">View</span>
                                                        <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </button>
                                </h2>
                                {expandedRows[index] && (
                                    <div className="bg-white dark:bg-slate-800 shadow-md  rounded-md w-full relative p-2 scroll-inner">
                                        {item?.addVariationsPrice &&
                                            item?.addVariationsPrice?.length >
                                            0 ? (
                                            <table className="w-full   border border-slate-200 table shadow-lg p-5">
                                                <thead className="rounded-t text-md font-medium border-b dark:bg-gray-800 dark:border-gray-400 text-gray-700 bg-gray-200 dark:text-gray-400">
                                                    <tr className="text-center">
                                                        <th scope="col" className="mw-100 px-3 py-2 border-1 border-slate-300">Currency</th>
                                                        <th scope="col" className="mw-100 px-3 py-2 border-1 border-slate-300">Unit Price</th>
                                                        <th scope="col" className="mw-200 px-3 py-2 border-1 border-slate-300">Cost</th>
                                                        <th scope="col" className="mw-200 px-3 py-2 border-1 border-slate-300">Direct Cost</th>
                                                        <th scope="col" className=" px-3 py-2 border-1 border-slate-300">Comment</th>
                                                        <th scope="col" className="mw-200 px-3 py-2 border-1 border-slate-300">Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {item.addVariationsPrice.map(
                                                        (priceItem, priceIndex) => (
                                                            // console.log('priceItem :>> ', priceItem),
                                                            <tr key={priceIndex} className='text-center'>
                                                                <td className="mw-200 p-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                                                    {priceItem?.currencyName}
                                                                </td>
                                                                <td className="mw-200 p-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                                                    {formatNumber(priceItem?.unitPrice)}
                                                                </td>
                                                                <td className="mw-200 p-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                                                    {priceItem?.cost}
                                                                </td>
                                                                <td className="mw-200 p-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                                                    {priceItem?.directcost}
                                                                </td>
                                                                <td className="max-w-52 truncate p-2 text-sm text-gray-500  dark:text-gray-400 border border-slate-200 capitalize">
                                                                    {priceItem?.comment}
                                                                </td>
                                                                <td className="mw-200 p-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                                                    <div className="flex gap-3 justify-center">
                                                                        <div
                                                                            onClick={() => { setPriceVarModel(true); setSelectVariationsID(item.productVariationsID); setVariationPriceID(priceItem.addVariationsPriceID); }}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="relative group text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                            >
                                                                                <BiEdit />
                                                                                <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex left-0 right-0">
                                                                                    <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                                                        Edit
                                                                                    </span>
                                                                                    <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                        <div
                                                                            onClick={() => { variationPriceDelete(priceItem?.addVariationsPriceID); }}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="relative group cursor-pointer text-white bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                            >
                                                                                <MdDeleteForever />
                                                                                <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex left-0 right-0">
                                                                                    <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                                                        Delete
                                                                                    </span>
                                                                                    <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p className="text-center p-2">
                                                This variation doesn't have
                                                any prices added to it yet
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="flex lg:flex-row lg:justify-between md:flex-row md:justify-between sm:flex-row sm:justify-between flex-col justify-end p-3 gap-3">
                            <div className="flex items-center">
                                <span className="text-gray-500 font-semibold">{`Total ${Productstore?.getVariations?.length} Variations `}</span>
                            </div>
                            <div className="flex justify-end">
                                <select
                                    className={`px-1 mr-2 border rounded-lg `}
                                    value={rowsPerPage}
                                    onChange={(e) => { setrowsPerPage(e.target.value); setCurrentPage(1) }}
                                >
                                    {PageNumber.map((x) => (
                                        <option key={x} value={x}>{x}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={() =>
                                        handlePageVariations(currentPage - 1)
                                    }
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
                                    {sidebarOpen ? "Previous" : ""}
                                </button>
                                <div className="flex items-center me-3">
                                    <span className="text-gray-500">{`Page ${currentPage} of ${totalVariationsPages}`}</span>
                                </div>
                                <button
                                    onClick={() =>
                                        handlePageVariations(currentPage + 1)
                                    }
                                    className="font-semibold flex hover:bg-white hover:text-primary cursor-pointer items-center justify-center px-3 h-8 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                    </>
                }

            </div>
            {openModel && (<AddVariations togglemodel={togglemodel} VariationsID={SelectVariationsID} setLoadFist={setLoadFist} />)}
            {PriceVarModel && (<VariationPrice togglePriceVari={togglePriceVari} VariationPriceID={VariationPriceID} VariationsID={SelectVariationsID} setLoadFist={setLoadFist} />)}
        </div>
    )
}
