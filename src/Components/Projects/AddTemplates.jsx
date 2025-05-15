/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Sidebar from '../Common/Sidebar';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
import { FaPlus } from 'react-icons/fa6';
import AddTasks from './AddTasks';
import AddActivity from '../Activitys/AddActivity';
import ReactSelect from '../Common/ReactSelect';
import { Boards, getActivityIcon } from '../Common/Common';
import { useDispatch } from 'react-redux';
import { getTaskByID } from '../../Redux/TaskSlice';
import { deleteTemplatePhase, getTemplatesByID, InsertTemplates, MoveTemplatePhase } from '../../Redux/TemplateSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { MdDeleteForever, MdOutlineKeyboardBackspace, } from 'react-icons/md';
import sweetAlert from '../Common/sweetAlert';
import { getByIdApiActivity } from '../../Redux/CommonSlice';
import Loading from '../Common/Loading';
import toast from 'react-hot-toast';

export default function AddTemplates({
    isVisible,
    setIsVisible,
    setSidebarOpen,
    sidebarOpen,
    isDark,
    setIsDark,
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const projectTemplateID = isNaN(id) || id === "0" ? 0 : id;

    const [loading, setloading] = useState(true);
    const [loadFrist, setloadFrist] = useState(true);
    const [TaskModal, setTaskModal] = useState(false);
    const [ActivityModal, setActivityModal] = useState(false);
    const [Error, setError] = useState('');
    const [Board, setBoard] = useState('');
    const [Description, setDescription] = useState('');
    const [ProjectName, setProjectName] = useState('Project Templates');
    const [EditData, setEditData] = useState([]);
    const [EditTask, setEditTask] = useState([]);
    const [ActivityData, setActivityData] = useState([]);
    const [TemplateID, setTemplateID] = useState('');
    const [PhaseName, setPhaseName] = useState('')

    useEffect(() => {
        if (loadFrist) {
            setloading(true)
            dispatch(getTemplatesByID(projectTemplateID)).then((res) => {
                setEditData(res?.payload?.data);
                const timer = setTimeout(() => {
                    setloading(false)
                }, 500);
                return () => clearTimeout(timer);
            });
            setloadFrist(false);
        }
    }, [loadFrist, TemplateID]);

    useEffect(() => {
        if (EditData) {
            if (EditData?.name) setProjectName(EditData?.name);
            if (EditData?.description) setDescription(EditData?.description);
            if (EditData && EditData?.board) { setBoard({ label: EditData?.board, value: EditData?.board }); }
        }
    }, [EditData]);

    const toggleTask = (phase) => {
        setPhaseName(phase)
        setTaskModal(!TaskModal);
        setEditTask([])
    };

    const toggleActivity = (phase) => {
        setPhaseName(phase)
        setActivityModal(!ActivityModal);
        setActivityData([])
    };

    const AddTemplates = async (TaskData) => {

        if (!Board) {
            setError('Select is required');
            return;
        }
        const Payload = {
            projectTemplateID: projectTemplateID ? projectTemplateID : 0,
            name: ProjectName,
            description: Description,
            board: Board?.label,
            type: "ProjectTemplate",

            phaseUnassignedMaster: TaskData && TaskData?.phase === "PhaseUnassigned" ? [...EditData?.phaseunassignedMaster, {
                phaseUnassignedMasterID: TaskData?.phaseId ? TaskData?.phaseId : 0,
                projectTemplateID: projectTemplateID ? projectTemplateID : 0,
                identityID: TaskData?.identityName === "Task" ? TaskData?.taskID : TaskData?.activityID,
                identityName: TaskData?.identityName,
                userID: 1
            }] : EditData?.phaseunassignedMaster,

            kickoffMaster: TaskData && TaskData?.phase === "Kickoff" ? [...EditData?.kickoffMaster, {
                kickoffMasterID: TaskData?.phaseId ? TaskData?.phaseId : 0,
                projectTemplateID: projectTemplateID ? projectTemplateID : 0,
                identityID: TaskData?.identityName === "Task" ? TaskData?.taskID : TaskData?.activityID,
                identityName: TaskData?.identityName,
                userID: 1
            }] : EditData?.kickoffMaster,

            planningMaster: TaskData && TaskData?.phase === "Planning" ? [...EditData?.planningMaster, {
                planningMasterID: 0,
                projectTemplateID: projectTemplateID ? projectTemplateID : 0,
                identityID: TaskData?.identityName === "Task" ? TaskData?.taskID : TaskData?.activityID,
                identityName: TaskData?.identityName,
                userID: 1
            }] : EditData?.planningMaster,

            implementationMaster: TaskData && TaskData?.phase === "Implementation" ? [...EditData?.implementationMaster, {
                implementationMasterID: 0,
                projectTemplateID: projectTemplateID ? projectTemplateID : 0,
                identityID: TaskData?.identityName === "Task" ? TaskData?.taskID : TaskData?.activityID,
                identityName: TaskData?.identityName,
                userID: 1
            }] : EditData?.implementationMaster,


            reviewMaster: TaskData && TaskData?.phase === "Review" ? [...EditData?.reviewMaster, {
                reviewMasterID: 0,
                projectTemplateID: projectTemplateID ? projectTemplateID : 0,
                identityID: TaskData?.identityName === "Task" ? TaskData?.taskID : TaskData?.activityID,
                identityName: TaskData?.identityName,
                userID: 1
            }] : EditData?.reviewMaster,


            closingMaster: TaskData && TaskData?.phase === "Closing" ? [...EditData?.closingMaster, {
                closingMasterID: 0,
                projectTemplateID: projectTemplateID ? projectTemplateID : 0,
                identityID: TaskData?.identityName === "Task" ? TaskData?.taskID : TaskData?.activityID,
                identityName: TaskData?.identityName,
                userID: 1
            }] : EditData?.closingMaster,
        };
        toast.remove()
        try {
            const res = await dispatch(InsertTemplates(Payload));
            const insertedData = res.payload.data;
            setTemplateID(insertedData);
            if (res?.payload?.status === true) {
                setError('');
                setloadFrist(true);
            }
            if (TaskData) {
                toast.remove()
                toast.success('Phase saved successfully!')
            }

            if (!projectTemplateID) {
                navigate(`/Projects/Templates/${insertedData.projectTemplateID}`);
            }
        } catch (error) {
            console.error("Error inserting template:", error);
        }
    };

    const MovePhase = async (taskData) => {
        const Payload = {
            nid: 0,
            oid: taskData?.identityName === "Task" ? EditTask?.phaseId : ActivityData?.phaseId,
            projectID: 0,
            projectTemplateID: id,
            identityID: taskData?.identityName === "Task" ? EditTask?.taskID : ActivityData?.activityID,
            identityName: taskData?.identityName,
            nType: taskData?.phase,
            oType: `O${taskData?.identityName === "Task" ? EditTask?.phase : ActivityData?.phase}`,
            operation: "Insert",
            userID: 1
        }
        toast.remove()
        const res = await dispatch(MoveTemplatePhase(Payload));
        toast.remove()
        if (res?.payload?.status === 200) {
            setloadFrist(true);
            toast.success('Phase Saved successfully!')
        }
    }

    const DeleteTemplatetask = async (id, PhaseName) => {
        try {
            const payload = { IdentityID: id, IdentityName: `${PhaseName}Master` }
            const result = await sweetAlert.confirm("Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                const res = await dispatch(deleteTemplatePhase(payload))
                if (res) {
                    setloadFrist(true)
                    sweetAlert.success("Deleted successfully");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    };

    const TaskEdit = (id, phaseId) => {
        try {
            dispatch(getTaskByID(id)).then((res) => {
                if (res.payload.status === true) {
                    const editedTask = { ...res.payload.data, phaseId: phaseId };
                    setEditTask(editedTask);
                }
            })
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    const EditActivity = async (id, phaseId) => {
        const result = await dispatch(getByIdApiActivity(id));

        if (result) {
            const editeActivity = { ...result.payload.data, phaseId: phaseId };
            setActivityData(editeActivity);
        }
    };

    const phases = ["PhaseUnassigned", "Kickoff", "Planning", "Implementation", "Review", "Closing"];

    return (
        <div>
            <Sidebar
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                setSidebarOpen={setSidebarOpen}
                sidebarOpen={sidebarOpen}
            />

            <Navbar
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                isDark={isDark}
                setIsDark={setIsDark}
            />

            <div className="flex flex-1 ">
                <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
                    <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 mt-10">
                        <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative ">
                            {loading && (
                                <div className="flex justify-center items-center h-60">
                                    <Loading />
                                </div>
                            )}
                            {!loading && (
                                <>
                                    <div className="flex items-center ml-3 justify-between pb-3 border-b border-dashed border-slate-200 ">
                                        <div className="flex gap-5  dark:text-slate-300/70">
                                            <button
                                                type="submit"
                                                className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200  dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm  px-3 py-0 rounded h-8"
                                                onClick={() => navigate(`/Projects/Templates`)}
                                            >
                                                <MdOutlineKeyboardBackspace size={20} />
                                            </button>
                                            <div>

                                                <input
                                                    type="text"
                                                    name="code"
                                                    id="code"
                                                    className="bg-gray-50 w-48 text-gray-900 text-2xl  hover:bg-lightgray  focus:bg-lightgray ps-3  block  dark:bg-lightgray dark:text-white border-0 "
                                                    value={ProjectName}
                                                    onChange={(e) => {
                                                        setProjectName(e.target.value);
                                                    }}
                                                />

                                                <input
                                                    type="text"
                                                    name="code"
                                                    id="code"
                                                    placeholder='Add description'
                                                    className="bg-gray-50 mt-3  text-gray-900 text-sm  hover:bg-lightgray w-40  focus:bg-lightgray ps-3  block  dark:bg-lightgray dark:text-white border-0 "
                                                    value={Description}
                                                    onChange={(e) => {
                                                        setDescription(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {EditData && (
                                            <button
                                                data-modal-toggle="modal"
                                                className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                                                onClick={() => {
                                                    AddTemplates()
                                                    navigate("/Projects/Templates")
                                                }}
                                            >
                                                Save
                                            </button>
                                        )}
                                    </div>
                                    <div >
                                        <div className='grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 '>
                                            <div className='sm:col-span-12 md:col-span-12 lg:col-span-8 xl:col-span-8 border-r'>
                                                {projectTemplateID ? (
                                                    <ul className="list-none">
                                                        {EditData && phases.map((phase, phaseIndex) => (
                                                            <li key={phaseIndex} className="bg-gray-200 m-5 p-4 border border-gray-300">
                                                                <p className="block text-xl font-medium pb-2 mb-2 border-b">{phase}</p>
                                                                {EditData[phase?.toLowerCase() + 'Master'] && EditData[phase?.toLowerCase() + 'Master'].length > 0 && (
                                                                    <div>
                                                                        <table className="w-full border border-slate-200 dark:border-gray-400 rounded-t table bg-white drop-shadow-md">
                                                                            <thead className="rounded-t text-md font-medium border-b dark:border-gray-400 text-gray-700 dark:text-gray-400">
                                                                                <tr className="text-left">
                                                                                    <th scope="col" className="p-4 text-center border">
                                                                                        Subject
                                                                                    </th>
                                                                                    <th scope="col" className="p-4 text-center border">
                                                                                        Assignee
                                                                                    </th>
                                                                                    <th scope="col" className="p-4 text-center border">
                                                                                        Subtask
                                                                                    </th>
                                                                                    <th scope="col" className="p-4 text-center border">
                                                                                        Due Date
                                                                                    </th>
                                                                                    <th scope="col" className="p-4 text-center border">
                                                                                        Action
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {EditData[phase?.toLowerCase() + 'Master'] && EditData[phase.toLowerCase() + 'Master'].map((task, taskIndex) => {
                                                                                    return (
                                                                                        <tr key={taskIndex} className="text-md text-gray-700 dark:text-gray-400">

                                                                                            <td className="p-2 text-center border cursor-pointer"
                                                                                                onClick={() => {
                                                                                                    if (task?.identityName === "Activity") {
                                                                                                        setActivityModal(true)
                                                                                                        const masterID = phase === "Phaseunassigned" ? "phaseUnassignedMasterID" : `${phase.charAt(0).toLowerCase()}${phase.slice(1)}MasterID`;
                                                                                                        EditActivity(task?.activityMaster?.activityID, task[masterID])
                                                                                                    } else {
                                                                                                        setTaskModal(true)
                                                                                                        const masterID = phase === "Phaseunassigned" ? "phaseUnassignedMasterID" : `${phase.charAt(0).toLowerCase()}${phase.slice(1)}MasterID`;
                                                                                                        TaskEdit(task?.identityID, task[masterID]);
                                                                                                    }
                                                                                                }}
                                                                                            >
                                                                                                <div className='flex items-center justify-center'>
                                                                                                    {getActivityIcon(task?.activityMaster?.activityType)}
                                                                                                    &nbsp;&nbsp;
                                                                                                    {task?.identityName === "Activity" ? task?.activityMaster?.activityName : task?.taskDetails?.taskName}
                                                                                                </div>
                                                                                            </td>

                                                                                            <td className="p-2 text-center border"></td>
                                                                                            <td className="p-2 text-center border">
                                                                                                {task?.taskDetails?.subTaskDetails.map((x, index) => (
                                                                                                    <div key={index} className='flex items-center justify-evenly'>
                                                                                                        <p className='capitalize'>{x?.subTaskName ? x?.subTaskName : 'Task'}</p>
                                                                                                        <p>+ {x?.day} day</p>
                                                                                                    </div>
                                                                                                ))}
                                                                                            </td>
                                                                                            <td className="p-2 text-center border">+ {task?.identityName === "Activity" ? task?.activityMaster?.day : task?.taskDetails?.day} day</td>
                                                                                            <td className="p-2 text-center border">
                                                                                                <div
                                                                                                    data-tip
                                                                                                    data-for="Delete"
                                                                                                    className="relative flex-col group cursor-pointer text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                                                    onClick={() => {
                                                                                                        const masterID = phase === "Phaseunassigned" ? "phaseUnassignedMasterID" : `${phase.charAt(0).toLowerCase()}${phase.slice(1)}MasterID`;
                                                                                                        DeleteTemplatetask(task[masterID], phase);
                                                                                                    }}
                                                                                                >
                                                                                                    <MdDeleteForever />
                                                                                                    <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                                                        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Delete</span>
                                                                                                        <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )
                                                                                })}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <button
                                                                        data-modal-toggle="modal"
                                                                        className="relative text-sm group focus:outline-none text-blue font-medium rounded-md text-lg px-3 py-1 mt-3 inline-flex items-center"
                                                                        onClick={() => toggleTask(phase)}
                                                                    >
                                                                        <FaPlus className="mr-1 font-extrabold" size={12} />
                                                                        Task
                                                                        <div class="absolute  bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                            <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                                                Task
                                                                            </span>
                                                                            <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                        </div>
                                                                    </button>
                                                                    <button
                                                                        data-modal-toggle="modal"
                                                                        className="relative text-sm group focus:outline-none text-blue font-medium rounded-md text-lg px-3 py-1 inline-flex items-center"
                                                                        onClick={() => toggleActivity(phase)}
                                                                    >
                                                                        <FaPlus className="mr-1 font-extrabold" size={12} />
                                                                        Activity
                                                                        <div class="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                            <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                                                                Activity
                                                                            </span>
                                                                            <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                        </div>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div className='h-svh'>
                                                        <p className='text-center mt-44 bg-gray-200 p-4 border border-gray-300 text-lg' >Each project belongs on a specific project board. Select a board for this template.</p>
                                                    </div>
                                                )
                                                }
                                            </div>
                                            <div className='sm:col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-4'>
                                                <div className="m-5">
                                                    <label className="block mb-2 font-bold text-gray-600">Select board</label>
                                                    <p className='mb-3 font-semibold'>Projects created using this template will be linked to the selected board.</p>
                                                    <ReactSelect
                                                        id="Project"
                                                        name="Project"
                                                        selectedValue={Board}
                                                        options={
                                                            Boards && Boards?.length > 0
                                                                ? Boards.map((item) => ({
                                                                    value: item?.id,
                                                                    label: item?.name,
                                                                }))
                                                                : [{ value: "", label: "Not Found" }]
                                                        }
                                                        handleSelectChange={(option) => {
                                                            setBoard(option);
                                                        }}
                                                    />
                                                    {Board && Board?.label?.length > 0 ? "" : Error && (
                                                        <div style={{ color: 'red', marginTop: '0.5rem' }}>{Error}</div>
                                                    )}
                                                </div>
                                                {
                                                    !EditData && (
                                                        <button
                                                            data-modal-toggle="modal"
                                                            className="relative ms-10 group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                                                            onClick={() => AddTemplates()}
                                                        >
                                                            Continue
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </>
                            )}
                        </div>

                        <Footer />
                    </div>
                </div>
            </div>
            {
                TaskModal && (
                    <AddTasks
                        toggle={toggleTask}
                        setloadFrist={setloadFrist}
                        TemplateID={id}
                        EditTask={EditTask}
                        AddTemplates={AddTemplates}
                        MovePhase={MovePhase}
                        PhaseName={PhaseName}
                    />
                )
            }

            {
                ActivityModal && (
                    <AddActivity
                        togglemodel={toggleActivity}
                        TemplateID={id}
                        setloadFrist={setloadFrist}
                        editActivityData={ActivityData}
                        AddTemplates={AddTemplates}
                        MovePhase={MovePhase}
                        PhaseName={PhaseName}

                    />
                )
            }
        </div >
    );
}
