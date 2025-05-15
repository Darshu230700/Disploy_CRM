/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios";
import { INSERT_DOCUMENT } from "./API";
import PdfView from "./pdfView";
import ShareFile from "./shareFile";
import toast from "react-hot-toast";

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const Documents = ({ identityID, identityName, setLoadFirst, getAllVisible, deleteHistory, handleDownload }) => {

    const { token } = useSelector((state) => state.root.auth);
    const authToken = `Bearer ${token}`;
    const [selectedImages, setSelectedImages] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(Array(10).fill(false));
    const [pdfViewData, setPdfUrl] = useState("");
    const [pdfOpen, setPdfOpen] = useState(false);
    const [copy, setCopy] = useState(false);
    const [copyUrl, setCopyUrl] = useState("");

    // Handle file upload
    const submitDocument = async (files) => {
        const filesArray = Array.from(files);

        const validFiles = filesArray.filter(file => file?.size <= MAX_FILE_SIZE_BYTES);
        const invalidFiles = filesArray.filter(file => file?.size > MAX_FILE_SIZE_BYTES);

        // Show error for files that are too large
        if (invalidFiles?.length > 0) {
            invalidFiles.forEach((file, index) => {
                toast.error(`File ${index + 1} Maximum upload file size is 50 MB.`);
            });
        }

        const updatedImages = validFiles.map(file => ({
            file: file,
            progress: 0,
            size: file.size
        }));

        setSelectedImages(updatedImages);

        let success = true;

        await Promise.all(
            updatedImages.map(async (image) => {
                const formData = new FormData();
                formData.append('DocumentID', 0);
                formData.append('IdentityID', identityID || '');
                formData.append('IdentityName', identityName || '');
                formData.append('DocumentName', '');
                formData.append('DocumentPath', '');
                formData.append('CreatedDate', '');
                formData.append('CreatedBy', '');
                formData.append('UpdatedDate', '');
                formData.append('UpdatedBy', '');
                formData.append('UserID', 1);
                formData.append('File', image.file);

                try {
                    const response = await axios.post(INSERT_DOCUMENT, formData, {
                        headers: { Authorization: authToken, 'Content-Type': 'multipart/form-data' },
                        onUploadProgress: (progressEvent) => {
                            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                            setSelectedImages((prevImages) =>
                                prevImages.map((prevImage) =>
                                    prevImage.file === image.file ? { ...prevImage, progress: progress } : prevImage
                                )
                            );
                        }
                    });

                    if (response.data.status !== true) {
                        success = false;
                    }

                } catch (error) {
                    console.error('Upload error:', error);
                }
            })
        );

        if (success && validFiles?.length > 0) {
            toast.success('Document uploaded successfully!');
            setTimeout(() => {
                setLoadFirst(true);
            }, 1000);
        }
    };

    // Handle drag over
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // Handle file drop
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            submitDocument(files);
        }
    };

    // Handle file input change
    const handleFileInputChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            submitDocument(files);
        }
    };

    // Toggle dropdown menu
    const toggleDropdown = (index) => {
        const newDropdownState = isDropdownOpen.map((_, i) => i === index ? !isDropdownOpen[index] : false);
        setIsDropdownOpen(newDropdownState);
    };

    // View document
    const DocumentView = (item) => {
        setPdfUrl(item);
        setPdfOpen(true);
    };

    // Share file
    const shareFile = (item) => {
        setCopyUrl(item?.filePath);
        setCopy(true);
    };

    return (
        <>
            <div
                className="flex justify-center items-center h-24 border-dashed border-2 border-gray-300 rounded-lg"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <label
                    htmlFor="fileInput"
                    className="cursor-pointer flex flex-col items-center justify-center"
                >
                    <span className="bg-green-500 text-white rounded-md px-5 p-2">
                        Select Document
                    </span>
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileInputChange}
                        accept=".pdf"
                    />
                </label>
            </div>

            <div className="mt-3">
                <p className="font-medium">DOCUMENTS CREATED</p>
                {getAllVisible.getHistory && getAllVisible.getHistory.length > 0 && getAllVisible.getHistory.map((item, index) => (
                    <div key={index}>
                        {item?.type === "document" && identityName === 'Project' && (
                            <div className="bg-white mt-2 dark:bg-slate-800 shadow rounded-md w-full relative p-2 flex items-center justify-between" >
                                <div>
                                    <div className="font-semibold text-black">{item.title}</div>
                                    <small>Created on : {moment(item?.createdDate).format('DD / MM / YYYY : h:mm:ss a')}</small>
                                </div>
                                <div className="">
                                    {(identityName === 'Project') && (
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
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-3 py-1 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-950 dark:hover:text-white"
                                                                onClick={() => {
                                                                    handleDownload(item);
                                                                    toggleDropdown(index, true);
                                                                }}
                                                            >
                                                                Download
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-3 py-1 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-950 dark:hover:text-white"
                                                                onClick={() => {
                                                                    toggleDropdown(index, true);
                                                                    deleteHistory(item);
                                                                }}
                                                            >
                                                                Delete
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-3 py-1 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-950 dark:hover:text-white"
                                                                onClick={() => {
                                                                    shareFile(item);
                                                                    toggleDropdown(index, true);
                                                                }}
                                                            >
                                                                Share as link
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-3 py-1 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-950 dark:hover:text-white"
                                                                onClick={() => {
                                                                    toggleDropdown(index, true);
                                                                    DocumentView(item);
                                                                }}
                                                            >
                                                                Preview Document
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div>
                {selectedImages.map((image, index) => (
                    <div className="flex items-center gap-x-3 whitespace-nowrap" key={index}>
                        <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition-all duration-500"
                                style={{
                                    width: `${image.progress}%`,
                                    backgroundColor: image.progress < 100 ? '#3182ce' : '#38a169'
                                }}
                            ></div>
                        </div>
                        <div className="w-10 text-end">
                            <span className="text-sm text-gray-800">
                                {`${image.progress}% `}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {pdfOpen &&
                <PdfView setPdfOpen={setPdfOpen} pdfViewData={pdfViewData} />
            }
            {copy &&
                <ShareFile setCopy={setCopy} copyUrl={copyUrl} />
            }
        </>
    );
};

export default Documents;
