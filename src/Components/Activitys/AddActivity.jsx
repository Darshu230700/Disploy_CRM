/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect, useState } from "react";
import { AiFillFlag, AiOutlineCloseCircle } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { IoCall, IoRestaurant } from "react-icons/io5";
import { MdEmail, MdOutlineWatchLater } from "react-icons/md";
import ReactQuill from "react-quill";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { saveActivity } from "../../Redux/CommonSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "../../Redux/organizationSlice";
import moment from "moment";
import { getAllPerson } from "../../Redux/PersonSlice";
import { getAllDeals } from "../../Redux/DealSlice";
import ReactSelect from "../Common/ReactSelect";
import { MettingTypes, Phase } from "../Common/Common";
import { getLeadmaster } from "../../Redux/LeadsSlice";
import { getProject } from "../../Redux/ProjectSlice";

export default function AddActivity({
  togglemodel,
  setloadFrist,
  editActivityData,
  TemplateID, MovePhase, AddTemplates, ProjectId, PhaseName
}) {
  const dispatch = useDispatch();
  const organizationstore = useSelector((state) => state.root.organization);
  const Peoplestore = useSelector((state) => state.root.Person);
  const Dealstore = useSelector((state) => state.root.Deal);
  const Leadstore = useSelector((state) => state.root.leads);
  const Projectstore = useSelector((state) => state.root.Project);


  const [labelActivityPlaceholder, setLabelActivityPlaceholder] = useState("Call");
  const [activityName, setActivityName] = useState("");
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [startTime, setStartTime] = useState(moment().format("HH:mm"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [endTime, setEndTime] = useState(moment().format("HH:mm"));
  const [guestvalus, setGuestvalus] = useState("");
  const [selectedMeeting, setSelectedMeeting] = useState("Zoom Meeting");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [availableType, setAvailableType] = useState("Free");
  const [Priority, setPriority] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [markAsDone, setmarkAsDone] = useState(false);
  const [Error, setError] = useState('');
  const [CalendarEvents, setCalendarEvents] = useState([]);
  const [Day, setDay] = useState('');
  const [selectedPhase, setselectedPhase] = useState({ value: 0, label: `${PhaseName ? PhaseName : 'Phase unassigned'}`, });

  useEffect(() => {
    dispatch(fetchApiData({}));
    dispatch(getAllPerson({}));
    dispatch(getAllDeals({}));
    dispatch(getLeadmaster({ search: '', limit: 0, pageNumber: 0, objSearch: {} }))
    dispatch(getProject({}))
  }, [dispatch]);

  useEffect(() => {
    const startDateTime = new Date(`${startDate}T${startTime}`).toISOString();
    const endDateTime = new Date(`${endDate}T${endTime}`).toISOString();
    setCalendarEvents({
      title: labelActivityPlaceholder,
      start: startDateTime,
      end: endDateTime,
    },)
  }, [startDate, endDate, startTime, endTime, labelActivityPlaceholder]);

  useEffect(() => {

    if (editActivityData) {
      // toast.loading("Fetching...")
      setActivityName(editActivityData?.activityName ? editActivityData?.activityName : activityName);
      setGuestvalus(editActivityData?.guests ? editActivityData?.guests : guestvalus);
      setLabelActivityPlaceholder(editActivityData?.activityType ? editActivityData?.activityType : labelActivityPlaceholder);

      if (editActivityData && editActivityData?.meetingType) { setSelectedMeeting({ label: editActivityData?.meetingType, value: editActivityData?.meetingType, }); }
      setLocation(editActivityData?.locations ? editActivityData?.locations : location);
      setNotes(editActivityData?.notes ? editActivityData?.notes : notes);
      setmarkAsDone(editActivityData?.markAsDone ? editActivityData?.markAsDone : markAsDone)
      setDescription(editActivityData?.description ? editActivityData?.description : description);
      setAvailableType(editActivityData?.availableType ? editActivityData?.availableType : availableType);
      setPriority(editActivityData?.priority ? editActivityData?.priority : Priority);
      setDay(editActivityData?.day ? editActivityData?.day : Day)
      if (editActivityData?.phase) { setselectedPhase({ label: editActivityData?.phase, value: editActivityData?.phase }); }

      if (editActivityData?.organizationID) { setSelectedOrganization({ label: editActivityData?.organizationName, value: editActivityData?.organizationID, }); }
      if (editActivityData?.peopleID) { setSelectedPerson({ label: editActivityData?.peopleName, value: editActivityData?.peopleID, }); }
      if (editActivityData?.dealID) { setSelectedDeal({ label: editActivityData?.dealName, value: editActivityData?.dealID, }); }
      if (editActivityData?.leadID) { setSelectedLead({ label: editActivityData?.leadName, value: editActivityData?.leadID, }); }
      if (editActivityData?.projectID) { setSelectedProject({ label: editActivityData?.projectName, value: editActivityData?.projectID, }); }
    }
  }, [editActivityData]);

  useEffect(() => {
    if (editActivityData?.endDate) { setEndDate(moment(editActivityData?.endDate).format("YYYY-MM-DD")); }
    if (editActivityData?.startDate) { setStartDate(editActivityData?.startDate ? moment(editActivityData?.startDate).format("YYYY-MM-DD") : startDate) }
    setEndTime(editActivityData?.endTime ? editActivityData?.endTime : endTime);
    setStartTime(editActivityData?.startTime ? editActivityData?.startTime : startTime);
  }, [editActivityData?.endDate, editActivityData?.startDate, editActivityData?.endTime,]);

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

  const handleIconClick = (placeholder) => { setLabelActivityPlaceholder(placeholder); };
  const handleContentGuestChange = (newContent) => { setNotes(newContent); };
  const handleOrgChange = (option) => { setSelectedOrganization(option); };
  const handlePersonChange = (option) => { setSelectedPerson(option); };
  const handleDealChange = (option) => { setSelectedDeal(option); };


  const handleSaveActivity = async (e) => {
    e.preventDefault()
    if (!activityName) {
      setError('Activity Name is Required');
      return;
    }

    const payload = {
      activityID: editActivityData?.activityID ? editActivityData?.activityID : 0,
      activityName: activityName,
      activityType: labelActivityPlaceholder,
      startTime: startTime,
      startDate: startDate,
      endDate: endDate,
      endTime: endTime,
      guests: guestvalus,
      locations: location,
      meetingType: selectedMeeting.label,
      description: description,
      availableType: availableType,
      notes: notes,
      userID: 0,
      dealID: selectedDeal?.value,
      peopleID: selectedPerson?.value,
      organizationID: selectedOrganization?.value,
      markAsDone: markAsDone,
      identityID: selectedOrganization?.value,
      identityName: "Activity",
      day: Day,
      phase: TemplateID ? selectedPhase?.label : "",
      type: TemplateID ? "ProjectTemplate" : "Activity",
      leadID: selectedLead?.value,
      projectID: selectedProject?.value,
      priority: Priority
    };

    const res = await dispatch(saveActivity(payload))
    const taskData = res?.payload?.data
    if (TemplateID && !editActivityData?.phaseId) {
      AddTemplates(taskData)
    } else if (editActivityData?.phaseId) {
      MovePhase(taskData)
    }

    if (res?.payload?.status === true) {
      setloadFrist(true);
      togglemodel();
      setError('')
      setCalendarEvents([])
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
          <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {editActivityData?.activityID ? "Edit" : ""} Schedule an activity
            </h3>
            <AiOutlineCloseCircle
              className="text-3xl text-primary cursor-pointer"
              onClick={() => togglemodel()}
            />
          </div>
          <form >
            <div className="xl:w-full h-96 overflow-auto relative p-4">
              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6">
                  <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
                    <div className="mb-5">
                      <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3">
                        <input
                          type="text"
                          name="activityName"
                          placeholder={labelActivityPlaceholder}
                          className="border border-gray-300 font-semibold shadow p-3 w-full rounded capitalize"
                          defaultValue={editActivityData?.activityName}
                          onChange={(e) => setActivityName(e.target.value)}
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
                    </div>

                    <div className="mb-5">
                      {
                        TemplateID ? (
                          <div className='flex items-center'>
                            <input
                              type="number"
                              min="0"
                              className="border border-gray-300 shadow p-3  rounded mr-3"
                              value={Day}
                              onChange={(e) => {
                                let inputValue = e.target.value.replace(/\D/g, '');
                                if (inputValue.length > 4) {
                                  inputValue = inputValue.slice(0, 4);
                                }
                                setDay(inputValue);
                              }}
                            />
                            <label className="block mb-2 font-semibold text-gray-600">days from <span className='font-bold text-black'>project start date</span></label>
                          </div>
                        ) :
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
                      }
                    </div>

                    {TemplateID ? (
                      <div className="mb-5">
                        <label className="block mb-2 font-bold text-gray-600">Phase</label>
                        <ReactSelect
                          selectedValue={selectedPhase}
                          options={
                            Phase &&
                              Phase?.length > 0
                              ? Phase.map((item) => ({
                                value: item?.id ?? "",
                                label: item?.name,
                              }))
                              : [{ value: "", label: "Not Found" }]
                          }
                          handleSelectChange={(option) => setselectedPhase(option)}
                        />
                      </div>
                    )
                      : (
                        <>
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
                              className="border border-gray-300 shadow p-3 w-full rounded capitalize"
                              defaultValue={editActivityData?.guests}
                              onChange={(e) => setGuestvalus(e.target.value)}
                            />
                          </div>
                          <div className="mb-5 flex gap-3 items-center">
                            <div className="w-full">
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
                                defaultValue={editActivityData?.locations}
                                onChange={(e) => setLocation(e.target.value)}
                              />
                            </div>
                            <div className="w-full">
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
                          </div>
                          <div className="mb-5">
                            <div className="flex items-center gap-5">
                              <div className="w-full">
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
                                  handleSelectChange={(option) =>
                                    setSelectedMeeting(option)
                                  }
                                />
                              </div>
                              <div className="w-full mt-7">
                                <select
                                  value={availableType}
                                  onChange={(e) => setAvailableType(e.target.value)}
                                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  <option value="Free">Free</option>
                                  <option value="Busy">Busy</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    }
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
                        defaultValue={editActivityData?.description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <ReactQuill
                        theme="snow"
                        value={notes ? notes : editActivityData?.notes}
                        onChange={handleContentGuestChange}
                      />
                      <small>
                        Notes are visible within crm, but not to event guests
                      </small>
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
                            ? Dealstore.getDeals.map((item) => ({
                              value: item?.dealID,
                              label: item?.title,
                            }))
                            : [{ value: "", label: "Not Found" }]
                        }
                        handleSelectChange={handleDealChange}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        for="labelID"
                        className="block mb-2 font-bold text-gray-600"
                      >
                        Contact Person
                      </label>
                      <ReactSelect
                        selectedValue={selectedPerson}
                        options={
                          Peoplestore && Peoplestore?.getAllPerson?.length > 0
                            ? Peoplestore.getAllPerson.map((item) => ({
                              value: item?.personMasterID ?? "",
                              label: item?.name,
                            }))
                            : [{ value: "", label: "Not Found" }]
                        }
                        handleSelectChange={handlePersonChange}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        for="labelID"
                        className="block mb-2 font-bold text-gray-600"
                      >
                        Organization
                      </label>
                      <ReactSelect
                        selectedValue={selectedOrganization}
                        options={
                          organizationstore &&
                            organizationstore?.organizationData?.data?.length > 0
                            ? organizationstore?.organizationData?.data.map(
                              (item) => ({
                                value: item?.organizationID ?? "",
                                label: item?.organizationName,
                              })
                            )
                            : [{ value: "", label: "Not Found" }]
                        }
                        handleSelectChange={handleOrgChange}
                      />
                    </div>
                  </div>
                </div>
                {
                  !TemplateID && (
                    <div className="sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6">
                      <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3 h-full">
                        <div style={{ height: "100vh" }}>
                          <FullCalendar
                            eventColor="blue"
                            selectMirror
                            weekends
                            headerToolbar={{
                              left: 'prev,next',
                              center: 'title',
                              right: 'timeGridDay',
                            }}
                            nowIndicator={true}
                            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                            initialView="timeGridDay"
                            slotLabelFormat={{
                              hour: 'numeric',
                              minute: '2-digit',
                              omitZeroMinute: false,
                              hour12: true,
                            }}
                            // eventContent={renderEventContent}
                            // titleFormat={{
                            //   year: 'numeric',
                            //   month: 'long',
                            //   day: 'numeric',
                            //   weekday: 'long'
                            // }}
                            events={[CalendarEvents]}
                          />
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
              <button
                type="button"
                className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded close"
                onClick={() => togglemodel()}
              >
                Close
              </button>

              <div className="flex items-center px-3">
                <div className="flex items-center gap-3 mr-3">
                  <input
                    type="checkbox"
                    id="markAsDone"
                    className="border border-gray-300 font-semibold"
                    checked={markAsDone}
                    onChange={(e) => {
                      setmarkAsDone(e.target.checked);
                    }}
                  />
                  <label for='markAsDone'>
                    Mark as done
                  </label>
                </div>
                <button
                  type="sumbit"
                  className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                  onClick={(e) => handleSaveActivity(e)}
                >
                  {editActivityData?.activityID ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
