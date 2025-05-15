/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReactSelect from '../Common/ReactSelect';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCurrency } from '../../Redux/CommonSlice';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { getProduct } from '../../Redux/ProductSlice';
import ReactQuill from 'react-quill';
import moment from 'moment';
import { FaPlus } from 'react-icons/fa6';
import { handleAddDeal, handleInsertDealProduct } from '../../Redux/DealSlice';
import Select from 'react-select';
import toast from 'react-hot-toast';

export default function AddDealProducts({ setDealProductModal, DealId, setLoadFirst, EditDealtoProduct, setEditDealtoProduct, Deal }) {
    const store = useSelector((state) => state.root.common);
    const storeProduct = useSelector((state) => state?.root?.Product);
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue, watch, } = useForm();
    const amountsAre = watch('AmountsAre');

    const [totalDiscount, settotalDiscount] = useState(0);
    const [errors, setErrors] = useState({});
    const [selectedCurrency, setSelectedCurrency] = useState({ value: 63, label: "Indian Rupee(INR)", });
    const [AmountTabs, setAmountTabs] = useState('Summary');
    const [ProductField, setProductField] = useState([{
        dealProductsAmountID: 0,
        DealProductID: 0,
        ProductID: 0,
        StartDate: moment().format("YYYY-MM-DD"),
        EndDate: moment().format("YYYY-MM-DD"),
        Price: 0,
        Quantity: 1,
        Discount: 0,
        Tax: 0,
        Amount: 0,
        Description: '',
        DiscountType: '%'
    }]);
    const [DiscountField, setDiscountField] = useState([]);
    console.log('errors :>> ', errors);
    
    useEffect(() => {
        dispatch(getCurrency({}))
        dispatch(getProduct({}))
    }, [])

    useEffect(() => {
        calculateSubtotals()
    }, [DiscountField, ProductField]);

    useEffect(() => {
        if (EditDealtoProduct) {
            if (EditDealtoProduct?.amountsAre) setValue('AmountsAre', EditDealtoProduct?.amountsAre)
            if (EditDealtoProduct?.currencyID) { setSelectedCurrency({ label: EditDealtoProduct?.currencyName, value: EditDealtoProduct?.currencyID, }); }
            if (EditDealtoProduct?.dealProductAmount) {
                setProductField(EditDealtoProduct?.dealProductAmount.map((x,) => ({
                    DealProductID: x?.dealProductID,
                    dealProductsAmountID: x?.dealProductsAmountID,
                    ProductID: x?.productID,
                    StartDate: moment(x?.startDate).format("YYYY-MM-DD"),
                    EndDate: moment(x?.endDate).format("YYYY-MM-DD"),
                    Price: x?.price,
                    Quantity: x?.quantity,
                    Discount: x?.discount,
                    Tax: x?.tax,
                    Amount: x?.amount,
                    Description: x?.description,
                    DiscountType: x?.discountType,
                    ProductName: x?.productName
                })))
            }
            if (EditDealtoProduct?.additionalDiscounts) {
                setDiscountField(EditDealtoProduct?.additionalDiscounts.map((x) => ({
                    additionalDiscountID: x?.additionalDiscountID,
                    dealProductID: x?.dealProductID,
                    description: x?.description,
                    discount: x?.discount,
                    amount: x?.amount
                })))
            }
        }
    }, [EditDealtoProduct, setValue,]);

    const handleTabs = (option) => { setAmountTabs(option); }

    const calculateAmount = (price, quantity, discount, discountType) => {
        let amount = price * quantity;
        if (discountType === '%') {
            amount -= amount * (discount / 100);
        } else {
            amount -= discount;
        }
        return amount;
    };

    const handleFieldChange = (index, field, value) => {
        const newProductField = [...ProductField];
        newProductField[index] = { ...newProductField[index], [field]: value };

        if (field === 'ProductID') {
            const selectedProduct = storeProduct?.getProduct?.find(product => product.productID === value);
            newProductField[index].ProductName = selectedProduct ? selectedProduct.name : '';
        }
        const { Price, Quantity, Discount, DiscountType } = newProductField[index];

        newProductField[index].Amount = calculateAmount(
            field === 'Price' ? value : Price,
            field === 'Quantity' ? value : Quantity,
            field === 'Discount' ? value : Discount,
            DiscountType
        );
        setProductField(newProductField);

        let newErrors = { ...errors };
        if (field === 'ProductID' && value) { delete newErrors[`ProductID-${index}`]; }
        if (field === 'Price' && value > 0) { delete newErrors[`Price-${index}`]; }
        setErrors(newErrors);
    };

    const calculateSubtotals = () => {
        let subtotalExcludingTax = 0;
        let totalWithDiscount = 0;
        let totalWithTax = 0;
        let totalTax = 0;

        ProductField.forEach(item => {
            const itemSubtotal = item.Price * item.Quantity;
            subtotalExcludingTax += itemSubtotal;

            let itemTotalAfterDiscount = itemSubtotal;
            if (item.DiscountType === '%') {
                itemTotalAfterDiscount -= itemSubtotal * (item.Discount / 100);
            } else {
                itemTotalAfterDiscount -= item.Discount;
            }
            totalWithDiscount += itemTotalAfterDiscount;

            // Calculate tax on discounted amount
            const itemTax = (amountsAre !== 'No tax') ? itemTotalAfterDiscount * (item.Tax / 100) : 0;
            totalTax += itemTax;

            amountsAre === 'Tax inclusive'
                ? totalWithTax += itemTotalAfterDiscount - itemTax
                : totalWithTax += (itemTotalAfterDiscount + itemTax);
        });

        // Apply additional discounts from DiscountField
        let additionalDiscountTotal = 0;
        DiscountField.forEach(discountItem => {
            if (discountItem.amount) {
                const discountValue = discountItem.amount;
                additionalDiscountTotal += discountValue;
                discountItem.discount = ((totalWithTax * discountValue) / 100).toFixed(2);
            }
        });

        totalWithTax -= additionalDiscountTotal;
        return { subtotalExcludingTax, totalWithTax, totalTax, totalWithDiscount };
    };

    const { subtotalExcludingTax, totalWithTax, totalTax, totalWithDiscount } = calculateSubtotals();

    const handleDiscount = (index, field, value) => {

        const newDiscountField = [...DiscountField];
        newDiscountField[index] = { ...newDiscountField[index], [field]: value };

        if (field === 'amount') {
            const amount = parseFloat(value) || 0;
            const calculatedDiscount = (totalWithDiscount * amount) / 100;
            newDiscountField[index].discount = calculatedDiscount;
        }
        setDiscountField(newDiscountField)
        const totalDiscount = newDiscountField.reduce((acc, discount) => acc + parseFloat(discount.discount || 0), 0);
        settotalDiscount(totalDiscount);
    }

    const validateFields = () => {
        const newErrors = {};
        ProductField.forEach((item, index) => {
            if (!item.ProductID) { newErrors[`ProductID-${index}`] = 'Product name is required'; }
            // if (!item.Price || item.Price <= 0) { newErrors[`Price-${index}`] = 'This field is required.'; }
        });
        return newErrors;
    };

    const updateDeal = () => {

        const selectedProductIDs = ProductField.map(item => item.ProductID).filter(id => id);
        const ProductMasterIDs = selectedProductIDs.join(',');
        const Params = {
            ...Deal,
            ProductMasterIDs,
        };

        try {
            dispatch(handleAddDeal(Params)).then((res) => {
                toast.remove()
            })
        } catch (error) {
            console.log("error", error);
        }
    };

    const onSubmit = () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) return setErrors(validationErrors);

        const payload = {
            dealProductID: EditDealtoProduct?.dealProductID ? EditDealtoProduct?.dealProductID : 0,
            dealID: DealId,
            currencyID: selectedCurrency?.value,
            amountsAre: amountsAre,
            subTotalExcludingTax: totalWithDiscount,
            taxAmount: totalWithTax,
            oneTimeSubTotal: 0,
            additionalDiscount: 0,
            mrr: 0,
            arr: 0,
            acv: totalWithDiscount,
            tcv: totalWithDiscount,
            currencyName: "",
            dealProductAmount: ProductField,
            additionalDiscounts: DiscountField,
        }

        try {
            dispatch(handleInsertDealProduct(payload)).then((res) => {


                if (res?.payload?.status === true) {
                    setLoadFirst(true)
                    updateDeal()
                    setDealProductModal(false)
                    setEditDealtoProduct([])
                }
                setTimeout(() => {
                    toast.success('Product linked Successfully!')
                }, 500);
            })
        } catch (error) {
            console.log('error :>> ', error);
        }
    };

    return (
        <div>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Add products to deal
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => { setDealProductModal(false); setEditDealtoProduct([]) }}
                            />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="xl:w-full h-[35rem]  scroll-inner overflow-scroll  relative p-4">
                                <div className="mb-5  w-full flex gap-7">
                                    <div className="w-80">
                                        <label for="name" className="block mb-2 font-bold text-gray-600" >Deal currency</label>
                                        <ReactSelect
                                            className='z-40'
                                            selectedValue={selectedCurrency}
                                            options={
                                                store && store?.getCurrency?.length > 0
                                                    ? store?.getCurrency.map((item) => ({
                                                        value: item?.value,
                                                        label: item?.text,
                                                    }))
                                                    : [{ value: "", label: "Not Found" }]
                                            }
                                            handleSelectChange={(option) => setSelectedCurrency(option)}
                                        />
                                    </div>
                                    <div className='w-80' >
                                        <label htmlFor="Guests" className="block mb-2 font-bold text-gray-600">Amounts are</label>
                                        <select className='sc-iMWBiJ bTicHx' id='AmountsAre' name=' AmountsAre'  {...register("AmountsAre")}>
                                            <option value='Tax inclusive'>Tax inclusive</option>
                                            <option value='Tax exclusive'>Tax exclusive</option>
                                            <option value='No tax'>No tax</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center text-sm justify-evenly'>
                                        <label for="name" className="block mb-2 font-bold text-gray-600" >PRODUCTS</label>
                                        <label for="name" className="block mb-2 font-bold text-gray-600 " >BILLING START DATE</label>
                                        <label for="name" className="block mb-2 font-bold text-gray-600" >PRICE</label>
                                        <label for="name" className="block mb-2 font-bold text-gray-600" >QUANTITY</label>
                                        <label for="name" className="block mb-2 font-bold text-gray-600" >DISCOUNT</label>
                                        {!(amountsAre === 'No tax') && (<label for="name" className="block mb-2 font-bold text-gray-600" >TAX %</label>)}
                                        <label for="name" className="block mb-2 font-bold text-gray-600" >AMOUNT</label>
                                    </div>
                                    {ProductField && ProductField.map((item, index) => (
                                        <div key={index} className='my-2'>
                                            <div className="flex items-center relative mb-5 gap-5">
                                                <div className="w-56">
                                                    <Select
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        value={
                                                            storeProduct?.getProduct?.find(product => product.productID === item.ProductID)
                                                                ? { value: item.ProductID, label: item.ProductName }
                                                                : null
                                                        }
                                                        isClearable={true}
                                                        options={
                                                            storeProduct?.getProduct?.map((product) => ({
                                                                value: product.productID,
                                                                label: product.name,
                                                            })) || [{ value: "", label: "Not Found" }]
                                                        }
                                                        onChange={(option) => handleFieldChange(index, 'ProductID', option?.value)}
                                                    />

                                                    {errors[`ProductID-${index}`] && <div className="text-red-500">{errors[`ProductID-${index}`]}</div>}
                                                </div>
                                                <div className='flex items-center justify-evenly gap-3 '>
                                                    <input
                                                        placeholder="Select Date"
                                                        className="border border-gray-300 p-2 rounded"
                                                        type='date'
                                                        value={item.StartDate}
                                                        onChange={(e) => handleFieldChange(index, 'StartDate', e.target.value)}
                                                    />
                                                    <div>
                                                        <input
                                                            className="border border-gray-300 p-2 rounded w-28"
                                                            type='number'
                                                            min='0'
                                                            value={item.Price}
                                                            onChange={(e) => handleFieldChange(index, 'Price', e.target.value)}
                                                        />
                                                        {/* {errors[`Price-${index}`] && <div className="text-red-500">{errors[`Price-${index}`]}</div>} */}
                                                    </div>

                                                    <input
                                                        className="border border-gray-300 p-2 rounded w-28"
                                                        type='number'
                                                        min='0'
                                                        value={item.Quantity}
                                                        onChange={(e) => handleFieldChange(index, 'Quantity', e.target.value)}
                                                    />
                                                    <div className='flex items-center'>
                                                        <select
                                                            className='sc-iMWBiJ bTicHx w-20'
                                                            id='Interval'
                                                            name='Interval'
                                                            value={item?.DiscountType}
                                                            onChange={(e) => handleFieldChange(index, 'DiscountType', e.target.value)}
                                                        >
                                                            <option style={{ height: '50px' }} value='%'>%</option>
                                                            <option value={selectedCurrency?.label}>{selectedCurrency?.label}</option>
                                                        </select>
                                                        <input
                                                            className="border border-gray-300 p-2 rounded w-20"
                                                            type='number'
                                                            min='0'
                                                            value={item.Discount}
                                                            onChange={(e) => handleFieldChange(index, 'Discount', e.target.value)}
                                                        />
                                                    </div>
                                                    {!(amountsAre === 'No tax') && (
                                                        <input
                                                            className="border border-gray-300 p-2 rounded w-24"
                                                            type='number'
                                                            min='0'
                                                            value={item.Tax}
                                                            onChange={(e) => handleFieldChange(index, 'Tax', e.target.value)}
                                                        />
                                                    )}
                                                    <input
                                                        className="border border-gray-300 p-2 rounded w-28 cursor-not-allowed"
                                                        type='number'
                                                        min='0'
                                                        disabled
                                                        onChange={(e) => handleFieldChange(index, 'Amount', e.target.value)}
                                                        value={item.Amount}
                                                    />
                                                </div>
                                                <RiDeleteBinLine
                                                    className='absolute top-2 right-0'
                                                    size={17}
                                                    onClick={() => {
                                                        const updatedProductField = ProductField.filter((_, i) => i !== index);
                                                        setProductField(updatedProductField);
                                                    }}
                                                />
                                            </div>
                                            <div className="">
                                                <ReactQuill
                                                    theme="snow"
                                                    value={item?.Description}
                                                    onChange={(value) => handleFieldChange(index, 'Description', value)}
                                                />
                                                <small>2000 characters left</small>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='flex items-center justify-between border-b pb-2'>
                                        <button
                                            type="button"
                                            className="flex items-center inline-block   focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium py-1 px-3  rounded"
                                            onClick={() => setProductField([...ProductField, {
                                                dealProductsAmountID: 0,
                                                DealProductID: 0,
                                                ProductID: 0,
                                                StartDate: moment().format("YYYY-MM-DD"),
                                                EndDate: moment().format("YYYY-MM-DD"),
                                                Price: 0,
                                                Quantity: 1,
                                                Discount: 0,
                                                Tax: 0,
                                                Amount: 0,
                                                Description: '',
                                                DiscountType: '%'
                                            }])}
                                        >
                                            <FaPlus /><span className='text-black text-sm font-semibold  px-2.5 py-0.5 rounde'>Product</span>
                                        </button>
                                        <div className='flex gap-3 items-center'>
                                            <label for="name" className="block  text-sm   text-gray-600" >Total products : {ProductField?.length}</label>
                                            <label for="name" className="block  text-sm   text-gray-600" >Quantity : {ProductField.reduce((acc, item) => acc + Number(item.Quantity), 0)}</label>
                                        </div>
                                    </div>
                                </div>

                                <div className=' my-4 border-b'>
                                    <div className='flex flex-col  mb-4 items-end'>
                                        <h2>Additional discounts</h2>
                                        <p className='text-gray-400'>Additional discounts only apply to products with billing frequency set to one time.</p>

                                        {DiscountField && DiscountField.map((item, index) => (
                                            <div key={index} className="flex items-center relative m-2">
                                                <input
                                                    type="text"
                                                    className="border border-gray-300 shadow p-2  rounded w-52"
                                                    placeholder='Discription'
                                                    value={item?.description}
                                                    onChange={(e) => handleDiscount(index, 'description', e.target.value)}
                                                />
                                                <div className='flex items-center ml-5 gap-3'>
                                                    <input
                                                        placeholder="INR"
                                                        className="border border-gray-300 p-2 w-24  rounded "
                                                        type='number'
                                                        min='0'
                                                        value={item?.amount}
                                                        onChange={(e) => handleDiscount(index, 'amount', e.target.value)}
                                                    />
                                                    <input
                                                        className="border border-gray-300  p-2 w-24 rounded mr-7 cursor-not-allowed"
                                                        type='number'
                                                        min='0'
                                                        value={item?.discount}
                                                        placeholder='Discount'
                                                        disabled
                                                        onChange={(e) => handleDiscount(index, 'discount', e.target.value)}
                                                    />
                                                </div>
                                                <RiDeleteBinLine
                                                    className='absolute top-2 right-0'
                                                    size={17}
                                                    onClick={() => {
                                                        const updatedQuestions = DiscountField.filter((_, i) => i !== index);
                                                        setDiscountField(updatedQuestions);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="flex mt-2 items-center inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium py-1 px-2  rounded"
                                            onClick={() => setDiscountField([...DiscountField, {
                                                additionalDiscountID: 0,
                                                dealProductID: 0,
                                                description: "",
                                                amount: 0
                                            }])}
                                        >
                                            <FaPlus /><span className='text-black text-sm font-semibold  px-2.5 py-0.5 rounde'>discount</span>
                                        </button>
                                    </div>

                                </div>
                                <div className=' my-4 '>
                                    <div className='flex  mb-4 justify-end'>
                                        <button type="button"
                                            className={` inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700  text-sm font-medium py-1 px-3 ${AmountTabs === 'Summary' ? 'bg-primary-500 text-white' : 'bg-transparent'}`}
                                            onClick={() => handleTabs('Summary')}
                                        >
                                            Summary
                                        </button>
                                        <button type="button"
                                            className={` inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700  text-sm font-medium py-1 px-3 ${AmountTabs === 'Revenue' ? 'bg-primary-500 text-white' : 'bg-transparent'}`}
                                            onClick={() => handleTabs('Revenue')}
                                        >
                                            Revenue
                                        </button>
                                    </div>
                                    {(!(amountsAre === 'No tax') && AmountTabs === 'Summary') && (
                                        <div className='flex flex-col  items-end '>
                                            {DiscountField.length > 0 && (
                                                <>
                                                    <label for="name" className="block  text-sm mb-2 text-left text-black-600" >One time subtotal  &nbsp;&nbsp;&nbsp;.............  ₹{totalWithDiscount}</label>
                                                    <label for="name" className="block  text-sm mb-2 text-left text-black-600  ">Additional discounts  &nbsp;&nbsp;&nbsp; .............  -₹{totalDiscount}</label>
                                                </>
                                            )}
                                            <label for="name" className="block  text-sm mb-2 text-left text-black-600" >Subtotal excluding tax &nbsp;&nbsp;&nbsp; ............. ₹{amountsAre === 'Tax inclusive' ? (totalWithTax.toFixed(2)).toLocaleString('en-PK') : totalWithDiscount - totalDiscount.toFixed(2)}</label>
                                            {ProductField && ProductField.filter(item => item?.Discount > 0).length > 0 && (
                                                <label for="name" className="block text-sm mb-2 text-left  text-gray-600">(incl. total discount -₹{((subtotalExcludingTax - totalWithDiscount) + totalDiscount).toFixed(2)})</label>
                                            )}
                                            {ProductField && ProductField.filter(item => item?.Tax > 0).length > 0 && (
                                                <label for="name" className="block text-sm mb-2 text-left text-gray-600">
                                                    Tax {`(${ProductField.reduce((acc, item) => acc + Number(item?.Tax), 0)}% inclusive on ₹${amountsAre === 'Tax inclusive' ? totalWithTax.toFixed(2) : totalWithDiscount.toFixed(2)})`} &nbsp;&nbsp;&nbsp; .............  ₹{totalTax.toFixed(2)}
                                                </label>
                                            )}
                                            <label for="name" className="block  text-sm mb-2 text-left text-black-600 font-semibold" >Total with tax  &nbsp;&nbsp;&nbsp; .............  ₹{amountsAre === 'Tax inclusive' ? totalWithDiscount.toFixed(2) : totalWithTax.toFixed(2)}</label>
                                        </div>
                                    )}
                                    {(AmountTabs === 'Summary' && amountsAre === 'No tax') && (
                                        <div className='flex flex-col  items-end '>
                                            {DiscountField.length > 0 && (
                                                <>
                                                    <label for="name" className="block  text-sm mb-2 text-left text-black-600" >One time subtotal  &nbsp;&nbsp;&nbsp;.............  ₹{totalWithDiscount}</label>
                                                    <label for="name" className="block  text-sm mb-2 text-left text-black-600  ">Additional discounts  &nbsp;&nbsp;&nbsp; .............  -₹{totalDiscount}</label>
                                                </>
                                            )}
                                            <label for="name" className="block  text-sm mb-2 text-left text-black-600 font-semibold" >Total &nbsp;&nbsp;&nbsp; .............  ₹ {totalWithTax.toFixed(2)}</label>
                                            <label for="name" className="block text-sm mb-2 text-left  text-gray-600">(incl. total discount -₹{(subtotalExcludingTax.toLocaleString('en-PK') - totalWithDiscount.toLocaleString('en-PK')).toFixed(2)})</label>
                                        </div>
                                    )}
                                    {AmountTabs === 'Revenue' && (
                                        <div className='flex flex-col  items-end '>
                                            <label for="name" className="block  text-sm mb-2 text-left text-black-600" >Monthly recurring revenue (MRR)  &nbsp;&nbsp;&nbsp;.............  0</label>
                                            <label for="name" className="block  text-sm mb-2 text-left text-black-600 ">Annual recurring revenue (ARR) &nbsp;&nbsp;&nbsp; .............  0</label>
                                            <label for="name" className="block  text-sm mb-2 text-left text-black-600" >Annual contract value (ACV)  &nbsp;&nbsp;&nbsp; .............  ₹{totalWithDiscount.toFixed(2)}</label>
                                            <label for="name" className="block  text-sm mb-2 text-left text-black-600 " >Total contract value (TCV)&nbsp;&nbsp;&nbsp; .............  ₹{totalWithDiscount.toFixed(2)}</label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded close"
                                    onClick={() => { setDealProductModal(false); setEditDealtoProduct([]) }}
                                >
                                    Close
                                </button>
                                <div className="flex items-center px-3">
                                    <button type="sumbit" className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded">
                                        Save
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