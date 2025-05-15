/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLabel,
  getAllVisibleTo,
  getCurrency,
} from "../../Redux/CommonSlice";
import { handleAddDeal } from "../../Redux/DealSlice";
import { removeLeadmaster } from "../../Redux/LeadsSlice";
import { fetchApiData } from "../../Redux/organizationSlice";
import { getAllPerson } from "../../Redux/PersonSlice";
import moment from "moment";
import { formatNumber, sourceChannel } from "../Common/Common";
import ReactSelect from "../Common/ReactSelect";
import { FiPlusCircle } from "react-icons/fi";
import AddLabel from "../Common/AddLabel";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import PipelineStage from "../Common/pipelineStage";
import PhoneInput from "react-phone-input-2";

export default function AddDeals({ toggleModal, Deal, leadData, id, setloadFrist, name, dealID, UpdatePerson, }) {
  const { register, handleSubmit, setValue, watch, formState: { errors }, } = useForm();

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const store = useSelector((state) => state.root.common);
  const organizationstore = useSelector((state) => state.root.organization);
  const Peoplestore = useSelector((state) => state.root.Person);

  const [selectedMessage, setSelectedMessage] = useState("Qualified");
  const [selectedCurrency, setSelectedCurrency] = useState({ value: 63, label: "Indian Rupee(INR)", });
  const [openLabelModel, setOpenLabelModel] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(dealID ? { label: name, value: dealID } : null);
  const [SourceChannel, setSourceChannel] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState();
  const [selectedLable, setselectedLable] = useState(0);
  const [selectedVisible, setselectedVisible] = useState(1);
  const [allPhone, setAllPhone] = useState([{ phone: "", Type: "Home", country: 'in' }]);
  const [allEmail, setAllEmail] = useState([{ email: "", Type: "Home" }]);
  const [expectedCloseDate, setExpectedCloseDate] = useState(moment().format("YYYY-MM-DD"));
  const [Error, setError] = useState({});
  const value = watch("Value");

  useEffect(() => {
    dispatch(getCurrency({}));
    dispatch(getAllLabel({}));
    dispatch(getAllVisibleTo({}));
    dispatch(fetchApiData({}));
    dispatch(getAllPerson({}));
  }, []);

  useEffect(() => {
    if (Deal && Deal) {
      setValue("Title", Deal?.title);
      setValue("Value", Deal?.value);
      setValue("SourcechannelID", Deal?.sourceChannelID);
      if (Deal && Deal?.expectedCloseDate) { setExpectedCloseDate(moment(Deal?.expectedCloseDate).format("YYYY-MM-DD")) }
      if (Deal && Deal.peopleID) { setSelectedPerson({ label: Deal.personName, value: Deal.peopleID }); }
      if (Deal && Deal.organizationID) { setSelectedOrganization({ label: Deal?.organization?.organizationName, value: Deal.organizationID, }) }
      if (Deal && Deal.sourceChannel) { setSourceChannel({ label: Deal?.sourceChannel }) }
      if (Deal && Deal.labelID) setselectedLable({ label: Deal.labelName, value: Deal.labelID });
      if (Deal && Deal.visibleID) setselectedVisible({ label: Deal.visibleName, value: Deal.visibleID });
      if (Deal && Deal.currencyID) { setSelectedCurrency({ label: Deal.currencyName, value: Deal.currencyID, }); }
      if (Deal && Deal.pipelineStage) setSelectedMessage(Deal.pipelineStage ? Deal.pipelineStage : selectedMessage);
      if (Deal && Deal.dealPhoneDetails) { setAllPhone(Deal && Deal.dealPhoneDetails.map((x) => ({ phone: x.phoneNumber, Type: x.numberType, }))) }
      if (Deal && Deal.dealEmailDetails) { setAllEmail(Deal && Deal.dealEmailDetails.map((x) => ({ email: x.email, Type: x.type, }))); }

    } else if (leadData && leadData) {
      setValue("Title", leadData?.title);
      setValue("Value", leadData?.value);
      setValue("SourcechannelID", leadData?.sourceChannelID);
      if (leadData && leadData.sourceChannel) { setSourceChannel({ label: leadData?.sourceChannel }) }
      if (leadData && leadData?.expectedCloseDate) { setExpectedCloseDate(moment(leadData?.expectedCloseDate).format("YYYY-MM-DD")) }
      if (leadData && leadData?.peopleID) { setSelectedPerson({ label: leadData.person.name, value: leadData.person.personMasterID }); }
      if (leadData && leadData?.organizationID) { setSelectedOrganization({ label: leadData?.organization?.organizationName, value: leadData.organization.organizationID, }) }
      if (leadData && leadData?.labelID) setselectedLable({ label: leadData.labelName, value: leadData.labelID });
      if (leadData && leadData?.visibleID) setselectedVisible({ label: leadData.visibleName, value: leadData.visibleID });
      if (leadData && leadData?.currencyID) { setSelectedCurrency({ label: leadData.currencyName, value: leadData.currencyID, }); }
      if (leadData && leadData?.leadPhoneDetails) { setAllPhone(leadData && leadData.leadPhoneDetails.map((x) => ({ phone: x.phoneNumber, Type: x.numberType, }))) }
      if (leadData && leadData?.leadEmailDetails) { setAllEmail(leadData && leadData.leadEmailDetails.map((x) => ({ email: x.email, Type: x.type, }))); }
    }
  }, [Deal, leadData]);

  const handleButtonClick = (message) => { setSelectedMessage(message); };

  const handlePhoneChange = (value, index, country) => {
    const updatedPhones = [...allPhone];
    updatedPhones[index] = { ...updatedPhones[index], phone: value };
    updatedPhones[index] = { ...updatedPhones[index], country: country?.dialCode };
    setAllPhone(updatedPhones);

    const newErrors = { ...Error };
    delete newErrors[`Phone-${index}`];
    setError(newErrors)
  };

  const handleEmailChange = (e, index) => {
    const { value } = e.target;
    const updatedEmails = [...allEmail];
    updatedEmails[index].email = value;
    setAllEmail(updatedEmails);

    const newErrors = { ...Error };
    delete newErrors[`Email-${index}`];
    setError(newErrors)
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

  const handleDelete = async (id) => {
    try {
      dispatch(removeLeadmaster(id));
    } catch (error) {
      console.error("Error:", error);
    }
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
    if (Object.keys(validationErrors).length > 0) return setError(validationErrors);

    let PhoneDetails = [];
    let EmailDetails = [];

    allPhone?.map((item) => {
      let obj = {
        dealPhoneDetailID: 0,
        personMasterID: 0,
        phoneNumber: item?.phone,
        phoneType: item?.Type,
      };
      PhoneDetails?.push(obj);
    });

    allEmail?.map((item) => {
      let obj = {
        dealEmailDetailID: 0,
        email: item?.email,
        emailType: item?.Type,
      };
      EmailDetails?.push(obj);
    });

    let Params = {
      dealID: Deal?.dealID ? Deal?.dealID : 0,
      peopleID: selectedPerson?.value,
      organizationID: selectedOrganization?.value,
      title: data.Title,
      value: value ? value : 0,
      pipelineID: 0,
      pipelineStage: selectedMessage,
      CurrencyID: selectedCurrency && selectedCurrency?.value,
      labelID: selectedLable && selectedLable?.value,
      ownerID: 0,
      expectedCloseDate: expectedCloseDate,
      visibleID: selectedVisible && selectedVisible?.value,
      sourceChannelID: data?.SourcechannelID,
      sourceChannel: SourceChannel?.label,
      sourceType: "Manually created",
      userID: 0,
      projectID: 0,
      dealPhoneDetails: PhoneDetails,
      dealEmailDetails: EmailDetails,
      isWon: Deal?.isWon ? Deal?.isWon : Deal?.isWon === 0 ? 0 : 3,
      ProductMasterIDs: '',
      personMasterID: ''
    };

    try {

      if (leadData) {
        const id = leadData?.leadID
        handleDelete(id);
        dispatch(handleAddDeal(Params)).then((res) => {
          if (res.payload.status === true) {
            toast.remove()
            toast.success('Lead Converted to Deal Successfully!')
            navigate("/LeadInbox")
            setloadFrist(true)
            toggleModal();
            setSelectedCurrency("");
            setAllEmail([{ email: "", Type: "Home" }]);
            setAllPhone([{ phone: "", Type: "Home" }]);
          }
        });
      } else {
        dispatch(handleAddDeal(Params)).then((res) => {

          if (dealID) {
            const data = res?.payload?.data
            UpdatePerson(data)
          }
          if (res.payload.status === true) {
            toggleModal();
            setloadFrist(true)
            setSelectedCurrency("");
            setAllEmail([{ email: "", Type: "Home" }]);
            setAllPhone([{ phone: "", Type: "Home" }]);
          }
        });
      }
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
                {Deal?.dealID ? "Update Deals" : leadData ? "Convert to deal" : "Add Deals"}
              </h3>
              <AiOutlineCloseCircle
                className="text-3xl text-primary cursor-pointer"
                onClick={() => toggleModal()}
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="xl:w-full   relative p-4">
                <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 h-96 vertical-scroll-inner">
                  <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6">
                    <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3 ">
                      <div className="mb-5">
                        <label
                          for="name"
                          className="block mb-2 font-bold text-gray-600"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter Title"
                          className="border border-gray-300 shadow p-3 w-full rounded capitalize"
                          {...register("Title", { required: "Title is required", })}
                        />
                        {errors.Title && (<p className="text-red-500 text-sm font-bold">{errors.Title.message}</p>)}
                      </div>

                      <div className="mb-5" >
                        <label
                          for="name"
                          className="block mb-2 font-bold text-gray-600"
                        >
                          Pipeline
                        </label>
                        <PipelineStage selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} handleButtonClick={handleButtonClick} />
                      </div>
                      <div className="mb-5 flex gap-3 items-center">
                        <div className="w-full">
                          <label
                            for="Value"
                            className="block mb-2 font-bold text-gray-600"
                          >
                            Value
                          </label>
                          <input
                            type="text"
                            id="Value"
                            name="Value"
                            className="border border-gray-300 shadow p-3 w-full rounded mr-3"
                            placeholder="Enter Value"
                            {...register("Value",)}
                            onChange={(e) => {
                              // Extract numeric value and set it in form state
                              const rawValue = e.target.value.replace(/[^0-9]/g, '');
                              setValue("Value", rawValue,);
                            }}
                            value={formatNumber(value)}
                          />
                        </div>
                        <div className="w-full">
                          <label
                            for="name"
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
                            handleSelectChange={(option) => setSelectedCurrency(option)}
                          />
                        </div>
                      </div>
                      <div className="mb-5 flex gap-3 items-center">
                        <div className="w-full">
                          <label
                            for="Value"
                            className="block mb-2 font-bold text-gray-600"
                          >
                            Source channel ID
                          </label>
                          <input
                            type="number"
                            id="SourcechannelID"
                            name="SourcechannelID"
                            className="border border-gray-300 shadow p-3 w-full rounded mr-3"
                            placeholder="Enter Source channel ID"
                            {...register("SourcechannelID")}
                            min='0'
                          />
                        </div>
                        <div className="w-full">
                          <label
                            for="name"
                            className="block mb-2 font-bold text-gray-600"
                          >
                            Source channel
                          </label>
                          <ReactSelect
                            selectedValue={SourceChannel}
                            options={
                              sourceChannel && sourceChannel?.length > 0
                                ? sourceChannel.map((item) => ({
                                  value: item?.id,
                                  label: item?.name,
                                }))
                                : [{ value: "", label: "Not Found" }]
                            }
                            handleSelectChange={(option) => setSourceChannel(option)}
                          />
                        </div>
                      </div>
                      {!id ? (
                        <div className="mb-5">
                          <label
                            htmlFor="labelID"
                            className="block mb-2 font-bold text-gray-600"
                          >
                            Contact person
                          </label>
                          <ReactSelect
                            selectedValue={selectedPerson}
                            options={
                              Peoplestore &&
                                Peoplestore?.getAllPerson?.length > 0
                                ? Peoplestore.getAllPerson.map((item) => ({
                                  value: item?.personMasterID ?? "",
                                  label: item?.name,
                                }))
                                : [{ value: "", label: "Not Found" }]
                            }
                            handleSelectChange={(option) => setSelectedPerson(option)}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="mb-5">
                        <label
                          for="labelID"
                          className="block mb-2 font-bold text-gray-600"
                        >
                          Organization
                        </label>
                        <ReactSelect
                          selectedValue={selectedOrganization}
                          options={
                            organizationstore &&
                              organizationstore?.organizationData?.data?.length > 0
                              ? organizationstore?.organizationData?.data.map(
                                (item) => ({
                                  value: item?.organizationID ?? "",
                                  label: item?.organizationName,
                                })
                              )
                              : [{ value: "", label: "Not Found" }]
                          }
                          handleSelectChange={(option) => setSelectedOrganization(option)}
                        />
                      </div>

                      <div className="mb-5">
                        <label
                          for="Labels"
                          className="block mb-2 font-bold text-gray-600"
                        >
                          Labels
                        </label>
                        <div className="flex flex-row gap-3 " >
                          <ReactSelect
                            selectedValue={selectedLable}
                            options={
                              store && store?.getAllLabel?.length > 0
                                ? store?.getAllLabel.map((item) => ({
                                  value: item?.value,
                                  label: item?.text,
                                }))
                                : [{ value: "", label: "Not Found" }]
                            }
                            handleSelectChange={(option) => setselectedLable(option)}
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
                        <label className="block mb-2 font-bold text-gray-600">
                          Owner
                        </label>
                        <select
                          className="border border-gray-300 shadow p-3 w-full"
                          {...register("Owner")}
                          onChange={(e) => {
                            setValue("Owner", e.target.value);
                          }}
                        >
                          <option>User 1</option>
                          <option>User 2</option>
                          <option>User 3</option>
                          <option>User 4 </option>
                        </select>
                      </div>

                      <div className="mb-5">
                        <label className="block mb-2 font-bold text-gray-600">
                          Expected Close Date
                        </label>
                        <input
                          type="date"
                          id="Default_Datepicker"
                          className="border border-gray-300 shadow p-3 w-full"
                          name="foo"
                          placeholder="MM/DD/YYYY"
                          defaultValue={new Date().toISOString().substr(0, 10)}
                          value={expectedCloseDate}
                          onChange={(e) => {
                            setExpectedCloseDate(e.target.value);
                          }}
                        />

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
                            store && store?.getAllVisibleTo.length > 0
                              ? store?.getAllVisibleTo.map((item) => ({
                                value: item?.value,
                                label: item?.text,
                              }))
                              : [{ value: "", label: "Not Found" }]
                          }
                          handleSelectChange={(option) => setselectedVisible(option)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6">
                    <div className="bg-white dark:bg-slate-800 border border-gray-300 shadow rounded-md w-full relative p-3">
                      <h4 className="font-semibold text-base">PERSON</h4>
                      <div className="mb-5">
                        <label
                          for="name"
                          className="block mb-2 font-bold text-gray-600"
                        >
                          Phone
                        </label>
                        <div className="flex flex-col gap-3">
                          {allPhone?.map((item, index) => {
                            return (
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
                                  {Error[`Phone-${index}`] && (<p className="text-red-500 text-sm font-bold">{Error[`Phone-${index}`]}</p>)}
                                </div>

                                <select
                                  id={`Value_${index}`}
                                  className="border border-gray-300 shadow p-3 w-full"
                                  onChange={(e) =>
                                    handlePhoneTypeChange(e, index)
                                  }
                                  value={item?.Type}
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
                            );
                          })}
                        </div>
                        <button
                          type="button"
                          className="flex items-center mt-2  inline-block focus:outline-none text-white bg-primary-500 border border-gray-200 dark:bg-transparent dark:text-primary-500  text-sm font-medium py-1 px-3  rounded"
                          onClick={() => { setAllPhone([...allPhone, { phone: "", Type: "", },]); }}
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
                                <div className="w-full  ">
                                  <input
                                    type="text"
                                    id={`Email-[${index}]`}
                                    name={`Email-[${index}]`}
                                    placeholder="Enter Email"
                                    className="border border-gray-300 shadow p-3 w-full rounded mr-3"
                                    value={item?.email || ''}
                                    onChange={(e) => { handleEmailChange(e, index); }}
                                  />
                                  {Error[`Email-${index}`] && (<p className="text-red-500 text-sm font-bold">{Error[`Email-${index}`]}</p>)}
                                </div>

                                <select
                                  id={`Value_${index}`}
                                  className="border border-gray-300 shadow p-3 w-full"
                                  value={item.Type}
                                  onChange={(e) =>
                                    handleEmailTypeChange(e, index)
                                  }
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
                  onClick={() => toggleModal()}
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                >
                  {Deal?.dealID ? "Update" : "Save"}
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
}
