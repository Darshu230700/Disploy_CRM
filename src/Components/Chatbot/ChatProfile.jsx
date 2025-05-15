import React from 'react'
import { FaPen } from 'react-icons/fa6'


export default function ChatProfile({ settitle, title, }) {
    return (
        <div>
            <div
                className="bg-gray-50 rounded-lg dark:bg-gray-800 "
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
            >
                <div className="w-full p-3">
                    <form>
                        <h5 className="font-medium text-xl mb-4">Give your bot a personality</h5>
                        <p>Enter Name</p>
                        <div className="flex items-center relative my-2 ">
                            {/* <div className="w-16 h-16 relative ">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col w-16 h-16 items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <img
                                        src="../assets/images/users/avatar-4.jpg"
                                        alt=""
                                        className="rounded-full border-[8px] border-white dark:border-slate-800"
                                    />
                                    <input id="dropzone-file" type="file" className="hidden" />
                                    <span className="absolute cursor-pointer w-7 h-7 bg-green-600 rounded-full bottom-0 right-0 flex items-center justify-center border-2 border-white dark:border-slate-800">
                                        <IoMdCamera className="text-white text-xs" />
                                    </span>
                                </label>
                            </div> */}
                            <div className="flex flex-row gap-2 item-center">
                                <input
                                    type="text"
                                    name="title"
                                    className={`border border-gray-300 shadow p-3 w-full rounded-lg capitalize`}
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    autoFocus

                                />
                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}
