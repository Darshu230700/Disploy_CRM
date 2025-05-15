/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../../Common/Sidebar'
import Navbar from '../../Common/Navbar'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdOutlineEdit } from 'react-icons/md';
import FormEditor from './FormEditor';
import SubmitOptions from './SubmitOptions';
import Styles from './Styles';
import ShareAndEmbed from './ShareAndEmbed';
import WebFormPreview from './WebFormPreview';
import { getUserWebFormsByID, getWebFormsByID, handleAddEditWebForm } from '../../../Redux/WebFormSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createFormParams, hexToRGBA, rgbaToHex } from '../../Common/Common';
import ThankYouPreview from './ThankYouPreview';
import { ADD_EDIT_WEBFORMS, GET_USER_WEB_FORM_BY_ID } from '../../Common/API';
import toast from 'react-hot-toast';
import Loading from "../../Common/Loading"

const AllForms = ({ isVisible, setIsVisible, setSidebarOpen, sidebarOpen, isDark, setIsDark }) => {
    const { token } = useSelector((state) => state.root.auth);
    const authToken = `Bearer ${token}`;
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams()
    const { selectForm } = useLocation()?.state;
    ;
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            isActive: false
        }
    });
    const formRef = useRef(null);
    const responseRef = useRef(null);
    const [formName, setFormName] = useState()
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isEmbedded, setIsEmbedded] = useState(false);
    const [loading, setLoading] = useState(true);

    const [submitForm, setSubmitForm] = useState(false);
    const [subformName, setSubFormName] = useState("Allow your website visitors to get in touch with you")
    const [activeTab, setActiveTab] = useState("Form editor");
    const [webForms, setWebForms] = useState([]);
    const [routeToken, setRouteToken] = useState()
    const [theme, setTheme] = useState(); // Initial theme state
    const [edit, setEdit] = useState(false); // Initial theme state
    const [color, setColor] = useState({
        r: '0',
        g: '137',
        b: '60',
        a: '1',
    });
    const [labelcolor, setLabelColor] = useState({
        r: '0',
        g: '0',
        b: '0',
        a: '1',
    });
    const [backgroundcolor, setBackgroundColor] = useState({
        r: '255',
        g: '255',
        b: '255',
        a: '1',
    });
    const [submitOptions, setSubmitOptions] = useState()
    const [styleObj, setStyleObj] = useState({})
    const [webFromID, setWebFromID] = useState("")
    const PrimaryhexaCode = rgbaToHex(color)
    const LabelhexaCode = rgbaToHex(labelcolor)
    const BackgroundhexaCode = rgbaToHex(backgroundcolor)
    const IsActive = watch('isActive')

    useEffect(() => {
        if (selectForm !== "") {
            toast.loading("Fetching...")
            let config = { selectForm }
            dispatch(getWebFormsByID({ config })).then((res) => {
                let data = res?.payload?.data

                let payload = {
                    ...data,
                    webFromMasterID: 0
                }
                let config = {
                    method: "post",
                    maxBodyLength: Infinity,
                    url: `${ADD_EDIT_WEBFORMS}`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authToken,
                    },
                    data: JSON.stringify(payload),
                };

                try {
                    dispatch(handleAddEditWebForm({ config })).then((res) => {

                        setWebFromID(res?.payload?.data?.webFromMasterID)
                        setRouteToken(res?.payload?.data?.route)
                    });
                    toast.remove();
                } catch (error) {
                    toast.remove();
                    console.log("error", error);
                }
                setFormName(data?.name)
                setValue("isActive", data?.isActive)
                setWebForms(data)
                setSubmitOptions(data?.webFromSubmitOption)
                setTheme(data?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value)
                setStyleObj({
                    ...styleObj,
                    introductions: data?.webFormStyleCategoryMaster?.[1]?.webFromStyleMaster?.[0]?.value,
                    labels: data?.webFormStyleCategoryMaster?.[1]?.webFromStyleMaster?.[1]?.value,
                    labelPosition: data?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[0]?.value,
                    fieldSize: data?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value,
                    fieldStyle: data?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[2]?.value,
                    color: data?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[1]?.value,
                    labelColor: data?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[2]?.value,
                    backgroundColor: data?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[2]?.value,
                })
                setColor(data?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[1]?.value === "#00893c" ? {
                    r: '0',
                    g: '137',
                    b: '60',
                    a: '1',
                } : {
                    r: '0',
                    g: '137',
                    b: '60',
                    a: '1',
                })
                setLabelColor(data?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[2]?.value === "#000" ? {
                    r: '0',
                    g: '0',
                    b: '0',
                    a: '1',
                } : {
                    r: '0',
                    g: '0',
                    b: '0',
                    a: '1',
                })
                setBackgroundColor(data?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[3]?.value === "#fff" ? {
                    r: '255',
                    g: '255',
                    b: '255',
                    a: '1',
                } : {
                    r: '255',
                    g: '255',
                    b: '255',
                    a: '1',
                })
                setLoading(false)
            })
        }
    }, [selectForm])

    useEffect(() => {
        if (id) {
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `${GET_USER_WEB_FORM_BY_ID}?WebFromMasterID=${id}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authToken,
                },
            };
            dispatch(getUserWebFormsByID({ config })).then((res) => {
                let data = res?.payload?.data
                setFormName(data?.name)
                setValue("isActive", data?.isActive)
                setWebForms(data)
                setSubmitOptions(data?.webFromSubmitOption)
                setTheme(data?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value)
                setStyleObj({
                    ...styleObj,
                    introductions: data?.webFormStyleCategoryMaster?.[1]?.webFromStyleMaster?.[0]?.value,
                    labels: data?.webFormStyleCategoryMaster?.[1]?.webFromStyleMaster?.[1]?.value,
                    labelPosition: data?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[0]?.value,
                    fieldSize: data?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value,
                    fieldStyle: data?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[2]?.value,
                    color: data?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[1]?.value,
                    labelColor: data?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[2]?.value,
                    backgroundColor: data?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[2]?.value,
                })
                setEdit(true)
                const rgbaColor = hexToRGBA(data?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[1]?.value)
                setColor({
                    r: rgbaColor[0],
                    g: rgbaColor[1],
                    b: rgbaColor[2],
                    a: rgbaColor[3],
                })
                const rgbaLabel = hexToRGBA(data?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[2]?.value)

                setLabelColor({
                    r: rgbaLabel[0],
                    g: rgbaLabel[1],
                    b: rgbaLabel[2],
                    a: rgbaLabel[3],
                })
                const rgbaBackground = hexToRGBA(data?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[3]?.value)
                setBackgroundColor({
                    r: rgbaBackground[0],
                    g: rgbaBackground[1],
                    b: rgbaBackground[2],
                    a: rgbaBackground[3],
                })
                const timer = setTimeout(() => {
                    setLoading(false)
                }, 1000);

                return () => clearTimeout(timer);

            })
        }
    }, [id])

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const onSubmit = (data) => {
        toast?.loading("Saving...")
        let isActive = data?.isActive;
        let Params = createFormParams(webForms, id, webFromID, routeToken, edit, isActive, styleObj, formName, subformName, theme, PrimaryhexaCode, LabelhexaCode, BackgroundhexaCode, submitOptions, formRef, responseRef)
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${ADD_EDIT_WEBFORMS}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: authToken,
            },
            data: JSON.stringify(Params),
        };

        try {
            dispatch(handleAddEditWebForm({ config })).then((res) => {
                setTimeout(() => {
                    navigate("/WebForms")
                }, 500);
            });
            toast.remove();
        } catch (error) {
            toast.remove();
            console.log("error", error);
        }
    }

    const handleSubmitForm = () => {
        const formErrors = {};
        if (Object.keys(formData).length === 0) {
            webForms?.webFromFieldMaster?.map((item) => {
                if (item?.isRequired) {
                    if (item?.input_type === "Email") {
                        formErrors[item?.label?.replace(/<\/?p>/g, '')] = 'Enter a valid email address'
                    }
                    else {
                        formErrors[item?.label?.replace(/<\/?p>/g, '')] = 'This field is required'
                    }
                }
            })
        }
        Object.keys(formData).forEach(fieldName => {
            const isRequired = webForms?.webFromFieldMaster?.find(item => item.label === fieldName)?.isRequired;
            if (isRequired && !formData[fieldName].trim()) {
                formErrors[fieldName] = 'This field is required';
            }
        });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setSubmitForm(true)
    }

    return (
        <>
            <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
            <Navbar isVisible={isVisible} setIsVisible={setIsVisible} isDark={isDark} setIsDark={setIsDark} />
            <div className="flex flex-1 ">
                <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] pl-4 pt-[54px] duration-300">
                    <div className='h-full'>
                        {loading && (
                            <div className='h-screen'><Loading /></div>
                        )}
                        {!loading && (
                            <div className='flex flex-col'>
                                <div className='p-6 gap-4 flex flex-col'>
                                    <div className='flex flex-row justify-between gap-3'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <input type='text' value={formName} className='sc-iMWBiJ bTicHx' onChange={(e) => setFormName(e.target.value)} />
                                            <MdOutlineEdit size={26} className="cursor-pointer" />
                                        </div>
                                        <div className='flex gap-3 items-center'>
                                            <form onSubmit={handleSubmit(onSubmit)} className='flex gap-3 items-center' >
                                                <div className='flex gap-4'>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={IsActive}
                                                            id='CurrencyShow'
                                                            {...register("isActive")}

                                                        />
                                                        <label
                                                            htmlFor="CurrencyShow"
                                                            className={`w-10 h-5  rounded-full flex items-center p-1 cursor-pointer peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-green-500 transition-colors duration-300 ease-in-out ${IsActive === true ? ' bg-green-500' : 'bg-red-500'}`}
                                                        >
                                                            <span className={`w-4 h-4  rounded-full shadow-md transform transition-transform duration-300 ease-in-out bg-white ${IsActive === true ? 'translate-x-5 ' : 'bg-white'}`}></span>
                                                        </label>

                                                    </label>
                                                    <label> Active
                                                    </label>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                                    onClick={() => navigate("/WebForms")}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                                >
                                                    Save
                                                </button>
                                            </form>

                                        </div>
                                    </div>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div className='lg:w-96 md:w-96 xs:w-full flex flex-row gap-2 items-center'>
                                            <input type='text' value={subformName} className='sc-iMWBiJ bTicHx' onChange={(e) => setSubFormName(e.target.value)} />
                                            <MdOutlineEdit size={26} className="cursor-pointer" />
                                        </div>
                                    </div>

                                </div>
                                <div >

                                    <div className="border-b border-gray-200 dark:border-gray-700">
                                        <ul
                                            className="flex flex-wrap -mb-px"
                                            id="myTab"
                                            role="tablist"
                                        >
                                            <li role="presentation">
                                                <button
                                                    className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-3 px-3 text-base font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${activeTab === "Form editor" ? "active" : ""
                                                        }`}
                                                    id="Form-editor-tab"
                                                    onClick={() => handleTabClick("Form editor")}
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="Form-editor"
                                                    aria-selected={activeTab === "Form editor"}
                                                >
                                                    Form editor
                                                </button>
                                            </li>
                                            <li role="presentation">
                                                <button
                                                    className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-3 px-3 text-base font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${activeTab === "Style" ? "active" : ""
                                                        }`}
                                                    id="Style-tab"
                                                    onClick={() => handleTabClick("Style")}
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="Style"
                                                    aria-selected={activeTab === "Style"}
                                                >
                                                    Style
                                                </button>
                                            </li>
                                            <li role="presentation">
                                                <button
                                                    className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-3 px-3 text-base font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${activeTab === "Submit options"
                                                        ? "active"
                                                        : ""
                                                        }`}
                                                    id="Submit-options-tab"
                                                    onClick={() =>
                                                        handleTabClick("Submit options")
                                                    }
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="Submit-options"
                                                    aria-selected={
                                                        activeTab === "Submit options"
                                                    }
                                                >
                                                    Submit options
                                                </button>
                                            </li>
                                            <li role="presentation">
                                                <button
                                                    className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-3 px-3 text-base font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${activeTab === "Share and embed"
                                                        ? "active"
                                                        : ""
                                                        }`}
                                                    id="Share-and-embed-tab"
                                                    onClick={() =>
                                                        handleTabClick("Share and embed")
                                                    }
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="Share-and-embed"
                                                    aria-selected={
                                                        activeTab === "Share and embed"
                                                    }
                                                >
                                                    Share and embed
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    {activeTab === "Form editor" && (
                                        <div className='grid grid-cols-12 gap-4'>
                                            <div className='col-span-8'>
                                                <FormEditor webForms={webForms} setWebForms={setWebForms} />
                                            </div>
                                            <div className='col-span-4'>
                                                <WebFormPreview preview={webForms} setIsEmbedded={setIsEmbedded} isEmbedded={isEmbedded} PrimaryhexaCode={PrimaryhexaCode} BackgroundhexaCode={BackgroundhexaCode} LabelhexaCode={LabelhexaCode} styleObj={styleObj} theme={theme} setFormData={setFormData} handleSubmitForm={handleSubmitForm} setErrors={setErrors} errors={errors} submitForm={submitForm} setSubmitForm={setSubmitForm} submitOptions={submitOptions} formRef={formRef} responseRef={responseRef} />
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "Style" && (
                                        <div className='grid grid-cols-12 gap-4'>
                                            <div className='col-span-8'>
                                                <Styles data={webForms?.webFormStyleCategoryMaster} setTheme={setTheme} theme={theme} setColor={setColor} color={color} labelcolor={labelcolor} setLabelColor={setLabelColor} backgroundcolor={backgroundcolor} setBackgroundColor={setBackgroundColor} styleObj={styleObj} setStyleObj={setStyleObj} PrimaryhexaCode={PrimaryhexaCode} BackgroundhexaCode={BackgroundhexaCode} LabelhexaCode={LabelhexaCode} submitForm={submitForm} setSubmitForm={setSubmitForm} />

                                            </div>
                                            <div className='col-span-4'>
                                                <WebFormPreview preview={webForms} setIsEmbedded={setIsEmbedded} isEmbedded={isEmbedded} PrimaryhexaCode={PrimaryhexaCode} BackgroundhexaCode={BackgroundhexaCode} LabelhexaCode={LabelhexaCode} styleObj={styleObj} theme={theme} setFormData={setFormData} handleSubmitForm={handleSubmitForm} setErrors={setErrors} errors={errors} submitForm={submitForm} setSubmitForm={setSubmitForm} submitOptions={submitOptions} formRef={formRef} responseRef={responseRef} />
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "Submit options" && (
                                        <div className='grid grid-cols-12 gap-4'>
                                            <div className='col-span-8'>
                                                <SubmitOptions data={webForms?.webFromSubmitOption} submitOptions={submitOptions} setSubmitOptions={setSubmitOptions} />
                                            </div>
                                            <div className='col-span-4'>
                                                <ThankYouPreview preview={webForms} setIsEmbedded={setIsEmbedded} isEmbedded={isEmbedded} PrimaryhexaCode={PrimaryhexaCode} BackgroundhexaCode={BackgroundhexaCode} LabelhexaCode={LabelhexaCode} submitOptions={submitOptions} theme={theme} setFormData={setFormData} handleSubmitForm={handleSubmitForm} setErrors={setErrors} errors={errors} submitForm={submitForm} setSubmitForm={setSubmitForm} formRef={formRef} responseRef={responseRef} />
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "Share and embed" && (
                                        <div className='grid grid-cols-12 gap-4'>
                                            <div className='col-span-8'>
                                                <ShareAndEmbed preview={webForms} routeToken={routeToken} />
                                            </div>
                                            <div className='col-span-4'>
                                                <WebFormPreview preview={webForms} setIsEmbedded={setIsEmbedded} isEmbedded={isEmbedded} PrimaryhexaCode={PrimaryhexaCode} BackgroundhexaCode={BackgroundhexaCode} LabelhexaCode={LabelhexaCode} styleObj={styleObj} theme={theme} setFormData={setFormData} handleSubmitForm={handleSubmitForm} setErrors={setErrors} errors={errors} submitForm={submitForm} setSubmitForm={setSubmitForm} submitOptions={submitOptions} formRef={formRef} responseRef={responseRef} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllForms
