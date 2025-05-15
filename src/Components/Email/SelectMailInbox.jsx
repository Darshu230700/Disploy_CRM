import moment from 'moment'
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { IoPersonCircleSharp } from 'react-icons/io5'

export default function SelectMailInbox({ selectData, setSelectedMail }) {
    return (
        <div>
            <div className='p-4 h-full w-full'>
                <div className='flex flex-col gap-2 h-full w-full'>
                    <div className='border-b border-gray flex flex-row items-center pb-2'>
                        <div className='cursor-pointer'>
                            <IoMdArrowRoundBack size={26} onClick={() => setSelectedMail("")} />
                        </div>
                        <div className='text-xl font-semibold pl-5'>
                            {selectData?.subject}
                        </div>
                    </div>
                    <div className='w-full h-full gap-2 '>
                        <div className='flex flex-row h-full max-h-full'>
                            <div className='mt-2'>
                                <IoPersonCircleSharp size={36} />

                            </div>
                            <div className='w-full'>
                                <div className='w-full'>
                                    <div className='flex justify-between w-full flex-row'>
                                        <div>
                                            {selectData?.senderEmail.replace(/"/g, '')}
                                        </div>
                                        <div className='float-end flex gap-2 items-center'>
                                            <div>
                                                {moment(selectData?.sendDateTime).format('MMMM DD, YYYY, hh:mm A')}

                                            </div>
                                        
                                        </div>
                                    </div>
                                    <div>
                                        to me
                                    </div>
                                </div>
                                <div className='w-full h-full'>
                                    <div className=' w-full h-full p-4 overflow-auto'>
                                        <div className='w-full h-full' dangerouslySetInnerHTML={{ __html: selectData?.body }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
