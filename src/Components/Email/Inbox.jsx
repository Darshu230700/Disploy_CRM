/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import { getGmailDetailsbyID, } from '../../Redux/EmailSlice';
import SelectMailInbox from './SelectMailInbox';


const Inbox = ({ InboxData, SelectedMail, setSelectedMail, totalPages, currentPage, handlePageChange, totalCount, pageSize, setPageSize, setCurrentPage }) => {
    const dispatch = useDispatch()

    const [selectData, setSelectData] = useState("")
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        setLoading(true)

        const query = { MailDetailsID: SelectedMail }
        dispatch(getGmailDetailsbyID(query)).then((res) => {
            if (res?.payload?.status) {
                setSelectData(res?.payload?.data)
            }
            setTimeout(() => {
                setLoading(false)
            }, 1000);

        }).catch((err) => {
            console.log('err', err)
            setLoading(false)
        })
    }

    useEffect(() => {
        if (SelectedMail !== "") {
            fetchData()
        }
    }, [SelectedMail])

    return (
        <>
            {SelectedMail === "" && (
                <div class="flex h-full flex-col w-full ">
                    <div class="h-full ">
                        <table class="h-full w-full table-auto">
                            <thead>
                                <tr class="flex border-y border-stroke dark:border-strokedark">
                                    <th class="w-[65%] py-6 pl-4 pr-4 lg:pl-10 xl:w-1/4">
                                        <label for="checkbox-1" class="flex cursor-pointer select-none items-center font-medium">
                                            Sender
                                        </label>
                                    </th>
                                    <th class="hidden w-3/5 px-4 py-6 xl:block">
                                        <p class="text-left font-medium">Subject</p>
                                    </th>
                                    <th class="w-[35%] py-6 pl-4 pr-4 lg:pr-10 xl:w-[20%]">
                                        <p class="text-right font-medium">Date</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="block h-full max-h-full vertical-scroll-inner py-4">
                                {InboxData?.map((item) => {
                                    return (
                                        <tr class="flex cursor-pointer items-center hover:bg-whiten dark:hover:bg-boxdark-2 hover:bg-primary/5" key={item?.mailDetailsID} onClick={() => setSelectedMail(item?.mailDetailsID)}>
                                            <td class="w-[65%] py-4 pl-4 pr-4 lg:pl-10 xl:w-1/4">
                                                <label for="checkbox-2"
                                                    class="flex cursor-pointer select-none items-center text-sm font-medium sm:text-base">
                                                    {item?.senderName}
                                                </label>
                                            </td>
                                            <td class="hidden w-3/5 p-4 xl:block">
                                                <p>
                                                    {item?.subject}
                                                </p>
                                            </td>
                                            <td class="w-[35%] py-4 pl-4 pr-4 lg:pr-10 xl:w-[20%]">
                                                <p class="text-right text-xs xl:text-base">
                                                    {moment(item?.sendDateTime).format('DD MMMM, YYYY')}
                                                </p>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {InboxData?.length === 0 && (
                                    <div className="flex text-center h-full items-center m-5 justify-center">
                                        <span className="text-2xl font-semibold py-2 px-4 rounded-full me-2 text-black">
                                            No Data Available
                                        </span>
                                    </div>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div
                        class="flex items-center justify-between border-t border-stroke p-4 dark:border-strokedark sm:px-6">
                        <p class="text-base font-medium text-black dark:text-white md:text-lg">
                          Total Emails  {totalCount}
                        </p>
                        <div class="flex items-center justify-end space-x-3">
                            <select className='p-2 border border-gray rounded-lg' value={pageSize} onChange={(e) => { setPageSize(e.target.value); setCurrentPage(1) }}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                            <button
                                class="flex h-7.5 w-7.5 items-center cursor-pointer p-1 justify-center rounded border border-stroke bg-whiten hover:border-primary hover:bg-primary hover:text-white"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <GrFormPreviousLink size={26} />
                            </button>
                            <p class="text-base font-medium text-black dark:text-white md:text-lg">
                               {currentPage}  of {totalPages}
                            </p>
                            <button
                                class="flex h-7.5 w-7.5 items-center cursor-pointer p-1 justify-center rounded border border-stroke bg-whiten hover:border-primary hover:bg-primary hover:text-white"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={(currentPage === totalPages) || (InboxData?.length === 0)}
                            >
                                <GrFormNextLink size={26} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {!loading && SelectedMail && (
                <SelectMailInbox selectData={selectData} setSelectedMail={setSelectedMail} />
            )}

            {loading && SelectedMail && (
                <div className="flex justify-center p-5 w-full items-center">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
        </>
    )
}

export default Inbox
