import React from 'react'
import { BiDollarCircle } from 'react-icons/bi';
import { BsQuestionSquare } from 'react-icons/bs';
import { FaRegMessage } from 'react-icons/fa6';
import { GoPlus } from 'react-icons/go';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { IoPersonOutline } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';
import { PiHandsClapping } from 'react-icons/pi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbBrandWechat } from 'react-icons/tb';
import LeadStatus from './LeadStatus';

export default function CommonFiled({ item, index, setopenCreateModal, setfiledIndex, setopenmodal, setselectData, deleteConversationField, setChatBot, chatBots, setselecteQueFiled, que, setloadFrist }) {

    return (
        <div>
            <div className='flex flex-col items-center  relative w-full justify-center max-w-[450px] mr-40' key={index}>
                {
                    !(item?.fieldType === "Greeting") && (
                        <>
                            <div className='h-16 w-9 border-l order-gray-200 dark:border-gray-700 absolute left-[50%] top-0'>
                            </div>
                            <div className='py-5 absolute left-[50%] top-0 ml-[-15px] action-items-show'>
                                <button className='opacity-0 px-1 min-w-6 bg-green border-none items-center m-0 shadow-sm rounded-sm' onClick={() => { setopenCreateModal(true); setfiledIndex(index); setselecteQueFiled(que); }}>
                                    <GoPlus size={20} />
                                </button>
                            </div>
                        </>
                    )
                }

                <div className='flex mt-16 flex-1 justify-center w-full transition-background duration-3000 ease-linear dark:text-gray-400 '>
                    <div className='w-full block '>
                        <div className='action-items-show relative w-full m-auto min-h-[80px] rounded-sm cursor-default flex flex-col border border-gray-200 dark:border-gray-700'>

                            <div className='cursor-pointer'  >
                                {item?.fieldType === 'Lead Status' && (
                                    <LeadStatus item={item} setChatBot={setChatBot} chatBots={chatBots} setloadFrist={setloadFrist} />
                                )}
                                <div className='flex p-4 items-center' onClick={() => { setopenmodal(true); setselectData(item) }} >
                                    <div className='flex flex-shrink-0 p-2 mr-3 w-12 justify-center items-center border border-gray-200 dark:border-gray-700'>
                                        {item?.fieldType === 'Message' && <FaRegMessage size={25} />}
                                        {item?.captureField === 'Person' && <IoPersonOutline size={25} />}
                                        {item?.captureField === 'Organization' && <HiOutlineBuildingOffice2 size={25} />}
                                        {item?.fieldType === 'Lead Status' && <PiHandsClapping size={30} />}
                                        {item?.fieldType === 'Greeting' && <PiHandsClapping size={30} />}
                                        {item?.fieldType === 'Question' && <BsQuestionSquare size={25} />}
                                        {item?.fieldType === 'Live Chat' && <TbBrandWechat size={25} />}
                                        {item?.captureField === 'Deal' && <BiDollarCircle size={25} />}
                                    </div>
                                    <div className='mt-1 flex-1'>
                                        <div className='mb-1 text-lg font-semibold w-72 break-words'>
                                            {item?.fieldType}&nbsp;
                                            {/* {item?.conversationFieldID} */}
                                            {/* &nbsp;{item?.conversationQuestionID} */}
                                        </div>
                                      
                                        <div className=' truncate-multi-line'  dangerouslySetInnerHTML={{ __html: item?.message ? item?.message : item?.closingMessage ? item?.closingMessage : item?.onlineMessage }} />
                                    </div>

                                </div>
                            </div>
                            <div className='absolute top-[14px] right-[-12px]  flex flex-col opacity-0'>
                                <button className='mb-2 px-1 h-6 max-w-6 border border-gray-200 dark:border-gray-700 rounded-sm cursor-pointer' onClick={() => { setopenmodal(true); setselectData(item) }} >
                                    <MdOutlineEdit />
                                </button>
                                {
                                    !(item?.fieldType === "Greeting") && (
                                        <button className='px-1 h-6 max-w-6 border border-gray-200 dark:border-gray-700 rounded-sm cursor-pointer' onClick={() => deleteConversationField(item?.conversationQuestionID, item?.conversationFieldID)}>
                                            <RiDeleteBin6Line />
                                        </button>
                                    )
                                }
                            </div>
                            {
                                item?.fieldType === "Greeting" && (
                                    <div className='absolute bottom-20 left-[45%] right-0'>
                                        <button
                                            type="submit"
                                            className="inline-block  focus:outline-none text-primary-500 bg-primary-500 text-white border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 bg-primary-500 text-sm  px-1   rounded"
                                        >
                                            PROACTIVE
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
