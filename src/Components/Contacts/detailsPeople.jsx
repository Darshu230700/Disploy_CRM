/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown, FaAngleUp, FaEye, FaPlus } from "react-icons/fa6";
import AddDeals from "../Deals/AddDeals";
import AddEditOrganizations from "./AddEditOrganizations";
import AddLeads from "../Leads/AddLeads";
import { IoAddCircle, IoBusinessSharp, IoCall, IoLocationSharp } from "react-icons/io5";
import { AiFillFlag } from "react-icons/ai";
import moment from "moment";
import { getLeadmaster } from "../../Redux/LeadsSlice";
import { getPersonByID, handleAddPerson } from "../../Redux/PersonSlice";
import { getAllHistory, getAllLabel, getAllVisibleTo } from "../../Redux/CommonSlice";
import getUserDetail from "../Common/defaultValue";
import { MdOutlineKeyboardBackspace, MdOutlineLinkOff } from "react-icons/md";
import { BiSolidLabel } from "react-icons/bi";
import { HiMail } from "react-icons/hi";
import { getProject } from "../../Redux/ProjectSlice";
import { fetchApiData } from "../../Redux/organizationSlice";
import { FaUserCircle } from "react-icons/fa";
import Loading from "../Common/Loading";
import sweetAlert from "../Common/sweetAlert";
import LinkLeads from "../Leads/LinkLeads";
import { Phase, Pipelinestage } from "../Common/Common";
import toast from "react-hot-toast";
import { BsFillFlagFill } from "react-icons/bs";
import DynamicTable from "../Common/table";
import HistoryView from "../Common/HistoryView";

const DetailsOrganization = ({
    isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark,
}) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userDetails = getUserDetail();
    const getAllVisible = useSelector((state) => state.root.common);
    const Projectstore = useSelector((state) => state.root.Project);
    const Leadstore = useSelector((state) => state.root.leads);
    const organizationstore = useSelector((state) => state.root.organization);
    const [loadFirst, setLoadFirst] = useState(true);
    const [activeAccordion, setActiveAccordion] = useState("");
    const [openDeal, setOpenDeal] = useState(false);
    const [openOrganization, setOpenOrganization] = useState(false);
    const [openModelLead, setOpenModelLead] = useState(false);
    const [PersonEdit, setPersonEdit] = useState([]);
    const [modelLabel, setModelLabel] = useState("");
    const [DealTable, setDealTable] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openSelect, setopenSelect] = useState(false)
    const [link, setlink] = useState('');
    const [linkData, setlinkData] = useState('');
    const [Error, setError] = useState('');
    const [dealID, setdealID] = useState([]);

    useEffect(() => {
        const query = { type: "people", id: id }
        if (loadFirst) {
            setLoading(true)
            EditPerson(id)
            dispatch(getAllLabel({}))
            dispatch(getAllVisibleTo({}))
            dispatch(getAllHistory(query))
            dispatch(getProject({}))
            dispatch(getLeadmaster({ search: '', limit: 0, pageNumber: 0, objSearch: {} }))
            // dispatch(getLeadmaster({ IsArchived: false }))
            dispatch(fetchApiData({}))
                .then(() => {
                    const timer = setTimeout(() => {
                        setLoading(false)
                    }, 1000);

                    return () => clearTimeout(timer);

                })
            setLoadFirst(false);
        }
    }, [dispatch, id, loadFirst]);

    useEffect(() => {
        const selectedValues = dealID && dealID?.map((option) => option?.value).join(',');
        setlinkData(selectedValues);
    }, [dealID]);

    const toggleSelect = (item) => {
        setopenSelect(!openSelect)
        setlink(item)
        setlinkData('')
        setError('')
    }

    const toggleAccordion = (accordionId) => {
        setActiveAccordion(accordionId === activeAccordion ? "" : accordionId);
    };

    const toggleModal = () => { setOpenDeal(!openDeal); };

    const toggleModalData = () => {
        setOpenOrganization(!openOrganization);
    };

    const togglemodelLead = () => {
        setOpenModelLead(!openModelLead);
    };

    const ViewAll = (label) => {
        setModelLabel(label);
        if (label === "Deals") {
            setDealTable(true);
        }
    };

    const EditPerson = async (id) => {
        const result = await dispatch(getPersonByID(id));
        if (result) {
            setPersonEdit(result?.payload?.data);
        }
    };

    const columns = [
        { Header: "Title", accessor: "title" },
        { Header: "Value", accessor: "value" },
        { Header: "Organization", accessor: "organizationName" },
        { Header: "Contact Person", accessor: "personName" },
        { Header: "Expected CloseDate", accessor: "expectedCloseDate" },
        { Header: "Next activity", accessor: "next_activity" },
        { Header: "Owner", accessor: "ownerName" },
    ];

    const UpdatePerson = (linkedData) => {
        if (link) {
            if (!linkData) {
                setError('Select is required');
                return;
            }
        }
        let Params = {
            ...PersonEdit,
            organizationID: link && link === "Organization" ? (linkedData ? linkedData?.value : PersonEdit?.organizationID) : PersonEdit?.organizationID,
            projectID: link && link === "Project" ? (PersonEdit?.projectID ? PersonEdit?.projectID + ',' + linkedData?.value : linkedData?.value) : PersonEdit?.projectID,
            leadID: link && link === "Lead" ? (PersonEdit?.leadID ? PersonEdit?.leadID + ',' + linkedData.value : linkedData?.value) : PersonEdit?.leadID,
            dealID: !link ? (PersonEdit?.dealID ? PersonEdit?.dealID + ',' + linkedData?.dealID : linkedData?.dealID) : PersonEdit?.dealID,
        };

        try {
            dispatch(handleAddPerson(Params)).then((res) => {
                toast.remove()
                if (res?.payload?.status === true) {
                    toast.success(`${link || 'Deal'} linked Successfully!`)
                    if (!(link === '' || link === undefined)) {
                        setLoadFirst(true);
                        toggleSelect()
                    }
                }
            });
        } catch (error) {
            console.log("error", error);
        }
    };

    const UnlinkedData = async (id, type,) => {
        try {
            const result = await sweetAlert?.confirm(`Are you sure you want to unlink this ${type} from this People?`, null, 'unlink');

            const dataID = type === 'Project' ? PersonEdit?.projectID.split(',') : type === 'Lead' ? PersonEdit?.leadID?.split(',') : ''
            const ID = dataID ? dataID.filter(x => parseInt(x) !== id).join(',') : ''

            const Payload = {
                ...PersonEdit,
                projectID: type === 'Project' ? ID : PersonEdit?.projectID,
                organizationID: type === 'Organization' ? 0 : PersonEdit?.organizationID,
                leadID: type === 'Lead' ? ID : PersonEdit?.leadID
            }

            if (result.isConfirmed) {
                dispatch(handleAddPerson(Payload)).then((res) => {
                    toast.remove()
                    if (res.payload.status === true) {
                        setLoadFirst(true)
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
                                                    Details People
                                                </h1>
                                                <ol className="list-reset flex text-sm">
                                                    <li>
                                                        People
                                                    </li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-blue-600 hover:text-blue-700">
                                                        Details People
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
                                    {loading && (<div className='h-screen'><Loading /></div>)}
                                    {!loading && (
                                        <>
                                            <div className="border-b flex gap-5 border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                                <button
                                                    type="submit"
                                                    className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200  dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                                    onClick={() => navigate('/Contact-People')}
                                                >
                                                    <MdOutlineKeyboardBackspace size={20} />
                                                </button>
                                                <h4 className="font-semibold capitalize">
                                                    {PersonEdit?.name}
                                                </h4>
                                            </div>
                                            <div className="flex-auto p-4">
                                                <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                                                    <div className="sm:col-span-12  md:col-span-12 lg:col-span-4 xl:col-span-4">
                                                        <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                                            <div className="flex-auto">
                                                                <div
                                                                    id="accordion-collapse"
                                                                    data-accordion="collapse"
                                                                >
                                                                    <div>
                                                                        <h2 id="accordion-collapse-heading-1">
                                                                            <button
                                                                                type="button"
                                                                                className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 rounded-t-xl border border-b-0 border-gray-200 dark:border-slate-700 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                    "accordion-collapse-body-1"
                                                                                    ? "active"
                                                                                    : ""
                                                                                    }`}
                                                                                data-accordion-target="#accordion-collapse-body-1"
                                                                                aria-expanded={
                                                                                    activeAccordion ===
                                                                                    "accordion-collapse-body-1"
                                                                                }
                                                                                aria-controls="accordion-collapse-body-1"
                                                                                onClick={() =>
                                                                                    toggleAccordion(
                                                                                        "accordion-collapse-body-1"
                                                                                    )
                                                                                }
                                                                            >
                                                                                <span>Summary</span>
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
                                                                            className={` border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                                                                "accordion-collapse-body-1"
                                                                                ? "block"
                                                                                : "hidden"
                                                                                }`}
                                                                            aria-labelledby="accordion-collapse-heading-1"
                                                                        >
                                                                            <div className="w-full text-gray-900 bg-white  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ">
                                                                                <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white ">
                                                                                    <BiSolidLabel />
                                                                                    <span className="text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 ms-4" style={{ backgroundColor: PersonEdit?.color }}>{PersonEdit?.labelName}</span>
                                                                                </button>
                                                                                <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white ">
                                                                                    <HiMail size={15} />
                                                                                    <div>
                                                                                        {PersonEdit && PersonEdit?.personEmailDetails?.length > 0 && PersonEdit?.personEmailDetails.map((item, index) => (
                                                                                            <div div className="flex gap-3 items-center">
                                                                                                <a
                                                                                                    key={index}
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
                                                                                <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-blue-700  dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                                                                    <IoCall />
                                                                                    <div>
                                                                                        {PersonEdit && PersonEdit?.personPhoneDetails?.length > 0 && PersonEdit?.personPhoneDetails?.map((item) => (
                                                                                            <div className="flex gap-3 items-center">
                                                                                                <p className="text-blue-600 font-semibold ms-4">{item?.phoneNumber} </p>
                                                                                                {item?.phoneType && <p className="text-gray-600 ">({item?.phoneType})</p>}
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <h2 id="accordion-collapse-heading-2">
                                                                            <button
                                                                                type="button"
                                                                                className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-b-0 border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                    "accordion-collapse-body-2"
                                                                                    ? "active"
                                                                                    : ""
                                                                                    }`}
                                                                                data-accordion-target="#accordion-collapse-body-2"
                                                                                aria-expanded={
                                                                                    activeAccordion ===
                                                                                    "accordion-collapse-body-2"
                                                                                }
                                                                                aria-controls="accordion-collapse-body-2"
                                                                                onClick={() =>
                                                                                    toggleAccordion(
                                                                                        "accordion-collapse-body-2"
                                                                                    )
                                                                                }
                                                                            >
                                                                                <span>Details</span>
                                                                                {activeAccordion !==
                                                                                    "accordion-collapse-body-2" ? (
                                                                                    <FaAngleDown />
                                                                                ) : (
                                                                                    <FaAngleUp />
                                                                                )}
                                                                            </button>
                                                                        </h2>
                                                                        <div
                                                                            id="accordion-collapse-body-2"
                                                                            className={`p-4 border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                                                                "accordion-collapse-body-2"
                                                                                ? "block"
                                                                                : "hidden"
                                                                                }`}
                                                                            aria-labelledby="accordion-collapse-heading-2"
                                                                        >
                                                                            <div className="flex">
                                                                                <p className="text-gray-500 dark:text-gray-400 font-semibold"> First name -: {PersonEdit?.name}  </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <h2 id="accordion-collapse-heading-4">
                                                                            <button
                                                                                type="button"
                                                                                className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-b-0 border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                    "accordion-collapse-body-3"
                                                                                    ? "active"
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
                                                                                <span>Organizations</span>
                                                                                {activeAccordion !== "accordion-collapse-body-4" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                                                            </button>
                                                                        </h2>
                                                                        <div
                                                                            id="accordion-collapse-body-4"
                                                                            className={` border border-y-0  border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                                                                "accordion-collapse-body-4"
                                                                                ? "block"
                                                                                : "hidden"
                                                                                }`}
                                                                            aria-labelledby="accordion-collapse-heading-4"
                                                                        >
                                                                            <div>
                                                                                {PersonEdit?.organization === null ? (
                                                                                    <p className="text-center border-b p-3">No organization is linked to this person.</p>
                                                                                ) : (
                                                                                    <div className="w-full border-b text-gray-900 bg-white  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3 py-1">
                                                                                        <button type="button" className="relative flex gap-4 items-center w-full px-4 py-1.5 text-sm font-medium  hover:bg-gray-100 ">
                                                                                            < IoBusinessSharp size={15} />
                                                                                            <Link to={`/detailsOrganization/${PersonEdit?.organization?.organizationID}`} className=" text-black text-sm capitalize font-semibold h-5 hover:border-b  border-black">{PersonEdit?.organization?.organizationName}</Link>
                                                                                        </button>
                                                                                        <button type="button" className="relative flex items-center w-full px-4 py-2  hover:bg-gray-100   dark:hover:bg-gray-600">
                                                                                            <div>
                                                                                                <IoLocationSharp />
                                                                                            </div>
                                                                                            <p className="text-black text-left text-sm font-semibold me-2 px-2 py-0.5  dark:bg-yellow-900 dark:text-yellow-300 ms-4">{PersonEdit?.organization?.address}</p>
                                                                                        </button>
                                                                                        <button type="button" className="relative inline-flex items-center w-full px-4 py-1 text-sm font-medium  hover:bg-gray-100 hover:text-blue-700  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                            <BiSolidLabel />
                                                                                            <span className="ms-3 text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde" style={{ backgroundColor: PersonEdit?.color }}>{PersonEdit?.organization?.labelName}</span>
                                                                                        </button>
                                                                                    </div>
                                                                                )}
                                                                                <div className="flex items-center justify-end ">
                                                                                    <button
                                                                                        type="submit"
                                                                                        className=" ms-2 flex gap-3 items-center font-semibold my-2 rounded-full focus:outline-none text-black hover:bg-SlateBlue hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray dark:hover:bg-primary text-sm py-1 px-3 "
                                                                                        onClick={() => toggleSelect("Organization")}
                                                                                    > <FaPlus /><span className='text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde'>Link an Organization</span>
                                                                                    </button>
                                                                                    {PersonEdit?.organization !== null && (
                                                                                        <button
                                                                                            type="submit"
                                                                                            className="font-semibold m-3 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 "
                                                                                            onClick={() => UnlinkedData(PersonEdit?.organization?.organizationID, "Organization")}
                                                                                        >
                                                                                            <MdOutlineLinkOff size={18} />
                                                                                        </button>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <h2 id="accordion-collapse-heading-3">
                                                                            <button
                                                                                type="button"
                                                                                className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                    "accordion-collapse-body-3"
                                                                                    ? "active"
                                                                                    : ""
                                                                                    }`}
                                                                                data-accordion-target="#accordion-collapse-body-3"
                                                                                aria-expanded={
                                                                                    activeAccordion ===
                                                                                    "accordion-collapse-body-3"
                                                                                }
                                                                                aria-controls="accordion-collapse-body-3"
                                                                                onClick={() =>
                                                                                    toggleAccordion(
                                                                                        "accordion-collapse-body-3"
                                                                                    )
                                                                                }
                                                                            >
                                                                                <span>Deal</span>
                                                                                {activeAccordion !==
                                                                                    "accordion-collapse-body-3" ? (
                                                                                    <FaAngleDown />
                                                                                ) : (
                                                                                    <FaAngleUp />
                                                                                )}
                                                                            </button>
                                                                        </h2>
                                                                        <div
                                                                            id="accordion-collapse-body-3"
                                                                            className={`   border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                                                                "accordion-collapse-body-3"
                                                                                ? "block"
                                                                                : "hidden"
                                                                                }`}
                                                                            aria-labelledby="accordion-collapse-heading-3"
                                                                        >
                                                                            <div className="">
                                                                                {PersonEdit?.deal?.length > 0 ? (
                                                                                    PersonEdit?.deal.map((x, index) => (
                                                                                        <div className="bg-white dark:bg-slate-800 shadow  rounded-md  relative m-3" key={index}>
                                                                                            <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-2 px-4 dark:text-slate-300/70">
                                                                                                <div className="font-semibold capitalize cursor-pointer" onClick={() => navigate(`/deal/${x?.dealID}`)}>
                                                                                                    <Link to={`/deal/${x?.dealID}`} className="hover:border-b border-b-neutral-950">{x?.title}</Link>
                                                                                                    <p className="text-gray-900 text-sm flex gap-2 items-center my-1">
                                                                                                        <FaUserCircle /><small>{`${x?.currencyCode !== null ? x?.currencyCode : ''} ${x?.value}`}</small>
                                                                                                    </p>
                                                                                                    <div>
                                                                                                        <ul id="pipelineList" className="flex items-center justify-between bg-white dark:bg-slate-400 rounded-full overflow-hidden">
                                                                                                            {Pipelinestage.map((stage, index) => {
                                                                                                                const currentIndex = Pipelinestage.findIndex(stage => stage === x?.pipelineStage)
                                                                                                                const isCurrent = index <= currentIndex;
                                                                                                                return (
                                                                                                                    <li key={index} className="relative w-full mx-0.5">
                                                                                                                        <div className="flex w-full bg-slate-200 rounded-full overflow-hidden" style={{ height: '.130rem' }}>
                                                                                                                            <div
                                                                                                                                className={`absolute left-0 h-full  transition-all duration-500`}
                                                                                                                                style={{ width: `${100}%`, background: isCurrent ? '#008000' : '' }}
                                                                                                                            ></div>
                                                                                                                        </div>
                                                                                                                    </li>
                                                                                                                );
                                                                                                            })}
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                ) : (
                                                                                    <p className="my-2 text-gray-500 dark:text-gray-400 text-center">
                                                                                        Create New Deal
                                                                                    </p>
                                                                                )}
                                                                            </div>


                                                                            <div className=" flex gap-2 border-t border-grey-200 justify-end pe-5">
                                                                                {/* <button
                                                                                type="submit"
                                                                                className="ms-3 flex gap-3 items-center font-semibold my-2 rounded-full focus:outline-none text-black hover:bg-SlateBlue hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray dark:hover:bg-primary text-sm py-1 px-3 "
                                                                                onClick={() => toggleSelect("Deal")}
                                                                            > <FaPlus /><span className='text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde'>Link an Deal</span>
                                                                            </button> */}
                                                                                {PersonEdit?.deal?.length > 0 && (
                                                                                    <button
                                                                                        type="submit"
                                                                                        className="font-semibold my-3 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3"
                                                                                        onClick={() =>
                                                                                            ViewAll("Deals")}
                                                                                    >
                                                                                        <FaEye />
                                                                                    </button>
                                                                                )}
                                                                                <button
                                                                                    type="submit"
                                                                                    className="font-semibold ms-3 my-3 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white   border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 "
                                                                                    onClick={() => toggleModal()}
                                                                                >
                                                                                    <IoAddCircle />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <h2 id="accordion-collapse-heading-6">
                                                                            <button
                                                                                type="button"
                                                                                className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                    "accordion-collapse-body-3"
                                                                                    ? "active"
                                                                                    : ""
                                                                                    }`}
                                                                                data-accordion-target="#accordion-collapse-body-6"
                                                                                aria-expanded={
                                                                                    activeAccordion ===
                                                                                    "accordion-collapse-body-6"
                                                                                }
                                                                                aria-controls="accordion-collapse-body-6"
                                                                                onClick={() =>
                                                                                    toggleAccordion(
                                                                                        "accordion-collapse-body-6"
                                                                                    )
                                                                                }
                                                                            >
                                                                                <span>Overview</span>
                                                                                {activeAccordion !==
                                                                                    "accordion-collapse-body-6" ? (
                                                                                    <FaAngleDown />
                                                                                ) : (
                                                                                    <FaAngleUp />
                                                                                )}
                                                                            </button>
                                                                        </h2>
                                                                        <div
                                                                            id="accordion-collapse-body-6"
                                                                            className={`px-4 p-y border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                                                                "accordion-collapse-body-6"
                                                                                ? "block"
                                                                                : "hidden"
                                                                                }`}
                                                                            aria-labelledby="accordion-collapse-heading-6"
                                                                        >
                                                                            <p className=" text-gray-500 dark:text-gray-400 py-3">
                                                                                There are many variations of passages of
                                                                                Lorem Ipsum available, but the majority have
                                                                                suffered alteration in some form.
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <h2 id="accordion-collapse-heading-7">
                                                                            <button
                                                                                type="button"
                                                                                className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                    "accordion-collapse-body-3"
                                                                                    ? "active"
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
                                                                                {activeAccordion !==
                                                                                    "accordion-collapse-body-7" ? (
                                                                                    <FaAngleDown />
                                                                                ) : (
                                                                                    <FaAngleUp />
                                                                                )}
                                                                            </button>
                                                                        </h2>
                                                                        <div
                                                                            id="accordion-collapse-body-7"
                                                                            className={`px-4 py-2 border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                                                                "accordion-collapse-body-7"
                                                                                ? "block"
                                                                                : "hidden"
                                                                                }`}
                                                                            aria-labelledby="accordion-collapse-heading-7"
                                                                        >
                                                                            <p className="mb-2 text-gray-500 dark:text-gray-400">
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

                                                                    <div>
                                                                        <h2 id="accordion-collapse-heading-8">
                                                                            <button
                                                                                type="button"
                                                                                className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                    "accordion-collapse-body-3"
                                                                                    ? "active"
                                                                                    : ""
                                                                                    }`}
                                                                                data-accordion-target="#accordion-collapse-body-8"
                                                                                aria-expanded={
                                                                                    activeAccordion ===
                                                                                    "accordion-collapse-body-8"
                                                                                }
                                                                                aria-controls="accordion-collapse-body-8"
                                                                                onClick={() =>
                                                                                    toggleAccordion(
                                                                                        "accordion-collapse-body-8"
                                                                                    )
                                                                                }
                                                                            >
                                                                                <span>Leads</span>
                                                                                {activeAccordion !==
                                                                                    "accordion-collapse-body-8" ? (
                                                                                    <FaAngleDown />
                                                                                ) : (
                                                                                    <FaAngleUp />
                                                                                )}
                                                                            </button>
                                                                        </h2>
                                                                        <div
                                                                            id="accordion-collapse-body-8"
                                                                            className={` border border-b border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                                                                "accordion-collapse-body-8"
                                                                                ? "block"
                                                                                : "hidden"
                                                                                }`}
                                                                            aria-labelledby="accordion-collapse-heading-8"
                                                                        >
                                                                            {
                                                                                PersonEdit?.lead?.length > 0 ? (
                                                                                    PersonEdit?.lead?.map((x, index) => (
                                                                                        <div key={index} className="bg-white dark:bg-slate-800 shadow  rounded-md  relative m-3" >
                                                                                            <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-2 px-4 dark:text-slate-300/70">
                                                                                                <div className="font-semibold capitalize">
                                                                                                    <div className="justify-between flex items-center">
                                                                                                        <Link to={`/detailsLead/${x?.leadID}`} className="hover:border-b h-5 border-black">{x?.title}</Link>
                                                                                                        <div
                                                                                                            data-tip
                                                                                                            data-for="Edit"
                                                                                                            className="relative  group cursor-pointer "
                                                                                                            onClick={() => UnlinkedData(x?.leadID, 'Lead')}
                                                                                                        >
                                                                                                            <MdOutlineLinkOff size={18} />
                                                                                                            <div className="absolute bottom-0 right-0 left-0 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                                                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                                                                                    Unlink Lead
                                                                                                                </span>
                                                                                                                <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <p className="text-gray-900 text-sm flex gap-2 items-center mt-1">
                                                                                                        <FaUserCircle /><small>{`${x?.currencyCode !== null ? x?.currencyCode : ''} ${x?.value}`}</small>
                                                                                                    </p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                ) : (
                                                                                    < >
                                                                                        <p className="my-2 text-gray-500 dark:text-gray-400 text-center">
                                                                                            Create New Lead
                                                                                        </p>
                                                                                    </>
                                                                                )
                                                                            }
                                                                            <div className="gap-3 flex  px-4 border-t border-grey-200 justify-end ms-2">
                                                                                <button
                                                                                    type="submit"
                                                                                    className="ms-3 flex gap-3 items-center font-semibold my-2 rounded-full focus:outline-none text-black hover:bg-SlateBlue hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray dark:hover:bg-primary text-sm py-1 px-3 "
                                                                                    onClick={() => toggleSelect("Lead")}
                                                                                > <FaPlus /><span className='text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde'>Link an Lead</span>
                                                                                </button>
                                                                                <button
                                                                                    type="submit"
                                                                                    className="font-semibold ms-3 my-3 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 "
                                                                                    onClick={() => togglemodelLead()}
                                                                                >
                                                                                    <IoAddCircle />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <h2 id="accordion-collapse-heading-9">
                                                                            <button
                                                                                type="button"
                                                                                className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border  border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                    "accordion-collapse-body-3"
                                                                                    ? "active"
                                                                                    : ""
                                                                                    }`}
                                                                                data-accordion-target="#accordion-collapse-body-9"
                                                                                aria-expanded={
                                                                                    activeAccordion ===
                                                                                    "accordion-collapse-body-9"
                                                                                }
                                                                                aria-controls="accordion-collapse-body-9"
                                                                                onClick={() =>
                                                                                    toggleAccordion(
                                                                                        "accordion-collapse-body-9"
                                                                                    )
                                                                                }
                                                                            >
                                                                                <span>Projects</span>
                                                                                {activeAccordion !==
                                                                                    "accordion-collapse-body-9" ? (
                                                                                    <FaAngleDown />
                                                                                ) : (
                                                                                    <FaAngleUp />
                                                                                )}
                                                                            </button>
                                                                        </h2>
                                                                        <div
                                                                            id="accordion-collapse-body-9"
                                                                            className={`  border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                                                                "accordion-collapse-body-9"
                                                                                ? "block"
                                                                                : "hidden"
                                                                                }`}
                                                                            aria-labelledby="accordion-collapse-heading-9"
                                                                        >
                                                                            <div className="border-b">
                                                                                {PersonEdit?.project?.length > 0 ? (
                                                                                    PersonEdit?.project.map((x, index) => (
                                                                                        <div className="bg-white dark:bg-slate-800 shadow  rounded-md  relative m-3" key={index}>
                                                                                            <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-2 px-4 dark:text-slate-300/70">
                                                                                                <div className="font-semibold capitalize">
                                                                                                    <div className="flex justify-between items-center">
                                                                                                        <Link to={`/Projects/${x?.projectID}`} className="cursor-pointer hover:border-b h-5 border-black">{x?.title}</Link>
                                                                                                        <div
                                                                                                            data-tip
                                                                                                            data-for="Edit"
                                                                                                            className="relative  group cursor-pointer "
                                                                                                            onClick={() => UnlinkedData(x?.projectID, 'Project')}
                                                                                                        >
                                                                                                            <MdOutlineLinkOff size={18} />
                                                                                                            <div className="absolute bottom-0 right-0 left-0 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                                                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                                                                                    Unlink Project
                                                                                                                </span>
                                                                                                                <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className='flex  mt-2 '>
                                                                                                        <div
                                                                                                            data-tip
                                                                                                            data-for="Edit"
                                                                                                            className="relative flex items-center group cursor-pointer  w-full"
                                                                                                        >
                                                                                                            <BsFillFlagFill />
                                                                                                            <span className="text-black text-xs  font-semibold px-2.5  rounded dark:bg-yellow-900 " >{moment(new Date(x?.startDateTime)).format('MMMM D, YYYY ')}</span>
                                                                                                            <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                                                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                                                                                    Start Date
                                                                                                                </span>
                                                                                                                <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div
                                                                                                            data-tip
                                                                                                            data-for="Edit"
                                                                                                            className="relative flex items-center group cursor-pointer  w-full"
                                                                                                        >
                                                                                                            <AiFillFlag />
                                                                                                            <span className="text-black text-xs  font-semibold px-2.5  rounded dark:bg-yellow-900 " >{moment(new Date(x?.endDateTime)).format('MMMM D, YYYY ')}</span>
                                                                                                            <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                                                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                                                                                    End Date
                                                                                                                </span>
                                                                                                                <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="mt-3">
                                                                                                        <ul id="pipelineList" className="flex items-center justify-between bg-white dark:bg-slate-400 rounded-full overflow-hidden">
                                                                                                            {Phase.map((stage, index) => {
                                                                                                                const currentIndex = Phase.findIndex(stage => stage?.name === x?.phase);
                                                                                                                const isCurrent = index <= currentIndex;
                                                                                                                return (
                                                                                                                    <li key={index} className="relative w-full mx-0.5">
                                                                                                                        <div className="flex w-full bg-slate-200 rounded-full overflow-hidden" style={{ height: '.171rem' }}>
                                                                                                                            <div
                                                                                                                                className={`absolute left-0 h-full  transition-all duration-500`}
                                                                                                                                style={{ width: `${100}%`, background: isCurrent ? '#008000' : '' }}
                                                                                                                            ></div>
                                                                                                                        </div>
                                                                                                                    </li>
                                                                                                                );
                                                                                                            })}
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                ) :
                                                                                    (<p className="py-3 text-center"> Link Project</p>)}

                                                                            </div>
                                                                            <div className="flex justify-end pe-2">
                                                                                <button
                                                                                    type="submit"
                                                                                    className="ms-3 flex gap-3 items-center font-semibold my-2 rounded-full focus:outline-none text-black hover:bg-SlateBlue hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray dark:hover:bg-primary text-sm py-1 px-3 "
                                                                                    onClick={() => toggleSelect("Project")}
                                                                                > <FaPlus /><span className='text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde'>Link an Project</span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="border p-4">
                                                                        <div className="flex">
                                                                            <p className="text-sm text-gray-500 dark:text-gray-400 "> Updated :- {moment(PersonEdit?.updatedDate).format('MMMM Do YYYY, h:mm a')}  </p>
                                                                        </div>
                                                                        <div className="flex">
                                                                            <p className="text-sm text-gray-500 dark:text-gray-400 "> Created :- {moment(PersonEdit?.createdDate).format('MMMM Do YYYY, h:mm a')}  </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-12  md:col-span-12 lg:col-span-8 xl:col-span-8">
                                                        <HistoryView Data={PersonEdit} setLoadFirst={setLoadFirst} getAllVisible={getAllVisible} id={id} identityName='people' />
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
            </div >
            {openDeal && <AddDeals toggleModal={toggleModal} setloadFrist={setLoadFirst} dealID={id} name={PersonEdit?.name} UpdatePerson={UpdatePerson} />}
            {openOrganization && (<AddEditOrganizations toggleModalOrganization={toggleModalData} setLoadFist={setLoadFirst} />)}
            {openModelLead && <AddLeads togglemodelLead={togglemodelLead} setLoadFistInbox={setLoadFirst} />}
            {openSelect && (
                <LinkLeads
                    link={link}
                    toggleSelect={toggleSelect}
                    linkOrg={linkData}
                    setlinkOrg={setlinkData}
                    organizationstore={organizationstore}
                    updateLead={UpdatePerson}
                    Error={Error}
                    Leadstore={Leadstore}
                    Projectstore={Projectstore}
                    setdealID={setdealID}
                    dealID={dealID}
                />
            )}
            {/* Deal model Table */}
            {DealTable && (<DynamicTable columns={columns} data={PersonEdit?.deal} modelLabel={modelLabel} setOpenModal={setDealTable} />)}

        </>
    );
};

export default DetailsOrganization;
