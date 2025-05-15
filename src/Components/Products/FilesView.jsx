/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from 'react'
import { BiEdit } from 'react-icons/bi';
import { FaFileDownload } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { MdDeleteForever } from 'react-icons/md';
import sweetAlert from '../Common/sweetAlert';
import { AddFileUpload, getFilesByID, ProductAttachment } from '../../Redux/ProductSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ImageUrl, INSERT_PRODUCT_FILES } from '../Common/API';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FileDescription from './FileDescription';
import PdfView from '../Common/pdfView';
import toast from 'react-hot-toast';
import { PageNumber } from '../Common/Common';
const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function FilesView({ setLoadFist, Productstore }) {
    const dispatch = useDispatch()
    const fileInputRef = useRef(null)
    const { token } = useSelector((state) => state.root.auth);
    const authToken = `Bearer ${token}`;

    let { id } = useParams();

    const [selectedImages, setSelectedImages] = useState([]);
    const [DescriptionModel, setDescriptionModel] = useState(false);
    const [DocID, setDocID] = useState("");
    const [FileData, setFileData] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [ImageView, setImageView] = useState(false);

    const [rowsPerPage, setrowsPerPage] = useState(10);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = Productstore.getFiles ? Productstore.getFiles.slice(indexOfFirstRow, indexOfLastRow) : []
    const totalPages = Math.ceil(Productstore.getFiles.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const toggleDescription = () => { setDescriptionModel(!DescriptionModel); };

    const SumbitFile = async (e) => {
        const files = e.target.files
        const filesArray = Array.from(files);


        const validFiles = filesArray.filter(file => file?.size <= MAX_FILE_SIZE_BYTES);
        const invalidFiles = filesArray.filter(file => file?.size > MAX_FILE_SIZE_BYTES);

        // Show error for files that are too large
        if (invalidFiles?.length > 0) {
            invalidFiles.forEach((file, index) => {
                toast.error(`File ${index + 1} Maximum upload file size is 50 MB.`);
            });
        }

        const updatedImages = (validFiles)?.map((file) => ({
            file: file,
            progress: 0,
            size: file.size
        }));

        setSelectedImages(updatedImages);
        let success = true;

        await Promise.all(
            updatedImages.map(async (image) => {
                const formData = new FormData();
                formData.append(`Files`, image.file);
                formData.append('productAttachmentID', 0);
                formData.append('filePath', '');
                formData.append('description', '');
                formData.append('userID', 1);
                formData.append('productID', id);

                try {
                    const response = await axios.post(INSERT_PRODUCT_FILES, formData, {
                        headers: { Authorization: authToken, 'Content-Type': 'multipart/form-data' },
                        onUploadProgress: (progressEvent) => {
                            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                            setSelectedImages((prevImages) =>
                                prevImages.map((prevImage) =>
                                    prevImage.file === image.file ? { ...prevImage, progress: progress } : prevImage
                                )
                            );
                        }
                    })
                    if (response?.data?.status !== true) {
                        success = false;
                    }
                    if (response?.data?.status === true) {
                        setTimeout(() => {
                            setLoadFist(true)
                            setSelectedImages([])
                        }, 1000);

                    }
                } catch (error) {
                    console.error('Upload error:', error);
                }
            })
        )
        if (success && validFiles?.length > 0) {
            toast.success('Files uploaded successfully!');
            setTimeout(() => {
                setLoadFist(true)
            }, 1000);
        }
        //  else {
        //     toast.error('Some files failed to upload. Please try again.');
        // }
    }

    const SumbitDescription = (data) => {
        const formData = new FormData();
        formData.append('productAttachmentID', DocID);
        formData.append('filePath', FileData?.filePath);
        formData.append('description', data.Name);
        formData.append('createdDate', '');
        formData.append('createdBy', '');
        formData.append('updatedDate', '');
        formData.append('updatedBy', '');
        formData.append('userID', 1);
        formData.append('productID', id);
        formData.append('File', '');

        try {
            dispatch(AddFileUpload(formData)).then((res) => {
                if (res.payload.status === true) {
                    setLoadFist(true)
                    setDocID('')
                    setDescriptionModel(false)
                }
            })
        } catch (error) {
            console.log(error)
        }
    };

    const ProductAttachmentDelete = async (FileID) => {
        try {
            const result = await sweetAlert.confirm("Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                await dispatch(ProductAttachment(FileID)).then((res) => {
                    if (res.payload.status === true) {
                        setLoadFist(true)
                        setCurrentPage(1)
                    }
                });
                sweetAlert.success("Deleted successfully");
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

    const EditDiscription = async (id) => {
        dispatch(getFilesByID(id)).then((res) => {
            const result = res.payload.data;
            setFileData(result)
        });
    }

    return (
        <div>
            <div className="flex-auto py-4">
                <div
                    className=" relative flex-col flex  items-center justify-center  lg:py-6 md:py-10 sm:py-32 xs:pb-32 xs:pt-14 mx-4  lg:mt-14 md:mt-14 sm:mt-5 xs:mt-5  border-2 rounded-[20px] border-black-500 border-dashed"
                    onClick={() => fileInputRef.current.click()}
                >
                    <div className="flex items-center justify-between p-3 md:p-4 border-red rounded-t ">
                        <div
                            className="relative text-center max-auto"
                            ref={fileInputRef}
                        >
                            <input
                                type="file"
                                className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                                name="uploadfile"
                                onChange={SumbitFile}
                                multiple
                                accept="image/*"
                            />
                            <span className="bg-green-500 text-white rounded-md px-5 p-2 text-center cursor-pointer">
                                Select Files
                            </span>
                        </div>
                    </div>
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
                <div className="relative scroll-inner shadow-md sm:rounded-lg mt-6">
                    <table className="w-full border border-slate-200 dark:border-gray-400 rounded-t table ">
                        <thead className="sticky -top-1  rounded-t text-md font-medium border-b dark:bg-gray-800 dark:border-gray-400 text-gray-700 bg-gray-200 dark:text-gray-400">
                            <tr className="items-center border-b border-b-[#E4E6FF] table-head-bg text-center">
                                <th className=' px-3 py-2 border-1 border-slate-300 text-center'>
                                    Image
                                </th>
                                <th className='px-3 py-2 border-1 border-slate-300 text-center'>
                                    Description
                                </th>
                                <th className=' px-3 py-2 border-1 border-slate-300 text-center'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {currentRows &&
                                currentRows.length > 0 ? (
                                currentRows.map((item, index) => (
                                    <tr className="bg-white dark:bg-gray-800 " key={index}>
                                        <td className='max-w-10 p-3 border border-slate-200 text-center'>
                                            <img
                                                src={`${ImageUrl}${item?.filePath}`}
                                                alt=""
                                                className="imagebox relative mx-auto"
                                                style={{ height: "50px" }}
                                                onClick={() => { setImageView(true); setFileData(item); }}
                                            />
                                        </td>
                                        <td className="max-w-4 truncate p-4 border border-slate-200 text-center">
                                            {item.description}
                                        </td>
                                        <td className='max-w-10 p-4 border border-slate-200 text-center'>
                                            <div className="flex justify-center gap-4">
                                                <div
                                                    data-tip
                                                    data-for="Duplicate"
                                                    className="relative flex-col group cursor-pointer text-white bg-neutral-400 hover:bg-neutral-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    onClick={() => {
                                                        setDescriptionModel(true);
                                                        setFileData(item);
                                                        setDocID(item.productAttachmentID);
                                                        EditDiscription(item.productAttachmentID)

                                                    }}
                                                >
                                                    {item.description ? (
                                                        <BiEdit />
                                                    ) : (
                                                        <FaPlus />
                                                    )}
                                                    <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">{`${item.description ? 'Edit' : "Add"}`} Description</span>
                                                        <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                    </div>
                                                </div>
                                                <div data-tip data-for="Edit" className="relative flex flex-col items-center group cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    onClick={() => { handleDownload(item) }}
                                                >
                                                    <FaFileDownload />
                                                    <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Download</span>
                                                        <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                    </div>
                                                </div>
                                                <div
                                                    data-tip
                                                    data-for="Delete"
                                                    className="relative flex-col group cursor-pointer text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    onClick={() => {
                                                        ProductAttachmentDelete(item.productAttachmentID)
                                                    }}
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
                                ))
                            ) : (
                                <td colSpan={6}>
                                    <p className="text-center p-2">
                                        Not Found.
                                    </p>
                                </td>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex lg:flex-row lg:justify-between md:flex-row md:justify-between sm:flex-row sm:justify-between flex-col justify-end p-5 gap-3">
                    <div className="flex items-center">
                        <span className="text-gray-500 font-semibold">{`Total ${Productstore?.getFiles?.length} Files `}</span>
                    </div>
                    <div className="flex justify-end">
                        <select
                            className={`px-1 mr-2 border rounded-lg `}
                            value={rowsPerPage}
                            onChange={(e) => { setrowsPerPage(e.target.value); setCurrentPage(1) }}
                        >
                            {PageNumber.map((x) => (
                                <option key={x} value={x}>{x}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="font-semibold flex cursor-pointer hover:bg-white hover:text-primary items-center justify-center px-3 h-8 me-3 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <svg
                                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 5H1m0 0 4 4M1 5l4-4"
                                />
                            </svg>
                            Previous
                        </button>
                        <div className="flex items-center me-3">
                            <span className="text-gray-500">{`Page ${currentPage} of ${totalPages}`}</span>
                        </div>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="font-semibold flex hover:bg-white hover:text-primary cursor-pointer items-center justify-center px-3 h-8 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Next
                            <svg
                                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {DescriptionModel && (<FileDescription toggleDescription={toggleDescription} SumbitDescription={SumbitDescription} FileData={FileData} />)}
            {ImageView && (<PdfView setPdfOpen={setImageView} pdfViewData={FileData} />)}

        </div>
    )
}
