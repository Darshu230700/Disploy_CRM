/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import Footer from '../Common/Footer';
import Sidebar from '../Common/Sidebar';
import Navbar from '../Common/Navbar';
import { FaPlus } from 'react-icons/fa6';
import Loading from '../Common/Loading';
import { useDispatch } from 'react-redux';
import { GetAllCategory, getAllGmailDetails, handleCheckCred } from '../../Redux/EmailSlice';
import { useSelector } from 'react-redux';
import { capitalizeFirstLetter, createMarkup } from '../Common/Common';
import Inbox from './Inbox';
import toast from 'react-hot-toast';
import EmailModal from './EmailModal';
import AddEmail from './AddEmail';



export default function Email({
    isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark,
}) {
    const store = useSelector((state) => state?.root?.Email);

    const dispatch = useDispatch()

    const [activeTab, setActiveTab] = useState(1)
    const [sendMail, setSendMail] = useState(false)
    const [loading, setloading] = useState(true);
    const [loadFrist, setloadFrist] = useState(true);
    const [SelectedMail, setSelectedMail] = useState("")
    const [pageSize, setPageSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState()
    const totalPages = Math.ceil(totalCount / pageSize);
    const [InboxData, setInboxData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(handleCheckCred({})).then((res) => {
            if (res?.payload?.status) {
                setShowModal(false)
            } else {
                toast.remove(res?.payload?.message)
                setShowModal(true)
                setloading(false)
            }
        }).catch((error) => {
            console.log('error :>> ', error);
            setloading(false)
        })
    }, [dispatch]);

    useEffect(() => {
        if (loadFrist) {
            dispatch(GetAllCategory({}))
                .then(({ payload }) => {
                    setloading(false)
                })
        }
        setloadFrist(false)
    }, [loadFrist, dispatch]);

    useEffect(() => {
        const payload = { GmailCategoryID: activeTab, PageNo: currentPage, limit: pageSize }

        dispatch(getAllGmailDetails(payload)).then((res) => {
            if (res?.payload?.status) {
                setInboxData(res?.payload?.data?.[0])
                setTotalCount(res?.payload?.data?.[1]?.totalRow)
            } else {
                setInboxData([])
                setTotalCount(0)
                setCurrentPage(1)
            }
        })
    }, [activeTab, currentPage, pageSize, dispatch])

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                <div className="page-wrapper re
                lative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
                    {loading && (<div className="h-screen"><Loading /></div>)}

                    <div className="xl:w-full">
                        <div className="flex flex-wrap">
                            <div className="flex items-center py-4 w-full">
                                <div className="w-full">
                                    <div className="">
                                        <div className="flex flex-wrap justify-between">
                                            <div className="items-center ">
                                                <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                                                    Email
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
                                                        Email
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  {!loading && (
                                <>

                                </>
                            )} */}
                    <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
                        <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative">
                            <div class="flex flex-col">
                                <section className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 pb-5">
                                    <h1 className="font-bold text-xl">Email</h1>
                                </section>

                                <div class="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
                                    <div
                                        class="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex">
                                        <div
                                            class="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark w-[300px]">

                                            <div class="px-4 pt-4">
                                                <button
                                                    class="flex w-full rounded-md bg-primary px-3.5 py-2.5 font-medium text-white items-center gap-2"
                                                    onClick={() => {
                                                        setSendMail(true)
                                                    }}>
                                                    <FaPlus />
                                                    <span>
                                                        Compose
                                                    </span>
                                                </button>
                                            </div>
                                            <div class="no-scrollbar max-h-full overflow-auto py-6">
                                                <ul class="flex flex-col gap-2" x-data="{ isActive: 'inbox' }">
                                                    {store?.category?.length > 0 && !loading && store?.category?.map((item, index) => {
                                                        return (
                                                            <li key={index}
                                                                onClick={() => { setActiveTab(item?.gmailCategoryID); setSelectedMail(""); setCurrentPage(1); setPageSize(20) }}
                                                            >
                                                                <a
                                                                    class={`${activeTab === item?.gmailCategoryID ? "bg-primary/5 before:!h-full" : ""} relative flex items-center gap-2.5 cursor-pointer px-5 py-2.5 font-medium duration-300 ease-linear before:absolute before:left-0 before:h-0 before:w-1 before:bg-primary before:duration-300 before:ease-linear hover:bg-primary/5 hover:text-primary hover:before:h-full `}
                                                                >
                                                                    <span
                                                                        dangerouslySetInnerHTML={createMarkup(item?.icon)}
                                                                        className='svg-icons '
                                                                    ></span>
                                                                    {capitalizeFirstLetter(item?.name)}
                                                                </a>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>

                                        </div>
                                        {!loading && (
                                            <Inbox InboxData={InboxData} setCurrentPage={setCurrentPage} setSelectedMail={setSelectedMail} SelectedMail={SelectedMail} totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} totalCount={totalCount} setPageSize={setPageSize} pageSize={pageSize} />
                                        )}

                                    </div>

                                </div>
                            </div>


                        </div>
                        <Footer />
                    </div>
                </div>
            </div>

            {showModal && <EmailModal setShowModal={setShowModal} setloadFrist={setloadFrist} />}
            {sendMail && <AddEmail setSendMail={setSendMail} setloadFrist={setloadFrist} />}
        </>
    )
}
