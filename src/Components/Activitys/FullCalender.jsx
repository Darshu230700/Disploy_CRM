import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import { useDispatch } from "react-redux";
import { saveActivity } from "../../Redux/CommonSlice";
import { getActivityIcon } from "../Common/Common";
import { GetActivity } from "./ActivitySlice";

const FullCalender = ({ setOpenModel, }) => {
  const calendarRef = useRef(null);
  const dispatch = useDispatch();
  // console.log('data :>> ', data);
  const [events, setEvents] = useState([]);
  const [data, setdata] = useState([]);
  const [loadFrist, setloadFrist] = useState(true);
  const [loading, setloading] = useState(true);


  useEffect(() => {
    const query = { search: '', limit: 0, pageNumber: 0, objSearch: {} };

    if (loadFrist) {
      setloading(true)
      dispatch(GetActivity(query)).then((res) => {

        setdata(res?.payload?.data?.data)
        const timer = setTimeout(() => {
          setloading(false)
        }, 1000);
        return () => clearTimeout(timer);

      }).catch((error) => {
        console.log('error :>> ', error);
      })
      setloadFrist(false);
    }
  }, [loadFrist, dispatch]);


  useEffect(() => {
    setEvents(formattedEvents(data));
  }, [data]);


  const formattedEvents = (data) => data?.length > 0 && data.map(event => ({
    id: event.activityID.toString(),
    title: `${event.activityName}`,
    start: `${moment(event.startDate).format("YYYY-MM-DD")}T${event.startTime}`,
    end: `${moment(event.endDate).format("YYYY-MM-DD")}T${event.endTime}`,
    extendedProps: {
      activityType: event.activityType
    }
  }));

  const handleEventDrop = async (info) => {
    const eventToUpdate = data && data?.find(event => event.activityID.toString() === info.event.id);
    if (eventToUpdate) {
      const updatedEvent = {
        ...eventToUpdate,
        startDate: moment(info.event.start).format("YYYY-MM-DD"),
        startTime: moment(info.event.start).format("HH:mm:ss"),
        endDate: info.event.end ? moment(info.event.end).format("YYYY-MM-DD") : eventToUpdate.endDate,
        endTime: info.event.end ? moment(info.event.end).format("HH:mm:ss") : eventToUpdate.endTime,
        type: "Activity"
      };
      await handleSaveActivity(updatedEvent);
    } else {
      console.error('Event not found in data for activityID:', info.event.id);
    }
  };

  const handleEventResize = async (info) => {
    const updatedEvent = {
      ...data.find(event => event.activityID.toString() === info.event.id),
      endDate: moment(info.event.end).format("YYYY-MM-DD"),
      endTime: moment(info.event.end).format("HH:mm:ss"),
      type: "Activity"
    };
    await handleSaveActivity(updatedEvent);
  };

  const handleSaveActivity = async (updatedEvent) => {
    const res = await dispatch(saveActivity(updatedEvent));
    if (res?.payload?.status === true) {
      setloadFrist(true)
    }
  };

  const handleSelecteDate = (data) => {
    console.log('data :>> ', data);
    setOpenModel(true)
  }


  const renderEventContent = (eventInfo) => {
    return (<div className="fc-event-title flex items-center gap-3">{getActivityIcon(eventInfo.event.extendedProps.activityType)} {eventInfo.event.title}</div>);
  };

  return (
    <div>
      <div className="calendar " >
        <FullCalendar
          eventColor="#bfdbfe"
          eventTextColor="black"
          ref={calendarRef}
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,timeGridDay,dayGridMonth",
          }}
          nowIndicator={true}
          editable={true}
          // selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={events}
          // select={handleSelecteDate}  date-time selecte in modal show 
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          eventContent={renderEventContent}
        />
      </div>
    </div>
  );
};

export default FullCalender;
