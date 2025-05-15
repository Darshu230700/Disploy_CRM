/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { getFieldTypeMaster } from '../../../Redux/WebFormSlice';
import { generateUniqueId, stripHtmlTags } from '../../Common/Common';

const AddField = ({ openEditModel, toggleModel, selectData, setWebForms, webForms, selectIndex }) => {
    const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors } = useForm({
        defaultValues: {
            required: selectData?.isRequired,
            blockType2: selectData?.field_name,
            blockType3: selectData?.input_type,
            helpText: selectData?.isAddhelptext
        }
    });
    const dispatch = useDispatch()
    const [fieldlabel, setfieldlabel] = useState(selectData?.label ? selectData?.label : '')
    const [blockType, setBlockType] = useState(selectData?.fieldType ? selectData?.fieldType : "Input")
    const [helptext, setHelpText] = useState(selectData?.helptext === null ? "" : selectData?.helptext)
    const [allFieldType, setAllFieldType] = useState([])
    const [InputType, setInputType] = useState({
        Person: [],
        Organization: [],
        Lead: []
    })

    const blockType2 = watch("blockType2");
    const blockType3 = watch("blockType3");
    const HelpText = watch("helpText")

    useEffect(() => {
        dispatch(getFieldTypeMaster({})).then((res) => {
            setAllFieldType(res?.payload?.data)
        }).catch((error) => {
            console.log('error', error)
        })
    }, [])

    useEffect(() => {
        let arr = [];
        let arr1 = [];
        let arr2 = [];

        webForms?.webFromFieldMaster?.map((item) => {
            if (item?.field_name === "Person" && item?.input_type !== "Label") {
                arr?.push(item?.input_type)
            } else if (item?.field_name === "Organization") {
                arr1?.push(item?.input_type)
            } else if (item?.field_name === "Lead") {
                arr2?.push(item?.input_type)
            }
        })
        setInputType({
            Person: arr,
            Organization: arr1,
            Lead: arr2
        })
    }, [webForms,])

    const onSubmit = (data) => {

        const plainText = stripHtmlTags(fieldlabel).trim();

        if (blockType === "Message" && plainText?.length <= 0) {
            return setError('descriptionText', { type: 'manual', message: 'Message is Required' });
        }
        if (selectData) {

            setWebForms({
                ...webForms,
                webFromFieldMaster: webForms?.webFromFieldMaster?.map((item) => {
                    if (item?.webFromFieldMasterID === selectData?.webFromFieldMasterID) {
                        return {
                            ...item,
                            label: fieldlabel ? fieldlabel : blockType3,
                            isRequired: data?.required,
                            isAddhelptext: data?.helpText,
                            helptext: helptext,
                            fieldType: blockType,
                            field_name: data?.blockType2,
                            input_type: data?.blockType3
                        };
                    }
                    return { ...item };
                })
            });
        } else {
            let fieldTypeID = 0
            allFieldType?.map((item) => {
                if (item?.fieldType === blockType) {
                    fieldTypeID = item?.fieldTypeMasterID
                }
            })
            let newObj = {
                "webFromFieldMasterID": generateUniqueId(),
                "webFromID": 5,
                "label": fieldlabel ? fieldlabel : blockType3,
                "fieldTypeID": fieldTypeID,
                "flagdeleted": false,
                "sortNo": 0,
                "isAddhelptext": data?.helpText,
                "helptext": helptext,
                "isRequired": data?.required,
                "fieldTypeMasterID": 7,
                "fieldType": blockType,
                "input_type": blockType3,
                "field_name": blockType === 'Message' ? 'Message' : blockType2
            }

            let arr = [...webForms?.webFromFieldMaster];
            if (arr.length >= selectIndex) {
                arr.splice(selectIndex, 0, newObj)
                const allArr = []
                arr?.map((item, index) => {
                    let obj = {
                        ...item,
                        sortNo: index + 1
                    }
                    allArr?.push(obj)
                })
                setWebForms({
                    ...webForms,
                    webFromFieldMaster: allArr
                })
            }
        }
        toggleModel()
    };

    const handleFieldLableChange = (newContent) => {

        if (newContent?.length > 500) {
            setError('descriptionText', { type: 'manual', message: 'Message cannot exceed 500 characters' });
        } else {
            clearErrors('descriptionText');
        }

        setfieldlabel(newContent)
    }

    return (
        <>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-[700px] max-h-full ">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {openEditModel ? "Edit field" : "Add new Block"}
                            </h3>
                            <IoCloseOutline className="text-3xl text-primary cursor-pointer" onClick={() => toggleModel()} />
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='p-5'>
                                {!openEditModel && (
                                    <div className='mb-2'>
                                        <div className='mb-1'>Block type</div>
                                        <div>
                                            <select name="blockType" id="blockType" className='sc-iMWBiJ bTicHx' value={blockType} onChange={(e) => setBlockType(e.target.value)}>
                                                <option value="Input">Input field</option>
                                                <option value="Message">Message</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                                {blockType === "Input" && (
                                    <>
                                        <div className='mb-2 flex flex-col'>
                                            <div className='mb-1'>Input field</div>
                                            <div className='flex flex-row gap-4 items-center'>
                                                <div className='w-full'>
                                                    <select name="blockType2" className='sc-iMWBiJ bTicHx ' id="blockType2" {...register('blockType2')}>
                                                        <option value="Person">Person</option>
                                                        <option value="Organization">Organization</option>
                                                        <option value="Lead">Lead</option>
                                                        <option value="Attachment" disabled>Attachment</option>
                                                    </select>
                                                </div>
                                                <div className='w-full'>
                                                    <select name="blockType3" className='sc-iMWBiJ bTicHx' id="blockType3" {...register('blockType3')}>
                                                        {blockType2 === "Person" && (
                                                            <>
                                                                <option className='hidden'>Select field name</option>
                                                                <option value="Name" disabled={InputType[blockType2].includes("Name")}>Name</option>
                                                                <option value="Phone" disabled={InputType[blockType2].includes("Phone")}>Phone</option>
                                                                <option value="Email" disabled={InputType[blockType2].includes("Email")}>Email</option>
                                                            </>
                                                        )}

                                                        {blockType2 === "Organization" && (
                                                            <>
                                                                <option className='hidden'>Select field name</option>
                                                                <option value="Name" disabled={InputType[blockType2].includes("Name")}>Name</option>
                                                                <option value="Address" disabled={InputType[blockType2].includes("Address")}>Address</option>
                                                            </>
                                                        )}

                                                        {blockType2 === "Lead" && (
                                                            <>
                                                                <option className='hidden'>Select field name</option>
                                                                <option value="Value" disabled={InputType[blockType2].includes("Value")}>Value</option>
                                                                <option value="Expected close date" disabled={InputType[blockType2].includes("Expected close date")}>Expected close date</option>
                                                                <option value="Title" disabled={InputType[blockType2].includes("Title")}>Title</option>
                                                                <option value="Note">Note</option>
                                                            </>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mb-2'>
                                            <div className='mb-1'>Field label</div>
                                            <div>
                                                <ReactQuill
                                                    placeholder='An introductory message about your form'
                                                    theme="snow"
                                                    value={fieldlabel}
                                                    onChange={handleFieldLableChange}
                                                />
                                                {errors?.descriptionText && <p className="error font-bolder text-base text-red-500">{errors?.descriptionText?.message}</p>}

                                            </div>
                                        </div>

                                        <div className='mb-2 flex flex-row items-center gap-3'>
                                            <div>
                                                <input
                                                    id='helptext'
                                                    type='checkbox'
                                                    {...register('helpText')}
                                                />
                                            </div>
                                            <label for='helptext' className='mb-1'>Add help text</label>
                                        </div>
                                        {HelpText && (
                                            <div className='mb-2'>
                                                <div className='mb-1'>Field help text</div>
                                                <div>
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={helptext}
                                                        onChange={(newcontent) => setHelpText(newcontent)}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className='mb-2 flex flex-row items-center gap-3'>
                                            <div>
                                                <input
                                                    id='require'
                                                    type='checkbox'
                                                    {...register('required')}
                                                />
                                            </div>
                                            <label for='require' className='mb-1'>Required </label>
                                        </div>
                                    </>
                                )}
                                {blockType === "Message" && (
                                    <div className='mb-2'>
                                        <div className='mb-1'>Message text</div>
                                        <div>
                                            <ReactQuill
                                                placeholder='Insert text and links here'
                                                theme="snow"
                                                value={fieldlabel}
                                                onChange={handleFieldLableChange}
                                            />
                                            {errors?.descriptionText && <p className="error font-bolder text-base text-red-500">{errors?.descriptionText?.message}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                    onClick={() => toggleModel()}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={blockType === 'Input' && blockType3?.length <= 0}
                                    className={`font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white border border-gray-200 bg-gray-300 text-sm py-1 px-3 rounded ${blockType === 'Input' && blockType3?.length <= 0 ? 'cursor-not-allowed   bg-primary-400' : 'cursor-pointer bg-primary-500'}`}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddField
