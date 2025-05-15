import { AiOutlineDollar } from 'react-icons/ai';
import { BsCalendar2Event } from 'react-icons/bs';
import { TbTargetArrow } from 'react-icons/tb';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';

export default function ChatTemplate({ loading, selectChat, allChatType, setSelectChat, handlerInsertChatBoot }) {

    return (
        <div>

            {!loading && (
                <div
                    className="bg-gray-50 rounded-lg dark:bg-gray-800 "
                    id="Template"
                    role="tabpanel"
                    aria-labelledby="Template-tab"
                >
                    <h5 className=" text-xl">Choose a conversation template</h5>
                    <p>
                        Get started with one of our predefined templates. Save time and explore all
                        the features Chatbot has to offer.
                    </p>
                    <div className="w-full mt-4">
                        {allChatType?.map((item, index) => {
                            return (
                                <div key={index}
                                    className={`border ${selectChat === item?.conversationID
                                        ? "border-[#2B74DA] bg-[#F0FFFF]"
                                        : "border-[#21232C1A] bg-white"
                                        } rounded-md p-3 cursor-pointer mb-5`}
                                    onClick={() => setSelectChat(item?.conversationID)}
                                >
                                    <div className="flex items-center gap-4 cursor-pointer">
                                        <div
                                            className={`border rounded-md cursor-pointer ${selectChat === item?.conversationID ? "border-[#72ADFF]" : "border-[#21232C1A]"
                                                } cursor-pointer p-3`}
                                        >
                                            {item?.conversationID === 1 && (
                                                <AiOutlineDollar
                                                    size={26}
                                                    className={`${selectChat === item?.conversationID ? "text-blue" : "text-[#73767C]"
                                                        } cursor-pointer`}
                                                />
                                            )}
                                            {item?.conversationID === 2 && (
                                                <BsCalendar2Event
                                                    size={26}
                                                    className={`${selectChat === item?.conversationID ? "text-blue" : "text-[#73767C]"
                                                        } cursor-pointer`}
                                                />
                                            )}
                                            {item?.conversationID === 3 && (
                                                <TbTargetArrow
                                                    size={26}
                                                    className={`${selectChat === item?.conversationID ? "text-blue" : "text-[#73767C]"
                                                        } cursor-pointer`}
                                                />
                                            )}
                                            {item?.conversationID === 4 && (
                                                <IoChatboxEllipsesOutline
                                                    size={26}
                                                    className={`${selectChat === item?.conversationID ? "text-blue" : "text-[#73767C]"
                                                        } cursor-pointer`}
                                                />
                                            )}
                                        </div>
                                        <div className="flex flex-col cursor-pointer">
                                            <div className='flex flex-row items-center gap-3'>
                                                <label className="font-medium text-lg cursor-pointer">
                                                    {item?.name}
                                                </label>
                                                <span className={` text-white text-[11px] font-medium mr-1 px-2.5 py-0.5 rounded-full ${item?.labelColor === "#4164D4" ? "text-white" : "text-black"} `} style={{ backgroundColor: item?.labelColor }}>
                                                    {item?.label ? item?.label : ""}
                                                </span>
                                            </div>
                                            <p className="cursor-pointer">
                                                {item?.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <button
                        data-modal-toggle="modal"
                        className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-4 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                        onClick={handlerInsertChatBoot}
                    >
                        Create Playbook
                    </button>
                </div>
            )
            }
        </div >
    )
}
