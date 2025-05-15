import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { ImageUrl } from "./API";

const ShareFile = ({ setCopy, copyUrl }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleCopyToClipboard = async () => {
        try {
            const url = `${ImageUrl}${copyUrl}`
            await navigator.clipboard.writeText(url);
            setCopySuccess(true);
            toast.success("Link copied to clipboard");
        } catch (error) {
            console.error("Failed to copy:", error);
            toast.error("Failed to copy link");
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
                <div className="relative p-4 w-full max-w-lg max-h-full ">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                        {loading ? (
                            <div className="flex justify-center items-center h-60">
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between p-4 md:p-5">
                                    <h3 className="text-lg text-gray-500 dark:text-gray-400">
                                        Share as link
                                    </h3>
                                    <button
                                        onClick={() => setCopy(false)}
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white"
                                        data-modal-toggle="course-modal"
                                    >
                                        <AiOutlineCloseCircle />
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="px-4 pb-4 md:px-5 md:pb-5">

                                    <div className="w-full ">
                                        <div className="relative mb-4">
                                            <label htmlFor="course-url" className="sr-only">Label</label>
                                            <input
                                                id="course-url"
                                                type="text"
                                                className="col-span-12 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={`${ImageUrl}${copyUrl}`}
                                                disabled
                                                readOnly
                                            />
                                            <button
                                                onClick={handleCopyToClipboard}
                                                className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
                                            >
                                                <span id="default-message" className={copySuccess ? "hidden" : "inline-flex items-center"}>
                                                    <svg className="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                                    </svg>
                                                    <span className="text-xs font-semibold">Copy</span>
                                                </span>
                                                <span id="success-message" className={copySuccess ? "inline-flex items-center" : "hidden"}>
                                                    <svg className="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                                    </svg>
                                                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-500">Copied</span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setCopy(false)}
                                        type="button"
                                        data-modal-hide="course-modal"
                                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        Close
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShareFile;
