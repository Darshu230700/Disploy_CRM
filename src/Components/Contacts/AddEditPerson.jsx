/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllLabel, getAllVisibleTo } from "../../Redux/CommonSlice";
import { handleAddPerson, } from "../../Redux/PersonSlice";
import { fetchApiData } from "../../Redux/organizationSlice";
import ReactSelect from "../Common/ReactSelect";
import { FiPlusCircle } from "react-icons/fi";
import AddLabel from "../Common/AddLabel";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import PhoneInput from "react-phone-input-2";

const AddEditPerson = ({ togglemodel, Person, setLoadFirst }) => {
  const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.root.common);
  const organizationstore = useSelector((state) => state.root.organization);

  const [selectedOrganization, setSelectedOrganization] = useState(0);
  const [selectedVisible, setselectedVisible] = useState(1);
  const [selectedLable, setselectedLable] = useState(0);
  const [allPhone, setAllPhone] = useState([{ phone: "", Type: "Home", country: 'in' }]);
  const [allEmail, setAllEmail] = useState([{ email: "", Type: "Home" }]);
  const [openLabelModel, setOpenLabelModel] = useState(false);
  const [error, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllLabel({}));
    dispatch(getAllVisibleTo({}));
    dispatch(fetchApiData({}))
  }, []);

  useEffect(() => {
    if (Person && Person) {
      setValue("name", Person.name)
      if (Person && Person.organizationID) { setSelectedOrganization({ label: Person.organizationName, value: Person.organizationID }) }
      if (Person && Person.labelID) setselectedLable({ label: Person.labelName, value: Person.labelID })
      if (Person && Person.visibleToID) setselectedVisible({ label: Person.visibleName, value: Person.visibleToID })

      if (Person.personPhoneDetails) {
        setAllPhone(
          Person && Person.personPhoneDetails.map((x) => ({
            phone: x.phoneNumber,
            Type: x.phoneType,
          }))
        );
      }
      if (Person.personEmailDetails) {
        setAllEmail(
          Person && Person.personEmailDetails.map((x) => ({
            email: x.email,
            Type: x.emailType,
          }))
        );
      }
    }
  }, [Person]);


  const handleOrgChange = (selectedOption) => { setSelectedOrganization(selectedOption); };
  const handleVisibleChange = (selectedOption) => { setselectedVisible(selectedOption); };
  const handleLableChange = (selectedOption) => { setselectedLable(selectedOption); };

  const handlePhoneChange = (value, index, country) => {
    const updatedPhones = [...allPhone];
    updatedPhones[index] = { ...updatedPhones[index], phone: value };
    updatedPhones[index] = { ...updatedPhones[index], country: country?.dialCode };
    setAllPhone(updatedPhones);

    const newErrors = { ...Error };
    delete newErrors[`Phone-${index}`];
    setErrors(newErrors)
  };


  const handleEmailChange = (event, index) => {
    const { value } = event.target;
    const updatedEmails = [...allEmail];
    updatedEmails[index].email = value;
    setAllEmail(updatedEmails);

    const newErrors = { ...error };
    delete newErrors[`Email-${index}`];
    setErrors(newErrors)
  };

  const handleEmailTypeChange = (e, index) => {
    const { value } = e.target;
    const updatedEmails = [...allEmail];
    updatedEmails[index].Type = value;
    setAllEmail(updatedEmails);
  };

  const handlePhoneTypeChange = (e, index) => {
    const { value } = e.target;
    const updatedPhones = [...allPhone];
    updatedPhones[index].Type = value;
    setAllPhone(updatedPhones);
  };

  const validateFields = () => {
    const newErrors = {};

    const phoneNumbers = allPhone.map(item => item?.phone?.trim());
    const phoneNumberCount = phoneNumbers.reduce((count, phone) => {
      count[phone] = (count[phone] || 0) + 1;
      return count;
    }, {});

    allPhone.forEach((item, index) => {
      const phoneNumber = item?.phone?.trim();
      const countryCode = item?.country?.length

      if (!item.phone) {
        newErrors[`Phone-${index}`] = 'Phone Number is required';
      } else if ((countryCode === 1 && phoneNumber?.length <= 10) || (countryCode === 2 && phoneNumber?.length <= 11) || (countryCode === 3 && (phoneNumber?.length <= 10))) {
        newErrors[`Phone-${index}`] = 'Invalid Phone Number';
      } else if (phoneNumberCount[phoneNumber] > 1) {
        if (phoneNumbers.indexOf(phoneNumber) !== index) {
          newErrors[`Phone-${index}`] = 'Phone Number already exists';
        }
      }

    });
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const emailAddresses = allEmail.map(item => item?.email?.trim());
    const emailCount = emailAddresses.reduce((count, email) => {
      count[email] = (count[email] || 0) + 1;
      return count;
    }, {});

    allEmail.forEach((item, index) => {
      const email = item?.email?.trim();
      if (!email) {
        newErrors[`Email-${index}`] = 'Email is required';
      }
      else if (!emailRegex.test(email)) {
        newErrors[`Email-${index}`] = 'Invalid Email address';
      }
      else if (emailCount[email] > 1) {
        if (emailAddresses.indexOf(email) !== index) {
          newErrors[`Email-${index}`] = 'Email already exists';
        }
      }
    });
    return newErrors;
  };

  const onSubmit = (data) => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) return setErrors(validationErrors);

    let PhoneDetails = [];
    let EmailDetails = [];

    allPhone?.map((item) => {
      let obj = {
        personPhoneDetailsID: 0,
        personMasterID: 0,
        phoneNumber: item?.phone,
        phoneType: item?.Type,
      };
      PhoneDetails?.push(obj);
    });

    allEmail?.map((item) => {
      let obj = {
        personEmailDetailsID: 0,
        personMasterID: 0,
        email: item?.email,
        emailType: item?.Type,
      };
      EmailDetails?.push(obj);
    });

    let Params = {
      personMasterID: Person?.personMasterID ? Person?.personMasterID : 0,
      name: data?.name,
      organizationID: selectedOrganization && selectedOrganization.value,
      labelID: selectedLable.value,
      ownerID: 0,
      visibleToID: selectedVisible && selectedVisible.value,
      userID: 0,
      personPhoneDetails: PhoneDetails,
      personEmailDetails: EmailDetails,
    };

    try {
      dispatch(handleAddPerson(Params)).then((res) => {
        if (res?.payload?.status === true) {
          setLoadFirst(true)
          togglemodel();
          setAllEmail([{ email: "", Type: "Home", },]);
          setAllPhone([{ phone: "", Type: "Home", },]);
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
                {Person?.personMasterID ? "Update Person" : "Add Person"}
              </h3>
              <AiOutlineCloseCircle
                className="text-3xl text-primary cursor-pointer"
                onClick={() => togglemodel()}
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="xl:w-full h-96 vertical-scroll-inner relative p-4">
                <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                  <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6">
                    <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
                      <div className="mb-5">
                        <label
                          for="name"
                          className="block mb-2 font-bold text-gray-600"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter Name"
                          className="border border-gray-300 shadow p-3 w-full rounded capitalize"
                          {...register("name", { required: "Name is required", })}
                        />
                        {errors.name && (
                          <p className="error text-red-500 text-sm font-bold">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="mb-5">
                        <label for="labelID" className="block mb-2 font-bold text-gray-600"> Organization </label>
                        <ReactSelect
                          selectedValue={selectedOrganization}
                          options={
                            organizationstore && organizationstore?.organizationData?.data?.length > 0 ? (
                              organizationstore?.organizationData?.data.map(item => ({
                                value: item?.organizationID ?? '',
                                label: item?.organizationName
                              }))) : [{ value: '', label: 'Not Found' }]

                          }
                          handleSelectChange={handleOrgChange}
                        />
                      </div>

                      <div className="mb-5">
                        <label
                          for="labelID"
                          className="block mb-2 font-bold text-gray-600"
                        >
                          Label
                        </label>
                        <div className="flex items-center gap-3">

                          <ReactSelect
                            selectedValue={selectedLable}
                            options={
                              store && store?.getAllLabel?.length > 0 ? (
                                store?.getAllLabel.map(item => ({
                                  value: item?.value,
                                  label: item?.text
                                }))) : [{ value: '', label: 'Not Found' }]
                            }
                            handleSelectChange={handleLableChange}
                          />
                          <FiPlusCircle
                            size={30}
                            onClick={() => {
                              setOpenLabelModel(true);
                            }}
                          />
                        </div>
                      </div>

                      <div className="mb-5">
                        <label
                          for="Labels"
                          className="block mb-2 font-bold text-gray-600">Owner</label>
                        <input
                          type="text"
                          {...register("Owner")}
                          className="border border-gray-300 shadow p-3 w-full rounded capitalize" />
                      </div>

                      <div className="mb-5">
                        <label
                          for="Labels"
                          className="block mb-2 font-bold text-gray-600"
                        >
                          Visible to
                        </label>
                        <ReactSelect
                          selectedValue={selectedVisible}
                          options={
                            store && store?.getAllVisibleTo?.length > 0 ? (
                              store?.getAllVisibleTo.map(item => ({
                                value: item?.value,
                                label: item?.text
                              }))) : [{ value: '', label: 'Not Found' }]
                          }
                          handleSelectChange={handleVisibleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6">
                    <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3">

                      <div className="mb-5">
                        <label
                          for="phoneNumber"
                          className="block mb-2 font-bold text-gray-600"
                        >
                          Phone
                        </label>
                        <div className="flex flex-col gap-3">
                          {allPhone?.map((item, index) => {
                            return (
                              <>
                                <div key={index} className="flex items-center gap-3">
                                  <div className="w-full">
                                    <PhoneInput
                                      value={item?.phone}
                                      onChange={(value, country) => handlePhoneChange(value, index, country)}
                                      id={`phone_${index}`}
                                      country="in"
                                      error={true}
                                      inputProps={{
                                        name: 'phone',
                                        country: 'in',
                                        required: true,
                                        autoFocus: true,
                                        style: { width: '100%', border: '1px solid #e4e4e7' },
                                      }}
                                    />
                                    {error[`Phone-${index}`] && (<p className="text-red-500 text-sm font-bold">{error[`Phone-${index}`]}</p>)}
                                  </div>

                                  <select
                                    id={`Value_${index}`}
                                    onChange={(e) =>
                                      handlePhoneTypeChange(e, index)
                                    }
                                    value={item?.Type}
                                    className="border border-gray-300 shadow p-2 w-full"
                                  >
                                    <option>Work</option>
                                    <option>Home</option>
                                    <option>Mobile</option>
                                    <option>Other</option>
                                  </select>
                                  <RiDeleteBinLine
                                    className='ms-2'
                                    size={45}
                                    onClick={() => {
                                      const updatedQuestions = allPhone.filter((_, i) => i !== index);
                                      setAllPhone(updatedQuestions);
                                    }}
                                  />

                                </div>
                              </>
                            );
                          })}
                        </div>
                        <button
                          type="button"
                          className="flex items-center mt-2  inline-block focus:outline-none text-white bg-primary-500 border border-gray-200 dark:bg-transparent dark:text-primary-500  text-sm font-medium py-1 px-3  rounded"
                          onClick={() => { setAllPhone([...allPhone, { phone: "", Type: "", country: 'in' },]); }}
                        >
                          <FaPlus /><span className='text-white text-sm font-semibold  px-2.5 py-0.5 rounde'> Phone</span>
                        </button>
                      </div>

                      <div className="mb-5">
                        <label
                          for="name"
                          className="block mb-2 font-bold text-gray-600"
                        >
                          Email
                        </label>
                        <div className="flex flex-col gap-3">
                          {allEmail?.map((item, index) => {

                            return (
                              <div key={index} className="flex items-center gap-3">
                                <div key={index} className="w-full  ">

                                  <input
                                    type="text"
                                    id={`Email-[${index}]`}
                                    name={`Email-[${index}]`}
                                    placeholder="Enter Email"
                                    className="border border-gray-300 shadow p-3 w-full rounded mr-3"
                                    value={item?.email || ''}
                                    onChange={(e) => { handleEmailChange(e, index); }}
                                  />
                                  {error[`Email-${index}`] && (<p className="text-red-500 text-sm font-bold">{error[`Email-${index}`]}</p>)}

                                </div>
                                <select
                                  id={`Value_${index}`}
                                  value={item.Type}
                                  onChange={(e) =>
                                    handleEmailTypeChange(e, index)
                                  }
                                  className="border border-gray-300 shadow p-3 w-full"
                                >
                                  <option value="Work">Work</option>
                                  <option value="Home">Home</option>
                                  <option value="Other">Other</option>
                                </select>
                                <RiDeleteBinLine
                                  className='ms-2'
                                  size={45}
                                  onClick={() => {
                                    const updatedQuestions = allEmail.filter((_, i) => i !== index);
                                    setAllEmail(updatedQuestions);
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                        <button
                          type="button"
                          className="flex items-center mt-2  inline-block focus:outline-none text-white bg-primary-500 border border-gray-200 dark:bg-transparent dark:text-primary-500  text-sm font-medium py-1 px-3  rounded"
                          onClick={() => { setAllEmail([...allEmail, { email: "", Type: "", },]); }}
                        >
                          <FaPlus /><span className='text-white text-sm font-semibold  px-2.5 py-0.5 rounde'> Email</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                <button
                  type="button"
                  className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                  onClick={() => togglemodel()}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white border border-gray-200 bg-gray-300 text-sm py-1 px-3 rounded"
                >
                  {Person?.personMasterID ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {openLabelModel && (
        <AddLabel
          setOpenLabelModel={setOpenLabelModel}
          openLabelModel={openLabelModel}
        />
      )}
    </>
  );
};

export default AddEditPerson;
