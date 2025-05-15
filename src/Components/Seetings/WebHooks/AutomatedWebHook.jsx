/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { formatDate } from '../../Common/Common'
import { MdDeleteForever } from 'react-icons/md'
   
// shraddha
export default function AutomatedWebHook({ data, DeleteAutoWebHook }) {
    return (
        <div>
            <div
                className="bg-gray-50 rounded-lg dark:bg-gray-800"
                id="dashboard"
                role="tabpanel"
                aria-labelledby="playbooks-tab"
            >
                <h2 className='text-lg mb-3'>Your webhooks ({`${data?.length}/40`})</h2>

                <div className="relative scroll-inner shadow-md sm:rounded-lg p-5">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-slate-700/20">
                            <tr>
                                <th scope="col" className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">Name</th>
                                <th scope="col" className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"> Endpoint URL</th>
                                <th scope="col" className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"> Created</th>
                                <th scope="col" className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"> ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.length > 0 ? (data.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-100 bg-white border-b dark:bg-gray-800 dark:border-gray-700" >

                                        <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white cursor-pointer capitalize" >
                                            <h3><a className="text-blue-500">{item?.webhookName}</a></h3>
                                        </td>

                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                            {item?.endPointURL}
                                        </td>
                                        <td className={`p-3 text-sm  whitespace-nowrap dark:text-gray-400 `}>
                                            {formatDate(item?.createdDate)}
                                        </td>
                                        <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                            <div className="flex justify-center gap-4">
                                                <div
                                                    data-tip
                                                    data-for="Delete"
                                                    className="relative flex-col group cursor-pointer text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                onClick={() => DeleteAutoWebHook(item?.automatedWebhookID)}
                                                >
                                                    <MdDeleteForever />
                                                    <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Delete</span>
                                                        <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))) :
                                    (<td colSpan={6}>
                                        <p className="text-center p-2">Not Found.</p>
                                    </td>)
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
