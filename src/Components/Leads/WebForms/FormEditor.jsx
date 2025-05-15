import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { MdOutlineEdit } from 'react-icons/md'
import { PiHandsClapping, PiTelegramLogoLight } from 'react-icons/pi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoMdLock } from "react-icons/io";
import { SlUser } from "react-icons/sl";
import { BiTargetLock } from "react-icons/bi";
import AddField from './AddField'
import SubmitButton from './SubmitButton'
import Introduction from './Introduction'
import WebFormDeleteCard from './WebFormDeleteCard'
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaRegMessage } from 'react-icons/fa6'

const FormEditor = ({ webForms, setWebForms }) => {
  const [openCreateModel, setOpenCreateModel] = useState(false)
  const [openEditModel, setOpenEditModel] = useState(false)
  const [openSubmitModel, setOpenSubmitModel] = useState(false)
  const [openIntroModel, setOpenIntroModel] = useState(false)
  const [deleteModel, setDeleteModel] = useState(false)
  const [selectData, setSelectData] = useState()
  const [selectIndex, setSelectIndex] = useState()


  const toggleModel = () => {
    setOpenEditModel(false)
    setOpenCreateModel(false)
    setOpenSubmitModel(false)
    setOpenIntroModel(false)
    setDeleteModel(false)
    setSelectData()
    setSelectIndex()
  }

  const handleDelete = () => {
    setWebForms({
      ...webForms,
      webFromFieldMaster: webForms?.webFromFieldMaster?.filter((item) =>
        item?.webFromFieldMasterID !== selectData?.webFromFieldMasterID
      )
    });
    toggleModel()
  }

  return (
    <>
      <div className='flex flex-1'>
        <div className='py-8 w-full relative flex flex-col '>
          <div className='flex justify-center z-50'>
            <div className='mx-2 flex flex-col max-w-[420px]'>
              {webForms?.webFromFieldMaster?.map((item, index) => {
                return (
                  <>
                    {item?.fieldType === "Label" && (
                      <div className='flex flex-col items-center relative w-full justify-center'>
                        <div className='flex flex-1 justify-center w-full transition-background duration-3000 ease-linear dark:text-gray-400 '>
                          <div className='w-full block '>
                            <div className='action-items-show relative w-full m-auto min-h-[80px] rounded-sm cursor-default flex flex-col border border-gray-200 dark:border-gray-700'>
                              <div className='cursor-pointer' onClick={() => { setOpenIntroModel(true); setSelectData(item) }}>
                                <div className='flex p-4 items-center'>
                                  <div className='flex flex-shrink-0 p-2 mr-3 w-12 justify-center items-center border border-gray-200 dark:border-gray-700'>
                                    <PiHandsClapping size={30} />
                                  </div>
                                  <div className='mt-1 flex-1'>
                                    <div className='mb-1 text-lg font-semibold w-72 break-words'>
                                      Introduction
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: item?.label }} />

                                    {/* <p className='mb-0 break-words w-72'>{item?.label?.replace(/<\/?p>/g, '')}</p> */}
                                  </div>
                                </div>
                              </div>
                              <div className='absolute top-[14px] right-[-12px] flex flex-col opacity-0'>
                                <button className='mb-2 px-1 h-6 max-w-6 border border-gray-200 dark:border-gray-700 rounded-sm cursor-pointer' onClick={() => { setOpenIntroModel(true); setSelectData(item) }}>
                                  <MdOutlineEdit />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {item?.fieldType === "Input" && (
                      <div className='flex flex-col items-center relative w-full justify-center'>
                        <div className='h-16 w-9 border-l order-gray-200 dark:border-gray-700 absolute left-[50%] top-0'>
                        </div>
                        <div className='py-5 absolute left-[50%] top-0 ml-[-15px] action-items-show'>
                          <button className='opacity-0 px-1 min-w-6 bg-green border-none items-center m-0 shadow-sm rounded-sm' onClick={() => { setOpenCreateModel(true); setSelectIndex(index) }}>
                            <GoPlus size={20} />
                          </button>
                        </div>
                        <div className='flex mt-16 flex-1 justify-center w-full transition-background duration-3000 ease-linear dark:text-gray-400 '>
                          <div className='w-full block '>
                            <div className='action-items-show relative w-full m-auto min-h-[80px] rounded-sm cursor-default flex flex-col border border-gray-200 dark:border-gray-700'>
                              <div className='cursor-pointer' onClick={() => { setOpenEditModel(true); setSelectData(item) }}>
                                <div className='flex p-4 items-center'>
                                  <div className='flex flex-shrink-0 p-2 mr-3 w-12 justify-center items-center border border-gray-200 dark:border-gray-700'>
                                    {item?.field_name === "Person" && (
                                      <SlUser size={30} />
                                    )}
                                    {item?.field_name === "Organization" && (
                                      <HiOutlineBuildingOffice2 size={30} />
                                    )}
                                    {item?.field_name === "Lead" && (
                                      <BiTargetLock size={30} />
                                    )}
                                  </div>
                                  <div className='my-1 flex flex-col'>
                                    <div className='flex flex-row gap-1 items-center'>
                                      <div className='text-lg font-semibold'>{item?.field_name}</div>
                                      <div className='text-lg font-semibold'> | </div>
                                      <div className='text-lg'>{item?.input_type}</div>
                                      <div>{item?.isRequired ? "" : "(optional)"}</div>
                                    </div>
                                    <div className=' truncate-multi-line' dangerouslySetInnerHTML={{ __html: item?.label }} />
                                    {/* <div>{item?.label?.replace(/<\/?p>/g, '')}</div> */}
                                  </div>
                                </div>
                              </div>
                              <div className='absolute top-[14px] right-[-12px]  flex flex-col opacity-0'>
                                <button className='mb-2 px-1 h-6 max-w-6 border border-gray-200 dark:border-gray-700 rounded-sm cursor-pointer' onClick={() => { setOpenEditModel(true); setSelectData(item) }}>
                                  <MdOutlineEdit />
                                </button>
                                <button className='px-1 h-6 max-w-6 border border-gray-200 dark:border-gray-700 rounded-sm cursor-pointer' onClick={() => { setDeleteModel(true); setSelectData(item) }}>
                                  <RiDeleteBin6Line />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {item?.fieldType === "Message" && (
                      <div className='flex flex-col items-center relative w-full justify-center'>
                        <div className='h-16 w-9 border-l order-gray-200 dark:border-gray-700 absolute left-[50%] top-0'>
                        </div>
                        <div className='py-5 absolute left-[50%] top-0 ml-[-15px] action-items-show'>
                          <button className='opacity-0 px-1 min-w-6 bg-green border-none items-center m-0 shadow-sm rounded-sm' onClick={() => { setOpenCreateModel(true); setSelectIndex(index) }}>
                            <GoPlus size={20} />
                          </button>
                        </div>
                        <div className='flex mt-16 flex-1 justify-center w-full transition-background duration-3000 ease-linear dark:text-gray-400 '>
                          <div className='w-full block '>
                            <div className='action-items-show relative w-full m-auto min-h-[80px] rounded-sm cursor-default flex flex-col border border-gray-200 dark:border-gray-700'>
                              <div className='cursor-pointer' onClick={() => { setOpenEditModel(true); setSelectData(item) }}>
                                <div className='flex p-4 items-center'>
                                  <div className='flex flex-shrink-0 p-2 mr-3 w-12 justify-center items-center border border-gray-200 dark:border-gray-700'>
                                    {item?.field_name === "Message" && <FaRegMessage size={20} />}
                                    {item?.field_name === "Lead" && (<BiTargetLock size={30} />)}
                                  </div>
                                  <div className='my-1 flex flex-col'>
                                    <div className='flex flex-row gap-1 items-center'>
                                      <div className='text-lg font-semibold'>
                                        {item?.field_name}
                                      </div>
                                      {item?.field_name !== "Message" && (
                                        <div className='text-lg font-semibold'> | </div>
                                      )}
                                      <div className='text-lg'>
                                        {item?.input_type}
                                      </div>
                                      <div>
                                        {item?.field_name !== "Message" && (item?.isRequired ? "" : "(optional)")}
                                      </div>
                                    </div>
                                    <div className='truncate-multi-line' dangerouslySetInnerHTML={{ __html: item?.label }} />

                                    {/* <div>{item?.label?.replace(/<\/?p>/g, '')}</div> */}
                                  </div>
                                </div>
                              </div>
                              <div className='absolute top-[14px] right-[-12px]  flex flex-col opacity-0'>
                                <button className='mb-2 px-1 h-6 max-w-6 border border-gray-200 dark:border-gray-700 rounded-sm cursor-pointer' onClick={() => { setOpenEditModel(true); setSelectData(item) }}>
                                  <MdOutlineEdit />
                                </button>
                                <button className='px-1 h-6 max-w-6 border border-gray-200 dark:border-gray-700 rounded-sm cursor-pointer' onClick={() => { setDeleteModel(true); setSelectData(item) }}>
                                  <RiDeleteBin6Line />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {item?.fieldType === "Button" && (
                      <div className='flex flex-col items-center relative w-full justify-center'>
                        <div className='h-16 w-9 border-l order-gray-200 dark:border-gray-700 absolute left-[50%] top-0'>
                        </div>
                        <div className='py-5 absolute left-[50%] top-0 ml-[-15px] action-items-show'>
                          <button className='opacity-0 px-1 min-w-6 bg-green border-none items-center m-0 shadow-sm rounded-sm' onClick={() => { setOpenCreateModel(true); setSelectIndex(index) }}>
                            <GoPlus size={20} />
                          </button>
                        </div>
                        <div className='flex mt-16 flex-1 justify-center w-full transition-background duration-3000 ease-linear dark:text-gray-400 '>
                          <div className='w-full block '>
                            <div className='action-items-show relative w-full m-auto min-h-[80px] rounded-sm cursor-default flex flex-col border border-gray-200 dark:border-gray-700'>
                              <div className='cursor-pointer' onClick={() => { setOpenSubmitModel(true); setSelectData(item) }}>
                                <div className='flex p-4'>
                                  <div className='flex flex-shrink-0 p-2 mr-3 w-12 justify-center items-center border border-gray-200 dark:border-gray-700'>
                                    <PiTelegramLogoLight size={30} />
                                  </div>
                                  <div className='mt-1 flex-1'>
                                    <div className='flex flex-row justify-between items-center mr-3'>
                                      <div className='flex flex-col'>
                                        <div className='mb-1 text-lg font-semibold w-36'>
                                          Submit button
                                        </div>
                                        <div>
                                          {item?.label?.replace(/<\/?p>/g, '')}
                                        </div>
                                      </div>
                                      {item?.isRequired && (
                                        <div className='flex flex-row items-center gap-2'>
                                          <IoMdLock size={20} />
                                          <span className='text-xs'>
                                            SPAM PROTECTED</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='absolute top-[14px] right-[-12px]  flex flex-col opacity-0'>
                                <button className='mb-2 px-1 h-6 max-w-6 border border-gray-200 dark:border-gray-700 rounded-sm cursor-pointer' onClick={() => { setOpenSubmitModel(true); setSelectData(item) }}>
                                  <MdOutlineEdit />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {openCreateModel && (
        <AddField openEditModel={openEditModel} toggleModel={toggleModel} selectData={selectData} setWebForms={setWebForms} webForms={webForms} selectIndex={selectIndex} />
      )}
      {openEditModel && (
        <AddField openEditModel={openEditModel} toggleModel={toggleModel} selectData={selectData} setWebForms={setWebForms} webForms={webForms} selectIndex={selectIndex} />
      )}
      {openSubmitModel && (
        <SubmitButton toggleModel={toggleModel} selectData={selectData} setWebForms={setWebForms} webForms={webForms} />
      )}
      {openIntroModel && (
        <Introduction toggleModel={toggleModel} selectData={selectData} setWebForms={setWebForms} webForms={webForms} />
      )}
      {deleteModel && (
        <WebFormDeleteCard handleDelete={handleDelete} toggleModel={toggleModel} selectData={selectData} setWebForms={setWebForms} webForms={webForms} />
      )}
    </>
  )
}

export default FormEditor
