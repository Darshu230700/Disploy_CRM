/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function FileDescription({ toggleDescription, SumbitDescription, FileData }) {
    const { handleSubmit, register, setValue, formState: { errors } } = useForm()

    useEffect(() => {
        setValue("Name", FileData.description);
    }, []);

    return (
        <div>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50 "
           
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {`${FileData.description ? 'Update' : 'Add'} file description`}
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => {
                                    toggleDescription();
                                }}
                            />
                        </div>
                        <form onSubmit={handleSubmit(SumbitDescription)}>
                            <div className="p-4 md:p-5">
                                <div className="col-span-2 sm:col-span-1">
                                    <input
                                        type="text"
                                        {...register("Name", { required: "This field is required", })}
                                        name="Name"
                                        id="Name"
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Enter description"
                                    />
                                    {errors.Name && <span className="error text-red-500 text-sm">{errors.Name.message}</span>}
                                </div>
                                <div className="mt-4  flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                    <button
                                        type="button"
                                        className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                        onClick={toggleDescription}
                                    >
                                        Close
                                    </button>

                                    <button
                                        type="submit"
                                        className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-gray-300 border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                    >
                                        {FileData.description ? 'Update' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
