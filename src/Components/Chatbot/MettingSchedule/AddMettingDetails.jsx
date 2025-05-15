/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { MettingTypes } from '../../Common/Common';
import { IoCall, IoRestaurant } from 'react-icons/io5';
import { MdEmail, MdOutlineWatchLater } from 'react-icons/md';
import { AiFillFlag, AiOutlineCloseCircle } from 'react-icons/ai';
import { FaPlus, FaUserGroup } from 'react-icons/fa6';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import ReactSelect from '../../Common/ReactSelect';
import { useDispatch } from 'react-redux';
import { InsertMeeting } from '../../../Redux/ChatSlice';

export default function AddMettingDetails({ setopenMeetingDetails, MeetingTime, endDate, startDate, mintues, setloadFrist, setOpenmetting, MeetingData, AllDay }) {
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
    const dispatch = useDispatch()
    const [MeetingType, setMeetingType] = useState("Call");
    const [fildsName, setfildsName] = useState([{
        meetingInviteeFieldID: 0,
        fieldName: "Phone",
        isRequired: false,
        conversationMeetingID: 0,
        createdOn: "2024-05-25T12:31:34.356Z",
        createdBy: 0,
        updatedOn: "2024-05-25T12:31:34.356Z",
        updatedBy: 0
    }]);
    const [selectedMeeting, setselectedMeeting] = useState(null);
    const [FooterText, setFooterText] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (MeetingData) {
            setValue('Name', MeetingData?.meetingName)
            setValue('location', MeetingData?.location)
            setValue('Description', MeetingData?.meetingDescription)
            setValue('Company', MeetingData?.companyName)
            if (MeetingData?.videoCall) setselectedMeeting({ label: MeetingData?.videoCall })
            setFooterText(MeetingData?.footerText)
            if (MeetingData && MeetingData?.inviteeMaster) { setfildsName(MeetingData && MeetingData?.inviteeMaster.map((x) => ({ fieldName: x.fieldName, isRequired: x.isRequired, }))); }
            setMeetingType(MeetingData?.MeetingType ? MeetingData?.MeetingType : MeetingType)
            setNotes(MeetingData?.noteForScheduleMeeting ? MeetingData?.noteForScheduleMeeting : notes)
        }
    }, [MeetingData]);

    const handleIconClick = (placeholder) => {
        setMeetingType(placeholder);
    };

    const handleFiledName = (e, index) => {
        const updatedQuestions = [...fildsName];
        updatedQuestions[index].fieldName = e.target.value;
        setfildsName(updatedQuestions);
    }
    const handleRequired = (e, index) => {
        const updatedQuestions = [...fildsName];
        updatedQuestions[index].isRequired = e.target.checked;
        setfildsName(updatedQuestions);
    }

    const onSubmit = async (data) => {
        const Payload = {
            conversationMeetingID: MeetingData?.conversationMeetingID ? MeetingData?.conversationMeetingID : 0,
            conversationFieldID: 0,
            meetingDuration: MeetingTime,
            availableStartDate: startDate,
            availableEndDate: endDate,
            meetingName: data?.Name,
            location: data?.location,
            videoCall: selectedMeeting?.label,
            meetingDescription: data?.Description,
            companyName: data?.Company,
            footerText: FooterText,
            noteForScheduleMeeting: notes,
            MeetingMinutes: mintues,
            meetingType: MeetingType,
            saveInPipeDriveAs: "",
            createdOn: "2024-05-25T12:31:34.356Z",
            createdBy: 0,
            updatedOn: "2024-05-25T12:31:34.356Z",
            updatedBy: 0,
            isActive: true,
            inviteeMaster: fildsName,
            subMaster: AllDay
        }
        const response = await dispatch(InsertMeeting(Payload))
        if (response) {
            setloadFrist(true)
        }
        setOpenmetting(false)
    }

    return (
        <div>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto vertical-scroll-inner">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Meeting Details
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => setopenMeetingDetails(false)}
                            />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className=" h-96 vertical-scroll-inner relative p-4">
                                <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                                    <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6">
                                        <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
                                            <div className="mb-5">
                                                <label
                                                    htmlFor="Guests"
                                                    className="block mb-2 font-bold text-gray-600"
                                                >
                                                    Meeting name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="Name"
                                                    name="Name"
                                                    placeholder="Meeting"
                                                    className="border border-gray-300 shadow p-3 w-full rounded"
                                                    {...register("Name", { required: "Meeting Name is required", })}
                                                />
                                                {errors.Name && <span className="error text-red-500 text-sm">{errors.Name.message}</span>}
                                            </div>

                                            <div className="mb-5">
                                                <label
                                                    htmlFor="Guests"
                                                    className="block mb-2 font-bold text-gray-600"
                                                >
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    placeholder="Location"
                                                    className="border border-gray-300 shadow p-3 w-full rounded"
                                                    {...register("location",)}
                                                />
                                            </div>

                                            <div className="mb-5 w-full">
                                                <label
                                                    htmlFor="Guests"
                                                    className="block mb-2 font-bold text-gray-600"
                                                >
                                                    Install video call integration
                                                </label>
                                                <ReactSelect
                                                    selectedValue={selectedMeeting}
                                                    options={
                                                        MettingTypes && MettingTypes?.length > 0
                                                            ? MettingTypes.map((item) => ({
                                                                value: item?.value ?? "",
                                                                label: item?.label,
                                                            }))
                                                            : [{ value: "", label: "Not Found" }]
                                                    }
                                                    handleSelectChange={(option) => setselectedMeeting(option)}
                                                />
                                            </div>

                                            <div className="mb-5">
                                                <label
                                                    className="block mb-2 font-bold text-gray-600"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    type="textarea"
                                                    name="Description"
                                                    placeholder="Description"
                                                    className="border border-gray-300 shadow p-3 w-full rounded"
                                                    {...register("Description")}
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label
                                                    htmlFor="Guests"
                                                    className="block mb-2 font-bold text-gray-600"
                                                >
                                                    Company name visible for the invitee
                                                </label>
                                                <input
                                                    type="text"
                                                    name="Company"
                                                    className="border border-gray-300 shadow p-3 w-full rounded"
                                                    {...register("Company")}
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label
                                                    htmlFor=""
                                                    className="block mb-2 font-bold text-gray-600"
                                                >
                                                    Footer Text
                                                </label>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={FooterText}
                                                    onChange={(contain) => { setFooterText(contain) }}
                                                />
                                            </div>

                                            <div className="mb-5">
                                                <label
                                                    htmlFor="Guests"
                                                    className="block mb-2 font-bold text-gray-600 bottom-b"
                                                >
                                                    Fields for the invitee to fill in
                                                </label>
                                                <div className='mb-2'>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Value"
                                                        className="shadow p-2 w-full rounded outline-none "
                                                        value='Name'
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Value"
                                                        className="shadow p-2 w-full rounded outline-none mt-2"
                                                        value='Email'
                                                    />
                                                    {fildsName && fildsName.map((item, index) => (
                                                        <div key={index} className="flex items-center ju relative m-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Enter Value"
                                                                className="border border-gray-300 shadow p-2  rounded w-80"
                                                                value={item?.fieldName}
                                                                onChange={(e) => handleFiledName(e, index)}
                                                            />
                                                            <div className='flex items-center ml-5 gap-3'>
                                                                <input
                                                                    placeholder="Enter Value"
                                                                    className="border border-gray-300  p-2 w-full rounded "
                                                                    type='checkbox'
                                                                    id={`required${index}`}
                                                                    checked={item?.isRequired}
                                                                    onChange={(e) => handleRequired(e, index)}
                                                                />
                                                                <label for={`required${index}`}
                                                                    className="block  font-bold text-gray-600 bottom-b"
                                                                >
                                                                    Required
                                                                </label>
                                                            </div>
                                                            {fildsName.length > 0 && (
                                                                <RiDeleteBinLine
                                                                    className='absolute top-2 right-0'
                                                                    size={17}
                                                                    onClick={() => {
                                                                        const updatedQuestions = fildsName.filter((_, i) => i !== index);
                                                                        setfildsName(updatedQuestions);
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        className="flex items-center mt-2  inline-block focus:outline-none text-white bg-primary-500 border border-gray-200 dark:bg-transparent dark:text-primary-500  text-sm font-medium py-1 px-3  rounded"
                                                        onClick={() => setfildsName([...fildsName, {
                                                            meetingInviteeFieldID: 0,
                                                            fieldName: "",
                                                            isRequired: false,
                                                            conversationMeetingID: 0,
                                                            createdOn: "2024-05-25T12:31:34.356Z",
                                                            createdBy: 0,
                                                            updatedOn: "2024-05-25T12:31:34.356Z",
                                                            updatedBy: 0
                                                        }])}
                                                    >
                                                        <FaPlus /><span className='text-white text-sm font-semibold  px-2.5 py-0.5 rounde'> Filds</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6">
                                        <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3 h-full">
                                            <div className="mb-5">
                                                <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3">
                                                    <label
                                                        htmlFor=""
                                                        className="block mb-2 font-bold text-gray-600"
                                                    >
                                                        Save meeting to Pipedrive calendar as
                                                    </label>
                                                    <div
                                                        className="inline-flex rounded-md shadow-sm mt-2"
                                                        role="group"
                                                    >
                                                        <button
                                                            type="button"
                                                            className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg ${MeetingType === "Call"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                                                }`}
                                                            onClick={() => handleIconClick("Call")}
                                                        >
                                                            <IoCall />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg ${MeetingType === "Meeting"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                                                }`}
                                                            onClick={() => handleIconClick("Meeting")}
                                                        >
                                                            <FaUserGroup />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg ${MeetingType === "Task"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                                                }`}
                                                            onClick={() => handleIconClick("Task")}
                                                        >
                                                            <MdOutlineWatchLater />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg ${MeetingType === "Deadline"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                                                }`}
                                                            onClick={() => handleIconClick("Deadline")}
                                                        >
                                                            <AiFillFlag />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg ${MeetingType === "Email"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                                                }`}
                                                            onClick={() => handleIconClick("Email")}
                                                        >
                                                            <MdEmail />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg ${MeetingType === "Lunch"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                                                }`}
                                                            onClick={() => handleIconClick("Lunch")}
                                                        >
                                                            <IoRestaurant />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-5">
                                                <ReactQuill
                                                    theme="snow"
                                                    value={notes}
                                                    onChange={(contain) => setNotes(contain)}
                                                />
                                                <small>Attach the following note to each scheduled meeting:</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded close"
                                // onClick={() => togglemodel()}
                                >
                                    Close
                                </button>
                                <div className="flex items-center px-3">
                                    <button
                                        type="submit"
                                        className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
