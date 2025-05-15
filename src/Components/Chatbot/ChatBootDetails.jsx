/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Sidebar from '../Common/Sidebar'
import Navbar from '../Common/Navbar'
import Loading from '../Common/Loading'
import { MdOutlineEdit } from 'react-icons/md'
import ChatTheme from './ChatTheme'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getActiveMeetings, getChatbootUserByID, InsertChatboot } from '../../Redux/ChatSlice'
import PlaybookEditor from './PlaybookEditor'
import Installation from './Installation'
import ChatProfile from './ChatProfile'
import { getAllVisibleTo } from '../../Redux/CommonSlice'
import OpenChatPopup from './OpenChatPopup'

export default function ChatBootDetails({ isVisible, setIsVisible, setSidebarOpen, sidebarOpen, isDark, setIsDark }) {

    const { id } = useParams();

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setloading] = useState(true)
    const [chatBots, setChatBot] = useState([]);
    const [loadFrist, setloadFrist] = useState(true);
    const [activeTab, setActiveTab] = useState("Playbook editor");
    const [name, setname] = useState('');
    const [discription, setdiscription] = useState('');
    const [HeaderColor, setHeaderColor] = useState('#DE2159');
    const [MainColor, setMainColor] = useState('#148CD3');
    const [colorselecte, setcolorselecte] = useState('')
    const [title, settitle] = useState('Pip')
    const [toggle, settoggle] = useState(true);
    const [steps, setSteps] = useState([]);
    const [openChatPopup, setOpenChatPopup] = useState(false);

    const theme = {
        headerBgColor: HeaderColor ? HeaderColor : colorselecte,
        headerFontColor: '#fff',
        headerFontSize: '15px',
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerFontFamily: 'Montseratt',
        botBubbleColor: '#3333ff',
        botFontColor: '#fff',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
    };

    useEffect(() => {
        if (loadFrist) {
            setloading(true)
            dispatch(getAllVisibleTo({}));
            dispatch(getActiveMeetings({ IsActive: true }))
            dispatch(getChatbootUserByID(id))
                .then((res) => {
                    setChatBot(res?.payload?.data)
                    const timer = setTimeout(() => {
                        setloading(false)
                    }, 500);

                    return () => clearTimeout(timer);
                })
            setloadFrist(false)
        }
    }, [loadFrist, id])

    useEffect(() => {
        if (chatBots) {
            setname(chatBots?.name)
            setdiscription(chatBots?.description)
            settitle(chatBots?.conversationStyleMaster?.botName)
            setHeaderColor(
                chatBots?.conversationStyleMaster?.headerColor !== '#08A742' &&
                    chatBots?.conversationStyleMaster?.headerColor !== "#2d3748" &&
                    chatBots?.conversationStyleMaster?.headerColor !== "#3B82F6"
                    ? chatBots?.conversationStyleMaster?.headerColor
                    : ''
            );
            settoggle(chatBots?.isactive)
            setMainColor(chatBots?.conversationStyleMaster?.mainColor !== '#08A742' && chatBots?.conversationStyleMaster?.mainColor !== '#2d3748' && chatBots?.conversationStyleMaster?.mainColor !== '#3B82F6' ? chatBots?.conversationStyleMaster?.mainColor : "")
            setcolorselecte(chatBots?.conversationStyleMaster?.mainColor === '#08A742' || chatBots?.conversationStyleMaster?.mainColor === '#2d3748' || chatBots?.conversationStyleMaster?.mainColor === '#3B82F6' ? chatBots?.conversationStyleMaster?.mainColor : "")
        }
    }, [chatBots]);



    useEffect(() => {
        if (Array.isArray(chatBots?.conversationFieldMaster)) {
            const stepsArr = [];
            const idMap = {};
            let currentId = 1;


            const createStep = (item, id, trigger) => {

                const step = {
                    id: id.toString(),
                    message: getTextFromHTML(item?.message) || getTextFromHTML(item?.closingMessage),
                };
                if (trigger) step.trigger = trigger;
                if (item.fieldType === 'Lead Status') step.end = true;
                return step;
            };


            const getTextFromHTML = (htmlString) => {
                const div = document.createElement('div');
                div.innerHTML = htmlString;
                return div.textContent || div.innerText || '';
            };


            chatBots.conversationFieldMaster.forEach(item => {
                if (!item?.conversationFieldID) return;

                const stepId = currentId.toString();
                idMap[item.conversationFieldID] = stepId;
                currentId++;

                if (item.fieldType === 'Question') {
                    stepsArr.push(createStep(item, stepId));
                    const optionsStepId = currentId.toString();
                    stepsArr.push({ id: optionsStepId, options: [] });
                    idMap[item.conversationFieldID] = optionsStepId;
                    currentId++;

                    item.questionMaster.forEach(subQuestion => {
                        subQuestion.conversationFieldMasters.forEach(subItem => {
                            const subStepId = currentId.toString();
                            stepsArr.push(createStep(subItem, subStepId));
                            idMap[subItem.conversationFieldID] = subStepId;
                            currentId++;
                        });
                    });
                } else {
                    stepsArr.push(createStep(item, stepId));
                }
            });


            stepsArr.forEach((step) => {
                if (step.options) {

                    const questionItem = chatBots.conversationFieldMaster.find(item => idMap[item.conversationFieldID] === step.id);
                    if (questionItem && questionItem.fieldType === 'Question') {
                        step.options = questionItem.questionMaster.map(opt => {
                            const trigger = idMap[opt.conversationFieldMasters[0]?.conversationFieldID.toString()];
                            return {
                                value: opt.conversationQuestionID,
                                label: getTextFromHTML(opt.question),
                                trigger: trigger
                            };
                        });
                    }
                }
            });


            stepsArr.forEach((step, index) => {
                if (step.message && !step.user && !step.end) {
                    if (step.message.includes('?')) {
                        const nextStep = stepsArr[index + 1];
                        if (nextStep && nextStep.message && nextStep.trigger !== 'end') {
                            const userStepId = currentId.toString();
                            stepsArr.splice(index + 1, 0, { id: userStepId, user: true, trigger: nextStep.trigger });
                            currentId++;
                        }
                    }
                }
            });


            stepsArr.forEach((step, index) => {
                if (!step.end) {
                    const nextStep = stepsArr[index + 1];
                    step.trigger = nextStep ? nextStep.id : 'end';
                }
            });

            setSteps(stepsArr);
        } else {
            console.warn('conversationFieldMaster is not an array or is undefined');
        }
    }, [chatBots?.conversationFieldMaster]);


    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handlerInsertChatBoot = async () => {
        const Payload = {
            chatbotID: id,
            conversationID: 0,
            name: name,
            isactive: toggle,
            description: discription,
            userID: 0,
            conversationMaster: {
                conversationID: chatBots?.conversationMaster?.conversationID,
                chatbotID: 0,
                name: name,
                description: discription,
                label: chatBots?.conversationMaster?.label,
                labelColor: chatBots?.conversationMaster?.labelColor,
                icon: chatBots?.conversationMaster?.icon,
                isActive: true,
                createdOn: chatBots?.createdOn,
                createdBy: chatBots?.createdBy,
                modifiedOn: chatBots?.modifiedOn,
                modifiedBy: 0,
                userID: 0
            },
            conversationStyleMaster: {
                conversationStyleID: chatBots?.conversationStyleMaster?.conversationStyleID ? chatBots?.conversationStyleMaster?.conversationStyleID : 0,
                chatbotID: 0,
                headerColor: HeaderColor ? HeaderColor : colorselecte,
                mainColor: MainColor ? MainColor : colorselecte,
                botName: title,
                languageName: chatBots?.conversationStyleMaster?.languageName,
                languageID: chatBots?.conversationStyleMaster?.languageID,
                footerApperance: chatBots?.conversationStyleMaster?.footerApperance,
                userID: chatBots?.conversationStyleMaster?.userID,
            },
            conversationFieldMaster: chatBots?.conversationFieldMaster
        }
        const response = await dispatch(InsertChatboot(Payload))

        if (response) {
            setloadFrist(true)
            navigate('/ChatBot')
        }
    }

    const toggleModel = () => {
        setOpenChatPopup(!openChatPopup)
    }


    return (
        <>
            <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
            <Navbar isVisible={isVisible} setIsVisible={setIsVisible} isDark={isDark} setIsDark={setIsDark} />
            <div className="flex flex-1 ">
                <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] pt-[54px] duration-300">
                    <div className="xl:w-full min-h-[calc(100vh-138px)] relative pb-6 mt-10">
                        <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative ">
                            {loading && (
                                <div className="flex justify-center items-center h-screen">
                                    <Loading />
                                </div>
                            )}
                            {!loading && (
                                <div className='flex flex-col'>
                                    <div className='p-6 gap-4 flex flex-col'>
                                        <div className='flex flex-row justify-between gap-3'>
                                            <div className='flex flex-row gap-2 items-center'>
                                                <input type='text' className='sc-iMWBiJ bTicHx' value={name} onChange={(e) => setname(e.target.value)} />
                                                <MdOutlineEdit size={26} className="cursor-pointer" />
                                            </div>
                                            <div className='flex gap-3 items-center'>
                                                <form className='flex gap-3 items-center' >
                                                    <div className='flex gap-4'>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                checked={toggle}
                                                                id='CurrencyShow'
                                                                onChange={() => settoggle(!toggle)}
                                                            />
                                                            <label
                                                                htmlFor="CurrencyShow"
                                                                className={`w-10 h-5  rounded-full flex items-center p-1 cursor-pointer peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-green-500 transition-colors duration-300 ease-in-out ${toggle === true ? ' bg-green-500' : 'bg-red-500'}`}
                                                            >
                                                                <span className={`w-4 h-4  rounded-full shadow-md transform transition-transform duration-300 ease-in-out bg-white ${toggle === true ? 'translate-x-5 ' : 'bg-white'}`}></span>
                                                            </label>

                                                        </label>
                                                        <label> Active</label>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                                        onClick={() => navigate("/ChatBot")}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                                        onClick={handlerInsertChatBoot}
                                                    >
                                                        Save
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div className='lg:w-96 md:w-96 xs:w-full flex flex-row gap-2 items-center'>
                                                <input type='text' className='sc-iMWBiJ bTicHx' value={discription} onChange={(e) => setdiscription(e.target.value)} />
                                                <MdOutlineEdit size={26} className="cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-b border-gray-200 dark:border-gray-700">
                                        <ul
                                            className="flex flex-wrap -mb-px"
                                            id="myTab"
                                            role="tablist"
                                        >
                                            <li role="presentation">
                                                <button
                                                    className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-3 px-3 text-base font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${activeTab === "Playbook editor" ? "active" : ""
                                                        }`}
                                                    id="Form-editor-tab"
                                                    onClick={() => handleTabClick("Playbook editor")}
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="Form-editor"
                                                    aria-selected={activeTab === "Playbook editor"}
                                                >
                                                    Playbook editor
                                                </button>
                                            </li>
                                            <li role="presentation">
                                                <button
                                                    className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-3 px-3 text-base font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${activeTab === "Style" ? "active" : ""
                                                        }`}
                                                    id="Style-tab"
                                                    onClick={() => handleTabClick("Profile and theme")}
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="Profile and theme"
                                                    aria-selected={activeTab === "Profile and theme"}
                                                >
                                                    Profile and theme
                                                </button>
                                            </li>
                                            <li role="presentation">
                                                <button
                                                    className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-3 px-3 text-base font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${activeTab === "Submit options"
                                                        ? "active"
                                                        : ""
                                                        }`}
                                                    id="Submit-options-tab"
                                                    onClick={() =>
                                                        handleTabClick("Installation")
                                                    }
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="Submit-options"
                                                    aria-selected={
                                                        activeTab === "Installation"
                                                    }
                                                >
                                                    Installation
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    {activeTab === "Playbook editor" && (
                                        <>
                                            <div className='grid scroll-inner '>
                                                <PlaybookEditor chatBots={chatBots} setChatBot={setChatBot} setloadFrist={setloadFrist} />
                                            </div>
                                        </>
                                    )}
                                    {activeTab === "Profile and theme" && (
                                        <div className='grid grid-cols-12 gap-4'>
                                            <div className='col-span-8 p-5'>
                                                <ChatProfile settitle={settitle} title={title} />
                                                <div className='p-3'>
                                                    <ChatTheme setcolorselecte={setcolorselecte} colorselecte={colorselecte} setHeaderColor={setHeaderColor} setMainColor={setMainColor} HeaderColor={HeaderColor} MainColor={MainColor} />
                                                </div>
                                            </div>
                                           {/* <div className='col-span-4'>
                                                <Chatscreen colorselecte={colorselecte} MainColor={MainColor} HeaderColor={HeaderColor} title={title} />
                                            </div>*/}
                                        </div>
                                    )}
                                    {activeTab === "Installation" && (
                                        <div className='grid grid-cols-12 gap-4'>
                                            <div className='col-span-8'>
                                                <Installation />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                    {/* <div id="pipedrive-chat-holder" class="sc-gZfzYS gcrsfu">
                        <div aria-live="polite" class="gcrsfu">
                            <button onClick={toggleModel} tabindex="0" data-testid="chat-bubble" class="sc-dcjTxL cdkPtw enter-done">
                                <div class="sc-fvwjDU gYOIBG"></div>
                                <svg class="sc-hybRYi gfTOjN" width="28px" height="28px" viewBox="0 0 28 28" version="1.1"><g id="pd-chat-icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pd-chat-icon-transform" transform="translate(-2.000000, -2.000000)"><polygon id="pd-chat-icon-polygon" points="0 0 32 0 32 32 0 32"></polygon><path d="M26.667,2.667 L5.333,2.667 C3.865001,2.67251167 2.67833587,3.8649916 2.68,5.333 L2.667,29.333 L8,24 L26.667,24 C28.133,24 29.333,22.8 29.333,21.333 L29.333,5.333 C29.333,3.867 28.133,2.667 26.667,2.667 Z" id="pd-chat-icon-path" fill="#FFFFFF"></path></g></g></svg>
                            </button>
                        </div>
                    </div>*/}
                </div>
            </div>
            {/* {openChatPopup && (
            <OpenChatPopup chatBots={chatBots} toggleModel={toggleModel} colorselecte={colorselecte} MainColor={MainColor} HeaderColor={HeaderColor} title={title} steps={steps} />
            )}*/}
            {steps?.length > 0 && (
                <OpenChatPopup chatBots={chatBots} toggleModel={toggleModel} colorselecte={colorselecte} MainColor={MainColor} HeaderColor={HeaderColor} title={title} steps={steps} />
            )}
        </>
    )
}
