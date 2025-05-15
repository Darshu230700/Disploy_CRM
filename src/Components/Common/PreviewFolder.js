/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loading from "./Loading";
import { ImageUrl } from "./API";
import { useDispatch } from "react-redux";
import { createFolderAction, moveToFolderAction } from "../../Redux/organizationSlice";
import { getFoldersPreview, InsertFilesFolder } from "../../Redux/CommonSlice";
import { FcOpenedFolder } from "react-icons/fc";
import { useSelector } from "react-redux";
import { MdKeyboardArrowLeft } from "react-icons/md";
import toast from "react-hot-toast";
import PdfView from "./pdfView";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import { HiDocumentDuplicate } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";

const PreviewFolder = ({ identityID, identityName, id, togglePreview, setLoadFirst, preFolderID }) => {
    const dispatch = useDispatch()
    const hiddenFileInput = useRef(null);

    const Store = useSelector((state) => state.root.common);

    const [isLoading, setIsLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(Array(10).fill(false));
    const [isDoubleDropdownOpen, setIsDoubleDropdownOpen] = useState(false);
    const [loadFirst, setloadFirst] = useState(true);
    const [folderID, setfolderID] = useState('');
    const [OpenPreviewFolder, setOpenPreviewFolder] = useState(false)
    const [DocumentView, setDocumentView] = useState(false)
    const [DocumentData, setDocumentData] = useState('');
    const [folderName, setfolderName] = useState('New Folder');
    const [EditFolder, setEditFolder] = useState(null);
    const [preId, setpreId] = useState(null);

    const [draggingItem, setDraggingItem] = useState(null);


    useEffect(() => {
        const query = { IdentityID: identityID, IdentityName: identityName, FolderID: id }
        if (loadFirst) {
            setIsLoading(true)
            dispatch(getFoldersPreview(query))
                .then(() => {
                    const timer = setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                    return () => clearTimeout(timer);

                }).catch((error) => {
                    console.log('error :>> ', error);
                })
        }
        setloadFirst(false)
    }, [loadFirst, id, dispatch]);

    const toggleDoubleDropdown = () => {
        setIsDoubleDropdownOpen(!isDoubleDropdownOpen);
    };

    const toggleDropdown = (index) => {
        const newDropdownState = isDropdownOpen.map((_, i) => i === index ? !isDropdownOpen[index] : false);
        setIsDropdownOpen(newDropdownState);
    };

    const togglePreviewchild = () => {
        setOpenPreviewFolder(true);
        setfolderID(preFolderID);
        // setpreId(preFolderID)
    };

    const createFolder = (folderID, newName) => {
        const existingFolderNames = Store?.getFolderPreview
            .filter(item => item.type === "Folder")
            .map(item => item.fileName);

        let folderNameToCheck = newName;
        let counter = 1;

        while (existingFolderNames.includes(folderNameToCheck)) {
            folderNameToCheck = `${newName} (${counter})`;
            counter++;
        }

        const payload = {
            folderID: folderID ? folderID : 0,
            identityID: identityID,
            identityName: "organization",
            operation: "Insert",
            folderName: folderID === 0 ? folderNameToCheck : newName,
            parentId: id,
        };

        dispatch(createFolderAction(payload)).then((res) => {
            if (res.payload.status === true) {
                setloadFirst(true)
                setfolderName('')
                setIsLoading(false)
                setEditFolder(null)
            }
        })
    };

    const handleKeyDown = (e, folderID) => {
        if (e.key === "Enter" || e.type === "click") {
            createFolder(folderID, folderName);
        } else if (e.key === "Escape") {
            setEditFolder(null);
        }
    };

    const DeleteData = (item) => {
        const payload = {
            folderID: item?.folderID,
            documentID: item?.attachmentID,
            type: item?.type,
            operation: "Delete",
            userID: 1
        }
        dispatch(moveToFolderAction(payload)).then((res) => {
            if (res.payload.status === 200) {
                setloadFirst(true)
            }
        })
    }

    const handleDragStart = (event, item) => {
        event.dataTransfer.setData("text/plain", item?.attachmentID);
        setDraggingItem(item);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (event, folderId) => {
        const itemId = event.dataTransfer.getData("text/plain");

        let asset_type = draggingItem?.type == "Folder" ? "Folder" : "Image" ? "Image" : "Attachment";

        if (
            Number(itemId) !== folderId ||
            (Number(itemId) === folderId && asset_type !== "Folder")
        ) {
            MoveTo(draggingItem, folderId);

        }
    };

    const MoveTo = (item, itemFolder) => {

        const payload = {
            folderID: itemFolder?.attachmentID,
            documentID: item?.attachmentID,
            type: item?.type,
            operation: "Insert",
            userID: 1
        }

        dispatch(moveToFolderAction(payload)).then((res) => {
            if (res.payload.status === 200) {
                toggleDropdown(true);
                toggleDoubleDropdown()
                setloadFirst(true)
                toast.success("Successfully Move document ");
            }
        })
    }

    const handleFileUpload = (e) => {
        const image = e.target.files[0];
        let FileType = image?.type

        if (FileType.startsWith('image/')) {
            FileType = 'Image';
        } else if (FileType === 'application/pdf') {
            FileType = 'DOC';
        }

        const formData = new FormData();
        formData.append("File", image);
        formData.append("ParentID", id);
        formData.append("IdentityID", identityID);
        formData.append("IdentityName", identityName);
        formData.append("FileType", FileType);
        // return
        try {
            dispatch(InsertFilesFolder(formData)).then((res) => {
                if (res?.payload?.status === true) {
                    setloadFirst(true)
                }
            })
        } catch (error) {
            console.log(error);
            toast.error('No files uploaded.')
        }
    };

    return (
        <>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-2xl h-screen">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                        <div className="flex items-center justify-between p-4 md:p-5 ">
                            <div className="flex  gap-4 justify-center">
                                {(preFolderID) && (
                                    <button type="button" className="px-3 flex items-center justify-center  text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                                        onClick={() => { togglePreviewchild() }}
                                    >
                                        <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                        </svg>
                                    </button>
                                )}
                                <button
                                    className=" dashboard-btn text-white flex items-center gap-2 align-middle border-white bg-primary-500 items-center border rounded-full lg:px-6 sm:px-2 py-2 px-2 text-base sm:text-sm  hover:bg-primary hover:text-white hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/50"
                                    onClick={() => createFolder(0, "New Folder")}
                                >
                                    <FaFolderOpen size={16} />
                                    {/* <TiFolderOpen className="text-2xl rounded-full mr-1  text-white p-1" /> */}
                                    New Folder

                                </button>
                                <button
                                    type='button'
                                    className="rounded-full border bg-primary-500 text-white tracking-wider px-5 flex items-center gap-2"
                                    onClick={() => hiddenFileInput.current.click()}
                                    title="Attachment"
                                >
                                    <FaCloudUploadAlt size={17} />
                                    Upload
                                    <input
                                        type="file"
                                        id="upload-button"
                                        className='opacity-0 border'
                                        style={{ display: "none" }}
                                        ref={hiddenFileInput}
                                        onChange={(e) => {
                                            handleFileUpload(e)
                                            // const files = e.target.files[0];
                                            // setfile(files)
                                        }}
                                        multiple
                                        accept="image/*,.pdf"
                                    />
                                </button>

                            </div>
                            <button
                                onClick={() => {
                                    togglePreview()
                                    setLoadFirst(true)
                                }}
                                type="button"
                                className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white"
                                data-modal-toggle="course-modal"
                            >
                                <AiOutlineCloseCircle className="text-2xl" />
                            </button>
                        </div>
                        <div className="px-4 pb-4 md:px-5 md:pb-5">
                            <div className="w-full h-8vh vertical-scroll-inner">
                                {isLoading && (
                                    <div className="flex justify-center items-center w-full h-full">
                                        <Loading />
                                    </div>
                                )}
                                <div className="page-content grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-8 mb-5 Document-section">
                                    {
                                        !isLoading &&
                                            Store && Store.getFolderPreview.length > 0 ? (
                                            Store.getFolderPreview.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="relative list-none assetsbox"
                                                >
                                                    <li
                                                        key={index}
                                                        draggable
                                                        onDragStart={(event) =>

                                                            handleDragStart(event, item)
                                                        }
                                                        className="relative list-none assetsbox"
                                                    >
                                                        {item.type === "Folder" && (
                                                            <div
                                                                onDragOver={(event) => handleDragOver(event)}
                                                                onDrop={(event) =>
                                                                    handleDrop(event, item)
                                                                }
                                                                className="text-center relative list-none bg-lightgray rounded-md px-3 py-7 flex justify-center items-center flex-col h-full shadow border border-gray-200 dark:border-gray-700"
                                                            >
                                                                <FcOpenedFolder
                                                                    className="text-8xl text-center mx-auto"
                                                                    onClick={() => {
                                                                        setOpenPreviewFolder(true);
                                                                        setfolderID(item.attachmentID);
                                                                        setpreId(item.folderID);
                                                                    }}
                                                                />
                                                                {EditFolder === item?.attachmentID ? (
                                                                    <input
                                                                        type="text"
                                                                        value={folderName}
                                                                        className="w-full py-1 px-5"
                                                                        // className=" capitalize text-gray-900 text-sm  hover:bg-lightgray  focus:bg-lightgray  block ps-2 dark:bg-lightgray dark:text-white focus:outline-0"
                                                                        onChange={(e) => setfolderName(e.target.value)}
                                                                        onBlur={() => { setEditFolder(null); }}
                                                                        onKeyDown={(e) => handleKeyDown(e, item.attachmentID, index)}
                                                                        onClick={(e) => handleKeyDown(e, item.attachmentID)}
                                                                        autoFocus
                                                                    />
                                                                ) : (
                                                                    <>
                                                                        <span
                                                                            onClick={() => {
                                                                                setEditFolder(item?.attachmentID);
                                                                                setfolderName(item?.fileName);
                                                                            }}
                                                                            className="cursor-pointer capitalize"
                                                                        >
                                                                            {item?.fileName}
                                                                            {/* &nbsp;{item?.attachmentID} */}
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}

                                                        {(item?.type === "Image" || item?.type === "Attachment") && (
                                                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                                <img
                                                                    className=" w-full rounded-lg object-cover h-48"
                                                                    src={`${ImageUrl}${item?.filePath}`}
                                                                    alt={item?.fileName}
                                                                    onClick={() => { setDocumentData(item); setDocumentView(true); }}

                                                                />
                                                            </div>
                                                        )}

                                                        {(item?.type === "Document" || item?.type === "DOC") && (
                                                            // <div className="bg-white px-4 py-5 rounded-lg shadow-lg h-full break-words">
                                                            <div className="text-center relative list-none bg-lightgray rounded-md px-3 py-7 flex justify-center items-center flex-col h-full shadow border border-gray-200 dark:border-gray-700">
                                                                <HiDocumentDuplicate className=" text-primary text-4xl mt-10 " />
                                                                <a
                                                                    className="cursor-pointer"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    {item?.fileName}
                                                                </a>
                                                            </div>
                                                        )}
                                                        <div className="checkbox flex justify-between absolute top-5 px-4 w-full">
                                                            {/* <input
                                                                type="checkbox"
                                                                className="w-[20px] h-[20px] relative"
                                                            // style={{display: selectAll ? "block" : "none",}}
                                                            // checked={tabsDelete?.selectedIds?.includes(item.assetID)}
                                                            // onChange={() => handleCheckboxChange(item.assetID)}
                                                            /> */}
                                                            <div
                                                                style={{
                                                                    float: "right",
                                                                    width: "100%",
                                                                    textAlign: "right",
                                                                }}
                                                            >
                                                                <button
                                                                    id={`dropdownMenuIconButton${index}`}
                                                                    onClick={() => {
                                                                        toggleDropdown(index)
                                                                    }}
                                                                    className="relative bg-white text-black px-1 font-bold rounded"
                                                                >
                                                                    <BsThreeDots size={20} />
                                                                </button>
                                                                {isDropdownOpen[index] && (
                                                                    <div id={`dropdownDots${index}`}
                                                                        className="border absolute z-10 bg-white right-0 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                                                                    >
                                                                        <ul
                                                                            className=" text-right text-black overflow-hidden"
                                                                            aria-labelledby={`dropdownMenuIconButton${index}`}
                                                                        >
                                                                            <li>
                                                                                <button
                                                                                    id="doubleDropdownButton"
                                                                                    data-dropdown-toggle="doubleDropdown"
                                                                                    data-dropdown-placement="right-start"
                                                                                    onClick={() => {
                                                                                        toggleDoubleDropdown()
                                                                                    }}
                                                                                    className="flex items-center justify-between w-full px-4 py-2  hover:bg-blue-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white"
                                                                                    type="button"
                                                                                >
                                                                                    <MdKeyboardArrowLeft size={20} />
                                                                                    Move To Folder
                                                                                </button>
                                                                                {isDoubleDropdownOpen && (
                                                                                    <div id="doubleDropdown" className="absolute right-[172px] top-0 border  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                                                        {Store && Store?.getFolderPreview && Store?.getFolderPreview?.length > 0 ? (
                                                                                            (() => {
                                                                                                const filteredFolders = Store.getFolderPreview.filter((folder) => folder.attachmentID !== item?.attachmentID && folder.type === "Folder");
                                                                                                if (filteredFolders.length > 0) {
                                                                                                    return filteredFolders.map((folder) => (
                                                                                                        <li key={folder?.folderID} >
                                                                                                            <a href="" className="block px-4 capitalize py-1.5 text-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => MoveTo(item, folder)}>
                                                                                                                {folder?.fileName}
                                                                                                            </a>
                                                                                                        </li>
                                                                                                    ));
                                                                                                } else {
                                                                                                    return <li> <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >
                                                                                                        No Folders
                                                                                                    </a></li>;
                                                                                                }
                                                                                            })()
                                                                                        ) : (
                                                                                            <li>No Folders</li>
                                                                                        )}
                                                                                    </div>
                                                                                )}
                                                                            </li>
                                                                            {(item?.type !== "Folder") && (
                                                                                <li>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="flex items-center justify-center w-full px-4 py-2  hover:bg-blue-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white"
                                                                                        onClick={() => {
                                                                                            setDocumentData(item)
                                                                                            setDocumentView(true)
                                                                                            toggleDropdown(index, true);
                                                                                        }}
                                                                                    >
                                                                                        Preview Document
                                                                                    </button>
                                                                                </li>
                                                                            )}
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    className="flex items-center justify-center w-full px-4 py-2  hover:bg-blue-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white"
                                                                                    onClick={() => {
                                                                                        toggleDropdown(index, true);
                                                                                        DeleteData(item)
                                                                                    }}
                                                                                >
                                                                                    Delete
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/* start grid view  */}
                                                </div>
                                            ))
                                        )
                                            : (
                                                <div>No Data available</div>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {OpenPreviewFolder && <PreviewFolder togglePreview={togglePreview} identityName={'organization'} identityID={identityID} id={folderID} setLoadFirst={setloadFirst} preFolderID={preId} />
            }
            {DocumentView && <PdfView setPdfOpen={setDocumentView} pdfViewData={DocumentData} />}


        </>
    )
}

export default PreviewFolder;
