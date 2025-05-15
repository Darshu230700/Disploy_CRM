/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import Activity from './activity';
import Note from './note';
import CallTabs from './CallTabs';
import EmailTabs from './emailTabs';
import FileUpload from './fileUpload';
import Documents from './documents';
import { CgAttachment } from 'react-icons/cg';
import { BiNote } from 'react-icons/bi';
import moment from 'moment';
import sweetAlert from './sweetAlert';
import { useDispatch } from 'react-redux';
import { ImageUrl } from './API';
import { DeleteHistory, getByIdApiActivity } from '../../Redux/CommonSlice';
import ShareFile from './shareFile';
import PdfView from './pdfView';
import FolderCreator from './creatFolder';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { moveToFolderAction } from '../../Redux/organizationSlice';
import toast from 'react-hot-toast';
import DOMPurify from 'dompurify';
import { FaRegImage } from 'react-icons/fa6';
import { PiFolderOpenBold } from 'react-icons/pi';

export default function HistoryView({ Data, setLoadFirst, getAllVisible, id, identityName }) {
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState('activity');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [editNoteData, setEditNoteData] = useState([]);
    const [editActivityData, setEditActivityData] = useState([]);
    const [pdfViewData, setPdfUrl] = useState('');
    const [copy, setCopy] = useState(false);
    const [copyUrl, setCopyUrl] = useState('');
    const [pdfOpen, setPdfOpen] = useState(false);
    const [isDoubleDropdownOpen, setIsDoubleDropdownOpen] = useState(false);


    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setEditNoteData([])
        setEditActivityData([])
    };

    const handleCancel = () => { setEditActivityData([]); }

    const toggleDropdown = (index) => {
        const newDropdownState = getAllVisible?.getHistory?.map((_, i) => i === index ? !isDropdownOpen[index] : false);
        setIsDropdownOpen(newDropdownState);
    };

    const toggleDoubleDropdown = () => { setIsDoubleDropdownOpen(!isDoubleDropdownOpen); };

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

    const shareFile = (item) => { setCopyUrl(item?.filePath); setCopy(true); }

    const pdfView = (item) => { setPdfUrl(item); setPdfOpen(true); }

    const deleteHistory = async (item) => {
        try {
            const query = { type: item.type, id: item.id };
            const result = await sweetAlert.confirm(
                "Are you sure?",
                "Are you sure you want to delete this!"
            );
            if (result.isConfirmed) {
                dispatch(DeleteHistory(query)).then((res) => {
                    if (res.payload?.status === true) {
                        sweetAlert.success("Deleted successfully");
                        setLoadFirst(true)
                        setEditNoteData([])
                        setEditActivityData([])
                    }
                })
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    };

    const editNotes = async (item) => {
        if (item.type === "notes") {
            setEditNoteData(item)
            setActiveTab('note')
        } else {
            const res = await dispatch(getByIdApiActivity(item.id))
            const data = res.payload.data
            setEditActivityData(data)
            setActiveTab('activity')
        }
    }

    const MoveTo = (item, itemFolder) => {
        const payload = {
            folderID: itemFolder?.folderID,
            documentID: item?.id,
            type: item?.type,
            operation: "Insert",
            userID: 1
        }

        dispatch(moveToFolderAction(payload)).then((res) => {
            if (res.payload.status === 200) {
                toggleDropdown(true);
                toggleDoubleDropdown(true)
                setLoadFirst(true)
                toast.success("Move Successfully!");
            }
        })
    }

    return (
        <>

            <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3">
                <div className=" border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li className="me-2">
                            <button
                                onClick={() => handleTabClick('activity')}
                                className={`inline-flex items-center justify-center px-4 py-2 border-b-2 ${activeTab === 'activity'
                                    ? 'border-transparent rounded-t-lg hover:text-gray-600 hover:border-blue-600 dark:hover:text-gray-300 group bg-blue-600 text-white hover:text-white'
                                    : 'border-blue-600'
                                    }`}
                            >
                                Activity
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
                        {identityName !== 'lead' && (
                            <>
                                <li className="me-2">
                                    <button
                                        onClick={() => handleTabClick('call')}
                                        className={`inline-flex items-center justify-center px-4 py-2 border-b-2 ${activeTab === 'call'
                                            ? 'border-transparent rounded-t-lg hover:text-gray-600 hover:border-blue-600 dark:hover:text-gray-300 group bg-blue-600 text-white hover:text-white'
                                            : 'border-blue-600'
                                            }`}
                                    >
                                        Call
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
                            </>
                        )}
                        {identityName === 'Organization' && (
                            <li className="me-2">
                                <button
                                    onClick={() => handleTabClick("folder")}
                                    className={`inline-flex items-center justify-center px-4 py-2 border-b-2 ${activeTab === "folder"
                                        ? "border-blue-600 rounded-t-lg hover:text-white hover:border-blue-600 dark:hover:text-gray-300 group bg-blue-600 text-white"
                                        : "border-blue-600"
                                        }`}
                                >
                                    Folder
                                </button>
                            </li>
                        )}
                    </ul>
                    <hr className="mb-5" />
                    {activeTab === 'activity' && <Activity leadData={Data} editActivityData={editActivityData} setLoadFist={setLoadFirst} identityID={id} identityName={identityName} handleCancel={handleCancel} />}
                    {activeTab === 'note' && <Note editNoteData={editNoteData} setEditNoteData={setEditNoteData} identityID={id} identityName={identityName} setLoadFirst={setLoadFirst} />}
                    {activeTab === 'call' && <CallTabs />}
                    {activeTab === 'email' && <EmailTabs />}
                    {activeTab === 'files' && <FileUpload identityID={id} identityName={identityName} getAllVisible={getAllVisible} setLoadFirst={setLoadFirst} />}
                    {activeTab === 'documents' && <Documents identityID={id} identityName={identityName} setLoadFirst={setLoadFirst} getAllVisible={getAllVisible} />}
                    {activeTab === "folder" && (<FolderCreator identityID={id} identityName={identityName} setLoadFirst={setLoadFirst} getAllVisible={getAllVisible} />)}
                </div>
            </div>

            <div className='mt-5'>
                <label className='text-3xl font-bold' >History</label>
                {getAllVisible && getAllVisible.getHistory?.length > 0 && getAllVisible.getHistory?.map((item, index) => {
                    const sanitizedHtml = DOMPurify.sanitize(item?.title);

                    return (
                        <ol class="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400" key={index}>
                            <li class="mb-10 ms-6">
                                <span class="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                                    {item.type === "document" ? <CgAttachment /> : item.type === "attachment" ? <FaRegImage /> : item.type === "Folder" ? <PiFolderOpenBold /> : <BiNote />}
                                </span>
                                <div className='flex items-center gap-3'>
                                    <div className=" dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3 flex justify-between">
                                        <div>
                                            {item?.type !== 'notes' && (
                                                <div className="font-semibold text-black capitalize" key={index} >{item?.title}</div>
                                            )}
                                            {item?.type === 'notes' && (
                                                <div className="text-sm text-black capitalize truncate-multi-line" key={index} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
                                            )}
                                            <small className="font-semibold text-black" >{moment(item?.updatedDate ? item?.updatedDate : item?.createdDate).format('MMMM Do YYYY : h:mm:ss a')}</small>
                                        </div>
                                        <div>
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
                                                    className="border absolute z-10 bg-white right-0 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
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
                                                        {item?.type !== "notes" && item?.type !== "activity" && item?.type !== "Folder" && (
                                                            <li>
                                                                <a
                                                                    href="#"
                                                                    className="block px-3 py-1 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-950 dark:hover:text-white"
                                                                    onClick={() => {
                                                                        pdfView(item)
                                                                        toggleDropdown(index, true);
                                                                    }}
                                                                >
                                                                    Preview Document
                                                                </a>
                                                            </li>
                                                        )}
                                                        {item?.type !== "notes" && item?.type !== "activity" && item?.type !== "Folder" && (
                                                            <li>
                                                                <a
                                                                    href="#"
                                                                    className="block px-3 py-1 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-950 dark:hover:text-white"
                                                                    onClick={() => { shareFile(item); toggleDropdown(index, true); }}
                                                                >
                                                                    Share as link
                                                                </a>
                                                            </li>
                                                        )}
                                                        {item?.type !== "notes" && item?.type !== "activity" && item?.type !== "Folder" && (
                                                            <li>
                                                                <a
                                                                    href="#"
                                                                    className="block px-3 py-1 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-950 dark:hover:text-white"
                                                                    onClick={() => {
                                                                        handleDownload(item)
                                                                        toggleDropdown(index, true);
                                                                    }
                                                                    }
                                                                >
                                                                    Download PDF
                                                                </a>
                                                            </li>
                                                        )}
                                                        {identityName === 'Organization' && item?.type !== "notes" && item?.type !== "activity" && (
                                                            <li>
                                                                <button
                                                                    id="doubleDropdownButton"
                                                                    data-dropdown-toggle="doubleDropdown"
                                                                    data-dropdown-placement="right-start"
                                                                    onClick={toggleDoubleDropdown}
                                                                    className="flex items-center justify-between w-full px-4 py-2  hover:bg-blue-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white"
                                                                    type="button"
                                                                >
                                                                    <MdKeyboardArrowLeft
                                                                        size={20}
                                                                    />
                                                                    Move To Folder
                                                                </button>
                                                                {isDoubleDropdownOpen && (
                                                                    <div id="doubleDropdown" className="absolute right-[172px] bottom-0 border z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton">
                                                                            {getAllVisible && getAllVisible.getFolders && getAllVisible.getFolders.length > 0 ? (
                                                                                (() => {
                                                                                    const filteredFolders = getAllVisible.getFolders.filter((folder) => folder.folderID !== item?.id);
                                                                                    if (filteredFolders.length > 0) {
                                                                                        return filteredFolders.map((folder) => (
                                                                                            <li key={folder.folderID}>
                                                                                                <a href="#" className="block px-4 py-1 capitalize text-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => MoveTo(item, folder)}>
                                                                                                    {folder?.folderName}
                                                                                                </a>
                                                                                            </li>
                                                                                        ));
                                                                                    } else {
                                                                                        return <li className='text-center'>No Folders</li>;
                                                                                    }
                                                                                })()
                                                                            ) : (
                                                                                <li className='text-center'>No Folders</li>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </li>
                                                        )}

                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-3 py-1 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-950 dark:hover:text-white"
                                                                onClick={() => { deleteHistory(item); toggleDropdown(index, true); }}
                                                            >
                                                                Delete
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </li>
                        </ol>
                    )
                })}
            </div>

            {copy && (<ShareFile setCopy={setCopy} copyUrl={copyUrl} />)}
            {pdfOpen && (<PdfView setPdfOpen={setPdfOpen} pdfViewData={pdfViewData} />)}
        </>
    )
}
