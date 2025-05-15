/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Common/Sidebar'
import Navbar from '../../../Common/Navbar'
import { FaLocationCrosshairs, FaPlus } from 'react-icons/fa6'
import { MdDeleteForever, } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { ActiveDeactiveRules, getAllRules, getRuleByID, handlerDeleteRules } from '../../../../Redux/SettingSlice';
import { useSelector } from 'react-redux';
import Loading from '../../../Common/Loading';
import { BiEdit } from 'react-icons/bi';
import { LuFileLock } from 'react-icons/lu';
import { formatDate } from '../../../Common/Common';
import sweetAlert from '../../../Common/sweetAlert';
import AddRules from './AddRules';
import History from '../History/History';
import { AiOutlineDollar } from 'react-icons/ai';
import AddRulesDetails from './AddRulesDetails';
export default function Rules({
    isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark, }) {

    const dispatch = useDispatch()
    const store = useSelector((state) => state?.root?.Settings)
    const [Tab, setTab] = useState("Rules");
    const [loading, setLoading] = useState(true);
    const [loadFrist, setloadFrist] = useState(true);
    const [OpenRuleModal, setOpenRuleModal] = useState(false);
    const [RuleDetailsModal, setRuleDetailsModal] = useState(false);
    const [EditData, setEditData] = useState([]);
    const [filterules, setfilterules] = useState('Deal added');

    useEffect(() => {
        if (loadFrist) {
            setLoading(true)
            dispatch(getAllRules({}))
                .then((res) => {
                    const timer = setTimeout(() => {
                        setLoading(false)
                    }, 1000);
                    return () => clearTimeout(timer);

                }).catch((error => {
                    console.log('error :>> ', error);
                }))
            setloadFrist(false)
        }
    }, [loadFrist]);

    const handleTab = (tabId) => { setTab(tabId); };
    const handleRulesdata = (name) => { setfilterules(name); };

    const dealAddedRulesCount = store?.getallRules?.filter(item => item?.event === 'Deal added').length || 0;
    const dealUpdatedRulesCount = store?.getallRules?.filter(item => item?.event === 'Deal updated').length || 0;
    const leadAddedRulesCount = store?.getallRules?.filter(item => item?.event === 'Lead added').length || 0;
    const filteredRules = store?.getallRules?.filter(item => filterules === item?.event) || [];

    const DeactiveRules = async (item) => {
        const payload = {
            RuleID: item.ruleID,
            IsActive: item?.isActive === true ? false : true,
        };
        await dispatch(ActiveDeactiveRules(payload)).then((res) => {
            if (res) { setloadFrist(true) }
        })
    }

    const DeleteRules = async (id) => {
        try {
            const result = await sweetAlert.confirm(
                "Are you sure?",
                "You won't be able to revert this!"
            );

            if (result.isConfirmed) {
                await dispatch(handlerDeleteRules(id)).then((res) => {
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
    }

    const HandlerEditRules = async (id) => {
        await dispatch(getRuleByID(id)).then((res) => {
            setEditData(res?.payload?.data)
            setRuleDetailsModal(true)
        }).catch((error) =>
            console.log('error :>> ', error)
        )
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
                                    <div className="flex flex-wrap justify-between">
                                        <div className="items-center ">
                                            <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                                                Tools and apps
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
                                                    Automatic assignment
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
                        <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative">
                            <div className="flex-auto pb-4">
                                <div className="border-b border-gray-200 dark:border-gray-700 mb-4 flex justify-between">
                                    <ul
                                        className="flex flex-wrap-mb-px"
                                        id="myTab"
                                        role="tablist"
                                    >
                                        <li className="mr-2" role="presentation">
                                            <button
                                                className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${Tab === "Rules"
                                                    ? "border-gray-300"
                                                    : ""
                                                    }`}
                                                id="Rules-tab"
                                                onClick={() => handleTab("Rules")}
                                                type="button"
                                                role="tab"
                                                aria-controls="Rules"
                                                aria-selected={Tab === "Rules"}
                                            >
                                                Rules
                                            </button>
                                        </li>
                                        <li className="mr-2" role="presentation">
                                            <button
                                                className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${Tab === "History"
                                                    ? "border-gray-300"
                                                    : ""
                                                    }`}
                                                id="History-tab"
                                                onClick={() => handleTab("History")}
                                                type="button"
                                                role="tab"
                                                aria-controls="History"
                                                aria-selected={Tab === "History"}
                                            >
                                                History
                                            </button>
                                        </li>
                                    </ul>
                                    <button
                                        data-modal-toggle="modal"
                                        className=" group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-4   mb-3 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                                        onClick={() => setOpenRuleModal(true)}
                                    >
                                        <FaPlus className="mr-2 font-extrabold" size={15} />
                                        Rules
                                    </button>
                                </div>
                                {loading && (<div className='h-screen'><Loading /></div>)}
                                {!loading && Tab === "Rules" && (
                                    <>
                                        <div className="flex items-center justify-start mb-4">
                                            <span className={`flex items-center text-sm font-medium me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none cursor-pointer ${filterules === 'Deal added' ? 'bg-blue-100' : ''}`}
                                                onClick={() => handleRulesdata('Deal added')}
                                                aria-selected={filterules === 'Deal added'}
                                            >
                                                <AiOutlineDollar className="ti ti-coin mr-2" /> Deal added ({dealAddedRulesCount})
                                            </span>
                                            <span className={`flex items-center text-sm font-medium me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none cursor-pointer  ${filterules === 'Deal updated' ? 'bg-blue-100' : ''}`}
                                                aria-selected={filterules === 'Deal updated'}
                                                onClick={() => handleRulesdata('Deal updated')}
                                            >
                                                <AiOutlineDollar className="ti ti-coin mr-2" /> Deal updated ({dealUpdatedRulesCount})
                                            </span>
                                            <span className={`flex items-center text-sm font-medium me-2 px-3 py-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none cursor-pointer  ${filterules === 'Lead added' ? 'bg-blue-100' : ''}`}
                                                aria-selected={filterules === 'Lead added'}
                                                onClick={() => handleRulesdata('Lead added')}
                                            >
                                                <FaLocationCrosshairs className="ti ti-current-location mr-2" /> Lead added ({leadAddedRulesCount})
                                            </span>
                                        </div>
                                        {
                                            filteredRules.length > 0 ? (
                                                <div
                                                    className="bg-gray-50 rounded-lg dark:bg-gray-800"
                                                    id="dashboard"
                                                    role="tabpanel"
                                                    aria-labelledby="playbooks-tab"
                                                >
                                                    <div className="relative scroll-inner shadow-md sm:rounded-lg mb-4">
                                                        <table className="w-full">
                                                            <thead className="bg-gray-50 dark:bg-slate-700/20">
                                                                <tr >
                                                                    <th scope="col" className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                                        RULE NAME
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="p-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                                                                    >
                                                                        DESCRIPTION
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="p-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
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
                                                                    filteredRules.map((item, index) => (
                                                                        <tr key={index} className="hover:bg-gray-100 bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                                                                            <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white cursor-pointer ">
                                                                                <h3><a className="text-blue-500 capitalize">{item?.ruleName} </a></h3>
                                                                                <p className="text-xs capitalize">{item?.assigneeType} <span className="mx-2"> | </span>Updated  at {formatDate(item?.updatedDate)} </p>
                                                                            </td>
                                                                            <td className="p-3   text-center text-sm text-gray-500 dark:text-gray-400 max-w-36 truncate capitalize">
                                                                                {item?.ruleDescription}
                                                                            </td>
                                                                            <td className={`p-3 text-sm  text-center dark:text-gray-400 ${item?.isActive ? "text-green" : "text-rose-500"}`}>
                                                                                {item?.isActive === true ? 'ACTIVE' : "INACTIVE"}
                                                                            </td>
                                                                            <td className="p-3 text-sm text-gray-500  dark:text-gray-400">
                                                                                <div className="flex justify-center gap-4">
                                                                                    <div data-tip data-for="Edit" className="relative flex flex-col items-center group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                        onClick={() => HandlerEditRules(item?.ruleID)}
                                                                                    >
                                                                                        <BiEdit />
                                                                                        <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                            <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Edit</span>
                                                                                            <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        data-tip
                                                                                        data-for="Delete"
                                                                                        className="relative flex-col group cursor-pointer text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                        onClick={() => DeleteRules(item?.ruleID)}
                                                                                    >
                                                                                        <MdDeleteForever />
                                                                                        <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                            <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Delete</span>
                                                                                            <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        data-tip
                                                                                        data-for="Deactive"
                                                                                        className="relative flex-col group cursor-pointer text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                        onClick={() => DeactiveRules(item)}
                                                                                    >
                                                                                        <LuFileLock />
                                                                                        <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                            <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">{item?.isActive ? 'INACTIVE' : "ACTIVE"}</span>
                                                                                            <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="" id="Rules" role="tabpanel" aria-labelledby="Rules-tab">
                                                    <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                                                        <div className="sm:col-span-12 mx-auto">
                                                            <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative mb-4">
                                                                <div className="flex-auto p-4">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={480} height={240} fill="none" viewBox="0 0 480 240">
                                                                        <circle cx={312} cy={120} r={84} fill="#E9F3F8" />
                                                                        <path stroke="#68AAD0" strokeWidth={2} d="M321.725 104.573h1V85.588c0-.277.147-.459.328-.541a.467.467 0 01.544.099l.688-.718-.688.718 34.728 33.248c.9.861.9 2.351 0 3.212l-34.728 33.248a.466.466 0 01-.544.099.565.565 0 01-.328-.541v-19.566h-37.669c-1.102 0-2.056-.936-2.056-2.169v-25.935c0-1.233.954-2.169 2.056-2.169h36.669z" />
                                                                        <rect width="233.629" height="31.714" x={27} y={46} fill="#93C2DE" rx={4} />
                                                                        <rect width="63.825" height="5.55" x="71.4" y="58.95" fill="#fff" rx="2.775" />
                                                                        <rect width="9.25" height="9.25" x="238.957" y="57.1" fill="#fff" rx="4.625" />
                                                                        <rect
                                                                            width="9.25"
                                                                            height="9.25"
                                                                            x="223.232"
                                                                            y="57.1"
                                                                            fill="#fff"
                                                                            rx="4.625"
                                                                        />
                                                                        <path
                                                                            fill="#fff"
                                                                            d="M41.604 67.275h6.55V66.02h-2.383V55.667h-1.165c-.636.382-1.4.673-2.474.855v.983h2.129v8.515h-2.657v1.255z"
                                                                        />
                                                                        <rect
                                                                            width="24.42"
                                                                            height="11.1"
                                                                            x="184.382"
                                                                            y="56.175"
                                                                            fill="#fff"
                                                                            rx="5.55"
                                                                        />
                                                                        <circle cx="203.113" cy="61.725" r="3.469" fill="#93C2DE" />
                                                                        <rect
                                                                            width="233.629"
                                                                            height="29.6"
                                                                            x={27}
                                                                            y="87.229"
                                                                            fill="#fff"
                                                                            stroke="#93C2DE"
                                                                            strokeWidth="1.5"
                                                                            rx={4}
                                                                        />
                                                                        <rect
                                                                            width="63.825"
                                                                            height="5.55"
                                                                            x="71.4"
                                                                            y="98.725"
                                                                            fill="#C0C1C4"
                                                                            rx="2.775"
                                                                        />
                                                                        <rect
                                                                            width="9.25"
                                                                            height="9.25"
                                                                            x="238.957"
                                                                            y="97.8"
                                                                            fill="#D7D7D9"
                                                                            rx="4.625"
                                                                        />
                                                                        <rect
                                                                            width="9.25"
                                                                            height="9.25"
                                                                            x="223.232"
                                                                            y="97.8"
                                                                            fill="#D7D7D9"
                                                                            rx="4.625"
                                                                        />
                                                                        <path
                                                                            fill="#A9ABAF"
                                                                            d="M40.895 107.05h7.496v-1.292h-3.475c-.6 0-1.31.037-1.947.091 2.82-2.875 4.858-4.967 4.858-7.223 0-2.038-1.347-3.402-3.493-3.402-1.492 0-2.53.71-3.494 1.8l.855.82c.655-.764 1.492-1.383 2.456-1.383 1.474 0 2.202.928 2.202 2.256 0 1.874-2.001 4.021-5.458 7.405v.928z"
                                                                        />
                                                                        <rect
                                                                            width="233.629"
                                                                            height="29.6"
                                                                            x={27}
                                                                            y="125.286"
                                                                            fill="#fff"
                                                                            stroke="#A9CEE4"
                                                                            strokeWidth="1.5"
                                                                            rx={4}
                                                                        />
                                                                        <rect
                                                                            width="63.825"
                                                                            height="5.55"
                                                                            x="71.4"
                                                                            y="137.575"
                                                                            fill="#D7D7D9"
                                                                            rx="2.775"
                                                                        />
                                                                        <rect
                                                                            width="9.25"
                                                                            height="9.25"
                                                                            x="238.957"
                                                                            y="136.65"
                                                                            fill="#E1E1E3"
                                                                            rx="4.625"
                                                                        />
                                                                        <rect
                                                                            width="9.25"
                                                                            height="9.25"
                                                                            x="223.232"
                                                                            y="136.65"
                                                                            fill="#E1E1E3"
                                                                            rx="4.625"
                                                                        />
                                                                        <path
                                                                            fill="#A9ABAF"
                                                                            d="M44.461 146.118c2.129 0 3.839-1.255 3.839-3.311 0-1.601-1.11-2.62-2.51-2.948v-.072c1.255-.473 2.092-1.365 2.092-2.766 0-1.874-1.456-2.947-3.476-2.947-1.364 0-2.438.618-3.33 1.455l.801.946c.692-.673 1.51-1.164 2.475-1.164 1.237 0 2.001.709 2.001 1.819 0 1.219-.837 2.165-3.293 2.165v1.147c2.766 0 3.712.928 3.712 2.31 0 1.292-1.001 2.111-2.402 2.111-1.365 0-2.274-.637-2.966-1.365l-.764.983c.782.855 1.965 1.637 3.821 1.637z"
                                                                        />
                                                                        <rect
                                                                            width="233.629"
                                                                            height="29.6"
                                                                            x={27}
                                                                            y="164.4"
                                                                            fill="#fff"
                                                                            stroke="#BEDAEB"
                                                                            strokeWidth="1.5"
                                                                            rx={4}
                                                                        />
                                                                        <rect
                                                                            width="63.825"
                                                                            height="5.55"
                                                                            x="71.4"
                                                                            y="176.425"
                                                                            fill="#E1E1E3"
                                                                            rx="2.775"
                                                                        />
                                                                        <rect
                                                                            width="9.25"
                                                                            height="9.25"
                                                                            x="238.957"
                                                                            y="175.5"
                                                                            fill="#E1E1E3"
                                                                            rx="4.625"
                                                                        />
                                                                        <rect
                                                                            width="9.25"
                                                                            height="9.25"
                                                                            x="223.232"
                                                                            y="175.5"
                                                                            fill="#E1E1E3"
                                                                            rx="4.625"
                                                                        />
                                                                        <path
                                                                            fill="#A9ABAF"
                                                                            d="M40.118 181.484v-1.189l5.244-8.297h.862v1.842h-.583l-3.962 6.269v.093h7.062v1.282h-8.623zm5.617 2.447v-11.933h1.375v11.933h-1.375z"
                                                                        />
                                                                        <g clipPath="url(#clip0_1407_87616)">
                                                                            <rect
                                                                                width={52}
                                                                                height={52}
                                                                                x={406}
                                                                                y={28}
                                                                                fill="#C9E0EE"
                                                                                rx={26}
                                                                            />
                                                                            <path
                                                                                fill="#565961"
                                                                                d="M422.509 36.627c-4.528 4.934-.332 15.094-3.189 17.743-5.052 4.682-4.631 12.657-4.631 12.657h26.958s3.91-2.293 3.91-8.293c0-6.025-1.805-9.227-1.805-13.444 0-7.46-4.677-12.165-7.97-12.843-2.113-.436-5.556-.565-6.997 1.017 0 0-3.28-.101-6.276 3.163z"
                                                                            />
                                                                            <path
                                                                                fill="#68AAD0"
                                                                                d="M444.007 61.8l10.083 23.295c.248.574.376 1.192.376 1.818v33.461h-46.903V88.099c0-.61.103-1.215.305-1.79.081-.232.199-.448.33-.656L423.305 61.8h20.702z"
                                                                            />
                                                                            <path
                                                                                fill="#68AAD0"
                                                                                d="M408.08 75.6c0-7.621 6.178-13.8 13.8-13.8h5.44v58.76h-19.24V75.6zM441.251 61.8h3.606c6.84 0 12.897 4.416 14.99 10.928l15.313 47.646h-33.909V61.8z"
                                                                            />
                                                                            <path
                                                                                fill="#A9ABAF"
                                                                                d="M442.839 48.687c0-1.248-1.034-2.26-2.31-2.26a4.658 4.658 0 00-3.182-4.344l-4.6-1.536a4.84 4.84 0 01-4.839 4.84h-3.549v6.654c0 .273.014.543.042.809.291 2.807 2.083 5.18 4.578 6.34v5.282c0 1.873 1.551 3.39 3.465 3.39s3.465-1.517 3.465-3.39v-5.281c2.466-1.147 4.244-3.478 4.567-6.242a7.79 7.79 0 00.053-.908v-1.094c1.276 0 2.31-1.012 2.31-2.26z"
                                                                            />
                                                                            <path
                                                                                fill="#6E737C"
                                                                                d="M429.824 54.844s.965-.63 2.415-.63c1.45 0 2.416.63 2.416.63s-.858 1.47-2.416 1.47c-1.558 0-2.415-1.47-2.415-1.47z"
                                                                            />
                                                                        </g>
                                                                        <g clipPath="url(#clip1_1407_87616)">
                                                                            <rect
                                                                                width={52}
                                                                                height={52}
                                                                                x={406}
                                                                                y="159.131"
                                                                                fill="#4797C6"
                                                                                rx={26}
                                                                            />
                                                                            <path
                                                                                fill="#fff"
                                                                                d="M455.422 224.332l-15.424-28.563h-15.996l-15.424 28.563v34.276h46.844v-34.276z"
                                                                            />
                                                                            <path
                                                                                fill="#6E737C"
                                                                                d="M391.44 240.899l11.461-33.535a17.137 17.137 0 0116.217-11.595h6.598v65.124a5.713 5.713 0 01-5.713 5.713h-10.282v17.709c-10.096 0-18.281-8.184-18.281-18.281v-25.135zM472.56 240.899l-13.64-33.773c-2.814-6.871-4.814-11.357-12.067-11.357h-7.427v65.124a5.713 5.713 0 005.713 5.713h9.14v17.709c10.097 0 18.281-8.184 18.281-18.281v-25.135z"
                                                                            />
                                                                            <path
                                                                                fill="#F5F5F6"
                                                                                d="M441.848 176.322c0 10.243-4.896 10.243-10.936 10.243-6.041 0-13.913-3.428-10.937-10.243 2.976-6.815 4.374-13.103 10.937-10.243 6.076-1.907 10.936 3.334 10.936 10.243z"
                                                                            />
                                                                            <path
                                                                                fill="#D7D7D9"
                                                                                d="M423.584 175.112v3.62a2.413 2.413 0 100 4.826v.604a8.452 8.452 0 004.826 7.633v5.639a3.62 3.62 0 007.24 0v-5.639a8.452 8.452 0 004.826-7.633v-.604a2.413 2.413 0 100-4.826v-.033a5.396 5.396 0 00-5.396-5.397h-3.972a4.364 4.364 0 01-3.904-2.413l-.544 1.903a3.2 3.2 0 01-3.076 2.32z"
                                                                            />
                                                                            <path
                                                                                fill="#6E737C"
                                                                                d="M434.6 186.82s-1.013 1.171-2.34 1.171-2.34-1.171-2.34-1.171 1.021-.649 2.348-.649a4.72 4.72 0 012.332.649z"
                                                                            />
                                                                        </g>
                                                                        <g clipPath="url(#clip2_1407_87616)">
                                                                            <rect
                                                                                width={52}
                                                                                height={52}
                                                                                x={406}
                                                                                y="93.564"
                                                                                fill="#68AAD0"
                                                                                rx={26}
                                                                            />
                                                                            <path
                                                                                fill="#C9E0EE"
                                                                                d="M393.52 161.334l9.36-25.051c2.425-5.922 8.316-9.789 14.568-9.789h25.472c8.616 0 16.64 6.984 16.64 15.6v19.24h-66.04z"
                                                                            />
                                                                            <path
                                                                                fill="#565961"
                                                                                d="M428.568 115.548c-1.92-1.446-3.571-2.614-4.636-4.307-1.061-1.699-1.531-3.92-1.113-6.095.419-2.176 1.723-4.298 3.581-5.208 1.862-.913 4.273-.614 6.959-.58 2.686.032 5.646-.2 6.843 1.134 1.193 1.337.628 4.249.327 6.788-.306 2.535-.341 4.704-1.244 6.833-.901 2.133-2.66 4.23-4.636 4.418-1.971.186-4.161-1.54-6.081-2.983z"
                                                                            />
                                                                            <path
                                                                                fill="#F5F5F6"
                                                                                d="M439.416 115.399v3.656a5.203 5.203 0 01-3.239 4.819v4.025a4.683 4.683 0 11-9.365 0v-4.127a5.203 5.203 0 01-3.005-4.717v-3.656a2.342 2.342 0 010-4.654v-.015h1.041l1.04-6.243h11.447l1.04 6.243h1.041v.015a2.341 2.341 0 010 4.654z"
                                                                            />
                                                                            <path
                                                                                fill="#565961"
                                                                                d="M426.409 120.096l4.162-2.081a1.626 1.626 0 002.081 0l4.162 2.081c.862 0 1.561-.699 1.561-1.561v-3.122c0-.575.466-1.04 1.041-1.04v5.202a7.285 7.285 0 01-7.284 7.285h-1.041a7.285 7.285 0 01-7.284-7.285v-5.202a1.04 1.04 0 011.041 1.04v3.122c0 .862.699 1.561 1.561 1.561z"
                                                                            />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_1407_87616">
                                                                                <rect
                                                                                    width={52}
                                                                                    height={52}
                                                                                    x={406}
                                                                                    y={28}
                                                                                    fill="#fff"
                                                                                    rx={26}
                                                                                />
                                                                            </clipPath>
                                                                            <clipPath id="clip1_1407_87616">
                                                                                <rect
                                                                                    width={52}
                                                                                    height={52}
                                                                                    x={406}
                                                                                    y="159.131"
                                                                                    fill="#fff"
                                                                                    rx={26}
                                                                                />
                                                                            </clipPath>
                                                                            <clipPath id="clip2_1407_87616">
                                                                                <rect
                                                                                    width={52}
                                                                                    height={52}
                                                                                    x={406}
                                                                                    y="93.564"
                                                                                    fill="#fff"
                                                                                    rx={26}
                                                                                />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </div>
                                                                {/*end card-body*/}
                                                            </div>{" "}
                                                            {/*end card*/}
                                                            <h3 className="text-2xl text-center mb-4">
                                                                Automate lead routing.{" "}
                                                                <strong>Follow up faster and increase conversion.</strong>
                                                            </h3>
                                                        </div>
                                                        {/*end col*/}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </>
                                )}
                                {
                                    !loading && Tab === "History" && (<History />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {OpenRuleModal && <AddRules setOpenRuleModal={setOpenRuleModal} setloadFrist={setloadFrist} />}
            {RuleDetailsModal && <AddRulesDetails setOpenRuleModal={setRuleDetailsModal} setRuleDetailsModal={setRuleDetailsModal} setloadFrist={setloadFrist} EditData={EditData} SelecteEvent={EditData?.event} />}
        </>
    )
}
