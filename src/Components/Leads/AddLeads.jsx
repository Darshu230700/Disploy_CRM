/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLabel, getAllVisibleTo, getCurrency } from '../../Redux/CommonSlice';
import 'react-datepicker/dist/react-datepicker.css';
import { addORUpdateLeadMaster, } from '../../Redux/LeadsSlice';
import ReactSelect from '../Common/ReactSelect';
import { getAllPerson } from '../../Redux/PersonSlice';
import { fetchApiData } from '../../Redux/organizationSlice';
import { FiPlusCircle } from 'react-icons/fi';
import AddLabel from '../Common/AddLabel';
import moment from 'moment';
import { deleteDeal } from '../../Redux/DealSlice';
import { useNavigate } from 'react-router-dom';
import { formatNumber, sourceChannel } from '../Common/Common';
import { FaPlus } from 'react-icons/fa6';
import { RiDeleteBinLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';


const AddLeads = ({ togglemodelLead, leadData, setLoadFistInbox }) => {
    const [formData, setFormData] = useState({
        title: '',
        value: '',
        ownerID: '',
        expectedCloseDate: '',
        sourceChannelID: 0,
        ...leadData,
    });
    console.log('formData :>> ', formData);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const store = useSelector((state) => state.root.common);
    const Peoplestore = useSelector((state) => state.root.Person);
    const organizationstore = useSelector((state) => state.root.organization);

    const [allPhone, setAllPhone] = useState([{ phone: '', type: '', country: 'in' }]);
    const [allEmail, setAllEmail] = useState([{ email: '', type: '' }]);
    const [expectedCloseDate, setExpectedCloseDate] = useState(moment().format("YYYY-MM-DD"));
    const [selectedPerson, setselectedPerson] = useState('');
    const [selectedOrganization, setselectedOrganization] = useState('');
    const [selectedCurrency, setselectedCurrency] = useState({ value: 63, label: "Indian Rupee(INR)", });
    const [selectedLable, setselectedLable] = useState(0);
    const [openLabelModel, setOpenLabelModel] = useState(false);
    const [selectedVisible, setselectedVisible] = useState(1);
    const [Error, setError] = useState({});
    const [SourceChannel, setSourceChannel] = useState('');

    useEffect(() => {
        dispatch(getCurrency({}))
        dispatch(getAllLabel({}))
        dispatch(getAllVisibleTo({}))
        dispatch(getAllPerson({}));
        dispatch(fetchApiData({}));
    }, [dispatch]);

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ...leadData,
        }));
    }, [leadData]);


    useEffect(() => {
        if (leadData) {
            if (leadData && leadData.sourceChannel) { setSourceChannel({ label: leadData?.sourceChannel, value: leadData?.sourceChannel }) }
            if (leadData && leadData?.leadEmailDetails) { setAllEmail(leadData?.leadEmailDetails.map((emailItem) => ({ email: emailItem?.email, type: emailItem?.emailType }))) }
            if (leadData && leadData?.leadPhoneDetails) { setAllPhone(leadData?.leadPhoneDetails.map((phoneItem) => ({ phone: phoneItem?.phoneNumber, type: phoneItem?.numberType }))) }

            if (leadData && leadData?.dealEmailDetails) { setAllEmail(leadData?.dealEmailDetails.map((emailItem) => ({ email: emailItem?.email, type: emailItem?.emailType }))) }
            if (leadData && leadData?.dealPhoneDetails) { setAllPhone(leadData?.dealPhoneDetails.map((phoneItem) => ({ phone: phoneItem?.phoneNumber, type: phoneItem?.numberType }))) }

            if (leadData && leadData?.expectedCloseDate) { setExpectedCloseDate(moment(leadData?.expectedCloseDate).format("YYYY-MM-DD")) }
            if (leadData && leadData?.organizationID) { setselectedOrganization({ label: leadData?.organization?.organizationName, value: leadData?.organizationID, }) }
            if (leadData && leadData?.peopleID) { setselectedPerson({ label: leadData?.person?.name, value: leadData?.peopleID }); }
            if (leadData && leadData?.labelID) setselectedLable({ label: leadData?.labelName, value: leadData?.labelID });
            if (leadData && leadData?.visibleID) setselectedVisible({ label: leadData?.visibleName, value: leadData?.visibleID });
            if (leadData && leadData?.currencyID) { setselectedCurrency({ label: leadData?.currencyName, value: leadData?.currencyID, }); }
        }
    }, [store, leadData]);

    const handlePersonChange = (option) => {
        setselectedPerson(option)
    }

    const handleChange = (e) => {
        if (e.target.name === 'value') {
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            e.target.value = rawValue
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhoneChange = (value, index, country) => {
        const updatedPhones = [...allPhone];
        updatedPhones[index] = { ...updatedPhones[index], phone: value };
        // updatedPhones[index] = { ...updatedPhones[index], country: country?.countryCode.toUpperCase() };
        updatedPhones[index] = { ...updatedPhones[index], country: country?.dialCode };
        setAllPhone(updatedPhones);

        const newErrors = { ...Error };
        delete newErrors[`Phone-${index}`];
        setError(newErrors)
    };

    // const handlePhoneChange = (event, index) => {
    //     let inputValue = event?.target?.value?.replace(/\D/g, '');
    //     if (inputValue?.length > 10) {
    //         inputValue = inputValue?.slice(0, 10);
    //     }
    //     const updatedPhones = [...allPhone];
    //     updatedPhones[index].phone = inputValue;
    //     setAllPhone(updatedPhones);

    //     const newErrors = { ...Error };
    //     delete newErrors[`Phone-${index}`];
    //     setError(newErrors)
    // };

    const handlePhoneTypeChange = (e, index) => {
        const { value } = e.target;
        const updatedPhones = [...allPhone];
        updatedPhones[index].type = value;
        setAllPhone(updatedPhones);
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
        updatedEmails[index].type = value;
        setAllEmail(updatedEmails);
    };

    const closeModel = () => {
        togglemodelLead()
        setFormData({
            title: '',
            value: '',
            ownerID: '',
        });
        setError('')
    }

    const validateFields = () => {
        const newErrors = {};
        if (!formData?.title) {
            newErrors.title = 'Title is Required';
        } if (!selectedPerson?.value) {
            newErrors.person = 'Person is Required';
        } if (!selectedOrganization?.value) {
            newErrors.organization = 'Organization is Required';
        }

        const phoneNumbers = allPhone?.map(item => item?.phone?.trim());
        const phoneNumberCount = phoneNumbers?.reduce((count, phone) => {
            count[phone] = (count[phone] || 0) + 1;
            return count;
        }, {});

        allPhone.forEach((item, index) => {
            const phoneNumber = item?.phone?.trim()
            const countryCode = item?.country?.length

            // const countryCodes = item?.country
            // const phoneNumbers = parsePhoneNumberFromString(phoneNumber, countryCodes);
            // console.log('phoneNumbers :>> ', phoneNumbers);
            // console.log('phoneNumbers :>> ', isPossiblePhoneNumber(phoneNumbers?.number,phoneNumbers?.country));

            if (!item.phone) {
                newErrors[`Phone-${index}`] = 'Phone Number is required';
            } else if ((countryCode === 1 && phoneNumber?.length <= 10) || (countryCode === 2 && phoneNumber?.length <= 11) || (countryCode === 3 && (phoneNumber?.length <= 10 || !/^\d+$/.test(phoneNumber)))) {
                newErrors[`Phone-${index}`] = 'Invalid Phone Number';
            } else if (phoneNumberCount[phoneNumber] > 1) {
                if (phoneNumbers?.indexOf(phoneNumber) !== index) {
                    newErrors[`Phone-${index}`] = 'Phone Number already exists';
                }
            }

        });
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const emailAddresses = allEmail?.map(item => item?.email?.trim());
        const emailCount = emailAddresses?.reduce((count, email) => {
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
                if (emailAddresses?.indexOf(email) !== index) {
                    newErrors[`Email-${index}`] = 'Email already exists';
                }
            }
        });
        return newErrors;
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) return setError(validationErrors);

        const payload = {
            leadID: leadData && leadData.leadID ? leadData.leadID : 0,
            peopleID: selectedPerson?.value,
            organizationID: selectedOrganization && selectedOrganization.value,
            title: formData?.title,
            value: formData?.value,
            currencyID: selectedCurrency && selectedCurrency?.value,
            labelID: selectedLable && selectedLable.value,
            ownerID: 0,
            // ownerID: formData.ownerID && formData.ownerID ? formData.ownerID : leadData?.ownerID,
            ExpectedCloseDate: expectedCloseDate && expectedCloseDate,
            visibleID: selectedVisible && selectedVisible?.value,
            sourceType: "Manually created",
            sourceChannelID: formData?.sourceChannelID,
            sourceChannel: SourceChannel?.label,
            leadPhoneDetails: allPhone.map((item) => ({
                leadPhoneDetailID: 0,
                leadMasterID: 0,
                phoneNumber: item?.phone,
                numberType: item?.type
            })),
            leadEmailDetails: allEmail.map((item) => ({
                leadEmailDetailID: 0,
                leadMasterID: 0,
                email: item.email,
                emailType: item.type
            }))
        }

        if (leadData?.dealID) {
            dispatch(deleteDeal(leadData?.dealID))
            navigate('/Deals')
        }

        dispatch(addORUpdateLeadMaster(payload)).then((res) => {
            toast.remove()
            if (res.payload.status === true) {
                setLoadFistInbox(true)
                if (leadData?.dealID) {
                    toast.success('Deal Converted to lead Successfully!')
                } else {
                    toast.success(res?.payload?.message)
                }
            }
            closeModel()
        });
    };

    return (
        <>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"

            >
                <div className="relative p-4 w-full max-w-2xl max-h-full ">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {leadData && leadData.leadID ? 'Update' : leadData?.dealID ? "Convert to" : 'Add'} lead
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={closeModel}
                            />
                        </div>
                        <>
                            <form onSubmit={onSubmitForm}>
                                <div className="xl:w-full relative p-4">
                                    <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 h-96 vertical-scroll-inner">
                                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6">
                                            <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
                                                <div className="mb-5">
                                                    <label className="block mb-2 font-bold text-gray-600">Contact person</label>
                                                    <ReactSelect
                                                        selectedValue={selectedPerson}
                                                        options={
                                                            Peoplestore &&
                                                                Peoplestore?.getAllPerson?.length > 0
                                                                ? Peoplestore?.getAllPerson.map((item) => ({
                                                                    value: item?.personMasterID ?? "",
                                                                    label: item?.name,
                                                                }))
                                                                : [{ value: "", label: "Not Found" }]
                                                        }
                                                        handleSelectChange={handlePersonChange}
                                                    />
                                                    {selectedPerson?.label && selectedPerson?.label?.length > 0 ? "" : Error?.person && (
                                                        <div className='error text-red-500 text-sm font-bold' >{Error?.person}</div>
                                                    )}
                                                </div>
                                                <div className="mb-5">
                                                    <label className="block mb-2 font-bold text-gray-600">Organization</label>
                                                    <ReactSelect
                                                        selectedValue={selectedOrganization}
                                                        options={
                                                            organizationstore &&
                                                                organizationstore?.organizationData?.data?.length >
                                                                0
                                                                ? organizationstore?.organizationData?.data.map(
                                                                    (item) => ({
                                                                        value: item?.organizationID ?? "",
                                                                        label: item?.organizationName,
                                                                    })
                                                                )
                                                                : [{ value: "", label: "Not Found" }]
                                                        }
                                                        handleSelectChange={(option) => setselectedOrganization(option)}
                                                    />
                                                    {selectedOrganization?.label && selectedOrganization?.label?.length > 0 ? "" : Error?.organization && (
                                                        <div className='error text-red-500 text-sm font-bold' >{Error?.organization}</div>
                                                    )}
                                                </div>

                                                <div className="mb-5">
                                                    <label for="name" className="block mb-2 font-bold text-gray-600">Title</label>
                                                    <input type="text"
                                                        name="title"
                                                        className={`border border-gray-300 shadow p-3 w-full rounded-lg capitalize`}
                                                        onChange={handleChange}
                                                        value={formData.title}
                                                        maxlength='50'

                                                    />
                                                    {formData?.title && formData?.title?.length > 0 ? "" : Error?.title && (
                                                        <div className='error text-red-500 text-sm font-bold' >{Error?.title}</div>
                                                    )}
                                                </div>

                                                <div className="mb-5 flex gap-3 items-center">
                                                    <div className='w-full'>
                                                        <label for="name" className="block mb-2 font-bold text-gray-600">Value</label>
                                                        <input type="text"
                                                            name="value"
                                                            className="border border-gray-300 shadow p-3 w-full rounded rounded-lg"
                                                            onChange={handleChange}
                                                            value={formatNumber(formData?.value)}
                                                            min="0"
                                                            // pattern="^^\d*\.?\d*$"
                                                        />
                                                    </div>
                                                    <div className="w-full">
                                                        <label className="block mb-2 font-bold text-gray-600">Currency</label>
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
                                                </div>
                                                <div className="mb-5 flex gap-3 items-center">
                                                    <div className='w-full'>
                                                        <label for="Value" className="block mb-2 font-bold text-gray-600">
                                                            Source channel ID
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="sourceChannelID"
                                                            className="border border-gray-300 shadow p-3 w-full rounded mr-3"
                                                            placeholder="Enter Source channel ID"
                                                            value={formData.sourceChannelID}
                                                            onChange={handleChange}
                                                            min="0"
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

                                                <div className="mb-5">
                                                    <label for="name" className="block mb-2 font-bold text-gray-600">Labels</label>
                                                    <div className='flex items-center gap-3'>
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
                                                    <label for="Labels" className="block mb-2 font-bold text-gray-600">Owner</label>
                                                    <input
                                                        as="select"
                                                        id="ownerID"
                                                        name="ownerID"
                                                        className="border border-gray-300 shadow p-3 w-full rounded-lg"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label for="expectedCloseDate" className="block mb-2 font-bold text-gray-600">Expected Date</label>
                                                    <input
                                                        type='date'
                                                        name='expectedCloseDate'
                                                        dateFormat="MM/dd/yyyy"
                                                        placeholderText="MM/dd/yyyy"
                                                        className="border border-gray-300 shadow p-3 w-full rounded-lg"
                                                        value={expectedCloseDate}
                                                        onChange={(e) => {
                                                            setExpectedCloseDate(e.target.value);
                                                        }}
                                                    />
                                                </div>

                                                <div className="mb-5">
                                                    <label for="expectedCloseDate" className="block mb-2 font-bold text-gray-600">Visible to</label>
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
                                                    <label for="name" className="block mb-2 font-bold text-gray-600">Phone</label>
                                                    <div className='flex flex-col gap-3'>
                                                        {allPhone?.map((item, index) => (
                                                            <div key={item?.id || index} className="flex items-center gap-3">
                                                                <div className="w-full">

                                                                    <PhoneInput
                                                                        value={item?.phone}
                                                                        onChange={(value, country) => handlePhoneChange(value, index, country)}
                                                                        id={`phone_${index}`}
                                                                        country={'in'}
                                                                        error={true}
                                                                        inputProps={{
                                                                            name: 'phone',
                                                                            // country: { item?.country},
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
                                                                    value={item?.type}
                                                                    onChange={(e) => handlePhoneTypeChange(e, index)}
                                                                >
                                                                    <option value="Work">Work</option>
                                                                    <option value="Home">Home</option>
                                                                    <option value="Mobile">Mobile</option>
                                                                    <option value="Other">Other</option>
                                                                </select>
                                                                <RiDeleteBinLine
                                                                    className="ms-2 cursor-pointer"
                                                                    size={45}
                                                                    onClick={() => {
                                                                        const updatedQuestions = allPhone.filter((_, i) => i !== index);
                                                                        setAllPhone(updatedQuestions);
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}

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
                                                    <label for="name" className="block mb-2 font-bold text-gray-600">Email</label>
                                                    <div className='flex flex-col gap-3'>
                                                        {allEmail?.map((item, index) => (
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
                                                                    {Error[`Email-${index}`] && (<p className="text-red-500 text-sm font-bold">{Error[`Email-${index}`]}</p>)}
                                                                </div>

                                                                <select
                                                                    id={`Value_${index}`}
                                                                    value={item.type}
                                                                    onChange={(e) => handleEmailTypeChange(e, index)}
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
                                                        ))}

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
                                <div className="flex items-center justify-between  gap-3  p-3 rounded-b border-t border-gray-300">
                                    <button onClick={closeModel} type="submit" className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close">Cancel</button>
                                    <button type="submit" className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded">  {leadData && leadData.leadID ? 'Update' : 'Save'} </button>
                                </div>
                            </form>
                        </>
                    </div>
                </div >
            </div >
            {openLabelModel && (
                <AddLabel
                    setOpenLabelModel={setOpenLabelModel}
                    openLabelModel={openLabelModel}
                />
            )}
        </>
    )
}

export default AddLeads

// jignesh lakum