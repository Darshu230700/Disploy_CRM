/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, handleAddProduct, } from "../../Redux/ProductSlice";
import { getAllCategory, getAllVisibleTo, getCurrency } from "../../Redux/CommonSlice";
import ReactSelect from "../Common/ReactSelect";
import { FiPlusCircle } from "react-icons/fi";
import AddCategory from "../Common/AddCategory";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { formatNumber } from "../Common/Common";

export default function AddProduct({ toggleModal, product }) {
  const dispatch = useDispatch();
  const [loadFist, setLoadFist] = useState(true);
  const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm();
  const storecommon = useSelector((state) => state.root.common);

  const [selectedCurrency, setSelectedCurrency] = useState({ value: 63, label: "Indian Rupee(INR)", });
  const [selectedVisible, setselectedVisible] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [allUnitPrice, setAllUnitPrice] = useState([{
    unitprice: 0, cost: 0, currencyID: selectedCurrency.value, currencyName: selectedCurrency.label,
  }]);

  useEffect(() => {
    if (loadFist) {
      dispatch(getCurrency({}));
      dispatch(getAllVisibleTo({}));
      dispatch(getAllCategory({}));
      setLoadFist(false);
    }
  }, [storecommon, loadFist]);

  useEffect(() => {
    if (product) {
      setValue("Name", product?.name);
      setValue("productCode", product?.productCode);
      setValue("Unit", product?.unit);
      setValue("UnitPrices", product?.unitPrice);
      setValue("Tax", product?.taxper);
      setValue("Currency", product?.priceType);
      setValue("Category", product?.category);

      if (product && product?.visibleToID) setselectedVisible({ label: product?.visibleName, value: product?.visibleToID, });
      if (product && product?.categoryID) setSelectedCategory({ label: product?.categoryName, value: product?.categoryID, });

      if (product?.productPrice?.length > 0) {
        console.log('product?.productPrice :>> ', product?.productPrice);
        setAllUnitPrice(product?.productPrice.map((x) => ({ unitprice: x?.unitprice, cost: 0, currencyID: x?.currencyID, directCost: 0, currencyName: x?.currencyName })))
      }
    }
  }, [product]);

  const handleVisibleChange = (option) => { setselectedVisible(option); };

  const currencyOptions = storecommon && storecommon?.getCurrency?.length > 0 ? storecommon?.getCurrency?.map((item) => ({
    value: item?.value,
    label: item?.text,
    isDisabled: allUnitPrice.some((x) => x?.currencyID === item?.value),
  })) : [{ value: "", label: "Not Found" }];

  useEffect(() => {
    if (currencyOptions?.length > 0) {
      const indianRupee = currencyOptions?.find((x) => { return x?.label === "Indian Rupee(INR)" && !x?.isDisabled })
      const initialCurrency = indianRupee || currencyOptions?.find(option => !option?.isDisabled) || currencyOptions[0];
      setSelectedCurrency(initialCurrency)
    }
  }, [storecommon?.getCurrency]);

  const handleFieldChange = (index, fieldName, value, option) => {
    if (fieldName === 'unitprice') {
      const rawValue = value.replace(/[^0-9]/g, '');
      value = rawValue
    }

    const updatedUnitPrices = [...allUnitPrice];
    updatedUnitPrices[index] = { ...updatedUnitPrices[index], [fieldName]: value };
    if (fieldName === 'currencyID') {
      updatedUnitPrices[index].currencyName = option?.label ? option?.label : 'Indian Rupee';
    }
    setAllUnitPrice(updatedUnitPrices);
  };

  const onSubmit = (data) => {
    const Params = {
      productID: product && product.productID ? product.productID : 0,
      name: data?.Name,
      productCode: data?.productCode,
      categoryID: selectedCategory?.value,
      unit: data?.Unit,
      unitPrice: data?.UnitPrices,
      taxper: data?.Tax,
      visibleToID: selectedVisible.value,
      isactive: true,
      "productPrice": allUnitPrice
    };

    try {
      dispatch(handleAddProduct(Params)).then((res) => {
        if (res?.payload?.status === true) {
          dispatch(getProduct({}));
          toggleModal();
          setSelectedCurrency("");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"

      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {product.productID ? "Update Product" : " Add Product"}
              </h3>
              <AiOutlineCloseCircle
                className="text-3xl text-primary cursor-pointer"
                onClick={() => {
                  toggleModal();
                }}
              />
            </div>
            {/* Modal body */}
            <form className=" " onSubmit={handleSubmit(onSubmit)}>
              <div className="h-96  vertical-scroll-inner relative px-8  md:p-5">
                <div className="px-3">
                  <div className="grid gap-4 mb-3 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="name"
                        className="block mb-1 font-bold text-gray-600"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        {...register("Name", { required: "Product Name is Required", })}
                        name="Name"
                        id="Name"
                        className="capitalize bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Product Name"
                        required=""
                      />
                      {errors.Name && (<span className="error text-red-600 text-base font-bold">{errors.Name.message}</span>)}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="code"
                        className="block mb-1 font-bold text-gray-600"
                      >
                        Product code
                      </label>
                      <input
                        type="number"
                        min="0"
                        {...register("productCode")}
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Product code"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 mb-3 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="name"
                        className="block mb-1 font-bold text-gray-600"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="0"
                        {...register("Unit", { required: "Unit is Required", })}
                        name="Unit"
                        id="Unit"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Unit"

                      />
                      {errors?.Unit && (
                        <span className="error text-red-600 text-base font-bold">
                          {errors.Unit.message}
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="name"
                        className="block mb-1 font-bold text-gray-600"
                      >
                        Tax %
                      </label>
                      <input
                        type="number"
                        min="0"
                        {...register("Tax", {
                          required: "Tax is Required",
                        })}
                        name="Tax"
                        id="Tax"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Tax %"
                      />
                      {errors.Tax && (
                        <span className="error text-red-600 text-base font-bold">
                          {errors.Tax.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-4 mb-3 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        for="Labels"
                        className="block mb-1 font-bold text-gray-600"
                      >
                        Category
                      </label>
                      <div className="flex flex-row gap-3 " >
                        <ReactSelect
                          selectedValue={selectedCategory}
                          options={
                            storecommon && storecommon?.getCategorys.length > 0
                              ? storecommon?.getCategorys.map((item) => ({
                                value: item?.categoryID,
                                label: item?.categoryName,
                              }))
                              : [{ value: "", label: "Not Found" }]
                          }
                          handleSelectChange={(option) => setSelectedCategory(option)}
                        />
                        <FiPlusCircle
                          size={30}
                          onClick={() => {
                            setOpenCategoryModal(true);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        for="Labels"
                        className="block mb-1 font-bold text-gray-600"
                      >
                        Visible to
                      </label>
                      <ReactSelect
                        selectedValue={selectedVisible}
                        options={
                          storecommon && storecommon?.getAllVisibleTo.length > 0
                            ? storecommon?.getAllVisibleTo.map((item) => ({
                              value: item?.value,
                              label: item?.text,
                            }))
                            : [{ value: "", label: "Not Found" }]
                        }
                        handleSelectChange={handleVisibleChange}
                      />
                    </div>
                  </div>
                  {allUnitPrice?.map((item, index) => {
                    return (
                      <div className="grid gap-4 mb-3 grid-cols-2" key={index}>
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor={`UnitPrices_${index}`}
                            className="block mb-1 font-bold text-gray-600"
                          >
                            Unit Prices
                          </label>
                          <input
                            type="text"
                            {...register(`UnitPrices_${index}`, {
                              required: "Unit Price is Required",
                              // valueAsNumber: true, // Ensures the value is parsed as a number
                            })}
                            name={`UnitPrices_${index}`}
                            id={`UnitPrices_${index}`}
                            className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Enter Unit prices"
                            min="0"
                            value={formatNumber(item?.unitprice || '')}
                            onChange={(e) => {
                              handleFieldChange(index, 'unitprice', e.target.value)
                              clearErrors(`UnitPrices_${index}`)
                            }}
                          />
                          {errors[`UnitPrices_${index}`] && (
                            <span className="error text-red-600 text-base font-bold">
                              {errors[`UnitPrices_${index}`]?.message}
                            </span>
                          )}
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor={`Currency_${index}`}
                            className="block mb-1 font-bold text-gray-600"
                          >
                            Currency
                          </label>
                          <div className="flex items-center gap-2">
                            <ReactSelect
                              Clearable={false}
                              selectedValue={
                                storecommon?.getCurrency?.find(x => x?.value === item?.currencyID)
                                  ? { value: item?.currencyID, label: item?.currencyName }
                                  : null
                              }

                              options={currencyOptions}
                              handleSelectChange={(option) => handleFieldChange(index, 'currencyID', option?.value, option)}

                            />
                            <RiDeleteBinLine
                              className='ms-2'
                              size={20}
                              onClick={() => {
                                const updatedQuestions = allUnitPrice.filter((_, i) => i !== index);
                                setAllUnitPrice(updatedQuestions);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    className="flex items-center mt-2  inline-block focus:outline-none text-white bg-primary-500 border border-gray-200 dark:bg-transparent dark:text-primary-500  text-sm font-medium py-1 px-3  rounded"
                    onClick={() => {
                      if (currencyOptions?.length > 0) {
                        const indianRupee = currencyOptions?.find((option) => option?.value === 63 && !option?.isDisabled);
                        const initialCurrency = indianRupee || currencyOptions?.find(option => !option?.isDisabled) || currencyOptions[0];
                        setAllUnitPrice([...allUnitPrice, { unitprice: 0, cost: 0, currencyID: initialCurrency?.value, currencyName: initialCurrency?.label },]);
                      }
                    }}
                  >
                    <FaPlus /><span className='text-white text-sm font-semibold  px-2.5 py-0.5 rounde'> Price</span>
                  </button>
                </div>
              </div>
              <div className="mt-1 flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                <button
                  type="button"
                  className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                  onClick={toggleModal}
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-gray-300 border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                >
                  {product?.productID ? "Update" : "Save"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

      {openCategoryModal && (<AddCategory setOpenCategoryModal={setOpenCategoryModal} />)}
    </>
  );
}
