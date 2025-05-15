/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import AddMettingDetails from './AddMettingDetails';
import moment from 'moment';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function AddMettigSchedule({ setopenMeetingSchedule, setloadFrist, setOpenmetting, MeetingData }) {

    const [openMeetingDetails, setopenMeetingDetails] = useState(false);
    const [MeetingTime, setMeetingTime] = useState('1 h');
    const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
    const [mintues, setmintues] = useState(80);
    const [AllDay, setAllDay] = useState();
    const [schedule, setSchedule] = useState({
        Sunday: [{ startTime: '', endTime: '' }],
        Monday: [{ startTime: '', endTime: '' }],
        Tuesday: [{ startTime: '', endTime: '' }],
        Wednesday: [{ startTime: '', endTime: '' }],
        Thursday: [{ startTime: '', endTime: '' }],
        Friday: [{ startTime: '', endTime: '' }],
        Saturday: [{ startTime: '', endTime: '' }]
    });

    useEffect(() => {
        if (MeetingData) {
            setMeetingTime(MeetingData?.meetingDuration ? MeetingData?.meetingDuration : MeetingTime)
            setStartDate(moment(MeetingData?.availableStartDate).format("YYYY-MM-DD"))
            setEndDate(moment(MeetingData?.availableEndDate).format("YYYY-MM-DD"))
        }
    }, [MeetingData]);

    useEffect(() => {
        if (MeetingData?.subMaster) {
            const newSchedule = {
                Sunday: [],
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: [],
                Saturday: []
            };
            MeetingData?.subMaster.forEach(meeting => {
                if (newSchedule[meeting.day]) {
                    newSchedule[meeting.day].push({
                        startTime: meeting.startTime || '',
                        endTime: meeting.endTime || ''
                    });
                }
            });
            setSchedule(newSchedule);
        }
    }, [MeetingData]);

    const handleIconClick = (placeholder) => {
        setMeetingTime(placeholder);
    };

    const handleTimeChange = (day, index, type, value) => {
        const updatedDay = [...schedule[day]];
        updatedDay[index][type] = value;
        setSchedule({ ...schedule, [day]: updatedDay });
    };

    const addTimeSlot = (day) => {
        const updatedDay = [...schedule[day], { startTime: '', endTime: '' }];
        setSchedule({ ...schedule, [day]: updatedDay });
    };

    const deleteTimeSlot = (day, index) => {
        const updatedDay = [...schedule[day]];
        updatedDay.splice(index, 1);
        setSchedule({ ...schedule, [day]: updatedDay });
    };

    const transformToPayload = () => {
        const payload = [];
        Object.keys(schedule).forEach(day => {
            schedule[day].forEach(slot => {
                payload.push({
                    meetingDaysID: 0,
                    conversationMeetingID: 0,
                    day: day,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                    createdOn: new Date().toISOString(),
                    createdBy: 0,
                    updatedOn: new Date().toISOString(),
                    updatedBy: 0
                });
            });
        });
        setAllDay(payload)
        return payload;
    };

    return (
        <div>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Define availability
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() =>
                                    setopenMeetingSchedule(false)}
                            />
                        </div>
                        <form >
                            <div className="xl:w-full h-96        scroll-inner overflow-scroll  relative p-4">
                                <div className="mb-5  w-full">
                                    <label
                                        htmlFor=""
                                        className="block mb-2 font-semibold text-black-600"
                                    >
                                        1. Save meeting to Pipedrive calendar as
                                    </label>
                                    <div
                                        className="inline-flex rounded-md shadow-sm mt-2"
                                        role="group"
                                    >
                                        <button
                                            type="button"
                                            className={`px-4 py-2 text-sm font-semibold  text-gray-900 border border-gray-200 rounded-s-lg ${MeetingTime === "15 min"
                                                ? "bg-blue-100 text-blue-700"
                                                : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                                }`}
                                            onClick={() => handleIconClick("15 min")}
                                        >
                                            15 min
                                        </button>
                                        <button
                                            type="button"
                                            className={`px-4 py-2 text-sm font-semibold  text-gray-900 border border-gray-200 rounded-s-lg ${MeetingTime === "30 min"
                                                ? "bg-blue-100 text-blue-700"
                                                : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                                }`}
                                            onClick={() => handleIconClick("30 min")}
                                        >
                                            30 min
                                        </button>
                                        <button
                                            type="button"
                                            className={`px-4 py-2 text-sm font-semibold  text-gray-900 border border-gray-200 rounded-s-lg ${MeetingTime === "45 min"
                                                ? "bg-blue-100 text-blue-700"
                                                : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                                }`}
                                            onClick={() => handleIconClick("45 min")}
                                        >
                                            45 min
                                        </button>
                                        <button
                                            type="button"
                                            className={`px-4 py-2 text-sm font-semibold  text-gray-900 border border-gray-200 rounded-s-lg ${MeetingTime === "1 h"
                                                ? "bg-blue-100 text-blue-700"
                                                : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                                }`}
                                            onClick={() => handleIconClick("1 h")}
                                        >
                                            1 h
                                        </button>
                                        <button
                                            type="button"
                                            className={`px-4 py-2 text-sm font-semibold  text-gray-900 border border-gray-200 rounded-s-lg ${MeetingTime === "1.5 h"
                                                ? "bg-blue-100 text-blue-700"
                                                : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                                }`}
                                            onClick={() => handleIconClick("1.5 h")}
                                        >
                                            1.5 h
                                        </button>
                                        <button
                                            type="button"
                                            className={`px-4 py-2 text-sm font-semibold  text-gray-900 border border-gray-200 rounded-s-lg ${MeetingTime === "2 h"
                                                ? "bg-blue-100 text-blue-700"
                                                : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                                }`}
                                            onClick={() => handleIconClick("2 h")}
                                        >
                                            2 h
                                        </button>
                                        <button
                                            type="button"
                                            className={`px-4 py-2 text-sm font-semibold  text-gray-900 border border-gray-200 rounded-s-lg ${MeetingTime === "Custom"
                                                ? "bg-blue-100 text-blue-700"
                                                : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                                }`}
                                            onClick={() => handleIconClick("Custom")}
                                        >
                                            Custom
                                        </button>

                                        {
                                            MeetingTime === "Custom" && (
                                                <>
                                                    <input
                                                        type="number"
                                                         min="0"
                                                        name="mintues"
                                                        className="border border-gray-300 font-semibold  p-3 w-20 rounded ml-10"
                                                        value={mintues}
                                                        onChange={(e) => setmintues(e.target.value)}
                                                    />
                                                    <label>minutes</label>
                                                </>
                                            )
                                        }
                                    </div>

                                </div>
                                <div className="mb-5  w-full">
                                    <label
                                        htmlFor=""
                                        className="block mb-2 font-semibold text-black-600"
                                    >
                                        2. When is this availability active?
                                    </label>
                                    <div className='flex gap-7'>

                                        <div className="mb-5 flex items-center gap-4">
                                            <label
                                                htmlFor="Guests"
                                                className="block mb-2 font-bold text-gray-600"
                                            >
                                                From
                                            </label>
                                            <input
                                                type='date'
                                                className="border border-gray-300 shadow p-2 w-40 rounded"
                                                onChange={(e) => {
                                                    setStartDate(e.target.value);
                                                }}
                                                Value={startDate}
                                            />
                                        </div>
                                        <div className="mb-5 flex items-center gap-4">
                                            <label
                                                htmlFor="Guests"
                                                className="block mb-2 font-bold text-gray-600"
                                            >
                                                until
                                            </label>
                                            <input
                                                type="date"
                                                className="border border-gray-300 shadow p-2 w-40 rounded"
                                                onChange={(e) => {
                                                    setEndDate(e.target.value);
                                                }}
                                                Value={endDate}
                                            />
                                        </div>

                                    </div>

                                </div>

                                <div className="mb-5  ">
                                    <label
                                        htmlFor=""
                                        className="block mb-2 font-semibold text-black-600"
                                    >
                                        3. At which time are you available for meetings?
                                    </label>

                                    <div className='flex  '>
                                        {Object.keys(schedule).map((day) => (
                                            <div key={day} className='mb-5  ml-2 text-center'>
                                                <div className="mb-2 font-bold text-gray-600 ">{day}</div>
                                                {schedule[day].map((slot, index) => (
                                                    <div key={index} className='flex items-center mb-2 '>
                                                        <input
                                                            type='time'
                                                            className="border border-gray-300 shadow p-2 w-28 rounded"
                                                            onChange={(e) => handleTimeChange(day, index, 'startTime', e.target.value)}
                                                            value={slot.startTime}
                                                        />
                                                        <input
                                                            type='time'
                                                            className="border border-gray-300 shadow p-2 w-28 rounded "
                                                            onChange={(e) => handleTimeChange(day, index, 'endTime', e.target.value)}
                                                            value={slot.endTime}
                                                        />
                                                        <RiDeleteBinLine
                                                            className='ml-2'
                                                            size={17}
                                                            onClick={() => deleteTimeSlot(day, index)}
                                                        />
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    className="text-blue-500"
                                                    onClick={() => addTimeSlot(day)}
                                                >
                                                    Add Time 
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-wrap items-center justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded close"
                                    onClick={() => setopenMeetingSchedule(false)}
                                >
                                    Close
                                </button>
                                <div className="flex items-center px-3">
                                    <button
                                        type="button"
                                        className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                        onClick={() => { transformToPayload(); setopenMeetingDetails(true) }}
                                    >
                                        Continue to meeting details
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            {
                openMeetingDetails && <AddMettingDetails setopenMeetingDetails={setopenMeetingDetails} MeetingTime={MeetingTime} startDate={startDate} endDate={endDate} mintues={mintues} setloadFrist={setloadFrist} setOpenmetting={setOpenmetting} MeetingData={MeetingData} AllDay={AllDay} />
            }
        </div>
    )
}
