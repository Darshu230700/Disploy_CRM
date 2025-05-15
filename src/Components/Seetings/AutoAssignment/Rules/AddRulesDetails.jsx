/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineDollar } from 'react-icons/ai'
import ReactSelect from '../../../Common/ReactSelect'
import { RiDeleteBinLine } from 'react-icons/ri'
import { OperatorType, Pipelinestage } from '../../../Common/Common'
import { useForm } from 'react-hook-form'
import { FaLocationCrosshairs, FaPlus } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { getAllRulesFilds, InsertRules } from '../../../../Redux/SettingSlice'
import { useSelector } from 'react-redux'
import { getAllVisibleTo, getCurrency } from '../../../../Redux/CommonSlice'
import Select from 'react-select';

export default function AddRulesDetails({ setOpenRuleModal, SelecteEvent, setRuleDetailsModal, SelecteEntity, setloadFrist, EditData }) {
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
    const store = useSelector((store) => store.root.Settings)
    const storeCommon = useSelector((state) => state.root.common);
    const [PipeLineStage, setPipeLineStage] = useState('');
    const [IsActive, setIsActive] = useState(false);
    const [AssignFilds, setAssignFilds] = useState([{
        assignmentConditionID: 0,
        ruleID: 0,
        conditionID: 0,
        assignmentConditionType: true,
        userID: 0,
        conditionMasters: [
            {
                conditionID: 0,
                assignmentConditionID: 0,
                fieldID: 0,
                fieldName: "",
                operatorName: "",
                optionID: 0,
                optionName: "",
                conditionType: true,
                userID: 0
            }
        ]
    }]);
    const [Errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getAllRulesFilds())
        dispatch(getCurrency({}));
        dispatch(getAllVisibleTo({}));
    }, [dispatch]);

    useEffect(() => {
        if (EditData) {
            setValue('RuleName', EditData?.ruleName)
            setValue('Description', EditData?.ruleDescription)
            setValue('AssigneType', EditData?.assigneeType)
            setValue('AssigneName', EditData?.assigneeName)
            setIsActive(EditData?.isActive ? EditData?.isActive : IsActive)
            setPipeLineStage({ label: EditData?.pipelineStage, value: EditData?.pipelineStage, });
            setAssignFilds(EditData?.assignmentConditionMasters)
        }


    }, [EditData,]);

    const validateFields = () => {
        const newErrors = {};
        AssignFilds.forEach((fild, assignIndex) => {
            fild.conditionMasters.forEach((item, conditionIndex) => {
                if (!item.fieldID) {
                    newErrors[`fieldID_${assignIndex}_${conditionIndex}`] = "Field  is required.";
                }
                if (!item.operatorName) {
                    newErrors[`operatorName_${assignIndex}_${conditionIndex}`] = "Operator is required.";
                }
                // if (!item.optionName) {
                //     newErrors[`optionName_${assignIndex}_${conditionIndex}`] = "Option is required.";
                // }
            });
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFieldChange = (selectedOption, assignIndex, conditionIndex) => {
        const updatedAssignFilds = AssignFilds.map((fild, idx) => {
            if (idx === assignIndex) {
                const updatedConditionMasters = fild?.conditionMasters.map((item, index) => (
                    index === conditionIndex ? { ...item, fieldID: selectedOption?.value, fieldName: selectedOption?.label } : item
                ));
                return { ...fild, conditionMasters: updatedConditionMasters };
            }
            return fild;
        });
        setAssignFilds(updatedAssignFilds);
    };

    const handleOperatorChange = (selectedOption, assignIndex, conditionIndex) => {
        const updatedAssignFilds = AssignFilds.map((fild, idx) => {
            if (idx === assignIndex) {
                const updatedConditionMasters = fild?.conditionMasters.map((item, index) => (
                    index === conditionIndex ? { ...item, operatorName: selectedOption?.label } : item
                ));
                return { ...fild, conditionMasters: updatedConditionMasters };
            }
            return fild;
        });
        setAssignFilds(updatedAssignFilds);
    };

    const handleOptionChange = (selectedOption, assignIndex, conditionIndex) => {
        const updatedAssignFilds = AssignFilds?.map((fild, idx) => {
            if (idx === assignIndex) {
                const updatedConditionMasters = fild?.conditionMasters.map((item, index) => (
                    index === conditionIndex ? { ...item, optionName: selectedOption ? selectedOption?.label : "" } : item
                ));
                return { ...fild, conditionMasters: updatedConditionMasters };
            }
            return fild;
        });
        setAssignFilds(updatedAssignFilds);
    };

    const addCondition = (index) => {
        const updatedAssignFilds = AssignFilds.map((fild, i) => (
            i === index ? {
                ...fild, conditionMasters: [...fild.conditionMasters, {
                    conditionID: 0,
                    assignmentConditionID: 0,
                    fieldID: 0,
                    fieldName: "",
                    operatorName: "",
                    optionID: 0,
                    optionName: "",
                    conditionType: true,
                    userID: 0
                }]
            } : fild
        ));
        setAssignFilds(updatedAssignFilds);
    };

    const deleteCondition = (assignIndex, conditionIndex) => {

        const updatedAssignFilds = AssignFilds?.map((fild, i) => (
            i === assignIndex ? {
                ...fild, conditionMasters: fild?.conditionMasters.filter((_, idx) => idx !== conditionIndex)
            } : fild
        ));
        const filteredAssignFilds = updatedAssignFilds?.filter(fild => fild?.conditionMasters?.length > 0);
        setAssignFilds(filteredAssignFilds);
    };

    const handlerAddRules = async (data) => {
        if (!validateFields()) return;

        const Payload = {
            ruleID: EditData?.ruleID ? EditData?.ruleID : 0,
            entity: EditData?.entity ? EditData?.entity : SelecteEntity,
            event: SelecteEvent && SelecteEvent,
            assigneeType: data?.AssigneType,
            assigneeID: 0,
            assigneeName: data?.AssigneName,
            ruleName: data?.RuleName,
            ruleDescription: data?.Description,
            isActive: IsActive,
            pipeline: data?.Pipline,
            pipelineStage: PipeLineStage?.label,
            createdDate: "2024-05-31T09:55:59.863Z",
            createdBy: 0,
            updatedDate: "2024-05-31T09:55:59.863Z",
            updatedBy: 0,
            userID: 0,
            assignmentConditionMasters: AssignFilds
        }
        await dispatch(InsertRules(Payload)).then((res) => {
            setloadFrist(true)
            setOpenRuleModal(false)
        }).catch((errors) => {
            console.log('errors :>> ', errors);
        })

    }

    return (
        <div>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"

            >
                <div className="relative p-4 w-full max-w-xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-5 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white ">
                                {EditData?.ruleID ? "Edit" : "Add"} Rule
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => {
                                    setOpenRuleModal(false)
                                }}
                            />
                        </div>
                        <form onSubmit={handleSubmit(handlerAddRules)}>
                            <div className="xl:w-full  h-96  vertical-scroll-inner relative p-4">
                                <div className="grid md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8 gap-4">
                                    <div className="sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8">
                                        <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
                                            <label for="Labels" className="block mb-3 font-bold text-gray-600 flex items-center gap-2">
                                                {(SelecteEvent === 'Deal added' || SelecteEvent === 'Deal updated') && <AiOutlineDollar size={20} />}
                                                {SelecteEvent === 'Lead added' && <FaLocationCrosshairs size={20} />}
                                                {`${SelecteEvent} rule`}
                                            </label>
                                            {(SelecteEvent === "Deal updated" || EditData?.event === 'Deal updated') && <>
                                                <label
                                                    for="Labels"
                                                    className="block mb-2 font-semibold text-black-600 text-xs"
                                                >
                                                    WHEN A DEAL HAS MOVED TO
                                                </label>
                                                <div className='flex gap-5'>
                                                    <div className="mb-5 w-full">
                                                        <label
                                                            for="Labels"
                                                            className="block mb-2 font-semibold text-black-600 text-xs"
                                                        >
                                                            Pipline
                                                        </label>
                                                        <select className='sc-iMWBiJ bTicHx'   {...register("Pipline",)}>
                                                            <option value='Pipline'>Pipline</option>
                                                        </select>

                                                    </div>
                                                    <div className="mb-5 w-full">
                                                        <label
                                                            for="Labels"
                                                            className="block mb-2 font-semibold text-black-600 text-xs"
                                                        >
                                                            Pipline stage
                                                        </label>
                                                        <ReactSelect
                                                            selectedValue={PipeLineStage}
                                                            options={
                                                                Pipelinestage.length > 0
                                                                    ? Pipelinestage.map((item, index) => ({
                                                                        value: index,
                                                                        label: item,
                                                                    }))
                                                                    : [{ value: "", label: "Not Found" }]
                                                            }
                                                            handleSelectChange={(option) => setPipeLineStage(option)}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                            }
                                            <label for="Labels" className="block mb-2 font-semibold text-black-600 text-xs">
                                                ASSIGNMENT CONDITIONS
                                            </label>
                                            <div>
                                                {AssignFilds && AssignFilds.map((filds, index) => (
                                                    <div key={index} className='bg-slate-100 p-4 m-3 '>
                                                        {filds?.conditionMasters && filds?.conditionMasters.map((item, conditionIndex) => (
                                                            <div key={conditionIndex} className='flex items-center gap-7'>
                                                                <div className='w-11/12'>
                                                                    <div className="mb-5 relative">
                                                                        <label htmlFor="Labels" className="block mb-2 font-semibold text-black-600 text-xs">
                                                                            Field
                                                                        </label>
                                                                        <ReactSelect
                                                                            selectedValue={{ value: item?.fieldID, label: item?.fieldName }}
                                                                            options={
                                                                                store?.getRuleFilds.length > 0
                                                                                    ? store?.getRuleFilds.map((item, index) => ({
                                                                                        value: item?.ruleFieldMasterID,
                                                                                        label: item?.ruleFieldName,
                                                                                    }))
                                                                                    : [{ value: "", label: "Not Found" }]
                                                                            }
                                                                            handleSelectChange={(selectedOption) => handleFieldChange(selectedOption, index, conditionIndex)}
                                                                        />
                                                                        {(item?.fieldName?.length <= 0 || item?.fieldName === undefined) && (
                                                                            Errors[`fieldID_${index}_${conditionIndex}`] && <div className="text-red-500">{Errors[`fieldID_${index}_${conditionIndex}`]}</div>
                                                                        )}

                                                                    </div>
                                                                    <div className='flex gap-3'>
                                                                        <div className="mb-5 w-full">
                                                                            <label htmlFor="Labels" className="block mb-2 font-semibold text-black-600 text-xs">
                                                                                Operator
                                                                            </label>
                                                                            <ReactSelect
                                                                                selectedValue={{ value: item.operatorName, label: item.operatorName }}
                                                                                options={
                                                                                    OperatorType.length > 0
                                                                                        ? OperatorType.map((item, index) => ({
                                                                                            value: item?.id,
                                                                                            label: item?.type,
                                                                                        }))
                                                                                        : [{ value: "", label: "Not Found" }]
                                                                                }
                                                                                handleSelectChange={(selectedOption) => handleOperatorChange(selectedOption, index, conditionIndex)}
                                                                            />
                                                                            {(item?.operatorName?.length <= 0 || item?.operatorName === undefined) && (
                                                                                Errors[`operatorName_${index}_${conditionIndex}`] && <div className="text-red-500">{Errors[`operatorName_${index}_${conditionIndex}`]}</div>
                                                                            )}
                                                                        </div>
                                                                        <div className="mb-5 w-full">
                                                                            <label htmlFor="Labels" className="block mb-2 font-semibold text-black-600 text-xs">
                                                                                Option
                                                                            </label>
                                                                            {item.fieldName === 'Deal currency' || item.fieldName === 'Lead currency' ? (
                                                                                <Select
                                                                                    defaultValue={item.optionName ? { value: item.optionName, label: item.optionName } : null}
                                                                                    classNamePrefix={`select `}
                                                                                    menuPortalTarget={document.body}
                                                                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                                                    className={`basic-single  ${item?.operatorName === 'is empty' || item?.operatorName === 'is not empty' ? 'cursor-not-allowed' : ''}`}
                                                                                    isSearchable={true}
                                                                                    isClearable={true}
                                                                                    options={
                                                                                        storeCommon?.getCurrency.length > 0
                                                                                            ? storeCommon?.getCurrency.map((currency) => ({
                                                                                                value: currency?.value,
                                                                                                label: currency?.text,
                                                                                            }))
                                                                                            : [{ value: "", label: "Not Found" }]
                                                                                    }
                                                                                    isDisabled={item?.operatorName === 'is empty' || item?.operatorName === 'is not empty' ? true : false}
                                                                                    onChange={(selectedOption) => handleOptionChange(selectedOption, index, conditionIndex)}
                                                                                />
                                                                            ) : item.fieldName === 'Deal visible to' || item.fieldName === 'Lead visible to' || item.fieldName === 'Person visible to' || item.fieldName === 'Organization visible to' ? (
                                                                                <Select
                                                                                    className={`${item?.operatorName === 'is empty' || item?.operatorName === 'is not empty' ? 'cursor-not-allowed ' : ''}`}
                                                                                    defaultValue={item.optionName ? { value: item.optionName, label: item.optionName } : null}
                                                                                    isDisabled={item?.operatorName === 'is empty' || item?.operatorName === 'is not empty'}
                                                                                    menuPortalTarget={document.body}
                                                                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                                                    isSearchable={true}
                                                                                    isClearable={true}
                                                                                    options={
                                                                                        storeCommon?.getAllVisibleTo.length > 0
                                                                                            ? storeCommon?.getAllVisibleTo.map((item) => ({
                                                                                                value: item?.value,
                                                                                                label: item?.text,
                                                                                            }))
                                                                                            : [{ value: "", label: "Not Found" }]
                                                                                    }
                                                                                    onChange={(selectedOption) => handleOptionChange(selectedOption, index, conditionIndex)}
                                                                                />
                                                                            ) : (
                                                                                <input
                                                                                    type="text"
                                                                                    disabled={item?.operatorName === 'is empty' || item?.operatorName === 'is not empty'}
                                                                                    value={item.optionName || ""}
                                                                                    onChange={(e) => handleOptionChange({ value: 0, label: e.target.value }, index, conditionIndex)}
                                                                                    className={`w-full p-2 border border-gray-300 rounded ${item?.operatorName === 'is empty' || item?.operatorName === 'is not empty' ? 'cursor-not-allowed ' : ''}`}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <RiDeleteBinLine
                                                                    className={`${AssignFilds && AssignFilds?.[0]?.conditionMasters?.length > 1 ? "block" : AssignFilds?.[1]?.conditionMasters ? 'block' : 'hidden'}`}
                                                                    size={17}
                                                                    onClick={() => deleteCondition(index, conditionIndex)}
                                                                />
                                                            </div>
                                                        ))}
                                                        <button
                                                            type='button'
                                                            data-modal-toggle="modal"
                                                            className=" group focus:outline-none text-black border border-2   font-medium rounded-md text-sm px-2 py-1    inline-flex items-center"
                                                            onClick={() => addCondition(index)}
                                                        >
                                                            <FaPlus className="mr-1 font-extrabold" size={12} />
                                                            condition
                                                        </button>
                                                    </div>
                                                ))}
                                                {AssignFilds && AssignFilds?.map((x) => x?.conditionMasters.length > 1 && (
                                                    <button
                                                        type='button'
                                                        data-modal-toggle="modal"
                                                        className={`group focus:outline-none text-black border border-2 font-medium rounded-md text-sm px-2 py-1  inline-flex items-center ${AssignFilds.length > 1 ? "hidden" : 'block'}`}
                                                        onClick={() => setAssignFilds([...AssignFilds, {
                                                            assignmentConditionID: 0,
                                                            ruleID: 0,
                                                            conditionID: 0,
                                                            assignmentConditionType: true,
                                                            userID: 0,
                                                            conditionMasters: [
                                                                {
                                                                    conditionID: 0,
                                                                    assignmentConditionID: 0,
                                                                    fieldID: 0,
                                                                    fieldName: "",
                                                                    operatorName: "",
                                                                    optionID: 0,
                                                                    optionName: "",
                                                                    conditionType: true,
                                                                    userID: 0
                                                                }
                                                            ]
                                                        }])}
                                                    >
                                                        <FaPlus className="mr-1 font-extrabold" size={12} />
                                                        condition set
                                                    </button>
                                                ))}

                                            </div>

                                            <>
                                                <label
                                                    for="Labels"
                                                    className="block mb-2 font-semibold text-black-600 text-xs mt-5"
                                                >
                                                    ASSIGNEE
                                                </label>
                                                <div className='flex gap-5'>
                                                    <div className="mb-5 w-full">
                                                        <label
                                                            for="Labels"
                                                            className="block mb-2 font-semibold text-gray-600 text-xs"
                                                        >
                                                            Type
                                                        </label>
                                                        <select className='sc-iMWBiJ bTicHx'
                                                            {...register("AssigneType",)}
                                                        >
                                                            <option value='User'>User</option>
                                                            <option value='Team'>Team</option>
                                                            <option value='Organization owner'>Organization owner</option>
                                                            <option value='Person owner'>Person owner</option>
                                                        </select>

                                                    </div>
                                                    <div className="mb-5 w-full">
                                                        <label
                                                            for="Labels"
                                                            className="block mb-2 font-semibold text-gray-600 text-xs"
                                                        >
                                                            Assignee
                                                        </label>
                                                        <select className='sc-iMWBiJ bTicHx'
                                                            {...register("AssigneName",)}
                                                        >
                                                            <option value='Owner'>Owner</option>

                                                        </select>
                                                    </div>
                                                </div>
                                                <label
                                                    for="Labels"
                                                    className="block mb-2 font-semibold text-black-600 text-xs mt-5"
                                                >
                                                    RULE SETTINGS
                                                </label>
                                                <div className="mb-5">
                                                    <label for="name" className="block mb-1 font-bold text-gray-600">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="RuleName"
                                                        name="RuleName"
                                                        className="border border-gray-300 shadow p-3 w-full rounded"
                                                        {...register("RuleName", { required: "Name is required", })}
                                                    />
                                                    {errors.RuleName && (<p className="text-red-500">{errors.RuleName.message}</p>)}
                                                </div>
                                                <div className="mb-5">
                                                    <label for="name" className="block mb-1 font-bold text-gray-600">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        type="text"
                                                        id="Description"
                                                        name="Description"
                                                        className="border border-gray-300 shadow p-3 w-full rounded"
                                                        {...register("Description", { required: "Description is required", })}
                                                    />
                                                    {errors.Description && (<p className="text-red-500">{errors.Description.message}</p>)}
                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100 gap-5">
                                <button
                                    type="button"

                                    className={`inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded`}
                                    onClick={() => setRuleDetailsModal(false)}
                                >
                                    Previous
                                </button>
                                <div className="flex items-center px-3">
                                    <div className="flex items-center gap-3 mr-3">
                                        <input
                                            type="checkbox"
                                            id='active'
                                            name="markAsDone"
                                            className="border border-gray-300 font-semibold"
                                            checked={IsActive}
                                            onChange={(e) => {
                                                setIsActive(e.target.checked);
                                            }}
                                        />
                                        <label for='active'>Set active</label>
                                    </div>
                                    <button
                                        type="sumbit"

                                        className={`inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded`}

                                    >
                                        {EditData?.ruleID ? "Save" : "Next"}
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div >
        </div >
    )
}
