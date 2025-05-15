import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loading from "./Loading";
import { ImageUrl } from "./API";


const PdfView = ({ pdfViewData, setPdfOpen }) => {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >

                <div className="relative p-4 w-full max-w-xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                        <div className="flex items-center justify-between p-4 md:p-5">
                            <h3 className="text-lg text-gray-500 dark:text-gray-400">
                                Document preview
                            </h3>
                            <button
                                onClick={() => setPdfOpen(false)}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white"
                                data-modal-toggle="course-modal"
                            >
                                <AiOutlineCloseCircle />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <hr />
                        {loading ? (
                            <div className="flex justify-center items-center h-60">
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <div className="px-4 pb-2 md:px-5 md:pb-5 mt-2">
                                    <h3 className="text-lg text-gray-500 dark:text-gray-400 text-center">{pdfViewData?.title}</h3>
                                </div>
                                {(pdfViewData?.type === 'attachment' || pdfViewData?.type === 'Attachment' || pdfViewData?.type === 'Image') && (
                                    <img src={`${ImageUrl}${pdfViewData?.filePath}`} className="object-cover  h-auto w-full " alt="" />
                                )}
                                {(pdfViewData?.type === 'document' || pdfViewData?.type === 'Document') && (
                                    <div className="p-2 ">
                                        <iframe src={`${ImageUrl}${pdfViewData?.filePath}`} title="PDF Viewer" width="100%" height="600px" className="object-cover w-full rounded-lg img-thumbnail">
                                            <p>Your browser does not support iframes.</p>
                                        </iframe>
                                    </div>
                                )}
                                {pdfViewData?.productID && (
                                    <img src={`${ImageUrl}${pdfViewData?.filePath}`} className="object-cover  h-auto w-full " alt="" />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PdfView