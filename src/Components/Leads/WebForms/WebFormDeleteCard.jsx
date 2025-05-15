import React from 'react'

const WebFormDeleteCard = ({ toggleModel, selectData, setWebForms, webForms, handleDelete }) => {



    return (
        <>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-md shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-5 md:p-6 rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Are you sure you want to delete this card?
                            </h3>
                        </div>
                        <div className="flex flex-wrap justify-between shrink-0 p-3 rounded-b border-gray-300 bg-gray-100">
                            <button
                                type="button"
                                className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                onClick={() => toggleModel()}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                onClick={() => handleDelete()}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default WebFormDeleteCard
