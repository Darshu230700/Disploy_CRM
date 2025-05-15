/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa6';
import moment from 'moment';
import { AddDealPaymentPlan } from '../../Redux/DealSlice';

export default function AddPaymentPlan({ setPaymentModal, setLoadFirst, DealId, PlanName, EditSubscription, setEditSubscription }) {

    const { register, handleSubmit, setValue, watch, } = useForm();
    const dispatch = useDispatch();
    const [startDate, setstartDate] = useState(moment().format("YYYY-MM-DD"));
    const [Paymentfield, setPaymentfield] = useState([]);
    const [recurringAmount, setRecurringAmount] = useState(0);
    const [numberOfPayments, setnumberOfPayments] = useState(0);
    const [error, seterror] = useState({});
    const interval = watch('Interval')
    const periodMap = {
        'Monthly': 'M',
        'Weekly': 'w',
        'Quarterly': 'Q',
        'Half-Yearly': 'M',
        'Yearly': 'y'
    };
    const periodUnit = periodMap[interval];

    useEffect(() => {
        if (EditSubscription) {
            setValue('dealvalue', EditSubscription?.setamountAsdealvalue);
            if (EditSubscription?.interval) setValue('Interval', EditSubscription?.interval);
        }
    }, [EditSubscription, setValue]);


    useEffect(() => {
        if (recurringAmount > 0 && numberOfPayments > 0) {
            const amountPerPayment = recurringAmount / numberOfPayments;
            const newPaymentFields = Array.from({ length: numberOfPayments }, (_, index) => {
                let dueDate;
                if (interval === 'Half-Yearly') {
                    dueDate = moment(startDate).add(index * 6, 'M').format("YYYY-MM-DD");
                } else {
                    dueDate = moment(startDate).add(index, periodUnit).format("YYYY-MM-DD");
                }
                return {
                    dealPaymentID: 0,
                    dealsubscriptionID: 0,
                    description: `Payment ${index + 1}`,
                    amount: amountPerPayment.toFixed(2),
                    dueDate: dueDate
                };
            });
            setPaymentfield(newPaymentFields);
        } else if (EditSubscription?.dealSubPaymentSchedule) {
            setPaymentfield(EditSubscription.dealSubPaymentSchedule.map((x) => ({
                amount: x?.amount.toFixed(2),
                dealPaymentScheduleID: x?.dealPaymentScheduleID,
                dealSubPaymentScheduleID: x?.dealSubPaymentScheduleID,
                description: x?.description,
                dueDate: moment(x?.dueDate).format("YYYY-MM-DD")
            })));
        }
    }, [recurringAmount, numberOfPayments, startDate, EditSubscription, periodUnit, interval]);

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

    const handleAddPayment = () => {
        const newPayment = {
            dealPaymentScheduleID: 0,
            dealSubPaymentScheduleID: 0,
            description: "",
            amount: 0,
            dueDate: moment().format("YYYY-MM-DD")
        };
        setPaymentfield([...Paymentfield, newPayment]);
    }

    const handleRemovePayment = (index) => {
        const updatedQuestions = Paymentfield.filter((_, i) => i !== index);
        setPaymentfield(updatedQuestions);
    }

    const handlerAddpayment = async (data) => {
        let newErrors = {};
        if (EditSubscription.length >= 0) {
            if (recurringAmount === '' || parseFloat(recurringAmount) === 0) newErrors.recurringAmount = 'This field is required';

            if (EditSubscription?.noofPayments === '' || parseFloat(numberOfPayments) === 0) {
                newErrors.numberOfPayments = 'Specify the number';
            } else if (parseFloat(numberOfPayments) < 1 || parseFloat(numberOfPayments) > 36) {
                newErrors.numberOfPayments = 'You have exceeded the maximum number of payments (36) ';
            }
            if (Object.values(newErrors).some(error => error !== '')) { return seterror(newErrors); }
        }

        let totalAmount = 0;
        Paymentfield.forEach(question => {
            totalAmount += parseFloat(question.amount) || 0;
        });

        setRecurringAmount(totalAmount);
        const Payload = {
            dealPaymentScheduleID: EditSubscription?.dealPaymentScheduleID ? EditSubscription?.dealPaymentScheduleID : 0,
            dealID: DealId,
            name: PlanName,
            totalAmount: totalAmount,
            setamountAsdealvalue: data?.dealvalue,
            noofPayments: numberOfPayments ? numberOfPayments : Paymentfield?.length,
            interval: data?.Interval,
            startDate: startDate,
            endDate: "2024-06-11T08:46:41.756Z",
            totalRevenue: 0,
            dealSubPaymentSchedule: Paymentfield
        };

        try {
            const response = await dispatch(AddDealPaymentPlan(Payload));
            if (response) {
                setLoadFirst(true);
                setPaymentModal(false);
                setEditSubscription([]);
                seterror({});
            }
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
                <div className="relative p-4 w-full max-w-xl max-h-full overflow-y-auto vertical-scroll-inner">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Set up {PlanName} {PlanName === 'payment' ? 'schedule' : ''}
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => { setPaymentModal(false); setEditSubscription([]); }}
                            />
                        </div>
                        <form onSubmit={handleSubmit(handlerAddpayment)}>
                            <div className="h-96 vertical-scroll-inner relative p-4">
                                <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
                                    {
                                        EditSubscription.length >= 0 && (
                                            <div className="mb-5">
                                                <label htmlFor="Guests" className="block mb-2 font-bold text-gray-600">
                                                    Total amount
                                                </label>
                                                <input
                                                    type="number"
                                                    id="RecurringAmount"
                                                    name="RecurringAmount"
                                                    placeholder="Value in INR"
                                                    className="border border-gray-300 shadow p-3 w-full rounded"
                                                    value={recurringAmount}
                                                    onChange={(e) => setRecurringAmount(e.target.value)}
                                                    min='0'
                                                />
                                                {recurringAmount.length > 0 ? '' : error.recurringAmount && <span className="error text-red-500 text-sm">{error.recurringAmount}</span>}
                                            </div>
                                        )
                                    }

                                    <div className='flex items-center gap-3 justify-center'>
                                        <input
                                            id='dealvalue'
                                            placeholder="Enter Value"
                                            className="border border-gray-300 rounded"
                                            type='checkbox'
                                            {...register("dealvalue",)}
                                        />
                                        <label className="block font-bold text-gray-600" htmlFor='dealvalue'>Set total amount as deal value</label>
                                    </div>
                                    {EditSubscription.length >= 0 && (
                                        <>
                                            <div className="mb-5 ">
                                                <label htmlFor="Guests" className="block mb-2 font-bold text-gray-600">Number of payments</label>
                                                <input
                                                    type="number"
                                                    id="Numbersofpayments"
                                                    name="Numbersofpayments"
                                                    className="border border-gray-300 shadow p-3 w-full rounded"
                                                    value={numberOfPayments}
                                                    onChange={(e) => setnumberOfPayments(e.target.value)}
                                                    min='0'
                                                    max={36}
                                                />
                                                {numberOfPayments.length > 0 ? '' : error.numberOfPayments && <span className="error text-red-500 text-sm">{error.numberOfPayments}</span>}

                                            </div>
                                            <div className="mb-5 w-full flex gap-4 items-center">
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
                                        </>
                                    )}
                                    <div className="mb-5 mt-4">
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
                                                            onClick={() => handleRemovePayment(index)}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                disabled={Paymentfield.length >= 36}
                                                className={`flex items-center inline-block   focus:outline-none text-primary-500   border border-gray-200  dark:text-primary-500  bg-transparent text-sm font-medium py-1 px-3  rounded ${Paymentfield.length >= 36 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                onClick={handleAddPayment}
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
                                    onClick={() => setPaymentModal(false)}
                                >
                                    Close
                                </button>
                                <div className="flex items-center px-3">
                                    <button type="submit"
                                        className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
