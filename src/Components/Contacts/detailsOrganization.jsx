/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData, getByIdApi, saveApiData, } from "../../Redux/organizationSlice";
import { FaAngleDown, FaAngleUp, FaEye, FaLocationDot, FaPlus } from "react-icons/fa6";
import AddDeals from "../Deals/AddDeals";
import AddEditOrganizations from "./AddEditOrganizations";
import AddEditPerson from "./AddEditPerson";
import AddLeads from "../Leads/AddLeads";
import { getAllDeals } from "../../Redux/DealSlice";
import { IoAddCircle } from "react-icons/io5";
import { AiFillFlag } from "react-icons/ai";
import moment from "moment";
import { getAllPerson } from "../../Redux/PersonSlice";
import { getAllFolders, getAllHistory, } from "../../Redux/CommonSlice";
import getUserDetail from "../Common/defaultValue";
import { MdOutlineEdit, MdOutlineKeyboardBackspace, MdOutlineLinkOff, } from "react-icons/md";
import { BiDotsVerticalRounded, BiSolidLabel, BiSolidUser } from "react-icons/bi";
import Loading from "../Common/Loading";
import { FaUserCircle } from "react-icons/fa";
import { getProject } from "../../Redux/ProjectSlice";
import toast from "react-hot-toast";
import sweetAlert from "../Common/sweetAlert";
import LinkLeads from "../Leads/LinkLeads";
import RelatedOrganization from "./RelatedOrganization";
import { BsFillFlagFill, BsPerson } from "react-icons/bs";
import { formatDate, Phase, Pipelinestage } from "../Common/Common";
import DynamicTable from "../Common/table";
import AddProject from "../Projects/AddProject";
import HistoryView from "../Common/HistoryView";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getFiledByID, getGroupFiledByID, handledeleteFiled, handledeleteGroupFiled } from "../../Redux/CustomizeFieldSlice";
import AddFields from "../Common/AddFields";
import AddGroupField from "../Common/AddGroupField";

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

  const getAllVisible = useSelector((state) => state.root.common);
  const store = useSelector((state) => state.root.organization);
  const Projectstore = useSelector((state) => state.root.Project);
  const Dealstore = useSelector((state) => state.root.Deal);
  const Peoplestore = useSelector((state) => state.root.Person);
  const userDetails = getUserDetail();
  const Leadstore = useSelector((state) => state.root.leads);

  const [OrganizationEdit, setOrganizationEdit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadFirst, setLoadFirst] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState("");
  const [openModelTable, setOpenModelTable] = useState(false);
  const [openModelTableOrganizetion, setOpenModelTableOrganizetion] = useState(false);
  const [openModelTablePeople, setOpenModelTablePeople] = useState(false);
  const [openDeal, setOpenDeal] = useState(false);
  const [openOrganization, setOpenOrganization] = useState(false);
  const [openModelpeople, setOpenModelPeople] = useState(false);
  const [openModelLead, setOpenModelLead] = useState(false);
  const [modelLabel, setModelLabel] = useState("");
  const [openSelect, setopenSelect] = useState(false)
  const [link, setlink] = useState('');
  const [linkData, setlinkData] = useState('');
  const [Error, setError] = useState('');
  const [dealID, setdealID] = useState([]);
  const [ProjectModal, setProjectModal] = useState(false);
  const [activeCustomField, setactiveCustomField] = useState('');
  const [activegrouptoggle, setActivegrouptoggle] = useState("");
  const [EditcustomField, setEditcustomField] = useState([]);
  const [GroupField, setGroupField] = useState([]);
  const [openGroupModal, setopenGroupModal] = useState(false);
  const [openFields, setopenFields] = useState(false);

  useEffect(() => {
    if (loadFirst) {
      dispatch(fetchApiData({}))
        .then(() => {
          const timer = setTimeout(() => {
            setLoading(false)
          }, 1000);
          return () => clearTimeout(timer);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
      setLoadFirst(false)
    }
  }, []);
  useEffect(() => {
    // const queryLead = { search: '', limit: 0, pageNumber: 0, objSearch: {} };
    // dispatch(getLeadmaster({ search: '', limit: 0, pageNumber: 0, objSearch: {} }))

  }, []);

  useEffect(() => {
    const query = { type: "organization", id: id };
    const queryFolder = { IdentityName: "organization", IdentityID: id };
    if (loadFirst) {
      setLoading(true);
      editData(id)
      dispatch(getAllHistory(query));
      dispatch(getAllDeals({}))
      dispatch(getAllPerson({}))
      dispatch(getProject({}))
      dispatch(getAllFolders(queryFolder))
      dispatch(fetchApiData({}))
        .then(() => {
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
      setLoadFirst(false);
    }
  }, [dispatch, id, loadFirst]);

  useEffect(() => {
    const selectedValues = dealID && dealID?.map((option) => option?.value).join(',');
    setlinkData(selectedValues);
  }, [dealID]);

  const columns = [
    { Header: "Title", accessor: "title" },
    { Header: "Value", accessor: "value", Cell: ({ value }) => `₹ ${value.toLocaleString('en-IN')}` },
    { Header: "Organization", accessor: "organizationName" },
    { Header: "Contact Person", accessor: "personName" },
    { Header: "Expected CloseDate", accessor: "expectedCloseDate", Cell: ({ value }) => formatDate(value) },
    { Header: "Owner", accessor: "ownerName" },
  ];

  const columnsPeople = [
    { Header: "Name", accessor: "name" },
    { Header: "Organization", accessor: "organizationName" },
    {
      Header: "Email",
      accessor: "",
      Cell: ({ row }) => (
        <div className="flex justify-center">
          {row.original?.personEmailDetails &&
            row.original?.personEmailDetails?.map((item) => (
              <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                <div className="flex flex-col pb-3">
                  {/* <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    {item.emailType}
                  </dt> */}
                  <dd className="text-sm ">{item.email}</dd>
                </div>
              </dl>
            ))}
        </div>
      ),
    },
    {
      Header: "Phone",
      accessor: "",
      Cell: ({ row }) => (
        <div className="flex justify-center">
          {row.original?.personPhoneDetails &&
            row.original?.personPhoneDetails?.map((item) => (
              <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                <div className="flex flex-col pb-3">
                  <dd className="text-sm ">{item.phoneNumber}</dd>
                </div>
              </dl>
            ))}
        </div>
      ),
    },
    { Header: "Close deals", accessor: "closedDeal" },
    { Header: "Open deals", accessor: "openDeal" },
    { Header: "Next axtivity date", accessor: "next_axtivity_date" },
    { Header: "Owner", accessor: "Dhurv" },
  ];

  const toggleSelect = (item) => {
    setopenSelect(!openSelect)
    setlink(item)
    setlinkData('')
    setdealID([])
    setError('')
  }
  const toggleModalProject = () => { setProjectModal(!ProjectModal); };
  const toggleCustomField = (id) => { setactiveCustomField(id === activeCustomField ? "" : id); };
  const toggleGroupName = (id) => { setActivegrouptoggle(id === activegrouptoggle ? "" : id); };

  const toggleAccordion = (accordionId) => {
    setActiveAccordion(accordionId === activeAccordion ? "" : accordionId);
  };

  const toggleModal = () => { setOpenDeal(!openDeal); };

  const toggleModalOrganization = () => {
    setLoadFirst(true);
    setOpenOrganization(!openOrganization);
  };

  const togglemodel = () => { setOpenModelPeople(!openModelpeople); };

  const togglemodelLead = () => { setOpenModelLead(!openModelLead); };

  const ViewAll = (label) => {
    setModelLabel(label);
    if (label === "Organization") {
      setOpenModelTableOrganizetion(true);
    } else if (label === "Deals") {
      setOpenModelTable(true);
    } else if (label === "People") {
      setOpenModelTablePeople(true);
    }
  };

  const editData = async (id) => {
    try {
      const res = await dispatch(getByIdApi(id));
      if (res.payload.status === true) {
        const data = res.payload.data;
        setOrganizationEdit(data);
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const UpdateORG = (linkedData) => {
    if (!linkData) {
      setError(`The ${link} name is Required`);
      return;
    }
    const payload = {
      ...OrganizationEdit,
      nextActivityDate: "0001-01-01T00:00:00",
      peopleID: link && link === "Person" ? (OrganizationEdit?.peopleID ? OrganizationEdit?.peopleID + ',' + linkedData.value : linkedData.value) : OrganizationEdit?.peopleID,
      dealID: link && link === "Deal" ? (OrganizationEdit?.dealID ? OrganizationEdit?.dealID + ',' + linkedData : linkedData) : OrganizationEdit?.dealID,
      leadID: link && link === "Lead" ? (OrganizationEdit?.leadID ? OrganizationEdit?.leadID + ',' + linkedData.value : linkedData?.value) : OrganizationEdit?.leadID,
      projectID: link && link === "Project" ? (OrganizationEdit?.projectID ? OrganizationEdit?.projectID + ',' + linkedData?.value : linkData?.value) : OrganizationEdit?.projectID,
    };

    dispatch(saveApiData(payload)).then((res) => {
      toast.remove()
      if (res.payload.status === true) {
        setLoadFirst(true)
        toggleSelect()
        toast.success(`${link} linked Successfully!`)
      }
    }).catch((error) => console.log('error :>> ', error))
  };

  const UnlinkedData = async (id, type) => {
    try {
      const result = await sweetAlert.confirm(`Are you sure you want to unlink this ${type} from this organization?`, null, 'unlink');
      const dataID = type === 'Deal' ? OrganizationEdit?.dealID?.split(',') : type === 'Lead' ? OrganizationEdit?.leadID?.split(',') : type === 'Project' ? OrganizationEdit?.projectID?.split(',') : ''
      const ID = dataID.filter(x => parseInt(x) !== id).join(',')

      const Payload = {
        ...OrganizationEdit,
        leadID: type === 'Lead' ? ID : OrganizationEdit?.leadID,
        projectID: type === 'Project' ? ID : OrganizationEdit?.projectID,
        dealID: type === 'Deal' ? ID : OrganizationEdit?.dealID
      }

      if (result.isConfirmed) {
        dispatch(saveApiData(Payload)).then((res) => {
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

  const EditGroupField = (id) => {
    dispatch(getGroupFiledByID(id)).then((res) => {
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

  const DeleteGroupField = async (id) => {
    try {
      const result = await sweetAlert.confirm(`Are you sure you want to delete field group  ?`,
        "The fields in this group won’t be deleted and will be displayed as ungrouped.");

      if (result?.isConfirmed) {
        await dispatch(handledeleteGroupFiled(id)).then((res) => {
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
      const result = await sweetAlert?.confirm(`Are you sure you want to delete this field?`,
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


  const groupedData = (OrganizationEdit?.customizeFieldMaster || []).reduce((acc, item) => {
    const groupId = item.groupID;
    if (!acc[groupId]) {
      acc[groupId] = [];
    }
    acc[groupId].push(item);

    return acc;
  }, {});

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
                          Details Organization
                        </h1>
                        <ol className="list-reset flex text-sm">
                          <li className="text-gray-500">
                            Organization

                          </li>
                          <li>
                            <span className="text-gray-500 mx-2">/</span>
                          </li>
                          <li className="text-blue-600 hover:text-blue-700">
                            DetailsOrganization
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
                  {loading ? (
                    <div className="h-screen"><Loading /></div>
                  ) : (
                    <>
                      <div className="flex gap-5 border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                        <button
                          type="submit"
                          className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200  dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                          onClick={() =>
                            navigate("/Contact-Organizations")}
                        >
                          <MdOutlineKeyboardBackspace size={20} />
                        </button>
                        <h4 className="font-semibold capitalize">{store?.organization?.organizationName}</h4>
                      </div>
                      <div className="flex-auto p-4">
                        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                          <div className="sm:col-span-12  md:col-span-12 lg:col-span-4 xl:col-span-4">
                            <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                              <div className="flex-auto p-4">
                                <div
                                  id="accordion-collapse"
                                  data-accordion="collapse"
                                >
                                  <div>
                                    <h2 id="accordion-collapse-heading-1">
                                      <button
                                        type="button"
                                        className={`p-4 flex justify-between items-center w-full font-medium text-left text-gray-500 rounded-t-xl border border-b-0 border-gray-200 dark:border-slate-700 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
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
                                      className={`px-4 py-2 border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                        "accordion-collapse-body-1"
                                        ? "block"
                                        : "hidden"
                                        }`}
                                      aria-labelledby="accordion-collapse-heading-1"
                                    >

                                      <div className="w-full text-gray-900 bg-white  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ">
                                        <button type="button" className="relative gap-6 flex items-center w-full px-4 py-2 text-sm font-medium   hover:bg-gray-100   dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white ">
                                          <BiSolidLabel />
                                          <span className="text-xs font-semibold px-2 py-1 uppercase rounded" style={{ backgroundColor: OrganizationEdit?.color }}>{OrganizationEdit.labelName}</span>
                                        </button>
                                        <button type="button" className="relative flex items-center w-full px-4 py-2  hover:bg-gray-100   dark:hover:bg-gray-600 ">
                                          <div>
                                            <FaLocationDot />
                                          </div>
                                          <p className="text-black text-left text-sm font-semibold me-2 px-2 py-0.5  dark:bg-yellow-900 dark:text-yellow-300 ms-4 " >{OrganizationEdit?.address}</p>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
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
                                      className={`border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-3" ? "block" : "hidden"}`}
                                      aria-labelledby="accordion-collapse-heading-3"
                                    >
                                      {/* max-h-40 vertical-scroll-inner */}
                                      <div className="">
                                        {OrganizationEdit?.deal?.length > 0 ? (
                                          OrganizationEdit?.deal.map((x, index) => (
                                            <div className="bg-white dark:bg-slate-800 shadow  rounded-md  relative m-3" key={index}>
                                              <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-2 px-4 dark:text-slate-300/70">
                                                <div className="font-semibold capitalize cursor-pointer">
                                                  <div className="flex justify-between items-center ">
                                                    <Link to={`/deal/${x?.dealID}`} className="hover:border-b border-b-neutral-950  h-5">{x?.title}</Link>
                                                    <div
                                                      data-tip
                                                      data-for="Edit"
                                                      className="relative  group cursor-pointer "
                                                      onClick={() => UnlinkedData(x?.dealID, 'Deal')}
                                                    >
                                                      <MdOutlineLinkOff size={18} />
                                                      <div className="absolute bottom-0 right-0 left-0 flex-col items-center hidden mb-6 group-hover:flex">
                                                        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                          Unlink Deal
                                                        </span>
                                                        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                      </div>
                                                    </div>
                                                  </div>
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
                                        <button
                                          type="submit"
                                          className="ms-3 flex gap-3 items-center font-semibold my-2 rounded-full focus:outline-none text-black hover:bg-SlateBlue hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray dark:hover:bg-primary text-sm py-1 px-3 "
                                          onClick={() => toggleSelect("Deal")}
                                        > <FaPlus /><span className='text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde'>Link an Deal</span>
                                        </button>
                                        <button
                                          type="submit"
                                          className="font-semibold my-3 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3"
                                          onClick={() =>
                                            ViewAll("Deals")}
                                        >
                                          <FaEye />
                                        </button>
                                        <button
                                          type="submit"
                                          className="font-semibold my-3 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 "
                                          onClick={() => toggleModal()}
                                        >
                                          <IoAddCircle />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h2 id="accordion-collapse-heading-4">
                                      <button
                                        type="button"
                                        className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
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
                                        <span>Related Organization</span>
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
                                      className={`border p-3 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                        "accordion-collapse-body-4"
                                        ? "block"
                                        : "hidden"
                                        }`}
                                      aria-labelledby="accordion-collapse-heading-4"
                                    >
                                      <div className="flex justify-between items-start shadow-md p-2">
                                        <div className="">
                                          {OrganizationEdit?.relatedOrganization && OrganizationEdit?.relatedOrganization.length > 0 ? (
                                            OrganizationEdit?.relatedOrganization.map((x, index) => (
                                              <div className="flex justify-between items-center mt-1 w-72 h-5">
                                                <div className="flex gap-3 items-center p-0">
                                                  <BsPerson size={16} />
                                                  <Link to={`/detailsOrganization/${x?.reorgID}`} key={index} className='text-sm font-medium text-blue-600 capitalize cursor-pointer hover:border-b border-b-blue-600' onClick={() => { navigate(`/detailsOrganization/${x?.reorgID}`); setLoadFirst(true) }}>
                                                    {x?.relatedOrganizationName}
                                                  </Link>
                                                </div>
                                                <p className='text-sm font-medium text-gray-500 font-semibold capitalize ' >
                                                  {x?.relation}
                                                </p>
                                              </div>
                                            ))
                                          ) : (
                                            <p className='text-base font-medium text-gray-600'>
                                              No related organizations linked yet.
                                            </p>
                                          )}
                                        </div>
                                        <button
                                          type="submit"
                                          className=" focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                          onClick={() => { setOpenModelTableOrganizetion(true) }}
                                        >
                                          <FaPlus />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h2 id="accordion-collapse-heading-5">
                                      <button
                                        type="button"
                                        className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                          "accordion-collapse-body-3"
                                          ? "active"
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
                                        <span>People</span>
                                        {activeAccordion !==
                                          "accordion-collapse-body-5" ? (
                                          <FaAngleDown />
                                        ) : (
                                          <FaAngleUp />
                                        )}
                                      </button>
                                    </h2>
                                    <div
                                      id="accordion-collapse-body-5"
                                      className={`border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                        "accordion-collapse-body-5"
                                        ? "block"
                                        : "hidden"
                                        }`}
                                      aria-labelledby="accordion-collapse-heading-5"
                                    >
                                      <div className="my-2">
                                        {OrganizationEdit?.person?.length > 0 ? (
                                          OrganizationEdit?.person.map((x, index) => (
                                            <div key={index} className="flex gap-3 items-center py-1 px-5 text-blue-500 ">
                                              <BiSolidUser size={17} />
                                              <Link to={`/detailsPeople/${x?.personMasterID}`} className=" text-sm font-semibold  capitalize hover:border-b border-blue-500 h-5">{x?.name}</Link>
                                            </div>
                                          ))
                                        ) : (
                                          <p className="my-2 text-gray-500 dark:text-gray-400 text-center">
                                            Create New People
                                          </p>
                                        )}
                                      </div>
                                      <div className="gap-3 flex  border-t border-grey-200  justify-end pe-5 ">
                                        <button
                                          type="submit"
                                          className="ms-3 flex gap-3 items-center font-semibold my-3.5 rounded-full focus:outline-none text-black hover:bg-SlateBlue hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray dark:hover:bg-primary text-sm py-1 px-3 "
                                          onClick={() => toggleSelect("Person")}
                                        > <FaPlus /><span className='text-black text-sm font-semibold  px-2.5 py-0.5 rounde'>Link an People</span>
                                        </button>

                                        <button
                                          type="submit"
                                          className="font-semibold my-5 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3"
                                          onClick={() =>
                                            ViewAll("People")}
                                        >
                                          <FaEye />
                                        </button>
                                        {/* <button
                                          type="submit"
                                          className="font-semibold my-5 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 "
                                          onClick={() =>
                                            setOpenModelPeople(true)
                                          }
                                        >
                                          <IoAddCircle />
                                        </button> */}
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
                                      className={`p-4 border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                        "accordion-collapse-body-6"
                                        ? "block"
                                        : "hidden"
                                        }`}
                                      aria-labelledby="accordion-collapse-heading-6"
                                    >
                                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        There are many variations of passages of
                                        Lorem Ipsum available, but the majority
                                        have suffered alteration in some form.
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
                                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={userDetails?.emailID}
                                        disabled
                                      />
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
                                      className={`border border-b border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                        "accordion-collapse-body-8"
                                        ? "block"
                                        : "hidden"
                                        }`}
                                      aria-labelledby="accordion-collapse-heading-8"
                                    >
                                      <div className="">
                                        {OrganizationEdit?.lead && OrganizationEdit?.lead?.length > 0 ? (
                                          OrganizationEdit?.lead.map((x, index) => (
                                            <div key={index} className="bg-white dark:bg-slate-800 shadow  rounded-md  relative m-3" >
                                              <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-2 px-4 dark:text-slate-300/70">
                                                <div className="font-semibold capitalize">
                                                  <div className="flex justify-between items-center ">
                                                    <Link to={`/detailsLead/${x?.leadID}`} className="hover:border-b h-5 border-b-black ">{x?.title}</Link>
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
                                          <p className="my-2 text-gray-500 dark:text-gray-400 text-center">
                                            Create New Lead
                                          </p>
                                        )}
                                      </div>
                                      <div className="gap-3 flex  px-4 border-t border-grey-200 justify-end">
                                        <button
                                          type="submit"
                                          className="ms-3 flex gap-3 items-center font-semibold my-2 rounded-full focus:outline-none text-black hover:bg-SlateBlue hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray dark:hover:bg-primary text-sm py-1 px-3 "
                                          onClick={() => toggleSelect("Lead")}
                                        > <FaPlus /><span className='text-black text-sm font-semibold me-2 px-2.5 py-0.5 rounde'>Link an Lead</span>
                                        </button>
                                        <button
                                          type="submit"
                                          className="font-semibold my-2 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 "
                                          onClick={() =>
                                            togglemodelLead()}
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
                                        {activeAccordion !== "accordion-collapse-body-9" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                      </button>
                                    </h2>
                                    <div
                                      id="accordion-collapse-body-9"
                                      className={`  border border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion ===
                                        "accordion-collapse-body-9"
                                        ? "block"
                                        : "hidden"
                                        }`}
                                      aria-labelledby="accordion-collapse-heading-9"
                                    >
                                      <div className="">
                                        {OrganizationEdit?.project?.length > 0 ? (OrganizationEdit?.project?.map((x, index) => (
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
                                          className="font-semibold my-2 rounded-full focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 "
                                          onClick={() =>
                                            setProjectModal(true)}
                                        >
                                          <IoAddCircle />
                                        </button>
                                      </div>

                                    </div>
                                  </div>
                                  <div className="border p-4">
                                    <div className="flex">
                                      <p className="text-sm text-gray-500 dark:text-gray-400 "> Updated :- {moment(OrganizationEdit?.updatedDate).format('MMMM Do YYYY, h:mm a')}  </p>
                                    </div>
                                    <div className="flex">
                                      <p className="text-sm text-gray-500 dark:text-gray-400 "> Created :- {moment(OrganizationEdit?.createdDate).format('MMMM Do YYYY, h:mm a')}  </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="sm:col-span-12  md:col-span-12 lg:col-span-8 xl:col-span-8">
                            <HistoryView Data={OrganizationEdit} setLoadFirst={setLoadFirst} getAllVisible={getAllVisible} id={id} identityName='Organization' />
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
      {ProjectModal && (<AddProject toggleModal={toggleModalProject} setloadFrist={setLoadFirst} />)}
      {openDeal && <AddDeals toggleModal={toggleModal} setloadFrist={setLoadFirst} />}
      {openOrganization && (<AddEditOrganizations toggleModalOrganization={toggleModalOrganization} setLoadFist={setLoadFirst} />)}
      {openModelpeople && <AddEditPerson togglemodel={togglemodel} setLoadFirst={setLoadFirst} />}
      {openModelLead && (<AddLeads togglemodelLead={togglemodelLead} setLoadFistInbox={setLoadFirst} />)}

      {/* Deal model Table */}
      {openModelTable && (<DynamicTable columns={columns} data={OrganizationEdit?.deal} modelLabel={modelLabel} setOpenModal={setOpenModelTable} />)}

      {/* Organizations Tabls */}
      {openModelTableOrganizetion && (<RelatedOrganization id={id} store={store} OrganizationEdit={OrganizationEdit} setLoadFirst={setLoadFirst} setOpenModelTableOrganizetion={setOpenModelTableOrganizetion} />)}

      {/* openModelTablePeople Tabls */}
      {openModelTablePeople && (<DynamicTable columns={columnsPeople} data={OrganizationEdit?.person} modelLabel={modelLabel} setOpenModal={setOpenModelTablePeople} />)}

      {openSelect && (
        <LinkLeads
          link={link}
          toggleSelect={toggleSelect}
          linkOrg={linkData}
          setlinkOrg={setlinkData}
          updateLead={UpdateORG}
          Error={Error}
          Leadstore={Leadstore}
          Projectstore={Projectstore}
          Dealstore={Dealstore}
          Peoplestore={Peoplestore}
          dealID={dealID}
          setdealID={setdealID}
        />
      )}
      {openFields && <AddFields setopenFields={setopenFields} identityID={id} identityName={'Organization'} setLoadFirst={setLoadFirst} setopenGroupModal={setopenGroupModal} EditcustomField={EditcustomField} setEditcustomField={setEditcustomField} />}
      {openGroupModal && <AddGroupField setopenGroupModal={setopenGroupModal} GroupField={GroupField} setLoadFirst={setLoadFirst} setGroupField={setGroupField} />}

    </>
  );
};
export default DetailsOrganization;