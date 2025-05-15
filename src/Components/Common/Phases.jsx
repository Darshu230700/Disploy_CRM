import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp, FaPlus, } from 'react-icons/fa6'
import { MdDeleteForever, } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteTemplatePhase, getMarkAsPhase, InsertTemplates, MoveTemplatePhase } from '../../Redux/TemplateSlice'
import AddTasks from '../Projects/AddTasks'
import sweetAlert from './sweetAlert'
import { getMarkAsSubTask, getTaskByID } from '../../Redux/TaskSlice'
import AddActivity from '../Activitys/AddActivity'
import { getByIdApiActivity } from '../../Redux/CommonSlice'
import toast from 'react-hot-toast'
import { formatDate, getActivityIcon } from './Common'

export default function Phases({ ProjectId, EditProjectData, setLoadFirst }) {
    const dispatch = useDispatch()
    const [TaskModal, setTaskModal] = useState(false);
    const [EditTask, setEditTask] = useState([]);
    const [ActivityModal, setActivityModal] = useState(false);
    const [ActivityData, setActivityData] = useState([]);
    const [PhaseName, setPhaseName] = useState('')
    const [activeAccordion, setActiveAccordion] = useState("");

    const toggleAccordion = (accordionId) => {
        setActiveAccordion(accordionId === activeAccordion ? "" : accordionId);
    };

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

        const Payload = {
            ProjectId: ProjectId,
            phaseunassignedMaster: TaskData && TaskData.phase === "PhaseUnassigned"
                ? [
                    ...(EditProjectData?.phaseunassignedMaster || []),
                    {
                        phaseUnassignedMasterID: TaskData.phaseId || 0,
                        projectID: ProjectId || 0,
                        identityID: TaskData.identityName === "Task" ? TaskData.taskID : TaskData.activityID,
                        identityName: TaskData.identityName,
                        userID: 1,
                        markAsDone: TaskData?.markAsDone

                    }
                ]
                : EditProjectData?.phaseunassignedMaster || [],

            kickoffMaster: TaskData && TaskData?.phase === "Kickoff" ? ([...EditProjectData?.kickoffMaster, {
                kickoffMasterID: TaskData?.phaseId ? TaskData?.phaseId : 0,
                projectID: ProjectId ? ProjectId : 0,
                identityID: TaskData?.identityName === "Task" ? TaskData?.taskID : TaskData?.activityID,
                identityName: TaskData?.identityName,
                userID: 1,
                markAsDone: TaskData?.markAsDone
            }]) : EditProjectData?.kickoffMaster,

            planningMaster: TaskData && TaskData?.phase === "Planning" ? [...EditProjectData?.planningMaster, {
                planningMasterID: 0,
                ProjectId: ProjectId ? ProjectId : 0,
                identityID: TaskData?.identityName === "Task" ? TaskData?.taskID : TaskData?.activityID,
                identityName: TaskData?.identityName,
                userID: 1,
                markAsDone: TaskData?.markAsDone
            }] : EditProjectData?.planningMaster,

            implementationMaster: TaskData && TaskData?.phase === "Implementation" ? [...EditProjectData?.implementationMaster, {
                implementationMasterID: 0,
                ProjectId: ProjectId ? ProjectId : 0,
                identityID: TaskData?.identityName === "Task" ? TaskData?.taskID : TaskData?.activityID,
                identityName: TaskData?.identityName,
                userID: 1,
                markAsDone: TaskData?.markAsDone
            }] : EditProjectData?.implementationMaster,

            reviewMaster: TaskData && TaskData?.phase === "Review" ? [...EditProjectData?.reviewMaster, {
                reviewMasterID: 0,
                ProjectId: ProjectId ? ProjectId : 0,
                identityID: TaskData?.identityName === "Task" ? TaskData?.taskID : TaskData?.activityID,
                identityName: TaskData?.identityName,
                userID: 1,
                markAsDone: TaskData?.markAsDone
            }] : EditProjectData?.reviewMaster,

            closingMaster: TaskData && TaskData?.phase === "Closing" ? [...EditProjectData?.closingMaster, {
                closingMasterID: 0,
                ProjectId: ProjectId ? ProjectId : 0,
                identityID: TaskData?.identityName === "Task" ? TaskData?.taskID : TaskData?.activityID,
                identityName: TaskData?.identityName,
                userID: 1,
                markAsDone: TaskData?.markAsDone
            }] : EditProjectData?.closingMaster,
        };

        toast.remove()
        try {
            const res = await dispatch(InsertTemplates(Payload));
            toast.remove()
            if (res?.payload?.status === true) {
                setLoadFirst(true)
                toast.success('Plan saved successfully!')
            }
        } catch (error) {
            console.error("Error inserting template:", error);
        }

    }

    const MovePhase = async (taskData, status) => {

        const Payload = {
            nid: 0,
            oid: taskData?.identityName === "Task" ? EditTask?.phaseId : ActivityData?.phaseId,
            projectID: ProjectId,
            projectTemplateID: 0,
            identityID: taskData?.identityName === "Task" ? EditTask?.taskID : ActivityData?.activityID,
            identityName: taskData?.identityName,
            nType: taskData?.phase,
            oType: `O${taskData?.identityName === "Task" ? EditTask?.phase : ActivityData?.phase}`,
            operation: "Insert",
            userID: 1,
            markAsDone: taskData?.markAsDone
        }

        toast.remove()
        const res = await dispatch(MoveTemplatePhase(Payload));
        toast.remove()
        if (res?.payload?.status === 200) {
            setLoadFirst(true);
            toast.success('Plan Saved successfully!')
        }
    }

    const DeleteTemplatetask = async (id, PhaseName) => {
        try {
            const payload = { IdentityID: id, IdentityName: `${PhaseName}Master` }
            const result = await sweetAlert.confirm("Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                const res = await dispatch(deleteTemplatePhase(payload))
                if (res) {
                    setLoadFirst(true)
                    sweetAlert.success("Deleted successfully");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    };

    const TaskEdit = (id, phaseId, TaskStatus) => {

        try {
            dispatch(getTaskByID(id)).then((res) => {
                if (res.payload.status === true) {
                    const editedTask = { ...res.payload.data, phaseId: phaseId, TaskStatus };
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
            <ul className="list-none">
                {phases.map((phase, phaseIndex) => {
                    const phaseName = phase?.toLowerCase();
                    const tasks = EditProjectData[phaseName + 'Master'] || [];
                    const completedTasks = tasks.filter(task => task.markAsDone).length;
                    const totalTasks = tasks.length;
                    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
                    return (
                        <li key={phaseIndex} className="bg-gray-200 m-5 p-4 border border-gray-300">
                            <div className='mb-2 border-b flex justify-between px-3'>
                                <p className="block text-xl font-medium pb-2 ">{phase}</p>
                                <div className="flex items-center gap-x-3 whitespace-nowrap px-3 mt-2 w-48">
                                    <div className="flex w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className="flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition-all duration-500 border"
                                            style={{
                                                width: `${progressPercentage ? progressPercentage : 8}%`, backgroundColor: '#008000'
                                            }}
                                        ></div>
                                    </div>
                                    <div className="w-10 text-end">
                                        <span className="text-sm text-gray-800">{`(${completedTasks}/${totalTasks})`}</span>
                                    </div>
                                </div>
                            </div>
                            {tasks.length > 0 && (
                                <div>
                                    <table className="w-full border border-slate-200 dark:border-gray-400 rounded-t table bg-white drop-shadow-md">
                                        <thead className="rounded-t text-md font-medium border-b dark:border-gray-400 text-gray-700 dark:text-gray-400">
                                            <tr className="text-left">
                                                <th scope="col" className="p-4 text-center border">Done</th>
                                                <th scope="col" className="p-4 text-center border">Subject</th>
                                                <th scope="col" className="p-4 text-center border">Assignee</th>
                                                {/* <th scope="col" className="p-4 text-center border">Subtask</th> */}
                                                <th scope="col" className="p-4 text-center border">Due Date</th>
                                                <th scope="col" className="p-4 text-center border">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks.map((task, taskIndex) => {
                                                const masterID = `${phase?.charAt(0).toLowerCase()}${phase.slice(1)}MasterID`;
                                                return (
                                                    <React.Fragment key={taskIndex}>
                                                        <tr className="text-md text-gray-700 dark:text-gray-400">
                                                            <td className="p-1 text-center border">
                                                                <label className="custom-label">
                                                                    <div className="bg-white dark:bg-slate-600/40 dark:border-slate-600 rounded w-4 h-4 inline-block leading-4 text-center -mb-[3px]">
                                                                        <input
                                                                            checked={task?.markAsDone}
                                                                            type="radio"
                                                                            onClick={() => {
                                                                                const payload = {
                                                                                    IdentityID: task[masterID],
                                                                                    MarkAsDone: !task?.markAsDone,
                                                                                    IdentityName: `${phaseName}Master`
                                                                                };

                                                                                dispatch(getMarkAsPhase(payload)).then((res) => {
                                                                                    toast.remove();
                                                                                    if (res.payload.status === true) {
                                                                                        setLoadFirst(true);
                                                                                    }
                                                                                });
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </label>
                                                            </td>

                                                            <td
                                                                className={`p-1 text-center border cursor-pointer ${task?.identityName === "Activity" ? 'text-green-700' : ""}`}
                                                            >
                                                                <div className={`flex items-center justify-center gap-3 ${task.markAsDone ? 'line-through text-slate-400' : ""}`}>
                                                                    {getActivityIcon(task?.activityMaster?.activityType)}
                                                                    <p className='hover:border-b h-5  border-black'
                                                                        onClick={() => {
                                                                            if (task?.identityName === "Activity") {
                                                                                setActivityModal(true);
                                                                                EditActivity(task?.activityMaster?.activityID, task[masterID]);
                                                                            } else {
                                                                                setTaskModal(true);
                                                                                TaskEdit(task?.taskDetails?.taskID, task[masterID], task?.markAsDone);
                                                                            }
                                                                        }}
                                                                    >
                                                                        {task?.identityName === "Activity" ? task?.activityMaster?.activityName : task?.taskDetails?.taskName}
                                                                    </p>
                                                                    {task?.taskDetails?.subTaskDetails.length > 0 && (
                                                                        <div
                                                                            onClick={() => toggleAccordion(task?.identityID)}
                                                                        >
                                                                            {task?.identityName === "Task" &&
                                                                                (activeAccordion !== task?.identityID ? (<FaAngleDown size={12} />) : (<FaAngleUp size={12} />))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className={`p-1 text-center border ${task?.identityName === "Activity" ? 'text-green-700' : ""} ${task.markAsDone ? 'line-through text-slate-400' : ""}`}>
                                                                {task?.assigneeName}
                                                            </td>
                                                            {/* <td className={`p-1 text-center border ${task?.identityName === "Activity" ? 'text-green-700' : ""} ${task.markAsDone ? 'line-through text-slate-400' : ""}`}>
                                                            {task?.taskDetails?.subTaskDetails.map((x, index) => (
                                                                <div key={index} className='flex items-center justify-evenly'>
                                                                    <p className='capitalize'>{x?.subTaskName ? x?.subTaskName : 'Task'}</p>
                                                                    <p>+ {x?.day} day</p>
                                                                </div>
                                                            ))}
                                                        </td> */}
                                                            <td className={`p-1 text-center border ${task?.identityName === "Activity" ? 'text-green-700' : ""} ${task.markAsDone ? 'line-through text-slate-400' : ""}`}>
                                                                {task?.identityName === "Activity" ? task?.activityMaster?.day : task?.taskDetails?.day}
                                                            </td>
                                                            <td className="p-1 text-center border">
                                                                <div
                                                                    data-tip
                                                                    data-for="Delete"
                                                                    className="relative flex-col group cursor-pointer text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                    onClick={() => {
                                                                        DeleteTemplatetask(task[masterID], phaseName);
                                                                    }}
                                                                >
                                                                    <MdDeleteForever />
                                                                    <div className="absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex">
                                                                        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">Delete</span>
                                                                        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        {activeAccordion === task?.identityID && (
                                                            task?.taskDetails?.subTaskDetails.map((subTask, subTaskIndex) => (
                                                                <tr className="text-md text-gray-700 dark:text-gray-400" key={`${taskIndex}-${subTaskIndex}`}>
                                                                    <td className="p-1 text-center ">
                                                                        <label className="custom-label">
                                                                            <div className="bg-white dark:bg-slate-600/40 dark:border-slate-600 rounded w-4 h-4 inline-block leading-4 text-center -mb-[3px]">
                                                                                <input
                                                                                    checked={subTask?.markAsDone}
                                                                                    type="radio"
                                                                                    onClick={() => {
                                                                                        const payload = {
                                                                                            TaskID: subTask?.taskID,
                                                                                            SubTaskID: subTask?.subTaskID,
                                                                                            MarkAsDone: !subTask?.markAsDone,
                                                                                        };
                                                                                      
                                                                                        dispatch(getMarkAsSubTask(payload)).then((res) => {
                                                                                            toast.remove();
                                                                                            setLoadFirst(true);
                                                                                            
                                                                                        });
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </label>
                                                                    </td>
                                                                    <td className="p-1 text-center border-x  cursor-pointer"
                                                                        onClick={() => {
                                                                            setTaskModal(true);
                                                                            TaskEdit(subTask?.taskID, task[masterID], task?.markAsDone);
                                                                        }}
                                                                    >
                                                                        <div className={`flex items-center  justify-center ${task.markAsDone ? 'line-through text-slate-400' : ""}`}>
                                                                            {subTask?.subTaskName}
                                                                        </div>
                                                                    </td>
                                                                    <td className={`p-1 text-center border-x  ${task?.identityName === "Activity" ? 'text-green-700' : ""} ${task.markAsDone ? 'line-through text-slate-400' : ""}`}>
                                                                        {subTask?.assigneeName}
                                                                    </td>
                                                                    {/* <td className={`p-1 text-center border ${task?.identityName === "Activity" ? 'text-green-700' : ""} ${task.markAsDone ? 'line-through text-slate-400' : ""}`}>
                                                                    + {subTask?.dueDate} day
                                                                </td> */}
                                                                    <td className={`p-1 text-center border-x  ${task?.identityName === "Activity" ? 'text-green-700' : ""} ${task.markAsDone ? 'line-through text-slate-400' : ""}`}>
                                                                        {formatDate(subTask?.dueDate)}

                                                                    </td>
                                                                    <td className="p-1 text-center "></td>
                                                                </tr>
                                                            ))
                                                        )}
                                                    </React.Fragment>
                                                );
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
                                </button>
                                <button
                                    data-modal-toggle="modal"
                                    className="relative text-sm group focus:outline-none text-blue font-medium rounded-md text-lg px-3 py-1 mt-3 inline-flex items-center"
                                    onClick={() => toggleActivity(phase)}
                                >
                                    <FaPlus className="mr-1 font-extrabold" size={12} />
                                    Activity
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
            {
                TaskModal && (
                    <AddTasks
                        toggle={toggleTask}
                        setloadFrist={setLoadFirst}
                        TemplateID={ProjectId}
                        AddTemplates={AddTemplates}
                        EditTask={EditTask}
                        MovePhase={MovePhase}
                        PhaseName={PhaseName}
                        identityName='Project'
                    />
                )
            }
            {
                ActivityModal && (
                    <AddActivity
                        togglemodel={toggleActivity}
                        TemplateID={ProjectId}
                        ProjectId={ProjectId}
                        setloadFrist={setLoadFirst}
                        editActivityData={ActivityData}
                        AddTemplates={AddTemplates}
                        MovePhase={MovePhase}
                        PhaseName={PhaseName}
                    />
                )
            }
        </div>
    )
}
