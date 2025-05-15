/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getProject } from '../../Redux/ProjectSlice';
import ReactSelect from '../Common/ReactSelect';
import { Phase } from '../Common/Common';
import 'react-calendar/dist/Calendar.css';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { getAllLoginUser, handleAddTaks } from '../../Redux/TaskSlice';
import { FaPlus } from 'react-icons/fa6';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function AddTasks({ toggle, setloadFrist, EditTask, TemplateID, AddTemplates, MovePhase, PhaseName, identityName }) {
    const { register, handleSubmit, setValue, } = useForm();
    const storeProject = useSelector((state) => state.root.Project)
    const { User } = useSelector((state) => state.root.Tasks)

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.root.auth);
    const authToken = `Bearer ${token}`;

    const [Day, setDay] = useState(0);
    const [selectedProject, setselectedProject] = useState(null);
    const [selectedPhase, setselectedPhase] = useState({ value: 0, label: `${PhaseName ? PhaseName : 'Phase unassigned'}`, });
    const [selecteddate, setselecteddate] = useState(moment().format("YYYY-MM-DD"));
    const [loadFist, setLoadFist] = useState(true);
    const [subTask, setsubTask] = useState([]);
    const [Error, setError] = useState('');
    const [markAsDone, setmarkAsDone] = useState(false);
    const [userAccess, setuserAccess] = useState(null);

    useEffect(() => {
        if (loadFist) {
            dispatch(getProject({}));
            dispatch(getAllLoginUser({}));
            // fetchUserData()
            setLoadFist(false);
        }
    }, [storeProject, loadFist]);

    useEffect(() => {
        if (EditTask) {
            const updatedSubTask = EditTask?.subTaskDetails && EditTask?.subTaskDetails.map((x) => ({ task: x.subTaskName, date: moment(x?.dueDate).format("YYYY-MM-DD"), day: x?.day }))
            if (EditTask?.subTaskDetails && EditTask?.subTaskDetails) {
                setsubTask(updatedSubTask)
            }
            setValue("Description", EditTask?.description)
            if (EditTask && EditTask?.projectID) { setselectedProject({ label: EditTask?.projectName, value: EditTask?.projectID }); }
            if (EditTask && EditTask?.assigneeID) { setuserAccess({ label: EditTask?.assigneeName, value: EditTask?.assigneeID }); }
            if (EditTask && EditTask?.phase) { setselectedPhase({ label: EditTask?.phase, value: EditTask?.phase }); }
            if (EditTask && EditTask?.dueDate) { setselecteddate(moment(EditTask?.dueDate).format("YYYY-MM-DD")); }
            if (EditTask && EditTask?.day) { setDay(EditTask?.day) }
            setmarkAsDone(EditTask?.markAsDone ? EditTask?.markAsDone : markAsDone)
        }
    }, [EditTask,]);

    const handletask = (e, index) => {
        const { value } = e.target;
        const updatedSubTask = [...subTask];
        updatedSubTask[index].task = value;
        setsubTask(updatedSubTask);
    };

    const handleTaskDate = (e, index) => {
        const { value } = e.target;
        const updatedSubTask = [...subTask];
        updatedSubTask[index].date = value;
        setsubTask(updatedSubTask);
    };

    const handleTaskDay = (e, index) => {
        const { value } = e.target;
        const updatedSubTask = [...subTask];
        updatedSubTask[index].day = value;
        setsubTask(updatedSubTask);
    };


    const onSubmit = async (data) => {
        try {
            if (!TemplateID && !selectedProject) {
                return setError('Project is required');
            }
            const Payload = {
                taskID: EditTask?.taskID ? EditTask.taskID : 0,
                taskName: 'Task',
                phase: selectedPhase?.label,
                assigneeID: userAccess?.value,
                dueDate: selecteddate,
                projectID: selectedProject?.value,
                description: data.Description,
                markAsDone: markAsDone,
                // markAsDone: EditTask?.markAsDone !== undefined ? EditTask.markAsDone : true,
                userID: 1,
                day: Day,
                identityName: "Task",
                type: TemplateID ? "ProjectTemplate" : "Task",
                subTaskDetails: subTask.map((item) => ({
                    subTaskID: 0,
                    taskID: 0,
                    day: item?.day,
                    subTaskName: item.task,
                    dueDate: item.date,
                    markAsDone: markAsDone ? markAsDone : false,
                })),
            };

            const res = await dispatch(handleAddTaks(Payload));
            const taskData = res?.payload?.data

            if (TemplateID && !EditTask?.phaseId) {
                AddTemplates(taskData)
            } else if (EditTask?.phaseId) {
                MovePhase(taskData, EditTask?.TaskStatus)
            }

            if (res.payload.status === true) {
                setloadFrist(true);
                setError('');
                toggle();
                setsubTask([{ task: '', date: moment().format('YYYY-MM-DD'), day: "" }]);
            }
        } catch (error) {
            console.log('error :>> ', error);
        }
    };

    return (
        <>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"

            >
                <div className="relative p-4 w-full max-w-2xl max-h-full ">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {EditTask && EditTask?.taskID ? 'Update' : 'Add'} Task
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={toggle}
                            />
                        </div>
                        <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="xl:w-full h-96 vertical-scroll-inner relative p-4">
                                    <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6">
                                            <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
                                                <div className="mb-5">
                                                    <label className="block mb-2 font-bold text-gray-600">Assignee (optional)</label>
                                                    <ReactSelect
                                                        id="Project"
                                                        name="Project"
                                                        selectedValue={userAccess}
                                                        options={
                                                            User &&
                                                                User?.length > 0
                                                                ? User.map((item) => ({
                                                                    label: item?.userName,
                                                                    value: item?.userID,
                                                                }))
                                                                : [{ value: "", label: "Not Found" }]
                                                        }
                                                        handleSelectChange={(option) => {
                                                            setuserAccess(option)
                                                        }}
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label for="expectedCloseDate" className="block mb-2 font-bold text-gray-600">Due date </label>
                                                    {
                                                        TemplateID ? (
                                                            <div className='flex items-center'>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    className="border border-gray-300 shadow p-3 rounded mr-3"
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
                                                        ) : (
                                                            <input
                                                                type='date'
                                                                datepicker
                                                                value={selecteddate}
                                                                className="border border-gray-300 shadow p-3 w-full rounded-lg"
                                                                onChange={(e) => {
                                                                    setselecteddate(e.target.value);
                                                                }}
                                                            />
                                                        )
                                                    }
                                                </div>
                                                {!TemplateID && (
                                                    <div className="mb-5">
                                                        <label className="block mb-2 font-bold text-gray-600">Project</label>
                                                        <ReactSelect
                                                            id="Project"
                                                            name="Project"
                                                            selectedValue={selectedProject}
                                                            options={
                                                                storeProject &&
                                                                    storeProject?.getProject?.length > 0
                                                                    ? storeProject.getProject.map((item) => ({
                                                                        label: item?.title,
                                                                        value: item?.projectID,
                                                                    }))
                                                                    : [{ value: "", label: "Not Found" }]
                                                            }
                                                            handleSelectChange={(option) => {
                                                                setselectedProject(option)
                                                            }}
                                                        />
                                                        {selectedProject && selectedProject?.label?.length > 0 ? "" : Error && (
                                                            <div style={{ color: 'red', marginTop: '0.5rem' }}>{Error}</div>
                                                        )}
                                                    </div>
                                                )}

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

                                                <div className="mb-5">
                                                    <label className="block mb-2 font-bold text-gray-600">Group</label>
                                                    <ReactSelect />
                                                </div>

                                                <div className="mb-5">
                                                    <label for="name" className="block mb-2 font-bold text-gray-600">Description</label>
                                                    <textarea type="text"
                                                        id="name"
                                                        name="name"
                                                        {...register("Description",)}
                                                        className={`border border-gray-300 shadow p-3 w-full rounded-lg `}
                                                    />

                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6">
                                            <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3">
                                                <h4 className="font-semibold text-base">Subtasks</h4>
                                                <div className="mb-5">
                                                    <label for="name" className="block mb-2 font-bold text-gray-600">Task</label>
                                                    <div className='flex flex-col gap-3'>
                                                        {subTask && subTask?.map((item, index) => (
                                                            <div key={index} className="flex items-center">
                                                                <input
                                                                    type="text"
                                                                    id={`task_${index}`}
                                                                    name={`task${index}`}
                                                                    placeholder="Enter Task"
                                                                    className="border border-gray-300 shadow p-3 w-full rounded mr-3"
                                                                    value={item?.task}
                                                                    onChange={(e) => handletask(e, index)}
                                                                />
                                                                {
                                                                    !identityName ? (
                                                                        <div className='flex items-center'>
                                                                            <input
                                                                                type="number"
                                                                                min="0"
                                                                                placeholder='set due date'
                                                                                className="border border-gray-300 shadow p-3 rounded mr-3"
                                                                                value={item?.day}
                                                                                onChange={(e) => {
                                                                                    let inputValue = e.target.value.replace(/\D/g, '');
                                                                                    if (inputValue.length > 4) {
                                                                                        inputValue = inputValue.slice(0, 4);
                                                                                    }
                                                                                    handleTaskDay({ ...e, target: { ...e.target, value: inputValue } }, index);
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    ) : (identityName === 'Project') && (
                                                                        <input
                                                                            type="date"
                                                                            className="border border-gray-300 shadow p-3 w-full rounded mr-3"
                                                                            value={item.date}
                                                                            onChange={(e) => handleTaskDate(e, index)}
                                                                        />
                                                                    )
                                                                }
                                                                <RiDeleteBinLine
                                                                    className='ms-2'
                                                                    size={45}
                                                                    onClick={() => {
                                                                        const updatedQuestions = subTask.filter((_, i) => i !== index);
                                                                        setsubTask(updatedQuestions);
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="flex items-center mt-2  inline-block focus:outline-none text-white bg-primary-500 border border-gray-200 dark:bg-transparent dark:text-primary-500  text-sm font-medium py-1 px-3  rounded"
                                                        onClick={() => { setsubTask([...subTask, { task: "", date: moment().format("YYYY-MM-DD") },]); }}
                                                    >
                                                        <FaPlus /><span className='text-white text-sm font-semibold  px-2.5 py-0.5 rounde'> Subtask</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between  gap-3  p-3 rounded-b border-t border-gray-300">
                                    <button type="button" onClick={toggle} className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close">Cancel</button>

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
                                        <button type="submit" className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded">  {EditTask?.taskID ? 'Update' : "Save"} </button>
                                    </div>

                                </div>
                            </form>
                        </>
                    </div>
                </div >
            </div >
        </>
    )
}
