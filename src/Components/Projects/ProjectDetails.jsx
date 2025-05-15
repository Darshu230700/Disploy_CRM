/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import Sidebar from '../Common/Sidebar'
import Navbar from '../Common/Navbar'
import Footer from '../Common/Footer'
import { MdOutlineKeyboardBackspace, MdOutlineLinkOff } from 'react-icons/md'
import { BiNote, BiSolidLabel, BiSolidUser } from 'react-icons/bi'
import Documents from "../Common/documents";
import Loading from '../Common/Loading'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaAngleDown, FaAngleUp, FaPlus, } from 'react-icons/fa6'
import { IoBusinessSharp } from 'react-icons/io5'
import Note from '../Common/note'
import EmailTabs from '../Common/emailTabs'
import { useDispatch } from 'react-redux'
import { geProjectByID, handleupdateCancel, InsertProject } from '../../Redux/ProjectSlice'
import { Phase, Pipelinestage } from '../Common/Common'
import { BsArrowRight, BsFillFlagFill } from 'react-icons/bs'
import moment from 'moment'
import { AiFillFlag, AiOutlineCloseCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { DeleteHistory, getAllHistory } from '../../Redux/CommonSlice'
import FileUpload from '../Common/fileUpload'
import { CgAttachment } from 'react-icons/cg'
import Select from "react-select";
import { getAllDeals } from '../../Redux/DealSlice'
import { fetchApiData } from '../../Redux/organizationSlice'
import { getAllPerson } from '../../Redux/PersonSlice'
import getUserDetail from '../Common/defaultValue'
import { ImageUrl } from '../Common/API'
import sweetAlert from '../Common/sweetAlert'
import ReactSelect from '../Common/ReactSelect'
import Phases from '../Common/Phases'
import { PiClockClockwiseBold } from 'react-icons/pi'
import CancelModal from './CancelModal'
import toast from 'react-hot-toast'
import { FaUserCircle } from 'react-icons/fa'

export default function ProjectDetails({ isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark, }) {

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userDetails = getUserDetail();

    const getAllVisible = useSelector((state) => state.root.common);
    const Dealstore = useSelector((state) => state.root.Deal);
    const organizationstore = useSelector((state) => state.root.organization);
    const Peoplestore = useSelector((state) => state.root.Person);

    const [loadFirst, setLoadFirst] = useState(true);
    const [loading, setloading] = useState(true);
    const [activeAccordion, setActiveAccordion] = useState("");
    const [activeTab, setActiveTab] = useState('Plan');
    const [EditProjectData, setEditProjectData] = useState([]);
    const [editNoteData, setEditNoteData] = useState([]);
    const [openSelect, setopenSelect] = useState(false)
    const [Error, setError] = useState('');
    const [linkData, setlinkData] = useState('');
    const [link, setlink] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(Array(10).fill(false));
    const [opencanceledModal, setopencanceledModal] = useState(false);
    const [dealID, setdealID] = useState([]);

    const [selectedPhase, setselectedPhase] = useState("Kickoff");
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');
    const handleButtonClick = (message) => { setselectedPhase(message); };
    // const currentIndex = Phase.findIndex(stage => stage.name === selectedPhase);
    const currentIndex = Phase.findIndex(stage => stage.name === EditProjectData?.phase);
    const handleMouseEnter = (name) => { setShowTooltip(true); setTooltipContent(name); };
    const handleMouseLeave = () => { setShowTooltip(false); setTooltipContent(''); };
    console.log('tooltipContent :>> ', tooltipContent);
    useEffect(() => {
        const query = { type: "Project", id: id }
        if (loadFirst) {
            setloading(true)
            EditProject(id)
            dispatch(getAllHistory(query))
            dispatch(getAllDeals({}));
            dispatch(fetchApiData({}));
            dispatch(getAllPerson({}))
                .then(() => {
                    const timer = setTimeout(() => {
                        setloading(false)
                    }, 500);
                    return () => clearTimeout(timer);
                })
            setLoadFirst(false);
        }
    }, [id, loadFirst]);

    useEffect(() => {
        const selectedValues = dealID && dealID?.map((option) => option?.value).join(',');
        setlinkData(selectedValues);
    }, [dealID]);


    const toggleSelect = (item) => {
        setopenSelect(!openSelect)
        setlink(item)
        setlinkData('')
        setError('')
        setdealID([])
    }

    const toggleDropdown = (index) => {
        const newDropdownState = isDropdownOpen.map((_, i) => i === index ? !isDropdownOpen[index] : false);
        setIsDropdownOpen(newDropdownState);
    };

    const toggleAccordion = (accordionId) => {
        setActiveAccordion(accordionId === activeAccordion ? "" : accordionId);
    };

    const handleTabClick = (tab) => { setActiveTab(tab); }

    const EditProject = async (id) => {
        const result = await dispatch(geProjectByID(id));
        setEditProjectData(result.payload.data);
    };

    const deleteNotes = async (item) => {
        try {
            const query = { type: item.type, id: item.id };
            const result = await sweetAlert.confirm(
                "Are you sure?",
                "Are you sure you want to delete this!"
            );
            if (result.isConfirmed) {
                dispatch(DeleteHistory(query));
                sweetAlert.success("Deleted successfully");
                setLoadFirst(true)
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    };

    const handleDownload = async (item) => {
        try {
            const response = await fetch(`${ImageUrl}${item.filePath}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", item.title);
            document.body.appendChild(link);

            link.click();

            // Clean up
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading image:", error);
        }
    };

    const editNotes = async (item) => {
        if (item.type === "notes") {
            setEditNoteData(item)
            setActiveTab('note')
        }
    }

    const updatePhaseStage = async (Phasestage, linkedData) => {
        if (linkedData !== undefined) {
            if (!linkData) {
                setError(`${link} is Required`);
                return;
            }
        }
        const Params = {
            ...EditProjectData,
            phase: Phasestage,
            isArchived: false,
            dealID: link && link === "Deal" ? (EditProjectData.dealID ? EditProjectData.dealID + ',' + linkedData : linkData) : EditProjectData.dealID,
            contactPersonID: link && link === "Person" ? (linkedData ? linkedData.value : EditProjectData.contactPersonID) : EditProjectData.contactPersonID,
            organizationID: link && link === "Organization" ? (linkedData ? linkedData.value : EditProjectData.organizationID) : EditProjectData.organizationID,
        };

        try {
            const res = await dispatch(InsertProject(Params));
            toast.remove()
            if (res.payload.status === true) {
                setLoadFirst(true)
                if (linkedData) {
                    toggleSelect();
                    toast.success(`${link} linked Successfully!`)

                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const extractTasks = (data) => {
        const phases = [
            'phaseunassignedMaster',
            'kickoffMaster',
            'planningMaster',
            'implementationMaster',
            'reviewMaster',
            'closingMaster'
        ];
        let tasks = [];
        phases.forEach(phase => {
            if (data[phase]) {
                data[phase].forEach(item => {
                    tasks.push(item);
                });
            }
        });
        return tasks;
    };

    const tasks = extractTasks(EditProjectData || {});
    const totalTasks = tasks.map((x) => x?.markAsDone).length;
    const completedTasks = tasks.filter(task => task.markAsDone).length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const EditWonLost = async (int, item) => {
        const query = { ProjectID: id, Canceled: int, IsProjectDeleted: item }
        await dispatch(handleupdateCancel(query)).then((res) => {
            setopencanceledModal(false)
            setLoadFirst(true)
        })
    }

    const UnlinkedData = async (id) => {
        try {
            const result = await sweetAlert.confirm('Are you sure you want to unlink this Deal from this Project?', null, 'unlink');

            const dataID = EditProjectData?.dealID.split(',')
            const ID = dataID.filter(x => parseInt(x) !== id).join(',')

            const Payload = {
                ...EditProjectData,
                dealID: ID
            }

            if (result.isConfirmed) {
                dispatch(InsertProject(Payload)).then((res) => {
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
                    <div className="xl:w-full ">
                        <div className="flex flex-wrap">
                            <div className="flex items-center py-4 w-full">
                                <div className="w-full">
                                    <div className="">
                                        <div className="flex flex-wrap justify-between">
                                            <div className="items-center ">
                                                <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                                                    Projects
                                                </h1>
                                                <ol className="list-reset flex text-sm">
                                                    <li>Projects</li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-blue-600 hover:text-blue-700">
                                                        ProjectsDetails
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {loading && <div className='h-screen '><Loading /></div>}

                    <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
                        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">

                            {!loading && !(EditProjectData === null) && (
                                <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
                                    <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                        <div className="flex justify-between  border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                            <div className="flex gap-5 items-center">
                                                <button
                                                    type="button"
                                                    className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200  dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                                    onClick={() => navigate('/Projects')}
                                                >
                                                    <MdOutlineKeyboardBackspace size={20} />
                                                </button>
                                                <h4 className="font-semibold capitalize">
                                                    {EditProjectData?.title}
                                                </h4>
                                            </div>
                                            {!(EditProjectData === null) ? EditProjectData.canceled && EditProjectData.canceled === 3 ? (
                                                <>
                                                    <div className="flex gap-2 items-center">
                                                        <button type="button" className="font-semibold focus:outline-none text-white bg-green-600 border border-gray-200  text-sm py-1 px-3 rounded"
                                                            onClick={() => EditWonLost(1, false)}
                                                        >
                                                            Complete
                                                        </button>
                                                        <button type="button" className="font-semibold focus:outline-none text-white bg-red border border-gray-200  text-sm py-1 px-3 rounded"
                                                            onClick={() => setopencanceledModal(true)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex gap-2 items-center">
                                                    <button type="button" className={`focus:outline-none text-white   text-xs py-1 px-3.5 rounded-full  ${EditProjectData?.canceled === 0 ? 'bg-red' : 'bg-green-600'}`}>
                                                        {EditProjectData?.canceled === 0 ? "Canceled" : "Completed"}
                                                    </button>
                                                    <button type="button" className="font-semibold focus:outline-none text-black border border-gray-200  text-sm py-1 px-3 rounded"
                                                        onClick={() => EditWonLost(3, false)}

                                                    >
                                                        Reopen
                                                    </button>
                                                </div>
                                            ) : ''}
                                        </div>
                                        <div className="flex-auto p-4">
                                            <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                                                <div className="sm:col-span-12  md:col-span-12 lg:col-span-4 xl:col-span-4">
                                                    <div className="bg-white dark:bg-slate-800 shadow  w-full relative">
                                                        <div className="flex-auto">
                                                            <div id="accordion-collapse" data-accordion="collapse" >
                                                                <div className="bg-white dark:bg-slate-800 shadow   w-full relative  p-4">
                                                                    <h2 className=' border-b border-gray-200 p-1 text-lg mb-3 font-semibold '>
                                                                        SideBar
                                                                    </h2>
                                                                    <div className="step-bar-list relative group">
                                                                        <ul id="pipelineList" className="flex items-center justify-between bg-white dark:bg-slate-400 rounded-full overflow-hidden">
                                                                            {Phase.map((stage, index) => (
                                                                                <>
                                                                                    <li
                                                                                        key={index}
                                                                                        className={`${index <= currentIndex ? 'active' : ''} cursor-pointer text-nowrap relative h-6`}
                                                                                        onClick={() => updatePhaseStage(stage?.name)}
                                                                                        onMouseEnter={(e) => handleMouseEnter(stage?.name)}
                                                                                        onMouseLeave={handleMouseLeave}
                                                                                    >
                                                                                    </li>
                                                                                </>
                                                                            ))}
                                                                            {showTooltip && tooltipContent && (
                                                                                <div className={`absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex ${tooltipContent === 'Kickoff' ? 'left-5' : tooltipContent === 'Planning' ? 'left-32' : tooltipContent === 'Implementation' ? 'left-52' : tooltipContent === 'Review' ? 'right-32' : 'right-5'}`}>
                                                                                    <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                                                        {tooltipContent}
                                                                                    </span>
                                                                                    <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                </div>
                                                                            )}

                                                                        </ul>
                                                                        {/* <ul id="pipelineList" className="flex items-center justify-between bg-white dark:bg-slate-400 rounded-full overflow-hidden">
                                                                            {Phase.map((stage, index) => (
                                                                                <li
                                                                                    key={index}
                                                                                    className={`${index <= currentIndex ? 'active' : ''} cursor-default text-xs p-1 `}
                                                                                    onClick={() => updatePhaseStage(stage.name)}
                                                                                >
                                                                                    <span className=' z-50 mx-3 me-5'> {stage?.name} </span>
                                                                                </li>
                                                                            ))}
                                                                        </ul> */}
                                                                    </div>
                                                                    <div className='flex align-middle mt-3 ms-3 gap-4 text-[#0d68c5]'>
                                                                        <h2 className=''>Delivery </h2>
                                                                        <h2 className='mt-1'> <BsArrowRight /></h2>
                                                                        <h2 >{EditProjectData?.phase}</h2>
                                                                    </div>

                                                                    <div className="flex items-center gap-x-3 whitespace-nowrap px-3 mt-2" key={0} >
                                                                        <PiClockClockwiseBold size={20} />
                                                                        <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                                            <div
                                                                                className="flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition-all duration-500"
                                                                                style={{
                                                                                    width: `${progress ? progress : 5}%`,
                                                                                    backgroundColor: '#008000'
                                                                                }}
                                                                            ></div>
                                                                        </div>
                                                                        <div className="w-10 text-end">
                                                                            <span className="text-sm text-gray-800">
                                                                                {`(${completedTasks}/${totalTasks})`}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <button type="button" className="relative inline-flex items-center w-full px-3 py-3 text-sm font-medium  hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                                                        <BiSolidLabel />
                                                                        <span className="text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300" >{EditProjectData?.labelName}</span>
                                                                    </button>
                                                                    <div className='flex gap-4 border-b border-gray-200'>
                                                                        <button type="button" className="relative inline-flex items-center w-full px-3 py-2 text-sm font-medium  hover:bg-gray-100  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                                                            <BsFillFlagFill />
                                                                            <span className="text-black text-sm font-semibold  me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 " >{moment(new Date(EditProjectData?.startDateTime)).format('MMMM D, YYYY ')}</span>
                                                                        </button>
                                                                        <button type="button" className="relative  inline-flex items-center w-full px-3 py-2 text-sm font-medium  hover:bg-gray-100  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                                                            <AiFillFlag />
                                                                            <span className="text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300" >{moment(new Date(EditProjectData?.endDateTime)).format('MMMM D, YYYY ')}</span>
                                                                        </button>
                                                                    </div>

                                                                    <h2 className=' p-1 text-lg  font-semibold mt-3'>
                                                                        Linked to
                                                                    </h2>

                                                                    <div className='flex justify-between items-center'>
                                                                        {EditProjectData?.contactPersonID > 0 ? (
                                                                            <button type="button" className="relative flex items-center w-full gap-4 p-2  hover:bg-gray-100  ">
                                                                                < BiSolidUser size={17} />
                                                                                <Link to={`/detailsPeople/${EditProjectData?.contactPersonID}`} className=" text-black text-sm h-4 capitalize font-semibold hover:border-b border-black">{EditProjectData?.contactPerson}</Link>
                                                                            </button>
                                                                        ) : (
                                                                            <p className='text-center text-gray-500 text-sm  '>Link a Person</p>
                                                                        )}
                                                                        <button
                                                                            type="button"
                                                                            className=" focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                                                            onClick={() => toggleSelect("Person")}
                                                                        >
                                                                            <FaPlus />
                                                                        </button>
                                                                    </div>
                                                                    <div className='flex justify-between items-center'>
                                                                        {EditProjectData?.organizationID > 0 ? (
                                                                            <button type="button" className="relative flex items-center w-full gap-4 p-2  hover:bg-gray-100  ">
                                                                                < IoBusinessSharp size={17} />
                                                                                <Link to={`/detailsOrganization/${EditProjectData?.organizationID}`} className=" text-black text-sm h-4 capitalize font-semibold hover:border-b border-black">{EditProjectData?.organizationName}</Link>
                                                                            </button>
                                                                        ) : (
                                                                            <p className='text-center my-2  text-gray-500 text-sm '>Link a Organization</p>
                                                                        )}
                                                                        <button
                                                                            type="button"
                                                                            className=" focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                                                            onClick={() => toggleSelect("Organization")}
                                                                        >
                                                                            <FaPlus />
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <h2 id="accordion-collapse-heading-4">
                                                                        <button
                                                                            type="button"
                                                                            className={`text-lg  font-semibold flex gap-4 items-center px-5 py-2 w-full font-medium text-left  border border-gray-200  border-b-0  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                "accordion-collapse-body-4"
                                                                                ? "active bg-slate-100"
                                                                                : ""
                                                                                }`}
                                                                            data-accordion-target="#accordion-collapse-body-4"
                                                                            aria-expanded={
                                                                                activeAccordion ===
                                                                                "accordion-collapse-body-4"
                                                                            }
                                                                            aria-controls="accordion-collapse-body-4"
                                                                            onClick={() => toggleAccordion("accordion-collapse-body-4")}
                                                                        >
                                                                            <span>Details</span>
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
                                                                        className={`px-3 border border-t-0 border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-4" ? "block" : "hidden"}`}
                                                                        aria-labelledby="accordion-collapse-heading-4"
                                                                    >
                                                                        <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white  dark:focus:text-white">
                                                                            <span className=' text-black font-semibold  '>Description </span>
                                                                            <p className=" text-start text-gray-500 text-sm  ms-3 px-2.5 py-0.5 rounde hover:bg-gray-100 ">{EditProjectData?.description}</p>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <h2 id="accordion-collapse-heading-5">
                                                                        <button
                                                                            type="button"
                                                                            className={`text-lg  font-semibold flex justify-between items-center px-5 py-2 w-full font-medium text-left  border border-gray-200  border-b-0  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20  ${activeAccordion ===
                                                                                "accordion-collapse-body-5" ? "active bg-slate-100" : ""}`}
                                                                            data-accordion-target="#accordion-collapse-body-5"
                                                                            aria-expanded={activeAccordion === "accordion-collapse-body-5"}
                                                                            aria-controls="accordion-collapse-body-5"
                                                                        >
                                                                            <div className='flex items-center gap-5'
                                                                                onClick={() => toggleAccordion("accordion-collapse-body-5")}
                                                                            >
                                                                                <span>Deal</span>
                                                                                {activeAccordion !== "accordion-collapse-body-5" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                                                            </div>
                                                                            <button
                                                                                type="button"
                                                                                className=" focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                                                                onClick={() => toggleSelect('Deal')}
                                                                            >
                                                                                <FaPlus />
                                                                            </button>
                                                                        </button>
                                                                    </h2>

                                                                    <div id="accordion-collapse-body-5" className={`px-3 border border-t-0 border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-5" ? "block" : "hidden"}`}
                                                                        aria-labelledby="accordion-collapse-heading-5"
                                                                    >
                                                                        <div className='flex justify-between items-center py-3'>
                                                                            <div className='w-full'>
                                                                                {EditProjectData?.deal?.length > 0 ? (
                                                                                    EditProjectData?.deal.map((item, index) => (
                                                                                        <div className="bg-white dark:bg-slate-800 shadow  rounded-md  relative m-3" key={index} >
                                                                                            <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-2 px-4 dark:text-slate-300/70">
                                                                                                <div className="font-semibold capitalize cursor-pointer" >
                                                                                                    <div className="flex justify-between items-center ">
                                                                                                        <Link to={`/deal/${item?.dealID}`} className='hover:border-b border-b-neutral-950 h-5'>{item?.title}</Link>
                                                                                                        <div
                                                                                                            data-tip
                                                                                                            data-for="Edit"
                                                                                                            className="relative  group cursor-pointer "
                                                                                                            onClick={() => UnlinkedData(item?.dealID, 'Deal')}
                                                                                                        >
                                                                                                            <MdOutlineLinkOff size={18} />
                                                                                                            <div class="absolute bottom-0 right-0 left-0 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                                                <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                                                                                    Unlink Deal
                                                                                                                </span>
                                                                                                                <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <p className="text-gray-900 text-sm flex gap-2 items-center my-1">
                                                                                                        <FaUserCircle /><small>{`${item?.currencyCode !== null ? item?.currencyCode : ''} ${item?.value}`}</small>
                                                                                                    </p>
                                                                                                    <div>
                                                                                                        <ul id="pipelineList" className="flex items-center justify-between bg-white dark:bg-slate-400 rounded-full overflow-hidden">
                                                                                                            {Pipelinestage.map((stage, index) => {
                                                                                                                const currentIndex = Pipelinestage.findIndex(stage => stage === item?.pipelineStage)
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
                                                                                    <p className=" text-gray-500 dark:text-gray-400 text-center">No deals linked to this project</p>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <h2 id="accordion-collapse-heading-7">
                                                                        <button
                                                                            type="button"
                                                                            className={`text-lg  font-semibold flex gap-4 items-center px-5 py-2 w-full font-medium text-left border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                "accordion-collapse-body-7"
                                                                                ? "active bg-slate-100"
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
                                                                        className={`p-4 border border-b border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                                                            "accordion-collapse-body-7"
                                                                            ? "block"
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
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-12  md:col-span-12 lg:col-span-8 xl:col-span-8">
                                                    <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3">
                                                        <div className=" border-gray-200 dark:border-gray-700">
                                                            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                                                <li className="me-2">
                                                                    <button
                                                                        onClick={() => handleTabClick('Plan')}
                                                                        className={`inline-flex items-center justify-center px-4 py-2 border-b-2 ${activeTab === 'Plan'
                                                                            ? 'border-transparent rounded-t-lg hover:text-gray-600 hover:border-blue-600 dark:hover:text-gray-300 group bg-blue-600 text-white hover:text-white'
                                                                            : 'border-blue-600'
                                                                            }`}
                                                                    >
                                                                        Plan
                                                                    </button>
                                                                </li>
                                                                <li className="me-2">
                                                                    <button
                                                                        onClick={() => handleTabClick('note')}
                                                                        className={`inline-flex items-center justify-center px-4 py-2 border-b-2 ${activeTab === 'note'
                                                                            ? 'border-transparent rounded-t-lg hover:text-gray-600 hover:border-blue-600 dark:hover:text-gray-300 group bg-blue-600 text-white hover:text-white'
                                                                            : 'border-blue-600'
                                                                            }`}
                                                                    >
                                                                        Note
                                                                    </button>
                                                                </li>
                                                                <li className="me-2">
                                                                    <button
                                                                        onClick={() => handleTabClick('email')}
                                                                        className={`inline-flex items-center justify-center px-4 py-2 border-b-2 ${activeTab === 'email'
                                                                            ? 'border-transparent rounded-t-lg hover:text-gray-600 hover:border-blue-600 dark:hover:text-gray-300 group bg-blue-600 text-white hover:text-white'
                                                                            : 'border-blue-600'
                                                                            }`}
                                                                    >
                                                                        Email
                                                                    </button>
                                                                </li>
                                                                <li className="me-2">
                                                                    <button
                                                                        onClick={() => handleTabClick('files')}
                                                                        className={`inline-flex items-center justify-center px-4 py-2 border-b-2 ${activeTab === 'files'
                                                                            ? 'border-transparent rounded-t-lg hover:text-gray-600 hover:border-blue-600 dark:hover:text-gray-300 group bg-blue-600 text-white hover:text-white'
                                                                            : 'border-blue-600'
                                                                            }`}
                                                                    >
                                                                        Files
                                                                    </button>
                                                                </li>

                                                                <li className="me-2">
                                                                    <button
                                                                        onClick={() => handleTabClick('documents')}
                                                                        className={`inline-flex items-center justify-center px-4 py-2 border-b-2 ${activeTab === 'documents'
                                                                            ? 'border-transparent rounded-t-lg hover:text-gray-600 hover:border-blue-600 dark:hover:text-gray-300 group bg-blue-600 text-white hover:text-white'
                                                                            : 'border-blue-600'
                                                                            }`}
                                                                    >
                                                                        Documents
                                                                    </button>
                                                                </li>

                                                            </ul>
                                                            <hr className="mb-5" />
                                                            {activeTab === 'Plan' && <Phases ProjectId={id} EditProjectData={EditProjectData} setLoadFirst={setLoadFirst} />}
                                                            {activeTab === 'note' &&
                                                                <>
                                                                    <Note setEditNoteData={setEditNoteData} editNoteData={editNoteData} identityID={id} identityName="Project" setLoadFirst={setLoadFirst} />
                                                                    <div className='mt-5'>
                                                                        {getAllVisible && getAllVisible.getHistory?.length > 0 && getAllVisible.getHistory?.map((item, index) => (
                                                                            item && item?.type === "notes" && (
                                                                                <>
                                                                                    <ol class="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                                                                        <li class="mb-10 ms-6">
                                                                                            <span class="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                                                                                                {item.type === "Document" ? <CgAttachment /> : <BiNote />}
                                                                                            </span>
                                                                                            <div className='flex items-center gap-3'>
                                                                                                <div className=" dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3 flex justify-between" >
                                                                                                    <div>
                                                                                                        <div className="text-sm text-black capitalize truncate-multi-line" key={index} dangerouslySetInnerHTML={{ __html: item?.title }} />

                                                                                                        {/* <div className='font-semibold text-black capitalize' key={index} dangerouslySetInnerHTML={{ __html: item?.title }} /> */}
                                                                                                        <small className="font-semibold text-black" >{moment(item?.updatedDate ? item?.updatedDate : item?.createdDate).format('MMMM Do YYYY : h:mm:ss a')}</small>
                                                                                                    </div>
                                                                                                    <button
                                                                                                        id={`dropdownMenuIconButton${index}`}
                                                                                                        onClick={() =>
                                                                                                            toggleDropdown(index)
                                                                                                        }
                                                                                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                                                                        type="button"
                                                                                                    >
                                                                                                        <svg
                                                                                                            className="w-5 h-5"
                                                                                                            aria-hidden="true"
                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                            fill="currentColor"
                                                                                                            viewBox="0 0 4 15"
                                                                                                        >
                                                                                                            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                                                                                        </svg>
                                                                                                    </button>
                                                                                                    {isDropdownOpen[index] && (
                                                                                                        <div
                                                                                                            id={`dropdownDots${index}`}
                                                                                                            className="border absolute z-10 bg-white right-3 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 top-12"
                                                                                                        >
                                                                                                            <ul
                                                                                                                className=" text-right text-black overflow-hidden"
                                                                                                                aria-labelledby={`dropdownMenuIconButton${index}`}
                                                                                                            >
                                                                                                                {(item?.type === "notes" ||
                                                                                                                    item?.type === "activity") && (
                                                                                                                        <li>
                                                                                                                            <a
                                                                                                                                href="#"
                                                                                                                                className="block px-3 py-1 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-950 dark:hover:text-white"
                                                                                                                                onClick={() => {
                                                                                                                                    editNotes(item)
                                                                                                                                    toggleDropdown(index, true);
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                Edit
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                    )}
                                                                                                                <li>
                                                                                                                    <a
                                                                                                                        href="#"
                                                                                                                        className="block px-3 py-1 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-950 dark:hover:text-white"
                                                                                                                        onClick={() => {
                                                                                                                            toggleDropdown(index, true);
                                                                                                                            deleteNotes(item)
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        Delete
                                                                                                                    </a>
                                                                                                                </li>
                                                                                                            </ul>
                                                                                                        </div>
                                                                                                    )}
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                    </ol>
                                                                                </>
                                                                            )
                                                                        ))}
                                                                    </div>
                                                                </>
                                                            }
                                                            {activeTab === 'email' && <EmailTabs />}
                                                            {activeTab === 'files' && <FileUpload identityID={id} identityName="Project" getAllVisible={getAllVisible} setLoadFirst={setLoadFirst} deleteHistory={deleteNotes} handleDownload={handleDownload} />}
                                                            {activeTab === 'documents' && <Documents identityID={id} identityName="Project" setLoadFirst={setLoadFirst} getAllVisible={getAllVisible} deleteHistory={deleteNotes} handleDownload={handleDownload} />}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Footer />
                    </div>
                </div >
            </div >

            {openSelect && (
                <>
                    <div
                        id="default-modal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
                    >
                        <div className="relative p-4 w-full max-w-md max-h-md">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-5 md:p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white ">
                                        {` Link An ${link}`}
                                    </h3>
                                    <AiOutlineCloseCircle
                                        className="text-3xl text-primary cursor-pointer"
                                        onClick={() => {
                                            toggleSelect();
                                        }}
                                    />
                                </div>
                                <div className='p-5'>
                                    <div className="sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8">
                                        <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
                                            <div className="mb-5">
                                                {link === "Person" && (
                                                    <ReactSelect
                                                        selectedValue={linkData}
                                                        options={
                                                            Peoplestore && Peoplestore?.getAllPerson?.length > 0
                                                                ? Peoplestore.getAllPerson.map((item) => ({
                                                                    value: item?.personMasterID ?? "",
                                                                    label: item?.name,
                                                                    isDisabled: EditProjectData?.contactPersonID === item?.personMasterID
                                                                }))
                                                                : [{ value: "", label: "Not Found" }]
                                                        }
                                                        handleSelectChange={(option) => setlinkData(option)}
                                                    />
                                                )}
                                                {link === "Organization" && (
                                                    <ReactSelect
                                                        selectedValue={linkData}
                                                        options={
                                                            organizationstore &&
                                                                organizationstore?.organizationData?.data?.length > 0
                                                                ? organizationstore?.organizationData?.data.map(
                                                                    (item) => ({
                                                                        value: item?.organizationID ?? "",
                                                                        label: item?.organizationName,
                                                                        isDisabled: EditProjectData?.organizationID === item?.organizationID
                                                                    })
                                                                )
                                                                : [{ value: "", label: "Not Found" }]
                                                        }
                                                        handleSelectChange={(option) => setlinkData(option)}
                                                    />
                                                )}
                                                {link === "Deal" && (
                                                    <>
                                                        <Select
                                                            value={dealID}
                                                            isMulti
                                                            name="Participants"
                                                            options={
                                                                Dealstore && Dealstore?.getDeals?.length > 0
                                                                    ? Dealstore.getDeals.map((item) => ({
                                                                        value: item.dealID,
                                                                        label: item.title,
                                                                        isDisabled: EditProjectData?.deal?.some(
                                                                            x => x?.dealID === item?.dealID
                                                                        ),
                                                                    }))
                                                                    : [{ value: "", label: "Not Found" }]
                                                            }
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            onChange={setdealID}
                                                        />
                                                    </>
                                                )}
                                                {linkData && linkData?.label?.length > 0 ? "" : Error && (
                                                    <div className='error text-red-600 text-base font-bold'>{Error}</div>
                                                )}
                                            </div>
                                            <div className="flex justify-end shrink-0 p-3 rounded-b border-gray-300 bg-[#f5f5f6]">
                                                <button type="button"
                                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                                    onClick={() => toggleSelect()}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="inline-block focus:outline-none font-semibold text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                                    onClick={() => {
                                                        updatePhaseStage(EditProjectData?.phase, linkData)
                                                    }}
                                                >
                                                    {` Link this ${link}`}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {opencanceledModal && (<CancelModal setopencanceledModal={setopencanceledModal} EditWonLost={EditWonLost} />)}
        </>
    )
}
