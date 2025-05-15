/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import Sidebar from '../../Common/Sidebar'
import Navbar from '../../Common/Navbar'
import Footer from '../../Common/Footer'
import Loading from '../../Common/Loading'
import { FaPlus } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { deleteAutoWebhook, deleteWebhook, getAllwebhooks, getAutowebhook } from '../../../Redux/SettingSlice'
import { useSelector } from 'react-redux'
import { MdDeleteForever } from 'react-icons/md'
import AddWebHook from './AddWebHook'
import { formatDate } from '../../Common/Common'
import sweetAlert from '../../Common/sweetAlert'
import AutomatedWebHook from './AutomatedWebHook'
import AddAutomatedWebhook from './AddAutomatedWebhook'

// shraddha
export default function WebHooks({ isVisible, setIsVisible, setSidebarOpen, sidebarOpen, isDark, setIsDark }) {
    const dispatch = useDispatch()
    const store = useSelector((state) => state?.root?.Settings)

    const [activeTab, setactiveTab] = useState('Webhooks')
    const [loadFirst, setloadFirst] = useState(true);
    const [loading, setloading] = useState(true);
    const [webhookModal, setwebhookModal] = useState(false);
    const [AutoWebhookModal, setAutoWebhookModal] = useState(false);

    useEffect(() => {
        if (loadFirst) {
            setloading(true)
            dispatch(getAllwebhooks({}))
            dispatch(getAutowebhook({}))
                .then((res) => {
                    setloading(false)
                }).catch((error) => console.log('error :>> ', error))
            setloadFirst(false)
        }
    }, [loadFirst]);

    const handleTabClick = (name) => { setactiveTab(name); setloadFirst(true) }

    const handlerDeleteWebHook = async (id) => {
        try {
            const result = await sweetAlert.confirm('Are you sure?', "Are you sure you want to delete this!");
            if (result.isConfirmed) {
                dispatch(deleteWebhook(id));
                setloadFirst(true)
                sweetAlert.success("Deleted successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    }

    const DeleteAutoWebHook = async (id) => {
        try {
            const result = await sweetAlert.confirm('Are you sure?', "Are you sure you want to delete this!");
            if (result.isConfirmed) {
                dispatch(deleteAutoWebhook(id));
                setloadFirst(true)
                sweetAlert.success("Deleted successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    }

    return (
        <div>
            <Sidebar
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                setSidebarOpen={setSidebarOpen}
                sidebarOpen={sidebarOpen}
            />
            <Navbar isVisible={isVisible} setIsVisible={setIsVisible} isDark={isDark} setIsDark={setIsDark} />

            <div className="flex flex-1 ">
                <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
                    <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
                        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                            <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 mt-9">
                                <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative p-5">
                                    <div className="dark:text-slate-300/70 relative">
                                        <h4 className="font-medium text-3xl">Webhooks</h4>
                                    </div>
                                    {loading && (<Loading />)}
                                    {!loading && (
                                        <div className="flex-auto">
                                            <div className="border-b border-gray-200 dark:border-gray-700 mb-4 flex justify-between">
                                                <ul
                                                    className="flex flex-wrap-mb-px"
                                                    id="myTab"
                                                    role="tablist"
                                                >
                                                    <li className="mr-2" role="presentation">
                                                        <button
                                                            className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${activeTab === "Webhooks"
                                                                ? "border-gray-300"
                                                                : ""
                                                                }`}
                                                            id="playbooks-tab"
                                                            onClick={() => handleTabClick("Webhooks")}
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="dashboard"
                                                            aria-selected={activeTab === "Webhooks"}
                                                        >
                                                            Webhooks
                                                        </button>
                                                    </li>
                                                    <li className="mr-2" role="presentation">
                                                        <button
                                                            className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${activeTab === "AutomatedWebhook"
                                                                ? "border-gray-300"
                                                                : ""
                                                                }`}
                                                            id="settings-tab"
                                                            onClick={() => handleTabClick("AutomatedWebhook")}
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="AutomatedWebhook"
                                                            aria-selected={activeTab === "AutomatedWebhook"}
                                                        >
                                                            Automated webhook
                                                        </button>
                                                    </li>
                                                </ul>
                                                {activeTab === "Webhooks" && (
                                                    <button
                                                        data-modal-toggle="modal"
                                                        className=" group focus:outline-none text-white bg-green-600 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1  mb-3 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                                                        onClick={() => setwebhookModal(!webhookModal)}
                                                    >
                                                        <FaPlus className="mr-2 font-extrabold" size={15} />
                                                        Webhooks
                                                    </button>
                                                )}
                                                {activeTab === "AutomatedWebhook" && (
                                                    <button
                                                        data-modal-toggle="modal"
                                                        className=" group focus:outline-none text-white bg-green-600 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1  mb-3 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                                                        onClick={() => setAutoWebhookModal(!AutoWebhookModal)}
                                                    >
                                                        <FaPlus className="mr-2 font-extrabold" size={15} />
                                                        Automated Webhook
                                                    </button>
                                                )}
                                            </div>
                                            {!loading && activeTab === "Webhooks" && (
                                                <div
                                                    className="bg-gray-50 rounded-lg dark:bg-gray-800"
                                                    id="dashboard"
                                                    role="tabpanel"
                                                    aria-labelledby="playbooks-tab"
                                                >
                                                    <h2 className='text-lg mb-3'>Your webhooks ({`${store?.getAllwebHooks?.length}/40`})</h2>
                                                    <div className="relative scroll-inner shadow-md sm:rounded-lg p-5">
                                                        <table className="w-full">
                                                            <thead className="bg-gray-50 dark:bg-slate-700/20">
                                                                <tr>
                                                                    <th
                                                                        scope="col"
                                                                        className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                                                    >
                                                                        Name
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                                                    >
                                                                        Events
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                                                    >
                                                                        Permission level
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                                                    >
                                                                        Endpoint URL
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                                                    >
                                                                        Version
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                                                    >
                                                                        Created
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
                                                                    store?.getAllwebHooks?.length > 0 ? (store?.getAllwebHooks.map((item, index) => (
                                                                        <tr key={index} className="hover:bg-gray-100 bg-white border-b dark:bg-gray-800 dark:border-gray-700" >

                                                                            <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white cursor-pointer capitalize" >
                                                                                <h3><a className="text-blue-500">{item?.webhookName}</a></h3>

                                                                            </td>
                                                                            <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                                                {item?.eventAction}.{item?.eventObject}
                                                                            </td>
                                                                            <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                                                {item?.permissionLevel}
                                                                            </td>
                                                                            <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                                                {item?.endPointURL}
                                                                            </td>
                                                                            <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                                                v1
                                                                            </td>
                                                                            <td className={`p-3 text-sm  whitespace-nowrap dark:text-gray-400 `}>
                                                                                {formatDate(item?.createdDate)}

                                                                            </td>
                                                                            <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                                                <div className="flex justify-center gap-4">
                                                                                    <div
                                                                                        data-tip
                                                                                        data-for="Delete"
                                                                                        className="relative flex-col group cursor-pointer text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                        onClick={() => handlerDeleteWebHook(item?.webhooksID)}
                                                                                    >
                                                                                        <MdDeleteForever />
                                                                                        <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                            <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Delete</span>
                                                                                            <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                        </div>
                                                                                    </div>
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

                                                </div>
                                            )}
                                            {!loading && activeTab === "AutomatedWebhook" && (
                                                <AutomatedWebHook data={store?.AutowebHook} DeleteAutoWebHook={DeleteAutoWebHook} />
                                            )}
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
            {webhookModal && (<AddWebHook setwebhookModal={setwebhookModal} setloadFirst={setloadFirst} />)}
            {AutoWebhookModal && (<AddAutomatedWebhook setAutoWebhookModal={setAutoWebhookModal} setloadFirst={setloadFirst} />)}
        </div>
    )
}
