/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa6';
import moment from 'moment';
import { AddDealSubscription } from '../../Redux/DealSlice';
import toast from 'react-hot-toast';

export default function AddSubscription({ setSubscriptionModal, setLoadFirst, DealId, PlanName, EditSubscription, setEditSubscription }) {
    const { register, handleSubmit, watch, setValue, formState: { errors }, } = useForm();
    const dispatch = useDispatch()
    const [startDate, setstartDate] = useState(moment().format("YYYY-MM-DD"));
    const [Paymentfield, setPaymentfield] = useState([]);
    const infinitePayments = watch('InfinitePayments', false)

    useEffect(() => {
        if (EditSubscription) {
            setValue('RecurringAmount', EditSubscription?.recurringAmount)
            setValue('Description', EditSubscription?.description)
            setValue('Numbersofpayments', EditSubscription?.payments)
            setValue('InfinitePayments', EditSubscription?.asInfinite)
            if (EditSubscription?.interval) setValue('Interval', EditSubscription?.interval)
            setValue('dealvalue', EditSubscription?.amountAsDealValue)
            if (EditSubscription?.startDate) { setstartDate(moment(EditSubscription.startDate).format("YYYY-MM-DD")) }
            if (EditSubscription?.dealPaymentList) {
                setPaymentfield(EditSubscription?.dealPaymentList.map((x,) => ({ amount: x?.amount.toFixed(2), dealPaymentID: x?.dealPaymentID, dealsubscriptionID: x?.dealsubscriptionID, description: x?.description, dueDate: moment(x?.dueDate).format("YYYY-MM-DD") })))
            }
        }
    }, [EditSubscription]);

    const handledescription = (e, index) => {
        const updatedQuestions = [...Paymentfield];
        updatedQuestions[index].description = e.target.value;
        setPaymentfield(updatedQuestions);
    }
    const handleAmount = (e, index) => {
        const updatedQuestions = [...Paymentfield];
        updatedQuestions[index].amount = e.target.value;
        setPaymentfield(updatedQuestions);
    }
    const handleDueDate = (e, index) => {
        const updatedQuestions = [...Paymentfield];
        updatedQuestions[index].dueDate = e.target.value;
        setPaymentfield(updatedQuestions);
    }

    const onSubmit = async (data) => {

        const Payload = {
            dealsubscriptionID: EditSubscription?.dealsubscriptionID ? EditSubscription?.dealsubscriptionID : 0,
            dealID: DealId,
            name: PlanName,
            recurringAmount: data?.RecurringAmount,
            amountAsDealValue: data?.dealvalue,
            description: data?.Description,
            payments: data?.Numbersofpayments,
            asInfinite: data?.InfinitePayments,
            interval: data?.Interval,
            isActive: true,
            startDate: startDate,
            endDate: "2024-06-10T05:54:44.622Z",
            isCancel: false,
            totalRevenue: 0,
            cancellationDate: "2024-06-10T05:54:44.622Z",
            dealPaymentList: Paymentfield
        }

        const response = await dispatch(AddDealSubscription(Payload))
        if (response) {
            toast.success('Subscription Plan saved Successfully!')
            setLoadFirst(true)
            setSubscriptionModal(false)
            setEditSubscription([])
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
                <div className="relative p-4 w-full max-w-xl max-h-full overflow-y-auto vertical-scroll-inner">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Set up {PlanName} {PlanName === 'payment' ? 'schedule' : ''}
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => { setSubscriptionModal(false); setEditSubscription([]) }}
                            />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className=" h-96 vertical-scroll-inner relative p-4">
                                <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">

                                    <div className="mb-5">
                                        <label
                                            htmlFor="Guests"
                                            className="block mb-2 font-bold text-gray-600"
                                        >
                                            Recurring amount
                                        </label>
                                        <input
                                            type="number"
                                            id="RecurringAmount"
                                            name="RecurringAmount"
                                            placeholder="Value in INR"
                                            className="border border-gray-300 shadow p-3 w-full rounded"
                                            min='0'
                                            {...register("RecurringAmount", { valueAsNumber: true, required: "This field is required", })}
                                        />
                                        {errors.RecurringAmount && <span className="error text-red-500 text-sm">{errors.RecurringAmount.message}</span>}
                                    </div>

                                    <div className='flex items-center  gap-3 justify-center'>
                                        <input
                                            id='dealvalue'
                                            placeholder="Enter Value"
                                            className="border border-gray-300 rounded "
                                            type='checkbox'
                                            {...register("dealvalue",)}

                                        />
                                        <label className="block  font-bold text-gray-600" for='dealvalue'>
                                            Set recurring amount as deal value
                                        </label>
                                    </div>

                                    <div className="mb-5">
                                        <label
                                            className="block mb-2 font-bold text-gray-600"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            type="textarea"
                                            name="Description"
                                            placeholder="Max. 140 characters"
                                            className="border border-gray-300 shadow p-3 w-full rounded"
                                            {...register("Description", {
                                                maxLength: {
                                                    value: 140,
                                                    message: "The description cannot exceed 140 characters"
                                                }
                                            })}
                                        />
                                        {errors.Description && <span className="error text-red-500 text-sm">{errors.Description.message}</span>}
                                    </div>

                                    {
                                        EditSubscription.length >= 0 && (
                                            <div className="mb-5 flex gap-4 items-center">
                                                <div className='w-8/12'>
                                                    <label
                                                        htmlFor="Guests"
                                                        className="block mb-2 font-bold text-gray-600"
                                                    >
                                                        Number of payments
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="Numbersofpayments"
                                                        name="Numbersofpayments"
                                                        placeholder="Value in INR"
                                                        className={`border border-gray-300 shadow p-3 w-full rounded ${infinitePayments === true ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                        disabled={infinitePayments === true}
                                                        min='0'
                                                        {...register("Numbersofpayments", {
                                                            valueAsNumber: true,
                                                            required: !infinitePayments ? "Specify the number of payments" : false,
                                                            max: {
                                                                value: 1000,
                                                                message: "You have exceeded the maximum number of payments (1000)"
                                                            }
                                                        })}
                                                    />
                                                    {!(infinitePayments === true) && errors.Numbersofpayments && <span className="error text-red-500 text-sm">{errors.Numbersofpayments.message}</span>}
                                                </div>

                                                <div className='flex items-center ml-5  mt-5 gap-3'>
                                                    <input
                                                        type='checkbox'
                                                        id='payments'
                                                        className=""
                                                        {...register("InfinitePayments",)}
                                                    />
                                                    <label
                                                        for="payments"
                                                        className="block mb-2 font-bold text-gray-600"
                                                    >
                                                        Infinite payments
                                                    </label>
                                                </div>

                                            </div>
                                        )
                                    }

                                    <div className="mb-5 w-full flex gap-4 items-center">
                                        {EditSubscription.length >= 0 && (
                                            <div className='w-3/6'>
                                                <label
                                                    htmlFor="Guests"
                                                    className="block mb-2 font-bold text-gray-600"
                                                >
                                                    Interval
                                                </label>
                                                <select className='border border-gray-300 shadow p-3 w-full rounded ' id='Interval' name='Interval'  {...register("Interval")}>
                                                    <option value='Monthly'>Monthly</option>
                                                    <option value='Weekly'>Weekly</option>
                                                    <option value='Quarterly'>Quarterly</option>
                                                    <option value='Half-Yearly'>Half-Yearly</option>
                                                    <option value='Yearly'>Yearly</option>
                                                </select>
                                            </div>
                                        )}
                                        <div className='w-3/6'>
                                            <label
                                                htmlFor="Guests"
                                                className="block mb-2 font-bold text-gray-600"
                                            >
                                                Start date
                                            </label>
                                            <input
                                                type='date'
                                                value={startDate}
                                                className="border border-gray-300 shadow p-3 w-full rounded "
                                                onChange={(e) => {
                                                    setstartDate(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <h4 className="font-semibold text-sm">ADDITIONAL PAYMENTS</h4>

                                    <div className="mb-5">
                                        {Paymentfield.length > 0 && (
                                            <div className='flex items-center text-sm justify-evenly'>
                                                <label
                                                    htmlFor="Guests"
                                                    className="block  font-bold text-gray-600 "
                                                >
                                                    DESCRIPTION
                                                </label>
                                                <label className="block  font-bold text-gray-600 ">
                                                    AMOUNT
                                                </label>
                                                <label className="block  font-bold text-gray-600 ">
                                                    DUE ON
                                                </label>
                                            </div>
                                        )}
                                        <div className='mb-2'>
                                            {Paymentfield && Paymentfield.map((item, index) => (
                                                <div key={index} className="flex items-center relative m-2">
                                                    <input
                                                        type="text"
                                                        placeholder="What are you billing?"
                                                        className="border border-gray-300 shadow p-2  rounded w-80"
                                                        value={item?.description}
                                                        onChange={(e) => handledescription(e, index)}
                                                    />
                                                    <div className='flex items-center ml-5 gap-3'>
                                                        <input
                                                            placeholder="INR"
                                                            className="border border-gray-300  p-2  rounded "
                                                            type='number'
                                                            min='0'
                                                            value={item?.amount}
                                                            onChange={(e) => handleAmount(e, index)}
                                                        />
                                                        <input
                                                            placeholder="Select Date"
                                                            className="border border-gray-300  p-2 w-64 rounded "
                                                            type='date'
                                                            value={item?.dueDate}
                                                            onChange={(e) => handleDueDate(e, index)}
                                                        />
                                                    </div>
                                                    {Paymentfield.length > 0 && (
                                                        <RiDeleteBinLine
                                                            className='absolute top-2 right-0'
                                                            size={17}
                                                            onClick={() => {
                                                                const updatedQuestions = Paymentfield.filter((_, i) => i !== index);
                                                                setPaymentfield(updatedQuestions);
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className="flex items-center inline-block   focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium py-1 px-3  rounded"
                                                onClick={() => setPaymentfield([...Paymentfield, {
                                                    dealPaymentID: 0,
                                                    dealsubscriptionID: 0,
                                                    description: "",
                                                    amount: 0,
                                                    dueDate: moment().format("YYYY-MM-DD")
                                                }])}
                                            >
                                                <FaPlus /><span className='text-black text-sm font-semibold  px-2.5 py-0.5 rounde'>Payment</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded close"
                                    onClick={() => setSubscriptionModal(false)}
                                >
                                    Close
                                </button>
                                <div className="flex items-center px-3">
                                    <button
                                        type="submit"
                                        className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                    >
                                        Continue
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
