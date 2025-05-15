/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaPlus } from "react-icons/fa6";
import IMG from "../../Images/widgets/Booster_video.svg";
import { TbPlayerPlay } from "react-icons/tb";
import { LuArrowUpRight } from "react-icons/lu";
import { MdContentCopy, MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { deleteChatBoot, getAllChatbotUser, getChatbootUserByID, getMarkAschatBoot, InsertChatboot } from "../../Redux/ChatSlice";
import sweetAlert from "../Common/sweetAlert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { formatDate } from "../Common/Common";
import Loading from "../Common/Loading";
import SetupChatbot from "./Chatbot_Setup";
import toast from "react-hot-toast";
import Pagination from "../Common/Pagination";
import { getMenuAll, getMenuPermission } from "../../Redux/SideBarSlice";

// shraddha
const ChatBot = ({ isVisible, setIsVisible, setSidebarOpen, sidebarOpen, isDark, setIsDark }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const ChatStore = useSelector((state) => state?.root?.Chat)
    const { user } = useSelector((state) => state.root.auth);

    const [activeTab, setActiveTab] = useState("dashboard");
    const [loading, setLoading] = useState(true);
    const [loadFrist, setloadFrist] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setrowsPerPage] = useState(10);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = ChatStore?.getAllchatUser?.slice(indexOfFirstRow, indexOfLastRow)
    const totalPages = Math.ceil(ChatStore?.getAllchatUser?.length / rowsPerPage);
    const [permissions, setPermissions] = useState({
        isDelete: false,
        isSave: false,
        isView: false,
    });

    useEffect(() => {
        dispatch(getMenuAll()).then((item) => {
            const findData = item?.payload?.data?.menu.reduce((result, menuItem) => {
                if (menuItem?.submenu && Array.isArray(menuItem?.submenu)) {
                    const submenuItem = menuItem?.submenu?.find((submenuItem) => submenuItem?.pageName === "Chatbot");
                    if (submenuItem) { result = submenuItem; }
                }
                return result;
            }, null);

            if (findData) {
                const ItemID = findData?.moduleID;
                const payload = { UserRoleID: user?.userRoleID, ModuleID: ItemID };
                dispatch(getMenuPermission(payload)).then((permissionItem) => {
                    if (Array.isArray(permissionItem?.payload?.data) && permissionItem?.payload?.data?.length > 0) {
                        setPermissions(permissionItem?.payload?.data[0]);
                    }
                });
            }
        });
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    useEffect(() => {
        if (loadFrist) {
            setLoading(true)
            dispatch(getAllChatbotUser({}))
                .then((res) => {
                    const timer = setTimeout(() => {
                        setLoading(false)
                    }, 1000);

                    return () => clearTimeout(timer);

                }).catch((error => {
                    setLoading(false)
                    console.log('error :>> ', error);
                }))
            setloadFrist(false)
        }
    }, [dispatch, loadFrist, ChatStore]);

    const handleTabClick = (tabId) => { setActiveTab(tabId); };

    const DeactiveChatBoot = (item) => {
        const payload = {
            ChatbotID: item?.chatbotID,
            Isactive: item?.isactive ? false : true,
        };

        dispatch(getMarkAschatBoot(payload)).then((res) => {
            if (res) {
                dispatch(getAllChatbotUser({}))
            }
        })
    }

    const DeleteChatBoot = async (id) => {
        try {
            const result = await sweetAlert.confirm(
                "Are you sure?",
                "You won't be able to revert this!"
            );

            if (result.isConfirmed) {
                await dispatch(deleteChatBoot(id)).then((res) => {
                    if (res.payload.status === true) {
                        setloadFrist(true);
                    }
                });
                sweetAlert.success("Deleted successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    };

    const handlerInsertChatBoot = async (returndata) => {
        const Payload = {
            ...returndata,
            chatbotID: 0,
            conversationID: 0,
            name: `${returndata?.name} Copy`,
        }

        const response = await dispatch(InsertChatboot(Payload))
        toast.remove()
        if (response) {
            setloadFrist(true)
            toast.success('ChatBot Duplicate Successfully!')
        }
    }

    const DuplicatechatBot = async (id) => {
        await dispatch(getChatbootUserByID(id)).then((res) => {
            const returndata = res?.payload?.data
            if (returndata) handlerInsertChatBoot(returndata)
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
            <Navbar isVisible={isVisible} setIsVisible={setIsVisible} isDark={isDark} setIsDark={setIsDark} />
            <div className="flex flex-1 ">
                <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
                    {loading && (<div className='h-screen'><Loading /></div>)}
                    {!loading && (
                        <>
                            <div className="xl:w-full">
                                <div className="flex flex-wrap">
                                    <div className="flex items-center py-4 w-full">
                                        <div className="w-full">
                                            <div className="">
                                                <div className="flex flex-wrap justify-between">
                                                    <div className="items-center ">
                                                        <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                                                            Chatbot
                                                        </h1>
                                                        <ol className="list-reset flex text-sm">
                                                            <li>
                                                                <a href="#" className="text-gray-500">
                                                                    Disploy
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <span className="text-gray-500 mx-2">/</span>
                                                            </li>
                                                            <li className="text-gray-500">Leads</li>
                                                            <li>
                                                                <span className="text-gray-500 mx-2">/</span>
                                                            </li>
                                                            <li className="text-blue-600 hover:text-blue-700">
                                                                Chatbot
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
                                    <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12">
                                        <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative p-5">
                                            {!loading && ChatStore?.getAllchatUser.length === 0 ? (<SetupChatbot />) : (
                                                <>
                                                    <div className="dark:text-slate-300/70 relative">
                                                        <h4 className="font-medium text-3xl antialiased ">Chatbot</h4>
                                                        <p>Customize your own chatbot and start capturing leads today</p>
                                                    </div>
                                                    <div className="flex-auto">
                                                        <div className="border-b border-gray-200 dark:border-gray-700 mb-4 flex justify-between">
                                                            <ul
                                                                className="flex flex-wrap-mb-px"
                                                                id="myTab"
                                                                role="tablist"
                                                            >
                                                                <li className="mr-2" role="presentation">
                                                                    <button
                                                                        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${activeTab === "dashboard"
                                                                            ? "border-gray-300"
                                                                            : ""
                                                                            }`}
                                                                        id="playbooks-tab"
                                                                        onClick={() => handleTabClick("dashboard")}
                                                                        type="button"
                                                                        role="tab"
                                                                        aria-controls="dashboard"
                                                                        aria-selected={activeTab === "dashboard"}
                                                                    >
                                                                        Playbooks
                                                                    </button>
                                                                </li>
                                                                <li className="mr-2" role="presentation">
                                                                    <button
                                                                        className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${activeTab === "settings"
                                                                            ? "border-gray-300"
                                                                            : ""
                                                                            }`}
                                                                        id="settings-tab"
                                                                        onClick={() => handleTabClick("settings")}
                                                                        type="button"
                                                                        role="tab"
                                                                        aria-controls="settings"
                                                                        aria-selected={activeTab === "settings"}
                                                                    >
                                                                        Settings
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                            {permissions?.isSave && (
                                                                <button
                                                                    data-modal-toggle="modal"
                                                                    className=" group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1  mb-3 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                                                                    onClick={() => navigate("/ChatBot/create")}
                                                                >
                                                                    <FaPlus className="mr-2 font-extrabold" size={15} />
                                                                    Playbook
                                                                </button>
                                                            )}
                                                        </div>

                                                        {!loading && activeTab === "dashboard" && (
                                                            <div
                                                                className="bg-gray-50 rounded-lg dark:bg-gray-800"
                                                                id="dashboard"
                                                                role="tabpanel"
                                                                aria-labelledby="playbooks-tab"
                                                            >
                                                                <div>
                                                                    <div className="relative scroll-inner shadow-md sm:rounded-lg mb-4">
                                                                        <table className="w-full text-center">
                                                                            <thead className="bg-gray-300 dark:bg-slate-700/20">
                                                                                <tr>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                                                                    >
                                                                                        ACTIVE PLAYBOOKS
                                                                                    </th>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="p-3 text-xs font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400"
                                                                                    >
                                                                                        VIEWED
                                                                                    </th>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="p-3 text-xs font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400"
                                                                                    >
                                                                                        CLICKED
                                                                                    </th>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="p-3 text-xs font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400"
                                                                                    >
                                                                                        QUALIFIED
                                                                                    </th>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="p-3 text-xs font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400"
                                                                                    >
                                                                                        DISQUALIFIED
                                                                                    </th>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="p-3 text-xs font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400"
                                                                                    >
                                                                                        STATUS
                                                                                    </th>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="p-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                                                                                    >
                                                                                        ACTIONS
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {
                                                                                    currentRows?.length > 0 ? (currentRows?.map((item, index) => (
                                                                                        <tr key={index} className="hover:bg-gray-100 bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                                                                                            <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white cursor-pointer capitalize text-left"
                                                                                            // onClick={() => navigate(`/ChatBot/create/${item?.chatbotID}`)}
                                                                                            >
                                                                                                <h3><a className="text-blue-500 antialiased ">{item?.name}</a></h3>
                                                                                                <p className="text-xs">Owner <span className="mx-2"> | </span>Created On {formatDate(item?.createdOn)} </p>
                                                                                            </td>
                                                                                            <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                                                                {item?.viewed}
                                                                                            </td>
                                                                                            <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                                                                {item?.clicked}
                                                                                            </td>
                                                                                            <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                                                                0
                                                                                            </td>
                                                                                            <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                                                                0
                                                                                            </td>
                                                                                            <td className={`p-3 text-sm  whitespace-nowrap text-center `}>
                                                                                                <span class={` text-sm  me-2 px-2.5 py-1.5 rounded  font-bold ${item?.isactive ? 'bg-green-100 text-green-700' : 'bg-rose-200  text-red-600'}`}>{item?.isactive ? 'ACTIVE' : 'INACTIVE'}</span>
                                                                                            </td>
                                                                                            <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                                                                <div className="flex justify-center gap-5">
                                                                                                    {permissions?.isSave && (
                                                                                                        <div data-tip data-for="Edit" className="relative flex flex-col items-center group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                                            onClick={() => navigate(`/ChatBot/create/${item?.chatbotID}`)}
                                                                                                        >
                                                                                                            <BiEdit />
                                                                                                            <div className="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                                                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Edit</span>
                                                                                                                <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )}
                                                                                                    {permissions?.isDelete && (
                                                                                                        <div
                                                                                                            data-tip
                                                                                                            data-for="Delete"
                                                                                                            className="relative flex-col group cursor-pointer text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                                            onClick={() => DeleteChatBoot(item?.chatbotID)}
                                                                                                        >
                                                                                                            <MdDeleteForever />
                                                                                                            <div className="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                                                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Delete</span>
                                                                                                                <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )}
                                                                                                    <div
                                                                                                        data-tip
                                                                                                        data-for="Duplicate"
                                                                                                        className="relative flex-col group cursor-pointer text-white bg-neutral-400 hover:bg-neutral-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                                        onClick={() => DuplicatechatBot(item?.chatbotID)}
                                                                                                    >
                                                                                                        <MdContentCopy />
                                                                                                        <div className="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                                            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Copy</span>
                                                                                                            <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                                                                        <input
                                                                                                            type="checkbox"
                                                                                                            className="sr-only peer"
                                                                                                            checked={item?.isactive}
                                                                                                            id={`Active_${item?.chatbotID}`}

                                                                                                            onChange={() => {
                                                                                                                DeactiveChatBoot(item)
                                                                                                            }}
                                                                                                        />
                                                                                                        <label
                                                                                                            htmlFor={`Active_${item?.chatbotID}`}

                                                                                                            className={`w-10 h-5  rounded-full flex items-center p-1 cursor-pointer peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-green-500 transition-colors duration-300 ease-in-out ${item?.isactive === true ? ' bg-green-500' : 'bg-red-500'}`}
                                                                                                        >
                                                                                                            <span className={`w-4 h-4  rounded-full shadow-md transform transition-transform duration-300 ease-in-out bg-white ${item?.isactive === true ? 'translate-x-5 ' : 'bg-white'}`}></span>
                                                                                                        </label>
                                                                                                    </label>

                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))) :
                                                                                        (<td colSpan={6}>
                                                                                            <p className="text-center p-2">Not Found.</p>
                                                                                        </td>)
                                                                                }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <Pagination setCurrentPage={setCurrentPage} handlePageChange={handlePageChange} currentPage={currentPage} sidebarOpen={sidebarOpen} totalPages={totalPages} length={ChatStore?.getAllchatUser?.length} setrowsPerPage={setrowsPerPage} rowsPerPage={rowsPerPage} name='ChatBots' />

                                                                </div>
                                                                <div className="xl:w-full  min-h-[calc(100vh-138px)] relative border-t-2 border-solid border-gray-200 pt-5">
                                                                    <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4 items-center">
                                                                        <div className="sm:col-span-12  md:col-span-5 lg:col-span-4 xl:col-span-4 ">
                                                                            <a
                                                                                href="#watch_video_pop"
                                                                                data-modal-toggle="modal"
                                                                                className="relative inline-block h-full"
                                                                            >
                                                                                <img
                                                                                    src={IMG}
                                                                                    alt="existing-leads"
                                                                                    className=" inline-block"
                                                                                />
                                                                                <span className="absolute w-20 h-20 top-10 top-2/4 left-1/2 rounded-full bg-red-500 flex items-center justify-center -ml-40">

                                                                                    <TbPlayerPlay className="text-white text-4xl" />
                                                                                </span>
                                                                                <span className="absolute right-3 bottom-4 p-2 bg-primary-500/10 text-primary-500 text-[11px] font-medium mr-1 px-2.5 py-0.5 rounded bg-white">
                                                                                    01:43
                                                                                </span>
                                                                            </a>
                                                                        </div>
                                                                        <div className="sm:col-span-12  md:col-span-7 lg:col-span-8 xl:col-span-8 ">
                                                                            <div className="taxt">
                                                                                <h3 className="font-medium text-3xl mb-2">
                                                                                    Generating leads with LeadBooster
                                                                                </h3>
                                                                                <p>
                                                                                    Learn how a chatbot will engage visitors and
                                                                                    automatically qualify leads on your website
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {activeTab === "settings" && (
                                                            <div
                                                                className="bg-gray-50 rounded-lg dark:bg-gray-800"
                                                                id="settings"
                                                                role="tabpanel"
                                                                aria-labelledby="settings-tab"
                                                            >
                                                                <div className="flex-auto p-4">
                                                                    <div className="flex items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            id="switch-1"
                                                                            className="hidden"
                                                                        />
                                                                        <label
                                                                            for="switch-1"
                                                                            id="switch_1"
                                                                            className="custom-switch relative border border-slate-300 mr-2 w-8 h-4 rounded-full bg-slate-50 dark:bg-slate-700 dark:border-slate-600 cursor-pointer"
                                                                        ></label>
                                                                        <label
                                                                            for="switch-1"
                                                                            className="dark:text-slate-400"
                                                                        >
                                                                            Track and save the chat conversion URL
                                                                        </label>
                                                                    </div>
                                                                    <p>
                                                                        You can track the specific page that your customer
                                                                        was on when the lead converted. A new custom field
                                                                        “Chat conversion URL” will be automatically added
                                                                        to store this information.
                                                                    </p>
                                                                    <p>
                                                                        <a href="#" className="text-blue-500 text-xl">
                                                                            Learn more about custom fields Customize your
                                                                            own chatbot and start capturing leads today
                                                                            <LuArrowUpRight className="text-3xl" />
                                                                        </a>
                                                                    </p>
                                                                </div>
                                                                <div className="flex-auto p-4">
                                                                    <div className="flex items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            id="switch-2"
                                                                            className="hidden"
                                                                            checked=""
                                                                        />
                                                                        <label
                                                                            for="switch-2"
                                                                            id="switch_2"
                                                                            className="custom-switch switch-green relative border  border-slate-300 mr-2 w-8 h-4 rounded-full bg-slate-50 dark:bg-slate-700 dark:border-slate-600 cursor-pointer"
                                                                        ></label>
                                                                        <label
                                                                            for="switch-2"
                                                                            className="dark:text-slate-400"
                                                                        >
                                                                            Capture unfinished conversation details
                                                                        </label>
                                                                    </div>
                                                                    <p>
                                                                        You can capture the provided contact details
                                                                        (email and phone number) even when the
                                                                        conversation hasn't been finished
                                                                    </p>
                                                                    <p>
                                                                        Save location: Leads Owner: bhavesh ·{" "}
                                                                        <a
                                                                            href="#"
                                                                            className="focus:outline-none text-[11px] bg-primary-500/10 text-primary-500 dark:text-primary-600 rounded font-medium py-[2px] px-2"
                                                                        >
                                                                            Edit
                                                                        </a>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Footer />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChatBot;
