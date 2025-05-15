/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Partcipants from "./Partcipants";
import { FiUploadCloud } from "react-icons/fi";
import AddPrice from "./AddPrice";
import { useDispatch, useSelector } from "react-redux";
import { getCurrency } from "../../Redux/CommonSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AddProductImage,
  PriceDelete,
  RemoveImagefile,
  getFiles,
  getPrice,
  getProductByID,
  getVariations,
} from "../../Redux/ProductSlice";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever, MdOutlineKeyboardBackspace } from "react-icons/md";
import Footer from "../Common/Footer";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { ImageUrl } from "../Common/API";
import sweetAlert from "../Common/sweetAlert";
import Loading from "../Common/Loading";
import { getAllPerson } from "../../Redux/PersonSlice";
import VariationsView from "./VariationsView";
import FilesView from "./FilesView";
import { BsPerson } from "react-icons/bs";
import ProductDealView from "./ProductDealView";
import toast from "react-hot-toast";
import PdfView from "../Common/pdfView";
import { formatNumber, PageNumber } from "../Common/Common";
const MAX_FILE_SIZE_MB = 15;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function ProductDeatails({
  isVisible,
  setIsVisible,
  setSidebarOpen,
  sidebarOpen,
  isDark,
  setIsDark,
}) {

  let { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const filesRef = useRef(null)
  const Productstore = useSelector((state) => state.root.Product);

  const [loadFist, setLoadFist] = useState(true);
  const [activeTab, setActiveTab] = useState("price");
  const [showModal, setShowModal] = useState(false);
  const [ParticipantsName, setParticipantsName] = useState('');
  const [PriceModel, setPriceModel] = useState(false);
  const [ImageOpen, setImageOpen] = useState(false);
  const [DeatailsOpen, setDeatailsOpen] = useState(false);
  const [PartcipantsOpen, setPartcipantsOpen] = useState(false);
  const [SelectPriceID, setSelectPriceID] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setproduct] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setloading] = useState(true);
  const [ImageView, setImageView] = useState(false);
  const [rowsPerPage, setrowsPerPage] = useState(10);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = Productstore.getPrice && Productstore.getPrice.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(Productstore?.getPrice?.length / rowsPerPage);

  const personIDs = product?.personMasterID ? product.personMasterID.split(',').map(item => parseInt(item.replace(',', ''), 10)) : [];
  const personNames = product?.personMasterName ? product.personMasterName.split(',') : [];

  // console.log('product :>> ', product);
  useEffect(() => {
    if (loadFist) {
      setloading(true)
      dispatch(getCurrency({}));
      dispatch(getAllPerson({}));
      if (id) dispatch(getPrice(id));
      if (id) dispatch(getVariations(id));
      if (id) dispatch(getFiles(id))
      if (id) dispatch(getProductByID(id))
        .then((res) => {
          setproduct(res?.payload?.data);
          const timer = setTimeout(() => {
            setloading(false);
          }, 1000);
          return () => clearTimeout(timer);
        }).catch((error) => {
          console.log('error :>> ', error);
        })
      setLoadFist(false);
    }
  }, [dispatch, loadFist]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleTabClick = (tab) => { setActiveTab(tab); };
  const toggleImageInput = () => { setImageOpen(!ImageOpen); };
  const toggleDetails = () => { setDeatailsOpen(!DeatailsOpen); };
  const toggleModal = () => {
    setShowModal(!showModal); setLoadFist(true);
  };

  const togglePrice = () => { setPriceModel(!PriceModel); setSelectPriceID('') };

  const handleEditPrice = (productPriceID) => { setSelectPriceID(productPriceID); }

  const handlerPriceDelete = async (priceID) => {
    try {
      const result = await sweetAlert.confirm("Are you sure?", "You won't be able to revert this!");
      if (result.isConfirmed) {
        await dispatch(PriceDelete(priceID)).then((res) => {
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

  const ProductImage = (e) => {
    const image = e.target.files[0];
    if (image?.size > MAX_FILE_SIZE_BYTES) {
      toast.error('Maximum upload file size is 15 MB.');
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    setIsDropdownOpen(false);

    try {
      dispatch(AddProductImage({ payload: id, data: formData })).then((res) => {
        if (res.payload.status === true) {
          setLoadFist(true)
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeImage = async (id) => {
    const result = await dispatch(RemoveImagefile(id));
    if (result.payload.status === true) {
      setLoadFist(true)
      setIsDropdownOpen(false);
    }
  };

  return (
    <>
      <div>
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
          <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300 ">

            <div className="flex items-center justify-between p-3 md:p-4 ">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white ">
                Products
              </h3>
            </div>

            <div className='xl:w-full  min-h-[calc(100vh-138px)] relative pb-14'>
              <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                {loading && <div className="h-screen"><Loading /></div>}
                {!loading && (
                  <>
                    <div className="flex gap-5 border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <button
                        type="submit"
                        className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200  dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                        onClick={() => navigate('/Products')}
                      >
                        <MdOutlineKeyboardBackspace size={20} />
                      </button>
                      <h4 className="font-semibold capitalize">
                        {product?.name}
                      </h4>
                    </div>
                    <div className="xl:w-full relative p-4">
                      <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-4 xl:col-span-4">
                          <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative">
                            <div className=" font-semibold text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                              <div className="py-3 border-b">
                                <h3 className="ms-3">Sidebar</h3>
                              </div>

                              <div className=" py-3 border-b">
                                <div className="flex items-center justify-between px-3">
                                  <div
                                    className="flex items-center gap-3  hover:bg-slate-100 p-1 px-2 cursor-pointer"
                                    style={{ width: "80px" }}
                                    onClick={toggleImageInput}
                                  >
                                    {ImageOpen ? <FaChevronUp /> : <FaChevronDown />}
                                    <h3>Image</h3>
                                  </div>
                                  <div className="mr-2 dropdown relative">
                                    {product?.filePath && (
                                      <button
                                        type="button"
                                        className="dropdown-toggle flex items-center rounded-full text-sm focus:bg-none focus:ring-0 dark:focus:ring-0 md:mr-0"
                                        id="user-profile"
                                        aria-expanded={
                                          isDropdownOpen ? "true" : "false"
                                        }
                                        data-dropdown-toggle="navUserdata"
                                        onClick={() => {
                                          setIsDropdownOpen(!isDropdownOpen);
                                        }}
                                      >
                                        <span className="ltr:ml-2 rtl:ml-0 rtl:mr-2 hidden text-left xl:block">
                                          <PiDotsThreeOutlineVerticalFill />
                                        </span>
                                      </button>
                                    )}
                                    <div
                                      className={`dropdown-menu  z-50 my-1 ${isDropdownOpen ? "block" : "hidden"
                                        } list-nonedivide-y divide-gray-100 rounded border-slate-700 md:border-whitetext-base shadow dark:divide-gray-600 bg-white dark:bg-slate-800`}
                                      id="navUserdata"
                                    >
                                      <ul
                                        className=" cursor-pointer border"
                                        aria-labelledby="navUserdata"
                                      >
                                        <li>
                                          <a
                                            className="block py-1 px-4 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
                                            onClick={() => filesRef.current.click()}
                                          >
                                            Replace
                                          </a>
                                          <input
                                            ref={filesRef}
                                            type="file"
                                            className=" opacity-0  hidden"
                                            name="uploadfile"
                                            onChange={ProductImage}
                                            multiple
                                            accept="image/*"
                                          />
                                        </li>
                                        <li>
                                          <a
                                            onClick={() => removeImage(id)}
                                            className="block py-1 px-4 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
                                          >
                                            Remove
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {ImageOpen && (
                                  <div className="relative">
                                    <div className="relative">
                                      <div className=" relative min-h-48 flex-col flex mx-20 mt-3 items-center justify-center py-12   border-2 rounded-[20px] border-black-500 border-dashed">
                                        {product?.filePath ? (
                                          <img src={`${ImageUrl}${product?.filePath}`} alt="Uploaded" onClick={() => setImageView(true)} />
                                        ) : (
                                          <div className=" relative text-center max-auto">
                                            <FiUploadCloud className="text-blue-500 md:mb-7 sm:mb-3 xs:mb-2 lg:text-[30px] md:text-[100px] sm:text-[80px] xs:text-[45px] mx-auto text-center" />
                                            <input
                                              type="file"
                                              className=" absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                                              name="uploadfile"
                                              onChange={ProductImage}
                                              multiple
                                              accept="image/*"
                                            />
                                            <span className=" text-center">
                                              Select Files
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="py-3 ps-2 border-b">
                                <div
                                  className="flex items-center gap-3 w-30 hover:bg-slate-100 p-1 px-2 cursor-pointer "
                                  style={{ width: "100px" }}
                                  onClick={toggleDetails}
                                >
                                  {DeatailsOpen ? <FaChevronUp /> : <FaChevronDown />}
                                  <h3>Details</h3>
                                </div>

                                {DeatailsOpen && (
                                  <div className="w-full text-gray-900 bg-white  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <button type="button" className="capitalize relative inline-flex items-center w-full px-4 py-2 text-sm font-bold  hover:bg-gray-100  text-gray-500">
                                      Name :
                                      <span className="text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300" >{product.name}</span>
                                    </button>
                                    <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-bold  hover:bg-gray-100 text-gray-500">
                                      Unit :
                                      <span className=" text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde">{product.unit}</span>
                                    </button>
                                    <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-bold hover:bg-gray-100 text-gray-500">
                                      Tax % :
                                      <span className=" text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde">{product.taxper}</span>
                                    </button>
                                    <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-bold hover:bg-gray-100 text-gray-500">
                                      Product code :
                                      <span className=" text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde">{product.productCode}</span>
                                    </button>
                                    <button type="button" className="capitalize relative inline-flex items-center w-full px-4 py-2 text-sm font-bold hover:bg-gray-100 text-gray-500">
                                      Category :
                                      <span className=" text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde">{product.categoryName}</span>
                                    </button>
                                  </div>
                                )}
                              </div>

                              <div className=' py-3 px-3 border-b'>
                                <div className='flex items-center justify-between '>
                                  <div className='flex items-center gap-3  w-30  hover:bg-slate-100 p-1 px-2 cursor-pointer ' style={{ width: "124px" }}
                                    onClick={() => { setPartcipantsOpen(!PartcipantsOpen) }}
                                  >
                                    {PartcipantsOpen ? <FaChevronUp /> : <FaChevronDown />}
                                    <h3>Participants</h3>
                                  </div>
                                  <button className='pe-2'
                                    onClick={() => { setShowModal(true); setParticipantsName('Add') }}
                                  >
                                    <FaPlus />
                                  </button>
                                </div>
                                {PartcipantsOpen && (
                                  <div className="p-2">
                                    {personIDs.length > 0 ? (
                                      personNames.map((name, index) => (
                                        <div className="flex gap-3 items-center p-0 h-6" key={index}>
                                          <BsPerson />
                                          <Link to={`/detailsPeople/${personIDs[index]}`} className='text-sm font-medium text-blue-600 capitalize cursor-pointer hover:border-b border-b-blue-600 ' >
                                            {name}
                                          </Link>
                                        </div>
                                      ))
                                    ) : (
                                      <p className='text-sm font-medium text-gray-900 dark:text-white'>
                                        There are no participants linked to this product
                                      </p>
                                    )}
                                    {personIDs.length > 0 && (
                                      <button
                                        data-modal-toggle="modal"
                                        className="focus:outline-none cursor-pointer text-black mt-3  px-5 py-2 border flex items-center"
                                        onClick={() => { setShowModal(true); setParticipantsName('View') }}
                                      >
                                        View All
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>

                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-8 xl:col-span-8">
                          <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3">
                            <div className="border-b border-gray-200 dark:border-gray-700">
                              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                <li className="me-2">
                                  <button
                                    onClick={() => handleTabClick("price")}
                                    className={`inline-flex items-center justify-center px-4 py-2 border-b-2 ${activeTab === "price"
                                      ? "border-blue-600 rounded-t-lg hover:text-white hover:border-blue-600 dark:hover:text-gray-300 group bg-blue-600 text-white"
                                      : "border-blue-600"
                                      }`}
                                  >
                                    Price
                                  </button>
                                </li>
                                <li className="me-2">
                                  <button
                                    onClick={() => handleTabClick("deals")}
                                    className={`inline-flex items-center justify-center  px-4 py-2 border-b-2 ${activeTab === "deals"
                                      ? "border-blue-600 rounded-t-lg hover:text-white hover:border-blue-600 dark:hover:text-gray-300 group bg-blue-600 text-white"
                                      : "border-blue-600"
                                      }`}
                                  >
                                    Deal
                                  </button>
                                </li>
                                <li className="me-2">
                                  <button
                                    onClick={() => handleTabClick("Variations")}
                                    className={`inline-flex items-center justify-center  px-4 py-2 border-b-2 ${activeTab === "Variations"
                                      ? "border-blue-600 rounded-t-lg hover:text-white hover:border-blue-600 dark:hover:text-gray-300 group bg-blue-600 text-white"
                                      : "border-blue-600"
                                      }`}
                                  >
                                    Variations
                                  </button>
                                </li>
                                <li className="me-2">
                                  <button
                                    onClick={() => handleTabClick("files")}
                                    className={`inline-flex items-center justify-center px-4 py-2 border-b-2 ${activeTab === "files"
                                      ? "border-blue-600 rounded-t-lg hover:text-white hover:border-blue-600 dark:hover:text-gray-300 group bg-blue-600 text-white"
                                      : "border-blue-600"
                                      }`}
                                  >
                                    Files
                                  </button>
                                </li>
                              </ul>
                              <hr />
                              {activeTab === "price" && (
                                <>
                                  <div className="flex-auto py-4">
                                    <div className="flex items-center mb-4">
                                      <button
                                        data-modal-toggle="modal"
                                        className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 flex items-center"
                                        onClick={() => setPriceModel(true)}
                                      >
                                        <FaPlus
                                          className="mr-2 font-extrabold"
                                          size={15}
                                        />
                                        Price
                                      </button>
                                    </div>
                                    <div className="relative scroll-inner shadow-md sm:rounded-lg">
                                      <table className="w-full border border-slate-200 dark:border-gray-400 rounded-t table">
                                        <thead className="rounded-t text-md font-medium border-b dark:bg-gray-800 dark:border-gray-400 text-gray-700 bg-gray-200 dark:text-gray-400">
                                          <tr className="text-center ">
                                            <th
                                              scope="col"
                                              className="mw-200 p-4 border-1 border-slate-300 capitalize"
                                            >
                                              Unit Price
                                            </th>
                                            <th
                                              scope="col"
                                              className="mw-200 p-4 border-1 border-slate-300 capitalize"
                                            >
                                              Cost Per Unit
                                            </th>
                                            <th
                                              scope="col"
                                              className="mw-200 p-4 border-1 border-slate-300 capitalize"
                                            >
                                              Direct Cost
                                            </th>
                                            <th
                                              scope="col"
                                              className="mw-200 p-4 border-1 border-slate-300 capitalize"
                                            >
                                              Currency
                                            </th>
                                            <th
                                              scope="col"
                                              className="mw-200 p-4 border-1 border-slate-300 capitalize"
                                            >
                                              Action
                                            </th>
                                          </tr>
                                        </thead>

                                        <tbody>
                                          {currentRows && currentRows?.length > 0 ? (
                                            currentRows?.map((item, index) => (
                                              <tr
                                                className="bg-white dark:bg-gray-800 text-center"
                                                key={index}
                                              >
                                                <td className="mw-200 px-4 py-2 border border-slate-200">
                                                  {formatNumber(item?.unitprice)}
                                                </td>
                                                <td className="mw-200 px-4 py-2 border border-slate-200">
                                                  {item?.cost}
                                                </td>
                                                <td className="mw-200 px-4 py-2 border border-slate-200">
                                                  {item?.directCost}
                                                </td>

                                                <td className="mw-200 px-4 py-2 border border-slate-200">
                                                  {item?.currencyName}
                                                </td>
                                                <td className="mw-200 px-4 py-2 border border-slate-200">
                                                  <div className="flex justify-center gap-4">
                                                    <div
                                                      data-tip
                                                      data-for="Edit"
                                                      className="relative group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                      onClick={() => {
                                                        setPriceModel(true);
                                                        handleEditPrice(
                                                          item.productPriceID
                                                        );
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
                                                      data-for="Edit"
                                                      className="relative group  cursor-pointer text-white bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                      onClick={() => {
                                                        handlerPriceDelete(item?.productPriceID);
                                                      }}
                                                    >
                                                      <MdDeleteForever />
                                                      <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex left-0 right-0">
                                                        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                          Delete
                                                        </span>
                                                        <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </td>
                                              </tr>
                                            ))
                                          ) : (
                                            <td colSpan={6}>
                                              <p className="text-center p-2">
                                                Not Found.
                                              </p>
                                            </td>
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className="flex lg:flex-row lg:justify-between md:flex-row md:justify-between sm:flex-row sm:justify-between flex-col justify-end p-5 gap-3">
                                      <div className="flex items-center">
                                        <span className="text-gray-500 font-semibold">{`Total ${Productstore?.getPrice?.length} Prices `}</span>
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
                                            handlePageChange(currentPage - 1)
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
                                          <span className="text-gray-500">{`Page ${currentPage} of ${totalPages}`}</span>
                                        </div>
                                        <button
                                          onClick={() =>
                                            handlePageChange(currentPage + 1)
                                          }
                                          // disabled={(currentPage === totalPages) || (store?.leadsData?.length === 0)}
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
                                  </div>
                                </>
                              )}

                              {activeTab === "deals" && (
                                <ProductDealView Product={Productstore?.getProductByID} />
                              )}
                              {activeTab === "Variations" && (
                                <>
                                  <VariationsView setLoadFist={setLoadFist} sidebarOpen={sidebarOpen} currentPage={currentPage} Productstore={Productstore} />
                                </>
                              )}
                              {activeTab === "files" && (<FilesView setLoadFist={setLoadFist} Productstore={Productstore} />)}
                            </div>
                          </div>
                        </div>
                      </div><>
                      </>
                    </div>
                  </>
                )}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
      {showModal && (<Partcipants toggleModal={toggleModal} product={product} setLoadFist={setLoadFist} id={id} ParticipantsName={ParticipantsName} />)}
      {PriceModel && (<AddPrice togglePrice={togglePrice} SelectPriceID={SelectPriceID} setLoadFist={setLoadFist} data={Productstore?.getPrice} />)}
      {ImageView && (<PdfView setPdfOpen={setImageView} pdfViewData={product} />)}



    </>
  );
}
