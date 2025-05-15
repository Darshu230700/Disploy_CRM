import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReactSelect from '../Common/ReactSelect';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { handleRelatedOrg, removeRealatedOrg } from '../../Redux/organizationSlice';
import { MdDeleteForever } from 'react-icons/md';
import toast from 'react-hot-toast';
import Loading from '../Common/Loading';


export default function RelatedOrganization({ setOpenModelTableOrganizetion, setLoadFirst, store, OrganizationEdit, id }) {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const [selectOrg, setselectOrg] = useState('');
    const [error, seterror] = useState('');

    // const columnsOrganization = [
    //     { Header: "Organization", accessor: "relatedOrganizationName" },
    //     { Header: "Relation", accessor: "relation" },
    //     { Header: "Owner", accessor: "ownerName" },
    //     {
    //         Header: "Action",
    //         accessor: "",
    //         Cell: ({ row }) => (
    //             <div className="flex justify-center">
    //                 <button
    //                     data-tip
    //                     data-for="Edit"
    //                     className="mr-3 block cursor-pointer text-white bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //                     onClick={() => handleDeleteAction(row?.original?.relatedOrganizationID)}
    //                 >
    //                     <MdDeleteForever />
    //                 </button>
    //             </div>
    //         )
    //     },
    // ];

    const data = OrganizationEdit?.relatedOrganization

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleDeleteAction = async (id) => {
        try {
            dispatch(removeRealatedOrg(id)).then((res) => {
                toast.success('Related Organizations Deleted ! ')
                setLoadFirst(true)
            })
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const onSumbit = (data) => {
        if (selectOrg === '' || selectOrg === null) {
            return seterror('This field required.')
        }

        const Payload = {
            relatedOrganizationID: 0,
            organizationID: id,
            relatedOrganizationName: selectOrg?.label,
            relation: data?.relation,
            reorgID: selectOrg?.value
        }

        try {
            dispatch(handleRelatedOrg(Payload)).then((res) => {
                toast.remove()
                if (res) {
                    setselectOrg('')
                    setLoadFirst(true)
                    toast.success('Related Organizations linked !')
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
                <div className="relative w-full max-w-2xl max-h-full ">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                                Related organizations ({OrganizationEdit?.organizationName})
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => { setOpenModelTableOrganizetion(false); }}
                            />
                        </div>
                        <form onSubmit={handleSubmit(onSumbit)}>
                            <div className="p-3 flex justify-start gap-3 align-center ">
                                <div className='w-60 '>
                                    <ReactSelect
                                        selectedValue={selectOrg}
                                        options={
                                            store && store?.organizationData?.data?.length > 0
                                                ? store?.organizationData?.data?.map((item) => ({
                                                    value: item?.organizationID,
                                                    label: item?.organizationName === id ? '' : item?.organizationName,
                                                }))
                                                : [{ value: "", label: "Not Found" }]
                                        }
                                        handleSelectChange={(option) => setselectOrg(option)}
                                    />
                                    {selectOrg && selectOrg.label.length > 0 ? '' : error && (
                                        <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>
                                    )}
                                </div>
                                <select className="sc-iMWBiJ bTicHx w-60" {...register('relation')}>
                                    <option value='RELATED'>RELATED</option>
                                    <option value='PARENT'>PARENT</option>
                                    <option value='DAUGHTER'>DAUGHTER</option>
                                </select>
                                <button
                                    type="submit"
                                    className="h-8 inline-block focus:outline-none font-semibold text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm my-1 px-3 rounded"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                        <div className="xl:w-full h-96 vertical-scroll-inner relative p-4">
                        
                            <div >
                                <div className="relative scroll-inner shadow-md sm:rounded-lg">
                                    {loading ? (
                                        <div className="flex justify-center items-center h-60">
                                            <Loading />
                                        </div>
                                    ) : (
                                        <table className="w-full border border-slate-200 table">
                                            <thead className="text-center text-md font-medium border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                                <tr className="text-center">
                                                    <th scope="col" className="mw-200 p-4">Name</th>
                                                    <th scope="col" className="  ">Relation</th>
                                                    <th scope="col" className="">Owner</th>
                                                    <th scope="col" className="">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.length > 0 ? (
                                                    data?.map((item, index) => (
                                                        <tr
                                                            key={index}
                                                            className="bg-white dark:bg-gray-800 capitalize cursor-pointer text-center"
                                                        >
                                                            <td
                                                                className="mw-200 p-2 capitalize text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 border border-slate-200"
                                                            >
                                                                {item.relatedOrganizationName}
                                                            </td>

                                                            <td className="mw-200 p-2 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                                                {item?.relation}
                                                            </td>
                                                            <td className="mw-200 p-2 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">

                                                            </td>

                                                            <td className="mw-200 p-2 text-sm text-gray-500 text-center whitespace-nowrap dark:text-gray-400 border border-slate-200">
                                                                <button
                                                                    data-tip
                                                                    data-for="Edit"
                                                                    className="mr-3 block cursor-pointer text-white bg-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                    onClick={() => handleDeleteAction(item?.relatedOrganizationID)}
                                                                >
                                                                    <MdDeleteForever />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="8" className="text-center py-4">
                                                            Data not found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    )}
                                </div>

                            </div>
                        </div>
                        <div className="flex justify-end shrink-0 p-3 rounded-b border-gray-300 bg-[#f5f5f6]">
                            <button type="button"
                                className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                onClick={() => setOpenModelTableOrganizetion(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}



