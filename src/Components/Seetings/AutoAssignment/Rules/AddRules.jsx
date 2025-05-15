import React, { useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineDollar } from 'react-icons/ai';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import AddRulesDetails from './AddRulesDetails';

export default function AddRules({ setOpenRuleModal, setloadFrist }) {
    const [SelecteEntity, setSelecteEntity] = useState('Deal');
    const [SelecteEvent, setSelecteEvent] = useState('');
    const [RuleDetailsModal, setRuleDetailsModal] = useState(false);
    const HandlerEnity = (item) => { setSelecteEntity(item); setSelecteEvent('') }
    const HandlerEvent = (item) => { setSelecteEvent(item) }

    return (
        <div>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50 "
              
            >
                <div className="relative p-4 w-full max-w-xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-5 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white ">
                                Add Rule
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => {
                                    setOpenRuleModal(false)
                                }}
                            />
                        </div>
                        <form >
                            <div className="xl:w-full h-72 overflow-auto relative p-4">
                                <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                                    <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6">
                                        <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
                                            <h4 className="font-semibold text-base">ENTITY</h4>
                                            <div
                                                className={`border ${SelecteEntity === 'Deal'
                                                    ? " bg-[#F0FFFF]"
                                                    : " bg-white"
                                                    } rounded-md p-2 cursor-pointer mb-5 mt-3`}
                                                onClick={() => HandlerEnity('Deal')}
                                            >
                                                <div className="flex items-center gap-4 cursor-pointer">
                                                    <div
                                                        className={`border rounded-md cursor-pointer ${SelecteEntity === 'Deal' ? "border-[#72ADFF]" : "border-[#21232C1A]"
                                                            } cursor-pointer p-3`}
                                                    >
                                                        <AiOutlineDollar
                                                            size={22}
                                                            className={`${SelecteEntity === 'Deal' ? "text-blue" : "text-[#73767C]"} cursor-pointer`}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col cursor-pointer">
                                                        <label className="font-medium text-lg cursor-pointer">Deal</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className={`border ${SelecteEntity === 'Lead'
                                                    ? " bg-[#F0FFFF]"
                                                    : " bg-white"
                                                    } rounded-md p-2 cursor-pointer mb-3`}
                                                onClick={() => HandlerEnity('Lead')}
                                            >
                                                <div className="flex items-center gap-4 cursor-pointer">
                                                    <div
                                                        className={`border rounded-md cursor-pointer ${SelecteEntity === 'Lead' ? "border-[#72ADFF]" : "border-[#21232C1A]"
                                                            } cursor-pointer p-3`}
                                                    >
                                                        <FaLocationCrosshairs
                                                            size={22}
                                                            className={`${SelecteEntity === 'Lead' ? "text-blue" : "text-[#73767C]"
                                                                } cursor-pointer`}
                                                        />

                                                    </div>
                                                    <div className="flex flex-col cursor-pointer">
                                                        <label className="font-medium text-lg cursor-pointer">Lead</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6">
                                        <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3">
                                            <h4 className="font-semibold text-base">EVENT</h4>
                                            {
                                                SelecteEntity === 'Lead' &&
                                                <div
                                                    className={`border ${SelecteEvent === 'Lead added'
                                                        ? " bg-[#F0FFFF]"
                                                        : " bg-white"
                                                        } rounded-md p-2 cursor-pointer mb-3 mt-2`}
                                                    onClick={() => HandlerEvent('Lead added')}
                                                >
                                                    <div className="flex items-center gap-4 cursor-pointer">
                                                        <div className="flex flex-col cursor-pointer">
                                                            <label className="font-semibold text-ms cursor-pointer">Lead added</label>
                                                            <p className="cursor-pointer">
                                                                Assign new leads to specific owners
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                SelecteEntity === 'Deal' &&
                                                <>
                                                    <div
                                                        className={`border ${SelecteEvent === 'Deal added'
                                                            ? " bg-[#F0FFFF]"
                                                            : " bg-white"
                                                            } rounded-md p-2 cursor-pointer mb-3 mt-2`}
                                                        onClick={() => HandlerEvent('Deal added')}
                                                    >
                                                        <div className="flex items-center gap-4 cursor-pointer">
                                                            <div className="flex flex-col cursor-pointer">
                                                                <label className="font-semibold text-ms cursor-pointer">Deal added</label>
                                                                <p className="cursor-pointer">
                                                                    Assign new Deals to specific owners
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`border ${SelecteEvent === 'Deal updated'
                                                            ? " bg-[#F0FFFF]"
                                                            : " bg-white"
                                                            } rounded-md p-2 cursor-pointer mb-3`}
                                                        onClick={() => HandlerEvent('Deal updated')}
                                                    >
                                                        <div className="flex items-center gap-4 cursor-pointer">
                                                            <div className="flex flex-col cursor-pointer">
                                                                <label className="font-semibold text-ms cursor-pointer">Deal updated</label>
                                                                <p className="cursor-pointer">
                                                                    Assign existing deal to an owner after it has changed pipeline or stage
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-end shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className={`inline-block focus:outline-none text-white border border-gray-200 dark:text-primary-500 dark:hover:text-white dark:border-gray-700  text-sm font-medium py-1 px-3 rounded ${SelecteEvent.length > 0 ? 'cursor-pointer  bg-primary-500' : 'cursor-not-allowed bg-primary-400'}`}
                                    onClick={() => { SelecteEvent.length > 0 ? setRuleDetailsModal(true) : setRuleDetailsModal(false) }}
                                >
                                    Next
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div >

            {RuleDetailsModal && <AddRulesDetails setOpenRuleModal={setOpenRuleModal} setRuleDetailsModal={setRuleDetailsModal} SelecteEvent={SelecteEvent} SelecteEntity={SelecteEntity} setloadFrist={setloadFrist} />
            }
        </div >
    )
}
