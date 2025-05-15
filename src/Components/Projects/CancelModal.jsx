import React from 'react'
import { useForm } from 'react-hook-form';

export default function CancelModal({ setopencanceledModal, EditWonLost }) {
    const { register, watch, } = useForm();

    const Isdeleted = watch('isdeleted', false)

    return (
        <div>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
               
            >
                <div className="relative p-5 w-full max-w-sm max-h-md bg-[#f5f5f6]">

                    <h2 className='font-semibold '>Are you sure you want to cancel this project?</h2>
                    <div className='m-3'>
                        <input
                            type='checkbox'
                            id='delete'
                            className='mr-3'
                            {...register("isdeleted",)}
                        />
                        <label className='text-gray-600' for='delete' >Delete undone tasks, subtasks and other activities linked to this project</label>
                        <p className='text-gray-600' for='delete'>Activities hidden from you will not be deleted.</p>
                    </div>
                    <div className="flex justify-end gap-3 shrink-0 p-3 rounded-b border-gray-300 ">
                        <button
                            type="submit"
                            className="inline-block focus:outline-none  text-black-500  bg-transparent border border-gray-200 dark:bg-transparent dark:text-blck-500 dark:border-gray-700  text-sm py-1 px-3 rounded"
                            onClick={() => { setopencanceledModal(false) }}
                        >
                            No, don't cancel
                        </button>
                        <button type="button"
                            className="inline-block focus:outline-none t bg-red-500 text-white  text-sm font-medium py-1 px-3 rounded mr-1 "
                            onClick={() => EditWonLost(0, Isdeleted)}
                        >
                            Yes ,cancel
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}
