/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IoCall, IoRestaurant } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { MdEmail, MdOutlineWatchLater } from "react-icons/md";
import { AiFillFlag } from "react-icons/ai";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import "react-quill/dist/quill.snow.css";
import "react-datepicker/dist/react-datepicker.css";
import { saveActivity } from "../../Redux/CommonSlice";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import ReactSelect from "./ReactSelect";
import { useSelector } from "react-redux";
import { getAllDeals } from "../../Redux/DealSlice";
import { getLeadmaster } from "../../Redux/LeadsSlice";
import { getProject } from "../../Redux/ProjectSlice";

const Activity = ({
  leadData,
  setLoadFist,
  identityID,
  editActivityData,
  identityName,
  handleCancel,
}) => {
  const dispatch = useDispatch();
  const organizationstore = useSelector((state) => state?.root?.organization);
  const Peoplestore = useSelector((state) => state?.root?.Person);
  const Dealstore = useSelector((state) => state.root.Deal);
  const Leadstore = useSelector((state) => state.root.leads);
  const Projectstore = useSelector((state) => state.root.Project);

  const [labelActivityPlaceholder, setLabelActivityPlaceholder] = useState("Call");
  const [activityName, setActivityName] = useState(editActivityData?.activityName);
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [startTime, setStartTime] = useState(moment().format("HH:mm"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [endTime, setEndTime] = useState(moment().format("HH:mm"));
  const [guestvalus, setGuestvalus] = useState("");
  const [location, setLocation] = useState("");
  const [selectedMeeting, setSelectedMeeting] = useState("zoom_meeting");
  const [description, setDescription] = useState("");
  const [availableType, setAvailableType] = useState("Busy");
  const [notes, setNotes] = useState("");
  const [markAsDone, seTmarkAsDone] = useState(false);
  const [CalendarEvents, setCalendarEvents] = useState([]);
  const [Error, setError] = useState('');
  const [Priority, setPriority] = useState("");
  const [selectedOrganization, setselectedOrganization] = useState({ label: leadData?.organizationName, value: leadData?.organizationID });
  const [selectedPerson, setselectedPerson] = useState({ label: leadData?.name ? leadData.name : leadData?.personName, value: leadData?.peopleID, } || null);
  // const [selectedPerson, setselectedPerson] = useState({ label: leadData?.name ? leadData.name : leadData?.personName, value: leadData?.peopleID ? leadData?.peopleID : leadData?.personMasterID, } || null);
  const [selectedDeal, setSelectedDeal] = useState(leadData?.dealID ? { label: leadData?.title, value: leadData?.dealID, } : null);
  const [selectedLead, setSelectedLead] = useState(leadData?.leadID ? { label: leadData?.title, value: leadData?.leadID, } : null);
  const [selectedProject, setSelectedProject] = useState(null);


  useEffect(() => {
    dispatch(getAllDeals({}));
    dispatch(getLeadmaster({ search: '', limit: 0, pageNumber: 0, objSearch: {} }))
    dispatch(getProject({}))
  }, [dispatch]);

  useEffect(() => {
    setCalendarEvents({
      title: labelActivityPlaceholder,
      start: `${startDate}T${startTime}`,
      end: `${endDate}T${endTime}`,
    },)
  }, [startDate, endDate, startTime, endTime, labelActivityPlaceholder]);

  useEffect(() => {
    if (editActivityData && editActivityData?.activityID) {
      setActivityName(editActivityData?.activityName);
      setStartDate(moment(editActivityData?.startDate).format("YYYY-MM-DD"));
      setStartTime(editActivityData?.startTime);
      setEndDate(moment(editActivityData?.endDate).format("YYYY-MM-DD"));
      setEndTime(editActivityData?.endTime);
      setGuestvalus(editActivityData?.guests);
      setLocation(editActivityData?.locations);
      setSelectedMeeting(editActivityData?.meetingType);
      setDescription(editActivityData?.description);
      setAvailableType(editActivityData?.availableType);
      setNotes(editActivityData?.notes);
      setLabelActivityPlaceholder(editActivityData?.activityType ? editActivityData?.activityType : labelActivityPlaceholder)
      setPriority(editActivityData?.priority ? editActivityData?.priority : Priority);
      if (editActivityData?.organizationID) { setselectedOrganization({ label: editActivityData?.organizationName, value: editActivityData?.organizationID, }); }
      if (editActivityData?.peopleID) { setselectedPerson({ label: editActivityData?.peopleName, value: editActivityData?.peopleID, }); }
      if (editActivityData?.dealID) { setSelectedDeal({ label: editActivityData?.dealName, value: editActivityData?.dealID, }); }
      if (editActivityData?.leadID) { setSelectedLead({ label: editActivityData?.leadName, value: editActivityData?.leadID, }); }
      if (editActivityData?.projectID) { setSelectedProject({ label: editActivityData?.projectName, value: editActivityData?.projectID, }); }
      if (editActivityData?.markAsDone) seTmarkAsDone(editActivityData?.markAsDone ? editActivityData?.markAsDone : markAsDone)
    }
  }, [editActivityData, editActivityData?.startDate, editActivityData?.endDate]);

  const handleIconClick = (placeholder) => { setLabelActivityPlaceholder(placeholder); };


  const handleContentGuestChange = (newContent) => { setNotes(newContent); };

  const handleMarkAsDone = (e) => { seTmarkAsDone(e.target.checked); };

  const handleSaveActivity = async () => {
    if (!activityName) {
      setError('Activity Name is Required');
      return;
    }

    const payload = {
      activityID: editActivityData?.activityID ? editActivityData?.activityID : 0,
      activityName: activityName,
      activityType: labelActivityPlaceholder,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      guests: guestvalus,
      locations: location,
      meetingType: selectedMeeting,
      description: description,
      availableType: availableType,
      notes: notes,
      userID: 0,
      peopleID: selectedPerson && selectedPerson.value,
      organizationID: selectedOrganization && selectedOrganization.value,
      markAsDone: markAsDone,
      identityID: identityID,
      identityName: identityName,
      type: "Activity",
      priority: Priority,
      leadID: selectedLead?.value,
      projectID: selectedProject?.value,
      dealID: selectedDeal?.value,

    }
    await dispatch(saveActivity(payload)).then((res) => {
      cancel()
      if (res.payload.statusCode === 200) {
        setLoadFist(true)
        setError('')
        setCalendarEvents([])
      }
    }).catch((error) => {
      console.log('error :>> ', error);
    })
  }


  const clearFrom = () => {
    setLabelActivityPlaceholder("Call");
    setActivityName("");
    setGuestvalus("");
    setLocation("");
    setSelectedMeeting("");
    setDescription("");
    setAvailableType("");
    setNotes("");
    seTmarkAsDone(false);
    setselectedOrganization('')
    setselectedPerson('')
  };

  const cancel = async () => {
    await clearFrom()
    await handleCancel()
  }

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    const MatchDates = newStartDate === endDate
    setEndDate(MatchDates ? endDate : newStartDate > endDate ? newStartDate : endDate)
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    const MatchDates = newStartTime === endTime
    setEndTime(MatchDates ? endTime : newStartTime > endTime ? newStartTime : endTime)
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
    setStartTime(newEndTime < startTime ? newEndTime : startTime)
  };

  return (
    <>
      <div className="grid md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8 gap-4 h-96 vertical-scroll-inner">
        <div className="sm:col-span-12 md:col-span-12 lg:col-span-5 xl:col-span-5 ">
          <div className="h-auto">
            <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3">
              <input
                type="text"
                name="activityName"
                placeholder={labelActivityPlaceholder}
                className="border border-gray-300 font-semibold shadow p-3 w-full rounded"
                onChange={(e) => setActivityName(e.target.value)}
                value={activityName}
              />
              {activityName && activityName.length > 0 ? "" : Error && (
                <div className="error text-red-600 text-base font-bold">{Error}</div>
              )}
              <div
                className="inline-flex rounded-md shadow-sm mt-2"
                role="group"
              >
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg ${labelActivityPlaceholder === "Call"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    }`}
                  onClick={() => handleIconClick("Call")}
                >
                  <IoCall />
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg ${labelActivityPlaceholder === "Meeting"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    }`}
                  onClick={() => handleIconClick("Meeting")}
                >
                  <FaUserGroup />
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg ${labelActivityPlaceholder === "Task"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    }`}
                  onClick={() => handleIconClick("Task")}
                >
                  <MdOutlineWatchLater />
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg ${labelActivityPlaceholder === "Deadline"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    }`}
                  onClick={() => handleIconClick("Deadline")}
                >
                  <AiFillFlag />
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg ${labelActivityPlaceholder === "Email"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    }`}
                  onClick={() => handleIconClick("Email")}
                >
                  <MdEmail />
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg ${labelActivityPlaceholder === "Lunch"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    }`}
                  onClick={() => handleIconClick("Lunch")}
                >
                  <IoRestaurant />
                </button>
              </div>
            </div>
            <div className="mt-3  gap-2">
              <div className="w-full flex mb-2 gap-2">
                <input
                  datepicker
                  name="start_date"
                  type="date"
                  className="bg-gray-50 border border-gray-300 rounded text-gray-900 text-sm block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                  placeholder="Select date"
                  onChange={handleStartDateChange}
                  value={startDate}
                />
                <input
                  type="time"
                  name="start_time"
                  value={startTime}
                  className="border border-gray-300 shadow p-3 rounded w-full"
                  onChange={handleStartTimeChange}
                />
              </div>
              <div className="w-full flex gap-2">
                <input

                  name="end_date"
                  min={startDate}
                  onChange={handleEndDateChange}
                  value={endDate}
                  type="date"
                  className="bg-gray-50 border border-gray-300 rounded text-gray-900 text-sm block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Select date"
                />
                <input
                  type="time"
                  name="end_time"
                  required
                  min={startTime || '00:00'}
                  value={endTime}
                  className="border border-gray-300 shadow p-3 rounded w-full"
                  onChange={handleEndTimeChange}
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="Guests"
                className="block mb-2 font-bold text-gray-600"
              >
                Guests
              </label>
              <input
                type="text"
                id="Guests"
                name="guests"
                className="border border-gray-300 shadow p-3 w-full rounded"
                onChange={(e) => setGuestvalus(e.target.value)}
                value={guestvalus}
              />
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="mb-5 font-bold">
              <label
                htmlFor="Guests"
                className="block mb-2 font-bold text-gray-600"
              >
                Install Video Call Integration
              </label>
              <select
                value={selectedMeeting} // Set the value of the select to the state variable
                onChange={(e) => setSelectedMeeting(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="zoom_meeting">Zoom Meeting</option>
                <option value="microsoft_teams_meeting">
                  Microsoft Teams Meeting
                </option>
                <option value="google_meet_meeting">Google Meet Meeting</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="Guests"
                className="block mb-2 font-bold text-gray-600"
              >
                Description
              </label>
              <textarea
                type="textarea"
                name="location"
                placeholder="Description"
                className="border border-gray-300 shadow p-3 w-full rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-5 font-bold">
              <label htmlFor="Priority" className="block mb-2 font-bold text-gray-600">Priority</label>
              <select
                value={Priority}
                onChange={(e) => setPriority(e.target.value)}
                className="text-2xl bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option className="hidden" >Priority</option>
                <option className="m-5 text-base" value="None">None</option>
                <option className="m-5 text-base" value="HIGH">HIGH</option>
                <option className="m-5 text-base" value="MEDIUM">MEDIUM</option>
                <option className="m-5 text-base" value="LOW">LOW</option>
              </select>
            </div>
            <div className="mb-5 font-bold">
              <label htmlFor="Guests" className="block mb-2 font-bold text-gray-600">
                Type
              </label>
              <select
                value={availableType}
                onChange={(e) => setAvailableType(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >

                <option value="zoom_meeting">Busy</option>
                <option value="microsoft_teams_meeting">Free</option>
              </select>
            </div>
            <div className="mb-5">
              <ReactQuill
                theme="snow"
                value={notes}
                onChange={handleContentGuestChange}
              />
              <small>
                Notes are visible within crm, but not to event guests
              </small>
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold text-gray-600">
                Owner
              </label>
              <input
                type="text"
                name="owner"
                defaultValue="user 1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold text-gray-600">
                Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={leadData?.title}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                for="labelID"
                className="block mb-2 font-bold text-gray-600"
              >
                Lead
              </label>
              <ReactSelect
                selectedValue={selectedLead}
                options={
                  Leadstore && Leadstore?.leadsData?.length > 0
                    ? Leadstore.leadsData.map((item) => ({
                      value: item?.leadID,
                      label: item?.title,
                      isDisabled: identityName === 'lead'
                    }))
                    : [{ value: "", label: "Not Found" }]
                }
                handleSelectChange={(option) => { setSelectedLead(option) }}
              />
            </div>
            <div className="mb-5">
              <label
                for="labelID"
                className="block mb-2 font-bold text-gray-600"
              >
                Project
              </label>
              <ReactSelect
                selectedValue={selectedProject}
                options={
                  Projectstore && Projectstore?.getProject?.length > 0
                    ? Projectstore.getProject.map((item) => ({
                      value: item?.projectID,
                      label: item?.title,
                    }))
                    : [{ value: "", label: "Not Found" }]
                }
                handleSelectChange={(option) => { setSelectedProject(option) }}
              />
            </div>
            <div className="mb-5">
              <label
                for="labelID"
                className="block mb-2 font-bold text-gray-600"
              >
                Deal
              </label>
              <ReactSelect
                selectedValue={selectedDeal}
                options={
                  Dealstore && Dealstore?.getDeals?.length > 0
                    ? Dealstore?.getDeals?.map((item) => ({
                      value: item?.dealID,
                      label: item?.title,
                      isDisabled: identityName === 'Deal'
                    }))
                    : [{ value: "", label: "Not Found" }]
                }
                handleSelectChange={(option) => setSelectedDeal(option)}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold text-gray-600">
                Contact Person
              </label>
              <ReactSelect
                selectedValue={selectedPerson}

                options={
                  Peoplestore &&
                    Peoplestore?.getAllPerson?.length > 0
                    ? Peoplestore?.getAllPerson?.map((item) => ({
                      value: item?.personMasterID ?? "",
                      label: item?.name,
                      isDisabled: identityName === 'people'
                    }))
                    : [{ value: "", label: "Not Found" }]
                }
                handleSelectChange={(option) => setselectedPerson(option)}
              />

            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold text-gray-600">
                Organization
              </label>
              <ReactSelect
                selectedValue={selectedOrganization}
                options={
                  organizationstore &&
                    organizationstore?.organizationData?.data?.length >
                    0
                    ? organizationstore?.organizationData?.data.map(
                      (item) => ({
                        value: item?.organizationID ?? "",
                        label: item?.organizationName,
                      })
                    )
                    : [{ value: "", label: "Not Found" }]
                }
                handleSelectChange={(option) => setselectedOrganization(option)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-b border-t border-gray-300">
            <input
              type="checkbox"
              id="markAsDone"
              className="border border-gray-300 font-semibold"
              onChange={handleMarkAsDone}
              checked={markAsDone}
            /> <label for='markAsDone'>
              Mark as done
            </label>
            <button
              className="font-semibold focus:outline-none text-red-500 hover:bg-red-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
              onClick={() => cancel()}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white border border-gray-200 bg-gray-300 text-sm py-1 px-3 rounded"
              onClick={() => handleSaveActivity()}
            >
              {editActivityData && editActivityData?.activityID ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
        <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3">
          <div className='activity w-full shadow-xl'>

            <FullCalendar
              className='overflow-auto'
              eventColor="blue"
              selectMirror
              weekends={false}
              headerToolbar={{
                left: "prev,next,today",
                center: "title",
                right: "timeGridDay",
              }}

              plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
              initialView="timeGridDay"
              slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                omitZeroMinute: false,
                hour12: true,
              }}
              events={[
                CalendarEvents
              ]}
            />
          </div>
        </div>
      </div>



    </>
  );
};

export default Activity;
