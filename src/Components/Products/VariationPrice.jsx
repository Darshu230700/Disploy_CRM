import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { AddVariationsPrice, getVariationsPriceByID } from '../../Redux/ProductSlice';

import ReactSelect from '../Common/ReactSelect';
import { formatNumber } from '../Common/Common';

export default function VariationPrice({ togglePriceVari, VariationPriceID, UpdateVariationsPrice, VariationsID, setLoadFist }) {
    const { handleSubmit, setValue, register, watch, formState: { errors } } = useForm()
    const dispatch = useDispatch()

    const store = useSelector((state) => state.root.common);
    const [selectedCurrency, setselectedCurrency] = useState({ value: 63, label: "Indian Rupee(INR)", });
    const Unitprice = watch("UnitPrice");


    useEffect(() => {
        if (VariationPriceID) {
            dispatch(getVariationsPriceByID(VariationPriceID)).then((res) => {
                const fetchedData = res?.payload?.data
                setValue("Comment", fetchedData?.comment)
                setValue("Cost", fetchedData.cost)
                setValue("Currency", fetchedData?.currencyID)
                setValue("UnitPrice", fetchedData?.unitPrice)
                setValue("DirectCost", fetchedData?.directcost)
                if (fetchedData && fetchedData?.currencyID) { setselectedCurrency({ label: fetchedData.currencyName, value: fetchedData.currencyID, }); }

            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const SumbitVariationPrice = (data) => {
        const Params = {
            "addVariationsPriceID": VariationPriceID ? VariationPriceID : 0,
            "currencyID": selectedCurrency.value,
            "unitPrice": Unitprice,
            "cost": data.Cost,
            "comment": data.Comment,
            "productVariationsID": VariationsID,
            "directcost": data?.DirectCost,
            "userID": 1
        }

        try {
            dispatch(AddVariationsPrice({ data: Params })).then((res) => {
                if (res.payload.status === true) {
                    setLoadFist(true)
                    togglePriceVari()
                    setselectedCurrency('')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"

        >
            <div className="relative p-4 w-full max-w-xl max-h-full">

                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {VariationPriceID ? "Update" : "Add"}  Variation Price
                        </h3>
                        <AiOutlineCloseCircle
                            className="text-3xl text-primary cursor-pointer"
                            onClick={() => {
                                togglePriceVari();
                            }}
                        />
                    </div>

                    <form onSubmit={handleSubmit(SumbitVariationPrice)}>
                        <div className="p-4 md:p-5">
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="Currency"
                                    className="block mb-2 font-bold text-gray-600"
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
                            <div className="col-span-2 sm:col-span-1 mb-3">
                                <label htmlFor="" className="block mb-2 font-bold text-gray-600 mt-2">
                                    Unit price
                                </label>
                                <input
                                    type="text"
                                    min="0"
                                    {...register("Unitprice", { required: "Unitprice  is Required", })}
                                    name="Unitprice"
                                    id="Unitprice"
                                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    onInput={(e) => {
                                        const Unitprice = e.target.value.replace(/[^0-9.]/g, '');
                                        setValue("UnitPrice", Unitprice,);
                                    }}
                                    value={formatNumber(Unitprice)}
                                />
                                {errors.Unitprice && (
                                    <span className="error text-red-600 text-sm font-bold">
                                        {errors.Unitprice.message}
                                    </span>
                                )}
                            </div>
                            <div className='grid gap-4 mb-3 grid-cols-2'>
                                <div className="col-span-2 sm:col-span-1  ">
                                    <label
                                        htmlFor=""
                                        className="block  font-bold text-gray-600 "
                                    >
                                        Cost
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        {...register("Cost", {
                                            required: "Cost  is Required",
                                        })}
                                        name="Cost"
                                        id="Cost"
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                    {errors.Cost && (
                                        <span className="error text-red-600 text-sm font-bold">
                                            {errors.Cost.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label
                                        for="name"
                                        className="block  font-bold text-gray-600"
                                    >
                                        Direct cost
                                    </label>
                                    <input
                                        type="text"
                                        min="0"
                                        {...register("DirectCost", {
                                            required: "Direct cost  is Required",
                                        })}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                                        }}
                                        name="DirectCost"
                                        id="unit"
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                    {errors?.DirectCost && (
                                        <span className="error text-red-600 text-sm font-bold">
                                            {errors?.DirectCost?.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor=""
                                    className="block mb-2 font-bold text-gray-600 mt-2"
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
                            </div>
                            <div className="mt-4  flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                    onClick={togglePriceVari}
                                >
                                    Close
                                </button>

                                <button
                                    type="submit"
                                    className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-gray-300 border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                >
                                    {VariationPriceID ? "Update" : "Save"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
