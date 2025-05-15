/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { useState } from "react";
import AddProduct from "./AddProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  getProductByID,
  handleActiveProduct,
  handleDuplicateProduct,
  handleProductDelete,
  handleProductImportFile,
} from "../../Redux/ProductSlice";
import { BiEdit } from "react-icons/bi";
import { MdContentCopy, MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loading from "../Common/Loading";
import sweetAlert from "../Common/sweetAlert";
import * as XLSX from 'xlsx';
import { FaPlus } from "react-icons/fa6";
import { RxDotsHorizontal } from "react-icons/rx";
import Pagination from "../Common/Pagination";

const Products = ({
  isVisible,
  setIsVisible,
  setSidebarOpen,
  sidebarOpen,
  isDark,
  setIsDark,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const store = useSelector((state) => state?.root?.Product);

  const [loading, setloading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(10);
  const [sortedField, setSortedField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [AciteOption, setAciteOption] = useState(false);

  useEffect(() => {
    dispatch(getProduct({})).then((res) => {
      if (res?.payload?.status === true) {
        const timer = setTimeout(() => {
          setloading(false);
        }, 1000);
        return () => clearTimeout(timer);
      }
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const toggleModal = () => {
    setShowModal(!showModal);
    setSelectedProduct("");
  };

  const handleSort = (field) => {

    if (sortedField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOrder("asc");
      setSortedField(field);
    }
  };

  const sortData = (data, field, order) => {

    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const aTrimmed = a[field]?.trim();
      const bTrimmed = b[field]?.trim();

      if (order === "asc") {
        return aTrimmed?.localeCompare(bTrimmed);
      } else if (order === "desc") {
        // return bTrimmed?.localeCompare(aTrimmed);
      }

    });
    return sortedData;
  };



  const filteredProducts = store?.getProduct ? store?.getProduct.filter((item) => Object.values(item).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()))) : [];

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortData(filteredProducts, sortedField, sortOrder).slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(filteredProducts?.length / rowsPerPage);


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCheckboxChange = (productId) => {
    let updatedSelectedProductIds;

    if (selectedProductIds.includes(productId)) {
      updatedSelectedProductIds = selectedProductIds.filter(
        (id) => id !== productId
      );
    } else {
      updatedSelectedProductIds = [...selectedProductIds, productId];
    }
    setSelectedProductIds(updatedSelectedProductIds);
    const allRowsSelected =
      updatedSelectedProductIds.length === filteredProducts.length;
    setSelectAll(allRowsSelected);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allProductIds = filteredProducts.map((item) => item.productID);
      setSelectedProductIds(allProductIds);
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleEditProduct = async (id) => {
    setShowModal(true);
    await dispatch(getProductByID(id)).then((res) => {
      if (res.payload.status === true) {
        setSelectedProduct(res.payload.data);
      }
    });

  };

  const DeleteProduct = async () => {
    try {
      const result = await sweetAlert.confirm("Are you sure?", "Are you sure you want to delete this!");
      if (result.isConfirmed) {
        dispatch(handleProductDelete(selectedProductIds)).then((res) => {
          if (res.payload.status === true) {
            setCurrentPage(1);
            dispatch(getProduct({}));
          }
        });
        setSelectedProductIds([]);
        setSelectAll(false);
        sweetAlert.success("Deleted successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      sweetAlert.error("An error occurred");
    }
  };

  const handleExport = () => {
    const data = store?.getProduct.map(item => ({
      Name: item.name,
      Code: item.productCode,
      Category: item.category,
      Unit: item.unit,
      unitPrice: item.unitPrice,
      'Tax(%)': item.taxper,
      VisibleTo: item.visibleName,
      Currency: item.currencyName,
      PersonName: item.personMasterName,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Product");
    XLSX.writeFile(workbook, "Products_data.xlsx");
    setAciteOption(!AciteOption)
  };

  const uploadExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('ExcelFilePath', file);

    setAciteOption(!AciteOption)
    try {
      await dispatch(handleProductImportFile(formData))

    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const DuplicateProduct = async (id) => {
    await dispatch(handleDuplicateProduct(id)).then((res) => {
      dispatch(getProduct({}));
    }).catch((error) => console.log('error :>> ', error))
  }

  const DeactiveProduct = async (params) => {
    const query = { ProductID: params?.productID, Isactive: params?.isactive === true ? false : true }
    await dispatch(handleActiveProduct(query)).then((res) => {
      dispatch(getProduct({}));
    }).catch((error) => {
      console.log('error :>> ', error);
    })
  }

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
                          Products
                        </h1>
                        <ol className="list-reset flex text-sm">
                          <li>
                            <a href="/Analytics" className="text-gray-500">
                              Disploy
                            </a>
                          </li>
                          <li>
                            <span className="text-gray-500 mx-2">/</span>
                          </li>
                          <li className="text-gray-500">CRM</li>
                          <li>
                            <span className="text-gray-500 mx-2">/</span>
                          </li>
                          <li className="text-blue-600 hover:text-blue-700">
                            Products
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
            <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative">
              <div className="flex-auto pb-4">
                <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                  <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                    <div className="flex items-center">
                      <button
                        className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 flex items-center"
                        onClick={() => { setShowModal(true); }}
                      >
                        <FaPlus className="text-2xl mr-2" />
                        Product
                      </button>
                    </div>
                  </div>
                  <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                    <div className="bg-white dark:bg-slate-800 rounded-md w-full relative flex items-center justify-end">
                      <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                        <div className="bg-white dark:bg-slate-800 rounded-md w-full relative flex items-center justify-end">
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
                          </div>
                        </div>
                      </div>

                      {selectedProductIds && selectedProductIds.length > 0 && (
                        <button
                          data-tip
                          data-for="Edit"
                          className="cursor-pointer text-white bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => DeleteProduct()}
                        >
                          <MdDeleteForever />
                        </button>
                      )}

                      <button type="button" className="font-semibold focus:outline-none ms-4  border border-gray-200  py-1.5 px-3 rounded relative"
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
                </div>
              </div>
              {loading && (<div className="h-screen"><Loading /></div>)}
              {!loading && (
                <>
                  <div className="relative scroll-inner shadow-md sm:rounded-lg">
                    <table className="w-full border border-slate-200 dark:border-gray-400 rounded-t table">
                      <thead className="rounded-t text-md font-medium border-b dark:bg-gray-800 dark:border-gray-400 text-gray-700 bg-gray-200 dark:text-gray-400">
                        <tr className="text-center">
                          <th scope="col" className="w-4 p-4 border-1 border-slate-300">
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
                          <th
                            scope="col"
                            className="mw-200 p-4 border-1 border-slate-300"
                          >
                            <div className="flex justify-center items-center w-full">
                              Name
                              <svg
                                className="w-3 h-3 ms-1.5 cursor-pointer"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                onClick={() => handleSort("name")}
                              >
                                <path
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Zm-6.852 0 3.426 5.05-3.426-5.05Z"
                                />
                              </svg>
                            </div>

                          </th>
                          {/* <th
                            scope="col"
                            className="mw-200 p-4 border-1 border-slate-300"
                          >
                            ID
                          </th> */}
                          <th
                            scope="col"
                            className="mw-200 p-4 border-1 border-slate-300"
                          >
                            <div className="flex justify-center items-center w-full">
                              Product Code

                            </div>
                          </th>
                          <th
                            scope="col"
                            className="mw-200 p-4 border-1 border-slate-300"
                          >
                            <div className="flex justify-center items-center w-full">
                              Category

                            </div>
                          </th>
                          <th
                            scope="col"
                            className="mw-200 p-4 border-1 border-slate-300"
                          >
                            <div className="flex justify-center items-center w-full">
                              Currency

                            </div>
                          </th>
                          <th
                            scope="col"
                            className="mw-200 p-4 border-1 border-slate-300"
                          >
                            <div className="flex justify-center items-center w-full">
                              Unit prices

                            </div>
                          </th>
                          <th
                            scope="col"
                            className="mw-200 p-4 border-1 border-slate-300"
                          >
                            <div className="flex justify-center items-center w-full">
                              Tax (%)

                            </div>
                          </th>
                          <th
                            scope="col"
                            className="mw-200 p-4 border-1 border-slate-300"
                          >
                            <div className="flex justify-center items-center w-full">
                              Unit

                            </div>
                          </th>
                          <th
                            scope="col"
                            className="mw-200 p-4 border-1 border-slate-300"
                          >
                            <div className="flex justify-center items-center w-full">
                              Price (INR)

                            </div>
                          </th>
                          <th scope="col" className="mw-200 p-4 border-1 border-slate-300">
                            <div className="flex justify-center items-center w-full">
                              Visible to

                            </div>
                          </th>
                          <th scope="col" className="mw-200 p-4 border-1 border-slate-300">Active</th>
                          <th
                            scope="col"
                            className="mw-200 p-4 border-1 border-slate-300"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentRows && currentRows.length > 0 ? (
                          currentRows.map((item, index) => (

                            <tr className="bg-white dark:bg-gray-800 text-center" key={index}>
                              <td className="w-4 px-4 py-2 border border-slate-200">
                                <label className="custom-label">
                                  <div className="bg-white dark:bg-slate-600/40 border border-slate-200 dark:border-slate-600 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px]">
                                    <input
                                      type="checkbox"
                                      checked={selectedProductIds.includes(
                                        item.productID
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange(item.productID)
                                      }
                                    />
                                  </div>
                                </label>
                              </td>
                              <td className="capitalize mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200 cursor-pointer" onClick={() => navigate(`/products/${item?.productID}`)}>
                                {item?.name}
                              </td>
                              {/* <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                {item?.productID}
                              </td> */}
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                {item?.productCode}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                {item?.categoryName}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                {item?.productPrice?.length > 0 && item?.productPrice[0]?.currencyName}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                {item?.productPrice?.length > 0 && item?.productPrice[0]?.currencyCode} &nbsp;
                                {item?.productPrice?.length > 0 && item?.productPrice[0]?.unitprice?.toLocaleString('en-PK')}
                                {/* {`${item?.currencyCode !== null ? item?.currencyCode : ''} ${item?.unitPrice?.toLocaleString('en-PK')}`} */}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                {item?.taxper}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                {item?.unit}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                {/* {`${item?.unitPrice?.toLocaleString('en-PK')}`} */}
                              </td>
                              <td className="mw-200 px-4 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                {item?.visibleName}
                              </td>
                              <td className={`mw-200 px-4 py-2 text-sm  whitespace-nowrap  border border-slate-200 `}>
                                <span class={` text-sm  me-2 px-2.5 py-1.5 rounded  font-bold ${item?.isactive ? 'bg-green-100 text-green-700' : 'bg-rose-200  text-red-600'}`}>{item?.isactive ? 'ACTIVE' : 'INACTIVE'}</span>
                              </td>
                              <td className="mw-200 py-2 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                <div className="flex gap-4 justify-center">
                                  <div
                                    data-tip
                                    data-for="Edit"
                                    className="relative group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => {

                                      handleEditProduct(item.productID);
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
                                    className="relative flex-col group cursor-pointer text-white bg-neutral-400 hover:bg-neutral-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => DuplicateProduct(item?.productID)}
                                  >
                                    <MdContentCopy />
                                    <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                      <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Copy</span>
                                      <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                    </div>
                                  </div>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      className="sr-only peer"
                                      checked={item?.isactive}
                                      id={`Active_${item?.productID}`}

                                      onChange={() => {
                                        DeactiveProduct(item)
                                      }}
                                    />
                                    <label
                                      htmlFor={`Active_${item?.productID}`}

                                      className={`w-10 h-5  rounded-full flex items-center p-1 cursor-pointer peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-green-500 transition-colors duration-300 ease-in-out ${item?.isactive === true ? ' bg-green-500' : 'bg-red-500'}`}
                                    >
                                      <span className={`w-4 h-4  rounded-full shadow-md transform transition-transform duration-300 ease-in-out bg-white ${item?.isactive === true ? 'translate-x-5 ' : 'bg-white'}`}></span>
                                    </label>
                                  </label>

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
                  <Pagination setCurrentPage={setCurrentPage} handlePageChange={handlePageChange} currentPage={currentPage} sidebarOpen={sidebarOpen} totalPages={totalPages} length={filteredProducts?.length} setrowsPerPage={setrowsPerPage} rowsPerPage={rowsPerPage} name='Products' />
                </>
              )}

            </div>
            <Footer />
          </div>
        </div>
      </div>

      {showModal && (
        <AddProduct toggleModal={toggleModal} product={selectedProduct} />
      )}
    </>
  );
};

export default Products;
