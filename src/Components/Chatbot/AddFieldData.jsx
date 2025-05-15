/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoCloseOutline } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';
import ReactQuill from 'react-quill';
import { ConversationField, conversationFieldUpdate, generateUniqueId } from '../Common/Common';

export default function AddFieldData({ toggleModel, selectData, setChatBot, chatBots, filedIndex, selecteQueFiled }) {
    const { register, handleSubmit, watch, setValue, formState: { errors }, setError, clearErrors } = useForm({});
    const [descriptionText, setDescriptionText] = useState('');
    const [blockType2, setBlockType2] = useState(selectData?.captureField ? selectData?.captureField : "Person");

    const handleQuillChange = (value) => {
        if (value?.length > 500) {
            setError('descriptionText', { type: 'manual', message: 'Description cannot exceed 500 characters' });
        } else {
            clearErrors('descriptionText');
        }
        setDescriptionText(value);
    };


    const conversationField = [{
        conversationFieldID: 0,
        chatbotID: 0,
        fieldType: "Lead Status",
        leadStatus: "Disqualified lead",
        closingMessage: descriptionText ? descriptionText : "Thank you for conacting ",
        meetingMaster: [],
        emailMaster: [],
        questionMaster: []
    }]
    const [Allquestion, setAllquestion] = useState([
        {
            question: "",
            conversationQuestionID: 0,
            conversationFieldID: 0,
            conversationFieldMasters: conversationField
        }
    ]);

    const HelpText = watch("helptext");
    const AddCard = watch("AddCard");

    useEffect(() => {
        if (selectData) {
            setDescriptionText(selectData?.message ? selectData?.message : selectData?.closingMessage ? selectData?.closingMessage : selectData?.onlineMessage);
            if (selectData?.captureField) setBlockType2(selectData?.captureField)
            setValue("blockType3", selectData?.captureSubField)
            setValue("proactive", selectData?.proactiveMessage)
            setValue("helptext", selectData?.proactiveMessage)
            if (selectData.questionMaster) {
                setAllquestion(selectData?.questionMaster?.map((x) => ({ question: x?.question, conversationFieldMasters: x?.conversationFieldMasters, conversationQuestionID: x?.conversationQuestionID, conversationFieldID: x?.conversationFieldID })));
            }
        }

    }, [selectData, setValue]);

    const handleQuestionChange = (event, index) => {
        const { value } = event.target;
        const updatedQuestion = [...Allquestion];
        updatedQuestion[index].question = value;
        setAllquestion(updatedQuestion);
    };

    const AddNewConversationField = (chatBots, selecteQueFiled, filedIndex, newField) => {
        const handleParentConversationFieldID = (fieldMasters) => {
            let updatedFieldMasters = [...fieldMasters];
            updatedFieldMasters.splice(filedIndex, 0, newField);
            return updatedFieldMasters;
        };

        const recursivelyConversationField = (fieldMasters) => {
            return fieldMasters.map(field => {
                if (Array.isArray(field.questionMaster)) {
                    const updatedQue = field.questionMaster.map(x => {
                        if (x?.conversationQuestionID === selecteQueFiled?.conversationQuestionID) {
                            const updatedFieldMasters = [...(x.conversationFieldMasters || [])];
                            updatedFieldMasters.splice(filedIndex, 0, newField);
                            return {
                                ...x,
                                conversationFieldMasters: updatedFieldMasters
                            };
                        }
                        if (Array.isArray(x.conversationFieldMasters)) {
                            return {
                                ...x,
                                conversationFieldMasters: recursivelyConversationField(x.conversationFieldMasters)
                            };
                        }
                        return x;
                    });
                    return {
                        ...field,
                        questionMaster: updatedQue
                    };
                }
                return field;
            });
        };

        const updatedConversationFieldMaster = selecteQueFiled === undefined
            ? handleParentConversationFieldID(chatBots?.conversationFieldMaster)
            : recursivelyConversationField(chatBots?.conversationFieldMaster);

        setChatBot(prevState => {
            return {
                ...prevState,
                conversationFieldMaster: updatedConversationFieldMaster
            };
        });

    };

    const onSubmit = (data) => {
        if (!descriptionText) {
            toast.error('Description is required');
            return;
        }
        if (data?.AddCard === "Question") {
            if (Allquestion.length < 2) {
                toast.error('Must be 2 questiones add');
                return;
            }
        }

        if (selectData) {
            const conversationFiled = ConversationField(selectData, descriptionText, data, Allquestion, blockType2)
            const updatedChatBots = {
                ...chatBots,
                conversationFieldMaster: conversationFieldUpdate(chatBots.conversationFieldMaster, selectData.conversationFieldID, conversationFiled)
            };
            setChatBot(updatedChatBots)
        } else {
            const newField = {
                conversationFieldID: generateUniqueId(),
                chatbotID: 0,
                fieldType: data?.AddCard === "Capture" ? (`${blockType2}/${data?.blockType3 ? data?.blockType3 : 'Name'}`) : data?.AddCard,
                message: descriptionText,
                captureField: data?.AddCard === "Capture" ? blockType2 : '',
                captureSubField: data?.blockType3 ? data?.blockType3 : 'Name',
                questionMaster: data?.AddCard === "Question" ? Allquestion : [],
                sortBy: 0,
                subSortBy: 0,
                conversationQuestionID: 0,
                isQuestion: true,
                userID: 1,
            };

            AddNewConversationField(chatBots, selecteQueFiled, filedIndex, newField)
        }
        toggleModel();
    };

    return (
        <div>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-[700px] max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {selectData ? "Edit" : "Add new"} Card
                            </h3>
                            <IoCloseOutline
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => toggleModel()}
                            />
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='p-5'>
                                <div className='mb-2'>
                                    {!selectData && (
                                        <div className='mb-2 flex flex-col'>
                                            <div className='mb-1'>Card Type</div>
                                            <div className='flex flex-row gap-4 items-center'>
                                                <select name="AddCard" className='sc-iMWBiJ bTicHx' {...register('AddCard')}>
                                                    <option value="Message">Message</option>
                                                    <option value="Question">Question</option>
                                                    <option value="Capture">Capture</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                    <div className='mb-1'>{`${selectData?.fieldType ? selectData?.fieldType : 'Message'} text`}</div>
                                    <div>
                                        <ReactQuill
                                            theme="snow"
                                            value={descriptionText}
                                            onChange={handleQuillChange}
                                        />
                                        {errors?.descriptionText && <p className="error font-bolder text-base text-red-500">{errors?.descriptionText?.message}</p>}
                                    </div>
                                </div>
                                {selectData?.fieldType === "Greeting" && (
                                    <div className='mb-2 flex flex-row items-center gap-3'>
                                        <div>
                                            <input
                                                id='MESSAGE'
                                                type='checkbox'
                                                {...register('helptext')}
                                                checked={HelpText ? true : false}
                                            />
                                        </div>
                                        <label for='MESSAGE' className='mb-1'>Proactive Message</label>
                                    </div>
                                )}
                                {HelpText && (
                                    <div className='mb-2'>
                                        <select name="proactive" className='sc-iMWBiJ bTicHx' {...register('proactive')}>
                                            <option value="after 5 seconds">after 5 seconds</option>
                                            <option value="after 10 seconds">after 10 seconds</option>
                                            <option value="after 15 seconds">after 15 seconds</option>
                                            <option value="after 30 seconds">after 30 seconds</option>
                                            <option value="after 60 seconds">after 60 seconds</option>
                                        </select>
                                    </div>
                                )}

                                {(AddCard === "Question" || selectData?.fieldType === "Question") && (
                                    <>
                                        <div className='mb-1'>Reponse options</div>
                                        {Allquestion && Allquestion.map((item, index) => (
                                            <div key={index} className="flex items-center relative m-2">
                                                <input
                                                    type="text"
                                                    placeholder="Enter Value"
                                                    className="border border-gray-300 shadow p-2 w-full rounded mr-3"
                                                    value={item.question}
                                                    onChange={(e) => handleQuestionChange(e, index)}
                                                />
                                                {Allquestion.length > 2 && (
                                                    <RiDeleteBinLine className='absolute top-2 right-5' size={17}
                                                        onClick={() => {
                                                            const updatedQuestions = Allquestion.filter((_, i) => i !== index);
                                                            setAllquestion(updatedQuestions);
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                        <a
                                            className="cursor-pointer"
                                            onClick={() => setAllquestion([...Allquestion, {
                                                question: "",
                                                conversationQuestionID: 0,
                                                conversationFieldID: 0,
                                                conversationFieldMasters: conversationField
                                            }])}
                                        >
                                            + Add Question
                                        </a>
                                    </>
                                )}

                                {(AddCard === "Capture" || selectData?.captureField === "Person" || selectData?.captureField === "Deal" || selectData?.captureField === "Organization") && (
                                    <div className='mb-2 flex flex-col'>
                                        <div className='mb-1'>Capture field</div>
                                        <div className='flex flex-row gap-4 items-center'>
                                            <select name="blockType2" className='sc-iMWBiJ bTicHx' onChange={(e) => setBlockType2(e.target.value)} value={blockType2}>
                                                <option value="Person">Person</option>
                                                <option value="Organization">Organization</option>
                                                <option value="Deal">Deal</option>
                                            </select>
                                            <select name="blockType3" className='sc-iMWBiJ bTicHx' {...register('blockType3')}>
                                                {blockType2 === "Person" && (
                                                    <>
                                                        <option value="Name">Name</option>
                                                        <option value="Phone">Phone</option>
                                                        <option value="Email">Email</option>
                                                    </>
                                                )}
                                                {blockType2 === "Organization" && (
                                                    <>
                                                        <option value="Name">Name</option>
                                                        <option value="Address">Address</option>
                                                    </>
                                                )}
                                                {blockType2 === "Deal" && (
                                                    <>
                                                        <option value="Value">Value</option>
                                                        <option value="Note">Note</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500 text-sm font-medium py-1 px-3 rounded mr-1"
                                    onClick={() => toggleModel()}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="font-semibold focus:outline-none text-black bg-primary-500 text-white border border-gray-200 bg-gray-300 text-sm py-1 px-3 rounded "
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
