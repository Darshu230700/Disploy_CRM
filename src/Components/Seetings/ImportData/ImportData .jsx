/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import Sidebar from '../../Common/Sidebar'
import Navbar from '../../Common/Navbar'
import { IoCloudUploadOutline, IoPlayCircleOutline } from 'react-icons/io5'
import axios from 'axios';
import { IMPORT_DEAL } from '../../Common/API';
import { useSelector } from 'react-redux';


export default function ImportData({
    isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark, }) {

    const { token } = useSelector((state) => state.root.auth);
    const authToken = `Bearer ${token}`;
    const [selectedImages, setSelectedImages] = useState([]);

    const uploadExcel = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const updatedImages = [{ file: file, progress: 0, size: file.size }];
        setSelectedImages(updatedImages);

        const formData = new FormData();
        formData.append('ExcelFilePath', file);

        try {
            const response = await axios.post(IMPORT_DEAL, formData, {
                headers: { Authorization: authToken, 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setSelectedImages((prevImages) =>
                        prevImages.map((prevImage) =>
                            prevImage.file === file ? { ...prevImage, progress: progress } : prevImage
                        )
                    );
                }
            });

            if (response.data.status === true) {
                setTimeout(() => {
                    // setLoadFirst(true);
                }, 1000);
            }
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    return (
        <div>
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
            <div className="flex flex-1">
                <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
                    <div className="xl:w-full">
                        <div className="flex flex-wrap">
                            <div className="flex items-center py-4 w-full">
                                <div className="w-full">
                                    <div className="">
                                        <div className="flex flex-wrap justify-between">
                                            <div className="items-center ">
                                                <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                                                    Import data
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
                                                    <li className="text-gray-500">CRM</li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-gray-500">Tools</li>
                                                    <li>
                                                        <span className="text-gray-500 mx-2">/</span>
                                                    </li>
                                                    <li className="text-blue-600 hover:text-blue-700">
                                                        Import data
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*end container*/}
                    <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 dark:text-slate-100">
                        <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full p-4 relative dark:text-gray-400 dark:border-gray-600">
                            <h2 className="font-semibold text-xl block mb-3">
                                Sample data{" "}
                                <span className="bg-blue-500 text-white rounded-full  px-1 text-xs">
                                    NEW
                                </span>
                            </h2>
                            <div className="flex  grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4 border-b border-gray-200 p-5 dark:text-gray-400 dark:border-gray-600">
                                <div className="sm:col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 ">
                                    <div className="flex items-center gap-2 mb-4">
                                        <svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'> <path d='M30 4.7998L30.5304 4.26947C30.3897 4.12882 30.1989 4.0498 30 4.0498V4.7998ZM39.6 14.3998L40.35 14.3998C40.35 14.2009 40.271 14.0101 40.1304 13.8695L39.6 14.3998ZM39.6 41.3998H40.35H39.6ZM10.2 5.5498H29.1V4.0498H10.2V5.5498ZM29.1 5.5498H30V4.0498H29.1V5.5498ZM38.85 14.3998L38.85 15.2998L40.35 15.2998L40.35 14.3998L38.85 14.3998ZM38.85 15.2998L38.85 41.3998H40.35L40.35 15.2998H38.85ZM29.4697 5.33013L39.0697 14.9301L40.1304 13.8695L30.5304 4.26947L29.4697 5.33013ZM37.8 42.4498H10.2V43.9498H37.8V42.4498ZM9.15002 41.3998V6.5998H7.65002V41.3998H9.15002ZM10.2 4.0498C8.7917 4.0498 7.65002 5.19148 7.65002 6.5998H9.15002C9.15002 6.01991 9.62013 5.5498 10.2 5.5498V4.0498ZM38.85 41.3998C38.85 41.9797 38.3799 42.4498 37.8 42.4498V43.9498C39.2084 43.9498 40.35 42.8081 40.35 41.3998H38.85ZM10.2 42.4498C9.62013 42.4498 9.15002 41.9797 9.15002 41.3998H7.65002C7.65002 42.8081 8.7917 43.9498 10.2 43.9498V42.4498ZM29.85 14.0998V4.7998H28.35V14.0998H29.85ZM39.6 14.5498H30.3V16.0498H39.6V14.5498ZM28.35 14.0998C28.35 15.1768 29.2231 16.0498 30.3 16.0498V14.5498C30.0515 14.5498 29.85 14.3483 29.85 14.0998H28.35Z' fill='#4A8AE6' /> <path d='M17 28L21.5 33.5L31 21' stroke='#4A8AE6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' /> </svg>
                                        <div className="self-center">
                                            <p className="text-base font-bold block text-slate-700 dark:text-gray-400 ">
                                                You currently have sample data in the app{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 ">
                                    <div className="flex items-center gap-2 mb-4">
                                        <svg width='50' height='50' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'> <path d='M30.5 27H6C3.79086 27 2 25.2091 2 23V15C2 12.7909 3.79086 11 6 11H42C44.2091 11 46 12.7909 46 15V23C46 25.2091 44.2091 27 42 27H35.5' stroke='#4A8AE6' stroke-width='1.5' stroke-linecap='round' /> <path d='M37 19L11 19' stroke='#4A8AE6' stroke-width='1.5' stroke-linecap='round' /> <path d='M30.2 23.2002L32.5038 39.1906L36.1434 33.4947L42.8961 33.1906L30.2 23.2002Z' stroke='#4A8AE6' stroke-width='1.5' stroke-linejoin='round' /> </svg>
                                        <div className="self-center ml-3">
                                            <p className="text-base font-bold block text-slate-700 dark:text-gray-400 ">
                                                You can interact with sample{" "}
                                                <a href="#" className="text-blue-600">
                                                    {" "}
                                                    contacts, deals
                                                </a>{" "}
                                                and{" "}
                                                <a href="#" className="text-blue-600">
                                                    activities{" "}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="sm:col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 ">
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={'./Images/no-file.svg'}
                                            alt=""
                                            className="mr-2 h-16 inline-block "
                                        />
                                        <div className="self-center">
                                            <p className="text-base font-medium block text-slate-700 dark:text-gray-400 ">
                                                Sample data is easy to remove at once when you no longer need
                                                it
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="sm:col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 ">
                                    <div className="w-full relative flex items-center justify-end">
                                        <a
                                            data-modal-toggle="modal"
                                            aria-label="Watch the video"
                                            className="flex items-center px-4 py-2 space-x-3 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                                        >
                                            sample data
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full relative mb-4 border-b border-gray-200 flex items-start dark:text-gray-400 dark:border-gray-600">
                                <div className="w-full relative">
                                    <h2 className="font-semibold text-xl block mb-3">Import data</h2>
                                    <p className="text-base block mb-3">
                                        MImport people, organizations, deals, activities, notes, and leads
                                        directly from other CRM software, or simply upload a file with the
                                        data you need.
                                    </p>
                                </div>
                                <div className="w-full relative flex items-center justify-end">
                                    <a
                                        data-modal-toggle="modal"
                                        aria-label="Watch the video"
                                        className="flex items-center px-4 py-2 space-x-3 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                                    >
                                        <IoPlayCircleOutline className="far fa-play-circle mr-2 text-xl" /> Watch video
                                        (02:14)
                                    </a>
                                </div>
                            </div>
                            <div className=" gap-4 mb-4 pb-4 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600">
                                <div className="flex flex-col justify-center items-center h-48 border-dashed border-2 border-gray-300 rounded-lg">
                                    <h2 className='mb-7'>Import data from a spreadsheet (CSV, XLS and XLSX files).</h2>
                                    <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center justify-center">
                                        <span className="bg-green-600 text-white flex items-center rounded-md px-5 p-2 font-semibold gap-2"> <IoCloudUploadOutline size={15} className='text-white-600' />  Upload spreadsheet</span>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            className="hidden"
                                            onChange={uploadExcel}
                                            accept=".xls,.xlsx"
                                        />
                                    </label>
                                </div>
                                <div>
                                    {selectedImages.map((image, index) => (
                                        <div className="flex items-center gap-x-3 whitespace-nowrap" key={index}>
                                            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition-all duration-500"
                                                    style={{
                                                        width: `${image.progress}%`,
                                                        backgroundColor: image.progress < 100 ? '#3182ce' : '#38a169' // Change colors based on progress
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

                                {/* <div className="sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 ">
                                    <div className="w-full border border-gray-200 p-5 dark:text-gray-400 dark:border-gr ay-600">
                                        <div className="w-full text-center flex justify-center mb-5">
                                            <svg
                                                width={161}
                                                height={121}
                                                viewBox="0 0 161 121"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clipPath="url(#clip0_2519_3140)">
                                                    <path
                                                        d="M93.1455 12.6269H45.8955C43.4102 12.6269 41.3955 14.6416 41.3955 17.1269V104.127C41.3955 106.612 43.4102 108.627 45.8955 108.627H114.896C117.381 108.627 119.396 106.612 119.396 104.127L119.396 38.8769M93.1455 12.6269H95.3955L119.396 36.6269L119.396 38.8769M93.1455 12.6269V35.8769C93.1455 37.5338 94.4887 38.8769 96.1455 38.8769H119.396"
                                                        stroke="#508EE6"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="square"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M57.8955 63.1269H102.896M57.8955 63.1269V50.6269H102.896V63.1269M57.8955 63.1269V75.6269M102.896 63.1269V75.6269M57.8955 75.6269H102.896M57.8955 75.6269V88.1269H102.896V75.6269M80.3955 50.6269V88.1269"
                                                        stroke="#508EE6"
                                                        strokeWidth="1.5"
                                                        strokeLinejoin="round"
                                                    />
                                                    <rect
                                                        x="87.3955"
                                                        y="52.6269"
                                                        width={64}
                                                        height={64}
                                                        rx={32}
                                                        fill="#D6E4F9"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M124.896 82.4269L124.896 68.1269C124.896 67.5194 124.403 67.0269 123.796 67.0269L114.996 67.0269C114.388 67.0269 113.896 67.5194 113.896 68.1269L113.896 82.4269L106.836 82.4269C106.482 82.4269 106.196 82.7138 106.196 83.0677C106.196 83.2346 106.261 83.3949 106.377 83.5145L118.936 96.5331C119.183 96.7868 119.589 96.7924 119.842 96.5457C119.847 96.5416 122.798 93.508 124.269 91.9955C126.984 89.2043 132.414 83.5145 132.414 83.5145C132.661 83.2609 132.655 82.8552 132.402 82.6084C132.282 82.492 132.122 82.4269 131.955 82.4269L124.896 82.4269Z"
                                                        fill="#508EE6"
                                                    />
                                                    <path
                                                        d="M129.296 102.227L109.496 102.227"
                                                        stroke="#508EE6"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2519_3140">
                                                        <rect
                                                            width={160}
                                                            height={120}
                                                            fill="white"
                                                            transform="translate(0.395508 0.626923)"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className="w-full text-center">
                                            <p className="mb-4 ">
                                                <a
                                                    href="#"
                                                    className="focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded text-lg px-3 py-2 dark:bg-green-500 dark:hover:bg-green-600"
                                                >
                                                    {" "}
                                                    From a spreadsheet
                                                </a>
                                            </p>
                                            <p className="mb-4">
                                                Import data from a spreadsheet file
                                                <a href="#" className="text-blue-600 mr-2">
                                                    {" "}
                                                    Learn more
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                            <div className="w-full relative mb-4 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600">
                                <h3 className="mb-5 text-3xl">How does import work?</h3>
                                <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                                    <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4 ">
                                        <div className="flex items-center mb-4">
                                            <img
                                                src="../assets/images/app-catalog/pause-and-resume.svg"
                                                alt=""
                                                className="mr-2 h-16 inline-block"
                                            />
                                            <div className="self-center">
                                                <h4 className="font-semibold text-xl">Pause and resume</h4>
                                                <p className="text-base font-medium block text-slate-700 dark:text-gray-400 ">
                                                    You can stop and continue a data import without any hassle.
                                                    Your session will safely be paused until you're ready to
                                                    complete it.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4 ">
                                        <div className="flex items-center mb-4">
                                            <img
                                                src="../assets/images/app-catalog/Easy-to-undo.svg"
                                                alt=""
                                                className="mr-2 h-16 inline-block"
                                            />
                                            <div className="self-center">
                                                <h4 className="font-semibold text-xl">Easy to undo</h4>
                                                <p className="text-base font-medium block text-slate-700 dark:text-gray-400 ">
                                                    Should you encounter any issues after completing an import,
                                                    you can safely revert to old data as far back as 48 hours.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4 ">
                                        <div className="flex items-center mb-4 ">
                                            <img
                                                src="../assets/images/app-catalog/practice-with-sample-file.svg"
                                                alt=""
                                                className="mr-2 h-16 inline-block "
                                            />
                                            <div className="self-center">
                                                <h4 className="font-semibold text-xl">
                                                    Practice with a sample file
                                                </h4>
                                                <p className="text-base font-medium block text-slate-700 dark:text-gray-400 ">
                                                    Use our sample file to familiarize yourself with Pipedrive's
                                                    data structure. Once you're done you can revert back to a
                                                    clean slate in just one click.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full relative mb-4 border-b border-gray-200 flex items-start dark:text-gray-400 dark:border-gray-600">
                                <div className="w-full relative">
                                    <h2 className="font-semibold text-xl block mb-3">Import history</h2>
                                    <p className="text-base block mb-3">
                                        Import sessions are kept for 30 days, but can only be reverted in
                                        the first 48 hours after upload. Imports can be reverted only by
                                        users who have permission to delete the type of data that was
                                        imported (for example, permission to delete deals).
                                    </p>
                                    <div className="relative overflow-x-auto block w-full">
                                        <div className=" ">
                                            <table className="w-full border border-slate-200 table dark:text-gray-400 dark:border-gray-600">
                                                <thead className="bg-gray-50 dark:bg-gray-600/20">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 border-2 border-slate-300 dark:text-gray-400 dark:border-gray-600"
                                                        >
                                                            Date and time
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 border-2 border-slate-300 dark:text-gray-400 dark:border-gray-600"
                                                        >
                                                            File name
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 border-2 border-slate-300 dark:text-gray-400 dark:border-gray-600"
                                                        >
                                                            User
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 border-2 border-slate-300 dark:text-gray-400 dark:border-gray-600"
                                                        >
                                                            Type
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 border-2 border-slate-300 dark:text-gray-400 dark:border-gray-600"
                                                        >
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* 1 */}
                                                    <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            10:12AM, 20/03/2022
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            File name
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            User Name
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            png
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            Status
                                                        </td>
                                                    </tr>
                                                    {/* 2 */}
                                                    <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            10:12AM, 20/03/2022
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            File name
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            User Name
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            png
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            Status
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* footer */}
                        <div className="absolute bottom-0 left-0 right-0 block print:hidden">
                            <div className="">
                                {/* Footer Start */}
                                <footer className="footer mt-4 rounded-tr-md rounded-tl-md bg-transparent py-4 text-center font-medium text-slate-600 dark:text-slate-400 md:text-left">
                                    © Disploy
                                    <span className="float-right hidden text-slate-600 dark:text-slate-400 md:inline-block">
                                        Crafted with <i className="ti ti-heart text-red-500" /> by
                                        Mannatthemes
                                    </span>
                                </footer>
                                {/* end Footer */}
                            </div>
                        </div>
                    </div>
                    {/*end container*/}
                </div>
            </div>

        </div>
    )
}
