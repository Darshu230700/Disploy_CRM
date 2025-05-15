import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import Select from "react-select";
import { getProductByID, handleAddProduct } from '../../Redux/ProductSlice';
import { getDealByID, handleAddDeal } from '../../Redux/DealSlice';
import toast from 'react-hot-toast';
import { FaUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function Partcipants({ toggleModal, product, id, ParticipantsName }) {
    const dispatch = useDispatch();
    const store = useSelector((state) => state?.root?.Person);
    const [Participants, setParticipants] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState('');
    const [error, setError] = useState(null);
    const temp = product?.personMasterIDs && product?.personMasterIDs?.split(',').map(Number)

    useEffect(() => {
        const selectedValues = Participants?.map((option) => option?.value).join(',');
        setSelectedPerson(selectedValues);
    }, [Participants]);

    useEffect(() => {
        if (product?.personMasterIDs && product?.personMasterName) {
            const ids = product?.personMasterIDs?.split(',').map(id => id?.trim());
            const names = product?.personMasterName?.split(',').map(name => name?.trim());
            const initialParticipants = ids?.map((id, index) => ({ value: id, label: names[index] }));
            setParticipants(initialParticipants);
        }
    }, [product]);

    const handleDeleteParticipant = (index) => {

        const updatedParticipants = Participants?.filter((_, i) => i !== index);
        setParticipants(updatedParticipants);
        const selectedValues = updatedParticipants?.map((option) => option?.value).join(',');
        setSelectedPerson(selectedValues);

        onSubmit(selectedValues, "Delete")

    };

    // const handleParticipants = (selectedOptions) => {
    //     const selectedOptionsMap = new Map(selectedOptions?.map(option => [option?.index, option]));
    //     let newdata

    //     setParticipants(prevParticipants => {
    //         newdata = prevParticipants.filter(participant => !selectedOptionsMap.has(participant.index));
    //         selectedOptions?.length > 0 && selectedOptions.forEach(option => {
    //             newdata.push(option);
    //         });
    //         return newdata;
    //     });

    //     const selectedValues = newdata?.length > 0 && newdata?.map(option => option?.value).join(',');
    //     setSelectedPerson(selectedValues);
    // };


    const onSubmit = async (selectedValues, type) => {
        if (type === 'Add' && selectedPerson?.length <= 0) {
            return setError('Participants is Required');
        }

        try {
            const Params = {
                ...product,
                personMasterID: selectedValues ? selectedValues : selectedPerson
            };
            if (product?.dealID) {
                await dispatch(handleAddDeal(Params)).then((res) => {
                    toast.remove();
                    if (res.payload.status === true) {

                        dispatch(getDealByID(id))
                    }
                });
            } else {
                await dispatch(handleAddProduct(Params)).then((res) => {
                    toast.remove();
                    if (res.payload.status === true) {
                        dispatch(getProductByID(id))
                    }
                });
            }
            setSelectedPerson('')
            if (type === 'Add') {
                toggleModal()
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"

        >
            <div className="relative p-4 w-full max-w-lg max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Participants
                        </h3>
                        <AiOutlineCloseCircle
                            className="text-3xl text-primary cursor-pointer"
                            onClick={() => { toggleModal(); }}
                        />
                    </div>
                    <form>
                        <div className="p-4 md:p-5">
                            {ParticipantsName === 'Add' && (
                                <div className="col-span-2 sm:col-span-1">
                                    <Select
                                        value={Participants}
                                        isMulti
                                        name="Participants"
                                        options={
                                            store?.getAllPerson?.length > 0
                                                ? store.getAllPerson.map(
                                                    (item, index) => ({
                                                        value: item?.personMasterID,
                                                        label: item?.name,
                                                        isDisabled: temp && temp?.some(x => x === item?.personMasterID),
                                                        index: index
                                                    })
                                                )
                                                : [{ value: "", label: "Not Found" }]
                                        }
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={setParticipants}
                                        getOptionLabel={(option) => option.label}
                                        getOptionValue={(option) => option.value}
                                    />
                                    {selectedPerson.length <= 0 && (<p className='text-red-500 mt-1 font-bold'>{error}</p>)}
                                </div>
                            )}
                            <div>
                                {ParticipantsName === 'View' && (
                                    Participants?.length > 0 ?
                                        Participants.map((x, index) => (
                                            <div className="flex gap-3 items-center m-3 justify-between" key={`${x?.value}-${index}`}>
                                                <div className='flex gap-3 items-center'>
                                                    <FaUser size={16} />
                                                    <Link to={`/detailsPeople/${x?.value}`} className='text-sm font-medium h-5 text-blue-600 capitalize cursor-pointer hover:border-b border-b-blue-600'>
                                                        {x?.label}
                                                    </Link>
                                                </div>
                                                <RiDeleteBinLine
                                                    size={17}
                                                    onClick={() => handleDeleteParticipant(index)}
                                                    className='cursor-pointer text-red-500 hover:text-red-700'
                                                />
                                            </div>
                                        )) : <p>Data not found</p>)}
                            </div>
                            <div className="mt-4 flex flex-wrap justify-end shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500 text-sm font-medium py-1 px-3 rounded mr-1 close"
                                    onClick={toggleModal}
                                >
                                    Close
                                </button>
                                {ParticipantsName === 'Add' && (
                                    <button
                                        type="button"
                                        className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-gray-300 border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium py-1 px-3 rounded"
                                        onClick={() => onSubmit(null, 'Add')}
                                    >
                                        Save
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
