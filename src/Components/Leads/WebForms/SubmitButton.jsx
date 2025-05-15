import React from 'react'
import { useForm } from 'react-hook-form';
import { IoCloseOutline } from "react-icons/io5";
const SubmitButton = ({ toggleModel, selectData, setWebForms, webForms }) => {
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                button: selectData?.label,
                spam: selectData?.isRequired
            }

        }
    );

    const onSubmit = (data) => {

        setWebForms({
            ...webForms,
            webFromFieldMaster: webForms?.webFromFieldMaster?.map((item) => {
                if (item?.webFromFieldMasterID === selectData?.webFromFieldMasterID) {
                    return {
                        ...item,
                        label: data?.button,
                        isRequired: data?.spam
                    };
                }
                return { ...item };
            })
        });
        toggleModel()
    };

    return (
        <>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-[700px] max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Submit Button
                            </h3>
                            <IoCloseOutline
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => toggleModel()}
                            />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='p-5'>
                                <div className='mb-2'>
                                    <div className='mb-1'>Button label</div>
                                    <div>
                                        <input
                                            type='text'
                                            className='sc-iMWBiJ bTicHx'
                                            {...register('button', { required: 'Enter button label' })} // Register the input field with validation rules
                                        />
                                        {errors.button && <span>{errors.button.message}</span>} {/* Display error message if title is not provided */}
                                    </div>
                                </div>
                                <div className='mb-2 flex flex-row items-center gap-3'>
                                    <div>
                                        <input
                                            id='spam'
                                            type='checkbox'
                                            {...register('spam')} // Register the input field with validation rules
                                        />
                                    </div>
                                    <label for='spam' className='mb-1'>Spam protection</label>
                                </div>

                            </div>
                            <div className="flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                    onClick={() => toggleModel()}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-gray-300 border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                >
                                    Save
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubmitButton
