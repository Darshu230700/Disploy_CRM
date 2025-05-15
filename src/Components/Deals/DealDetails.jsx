/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaAddressCard, FaAngleDown, FaAngleUp, FaBuilding, FaCircleUser, FaPlus, FaRegFlag } from "react-icons/fa6";
import { IoAddCircle, IoBusinessSharp } from "react-icons/io5";
import moment from "moment";
import { getAllHistory, } from "../../Redux/CommonSlice";
import { MdCameraRoll, MdDeleteForever, MdEmail, MdOutlineCancel, MdOutlineEdit, MdOutlineKeyboardBackspace, MdOutlineLinkOff } from "react-icons/md";
import { BiDotsVerticalRounded, BiEdit, BiSolidLabel } from "react-icons/bi";
import { FiPhone } from "react-icons/fi";
import { deletePayment, deleteSubscription, getDealByID, getDealPayment, getDealProductById, getDealsubScription, handleAddDeal, handleupdateWonLost } from "../../Redux/DealSlice";
import { Phase, Pipelinestage } from "../Common/Common";
import toast from "react-hot-toast";
import Loading from "../Common/Loading";
import getUserDetail from "../Common/defaultValue";
import { fetchApiData } from "../../Redux/organizationSlice";
import { getAllPerson } from "../../Redux/PersonSlice";
import { getProject } from "../../Redux/ProjectSlice";
import sweetAlert from "../Common/sweetAlert";
import AddLeads from "../Leads/AddLeads";
import AddSubscription from "./AddSubscription";
import CancelSubscriptionModal from "./CancelSubscriptionModal";
import PaymentList from "./PaymentList";
import AddPaymentPlan from "./AddPaymentPlan";
import AddDealProducts from "./AddDealProducts";
import AddFields from "../Common/AddFields";
import Partcipants from "../Products/Partcipants";
import { BsFillFlagFill, BsPerson } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getFiledByID, getGroupFiledByID, handledeleteFiled, handledeleteGroupFiled } from "../../Redux/CustomizeFieldSlice";
import AddGroupField from "../Common/AddGroupField";
import LinkDeals from "./LinkDeals";
import HistoryView from "../Common/HistoryView";
import AddLostReason from "../Common/AddLostReason";
import { AiFillFlag } from "react-icons/ai";
import AddProject from "../Projects/AddProject";

const DealDetails = ({
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
    const organizationstore = useSelector((state) => state.root.organization);
    const Projectstore = useSelector((state) => state.root.Project);
    const Peoplestore = useSelector((state) => state.root.Person);

    const [loadFirst, setLoadFirst] = useState(true);
    const [activeAccordion, setActiveAccordion] = useState("");
    const [activegrouptoggle, setActivegrouptoggle] = useState("");
    const [Deal, setDeal] = useState([]);
    const [loading, setloading] = useState(true);
    const [openSelect, setopenSelect] = useState(false)
    const [link, setlink] = useState('');
    const [linkData, setlinkData] = useState('');
    const [Error, setError] = useState('');
    const [openModel, setOpenModel] = useState(false);
    const [SubscriptionModal, setSubscriptionModal] = useState(false);
    const [PaymentModal, setPaymentModal] = useState(false);
    const [PlanName, setPlanName] = useState('');
    const [EditSubscription, setEditSubscription] = useState([]);
    const [CancelModal, setCancelModal] = useState(false);
    const [subScriptionId, setsubScriptionId] = useState('');
    const [openGroupModal, setopenGroupModal] = useState(false);
    const [GroupField, setGroupField] = useState([]);
    const [DealProductModal, setDealProductModal] = useState(false);
    const [EditDealtoProduct, setEditDealtoProduct] = useState([]);
    const [openFields, setopenFields] = useState(false);
    const [openParticipants, setopenParticipants] = useState(false);
    const [EditcustomField, setEditcustomField] = useState([]);
    const [activeCustomField, setactiveCustomField] = useState('');
    const [openReasonModal, setopenReasonModal] = useState(false);
    const [ProjectModal, setProjectModal] = useState(false);
    const [ParticipantsName, setParticipantsName] = useState('');

    useEffect(() => {
        const query = { type: "Deal", id: id }
        if (loadFirst) {
            setloading(true)
            fetchDeal(id)
            dispatch(getAllPerson({}));
            dispatch(getAllHistory(query))
            dispatch(fetchApiData({}));
            dispatch(getProject())
                .then((res) => {
                    const timer = setTimeout(() => {
                        setloading(false);
                    }, 1000);
                    return () => clearTimeout(timer);
                })
            setLoadFirst(false);
        }
    }, [dispatch, id, loadFirst]);

    const toggleAccordion = (accordionId) => { setActiveAccordion(accordionId === activeAccordion ? "" : accordionId); };
    const toggleGroupName = (id) => { setActivegrouptoggle(id === activegrouptoggle ? "" : id); };
    const toggleCustomField = (id) => { setactiveCustomField(id === activeCustomField ? "" : id); };
    const toggleModal = () => { setopenParticipants(!openParticipants); setLoadFirst(true) };
    const toggleModalProject = () => { setProjectModal(!ProjectModal); };


    const toggleSelect = (item) => {
        setopenSelect(!openSelect)
        setlink(item)
        setlinkData('')
        setError('')
    }

    const togglemodelLead = () => { setOpenModel(!openModel); }

    const personIDs = Deal?.personMasterID ? Deal.personMasterID.split(',').map(item => parseInt(item.replace(',', ''), 10)) : [];
    const personNames = Deal?.personMasterName ? Deal.personMasterName.split(',') : [];

    const fetchDeal = async (id) => {
        try {
            const result = await dispatch(getDealByID(id))
            if (result) { setDeal(result?.payload?.data) }
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    const currentIndex = Pipelinestage.findIndex(stage => stage === Deal?.pipelineStage);

    const updatePipelineStage = (pipelineStage, linkedData) => {
        if (linkedData !== undefined) {
            if (linkData === "") {
                setError('Select is required');
                return;
            }
        }
        setloading(true);
        let Params = {
            ...Deal,
            organizationID: link && link === "Organization" ? (linkedData ? linkedData.value : Deal?.organizationID) : Deal?.organizationID,
            pipelineStage: pipelineStage,
            projectID: link && link === "Project" ? (Deal?.projectID ? Deal?.projectID + ',' + linkedData.value : linkedData.value) : Deal.projectID,
            peopleID: link && link === "Person" ? (linkedData ? linkedData.value : Deal?.peopleID) : Deal.peopleID,
        };

        try {
            dispatch(handleAddDeal(Params)).then((res) => {
                if (res?.payload?.status === true) {
                    toast.remove()
                    setLoadFirst(true)
                    if (linkedData) {
                        toggleSelect();
                        toast.success(`${link} linked Successfully!`)
                    }
                }
            });
        } catch (error) {
            toast.remove();
        }
    }

    const handlerEditSubscription = async (id) => {
        await dispatch(getDealsubScription(id)).then((res) => {
            setEditSubscription(res?.payload?.data)
            setSubscriptionModal(true);
            setPlanName('subscription')
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }

    const handlerEditPaymentPlan = async (id) => {
        await dispatch(getDealPayment(id)).then((res) => {
            setEditSubscription(res?.payload?.data)
            setPaymentModal(true);
            setPlanName('payment')
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }

    const handleDeleteSubscription = async (id) => {
        try {
            const result = await sweetAlert.confirm(
                "Are you sure?",
                "You won't be able to revert this!"
            );

            if (result.isConfirmed) {
                await dispatch(deleteSubscription(id)).then((res) => {
                    if (res.payload.status === true) {
                        setLoadFirst(true);
                    }
                });
                sweetAlert.success("Deleted successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    };

    const handleDeletePayment = async (id) => {
        try {
            const result = await sweetAlert.confirm("Are you sure?", "You won't be able to revert this!");

            if (result.isConfirmed) {
                await dispatch(deletePayment(id)).then((res) => {
                    if (res.payload.status === true) {
                        setLoadFirst(true);
                    }
                });
                sweetAlert.success("Deleted successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    };

    const handlerEditDealProduct = async (id) => {

        await dispatch(getDealProductById(id)).then((res) => {
            setEditDealtoProduct(res?.payload?.data)
            setDealProductModal(true);
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }

    const EditGroupField = (item) => {
        dispatch(getGroupFiledByID(item)).then((res) => {
            setGroupField(res?.payload?.data)
            setopenGroupModal(true)
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }

    const EditCustomField = (item) => {
        dispatch(getFiledByID(item?.customizeFieldID)).then((res) => {
            setEditcustomField(res?.payload?.data)
            setopenFields(true)
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }

    const DeleteGroupField = async (item) => {
        try {
            const result = await sweetAlert.confirm(`Are you sure you want to delete field group  ?`,
                "The fields in this group won’t be deleted and will be displayed as ungrouped.");

            if (result?.isConfirmed) {
                await dispatch(handledeleteGroupFiled(item)).then((res) => {
                    if (res.payload.status === true) {
                        setLoadFirst(true)
                    }
                });
                sweetAlert.success("Deleted successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    };

    const handleDeletefiled = async (item) => {
        try {
            const result = await sweetAlert.confirm(`Are you sure you want to delete this field?`,
                "You won't be able to revert this!");

            if (result?.isConfirmed) {
                await dispatch(handledeleteFiled(item?.customizeFieldID)).then((res) => {
                    if (res.payload.status === true) {
                        setLoadFirst(true)
                    }
                });
                sweetAlert.success("Deleted successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    };

    const groupedData = (Deal?.customizeFieldMaster || []).reduce((acc, item) => {
        const groupId = item.groupID;
        if (!acc[groupId]) {
            acc[groupId] = [];
        }
        acc[groupId].push(item);

        return acc;
    }, {});

    const EditWonLost = async (item) => {
        const query = { DealID: id, IsWon: item }
        await dispatch(handleupdateWonLost(query)).then((res) => {

            setLoadFirst(true)
        })
    }

    const UnlinkedData = async (id, type) => {
        try {
            const result = await sweetAlert.confirm(`Are you sure you want to unlink this ${type} from this Deal?`, null, 'unlink');

            const dataID = type === 'Project' && Deal?.projectID?.split(',')
            const ID = dataID ? dataID?.filter(x => parseInt(x) !== id).join(',') : ''

            const Payload = {
                ...Deal,
                projectID: type === 'Project' ? ID : Deal?.projectID,
                organizationID: type === 'Organization' ? 0 : Deal?.organizationID,
                peopleID: type === 'Person' ? 0 : Deal?.peopleID
            }

            if (result.isConfirmed) {
                dispatch(handleAddDeal(Payload)).then((res) => {
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
                                                    Deals
                                                </h1>
                                                <ol className="list-reset flex text-sm">
                                                    <li>Deals</li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-blue-600 hover:text-blue-700">
                                                        DetailsDeals
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {loading && <div className="flex justify-center items-center min-h-screen overscroll-auto ">
                        <Loading />
                    </div>}
                    <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
                        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                            {!loading && (
                                <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
                                    <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative mb-5 p-4">
                                        <div className="step-bar-list">
                                            <ul id="pipelineList" className="flex items-center justify-between bg-white dark:bg-slate-400 rounded-full overflow-hidden">
                                                {Pipelinestage.map((stage, index) => (
                                                    <li
                                                        key={index}
                                                        className={`${index <= currentIndex ? (Deal?.isWon === 1 ? "active1" : Deal?.isWon === 0 ? "active0" : "active ") : ""} cursor-default`} style={{}}
                                                        onClick={() => updatePipelineStage(stage)}
                                                    >
                                                        {stage}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                        <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                            <div className="flex gap-5 items-center">
                                                <button
                                                    type="submit"
                                                    className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200  dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                                    onClick={() => navigate('/Deals')}
                                                >
                                                    <MdOutlineKeyboardBackspace size={20} />
                                                </button>
                                                <h4 className="font-semibold capitalize">
                                                    {Deal?.title}
                                                </h4>
                                            </div>
                                            {!(Deal === null) ? Deal.isWon && Deal.isWon === 3 ? (
                                                <>
                                                    <div className="flex gap-2 items-center">
                                                        <button type="button" className="font-semibold focus:outline-none text-white bg-green-600 border border-gray-200  text-sm py-1 px-3 rounded"
                                                            onClick={() => EditWonLost(1)}
                                                        >
                                                            Won
                                                        </button>
                                                        <button type="button" className="font-semibold focus:outline-none text-white bg-red border border-gray-200  text-sm py-1 px-3 rounded"
                                                            onClick={() => setopenReasonModal(true)}
                                                        >
                                                            Lost
                                                        </button>

                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex gap-2 items-center">
                                                    <button type="button" className={`focus:outline-none text-white   text-xs py-1 px-3.5 rounded-full ${Deal?.isWon && Deal?.isWon === 1 ? 'bg-green-600 ' : 'bg-red'}`}>
                                                        {Deal?.isWon === 0 ? "LOST" : "WON"}
                                                    </button>
                                                    <button type="button" className="font-semibold focus:outline-none text-black border border-gray-200  text-sm py-1 px-3 rounded"
                                                        onClick={() => EditWonLost(3)}
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
                                                            <div
                                                                id="accordion-collapse"
                                                                data-accordion="collapse"
                                                            >
                                                                {/* Summary*/}
                                                                <div>
                                                                    <h2 id="accordion-collapse-heading-1">
                                                                        <button
                                                                            type="button"
                                                                            className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 rounded border border-b-0 border-gray-200 dark:border-slate-700 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                "accordion-collapse-body-1" ? "active bg-slate-100" : ""}`}
                                                                            data-accordion-target="#accordion-collapse-body-1"
                                                                            aria-expanded={activeAccordion === "accordion-collapse-body-1"}
                                                                            aria-controls="accordion-collapse-body-1"
                                                                            onClick={() =>
                                                                                toggleAccordion("accordion-collapse-body-1")
                                                                            }
                                                                        >
                                                                            <span>Summary</span>
                                                                            {activeAccordion !== "accordion-collapse-body-1" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                                                        </button>
                                                                    </h2>
                                                                    <div
                                                                        id="accordion-collapse-body-1"
                                                                        className={`border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-1" ? "block" : "hidden"}`}
                                                                        aria-labelledby="accordion-collapse-heading-1"
                                                                    >
                                                                        <div className="w-full text-gray-900 bg-white  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                                            <button type="button" className="relative gap-2 flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                                                                <BiSolidLabel />
                                                                                <span className="text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300" style={{ backgroundColor: Deal?.colorCode }}>{Deal?.labelName}</span>
                                                                            </button>
                                                                            <button type="button" className="relative gap-2 flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                                                                <MdCameraRoll />
                                                                                <span className=" text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde">{Deal?.currencyCode !== null ? Deal?.currencyCode : ''} {Deal?.value}</span>
                                                                            </button>
                                                                            <button type="button" className="relative gap-2 flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                                                                <FaRegFlag />
                                                                                <span className=" text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde">{moment(Deal?.expectedCloseDate).format('MMMM Do YYYY')}</span>
                                                                            </button>
                                                                            <button type="button" className="relative gap-2 flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                                                                <FaCircleUser />
                                                                                <span className=" text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde">{Deal?.person?.name}</span>
                                                                            </button>
                                                                            <button type="button" className="relative gap-2 flex items-center w-full px-4 py-2 text-sm font-medium hover:bg-gray-100  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                                                                < IoBusinessSharp />
                                                                                <span className=" text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde">{Deal?.organization?.organizationName}</span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Source*/}
                                                                <div>
                                                                    <h2 id="accordion-collapse-heading-1">
                                                                        <button
                                                                            type="button"
                                                                            className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500  border border-b-0 border-gray-200 dark:border-slate-700 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                "accordion-collapse-body-11" ? "active bg-slate-100" : ""}`}
                                                                            data-accordion-target="#accordion-collapse-body-11"
                                                                            aria-expanded={activeAccordion === "accordion-collapse-body-11"}
                                                                            aria-controls="accordion-collapse-body-11"
                                                                            onClick={() =>
                                                                                toggleAccordion("accordion-collapse-body-11")
                                                                            }
                                                                        >
                                                                            <span>Source</span>
                                                                            {activeAccordion !== "accordion-collapse-body-11" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                                                        </button>
                                                                    </h2>
                                                                    <div
                                                                        id="accordion-collapse-body-11"
                                                                        className={`border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-11" ? "block" : "hidden"}`}
                                                                        aria-labelledby="accordion-collapse-heading-11"
                                                                    >
                                                                        <div className="w-full text-gray-900 bg-white  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                                            <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-bold  hover:bg-gray-100  text-gray-500">
                                                                                Source origin :
                                                                                <span className="text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300" >{Deal?.sourceType}</span>
                                                                            </button>
                                                                            <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-bold  hover:bg-gray-100 text-gray-500">
                                                                                Source channel :
                                                                                <span className=" text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde">{Deal?.sourceChannel}</span>
                                                                            </button>
                                                                            <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-bold hover:bg-gray-100 text-gray-500">
                                                                                Source channel ID :
                                                                                <span className=" text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde">{Deal?.sourceChannelID}</span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Organizations*/}
                                                                <div>
                                                                    <h2 id="accordion-collapse-heading-4">
                                                                        <button
                                                                            type="button"
                                                                            className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                "accordion-collapse-body-4" ? "active  bg-slate-100" : ""}`}
                                                                            data-accordion-target="#accordion-collapse-body-4"
                                                                            aria-expanded={activeAccordion === "accordion-collapse-body-4"}
                                                                            aria-controls="accordion-collapse-body-4"
                                                                            onClick={() => toggleAccordion("accordion-collapse-body-4")}
                                                                        >
                                                                            <span> Organization</span>
                                                                            {activeAccordion !== "accordion-collapse-body-4" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                                                        </button>
                                                                    </h2>
                                                                    <div
                                                                        id="accordion-collapse-body-4"
                                                                        className={`border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-4" ? "block" : "hidden"}`}
                                                                        aria-labelledby="accordion-collapse-heading-4"
                                                                    >
                                                                        {!(Deal?.organization === null) ? (
                                                                            <div className="w-full text-gray-900 bg-white border-b  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                                                <button type="button" className="relative flex gap-6 items-center w-full px-4 py-1.5 text-sm font-medium  hover:bg-gray-100 ">
                                                                                    <FaBuilding size={15} />
                                                                                    <Link to={`/detailsOrganization/${Deal?.organization?.organizationID}`} className="text-gray-500 text-sm capitalize font-semibold  h-5 hover:border-b border-black" >{Deal?.organization?.organizationName}</Link>
                                                                                </button>
                                                                                <button type="button" className="relative flex gap-6 items-center w-full px-4 py-1.5 text-sm font-medium  hover:bg-gray-100">
                                                                                    <BiSolidLabel size={15} />
                                                                                    <span className="text-black text-xs font-semibold px-1.5 py-1 uppercase rounded" style={{ backgroundColor: Deal?.organization?.color }}>{Deal?.organization?.labelName}</span>
                                                                                </button>
                                                                                <button type="button" className="relative flex gap-1 items-center w-full px-4 py-1.5 text-sm font-medium  hover:bg-gray-100">
                                                                                    <div> <FaAddressCard size={17} /></div>
                                                                                    <p className="text-gray-500 text-left text-sm font-semibold me-2 px-2 py-0.5   ms-4 " >{Deal?.organization?.address}</p>
                                                                                </button>
                                                                            </div>
                                                                        ) : (<p className="text-center border-b p-3">No organization is linked to this deal.</p>)}
                                                                        <div className="flex justify-end me-3">
                                                                            <button
                                                                                type="submit"
                                                                                className="ms-3 flex gap-3 items-center font-semibold my-2 rounded-full focus:outline-none text-black hover:bg-SlateBlue hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray dark:hover:bg-primary text-sm py-1 px-3 "
                                                                                onClick={() => toggleSelect("Organization")}
                                                                            > <FaPlus /><span className='text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde'>Link an Organization</span>
                                                                            </button>
                                                                            {Deal?.organization !== null && (
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
                                                                {/* People*/}
                                                                <div>
                                                                    <h2 id="accordion-collapse-heading-5">
                                                                        <button
                                                                            type="button"
                                                                            className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                "accordion-collapse-body-5" ? "active bg-slate-100" : ""}`}
                                                                            data-accordion-target="#accordion-collapse-body-5"
                                                                            aria-expanded={activeAccordion === "accordion-collapse-body-5"}
                                                                            aria-controls="accordion-collapse-body-5"
                                                                            onClick={() => toggleAccordion("accordion-collapse-body-5")}
                                                                        >
                                                                            <span>People</span>
                                                                            {activeAccordion !== "accordion-collapse-body-5" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                                                        </button>
                                                                    </h2>
                                                                    <div id="accordion-collapse-body-5" className={`border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-5" ? "block" : "hidden"}`}
                                                                        aria-labelledby="accordion-collapse-heading-5"
                                                                    >
                                                                        {!(Deal?.person === null) ? (
                                                                            <div className="w-full border-b text-gray-900 bg-white  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                                                <button type="button" onClick={() => navigate(`/detailsPeople/${Deal?.person?.personMasterID}`)} className="flex items-center gap-6 w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100">
                                                                                    <FaCircleUser size={15} />
                                                                                    <Link to={`/detailsPeople/${Deal?.person?.personMasterID}`} className=" text-blue-500  text-sm font-semibold capitalize h-5 hover:border-b border-blue-500">{Deal?.person?.name}</Link>
                                                                                </button>
                                                                                <button type="button" className="flex items-center gap-6 w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100">
                                                                                    <BiSolidLabel size={15} />
                                                                                    <span className="text-xs font-semibold px-2 py-1 uppercase rounded" style={{ backgroundColor: Deal?.person?.color }}>{Deal?.person?.labelName}</span>
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    className="flex items-center gap-6 w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100"
                                                                                >
                                                                                    <FiPhone size={15} />
                                                                                    <div>
                                                                                        {Deal?.person?.personPhoneDetails.map((x, index) => (
                                                                                            <p key={index} className=" text-blue-500 text-sm font-semibold ">{x?.phoneNumber}</p>
                                                                                        ))}
                                                                                    </div>
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    className="flex items-center gap-6 w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100"
                                                                                >
                                                                                    <MdEmail size={15} />
                                                                                    <div className="">
                                                                                        {Deal?.person?.personEmailDetails.map((x, index) => (
                                                                                            <div className="text-center" key={index}>
                                                                                                <a
                                                                                                    href={`mailto:${x?.email}`}
                                                                                                    className=" text-blue-500 text-start text-sm font-semibold hover:border-b border-blue-500 h-5">{x?.email}</a>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </button>
                                                                            </div>
                                                                        ) : (<p className="border-b py-2  text-center">No person is linked to this deal.</p>)}
                                                                        <div className="flex justify-end me-3">
                                                                            <button
                                                                                type="submit"
                                                                                className="ms-3 flex gap-3 items-center font-semibold my-2 rounded-full focus:outline-none text-black hover:bg-SlateBlue hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray dark:hover:bg-primary text-sm py-1 px-3 "
                                                                                onClick={() => toggleSelect("Person")}
                                                                            > <FaPlus /><span className='text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde'>Link an People</span>
                                                                            </button>
                                                                            {Deal?.person !== null && (
                                                                                <button
                                                                                    type="submit"
                                                                                    className="font-semibold m-3 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 "
                                                                                    onClick={() => UnlinkedData(0, "Person")}
                                                                                >
                                                                                    <MdOutlineLinkOff size={18} />
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Project*/}
                                                                <div>
                                                                    <h2 id="accordion-collapse-heading-8">
                                                                        <button
                                                                            type="button"
                                                                            className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                "accordion-collapse-body-8" ? "active bg-slate-100" : ""
                                                                                }`}
                                                                            data-accordion-target="#accordion-collapse-body-8"
                                                                            aria-expanded={activeAccordion === "accordion-collapse-body-8"}
                                                                            aria-controls="accordion-collapse-body-8"
                                                                            onClick={() => toggleAccordion("accordion-collapse-body-8")}
                                                                        >
                                                                            <span>Project</span>
                                                                            {activeAccordion !== "accordion-collapse-body-8" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                                                        </button>
                                                                    </h2>
                                                                    <div id="accordion-collapse-body-8" className={`border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-8" ? "block" : "hidden"}`}
                                                                        aria-labelledby="accordion-collapse-heading-8"
                                                                    >
                                                                        <div className="">
                                                                            {Deal?.project?.length > 0 ? (Deal?.project?.map((x, index) => (
                                                                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md  relative m-3" key={index}>
                                                                                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-2 px-4 dark:text-slate-300/70  ">
                                                                                        <div className="font-semibold capitalize">
                                                                                            <div className="flex justify-between items-center ">
                                                                                                <Link to={`/Projects/${x?.projectID}`} className="cursor-pointer hover:border-b  border-b-black h-5" >{x?.title}</Link>
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
                                                                            ))) : (<p className="text-center py-3"> Link Project.</p>)}

                                                                        </div>
                                                                        <div className="gap-3 flex  px-4 border-t border-grey-200 justify-end">
                                                                            <button
                                                                                type="submit"
                                                                                className="ms-3 flex gap-3 items-center font-semibold my-2 rounded-full focus:outline-none text-black hover:bg-SlateBlue hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray dark:hover:bg-primary text-sm py-1 px-3 "
                                                                                onClick={() => toggleSelect("Project")}
                                                                            > <FaPlus /><span className='text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde'>Link an Project</span>
                                                                            </button>
                                                                            <button
                                                                                type="submit"
                                                                                className="font-semibold my-3 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 "
                                                                                onClick={() => setProjectModal(true)}
                                                                            >
                                                                                <IoAddCircle />
                                                                            </button>
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                                {/* ProductDeal */}
                                                                <div>
                                                                    <h2 id="accordion-collapse-heading-10">
                                                                        <button
                                                                            type="button"
                                                                            className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                "accordion-collapse-body-10" ? "active bg-slate-100" : ""}`}
                                                                            data-accordion-target="#accordion-collapse-body-10"
                                                                            aria-expanded={activeAccordion === "accordion-collapse-body-10"}
                                                                            aria-controls="accordion-collapse-body-10"
                                                                            onClick={() => toggleAccordion("accordion-collapse-body-10")}
                                                                        >
                                                                            <span>Product</span>
                                                                            {activeAccordion !== "accordion-collapse-body-10" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                                                        </button>
                                                                    </h2>
                                                                    <div id="accordion-collapse-body-10" className={`border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-10" ? "block" : "hidden"}`}
                                                                        aria-labelledby="accordion-collapse-heading-10"
                                                                    >
                                                                        <div className="">
                                                                            {Deal?.dealProductList?.dealProductAmount.length > 0 ? (
                                                                                <div className="flex flex-col mt-1 ms-4 ">
                                                                                    <div className="flex items-center justify-between  mr-3 ">
                                                                                        <p className="text-xs text-gray-500 dark:text-gray-400 "> ACV :- &nbsp;<span className="text-black font-semibold"> Rs {Deal?.dealProductList?.acv}</span></p>
                                                                                        <button
                                                                                            type="submit"
                                                                                            className=" inline-block   focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium py-1 px-3 rounded"
                                                                                            onClick={() => { handlerEditDealProduct(Deal?.dealProductList?.dealProductID) }}
                                                                                        >
                                                                                            {Deal?.dealProductList?.totalProducts} Product
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className='mb-2'>
                                                                                        <p className="text-xs text-gray-500 dark:text-gray-400 "> ARR :- &nbsp;<span className="text-black font-semibold"> Rs {Deal?.dealProductList?.arr}</span>   </p>
                                                                                    </div>
                                                                                    <div className="">
                                                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2"> MRR :- &nbsp;<span className="text-black font-semibold"> Rs {Deal?.dealProductList?.mrr}</span>   </p>
                                                                                    </div>
                                                                                </div>
                                                                            ) :
                                                                                (
                                                                                    <div className="flex justify-end pe-2 border">
                                                                                        <button
                                                                                            type="button"
                                                                                            className="flex gap-3 items-center font-semibold my-2 rounded-full focus:outline-none text-black hover:bg-SlateBlue hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray dark:hover:bg-primary text-sm py-1 px-3 "
                                                                                            onClick={() => setDealProductModal(true)}
                                                                                        > <FaPlus /><span className='text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde'>Add Product</span>
                                                                                        </button>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Customfield*/}
                                                                <div>
                                                                    <h2 id="accordion-collapse-heading-12">
                                                                        <button
                                                                            type="button"
                                                                            className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                "accordion-collapse-body-12" ? "active bg-slate-100" : ""}`}
                                                                            data-accordion-target="#accordion-collapse-body-12"
                                                                            aria-expanded={activeAccordion === "accordion-collapse-body-12"}
                                                                            aria-controls="accordion-collapse-body-12"
                                                                            onClick={() => toggleAccordion("accordion-collapse-body-12")}
                                                                        >
                                                                            <span>Details</span>
                                                                            {activeAccordion !== "accordion-collapse-body-12" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                                                        </button>
                                                                    </h2>
                                                                    <div id="accordion-collapse-body-12" className={`border p-3 border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-12" ? "block" : "hidden"}`}
                                                                        aria-labelledby="accordion-collapse-heading-12"
                                                                    >
                                                                        <h2 className="font-semibold mb-1" >Customize fields</h2>
                                                                        <p className="font-medium text-sm mb-5 text-gray-500">Changes apply to all deals and leads in the views: add deal, add lead, deal detail view, lead detail view.</p>

                                                                        <div>
                                                                            {Object.keys(groupedData && groupedData)?.length > 0 &&
                                                                                Object.entries(groupedData && groupedData)?.map(([groupID, items]) => (
                                                                                    <div key={groupID} className='mb-3'>

                                                                                        {items && items?.some(x => x?.groupName !== null) && (
                                                                                            <h2 id={`accordion-collapse-heading-${groupID}`}>
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className={`flex justify-between items-center p-1.5 w-full font-medium border border-gray-200 dark:border-slate-700 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeCustomField === groupID ? "bg-slate-100 border-b-0" : ""}`}
                                                                                                    data-accordion-target={groupID}
                                                                                                    onClick={() => toggleCustomField(groupID)}
                                                                                                >
                                                                                                    <div className='flex gap-3 items-center'>
                                                                                                        {activeCustomField !== groupID ? (<FaAngleDown />) : (<FaAngleUp />)}
                                                                                                        <p className="capitalize">{items[0]?.groupName || 'Group Name'}</p>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <BiDotsVerticalRounded onClick={() => toggleGroupName(groupID)} />
                                                                                                        <div
                                                                                                            className={`dropdown-menu z-50 list-none divide-y divide-gray-100 rounded border-slate-700 md:border-white text-base shadow dark:divide-gray-600 bg-white dark:bg-slate-800 w-24 ${activegrouptoggle === groupID ? "block" : "hidden"}`}
                                                                                                            id={`navUserdata-${groupID}`}
                                                                                                        >
                                                                                                            <ul className="cursor-pointer border p-1" aria-labelledby={`navUserdata-${groupID}`}>
                                                                                                                <li className="block py-1 text-xs text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white" onClick={() => { EditGroupField(groupID); toggleGroupName(null) }}>
                                                                                                                    Rename group
                                                                                                                </li>
                                                                                                                <li className="block py-1 text-xs text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white" onClick={() => { DeleteGroupField(groupID); toggleGroupName(null) }}>
                                                                                                                    Delete group
                                                                                                                </li>
                                                                                                            </ul>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </button>
                                                                                            </h2>
                                                                                        )}

                                                                                        {/* Render fields */}
                                                                                        <div
                                                                                            id={`accordion-collapse-body-${groupID}`}
                                                                                            className={`border-gray-200  dark:border-slate-700  dark:bg-slate-800 ${items?.some(x => x?.groupName !== null) ? 'bg-slate-100  border' : ''} ${items?.some(x => x?.groupName === null) || activeCustomField === groupID ? 'block' : 'hidden'}`}
                                                                                            aria-labelledby={groupID}
                                                                                        >
                                                                                            {items && items?.map((item, index) => (
                                                                                                <div key={index} className="bg-white   m-2 mx-3 dark:bg-slate-800 shadow-md rounded-md  relative p-2">
                                                                                                    <h4 className="font-semibold capitalize text-base flex justify-between items-center">
                                                                                                        <h2>{item?.fieldName}</h2>
                                                                                                        <div className="flex gap-2">
                                                                                                            <MdOutlineEdit size={17} onClick={() => EditCustomField(item)} />
                                                                                                            <RiDeleteBin6Line size={17} onClick={() => handleDeletefiled(item)} />
                                                                                                        </div>
                                                                                                    </h4>
                                                                                                </div>
                                                                                            ))}
                                                                                        </div>
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                        <div className="flex justify-end P-3">
                                                                            <button
                                                                                type="submit"
                                                                                className="font-semibold flex items-center gap-2 focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                                                                onClick={() => setopenFields(true)}
                                                                            >
                                                                                <FaPlus />   Custom Field
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Partcipants*/}
                                                                <div>
                                                                    <h2 id="accordion-collapse-heading-13">
                                                                        <button
                                                                            type="button"
                                                                            className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                "accordion-collapse-body-13" ? "active bg-slate-100" : ""}`}
                                                                            data-accordion-target="#accordion-collapse-body-13"
                                                                            aria-expanded={activeAccordion === "accordion-collapse-body-13"}
                                                                            aria-controls="accordion-collapse-body-13"
                                                                            onClick={() => toggleAccordion("accordion-collapse-body-13")}
                                                                        >
                                                                            <span>Partcipants ({Deal?.personCount})</span>
                                                                            {activeAccordion !== "accordion-collapse-body-13" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                                                        </button>
                                                                    </h2>
                                                                    <div id="accordion-collapse-body-12" className={`border p-2 border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-13" ? "block" : "hidden"}`}
                                                                        aria-labelledby="accordion-collapse-heading-13"
                                                                    >
                                                                        <div className="flex justify-between items-start  p-2 px-3">
                                                                            <div className="">
                                                                                {personIDs.length > 0 ? (
                                                                                    personNames.map((name, index) => (
                                                                                        <div className="flex gap-3 items-center ">
                                                                                            <BsPerson size={16} />
                                                                                            <p key={index} className='text-base font-medium hover:border-b border-blue-500 h-6 text-blue-600 capitalize cursor-pointer' onClick={() => navigate(`/detailsPeople/${personIDs[index]}`)}>
                                                                                                {name}
                                                                                            </p>
                                                                                        </div>
                                                                                    ))
                                                                                ) : (
                                                                                    <p className='text-base font-medium text-gray-500 '>
                                                                                        There are no participants linked to this product
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                            <button
                                                                                type="submit"
                                                                                className=" focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                                                                onClick={() => { setopenParticipants(true); setParticipantsName('Add') }}
                                                                            >
                                                                                <FaPlus />
                                                                            </button>
                                                                        </div>
                                                                        {personIDs.length > 0 && (
                                                                            <button
                                                                                data-modal-toggle="modal"
                                                                                className="focus:outline-none cursor-pointer text-black mt-2  px-2 py-1.5 border flex items-center"
                                                                                onClick={() => { setopenParticipants(true); setParticipantsName('View') }}
                                                                            >
                                                                                View All
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {/* Overview*/}
                                                                <div>
                                                                    <h2 id="accordion-collapse-heading-6">
                                                                        <button
                                                                            type="button"
                                                                            className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                "accordion-collapse-body-6"
                                                                                ? "active bg-slate-100"
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
                                                                        className={`p-4 border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                                                            "accordion-collapse-body-6"
                                                                            ? "block"
                                                                            : "hidden"
                                                                            }`}
                                                                        aria-labelledby="accordion-collapse-heading-6"
                                                                    >
                                                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                                                            There are many variations of passages of
                                                                            Lorem Ipsum available, but the majority have
                                                                            suffered alteration in some form.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {/* Smart Bcc*/}
                                                                <div>
                                                                    <h2 id="accordion-collapse-heading-7">
                                                                        <button
                                                                            type="button"
                                                                            className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                                "accordion-collapse-body-7" ? "active bg-slate-100" : ""
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
                                                                {/* Revenue*/}
                                                                <div>
                                                                    <h2 id="accordion-collapse-heading-9">
                                                                        <button
                                                                            type="button"
                                                                            className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion === "accordion-collapse-body-9" ? "active bg-slate-100" : ""}`}
                                                                            data-accordion-target="#accordion-collapse-body-9"
                                                                            aria-expanded={activeAccordion === "accordion-collapse-body-9"}
                                                                            aria-controls="accordion-collapse-body-9"
                                                                            onClick={() => toggleAccordion("accordion-collapse-body-9")}
                                                                        >
                                                                            <span>Revenue</span>
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
                                                                        className={`p-4 border border-b border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                                                            "accordion-collapse-body-9"
                                                                            ? "block"
                                                                            : "hidden"
                                                                            }`}
                                                                        aria-labelledby="accordion-collapse-heading-9"
                                                                    >

                                                                        {(Deal?.dealsubscriptionMaster === null && Deal?.dealPaymentScheduleMaster === null) && (
                                                                            <>
                                                                                <p className="mb-3 text-black dark:text-gray-black font-semibold">Choose a billing plan</p>
                                                                                <div className=''>
                                                                                    <button
                                                                                        type="submit"
                                                                                        className="flex items-center inline-block   focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium py-1 px-3  rounded"
                                                                                        onClick={() => { setSubscriptionModal(true); setPlanName('subscription') }}
                                                                                    >
                                                                                        <FaPlus /><span className='text-black text-sm font-semibold  px-2.5 py-0.5 rounde'>Subscription</span>
                                                                                    </button>
                                                                                    <button
                                                                                        type="submit"
                                                                                        className="flex items-center inline-block  mt-2 focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium py-1 px-3  rounded"
                                                                                        onClick={() => { setPaymentModal(true); setPlanName('payment') }}
                                                                                    >
                                                                                        <FaPlus /><span className='text-black text-sm font-semibold  px-2.5 py-0.5 rounde'>Payment schedule</span>
                                                                                    </button>
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                        {(Deal?.dealsubscriptionMaster) && (
                                                                            <>
                                                                                <div className="">
                                                                                    <h2 className="font-semibold" >Subscription</h2>
                                                                                    <div className=" mt-1 flex justify-between">
                                                                                        <div>
                                                                                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate w-80"> Description :- &nbsp;<span className="text-black font-semibold text-xs  " >{Deal?.dealsubscriptionMaster?.description}</span>   </p>
                                                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1"> &nbsp;<span className="">Rs {Deal?.dealsubscriptionMaster?.recurringAmount}</span> . <span>{Deal?.dealsubscriptionMaster?.interval}</span>. <span>{Deal?.dealsubscriptionMaster?.asInfinite === true ? "Infinite" : Deal?.dealsubscriptionMaster?.payments} cycles</span>  </p>
                                                                                        </div>
                                                                                        <div>
                                                                                            <span className={` text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full   ${Deal?.dealsubscriptionMaster?.isCancel === true ? 'bg-red' : 'bg-green-600'}`}>{Deal?.dealsubscriptionMaster?.isCancel === true ? 'CANCELED' : 'ACTIVE'}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <PaymentList dealPaymentList={Deal?.dealsubscriptionMaster?.dealPaymentList} />
                                                                                    <h2 className="font-semibold mt-3" >Details</h2>
                                                                                    <div className="flex mt-1">
                                                                                        <p className="text-xs text-gray-500 dark:text-gray-400 "> Total revenue earned  :- &nbsp;<span className="text-black font-semibold"> Rs {Deal?.dealsubscriptionMaster?.totalRevenue}</span>   </p>
                                                                                    </div>
                                                                                    <div className="flex mt-1">
                                                                                        <p className="text-xs text-gray-500 dark:text-gray-400 "> Start date :- &nbsp;<span className="text-black font-semibold">{moment(Deal?.dealsubscriptionMaster?.startDate).format('LL')}</span>  </p>
                                                                                    </div>
                                                                                    <div className="flex mt-1">
                                                                                        <p className="text-xs text-gray-500 dark:text-gray-400 "> End date :- &nbsp;<span className="text-black font-semibold"> {moment(Deal?.dealsubscriptionMaster?.endDate).format('LL')}</span>  </p>
                                                                                    </div>

                                                                                </div>
                                                                                <div className="flex justify-end gap-4 mt-2">
                                                                                    {
                                                                                        Deal?.dealsubscriptionMaster?.isCancel === false && (
                                                                                            <>
                                                                                                <div data-tip data-for="Edit" className="relative flex flex-col items-center group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                                    onClick={() => { handlerEditSubscription(Deal?.dealsubscriptionMaster?.dealsubscriptionID) }}
                                                                                                >
                                                                                                    <BiEdit />
                                                                                                    <div className="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                                        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Edit</span>
                                                                                                        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div
                                                                                                    data-tip
                                                                                                    data-for="Duplicate"
                                                                                                    className="relative flex-col group cursor-pointer text-white bg-neutral-400 hover:bg-neutral-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                                    onClick={() => { setCancelModal(true); setsubScriptionId(Deal?.dealsubscriptionMaster?.dealsubscriptionID) }}
                                                                                                >
                                                                                                    <MdOutlineCancel />
                                                                                                    <div className="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                                        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Cancel</span>
                                                                                                        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                    <div
                                                                                        data-tip
                                                                                        data-for="Delete"
                                                                                        className="relative flex-col group cursor-pointer text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                        onClick={() => handleDeleteSubscription(Deal?.dealsubscriptionMaster?.dealsubscriptionID)}
                                                                                    >
                                                                                        <MdDeleteForever />
                                                                                        <div className="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Delete</span>
                                                                                            <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </>
                                                                        )}
                                                                        {(Deal?.dealPaymentScheduleMaster) && (
                                                                            <>
                                                                                <div className="">
                                                                                    <h2 className="font-semibold" >Payment</h2>
                                                                                    <PaymentList dealPaymentList={Deal?.dealPaymentScheduleMaster?.dealSubPaymentSchedule} />
                                                                                    <h2 className="font-semibold mt-3" >Details</h2>
                                                                                    <div className="flex mt-1">
                                                                                        <p className="text-xs text-gray-500 dark:text-gray-400 "> Total revenue earned  :- &nbsp;<span className="text-black font-semibold"> Rs {Deal?.dealPaymentScheduleMaster?.totalAmount}</span>   </p>
                                                                                    </div>
                                                                                    <div className="flex mt-1">
                                                                                        <p className="text-xs text-gray-500 dark:text-gray-400 "> Start date :- &nbsp;<span className="text-black font-semibold">{moment(Deal?.dealPaymentScheduleMaster?.startDate).format('LL')}</span>  </p>
                                                                                    </div>
                                                                                    <div className="flex mt-1">
                                                                                        <p className="text-xs text-gray-500 dark:text-gray-400 "> End date :- &nbsp;<span className="text-black font-semibold"> {moment(Deal?.dealPaymentScheduleMaster?.endDate).format('LL')}</span>  </p>
                                                                                    </div>

                                                                                </div>
                                                                                <div className="flex justify-end gap-4 mt-2">
                                                                                    <div data-tip data-for="Edit" className="relative flex flex-col items-center group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                        onClick={() => { handlerEditPaymentPlan(Deal?.dealPaymentScheduleMaster?.dealPaymentScheduleID) }}
                                                                                    >
                                                                                        <BiEdit />
                                                                                        <div className="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Edit</span>
                                                                                            <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        data-tip
                                                                                        data-for="Delete"
                                                                                        className="relative flex-col group cursor-pointer text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                        onClick={() => handleDeletePayment(Deal?.dealPaymentScheduleMaster?.dealPaymentScheduleID)}
                                                                                    >
                                                                                        <MdDeleteForever />
                                                                                        <div className="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Delete</span>
                                                                                            <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </>
                                                                        )}

                                                                    </div>
                                                                </div>
                                                                {/* createdDate*/}
                                                                <div className="border border-b-0 p-4">
                                                                    <div className="flex">
                                                                        <p className="text-sm text-gray-500 dark:text-gray-400 "> Updated :- {moment(Deal?.updatedDate).format('MMMM Do YYYY, h:mm a')}  </p>
                                                                    </div>
                                                                    <div className="flex">
                                                                        <p className="text-sm text-gray-500 dark:text-gray-400 "> Created :- {moment(Deal?.createdDate).format('MMMM Do YYYY, h:mm a')}  </p>
                                                                    </div>

                                                                </div>
                                                                {/* ConvertToLead*/}
                                                                <div className="flex gap-3 py-3 rounded-t border-t border-gray-200 dark:border-gray-4 justify-end mr-2 ">
                                                                    <button
                                                                        type="submit"
                                                                        className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                                                        onClick={() => setOpenModel(true)}
                                                                    >
                                                                        Convert to Lead
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-12  md:col-span-12 lg:col-span-8 xl:col-span-8">
                                                    <HistoryView Data={Deal} setLoadFirst={setLoadFirst} getAllVisible={getAllVisible} id={id} identityName="Deal" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Footer />
                    </div>
                </div>
            </div >
            {ProjectModal && (<AddProject
                toggleModal={toggleModalProject}
                setloadFrist={setLoadFirst}
            />)}
            {openSelect && (<LinkDeals Data={Deal} Error={Error} link={link} toggleSelect={toggleSelect} linkData={linkData} Deal={Deal} Peoplestore={Peoplestore} setlinkData={setlinkData} Projectstore={Projectstore} organizationstore={organizationstore} updatePipelineStage={updatePipelineStage} />)}
            {openModel && (<AddLeads togglemodelLead={togglemodelLead} leadData={Deal} setLoadFistInbox={setLoadFirst} />)}
            {CancelModal && <CancelSubscriptionModal setCancelModal={setCancelModal} subScriptionId={subScriptionId} setLoadFirst={setLoadFirst} />}
            {SubscriptionModal && <AddSubscription setSubscriptionModal={setSubscriptionModal} setLoadFirst={setLoadFirst} DealId={id} PlanName={PlanName} EditSubscription={EditSubscription} setEditSubscription={setEditSubscription} />}
            {PaymentModal && <AddPaymentPlan setPaymentModal={setPaymentModal} setLoadFirst={setLoadFirst} DealId={id} PlanName={PlanName} EditSubscription={EditSubscription} setEditSubscription={setEditSubscription} />}
            {DealProductModal && <AddDealProducts Deal={Deal} setEditDealtoProduct={setEditDealtoProduct} setDealProductModal={setDealProductModal} DealId={id} setLoadFirst={setLoadFirst} EditDealtoProduct={EditDealtoProduct} />}
            {openFields && <AddFields setopenFields={setopenFields} identityID={id} identityName={'Deal'} setLoadFirst={setLoadFirst} setopenGroupModal={setopenGroupModal} EditcustomField={EditcustomField} setEditcustomField={setEditcustomField} />}
            {openParticipants && (<Partcipants ParticipantsName={ParticipantsName} toggleModal={toggleModal} product={Deal} id={id} />)}
            {openGroupModal && <AddGroupField setopenGroupModal={setopenGroupModal} GroupField={GroupField} setLoadFirst={setLoadFirst} setGroupField={setGroupField} />}
            {openReasonModal && <AddLostReason setopenReasonModal={setopenReasonModal} id={id} EditWonLost={EditWonLost} />}
        </>
    );
};

export default DealDetails;
