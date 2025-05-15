import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import MettingSchedule from './MettingSchedule/MettingSchedule';
import { FaPlus } from 'react-icons/fa6';
import PipelineStage from '../Common/pipelineStage';
import { conversationFieldUpdate } from '../Common/Common';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function LeadStatus({ item, setChatBot, chatBots, setloadFrist }) {
    const store = useSelector((state) => state.root.common);
    const storechat = useSelector((state) => state?.root?.Chat);

    const [MettingMessage, setMettingMessage] = useState('When would you like to meet? Please pick a time:');
    const [selectedMessage, setSelectedMessage] = useState("Qualified");
    const [Qualified, setQualified] = useState('Disqualified lead');
    const [AllEmail, setAllEmail] = useState([{ email: "", emailID: 0, conversationFieldID: item?.conversationFieldID, createdBy: 0, updatedBy: 0 }]);
    const [Openmetting, setOpenmetting] = useState(false);
    const [MeetingId, setMeetingId] = useState('');
    const [statusData, setstatusData] = useState({
        location: 'Leads',
        title: '',
        email: false,
        Activity: false,
    });
    const [submitData, setSubmitData] = useState(false);

    useEffect(() => {
        setstatusData(prevState => ({
            ...prevState,
            title: statusData.location === "Deals"
                ? "Chatbot, Qualify and route leads"
                : "Qualify and route leads"
        }));
    }, [statusData.location]);

    useEffect(() => {
        if (item) {
            setQualified(item?.leadStatus || 'Disqualified lead');
            setstatusData(prevState => ({
                location: item?.saveLocation || prevState.location,
                email: item?.emailNotifications || prevState.email,
                Activity: item?.activityScheduleMeeting || prevState.Activity,
            }));
            if (item?.meetingName) setMeetingId({ label: item?.meetingName, value: item?.conversationMeetingID });
            if (item?.pipeLineStage) setSelectedMessage(item.pipeLineStage || selectedMessage);
            setMettingMessage(item.meetingInviteMessage || MettingMessage);
            if (item?.emailMaster) {
                const Emailfiled = item.emailMaster
                    .filter(x => x?.conversationFieldID === item?.conversationFieldID)
                    .map(x => ({
                        email: x?.email,
                        emailID: x?.emailID,
                        conversationFieldID: x?.conversationFieldID
                    }));
                setAllEmail(Emailfiled);
            }
        }
    }, [item, MettingMessage, selectedMessage]);

    const conversationField = useMemo(() => ({
        ...item,
        leadStatus: Qualified,
        saveLocation: statusData?.location,
        titlePrefix: statusData?.title,
        pipeLineStage: selectedMessage,
        meetingInviteMessage: MettingMessage,
        emailNotifications: statusData?.email,
        activityScheduleMeeting: statusData?.Activity,
        conversationMeetingID: MeetingId?.value,
        emailMaster: AllEmail,
    }), [item, Qualified, statusData?.location, statusData?.title, selectedMessage, MettingMessage, statusData?.email, statusData?.Activity, MeetingId?.value, AllEmail]);

    const handleSubmitData = useCallback(() => {
        if (submitData) {
            const updatedChatBots = {
                ...chatBots,
                conversationFieldMaster: conversationFieldUpdate(chatBots.conversationFieldMaster, item.conversationFieldID, conversationField)
            };
            setChatBot(updatedChatBots);
            setSubmitData(false); // Reset submitData after handling
        }
    }, [submitData, chatBots, item.conversationFieldID, conversationField, setChatBot]);

    useEffect(() => {
        handleSubmitData();
    }, [handleSubmitData]);

    const handleQualified = useCallback((value) => {
        setQualified(value);
        setSubmitData(true)
    }, []);

    const handleQuestionChange = (e, index) => {
        const updatedQuestions = [...AllEmail];
        updatedQuestions[index].email = e.target.value;
        setAllEmail(updatedQuestions);
        setSubmitData(true)
    };

    const handleButtonClick = (message) => { setSelectedMessage(message); setSubmitData(true) };

    return (
        <div>
            <form >
                <div className='border-b-2'>
                    <div className='flex flex-col items-start'>
                        <div className='mb-1 text-ms font-semibold break-words pl-4 pt-4'>
                            {item?.fieldType}
                        </div>
                        <div className='pl-4'>
                            <div className="flex items-center mb-3">
                                <input
                                    id={`qualified-radio-${item?.conversationFieldID}`}
                                    type="checkbox"
                                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 "
                                    checked={Qualified === "Qualified lead"}
                                    onChange={() => handleQualified("Qualified lead")}
                                />
                                <label htmlFor={`qualified-radio-${item?.conversationFieldID}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Qualified lead
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id={`disqualified-radio-${item?.conversationFieldID}`}
                                    type="checkbox"
                                    name="leadStatus"
                                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300"
                                    checked={Qualified === "Disqualified lead"}
                                    onChange={() => handleQualified('Disqualified lead')}
                                />
                                <label htmlFor={`disqualified-radio-${item?.conversationFieldID}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Disqualified lead
                                </label>
                            </div>
                        </div>
                    </div>

                    {Qualified === 'Qualified lead' && (
                        <div className='my-3 w-full border border-r-0 border-l-0 border-b-0'>
                            <div className='p-4'>
                                <div className='mb-1 text-ms font-semibold break-words'>Save Preferences</div>
                                <div className='border-b'>
                                    <div className='flex flex-row gap-4 items-center pb-3'>
                                        <div className='w-full'>
                                            <p className='text-xs'>Save location</p>
                                            <select
                                                id="location"
                                                name="location"
                                                className="sc-iMWBiJ bTicHx"
                                                onChange={(e) => { setstatusData(prevState => ({ ...prevState, location: e.target.value })); setSubmitData(true) }}
                                                value={statusData?.location}
                                            >
                                                <option value="Leads">Leads</option>
                                                <option value="Deals">Deals</option>
                                            </select>
                                        </div>
                                        <div className='w-full'>
                                            <p className='text-xs'>{`${statusData?.location} title prefix`}</p>
                                            <select
                                                name="blockType3"
                                                className='sc-iMWBiJ bTicHx'
                                                onChange={(e) => { setstatusData(prevState => ({ ...prevState, title: e.target.value })); }}
                                                value={statusData?.title}
                                            >
                                                {statusData?.location === "Deals" && <option value="Chatbot, Qualify and route leads">Chatbot, Qualify and route leads</option>}
                                                {statusData?.location === "Leads" && <option value="Qualify and route leads">Qualify and route leads</option>}
                                            </select>
                                        </div>
                                    </div>
                                    {statusData?.location === "Deals" && (
                                        <div className="mb-5 pb-3">
                                            <label
                                                htmlFor="name"
                                                className="block mb-2 font-bold text-gray-600"
                                            >
                                                Pipeline
                                            </label>
                                            <PipelineStage selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} handleButtonClick={handleButtonClick} />
                                        </div>
                                    )}
                                </div>
                                <div className='flex flex-row gap-4 items-center my-4'>
                                    <div className='w-full'>
                                        <p className='text-xs'>Owner</p>
                                        <select
                                            id="owner"
                                            name="owner"
                                            className="sc-iMWBiJ bTicHx"
                                        >
                                            <option value="owner">owner</option>
                                        </select>
                                    </div>
                                    <div className='w-full'>
                                        <p className='text-xs'>Visible to</p>
                                        <select
                                            name="visibleTo"
                                            className='sc-iMWBiJ bTicHx'
                                        >
                                            {store?.getAllVisibleTo.length > 0
                                                ? store?.getAllVisibleTo.map((item, index) => (
                                                    <option key={index} value={item?.text}>{item?.text}</option>
                                                ))
                                                : <option>Not Found</option>
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='mb-2 flex flex-row items-center gap-3'>
                                    <div>
                                        <input
                                            id={`Email-${item?.conversationFieldID}`}
                                            type='checkbox'
                                            onChange={(e) => { setstatusData(prevState => ({ ...prevState, email: e.target.checked })); setSubmitData(true) }}
                                            checked={statusData?.email}
                                        />
                                    </div>
                                    <label className='mb-1' htmlFor={`Email-${item?.conversationFieldID}`}>Email notification</label>
                                </div>
                                {statusData?.email && (
                                    <div className='mb-2'>
                                        {AllEmail.map((item, index) => (
                                            <div key={index} className="flex items-center relative m-2">
                                                <input
                                                    type="text"
                                                    placeholder="Enter Value"
                                                    className="border border-gray-300 shadow p-2 w-full rounded mr-3"
                                                    value={item.email}
                                                    onChange={(e) => handleQuestionChange(e, index)}
                                                />
                                                {AllEmail.length > 0 && (
                                                    <RiDeleteBinLine
                                                        className='absolute top-2 right-5'
                                                        size={17}
                                                        onClick={() => {
                                                            const updatedQuestions = AllEmail.filter((_, i) => i !== index);
                                                            setAllEmail(updatedQuestions);
                                                            setSubmitData(true)
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="flex items-center inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium py-1 px-3 rounded"
                                            onClick={() => setAllEmail([...AllEmail, { email: "", emailID: 0, conversationFieldID: item?.conversationFieldID, createdBy: 0, updatedBy: 0 }])}
                                        >
                                            <FaPlus /><span className='text-black text-sm font-semibold px-2.5 py-0.5 rounded'>Add Email</span>
                                        </button>
                                    </div>
                                )}
                                <div className='mb-2'>
                                    <label>Activity</label>
                                    <div className='flex flex-row items-center gap-3'>
                                        <input
                                            id={`#activity-${item?.conversationFieldID}`}
                                            type='checkbox'
                                            onChange={(e) => { setstatusData(prevState => ({ ...prevState, Activity: e.target.checked })); setSubmitData(true) }}
                                            checked={statusData?.Activity}
                                        />
                                        <label className='mb-1' htmlFor={`#activity-${item?.conversationFieldID}`}>Schedule a meeting</label>
                                    </div>
                                </div>
                                {statusData?.Activity && (
                                    <>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isSearchable={true}
                                            isClearable={true}
                                            value={MeetingId}
                                            onChange={(option) => { setMeetingId(option); setSubmitData(true) }}
                                            options={
                                                storechat && storechat?.ActiveMeeting?.length > 0
                                                    ? storechat?.ActiveMeeting.map((item) => ({
                                                        value: item?.conversationMeetingID,
                                                        label: item?.meetingName,
                                                    }))
                                                    : [{ value: "", label: "Not Found" }]
                                            }
                                        />
                                        <div className='flex justify-end mt-2'>
                                            <button
                                                type="button"
                                                className="flex items-center inline-block ml-36 focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium py-1 px-3 rounded"
                                                onClick={() => setOpenmetting(true)}
                                            >
                                                <FaPlus /><span className='text-black text-sm font-semibold px-2.5 py-0.5 rounded'>Set availability</span>
                                            </button>
                                        </div>
                                        <label htmlFor="message" className="block my-1.5 text-sm font-semibold text-gray-900 dark:text-white">Meeting invite message</label>
                                        <textarea id="message" rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={MettingMessage}
                                            onChange={(e) => { setMettingMessage(e.target.value); setSubmitData(true) }}
                                        ></textarea>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    {/* <div className='flex justify-end me-5 mb-2'>
                        <button
                            type="button"
                            className="py-1 px-3 inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium rounded"
                        // onClick={() => } // Trigger submitData flag
                        >
                            Save
                        </button>
                    </div> */}
                </div>
            </form>

            {Openmetting && (
                <MettingSchedule setOpenmetting={setOpenmetting} setloadfrist={setloadFrist} />
            )}
        </div>
    );
}
