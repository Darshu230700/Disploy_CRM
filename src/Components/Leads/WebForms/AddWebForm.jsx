import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoClose, IoMailOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { TbCloudDownload } from "react-icons/tb";
import { VscListSelection } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWebFormsByID, getWebFromType } from "../../../Redux/WebFormSlice";
import Loading from "../../Common/Loading";

const AddWebForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectForm, setSelectForm] = useState(1);
    const [allFormType, setAllFormType] = useState([]);
    const [webForms, setWebForms] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(getWebFromType({})).then((res) => {
            setAllFormType(res?.payload?.data)
            const timer = setTimeout(() => {
                setLoading(false)
            }, 500);
            return () => clearTimeout(timer);
        })
    }, [dispatch])

    useEffect(() => {
        let config = { selectForm }
        dispatch(getWebFormsByID({ config })).then((res) => {
            setWebForms(res?.payload?.data)
        })
    }, [selectForm, dispatch])

    return (
        <div>
            {loading && (
                <div className="h-screen max-auto">
                    <Loading />
                </div>
            )}
            {!loading && (
                <div className="Wizardstyles__Wizard-sc-ufu9kt-3 izrKcI text-[#73767c]">
                    <div className="shadow w-full h-full max-w-full max-h-full p-8 bg-white flex flex-col gap-4 Wizardstyles__Sidebar-sc-ufu9kt-0 gWvLVZ">
                        <div className="flex justify-between items-center">
                            <h1>New Web Form</h1>
                            <div onClick={() => navigate("/WebForms")} className="cursor-pointer">
                                <IoClose size={26} />
                            </div>
                        </div>
                        <div className="bZfqb">
                            <h2 className="text-2xl mb-4">
                                Choose form template
                            </h2>
                            <p>
                                Get started with one of our predefined templates. Save time and
                                explore all the features Web Forms have to offer.
                            </p>
                        </div>
                        {/* <div className="flex flex-col gap-2">
                            <lable>Language</lable>
                            <select name="language" id="languages" className="sc-iMWBiJ bTicHx w-48">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                            <span>How to translate the web form. Cannot be changed later.</span>
                        </div> */}
                        {allFormType?.map((item, index) => {
                            return (
                                <div
                                    className={`border ${selectForm === item?.webFromTypeMasterID
                                        ? "border-[#2b74da] bg-[#F0FFFF]"
                                        : "border-[#21232C1A]"
                                        } rounded-md p-3 cursor-pointer ${item?.webFromTypeMasterID === 4 ? 'bg-slate-100' : ''}`}
                                    onClick={() => setSelectForm(item?.webFromTypeMasterID === 4 ? selectForm : item?.webFromTypeMasterID)}
                                >
                                    <div className="flex items-center gap-4 cursor-pointer">
                                        <div
                                            className={`border rounded-md cursor-pointer ${selectForm === item?.webFromTypeMasterID ? "border-[#72adff]" : "border-[#21232C1A]"
                                                } cursor-pointer p-3`}
                                        >
                                            {item?.webFromTypeMasterID === 1 && (
                                                <IoMailOutline
                                                    size={26}
                                                    className={`${selectForm === item?.webFromTypeMasterID ? "text-blue" : "text-[#73767c]"
                                                        } cursor-pointer`}
                                                />
                                            )}
                                            {item?.webFromTypeMasterID === 2 && (
                                                <MdOutlineEdit
                                                    size={26}
                                                    className={`${selectForm === item?.webFromTypeMasterID ? "text-blue" : "text-[#73767c]"
                                                        } cursor-pointer`}
                                                />
                                            )}
                                            {item?.webFromTypeMasterID === 3 && (
                                                <TbCloudDownload
                                                    size={26}
                                                    className={`${selectForm === item?.webFromTypeMasterID ? "text-blue" : "text-[#73767c]"
                                                        } cursor-pointer`}
                                                />
                                            )}
                                            {item?.webFromTypeMasterID === 4 && (
                                                <AiOutlineCloudUpload
                                                    size={26}
                                                    className={`${selectForm === item?.webFromTypeMasterID ? "text-blue" : "text-[#73767c]"
                                                        } cursor-pointer`}
                                                />
                                            )}
                                            {item?.webFromTypeMasterID === 5 && (
                                                <VscListSelection
                                                    size={26}
                                                    className={`${selectForm === item?.webFromTypeMasterID ? "text-blue" : "text-[#73767c]"
                                                        } cursor-pointer`}
                                                />
                                            )}
                                        </div>
                                        <div className="flex flex-col cursor-pointer">
                                            <label className="font-medium text-lg cursor-pointer">
                                                {item?.name}
                                            </label>
                                            <span className="cursor-pointer">
                                                {item?.description}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <div className="flex flex-row gap-4">
                            <button
                                type="submit"
                                className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                onClick={() => {
                                    navigate("/WebForms/createForm", {
                                        state: {
                                            selectForm: selectForm,
                                        },
                                    });
                                }}
                            >
                                Create form
                            </button>
                            <button
                                type="button"
                                className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                onClick={() => navigate("/WebForms")}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div className="m-8">
                        <div className="fsFPby">
                            <div className="sc-dkmUuB gtfdzj">
                                <div className="sc-bDumWk bLDMTi">
                                    <form>
                                        {webForms?.webFromFieldMaster?.map((item) => {
                                            return (
                                                <>
                                                    {item?.fieldType === "Label" && (
                                                        <div className="sc-gmgFlS cnSmjT">{item?.label}</div>
                                                    )}
                                                    {item?.fieldType === "Input" && (
                                                        <div className="sc-fTFjTM folHGl">
                                                            <label className="sc-hZDyAQ hvBCWj">
                                                                <span>{item?.label}</span>
                                                            </label>
                                                            <div>
                                                                <input type="email" className="sc-iMWBiJ bTicHx" disabled />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {item?.fieldType === "Message" && (
                                                        <div className="sc-fTFjTM folHGl">
                                                            <label className="sc-hZDyAQ hvBCWj">
                                                                <span>{item?.label}</span>
                                                            </label>
                                                            <div>
                                                                <textarea type="text" className="sc-fvtFIe hAYsgg" disabled></textarea>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {item?.fieldType === "Button" && (
                                                        <button type="button" className="sc-ktJbId hezswI" tabindex="-1">
                                                            {item?.label}
                                                        </button>
                                                    )}
                                                </>
                                            )
                                        })}
                                    </form>
                                    <div className="sc-kzqdkY huXVWN">
                                        Never share sensitive information (credit card numbers, social
                                        security numbers, passwords) through this form.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default AddWebForm;
