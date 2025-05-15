/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FieldType } from './Common';
import ReactSelect from './ReactSelect';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { MdOutlineEditOff, MdOutlineModeEdit } from 'react-icons/md';
import { PiPuzzlePieceDuotone } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { getAllgroup, InsertFiled } from '../../Redux/CustomizeFieldSlice';
import { useSelector } from 'react-redux';
import { FiPlusCircle } from 'react-icons/fi';


export default function AddFields({ setopenFields, identityID, identityName, setLoadFirst, setopenGroupModal, EditcustomField, setEditcustomField }) {
    const { register, handleSubmit, setValue, watch, formState: { errors }, } = useForm();
    const dispatch = useDispatch()
    const store = useSelector((state) => state.root.Filde)

    const allPipeline = watch('AllPipelines', true)
    const [allUsers, setAllUsers] = useState(true);
    const [dealAdmin, setDealAdmin] = useState(true);
    const [dealUser, setDealUser] = useState(true);
    const [FieldtypeError, setFieldtypeError] = useState('');
    const [selectField, setselectField] = useState('');
    const [groupName, setgroupName] = useState('')
    const [activeAccordion, setActiveAccordion] = useState("");
    const [required, setRequired] = useState(false);
    const [allPipelines, setAllPipelines] = useState(false);
    const [important, setImportant] = useState(false);
    const [pipelines, setPipelines] = useState({
        qualified: false,
        contactMade: false,
        demoScheduled: false,
        proposalMade: false,
        negotiationsStarted: false,
        dealWon: false,
        dealLost: false,
    });

    useEffect(() => {
        dispatch(getAllgroup({}))
    }, [dispatch]);

    useEffect(() => {
        if (EditcustomField) {
            setValue('Name', EditcustomField?.fieldName)
            setValue('Description', EditcustomField?.description)
            setValue('AllPipelines', EditcustomField?.currentPipeline)
            if (EditcustomField?.fieldType) setselectField({ label: EditcustomField?.fieldType, value: EditcustomField?.fieldType })
            if (EditcustomField?.groupID) setgroupName({ label: EditcustomField?.groupName, value: EditcustomField?.groupID })
            setValue('dealLeadView', EditcustomField?.isLeadDealAddView);
            setValue('ProjectView', EditcustomField?.isProjectView);
            if (EditcustomField?.isAllUsers === true || EditcustomField?.isAllUsers === false) setAllUsers(EditcustomField?.isAllUsers)
            setDealAdmin(EditcustomField?.isDealsAdmin)
            setDealUser(EditcustomField?.isDealUser)
            setAllPipelines(EditcustomField?.isAllPipelines)
            setRequired(EditcustomField?.isRequired)
            setImportant(EditcustomField?.isImportant)
            const newPipelines = {
                qualified: EditcustomField?.isQualified || false,
                contactMade: EditcustomField?.isContactMade || false,
                demoScheduled: EditcustomField?.isDemoScheduled || false,
                proposalMade: EditcustomField?.isProposalMade || false,
                negotiationsStarted: EditcustomField?.isNegotiationsStarted || false,
                dealWon: EditcustomField?.isMarkingDealAsWon || false,
                dealLost: EditcustomField?.isMarkingDealAsLost || false,
            };
            setPipelines(newPipelines)
        }
    }, [setValue]);

    const toggleAccordion = (accordionId) => { setActiveAccordion(prev => (prev === accordionId ? '' : accordionId)); };

    const handleAllUsersChange = () => {
        const newAllUsers = !allUsers;
        setAllUsers(newAllUsers);
        setDealAdmin(newAllUsers);
        setDealUser(newAllUsers);
    };

    const handleDealAdminChange = () => {
        const newDealAdmin = !dealAdmin;
        setDealAdmin(newDealAdmin);
        setAllUsers(dealUser);
        if (newDealAdmin) { setAllUsers(true); }
    };

    const handleDealUserChange = () => {
        const newDealUser = !dealUser;
        setDealUser(newDealUser);
        setAllUsers(dealAdmin);
        if (newDealUser) { setAllUsers(true); }
    };

    const handleAllPipelinesChange = (name) => {
        const newAllPipelines = !allPipelines;
        name === 'Required' ? setRequired(newAllPipelines) : setImportant(newAllPipelines)

        setAllPipelines(newAllPipelines);
        setPipelines({
            qualified: newAllPipelines,
            contactMade: newAllPipelines,
            demoScheduled: newAllPipelines,
            proposalMade: newAllPipelines,
            negotiationsStarted: newAllPipelines,
            dealWon: newAllPipelines,
            dealLost: newAllPipelines,
        });
    };

    const handleRequiredChange = () => {
        const newRequired = !required;
        setRequired(newRequired);
        setAllPipelines(newRequired);
        setPipelines({
            qualified: newRequired,
            contactMade: newRequired,
            demoScheduled: newRequired,
            proposalMade: newRequired,
            negotiationsStarted: newRequired,
            dealWon: newRequired,
            dealLost: newRequired,
        });
        setImportant(false);
    };

    const handleImportantChange = () => {
        const newImportant = !important;
        setImportant(newImportant);
        setAllPipelines(newImportant);
        setPipelines({
            qualified: newImportant,
            contactMade: newImportant,
            demoScheduled: newImportant,
            proposalMade: newImportant,
            negotiationsStarted: newImportant,
            dealWon: newImportant,
            dealLost: newImportant,
        });
        setRequired(false);
    };

    const handlePipelineChange = (key, name) => {
        const newPipelines = { ...pipelines, [key]: !pipelines[key] };
        setPipelines(newPipelines);
        const allTrue = Object.values(newPipelines).every(value => value === true);
        setAllPipelines(allTrue);

        const anyPipelineSelected = Object.values(newPipelines).some((value) => value);
        name === 'Required' ? setRequired(anyPipelineSelected) : setImportant(anyPipelineSelected)
    };


    const onSubmit = (data) => {
        if (!selectField) return setFieldtypeError('Field type is required')

        const Payload = {
            customizeFieldID: EditcustomField?.customizeFieldID ? EditcustomField?.customizeFieldID : 0,
            identityID: identityID,
            identityName: identityName,
            fieldName: data?.Name,
            groupID: groupName?.value || 0,
            description: data?.Description,
            fieldType: selectField?.label,
            isUserSpecifications: true,
            isAllUsers: allUsers,
            isDealsAdmin: dealAdmin,
            isDealUser: dealUser,
            isLeadDealAddView: data?.dealLeadView,
            isProjectView: data?.ProjectView,
            isAllPipelines: allPipelines,
            isPipeline: allPipelines,
            isRequired: required,
            isQualified: pipelines?.qualified,
            isContactMade: pipelines?.contactMade,
            isDemoScheduled: pipelines?.demoScheduled,
            isProposalMade: pipelines?.proposalMade,
            isNegotiationsStarted: pipelines?.negotiationsStarted,
            isMarkingDealAsWon: pipelines?.dealWon,
            isMarkingDealAsLost: pipelines?.dealLost,
            isImportant: important,
            currentAllPipelines: allPipeline,
            currentPipeline: allPipeline,
            isOrganizationAddView: data?.organizationView,
            isPersonAddView: true
        }

        try {
            dispatch(InsertFiled(Payload)).then((res) => {
                if (res) {
                    setopenFields(false)
                    setLoadFirst(true)
                    setEditcustomField([])
                }
            })
        } catch (error) {
            console.log('error :>> ', error);
        }

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
                                {EditcustomField?.customizeFieldID ? "Edit" : "Add "} {identityName === 'Deal' ? 'lead/deal' : identityName} field
                            </h3>
                            <AiOutlineCloseCircle className="text-3xl text-primary cursor-pointer" onClick={() => { setopenFields(false); setEditcustomField([]) }} />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className=" h-96 vertical-scroll-inner relative p-4">
                                <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                                    <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6">
                                        <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
                                            <div className="mb-5">
                                                <label
                                                    htmlFor="Guests"
                                                    className="block mb-2 font-semibold text-gray-600"
                                                >
                                                    Field name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="Name"
                                                    name="Name"
                                                    className="border border-gray-300 shadow p-3 w-full rounded capitalize"
                                                    {...register("Name", { required: "Field Name is required", })}
                                                />
                                                {errors.Name && <span className="error text-red-500 text-sm">{errors.Name.message}</span>}
                                            </div>

                                            <div className="mb-5 w-full">
                                                <label
                                                    htmlFor="Guests"
                                                    className="block mb-2 font-semibold text-gray-600"
                                                >
                                                    Field group
                                                </label>
                                                <div className="flex flex-row gap-3 ">
                                                    <ReactSelect
                                                        selectedValue={groupName}
                                                        options={
                                                            store && store?.getAllgroup?.length > 0
                                                                ? store?.getAllgroup.map((item) => ({
                                                                    value: item?.groupID ?? "",
                                                                    label: item?.groupName,
                                                                }))
                                                                : [{ value: "", label: "Not Found" }]
                                                        }
                                                        handleSelectChange={(option) => setgroupName(option)}
                                                    />
                                                    <FiPlusCircle
                                                        size={30}
                                                        onClick={() => { setopenGroupModal(true); }}
                                                    />
                                                </div>
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
                                                    className="border border-gray-300 shadow p-3 w-full rounded capitalize"
                                                    {...register("Description")}
                                                />
                                            </div>
                                            <div className="mb-5 w-full">
                                                <label
                                                    htmlFor="Guests"
                                                    className="block mb-2 font-semibold text-gray-600"
                                                >
                                                    Field type
                                                </label>
                                                <ReactSelect
                                                    selectedValue={selectField}
                                                    options={
                                                        FieldType && FieldType?.length > 0
                                                            ? FieldType.map((item) => ({
                                                                value: item?.id,
                                                                label: item?.name,
                                                            }))
                                                            : [{ value: "", label: "Not Found" }]
                                                    }
                                                    handleSelectChange={(option) => setselectField(option)}
                                                />
                                                {selectField && selectField?.label?.length > 0 ? "" : FieldtypeError && (
                                                    <div style={{ color: 'red', marginTop: '0.5rem' }}>{FieldtypeError}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6">
                                        <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3 h-full">
                                            <div className="mb-5">
                                                <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3">
                                                    <label
                                                        htmlFor=""
                                                        className="block mb-2 font-bold text-gray-600 text-sm"
                                                    >
                                                        User specifications
                                                    </label>
                                                    <div className='mb-3'>
                                                        <h2 id="accordion-collapse-heading-1">
                                                            <button
                                                                type="button"
                                                                className={`flex justify-between items-center p-3 w-full font-medium  border border-gray-200 dark:border-slate-700 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                    "accordion-collapse-body-1" ? "active" : ""}`}
                                                                data-accordion-target="#accordion-collapse-body-1"
                                                                aria-expanded={activeAccordion === "accordion-collapse-body-1"}
                                                                aria-controls="accordion-collapse-body-1"
                                                                onClick={() =>
                                                                    toggleAccordion("accordion-collapse-body-1")
                                                                }
                                                            >
                                                                <div className='flex gap-3 items-center'>
                                                                    <div>
                                                                        {allUsers === true && <MdOutlineModeEdit size={25} className='text-gray-500' />}
                                                                        {allUsers === false && <MdOutlineEditOff size={25} className='text-gray-500' />}
                                                                    </div>
                                                                    <div>
                                                                        <p className='text-gray-500'>Editing</p>
                                                                        <p> {`${allUsers === true ? 'All' : 'no'}`} users ({`${allUsers === true ? 1 : 0}`}/1)</p>
                                                                    </div>
                                                                </div>
                                                                {activeAccordion !== "accordion-collapse-body-1" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                                            </button>
                                                        </h2>
                                                        <div
                                                            id="accordion-collapse-body-1"
                                                            className={`border border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-1" ? "block" : "hidden"}`}
                                                            aria-labelledby="accordion-collapse-heading-1"
                                                        >
                                                            <div className="w-full text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                                <div className="flex items-center p-3">
                                                                    <input
                                                                        id="AllUsers"
                                                                        type="checkbox"
                                                                        name='AllUsers'
                                                                        {...register('AllUsers')}
                                                                        className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300"
                                                                        checked={allUsers}
                                                                        onChange={handleAllUsersChange}
                                                                    />
                                                                    <label htmlFor="AllUsers" className="ms-3 text-black text-sm font-semibold">
                                                                        All users (1)
                                                                    </label>
                                                                </div>
                                                                <h6 className='text-sm p-1.5 pl-4 bg-slate-200 mb-2'>DEAL PERMISSION SETS</h6>
                                                                <div className="flex items-center ms-10 mb-2">
                                                                    <input
                                                                        id="DealAdmin"
                                                                        type="checkbox"
                                                                        name='DealAdmin'
                                                                        className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300"
                                                                        {...register('DealAdmin')}
                                                                        checked={dealAdmin}
                                                                        onChange={handleDealAdminChange}
                                                                    />
                                                                    <label htmlFor="DealAdmin" className="ms-3 text-black text-sm font-semibold">
                                                                        {identityName === 'Deal' ? 'Global' : 'Deals'} admin (1)
                                                                    </label>
                                                                </div>
                                                                <div className="flex items-center ms-10 mb-4">
                                                                    <input
                                                                        id="DealUser"
                                                                        type="checkbox"
                                                                        name='DealUser'
                                                                        {...register('DealUser')}
                                                                        className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300"
                                                                        checked={dealUser}
                                                                        onChange={handleDealUserChange}
                                                                    />
                                                                    <label htmlFor="DealUser" className="ms-3 text-black text-sm font-semibold">
                                                                        {identityName === 'Deal' ? 'Global' : 'Deals'} regular user (0)
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <label htmlFor="" className="block mb-2 font-bold text-gray-600 text-sm">Places where shown</label>
                                                    {identityName === 'Organization' && (
                                                        <div className="flex items-center mb-2" >
                                                            <input
                                                                id={`organizationView`}
                                                                type="checkbox"
                                                                disabled={allUsers === false || required === true}
                                                                className={`w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 ${(allUsers === false || required === true) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                                {...register('organizationView')}
                                                            />
                                                            <label for={`organizationView`} className="ms-3  text-sm  ">
                                                                Organization add view
                                                            </label>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center mb-2" >
                                                        <input
                                                            id={`dealLeadView`}
                                                            type="checkbox"
                                                            disabled={allUsers === false || required === true}
                                                            className={`w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 ${(allUsers === false || required === true) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                            {...register('dealLeadView')}
                                                        />
                                                        <label for={`dealLeadView`} className="ms-3  text-sm  ">
                                                            Lead/deal add view
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center " >
                                                        <input
                                                            id={`ProjectView`}
                                                            type="checkbox"
                                                            disabled={allUsers === false || required === true}
                                                            className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 "
                                                            {...register('ProjectView')}
                                                        />
                                                        <label for={`ProjectView`} className="ms-3 text-zinc-950 text-sm font-medium ">
                                                            {identityName === 'Organization' ? 'Person' : 'Project'} detail view
                                                        </label>
                                                    </div>

                                                    <div className='my-3'>
                                                        <h2 id="accordion-collapse-heading-2">
                                                            <button
                                                                type="button"
                                                                className={`flex justify-between items-center p-3 w-full font-medium  border border-gray-200 dark:border-slate-700 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion ===
                                                                    "accordion-collapse-body-2" ? "active" : ""}`}
                                                                data-accordion-target="#accordion-collapse-body-2"
                                                                aria-expanded={activeAccordion === "accordion-collapse-body-2"}
                                                                aria-controls="accordion-collapse-body-2"
                                                                onClick={() =>
                                                                    toggleAccordion("accordion-collapse-body-2")
                                                                }
                                                            >
                                                                <div className='flex gap-3 items-center'>
                                                                    <PiPuzzlePieceDuotone size={25} className='text-gray-500' />
                                                                    <p>No pipelines (0/1)</p>
                                                                </div>
                                                                {activeAccordion !== "accordion-collapse-body-2" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                                            </button>
                                                        </h2>
                                                        <div
                                                            id="accordion-collapse-body-2"
                                                            className={`border border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-2" ? "block" : "hidden"}`}
                                                            aria-labelledby="accordion-collapse-heading-2"
                                                        >
                                                            <div className="w-full text-gray-900 bg-white  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                                <div className="flex items-center  p-3" >
                                                                    <input
                                                                        id={`AllPipelines`}
                                                                        type="checkbox"
                                                                        name='AllPipelines'
                                                                        {...register('AllPipelines')}
                                                                        className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 "
                                                                        checked={allPipeline}
                                                                    />
                                                                    <label for={`AllPipelines`} className="ms-3 text-black text-sm font-semibold ">
                                                                        All pipelines
                                                                    </label>
                                                                </div>
                                                                <div className="flex items-center ms-10 mb-2" >
                                                                    <input
                                                                        id={`AllPipelines`}
                                                                        type="checkbox"
                                                                        name='AllPipelines'
                                                                        checked={allPipeline}
                                                                        className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 "
                                                                    />
                                                                    <label for={`AllPipelines`} className="ms-3 text-black text-sm font-semibold ">
                                                                        Pipelines
                                                                    </label>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <label htmlFor="" className="block mb-2 font-bold text-gray-600 text-sm">Quality rules</label>

                                                    {(allUsers === true && allPipeline === true) ? (
                                                        <>
                                                            <div className='my-3'>
                                                                <h2 id="accordion-collapse-heading-3">
                                                                    <button
                                                                        type="button"
                                                                        className={`flex justify-between items-center p-3 w-full font-medium border border-gray-200 dark:border-slate-700 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion === 'accordion-collapse-body-3' ? 'active' : ''}`}
                                                                        data-accordion-target="#accordion-collapse-body-3"
                                                                        aria-expanded={activeAccordion === 'accordion-collapse-body-3'}
                                                                        aria-controls="accordion-collapse-body-3"

                                                                        onClick={() => { identityName === 'Deal' && toggleAccordion('accordion-collapse-body-3') }}
                                                                    >
                                                                        <div className='flex gap-3 items-center'>
                                                                            <input
                                                                                type="checkbox"
                                                                                className="sr-only peer"
                                                                                id='Required'
                                                                                {...register('Required')}
                                                                                checked={required}

                                                                                onChange={handleRequiredChange}
                                                                            />
                                                                            <label
                                                                                htmlFor="Required"
                                                                                className={`w-10 h-5 rounded-full flex items-center p-1 cursor-pointer peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-green-500 transition-colors duration-300 ease-in-out ${required ? 'bg-green-500' : 'bg-gray-500'}`}
                                                                            >
                                                                                <span className={`w-3.5 h-3.5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out bg-white ${required ? 'translate-x-5' : ''}`}></span>
                                                                            </label>
                                                                            <p>Required</p>
                                                                        </div>
                                                                        {identityName === 'Deal' && (activeAccordion !== 'accordion-collapse-body-3' ? (<FaAngleDown />) : (<FaAngleUp />))}
                                                                    </button>
                                                                </h2>
                                                                <div
                                                                    id="accordion-collapse-body-3"
                                                                    className={`border border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === 'accordion-collapse-body-3' ? 'block' : 'hidden'}`}
                                                                    aria-labelledby="accordion-collapse-heading-3"
                                                                >
                                                                    <div className="w-full text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                                        <div className="flex items-center p-3">
                                                                            <input
                                                                                id={`AllPipelinesR`}
                                                                                type="checkbox"
                                                                                className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300"
                                                                                checked={allPipelines}
                                                                                onChange={() => handleAllPipelinesChange('Required')}
                                                                                disabled={important === true}

                                                                            />
                                                                            <label htmlFor={`AllPipelinesR`} className="ms-3 text-black text-sm font-semibold">
                                                                                All pipelines, all stages
                                                                            </label>
                                                                        </div>
                                                                        <div className="flex items-center ms-10 mb-2">
                                                                            <input
                                                                                id={`PipelinesR`}
                                                                                type="checkbox"
                                                                                className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300"
                                                                                checked={allPipelines}
                                                                                onChange={() => handleAllPipelinesChange('Required')}
                                                                                disabled={important === true}

                                                                            />
                                                                            <label htmlFor={`PipelinesR`} className="ms-3 text-black text-sm font-semibold">
                                                                                Pipelines
                                                                            </label>
                                                                        </div>
                                                                        <div className='ms-20'>
                                                                            {Object.keys(pipelines).map((key) => (
                                                                                <div className="flex items-center mb-2" key={key}>
                                                                                    <input
                                                                                        id={key}
                                                                                        type="checkbox"
                                                                                        className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300"
                                                                                        checked={pipelines[key]}
                                                                                        onChange={() => handlePipelineChange(key, 'Required')}
                                                                                        disabled={important === true}

                                                                                    />
                                                                                    <label htmlFor={key} className="ms-3 text-black text-sm font-semibold">
                                                                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                                                                    </label>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='my-3'>
                                                                <h2 id="accordion-collapse-heading-4">
                                                                    <button
                                                                        type="button"
                                                                        className={`flex justify-between items-center p-3 w-full font-medium  border border-gray-200 dark:border-slate-700 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion === "accordion-collapse-body-4" ? "active" : ""}`}
                                                                        data-accordion-target="#accordion-collapse-body-4"
                                                                        aria-expanded={activeAccordion === "accordion-collapse-body-4"}
                                                                        aria-controls="accordion-collapse-body-4"
                                                                        onClick={() => toggleAccordion("accordion-collapse-body-4")}
                                                                    >
                                                                        <div className='flex gap-3 items-center'>
                                                                            <input
                                                                                type="checkbox"
                                                                                className={`sr-only peer `}
                                                                                id='Important'
                                                                                {...register('Important')}
                                                                                disabled={required === true}
                                                                                checked={important}
                                                                                onChange={handleImportantChange}
                                                                            />
                                                                            <label
                                                                                htmlFor="Important"
                                                                                className={`w-10 h-5  rounded-full flex items-center p-1 cursor-pointer peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-green-500 transition-colors duration-300 ease-in-out  ${important ? ' bg-green-500' : 'bg-gray-500'} `}
                                                                            >
                                                                                <span
                                                                                    className={`w-3.5 h-3.5  rounded-full shadow-md transform transition-transform duration-300 ease-in-out bg-white  ${important ? 'translate-x-5 ' : ''}${required === true ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                                                ></span>
                                                                            </label>
                                                                            <p>Important</p>
                                                                        </div>
                                                                        {activeAccordion !== "accordion-collapse-body-4" ? (<FaAngleDown />) : (<FaAngleUp />)}
                                                                    </button>
                                                                </h2>
                                                                <div
                                                                    id="accordion-collapse-body-4"
                                                                    className={`border border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "accordion-collapse-body-4" ? "block" : "hidden"}`}
                                                                >
                                                                    <div className="w-full text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                                        <div className="flex items-center p-3">
                                                                            <input
                                                                                id={`AllPipelinesI`}
                                                                                type="checkbox"
                                                                                className={`w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 ${required === true ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                                                disabled={required === true}
                                                                                checked={allPipelines}
                                                                                onChange={() => handleAllPipelinesChange('Important')}
                                                                            />
                                                                            <label htmlFor={`AllPipelinesI`} className="ms-3 text-black text-sm font-semibold">All pipelines, all stages</label>
                                                                        </div>
                                                                        <div className="flex items-center ms-10 mb-2">
                                                                            <input
                                                                                id={`PipelinesI`}
                                                                                type="checkbox"
                                                                                className={`w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 cursor-not-allowed ${required === true ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                                                disabled={required === true}
                                                                                checked={allPipelines}
                                                                                onChange={() => handleAllPipelinesChange('Important')}
                                                                            />
                                                                            <label htmlFor={`PipelinesI`} className="ms-3 text-black text-sm font-semibold">Pipelines</label>
                                                                        </div>
                                                                        <div className='ms-20'>
                                                                            {Object.keys(pipelines)?.slice(0, -2)?.map((key) => (
                                                                                <div className={`flex items-center mb-2  `} key={key}>
                                                                                    <input
                                                                                        id={`${key}important`}
                                                                                        type="checkbox"
                                                                                        className={`w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 ${required === true ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                                                        disabled={required === true}
                                                                                        checked={pipelines[key]}
                                                                                        onChange={() => handlePipelineChange(key, 'Important')}
                                                                                    />
                                                                                    <label htmlFor={`${key}important`} className="ms-3 text-black text-sm font-semibold   ">
                                                                                        {key[0].toUpperCase() + key.slice(1)}
                                                                                    </label>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p>{`Can’t mark this field required or important as the field ${allPipeline === false ? 'is hidden from all pipelines.' : 'is read-only for all users.'} `}</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded close"
                                    onClick={() => { setopenFields(false); setEditcustomField([]) }}
                                >
                                    Close
                                </button>
                                <div className="flex items-center px-3">
                                    <button
                                        type="submit"
                                        className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                    >
                                        Save
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
