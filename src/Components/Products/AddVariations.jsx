/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { AddProductVariations, getVariationsByID } from '../../Redux/ProductSlice';
import ReactSelect from '../Common/ReactSelect';
import { formatNumber } from '../Common/Common';

export default function AddVariations({ togglemodel, VariationsID, setLoadFist }) {

    const { handleSubmit, setValue, register, watch, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    let { id } = useParams();

    const store = useSelector((state) => state.root.common);
    const [selectedCurrency, setselectedCurrency] = useState({ value: 63, label: "Indian Rupee(INR)", });
    const Unitprice = watch("UnitPrice");

    useEffect(() => {
        if (VariationsID) {
            dispatch(getVariationsByID(VariationsID)).then((res) => {
                const fetchedData = res?.payload?.data
                setValue("Name", fetchedData.name)
                setValue("UnitPrice", fetchedData.unitPrice)
                setValue("unit", fetchedData.costPerUnit)
                if (fetchedData && fetchedData?.currencyID) { setselectedCurrency({ label: fetchedData.currencyName, value: fetchedData.currencyID, }); }
            })
        }
    }, []);

    const SumbitVariations = (data) => {
        const Params = {
            "productVariationsID": VariationsID && VariationsID ? VariationsID : 0,
            "productID": id,
            "currencyID": selectedCurrency.value,
            "name": data?.Name,
            "unitPrice": data?.UnitPrice,
            "costPerUnit": data?.unit,
            // "userID": 1
            // addVariationsPrice: [{
            //     "addVariationsPriceID": VariationsID && VariationsID ? VariationsID : 0,
            //     "currencyID": selectedCurrency?.value,
            //     "unitPrice": Unitprice,
            //     "cost": data?.unit,
            //     "comment": data?.Comment,
            //     "directcost": data?.DirectCost,
            //     "productVariationsID": 0,

            // }]
        }
        try {
            dispatch(AddProductVariations({ data: Params })).then((res) => {
                if (res.payload.status === true) {
                    setLoadFist(true)
                    togglemodel()
                    setselectedCurrency('')

                }
            })
        } catch (error) {
            console.log(error)
        }
    }


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
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {VariationsID ? "Update Variations" : " Add Variations"}
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => {
                                    togglemodel();
                                }}
                            />
                        </div>

                        <form onSubmit={handleSubmit(SumbitVariations)}>
                            <div className="p-4 md:p-5">

                                <div className="col-span-2 sm:col-span-1 mb-3">
                                    <label
                                        for="name"
                                        className="block mb-1 font-bold text-gray-600"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register("Name", {
                                            required: "Name  is Required",
                                        })}
                                        name="Name"
                                        id="Name"
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"

                                    />
                                    {errors?.Name && (
                                        <span className="error text-red-600 text-sm font-bold">
                                            {errors?.Name?.message}
                                        </span>
                                    )}
                                </div>
                                <div className='grid gap-4 mb-3 grid-cols-2 mt-1'>
                                    <div className="col-span-2 sm:col-span-1 ">
                                        <label
                                            htmlFor="Currency"
                                            className="block mb-1 font-bold text-gray-600"
                                        >
                                            Currency
                                        </label>
                                        <ReactSelect
                                            Clearable={false}
                                            selectedValue={selectedCurrency}
                                            options={
                                                store && store?.getCurrency?.length > 0
                                                    ? store?.getCurrency.map((item) => ({
                                                        value: item?.value,
                                                        label: item?.text,
                                                    }))
                                                    : [{ value: "", label: "Not Found" }]
                                            }
                                            handleSelectChange={(option) => setselectedCurrency(option)}
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 ">
                                        <label
                                            for="name"
                                            className="block mb-1 font-bold text-gray-600"
                                        >
                                            Unit Price
                                        </label>
                                        <input
                                            type="text"
                                            {...register("UnitPrice", {
                                                required: "UnitPrice  is Required",
                                            })}
                                            onInput={(e) => {
                                                const Unitprice = e.target.value.replace(/[^0-9.]/g, '');
                                                setValue("UnitPrice", Unitprice,);
                                            }}
                                            value={formatNumber(Unitprice)}
                                            name="UnitPrice"
                                            id="UnitPrice"
                                            className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                        {errors.UnitPrice && (
                                            <span className="error text-red-600 text-sm font-bold">
                                                {errors?.UnitPrice?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-2 sm:col-span-1 ">
                                    <label
                                        for="name"
                                        className="block mb-1 font-bold text-gray-600"
                                    >
                                        Cost
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        {...register("unit", {
                                            required: "Unit  is Required",
                                        })}
                                        name="unit"
                                        id="unit"
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                    {errors.unit && (
                                        <span className="error text-red-600 text-sm font-bold">
                                            {errors?.unit?.message}
                                        </span>
                                    )}
                                </div>
                                {/* <div className='grid gap-4 mb-3 grid-cols-2'>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            for="name"
                                            className="block mb-1 font-bold text-gray-600"
                                        >
                                            Direct cost
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            {...register("DirectCost", {
                                                required: "Direct cost  is Required",
                                            })}
                                            name="DirectCost"
                                            id="unit"
                                            className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                        {errors.DirectCost && (
                                            <span className="error text-red-600 text-sm font-bold">
                                                {errors?.DirectCost?.message}
                                            </span>
                                        )}
                                    </div> 
                            </div>
                             <div className="col-span-2 sm:col-span-1">
                                    <label
                                        htmlFor=""
                                        className="block mb-2 font-bold text-gray-600 "
                                    >
                                        Comment
                                    </label>
                                    <textarea
                                        type="text"
                                        {...register("Comment", {
                                            required: "Comment  is Required",
                                        })}
                                        name="Comment"
                                        id="Name"
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                    {errors.Comment && (
                                        <span className="error text-red-600 text-sm font-bold">
                                            {errors?.Comment?.message}
                                        </span>
                                    )}
                                </div> */}
                            <div className="mt-4  flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                    onClick={togglemodel}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-gray-300 border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                >
                                    {VariationsID ? "Update " : " Save"}
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
