/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi';
import { LuFileLock } from 'react-icons/lu';
import { MdDeleteForever } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { ActiveDeactiveMeetting, deleteMeeting, getAllMeetings, getMeetingByID } from '../../../Redux/ChatSlice';
import { useSelector } from 'react-redux';
import Loading from '../../Common/Loading';
import moment from 'moment';
import AddMettigSchedule from './AddMettigSchedule';
import sweetAlert from '../../Common/sweetAlert';

export default function MettingSchedule({ setOpenmetting, setloadfrist }) {
  // shraddha
  const dispatch = useDispatch()
  const store = useSelector((state) => state?.root?.Chat)
  const [openMeetingSchedule, setopenMeetingSchedule] = useState(false);
  const [loading, setloading] = useState(true);
  const [loadFrist, setloadFrist] = useState(true);
  const [MeetingData, setMeetingData] = useState([]);

  useEffect(() => {
    if (loadFrist) {
      setloading(true)
      dispatch(getAllMeetings({}))
        .then((res) => {
          const timer = setTimeout(() => {
            setloading(false)
          }, 500);
          return () => clearTimeout(timer);

        }).catch((error) => {
          console.log('error :>> ', error);
          setloadFrist(false)
        })
      setloadFrist(false)
    }
  }, [loadFrist]);

  const DeactiveMeeting = (item) => {
    const payload = {
      ConversationMeetingID: item.conversationMeetingID,
      IsActive: item?.isActive === true ? false : true,
    };
    dispatch(ActiveDeactiveMeetting(payload)).then((res) => {
      if (res) {
        setloadFrist(true)
      }
    })
  }

  const handlerDeleteMeeting = async (id) => {
    try {
      await dispatch(deleteMeeting(id)).then((res) => {
        if (res.payload.status === true) {
          setloadFrist(true);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      sweetAlert.error("An error occurred");
    }
  }

  const EditMeeting = async (id) => {
    const res = await dispatch(getMeetingByID(id))
    if (res) {
      setMeetingData(res?.payload?.data)
      setopenMeetingSchedule(true)
    }
  }

  return (
    <>
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
                General availability
              </h3>
              <AiOutlineCloseCircle
                className="text-3xl text-primary cursor-pointer"
                onClick={() => { setOpenmetting(false); setloadfrist(true); }}
              />
            </div>
            <div className='mt-2 ml-12'>
              <button
                type="submit"
                className="flex items-center    focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium py-1 px-3  rounded"
                onClick={() => { setopenMeetingSchedule(true); setMeetingData([]); }}
              >
                <FaPlus /><span className='text-black text-sm font-semibold  px-2.5 py-0.5 rounde'>Add availability</span>
              </button>
            </div>
            {loading && (
              <div className="flex justify-center items-center h-60">
                <Loading />
              </div>
            )}
            {
              !loading && (
                <div className="xl:w-full h-96 vertical-scroll-inner relative p-10">
                  <div className="relative scroll-inner shadow-md sm:rounded-lg mb-4">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-slate-700/20">
                        <tr>
                          <th
                            scope="col"
                            className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            ACTIVE PLAYBOOKS
                          </th>
                          <th
                            scope="col"
                            className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            START DATE
                          </th>
                          <th
                            scope="col"
                            className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            END DATE
                          </th>

                          <th
                            scope="col"
                            className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            STATUS
                          </th>
                          <th
                            scope="col"
                            className="p-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                          >
                            ACTIONS
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          store?.getAllMeeting?.length > 0 ? (store?.getAllMeeting.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100 bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                              <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white cursor-pointer" >
                                <h3><a className="text-blue-500">{item?.meetingName}</a></h3>
                              </td>
                              <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {moment(item?.availableStartDate).format('L')}
                              </td>
                              <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {moment(item?.availableEndDate).format('L')}
                              </td>
                              <td className={`p-3 text-sm  whitespace-nowrap dark:text-gray-400 ${item?.isActive ? "text-green" : "text-rose-500"}`}>
                                <div className="flex items-center justify-between">
                                  {item?.isActive === true ? 'ACTIVE' : "INACTIVE"}
                                </div>
                              </td>
                              <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                <div className="flex justify-center gap-4">
                                  <div data-tip data-for="Edit" className="relative flex flex-col items-center  cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => EditMeeting(item?.conversationMeetingID)}
                                  >
                                    <BiEdit />
                                  </div>
                                  <div
                                    data-tip
                                    data-for="Delete"
                                    className="relative flex-col  cursor-pointer text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => handlerDeleteMeeting(item?.conversationMeetingID)}
                                  >
                                    <MdDeleteForever />
                                  </div>
                                  <div
                                    data-tip
                                    data-for="Deactive"
                                    className="relative flex-col group cursor-pointer text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => DeactiveMeeting(item)}
                                  >
                                    <LuFileLock />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))) :
                            (<td colSpan={6}>
                              <p className="text-center p-2">Not Found.</p>
                            </td>)
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            <div className="flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
              <button
                type="button"
                className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                onClick={() => setOpenmetting(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        openMeetingSchedule && <AddMettigSchedule setopenMeetingSchedule={setopenMeetingSchedule} setloadFrist={setloadfrist} setOpenmetting={setOpenmetting} MeetingData={MeetingData} />
      }
    </>
  )
}
