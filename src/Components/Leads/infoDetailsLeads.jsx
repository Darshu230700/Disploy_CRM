/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHistory, } from "../../Redux/CommonSlice";
import "react-quill/dist/quill.snow.css";
import { BiSolidLabel } from "react-icons/bi";
import { MdCameraRoll, MdEmail, MdOutlineKeyboardBackspace, MdOutlineLinkOff, } from "react-icons/md";
import { addORUpdateLeadMaster, archiveLeadData, editLeadmaster } from '../../Redux/LeadsSlice';
import toast from 'react-hot-toast';
import moment from 'moment/moment';
import Sidebar from '../Common/Sidebar';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaAngleDown, FaAngleUp, FaCircleUser, FaPlus, FaRegFlag } from 'react-icons/fa6';
import { IoBusinessSharp, IoLocationSharp } from 'react-icons/io5';
import AddDeals from '../Deals/AddDeals';
import Loading from '../Common/Loading';
import { fetchApiData } from "../../Redux/organizationSlice";
import { getAllPerson } from "../../Redux/PersonSlice";
import { FiPhone } from "react-icons/fi";
import AddEditPerson from "../Contacts/AddEditPerson";
import AddEditOrganizations from "../Contacts/AddEditOrganizations";
import sweetAlert from "../Common/sweetAlert";
import LinkLeads from "./LinkLeads";
import getUserDetail, { FormatDateMoment } from "../Common/defaultValue";
import HistoryView from "../Common/HistoryView";


const InfoDetailsLeads = ({
  isVisible,
  setIsVisible,
  setSidebarOpen,
  sidebarOpen,
  isDark,
  setIsDark,

}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.root.common);
  const getHistory = useSelector((state) => state.root.leads);
  const organizationstore = useSelector((state) => state.root.organization);
  const Peoplestore = useSelector((state) => state.root.Person);
  const userDetails = getUserDetail();

  const [activeAccordion, setActiveAccordion] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadFist, setLoadFist] = useState(true);
  const [leadData, setleaadData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [openSelect, setopenSelect] = useState(false)
  const [link, setlink] = useState('');
  const [linkOrg, setlinkOrg] = useState('');
  const [openOrganization, setOpenOrganization] = useState(false);
  const [OpenPerson, setOpenPerson] = useState(false);
  const [Error, setError] = useState('');

  useEffect(() => {
    const query = { type: "lead", id: id };
    if (loadFist) {
      setLoading(true)
      EditLead(id)
      dispatch(getAllPerson({}));
      dispatch(fetchApiData({}));
      dispatch(getAllHistory(query))
        .then((res) => {
          const timer = setTimeout(() => {
            setLoading(false)
          }, 1000);
          return () => clearTimeout(timer);
        })
      setLoadFist(false);
    }
  }, [loadFist, store, dispatch, id,]);


  const toggleModalData = () => { setLoadFist(true); setOpenOrganization(!openOrganization); };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const togglePerson = () => {
    setOpenPerson(!OpenPerson);
  };

  const toggleSelect = (item) => {
    setopenSelect(!openSelect)
    setlink(item)
    setlinkOrg('')
    setError('')
  }

  const EditLead = async (id) => {
    try {
      const res = await dispatch(editLeadmaster(id))
      if (res.payload.status === true) {
        setleaadData(res?.payload?.data)
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  }


  const archiveLead = (item) => {
    const payload = {
      LeadID: id,
      IsArchived: item,
    };
    dispatch(archiveLeadData(payload)).then((res) => {
      setLoadFist(true);
      navigate("/LeadInbox");
    })
  };

  const updateLead = (linkData) => {

    if (!linkOrg) {
      setError(`The ${link} name is Required`);
      return;
    }
    const payload = {
      leadID: leadData && leadData.leadID ? leadData.leadID : 0,
      peopleID: link && link === "Person" ? (linkData ? linkData.value : leadData.peopleID) : leadData?.peopleID,
      organizationID: link && link === "Organization" ? (linkData ? linkData.value : leadData.organizationID) : leadData.organizationID,
      title: leadData?.title,
      value: leadData?.value,
      currencyID: leadData?.currencyID,
      labelID: leadData?.labelID,
      ownerID: leadData?.ownerID,
      ExpectedCloseDate: leadData?.expectedCloseDate,
      visibleID: leadData?.visibleID,
      sourceType: "Manually created",
      leadPhoneDetails: leadData?.leadPhoneDetails,
      leadEmailDetails: leadData?.leadEmailDetails
    }

    dispatch(addORUpdateLeadMaster(payload)).then((res) => {
      toast.remove()
      if (res.payload.status === true) {
        setLoadFist(true)
        toggleSelect()
        toast.success(`${link} linked Successfully!`)
      }
    });
  }

  const toggleAccordion = (accordionId) => {
    setActiveAccordion(accordionId === activeAccordion ? "" : accordionId);
  };

  const UnlinkedData = async (id, type) => {
    try {
      const result = await sweetAlert.confirm(`Are you sure you want to unlink this ${type} from this Lead?`, null, 'unlink');

      const Payload = {
        ...leadData,
        organizationID: type === 'Organization' ? id : leadData?.organizationID,
        peopleID: type === 'Person' ? id : leadData?.peopleID
      }

      if (result?.isConfirmed) {
        dispatch(addORUpdateLeadMaster(Payload)).then((res) => {
          toast.remove()
          if (res.payload.status === true) {
            setLoadFist(true)
          }
        }).catch((error) => console.log('error :>> ', error))
      }

    } catch (error) {
      console.error("Error:", error);
      sweetAlert.error("An error occurred");
    }
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

                          Details Lead
                        </h1>
                        <ol className="list-reset flex text-sm">
                          <li>
                            Inbox
                          </li>
                          <li>
                            <span className="text-gray-500 mx-2">/</span>
                          </li>
                          <li className="text-blue-600 hover:text-blue-700">
                            Details lead
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
              <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                  <div className="flex gap-5 p-4 border-b items-center border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                    <button
                      type="submit"
                      className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200  dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                      onClick={() => navigate("/LeadInbox")}
                    >
                      <MdOutlineKeyboardBackspace size={20} />
                    </button>
                    <h4 className="font-semibold capitalize">
                      {leadData?.title}
                    </h4>
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center h-60">
                      <Loading />
                    </div>
                  ) : (
                    <>
                      <div className="flex-auto p-4">
                        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                          <div className="sm:col-span-12  md:col-span-12 lg:col-span-4 xl:col-span-4">
                            <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative   max-h-90 vertical-scroll-inner">
                              <div className="w-full  ">
                                <div>
                                  <h2 id="accordion-collapse-heading-1">
                                    <button
                                      type="button"
                                      className={`flex  justify-between items-center p-4 w-full font-medium text-left text-gray-500  border border-b border-gray-200 dark:border-slate-700 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                        "accordion-collapse-body-1"
                                        ? "active bg-slate-100"
                                        : ""
                                        }`}
                                      data-accordion-target="#accordion-collapse-body-1"
                                      aria-expanded={activeAccordion === "accordion-collapse-body-1"}
                                      aria-controls="accordion-collapse-body-1"
                                      onClick={() =>
                                        toggleAccordion(
                                          "accordion-collapse-body-1"
                                        )
                                      }
                                    >
                                      <span>  Details</span>
                                      {activeAccordion !==
                                        "accordion-collapse-body-1" ? (
                                        <FaAngleDown />
                                      ) : (
                                        <FaAngleUp />
                                      )}
                                    </button>
                                  </h2>
                                  <div
                                    id="accordion-collapse-body-1"
                                    className={`border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                      "accordion-collapse-body-1"
                                      ? "block"
                                      : "hidden"
                                      }`}
                                    aria-labelledby="accordion-collapse-heading-1"
                                  >
                                    <div className="w-full text-gray-900 bg-white  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                      <button type="button" className="relative gap-5 inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 ">
                                        <BiSolidLabel />
                                        <span className="text-xs font-semibold px-2 py-1 uppercase rounded" style={{ backgroundColor: leadData?.color }}>{leadData?.labelName}</span>
                                      </button>
                                      <button type="button" className="relative gap-3 inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 ">
                                        <MdCameraRoll />
                                        <span className=" text-black  text-sm font-semibold me-2 px-2.5 py-0.5 rounde"> {leadData?.currencyCode !== null && leadData?.currencyCode} {leadData?.value?.toLocaleString('en-IN')}</span>
                                      </button>
                                      <button type="button" className="relative gap-3 inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 ">
                                        <FaRegFlag />
                                        <span className=" text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde"> {FormatDateMoment(leadData?.expectedCloseDate)}</span>
                                      </button>
                                      <button type="button" className="relative gap-3 inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 ">
                                        <FaCircleUser />
                                        <span className=" text-black text-sm  font-semibold me-2 px-2.5 py-0.5 rounde"> {leadData.sourceType}</span>
                                      </button>

                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h2 id="accordion-collapse-heading-5">
                                    <button
                                      type="button"
                                      className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                        "accordion-collapse-body-5"
                                        ? "active bg-slate-100"
                                        : ""
                                        }`}
                                      data-accordion-target="#accordion-collapse-body-5"
                                      aria-expanded={
                                        activeAccordion ===
                                        "accordion-collapse-body-5"
                                      }
                                      aria-controls="accordion-collapse-body-5"
                                      onClick={() =>
                                        toggleAccordion(
                                          "accordion-collapse-body-5"
                                        )
                                      }
                                    >
                                      <span>Person</span>
                                      {activeAccordion !==
                                        "accordion-collapse-body-5" ? (
                                        <FaAngleDown />
                                      ) : (
                                        <FaAngleUp />
                                      )}
                                    </button>
                                  </h2>
                                  <div id="accordion-collapse-body-5" className={`border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-5" ? "block" : "hidden"}`}
                                    aria-labelledby="accordion-collapse-heading-5"
                                  >
                                    {
                                      leadData?.person === null ? (
                                        <p className="my-2 text-gray-500 dark:text-gray-400 text-center ">
                                          No Person linked to this Lead
                                        </p>
                                      ) : (
                                        <div className="w-full text-gray-900 bg-white  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                          <button
                                            type="button"
                                            // onClick={() => navigate(`/detailsPeople/${leadData?.person?.peopleID}`)}
                                            className="flex gap-6 items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100"
                                          >
                                            <FaCircleUser size={15} />
                                            <Link to={`/detailsPeople/${leadData?.person?.personMasterID}`} className=" text-blue-500 h-5 hover:border-b border-blue-500 text-base capitalize font-semibold ">{leadData?.person?.name}</Link>
                                          </button>
                                          <button
                                            type="button"
                                            className="flex gap-6 items-center w-full px-4 py-2  border-b border-gray-200 hover:bg-gray-100 "
                                          >
                                            <BiSolidLabel size={15} />
                                            <span
                                              className="text-xs font-semibold px-2 py-1 uppercase rounded"
                                              style={{ backgroundColor: leadData?.person?.color }}
                                            >
                                              {leadData?.person?.labelName}
                                            </span>
                                          </button>
                                          <button
                                            type="button"
                                            className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100"
                                          >
                                            <FiPhone size={15} />
                                            <div>
                                              {leadData?.person?.personPhoneDetails.map((item, index) => (
                                                <div className="flex gap-3 items-center" key={index}>
                                                  <p className="text-blue-600 font-semibold ms-4">{item?.phoneNumber} </p>
                                                  {item?.phoneType && <p className="text-gray-600 ">({item?.phoneType})</p>}
                                                </div>
                                              ))}
                                            </div>
                                          </button>
                                          <button
                                            type="button"
                                            className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100"
                                          >
                                            <MdEmail size={17} />
                                            <div>
                                              {leadData?.person?.personEmailDetails.map((item, index) => (
                                                <div div className="flex gap-3 items-center" key={index}>
                                                  <a
                                                    href={`mailto:${item?.email}`}
                                                    className="text-blue-600 font-semibold ms-4 h-5 my-1 flex justify-start hover:border-b border-blue-500"
                                                  >
                                                    {item?.email}
                                                  </a>
                                                  {item?.emailType && <p className="text-gray-600 ">({item?.emailType})</p>}
                                                </div>
                                              ))}

                                            </div>
                                          </button>
                                        </div>
                                      )}
                                    <div className=" flex gap-2 border-t border-grey-200 justify-end pe-5">
                                      <button
                                        type="submit"
                                        className="flex gap-3 items-center font-semibold my-2 rounded-full focus:outline-none text-black hover:bg-SlateBlue hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray dark:hover:bg-primary text-sm py-1 px-3 "
                                        onClick={() => toggleSelect("Person")}
                                      > <FaPlus /><span className='text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde'>Link an People</span>
                                      </button>
                                      {leadData?.person !== null && (
                                        <button
                                          type="submit"
                                          className="font-semibold m-3 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 "
                                          onClick={() => UnlinkedData(0, "Person")}
                                        >
                                          <MdOutlineLinkOff size={18} />
                                        </button>
                                      )}
                                      {/* <button
                                        type="submit"
                                        className="font-semibold my-3 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 "
                                        onClick={() => togglePerson()}
                                      >
                                        <IoAddCircle />
                                      </button> */}
                                    </div>

                                  </div>
                                </div>
                                <div>
                                  <h2 id="accordion-collapse-heading-4">
                                    <button
                                      type="button"
                                      className={`flex  justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                        "accordion-collapse-body-4"
                                        ? "active  bg-slate-100  "
                                        : ""
                                        }`}
                                      data-accordion-target="#accordion-collapse-body-4"
                                      aria-expanded={
                                        activeAccordion ===
                                        "accordion-collapse-body-4"
                                      }
                                      aria-controls="accordion-collapse-body-4"
                                      onClick={() =>
                                        toggleAccordion(
                                          "accordion-collapse-body-4"
                                        )
                                      }
                                    >
                                      <span> Organizations</span>
                                      {activeAccordion !==
                                        "accordion-collapse-body-4" ? (
                                        <FaAngleDown />
                                      ) : (
                                        <FaAngleUp />
                                      )}
                                    </button>
                                  </h2>
                                  <div
                                    id="accordion-collapse-body-4"
                                    className={`border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                      "accordion-collapse-body-4"
                                      ? "block"
                                      : "hidden"
                                      }`}
                                    aria-labelledby="accordion-collapse-heading-4"
                                  >
                                    {!(leadData?.organization === null) ? (
                                      <div className="w-full text-gray-900 bg-white  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <button
                                          type="button"
                                          className="relative inline-flex items-center gap-6 w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 capitalize"
                                        >
                                          < IoBusinessSharp size={15} />
                                          <Link to={`/detailsOrganization/${leadData?.organization?.organizationID}`} className=" text-gray-500 text-sm font-semibold h-5 hover:border-b border-black">
                                            {leadData?.organization?.organizationName}
                                          </Link>
                                        </button>
                                        <button
                                          type="button"
                                          className="relative  inline-flex items-center w-full gap-6 px-4 py-2  font-medium border-b border-gray-200 hover:bg-gray-100  dark:border-gray-600 dark:hover:bg-gray-600 "
                                        >
                                          <BiSolidLabel size={15} />
                                          <span
                                            className="text-xs font-semibold px-2 py-1 uppercase rounded"
                                            style={{ backgroundColor: leadData?.organization?.color }}
                                          >
                                            {leadData?.organization?.labelName}
                                          </span>
                                        </button>
                                        <button
                                          type="button"
                                          className="relative inline-flex gap-1 items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 "
                                        >
                                          <div><IoLocationSharp size={16} /></div>
                                          <p className="text-gray-500 text-left text-sm font-semibold  px-2 py-0.5  dark:bg-yellow-900 dark:text-yellow-300 ms-4 " >{leadData?.organization?.address}</p>
                                        </button>
                                      </div>
                                    ) : (
                                      <p className="my-2 text-gray-500 dark:text-gray-400 text-center">
                                        No organization linked to this Lead
                                      </p>
                                    )}
                                    <div className=" flex gap-2 border-t border-grey-200 justify-end pe-5">
                                      <button
                                        type="submit"
                                        className="flex  items-center font-semibold my-2 rounded-full focus:outline-none text-black hover:bg-SlateBlue hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray dark:hover:bg-primary text-sm py-1 px-3 "
                                        onClick={() => toggleSelect("Organization")}
                                      > <FaPlus /><span className='text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde'>Link an Organization</span>
                                      </button>
                                      {/* <button
                                        type="submit"
                                        className="font-semibold my-3 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 "
                                        onClick={() => toggleModalData()}
                                      >
                                        <IoAddCircle />
                                      </button> */}
                                      {leadData?.organization !== null && (
                                        <button
                                          type="submit"
                                          className="font-semibold m-3 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 "
                                          onClick={() => UnlinkedData(0, "Organization")}
                                        >
                                          <MdOutlineLinkOff size={18} />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h2 id="accordion-collapse-heading-7">
                                    <button
                                      type="button"
                                      className={`flex  justify-between items-center p-4 w-full font-medium text-left text-gray-500 border-t border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                        "accordion-collapse-body-7"
                                        ? "active bg-slate-100  "
                                        : ""
                                        }`}
                                      data-accordion-target="#accordion-collapse-body-7"
                                      aria-expanded={
                                        activeAccordion ===
                                        "accordion-collapse-body-7"
                                      }
                                      aria-controls="accordion-collapse-body-7"
                                      onClick={() =>
                                        toggleAccordion(
                                          "accordion-collapse-body-7"
                                        )
                                      }
                                    >
                                      <span>Smart Bcc</span>
                                      {activeAccordion !== "accordion-collapse-body-7" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                    </button>
                                  </h2>
                                  <div
                                    id="accordion-collapse-body-7"
                                    className={`p-4 border border-b border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                      "accordion-collapse-body-7"
                                      ? "block "
                                      : "hidden"
                                      }`}
                                    aria-labelledby="accordion-collapse-heading-7"
                                  >
                                    <p className="mb-3 text-gray-500 dark:text-gray-400">
                                      Universal address
                                    </p>
                                    <input
                                      type="text"
                                      id="disabled-input"
                                      aria-label="disabled input"
                                      className=" bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      value={userDetails?.emailID}
                                      disabled />
                                  </div>
                                </div>
                                <div className="border p-4">
                                  <div className="flex">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 "> Updated :- {moment(leadData?.updatedDate).format('MMMM Do YYYY, h:mm a')}  </p>
                                  </div>
                                  <div className="flex">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 "> Created :- {moment(leadData?.createdDate).format('MMMM Do YYYY, h:mm a')}  </p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-3 py-3 rounded-t border-t border-gray-200 dark:border-gray-4 justify-end ">
                                {getHistory?.leadsEdit?.isArchived ? (
                                  <>
                                    <button
                                      onClick={() => archiveLead(false)}
                                      className="font-semibold focus:outline-none text-red-500 hover:bg-red-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                    >
                                      UnArchive
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => archiveLead(true)}
                                      className="font-semibold focus:outline-none text-red-500 hover:bg-red-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                    >
                                      Archive
                                    </button>
                                  </>
                                )}

                                <button
                                  type="submit"
                                  className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                  onClick={() => setShowModal(true)}
                                >
                                  Convert to deal
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="sm:col-span-12  md:col-span-12 lg:col-span-8 xl:col-span-8">
                            <HistoryView Data={leadData} setLoadFirst={setLoadFist} getAllVisible={store} id={id} identityName='lead' />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>

      {openSelect && (
        <LinkLeads
          link={link}
          toggleSelect={toggleSelect}
          linkOrg={linkOrg}
          Peoplestore={Peoplestore}
          setlinkOrg={setlinkOrg}
          organizationstore={organizationstore}
          updateLead={updateLead}
          Error={Error}
          Data={leadData}
        />
      )}

      {OpenPerson && <AddEditPerson togglemodel={togglePerson} setLoadFirst={setLoadFist} />}

      {openOrganization && (<AddEditOrganizations toggleModalOrganization={toggleModalData} setLoadFist={setLoadFist} />)}

      {showModal && <AddDeals toggleModal={toggleModal} leadData={leadData} setloadFrist={setLoadFist} />}

    </>
  );
};

export default InfoDetailsLeads;

