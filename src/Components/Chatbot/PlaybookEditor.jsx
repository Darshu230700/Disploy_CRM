/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import AddFieldData from './AddFieldData';
import sweetAlert from '../Common/sweetAlert';
import CommonFiled from './CommonFiled';

export default function PlaybookEditor({ chatBots, setChatBot, setloadFrist }) {

    const [openmodal, setopenmodal] = useState(false);
    const [openCreateModal, setopenCreateModal] = useState(false)
    const [selectData, setselectData] = useState();
    const [filedIndex, setfiledIndex] = useState();
    const [selecteQueFiled, setselecteQueFiled] = useState();

    const toggleModel = () => {
        setopenmodal(false)
        setopenCreateModal(false)
        setselectData()
        setfiledIndex()
        setselecteQueFiled()
    }

    const deleteNestedConversationField = (chatBots, questionID, nestedFieldID) => {
        const DeleteField = (fieldMasters, nestedFieldID) => {
            return fieldMasters
                .map(field => {
                    if (field.questionMaster) {
                        const updatedQuestionMaster = field.questionMaster.map(nestedQuestion => {

                            const updatedNestedFieldMasters = DeleteField(nestedQuestion.conversationFieldMasters, nestedFieldID);
                            return {
                                ...nestedQuestion,
                                conversationFieldMasters: updatedNestedFieldMasters
                            }
                        }).filter(nestedQuestion => nestedQuestion.conversationFieldMasters.length > 0);
                        return {
                            ...field,
                            questionMaster: updatedQuestionMaster
                        };
                    }
                    return field;
                })
                .filter(field => field.conversationFieldID !== nestedFieldID);
        };

        const repeatedlyUpdateQuestions = (questionMasters, questionID, nestedFieldID) => {
            return questionMasters.map(question => {
                if (question.conversationQuestionID === questionID) {
                    const updatedFieldMasters = DeleteField(question.conversationFieldMasters, nestedFieldID);
                    return {
                        ...question,
                        conversationFieldMasters: updatedFieldMasters
                    };
                }
                if (question.conversationFieldMasters) {
                    const updatedFieldMasters = DeleteField(question.conversationFieldMasters, nestedFieldID);
                    return {
                        ...question,
                        conversationFieldMasters: updatedFieldMasters
                    };
                }
                return question;
            });
        };

        const updatedConversationFieldMaster = chatBots.conversationFieldMaster.map(item => {
            if (item.questionMaster) {
                const updatedQuestionMaster = repeatedlyUpdateQuestions(item.questionMaster, questionID, nestedFieldID);
                return {
                    ...item,
                    questionMaster: updatedQuestionMaster
                };
            }
            if (item.conversationFieldMasters) {
                const updatedFieldMasters = DeleteField(item.conversationFieldMasters, nestedFieldID);
                return {
                    ...item,
                    conversationFieldMasters: updatedFieldMasters
                };
            }
            return item;
        });

        return updatedConversationFieldMaster;
    };

    const deleteConversationField = async (queID, FiledId) => {
        try {
            const result = await sweetAlert.confirm('Are you sure you want to delete this card?');
            if (result.isConfirmed) {
                const updatedConversationFields = deleteNestedConversationField(chatBots, queID, FiledId);
                setChatBot(prevState => ({
                    ...prevState,
                    conversationFieldMaster: updatedConversationFields
                }));

                const isMainConversationFieldDeleted = updatedConversationFields.every(item => item.conversationFieldID !== FiledId);
                if (!isMainConversationFieldDeleted) {
                    const updatedMainConversationFields = updatedConversationFields.filter(item => item.conversationFieldID !== FiledId);
                    setChatBot(prevState => ({
                        ...prevState,
                        conversationFieldMaster: updatedMainConversationFields
                    }));
                }
                sweetAlert.success("Deleted successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            sweetAlert.error("An error occurred");
        }
    };

    return (
        <div className=' w-full  flex '>
            <div className='flex justify-center  '>
                <div className='mx-12 flex flex-col  items-center '>
                    {chatBots?.conversationFieldMaster?.map((item, index) => {
                        return (
                            <>
                                <CommonFiled item={item} index={index} setopenCreateModal={setopenCreateModal} setfiledIndex={setfiledIndex} setopenmodal={setopenmodal} setselectData={setselectData} deleteConversationField={deleteConversationField} setChatBot={setChatBot} chatBots={chatBots} setselecteQueFiled={setselecteQueFiled} que={selecteQueFiled} setloadFrist={setloadFrist} />
                                {item?.questionMaster?.length > 0 ? (
                                    <div className='flex justify-between relative '>
                                        {item?.questionMaster.map((que, index) => (
                                            <div key={index} className='w-1/3 p-4  '>
                                                <button
                                                    type="submit"
                                                    className="inline-block z-[101]  focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium py-1 px-3 ml-40 rounded"
                                                >
                                                    {que?.question}
                                                </button>
                                                {que?.conversationFieldMasters.length > 0 ? que?.conversationFieldMasters?.map((item1, index) => (
                                                    <div key={index}>
                                                        <CommonFiled item={item1} index={index} setopenCreateModal={setopenCreateModal} setfiledIndex={setfiledIndex} setopenmodal={setopenmodal} setselectData={setselectData} deleteConversationField={deleteConversationField} setselecteQueFiled={setselecteQueFiled} que={que} setChatBot={setChatBot} chatBots={chatBots} setloadFrist={setloadFrist} />
                                                        {item1?.questionMaster.length > 0 ? (
                                                            <div className='flex flex-nowrap justify-center relative'>
                                                                {item1?.questionMaster.map((que1, index) => (
                                                                    <div key={index} className='w-1/3 p-4   justify-center'>
                                                                        <button
                                                                            type="button"
                                                                            className="inline-block z-[101] ml-36 focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium py-1 px-3  rounded"
                                                                        >
                                                                            {que1?.question}
                                                                        </button>
                                                                        {que1?.conversationFieldMasters.length > 0 ? que1?.conversationFieldMasters?.map((item, index) => (
                                                                            <CommonFiled item={item} index={index} setopenCreateModal={setopenCreateModal} setfiledIndex={setfiledIndex} setopenmodal={setopenmodal} setselectData={setselectData} deleteConversationField={deleteConversationField} setselecteQueFiled={setselecteQueFiled} que={que1} setChatBot={setChatBot} chatBots={chatBots} setloadFrist={setloadFrist} />
                                                                        )) : ""}
                                                                    </div >
                                                                ))}
                                                            </div>
                                                        ) : ""}
                                                    </div>
                                                )) : ""}
                                            </div >
                                        ))}
                                    </div>
                                ) : ""}
                            </>
                        )
                    })}
                </div >
            </div>
            {openmodal && (<AddFieldData toggleModel={toggleModel} selectData={selectData} setChatBot={setChatBot} chatBots={chatBots} />)}
            {openCreateModal && (<AddFieldData toggleModel={toggleModel} selectData={selectData} setChatBot={setChatBot} chatBots={chatBots} filedIndex={filedIndex} selecteQueFiled={selecteQueFiled} />)}
        </div>
    )
}
