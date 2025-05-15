/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { BiSolidMicrophone } from 'react-icons/bi'
import { IoMdSend } from 'react-icons/io'
import { PiLinkSimpleBold } from 'react-icons/pi'

export default function Chatscreen({ MainColor, HeaderColor, colorselecte, title }) {

    return (
        <div className="">
            <div className="sm:col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-5 bg-gray-200 p-6 h-full flex items-center">
                <div className="h-screen bg-gray-300 w-full">
                    <div className="flex justify-center items-center h-screen ">
                        <div className="w-96 h-96">
                            <div className='rounded bg-white shadow-2xl p-4'>

                                <nav className="w-full h-10  rounded-tr rounded-tl flex justify-between items-center" style={{ background: HeaderColor ? HeaderColor : colorselecte }}>
                                    <div className="flex justify-center items-center">
                                        <img
                                            src="https://i.imgur.com/IAgGUYF.jpg"
                                            className="rounded-full ml-1"
                                            width={25}
                                            height={25}
                                        />
                                        <span className="text-xs font-medium text-white ml-1 capitalize">
                                            {title}
                                        </span>
                                    </div>
                                </nav>
                                <div
                                    className="overflow-auto px-1 py-1"
                                    style={{ height: "18rem" }}
                                    id="journal-scroll"
                                >
                                    <div className="flex items-center pr-10">
                                        {" "}
                                        <img
                                            src="https://i.imgur.com/IAgGUYF.jpg"
                                            className="rounded-full shadow-xl"
                                            width={15}
                                            height={15}
                                            style={{ boxShadow: "" }}
                                        />{" "}
                                        <span
                                            className="flex ml-1 h-auto bg-blue-500 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end"
                                            style={{ fontSize: 10 }}
                                        >
                                            Hi Dr.Hendrikson, I haven't been feeling well for past few days.{" "}
                                            <span className="text-gray-400 pl-1" style={{ fontSize: 8 }}>
                                                01:25am
                                            </span>
                                        </span>{" "}
                                    </div>
                                    <div className="flex justify-end pt-2 pl-10">
                                        {" "}
                                        <span
                                            className="bg-blue-100 h-auto text-gray-900 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end "
                                            style={{ fontSize: 10 }}
                                        >
                                            Lets jump on a video call.{" "}
                                            <span className="text-gray-400 pl-1" style={{ fontSize: 8 }}>
                                                02.30am
                                            </span>
                                        </span>{" "}
                                    </div>
                                    <div className="flex items-center pr-10 mt-1">
                                        {" "}
                                        <img
                                            src="https://i.imgur.com/IAgGUYF.jpg"
                                            className="rounded-full shadow-xl"
                                            width={15}
                                            height={15}
                                        />{" "}
                                        <span
                                            className="flex ml-1 h-auto bg-blue-500 text-gray-200 text-xs p-1 font-normal rounded-sm px-1 items-end"
                                            style={{ fontSize: 10 }}
                                        >
                                            How often should i take the medicine?{" "}
                                            <span className="text-gray-400 pl-1" style={{ fontSize: 8 }}>
                                                01:25am
                                            </span>
                                        </span>{" "}
                                    </div>
                                    <div className="flex justify-end pt-2 pl-10">
                                        {" "}
                                        <span
                                            className="bg-blue-100 h-auto text-gray-900 text-xs font-normal p-1 rounded-sm px-1 items-end flex justify-end "
                                            style={{ fontSize: 10 }}
                                        >
                                            Twice a day, at breakfast and before bed{" "}
                                            <span className="text-gray-400 pl-1" style={{ fontSize: 8 }}>
                                                02.30am
                                            </span>
                                        </span>{" "}
                                    </div>
                                    <div className="flex items-center pr-10 pt-2">
                                        {" "}
                                        <img
                                            src="https://i.imgur.com/IAgGUYF.jpg"
                                            className="rounded-full shadow-xl"
                                            width={15}
                                            height={15}
                                        />{" "}
                                        <span
                                            className="flex ml-1 h-auto bg-blue-500 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end"
                                            style={{ fontSize: 10 }}
                                        >
                                            Thanks a lot doc
                                            <span className="text-gray-400 pl-1" style={{ fontSize: 8 }}>
                                                01:25am
                                            </span>
                                        </span>{" "}
                                    </div>
                                    <div className="flex justify-end pt-2 pl-10">
                                        {" "}
                                        <span
                                            className="bg-blue-100 h-auto text-gray-900 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end "
                                            style={{ fontSize: 10 }}
                                        >
                                            Thats my duty, mention not{" "}
                                            <span className="text-gray-400 pl-1" style={{ fontSize: 8 }}>
                                                02.30am
                                            </span>
                                        </span>{" "}
                                    </div>
                                    <div className="flex items-center pr-10 pt-2">
                                        {" "}
                                        <img
                                            src="https://i.imgur.com/IAgGUYF.jpg"
                                            className="rounded-full shadow-xl"
                                            width={15}
                                            height={15}
                                        />{" "}
                                        <span
                                            className="flex ml-1 h-auto bg-blue-500 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end"
                                            style={{ fontSize: 10 }}
                                        >
                                            sorry to bother again but can i ask you one more favour?
                                            <span className="text-gray-400 pl-1" style={{ fontSize: 8 }}>
                                                01:25am
                                            </span>
                                        </span>{" "}
                                    </div>
                                    <div className="flex justify-end pt-2 pl-10">
                                        {" "}
                                        <span
                                            className="bg-blue-100 h-auto text-gray-900 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end "
                                            style={{ fontSize: 10 }}
                                        >
                                            yeah sure, go ahead?
                                            <span className="text-gray-400 pl-1" style={{ fontSize: 8 }}>
                                                02.30am
                                            </span>
                                        </span>{" "}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center gap-2 p-1">
                                    <div className="relative w-full">
                                        <PiLinkSimpleBold className='absolute top-1.5 left-2 text-white' style={{ fontSize: "17px !important", fontWeight: "bold" }} />

                                        <input
                                            type="text"
                                            className="rounded-full pl-9 ps-15 py-2 focus:outline-none h-auto placeholder-gray-100  text-white"
                                            style={{ fontSize: 11, width: "100%", background: MainColor ? MainColor : colorselecte }}
                                            placeholder="Type a message..."
                                            disabled
                                            id="typemsg"
                                        />
                                    </div>
                                    <div className="w-7 h-7 rounded-full  text-center items-center flex justify-center">
                                        <button
                                            className="w-7 h-7 rounded-full text-center items-center flex justify-center focus:outline-none text-white" style={{ background: MainColor ? MainColor : colorselecte }}
                                            onclick="sendbtn();"
                                        >
                                            <IoMdSend />
                                        </button>{" "}
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
