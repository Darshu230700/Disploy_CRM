import React from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { getAllCategory, insertCategory } from '../../Redux/CommonSlice';

export default function AddCategory({ setOpenCategoryModal }) {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        const Payload = {
            categoryID: 0,
            categoryName: data?.Name,
            isActive: true,
            userID: 0
        }
        dispatch(insertCategory(Payload)).then((res) => {
            dispatch(getAllCategory({}))
            setOpenCategoryModal(false)
        }).catch((error) => { console.log('error :>> ', error); })
    }

    return (
        <div>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-sm max-h-full ">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Add Category
                            </h3>
                            <AiOutlineCloseCircle className="text-3xl text-primary cursor-pointer" onClick={() => setOpenCategoryModal(false)} />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="xl:w-full h-full vertical-scroll-inner relative p-4">
                                <div className="grid md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8 gap-4">
                                    <div className="sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8">
                                        <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">

                                            <div className="mb-5">
                                                <label for="name" className="block mb-2 font-bold text-gray-600">
                                                    Category name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="Name"
                                                    placeholder="Category name"
                                                    {...register('Name', { required: "The category name is Required" })}
                                                    className="border border-gray-300 shadow p-3 w-full rounded capitalize"
                                                />
                                                {errors.Name && (<p className="error text-red-600 text-base font-bold">{errors?.Name?.message}</p>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                    onClick={() => setOpenCategoryModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
