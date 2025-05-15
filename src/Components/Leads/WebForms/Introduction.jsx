import React, { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
const Introduction = ({ toggleModel, selectData, setWebForms, webForms }) => {
    const [helptext,setHelpText]=useState(selectData?.helptext === null ? "" : selectData?.helptext)
    const { register, handleSubmit, } = useForm({
        defaultValues: {
            title: selectData?.label,
        }
    });

    const onSubmit = (data) => {
        setWebForms({
            ...webForms,
            webFromFieldMaster: webForms?.webFromFieldMaster?.map((item) => {
              if (item?.webFromFieldMasterID === selectData?.webFromFieldMasterID) {
                return {
                  ...item,
                  label: data?.title,
                  helptext: helptext
                };
              }
              return { ...item };
            })
          });
          toggleModel()
    };

    const handleChange =(newContent) =>{
        setHelpText(newContent)
    }
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
                                Introduction
                            </h3>
                            <IoCloseOutline
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => toggleModel()}
                            />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='p-5'>
                                <div className='mb-2'>
                                    <div className='mb-1'>Title</div>
                                    <div>
                                        <input
                                            type='text'
                                            placeholder={`What's the form about?`}
                                            className='sc-iMWBiJ bTicHx'
                                            {...register('title')} // Register the input field with validation rules
                                        />
                                    </div>

                                </div>
                                <div className='mb-2'>
                                    <div className='mb-1'>Message (optional)</div>
                                    <div>
                                        <ReactQuill
                                            placeholder='An introductory message about your form'
                                            theme="snow"
                                            onChange={handleChange}
                                            value={helptext}
                                        />
                                    </div>
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
                                    className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
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

export default Introduction
