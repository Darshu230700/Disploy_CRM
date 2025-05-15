/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AddProductPrice, getPriceByID } from '../../Redux/ProductSlice';
import ReactSelect from '../Common/ReactSelect';
import { formatNumber } from '../Common/Common';

export default function AddPrice({ togglePrice, SelectPriceID, setLoadFist, data }) {
    const { handleSubmit, setValue, register, watch, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    let { id } = useParams();
    const store = useSelector((state) => state.root.common);
    const [selectedCurrency, setselectedCurrency] = useState(null);
    const Unitprice = watch("UnitPrice");

    useEffect(() => {
        if (SelectPriceID) {
            dispatch(getPriceByID(SelectPriceID)).then((res) => {
                const fetchedData = res?.payload?.data
                setValue("Currency", fetchedData.currencyID)
                setValue("UnitPrice", fetchedData.unitprice)
                setValue("cost", fetchedData.cost)
                setValue("Directcost", fetchedData.directCost)
                if (fetchedData && fetchedData?.currencyID) { setselectedCurrency({ label: fetchedData?.currencyName, value: fetchedData?.currencyID, }); }
            })
        }
    }, []);

    const currencyOptions = store && store?.getCurrency?.length > 0 ? store?.getCurrency.map((item) => ({
        value: item.value,
        label: item.text,
        isDisabled: data.some((x) => x?.currencyID === item?.value),
    })) : [{ value: "", label: "Not Found" }];

    useEffect(() => {
        if (currencyOptions?.length > 0) {
            const indianRupee = currencyOptions?.find((x) => { return x?.value === 63 && !x?.isDisabled })
            const initialCurrency = indianRupee || currencyOptions?.find(option => !option?.isDisabled) || currencyOptions[0];
            setselectedCurrency(initialCurrency);
        }
    }, []);

    const SumbitPrice = (data) => {
        const Params = {
            "productPriceID": SelectPriceID ? SelectPriceID : 0,
            "productID": id,
            "currencyID": selectedCurrency.value,
            "unitprice": Unitprice,
            "cost": data.cost,
            "directCost": data.Directcost,
           
          
        }
        try {
            dispatch(AddProductPrice({ data: Params })).then((res) => {
                if (res?.payload?.status === true) {
                    setLoadFist(true)
                    togglePrice()
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
                                {SelectPriceID ? "Update Price" : " Add Price"}
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => {
                                    togglePrice();
                                }}
                            />
                        </div>

                        <form onSubmit={handleSubmit(SumbitPrice)}>
                            <div className="p-4 md:p-5">
                                <div className="col-span-2 sm:col-span-1 mb-3">
                                    <label
                                        htmlFor="Currency"
                                        className="block mb-1 font-bold text-gray-600"
                                    >
                                        Currency
                                    </label>
                                    <ReactSelect
                                        Clearable={false}
                                        selectedValue={selectedCurrency}
                                        options={currencyOptions}
                                        handleSelectChange={(option) => setselectedCurrency(option)}
                                    />
                                </div>

                                <div className="col-span-2 sm:col-span-1 mb-3">
                                    <label
                                        for="name"
                                        className="block mb-1 font-bold text-gray-600"
                                    >
                                        Unit Price
                                    </label>
                                    <input
                                        type="text"
                                        min="0"
                                        name="UnitPrice"
                                        id="Unitprice"
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        {...register("UnitPrice", {
                                            required: "UnitPrice  is Required",
                                            valueAsNumber: true,
                                        })}
                                        onInput={(e) => {
                                            const Unitprice = e.target.value.replace(/[^0-9.]/g, '');
                                            setValue("UnitPrice", Unitprice,);

                                        }}
                                        value={formatNumber(Unitprice)}

                                    />
                                    {errors.UnitPrice && (
                                        <span className="error text-red-600 text-sm font-bold">
                                            {errors.UnitPrice.message}
                                        </span>
                                    )}
                                </div>

                                <div className="col-span-2 sm:col-span-1 mb-3">
                                    <label
                                        for="name"
                                        className="block mb-1 font-bold text-gray-600"
                                    >
                                        Cost
                                    </label>
                                    <input
                                        type="text"
                                        min="0"
                                        {...register("cost", {
                                            required: "Cost  is Required",
                                            valueAsNumber: true,
                                        })}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                                        }}
                                        name="cost"
                                        id="cost"
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                    {errors.cost && (
                                        <span className="error text-red-600 text-sm font-bold">
                                            {errors.cost.message}
                                        </span>
                                    )}
                                </div>

                                <div className="col-span-2 sm:col-span-1 mb-3">
                                    <label
                                        htmlFor="Directcost"
                                        className="block mb-1 font-bold text-gray-600"
                                    >
                                        Direct cost
                                    </label>
                                    <input
                                        type="text"
                                        min="0"
                                        step="0.01" // Ensures decimal values can be entered
                                        {...register("Directcost", {
                                            required: "Direct cost is required",
                                            valueAsNumber: true,
                                            pattern: {
                                                value: /^\d+(\.\d{2})?$/,
                                                message: "Value should have up to 2 decimal Places"
                                            }
                                        })}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                                        }}
                                        name="Directcost"
                                        id="Directcost"
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                    {errors.Directcost && (
                                        <span className="error text-red-600 text-sm font-bold">
                                            {errors.Directcost.message}
                                        </span>
                                    )}
                                </div>


                                <div className="mt-4  flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                    <button
                                        type="button"
                                        className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                        onClick={togglePrice}
                                    >
                                        Close
                                    </button>

                                    <button
                                        type="submit"
                                        className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-gray-300 border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                    >
                                        {SelectPriceID ? "Update " : " Save"}
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
