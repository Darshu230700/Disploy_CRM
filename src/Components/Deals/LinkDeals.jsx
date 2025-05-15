import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReactSelect from '../Common/ReactSelect';


const LinkDeals = ({ Error, Data, link, toggleSelect, linkData, Deal, Peoplestore, setlinkData, Projectstore, organizationstore, updatePipelineStage }) => {
    console.log('Data :>> ', Data);
    return (
        <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
                   >
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-5 md:p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white ">
                            {` Link An ${link}`}
                        </h3>
                        <AiOutlineCloseCircle
                            className="text-3xl text-primary cursor-pointer"
                            onClick={() => {
                                toggleSelect();
                            }}
                        />
                    </div>
                    <div>
                        <div className="sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 p-5">
                            <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
                                <div className="mb-5">
                                    {
                                        link === "Person" && (
                                            <ReactSelect
                                                selectedValue={linkData}
                                                options={
                                                    Peoplestore && Peoplestore?.getAllPerson?.length > 0
                                                        ? Peoplestore.getAllPerson.map((item) => ({
                                                            value: item?.personMasterID ?? "",
                                                            label: item?.name,
                                                            isDisabled: Data?.person?.personMasterID === item?.personMasterID
                                                        }))
                                                        : [{ value: "", label: "Not Found" }]
                                                }
                                                handleSelectChange={(option) => setlinkData(option)}
                                            />
                                        )
                                    }
                                    {
                                        link === "Project" && (
                                            <ReactSelect
                                                selectedValue={linkData}
                                                options={
                                                    Projectstore && Projectstore?.getProject?.length > 0
                                                        ? Projectstore.getProject.map((item) => ({
                                                            value: item?.projectID,
                                                            label: item?.title,
                                                            isDisabled: Data?.project.some(
                                                                x => x?.projectID === item?.projectID
                                                            ),
                                                        }))
                                                        : [{ value: "", label: "Not Found" }]
                                                }
                                                handleSelectChange={(option) => setlinkData(option)}
                                            />
                                        )
                                    }
                                    {
                                        link === "Organization" && (
                                            <ReactSelect
                                                selectedValue={linkData}
                                                options={
                                                    organizationstore &&
                                                        organizationstore?.organizationData?.data?.length > 0
                                                        ? organizationstore?.organizationData?.data.map(
                                                            (item) => ({
                                                                value: item?.organizationID ?? "",
                                                                label: item?.organizationName,
                                                                isDisabled: Data?.organization?.organizationID === item?.organizationID
                                                            })
                                                        )
                                                        : [{ value: "", label: "Not Found" }]
                                                }
                                                handleSelectChange={(option) => setlinkData(option)}
                                            />
                                        )
                                    }
                                    {linkData && linkData?.label?.length > 0 ? "" : Error && (
                                        <div style={{ color: 'red', marginTop: '0.5rem' }}>{Error}</div>
                                    )}

                                </div>
                                <div className="flex justify-end shrink-0 p-3 rounded-b border-gray-300 bg-[#f5f5f6]">
                                    <button type="button"
                                        className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                        onClick={() => toggleSelect()}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-block focus:outline-none font-semibold text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                        onClick={() => {
                                            updatePipelineStage(Deal?.pipelineStage, linkData)
                                        }}
                                    >
                                        {` Link this ${link}`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default LinkDeals
