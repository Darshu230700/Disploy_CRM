/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ChatTemplate from "./ChatTemplate";
import Chatscreen from "./Chatscreen";
import ChatTheme from "./ChatTheme";
import { useDispatch } from "react-redux";
import { getChatbootByID, GetConversation, InsertChatboot } from "../../Redux/ChatSlice";
import Loading from "../Common/Loading";
import ChatProfile from "./ChatProfile";

const AddChatbot = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("theme");
  const [title, settitle] = useState('Pip')
  const [HeaderColor, setHeaderColor] = useState('#DE2159');
  const [MainColor, setMainColor] = useState('#148CD3');
  const [colorselecte, setcolorselecte] = useState('')
  const [selectChat, setSelectChat] = useState(1);
  const [allChatType, setAllChatType] = useState([]);
  const [chatBots, setChatBot] = useState([]);
  const [loading, setLoading] = useState(false)
  const [selecteTabs, setselecteTabs] = useState(["theme"]);

  useEffect(() => {
    setLoading(true)
    dispatch(GetConversation({})).then((res) => {
      setAllChatType(res?.payload?.data)
      setLoading(false)
    })
  }, [])


  useEffect(() => {
    dispatch(getChatbootByID(selectChat)).then((res) => {
      setChatBot(res?.payload?.data)
    })
  }, [selectChat])

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const handleSelectedItem = (tabName) => {
    setselecteTabs(tabName);
  };

  const handlerInsertChatBoot = async () => {

    const Payload = {
      chatbotID: 0,
      conversationID: chatBots?.conversationID,
      name: chatBots?.name,
      description: chatBots?.description,
      userID: 1,
      isactive: true,
      conversationMaster: chatBots?.conversationMaster,
      conversationStyleMaster: {
        conversationStyleID: 0,
        chatbotID: 0,
        headerColor: HeaderColor ? HeaderColor : colorselecte,
        mainColor: MainColor ? MainColor : colorselecte,
        botName: title,
        languageName: "string",
        languageID: 0,
        footerApperance: "string",
        userID: 1,
        createdBy: 0,
        createdOn: "2024-05-14T09:55:00.811Z",
        updateBy: 0,
        updatedOn: "2024-05-14T09:55:00.811Z"
      },
      conversationFieldMaster: chatBots?.conversationFieldMaster
    }

    const response = await dispatch(InsertChatboot(Payload))
    const chatbotData = response?.payload?.data
    if (response) {
      navigate(`/ChatBot/create/${chatbotData?.chatbotID}`)
    }
  }

  return (
    <>
      <div className="Wizardstyles__Wizard-sc-ufu9kt-3 izrKcI text-[#73767c]">
        {loading && (<Loading />)}

        <div className="shadow w-full h-full max-w-full max-h-full p-8 bg-white flex flex-col gap-4 Wizardstyles__Sidebar-sc-ufu9kt-0 gWvLVZ">
          <div className="animate-ModalSlide" id="New_Playbook_Form">
            <div className="relative pointer-events-none  sm:mx-auto z-[9999] max-w-none w-[100%]">
              <div className="relative flex flex-col w-full pointer-events-auto bg-white dark:bg-slate-800 bg-clip-padding rounded">
                <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4 h-full">
                  <div className="sm:col-span-12  md:col-span-7 lg:col-span-7 xl:col-span-7 h-full">
                    <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative h-full">
                      <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70 flex items-center justify-between">
                        <div className="w-full">
                          <ul
                            className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 mb-4"
                            id="myTab"
                            data-tabs-toggle="#myTabContent"
                            role="tablist"
                          >
                            <li
                              onClick={() => { handleTabClick("theme"); handleSelectedItem(["theme"]); }}
                              className="sm:col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-3 "
                              role="presentation"
                            >
                              <span
                                className={`w-full text-gray-500 hover:text-gray-600 border-gray-300  py-4 px-4  text-sm font-medium text-center border-b-2 dark:text-gray-400 rounded-none cursor-pointer dark:hover:text-gray-300 hover:border-blue-600 relative items-selected  ${selecteTabs.includes("theme") ? "active " : ""}`}
                                type="button"
                                role="tab"
                              >
                                Themes
                              </span>
                            </li>
                            <li
                              onClick={() => { handleTabClick("profile", "theme"); handleSelectedItem(["theme", "profile"]); }}
                              className="sm:col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-3 "
                              role="presentation"
                            >
                              <span
                                className={`w-full text-gray-500 hover:text-gray-600 border-gray-300  py-4 px-4  text-sm font-medium text-center border-b-2 dark:text-gray-400 rounded-none  cursor-pointer dark:hover:text-gray-300  hover:border-blue-600 relative items-selected ${selecteTabs.includes("profile") ? "active " : ""}`}
                                id="profile-tab"
                                data-tabs-target="#profile"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                              >
                                Profile
                              </span>
                            </li>
                            <li
                              onClick={() => { handleTabClick("template"); handleSelectedItem(["theme", "profile", "template"]); }}
                              className="sm:col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-3"
                              role="presentation"
                            >
                              <span
                                className={`w-full text-gray-500 hover:text-gray-600 border-gray-300  py-4 px-4  text-sm font-medium text-center border-b-2 dark:text-gray-400 rounded-none  cursor-pointer dark:hover:text-gray-300  hover:border-blue-600 relative items-selected ${activeTab === "template" ? "active " : ""}`}
                                id="Template-tab"
                                data-tabs-target="#Template"
                                type="button"
                                role="tab"
                                aria-controls="Template"
                                aria-selected="false"
                              >
                                Template
                              </span>
                            </li>
                          </ul>
                        </div>
                        <button
                          type="button"
                          className="box-content close mr-5"
                          aria-label="Close"
                          onClick={() => navigate(`/ChatBot`)}
                        >
                          <IoCloseSharp className="text-3xl" />
                        </button>
                      </div>

                      <div className="flex-auto p-4">
                        <div id="New_Playbook">
                          {activeTab === "theme" && (
                            <>
                              <ChatTheme colorselecte={colorselecte} setHeaderColor={setHeaderColor} setMainColor={setMainColor} HeaderColor={HeaderColor} MainColor={MainColor} setcolorselecte={setcolorselecte} />
                              <button
                                data-modal-toggle="modal"
                                className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-4 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                                onClick={() => { handleTabClick("profile", "theme"); handleSelectedItem(["theme", "profile"]); }}
                              >
                                Continue
                              </button>
                            </>
                          )}

                          {activeTab === "profile" && (
                            <>
                              <ChatProfile settitle={settitle} title={title} />
                              <button
                                data-modal-toggle="modal"
                                className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-4 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                                onClick={() => { handleTabClick("template"); handleSelectedItem(["theme", "profile", "template"]); }}
                              >
                                Continue
                              </button>
                            </>
                          )}
                          {activeTab === "template" && (<ChatTemplate loading={loading} selectChat={selectChat} allChatType={allChatType} setSelectChat={setSelectChat} handlerInsertChatBoot={handlerInsertChatBoot} />)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-12  md:col-span-5 lg:col-span-5 xl:col-span-5 m-0 h-full">
                    <Chatscreen colorselecte={colorselecte} MainColor={MainColor} HeaderColor={HeaderColor} title={title} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddChatbot;
